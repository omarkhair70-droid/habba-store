'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { whatsappNumber } from '@/content/habba-products';
import { useBag } from '@/components/habba/bag/bag-provider';

type BundlePayload = {
  bundleIntent: 'gift' | 'everyday' | 'colorful' | 'calm' | 'green' | 'cute';
  productCount: 2 | 3;
  includeType: 'any' | 'bracelet-necklace' | 'bracelets' | 'set-plus';
  optionalNote?: string;
};

type BundleResponse = {
  bundleNameAr: string;
  summaryAr: string;
  products: Array<{ slug: string; titleAr: string; titleEn: string; image: string; categoryAr: string; collectionAr: string; reasonAr: string }>;
  whatsappMessageAr: string;
  source: 'ai' | 'local' | 'fallback';
};

const aiSourceLabel = (source: 'ai' | 'local' | 'fallback') => source === 'ai' ? 'openai' : source === 'local' ? 'local-brain' : 'fallback';
const chips = {
  bundleIntent: [
    { value: 'gift', label: 'هدية' },
    { value: 'everyday', label: 'لبس يومي' },
    { value: 'colorful', label: 'ألوان مبهجة' },
    { value: 'calm', label: 'هادي وبسيط' },
    { value: 'green', label: 'جرين مود' },
    { value: 'cute', label: 'كيوت' }
  ],
  productCount: [
    { value: 2, label: '2' },
    { value: 3, label: '3' }
  ],
  includeType: [
    { value: 'any', label: 'مش فارقة' },
    { value: 'bracelet-necklace', label: 'أسورة + عقد' },
    { value: 'bracelets', label: 'أساور' },
    { value: 'set-plus', label: 'طقم + قطعة' }
  ]
} as const;

function ChipGroup<T extends string | number>({ items, value, onChange }: { items: ReadonlyArray<{ value: T; label: string }>; value: T; onChange: (v: T) => void }) {
  return <div className="mt-2 flex flex-wrap justify-end gap-2">{items.map((item) => <button key={item.label} type="button" onClick={() => onChange(item.value)} className={`rounded-full border px-3 py-1.5 text-sm transition ${value === item.value ? 'border-[#F87070] bg-[#FEE9E2] text-[#A44E44]' : 'border-[#EAD8CA] bg-white text-[#6D625C]'}`}>{item.label}</button>)}</div>;
}

export function BundleClient() {
  const [payload, setPayload] = useState<BundlePayload>({ bundleIntent: 'gift', productCount: 2, includeType: 'any', optionalNote: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<BundleResponse | null>(null);
  const { addItems } = useBag();
  const isAiDebug = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'ai';

  const whatsappHref = useMemo(() => {
    if (!result) return '#';
    const fallbackMsg = `أهلًا، حابة أسأل عن الباندل ده:\n${result.products.map((p) => `- ${p.titleAr}`).join('\n')}\nهل متاحين؟ والتفاصيل إيه؟`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(result.whatsappMessageAr || fallbackMsg)}`;
  }, [result]);

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/habba/bundle', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) {
        setResult(null);
        setError(data?.error || 'حصلت مشكلة بسيطة، جربي تاني.');
      } else setResult(data as BundleResponse);
    } catch {
      setError('حصلت مشكلة بسيطة، جربي تاني.');
    } finally {
      setLoading(false);
    }
  };

  return <section className="mx-auto w-[92%] max-w-5xl py-6 sm:py-8" dir="rtl"><div className="rounded-3xl border border-[#EEDFD2] bg-[#FFFCF8] p-4 shadow-sm sm:p-6"><h1 className="text-2xl font-bold text-[#3E322D] sm:text-3xl">اعملي باندل حبّة</h1><p className="mt-2 text-sm text-[#6D625C] sm:text-base">اختاري مود الباندل، ونرشحلك 2 أو 3 قطع ينفعوا مع بعض.</p><div className="mt-5 space-y-4"><div><p className="text-sm font-semibold text-[#5A4F49]">مود الباندل</p><ChipGroup items={chips.bundleIntent} value={payload.bundleIntent} onChange={(v) => setPayload((p) => ({ ...p, bundleIntent: v }))} /></div><div><p className="text-sm font-semibold text-[#5A4F49]">عدد القطع</p><ChipGroup items={chips.productCount} value={payload.productCount} onChange={(v) => setPayload((p) => ({ ...p, productCount: v }))} /></div><div><p className="text-sm font-semibold text-[#5A4F49]">تحبي النوع يكون إيه؟</p><ChipGroup items={chips.includeType} value={payload.includeType} onChange={(v) => setPayload((p) => ({ ...p, includeType: v }))} /></div><label className="block"><span className="text-sm font-semibold text-[#5A4F49]">ملاحظة اختيارية</span><textarea maxLength={120} value={payload.optionalNote || ''} onChange={(e) => setPayload((p) => ({ ...p, optionalNote: e.target.value }))} placeholder="مثال: عايزاها هدية لصاحبتي أو بحب الأخضر" className="mt-2 min-h-20 w-full rounded-2xl border border-[#EBDCCF] bg-white p-3 text-sm outline-none ring-[#F7ABA0] focus:ring" /></label></div><button onClick={submit} disabled={loading} className="mt-5 w-full rounded-full bg-[#F87070] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#ef6666] disabled:opacity-70">{loading ? 'بنركبلك باندل مناسب...' : 'اعملي باندل'}</button>{error ? <p className="mt-3 text-sm text-[#B14E4E]">{error}</p> : null}</div>{result && isAiDebug ? <div className="mt-4 text-right text-[11px] text-[#8a7d76]">AI source: {aiSourceLabel(result.source)}</div> : null}

      {result ? <div className="mt-6 rounded-3xl border border-[#EEDFD2] bg-[#FFFCF8] p-4 shadow-sm sm:p-6"><h2 className="text-xl font-bold text-[#3E322D]">{result.bundleNameAr}</h2><p className="mt-1 text-sm text-[#6D625C]">{result.summaryAr}</p><div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{result.products.map((product) => <article key={product.slug} className="rounded-2xl border border-[#F0DED0] bg-white p-3"><img src={product.image} alt={product.titleEn} className="aspect-square w-full rounded-xl border border-[#F4E5D8] object-contain" /><h4 className="mt-2 text-sm font-bold text-[#3E322D]">{product.titleAr}</h4><p className="text-xs text-[#7E736D]">{product.titleEn}</p><p className="text-xs text-[#8A7D76]">{product.categoryAr} • {product.collectionAr}</p><p className="mt-1 text-xs text-[#6A5E58]">{product.reasonAr}</p><Link href={`/product/${product.slug}`} className="mt-2 inline-block text-xs font-medium text-[#D07D70] hover:underline">عرض القطعة ←</Link></article>)}</div><div className="mt-5 space-y-2"><a href={whatsappHref} target="_blank" rel="noreferrer" className="inline-block w-full rounded-full bg-[#F87070] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#ef6666]">اسألي عن الباندل على واتساب</a><button type="button" onClick={() => addItems(result.products.map((product) => product.slug), { title: 'اتضاف الباندل لشنطتك', body: 'الباندل بقى محفوظ في شنطة حبّة ✨' })} className="w-full rounded-full border border-[#E8D0C1] bg-white px-4 py-3 text-center text-sm font-semibold text-[#7B6056] transition hover:bg-[#FFF7EE]">ضيفي الباندل لشنطتك</button></div></div> : null}</section>;
}
