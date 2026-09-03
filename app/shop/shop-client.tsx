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
  source: 'ai' | 'local' | 'fallback';
};

const aiSourceLabel = (source: 'ai' | 'local' | 'fallback') =>
  source === 'ai' ? 'openai' : source === 'local' ? 'local-brain' : 'fallback';

const filterContext: Partial<Record<HabbaFilterKey, string>> = {
  bracelets: 'أساور خفيفة من ألوان ومودات مختلفة.',
  necklaces: 'عقود خرز بسيطة، من الهادي للكيوت والملون.',
  sets: 'أطقم جاهزة لما تحبي أكتر من قطعة في نفس المود.',
  'green-mood': 'درجات خضراء وهادية للبس اليومي.',
  'cute-gift': 'قطع صغيرة ولطيفة تنفع هدية أو تفصيلة مرحة.',
  'colorful-star': 'نجوم وألوان واضحة لما المود محتاج يبقى أجرأ.'
};

const filterTone: Partial<Record<HabbaFilterKey, string>> = {
  all: '#302722',
  bracelets: '#D8A39C',
  necklaces: '#97B8C4',
  sets: '#C0A351',
  'cute-gift': '#C887A2',
  'green-mood': '#78966A',
  'colorful-star': '#B99235'
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
    const next = params.toString() ? pathname + '?' + params.toString() : pathname;
    router.replace(next, { scroll: false });
  };

  const onSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = searchQuery.trim();
    if (q.length < 3 || q.length > 160) {
      setSearchError('اكتبي وصف صغير من 3 حروف على الأقل.');
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
      const data = (await res.json()) as AiSearchPayload;
      setAiResults(data);
    } catch {
      setSearchError('حصلت مشكلة بسيطة في البحث، جربي تاني.');
      setAiResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main>
      <HabbaHeader />

      <section className="relative overflow-hidden border-b border-[#4F3B31]/10 bg-[#FFF2E8]">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#E7DEF3]/[0.55] blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#DDE9CF]/60 blur-3xl" />

        <div className="relative mx-auto w-[94%] max-w-7xl py-12 sm:py-16">
          <p className="text-xs font-extrabold text-[#A9534D]">كل حبّة في مكان واحد</p>
          <h1 className="mt-2 max-w-3xl text-4xl font-black leading-[1.12] tracking-[-0.04em] text-[#302722] sm:text-6xl">
            اختاري على مزاجك،
            <span className="block text-[#D95F58]">مش على اسم القسم بس.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#6A5F59] sm:text-base">
            شوفي كل منتجات حبّة المتاحة، فلّتري بالمود أو النوع، أو اكتبي المناسبة واللون اللي في بالك ونرشحلك من الموجود فعلًا.
          </p>
        </div>
      </section>

      <section className="mx-auto w-[94%] max-w-7xl py-8 sm:py-10">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#302722] p-5 text-white sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.58fr_1.42fr] lg:items-center">
            <div className="text-right">
              <p className="text-xs font-extrabold text-[#F0BBB5]">قولي اللي في بالك</p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">حبّة تدور معاكي</h2>
              <p className="mt-2 text-xs leading-6 text-[#DCCFC9] sm:text-sm">
                مثال: هدية كيوت لصاحبتي، أو حاجة خضرا وهادية كل يوم.
              </p>
            </div>

            <form className="flex flex-col gap-2 sm:flex-row-reverse" onSubmit={onSearchSubmit}>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="عايزة حاجة..."
                className="min-h-12 w-full rounded-full border border-white/10 bg-white px-5 py-3 text-right text-sm text-[#302722] outline-none placeholder:text-[#9A8B84]"
                maxLength={160}
              />
              <button
                type="submit"
                disabled={isSearching}
                className="min-h-12 shrink-0 rounded-full bg-[#F56F67] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#E9625B] disabled:opacity-65"
              >
                {isSearching ? 'بندور...' : 'دوري بذكاء'}
              </button>
              {aiResults ? (
                <button
                  type="button"
                  onClick={() => {
                    setAiResults(null);
                    setSearchError('');
                    setSearchQuery('');
                  }}
                  className="min-h-12 shrink-0 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white"
                >
                  رجّعي الكل
                </button>
              ) : null}
            </form>
          </div>
          {searchError ? <p className="mt-3 text-right text-xs text-[#F7C2BC]">{searchError}</p> : null}
        </div>

        {aiResults ? (
          <div className="mt-5 rounded-[2rem] bg-[#F2DFE9] p-5 text-right sm:p-6">
            <p className="text-xs font-extrabold text-[#95566F]">ترشيح حبّة</p>
            <h3 className="mt-1 text-xl font-black text-[#302722]">{aiResults.headlineAr}</h3>
            <p className="mt-2 text-sm leading-7 text-[#6A5F59]">{aiResults.summaryAr}</p>
            {isAiDebug ? (
              <p className="mt-2 text-[10px] text-[#8A7D76]">
                AI source: {aiSourceLabel(aiResults.source)}
                {aiResults.interpretedMoodAr ? ' • المود: ' + aiResults.interpretedMoodAr : ''}
                {aiResults.suggestedFilterKey ? ' • فلتر: ' + aiResults.suggestedFilterKey : ''}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-9">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div className="text-right">
              <p className="text-xs font-extrabold text-[#A9534D]">فلّتري بسرعة</p>
              <h2 className="mt-1 text-2xl font-black">نوع أو مود</h2>
            </div>
            <p className="text-xs font-bold text-[#7B6E68]">{shownProducts.length} قطعة ظاهرة</p>
          </div>

          <div className="-mx-[3%] overflow-x-auto px-[3%] pb-2 sm:mx-0 sm:px-0">
            <div className="flex min-w-max gap-2 sm:flex-wrap sm:justify-start">
              {habbaFilterChips.map((chip) => {
                const tone = filterTone[chip.key] ?? '#7B6E68';
                const active = activeFilter === chip.key && !aiResults;
                return (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={() => onFilterChange(chip.key)}
                    className="rounded-full border px-4 py-2 text-xs font-extrabold transition sm:text-sm"
                    style={
                      active
                        ? { backgroundColor: tone, borderColor: tone, color: '#fff' }
                        : { backgroundColor: '#FFFDF9', borderColor: '#E6D8CE', color: '#5D5049' }
                    }
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>

          {filterContext[activeFilter] && !aiResults ? (
            <p className="mt-3 text-right text-xs leading-6 text-[#776A64] sm:text-sm">{filterContext[activeFilter]}</p>
          ) : null}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {shownProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <HabbaFooter />
    </main>
  );
}
