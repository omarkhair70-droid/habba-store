'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { ProductCard } from '@/components/habba/product-card';
import { visibleProducts } from '@/content/habba-products';
import { getHabbaFilterFromQuery, habbaFilterChips, type HabbaFilterKey } from '@/content/habba-filters';

type SearchProduct = (typeof visibleProducts)[number];
type AiSearchPayload = {
  headlineAr: string;
  summaryAr: string;
  products: Array<{
    slug: string;
    titleAr: string;
    titleEn: string;
    image: string;
    categoryAr: string;
    collectionAr: string;
  }>;
  interpretedMoodAr: string;
  suggestedFilterKey: string | null;
  source: 'ai' | 'fallback';
};

const filterContext: Partial<Record<HabbaFilterKey, string>> = {
  'green-mood': 'قطع بدرجات هادية وأخضر خفيف للبس اليومي.',
  'cute-gift': 'اختيارات لطيفة تنفع كهدية بسيطة.',
  sets: 'قطع مبهجة وتفاصيل ملونة بروح حبّة.',
  'colorful-star': 'قطع مبهجة وتفاصيل ملونة بروح حبّة.'
};

export default function ShopClient() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const initialFilter = getHabbaFilterFromQuery(searchParams.get('filter'));
  const isAiDebug = searchParams.get('debug') === 'ai';
  const [activeFilter, setActiveFilter] = useState<HabbaFilterKey>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [aiResults, setAiResults] = useState<AiSearchPayload | null>(null);

  useEffect(() => {
    const queryFilter = getHabbaFilterFromQuery(searchParams.get('filter'));
    if (queryFilter !== activeFilter) setActiveFilter(queryFilter);
  }, [searchParams, activeFilter]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return visibleProducts;
    if (activeFilter === 'bracelets') return visibleProducts.filter((p) => p.category === 'Bracelets');
    if (activeFilter === 'necklaces') return visibleProducts.filter((p) => p.category === 'Necklaces');
    if (activeFilter === 'sets') return visibleProducts.filter((p) => p.category === 'Sets');
    if (activeFilter === 'cute-gift') return visibleProducts.filter((p) => p.collectionAr === 'هدايا صغيرة');
    if (activeFilter === 'green-mood') return visibleProducts.filter((p) => p.collectionAr === 'جرين مود');
    if (activeFilter === 'colorful-star') return visibleProducts.filter((p) => p.collectionAr === 'كولرفل ستار');
    if (activeFilter === 'soft-colors') return visibleProducts.filter((p) => p.collectionAr === 'ألوان ناعمة');
    if (activeFilter === 'calm-basics') return visibleProducts.filter((p) => p.collectionAr === 'أساسيات هادية');
    if (activeFilter === 'natural') return visibleProducts.filter((p) => p.collectionAr === 'ناتشورال');
    return visibleProducts;
  }, [activeFilter]);

  const shownProducts: SearchProduct[] = useMemo(() => {
    if (!aiResults) return filteredProducts;
    const map = new Map(visibleProducts.map((p) => [p.slug, p]));
    return aiResults.products.map((item) => map.get(item.slug)).filter((item): item is SearchProduct => Boolean(item));
  }, [aiResults, filteredProducts]);

  const onFilterChange = (filter: HabbaFilterKey) => {
    setAiResults(null);
    setSearchError('');
    setActiveFilter(filter);
    const params = new URLSearchParams(searchParams.toString());
    if (filter === 'all') params.delete('filter');
    else params.set('filter', filter);
    const next = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(next, { scroll: false });
  };

  const onSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = searchQuery.trim();
    if (q.length < 3 || q.length > 160) {
      setSearchError('حصلت مشكلة بسيطة، جربي تاني.');
      return;
    }

    setIsSearching(true);
    setSearchError('');
    try {
      const res = await fetch('/api/habba/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      if (!res.ok) throw new Error('search-failed');
      const data = await res.json() as AiSearchPayload;
      setAiResults(data);
    } catch {
      setSearchError('حصلت مشكلة بسيطة، جربي تاني.');
      setAiResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main>
      <HabbaHeader />
      <section className="mx-auto w-[92%] max-w-6xl py-6 sm:py-8">
        <h1 className="text-right text-2xl font-bold leading-tight sm:text-3xl">تسوّقي المنتجات</h1>
        <p className="mt-2 max-w-2xl text-right text-sm leading-relaxed text-[#6A5F59] sm:text-base">اختاري القطعة اللي شبهك، واسألي على واتساب للتوفر والتفاصيل.</p>
        {filterContext[activeFilter] ? <p className="mt-2 text-right text-xs text-[#7A6D66] sm:text-sm">{filterContext[activeFilter]}</p> : null}

        <div className="mt-4 rounded-2xl border border-[#EFD9CB] bg-[#FFFCF7] p-4 sm:p-5">
          <h2 className="text-right text-base font-semibold text-[#3B3130] sm:text-lg">بتدوري على حاجة معينة؟</h2>
          <p className="mt-1 text-right text-sm text-[#6A5F59]">اكتبي المود أو المناسبة، وحبّة ترشحلك من المنتجات الموجودة.</p>
          <form className="mt-3 flex flex-col gap-2 sm:flex-row-reverse" onSubmit={onSearchSubmit}>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="مثال: عايزة حاجة كيوت هدية" className="w-full rounded-xl border border-[#EFD9CB] bg-white px-3 py-2 text-right text-sm outline-none transition focus:border-[#F1B49E]" maxLength={160} />
            <button type="submit" disabled={isSearching} className="rounded-xl bg-[#F87070] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#F45E5E] disabled:opacity-70">دوري بذكاء</button>
            {aiResults ? <button type="button" onClick={() => { setAiResults(null); setSearchError(''); setSearchQuery(''); }} className="rounded-xl border border-[#EFD9CB] px-4 py-2 text-sm font-semibold text-[#5A4F49]">مسح البحث</button> : null}
          </form>
          {isSearching ? <p className="mt-2 text-right text-xs text-[#7A6D66]">بندورلك على أنسب قطع...</p> : null}
          {searchError ? <p className="mt-2 text-right text-xs text-[#C25656]">{searchError}</p> : null}
        </div>

        {aiResults ? (
          <div className="mt-3 text-right text-[11px] text-[#8a7d76]">{isAiDebug ? `AI source: ${aiResults.source}${aiResults.interpretedMoodAr ? ` • المود: ${aiResults.interpretedMoodAr}` : ""}${aiResults.suggestedFilterKey ? ` • فلتر: ${aiResults.suggestedFilterKey}` : ""}` : null}</div>
        ) : null}

        {aiResults ? (
          <div className="mt-4 rounded-2xl border border-[#F3E2D7] bg-[#FFF8F0] p-3 sm:p-4">
            <h3 className="text-right text-sm font-semibold text-[#3B3130] sm:text-base">{aiResults.headlineAr}</h3>
            <p className="mt-1 text-right text-xs text-[#6A5F59] sm:text-sm">{aiResults.summaryAr}</p>
          </div>
        ) : null}

        <div className="mb-5 mt-4 flex flex-wrap justify-end gap-1.5 sm:gap-2">
          {habbaFilterChips.map((chip) => (
            <button key={chip.key} type="button" onClick={() => onFilterChange(chip.key)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition sm:px-4 sm:py-1.5 sm:text-sm ${activeFilter === chip.key ? 'border-[#F87070] bg-[#F87070] text-white' : 'border-[#EFD9CB] bg-[#FFFCF7] text-[#5A4F49] hover:border-[#E4C3AD]'}`}>
              {chip.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {shownProducts.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>
      <HabbaFooter />
    </main>
  );
}
