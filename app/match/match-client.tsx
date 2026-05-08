'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { whatsappNumber } from '@/content/habba-products';

type MatchPayload = {
  shoppingFor: 'for-me' | 'gift';
  productType: 'any' | 'bracelet' | 'necklace' | 'set';
  mood: 'calm' | 'colorful' | 'cute' | 'daily' | 'natural';
  colorPreference: 'surprise' | 'green' | 'pink' | 'blue' | 'red' | 'neutral';
  optionalNote?: string;
};

type MatchResponse = {
  headlineAr: string;
  summaryAr: string;
  products: Array<{slug:string;titleAr:string;titleEn:string;image:string;categoryAr:string;collectionAr:string;reasonAr:string}>;
  whatsappMessageAr: string;
  source: 'ai' | 'local' | 'fallback';
};

const aiSourceLabel = (source: 'ai' | 'local' | 'fallback') => source === 'ai' ? 'openai' : source === 'local' ? 'local-brain' : 'fallback';
const chips = {
  shoppingFor: [
    { value: 'for-me', label: 'لنفسي' },
    { value: 'gift', label: 'هدية' }
  ],
  productType: [
    { value: 'any', label: 'مش فارقة' },
    { value: 'bracelet', label: 'أسورة' },
    { value: 'necklace', label: 'عقد' },
    { value: 'set', label: 'طقم' }
  ],
  mood: [
    { value: 'calm', label: 'هادي' },
    { value: 'colorful', label: 'ملون' },
    { value: 'cute', label: 'كيوت' },
    { value: 'daily', label: 'يومي' },
    { value: 'natural', label: 'ناتشورال' }
  ],
  colorPreference: [
    { value: 'surprise', label: 'فاجئيني' },
    { value: 'green', label: 'أخضر' },
    { value: 'pink', label: 'وردي' },
    { value: 'blue', label: 'أزرق' },
    { value: 'red', label: 'أحمر' },
    { value: 'neutral', label: 'محايد' }
  ]
} as const;

function ChipGroup<T extends string>({items, value, onChange}:{items:ReadonlyArray<{value:T;label:string}>;value:T;onChange:(v:T)=>void}) {
  return <div className="mt-2 flex flex-wrap justify-end gap-2">{items.map((item)=><button key={item.value} type="button" onClick={()=>onChange(item.value)} className={`rounded-full border px-3 py-1.5 text-sm transition ${value===item.value?'border-[#F87070] bg-[#FEE9E2] text-[#A44E44]':'border-[#EAD8CA] bg-white text-[#6D625C]'}`}>{item.label}</button>)}</div>;
}

export function MatchClient() {
  const [payload, setPayload] = useState<MatchPayload>({ shoppingFor: 'for-me', productType: 'any', mood: 'calm', colorPreference: 'surprise', optionalNote: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<MatchResponse | null>(null);
  const isAiDebug = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'ai';

  const whatsappHref = useMemo(() => {
    if (!result) return '#';
    const fallbackMsg = `أهلًا، حابة أسأل عن الترشيحات دي:\n${result.products.map((p) => `- ${p.titleAr}`).join('\n')}\nهل متاحين؟ والتفاصيل إيه؟`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(result.whatsappMessageAr || fallbackMsg)}`;
  }, [result]);

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/habba/match', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'حصلت مشكلة بسيطة، جربي تاني.');
        setResult(null);
      } else {
        setResult(data as MatchResponse);
      }
    } catch {
      setError('حصلت مشكلة بسيطة، جربي تاني.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-[92%] max-w-5xl py-6 sm:py-8" dir="rtl">
      <div className="rounded-3xl border border-[#EEDFD2] bg-[#FFFCF8] p-4 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold text-[#3E322D] sm:text-3xl">اختاري مودك، وحبّة ترشحلك</h1>
        <p className="mt-2 text-sm text-[#6D625C] sm:text-base">جاوبي كام سؤال بسيط، ونرشحلك قطع مناسبة من منتجات حبّة الحقيقية.</p>

        <div className="mt-5 space-y-4">
          <div><p className="text-sm font-semibold text-[#5A4F49]">بتشتري لمين؟</p><ChipGroup items={chips.shoppingFor} value={payload.shoppingFor} onChange={(v) => setPayload((p) => ({ ...p, shoppingFor: v }))} /></div>
          <div><p className="text-sm font-semibold text-[#5A4F49]">نوع القطعة</p><ChipGroup items={chips.productType} value={payload.productType} onChange={(v) => setPayload((p) => ({ ...p, productType: v }))} /></div>
          <div><p className="text-sm font-semibold text-[#5A4F49]">مودك</p><ChipGroup items={chips.mood} value={payload.mood} onChange={(v) => setPayload((p) => ({ ...p, mood: v }))} /></div>
          <div><p className="text-sm font-semibold text-[#5A4F49]">تفضيل اللون</p><ChipGroup items={chips.colorPreference} value={payload.colorPreference} onChange={(v) => setPayload((p) => ({ ...p, colorPreference: v }))} /></div>
          <label className="block">
            <span className="text-sm font-semibold text-[#5A4F49]">ملاحظة صغيرة</span>
            <textarea maxLength={120} value={payload.optionalNote || ''} onChange={(e) => setPayload((p) => ({ ...p, optionalNote: e.target.value }))} placeholder="مثال: بحب الألوان الهادية أو عايزاها هدية لصاحبتي" className="mt-2 min-h-20 w-full rounded-2xl border border-[#EBDCCF] bg-white p-3 text-sm outline-none ring-[#F7ABA0] focus:ring" />
          </label>
        </div>

        <button onClick={submit} disabled={loading} className="mt-5 w-full rounded-full bg-[#F87070] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#ef6666] disabled:opacity-70">
          {loading ? 'بنختارلك قطع مناسبة...' : 'رشحيلي قطع مناسبة'}
        </button>
        {error ? <p className="mt-3 text-sm text-[#B14E4E]">{error}</p> : null}
      </div>

      {result && isAiDebug ? <div className="mt-4 text-right text-[11px] text-[#8a7d76]">AI source: {aiSourceLabel(result.source)}</div> : null}

      {result ? <div className="mt-6 rounded-3xl border border-[#EEDFD2] bg-[#FFFCF8] p-4 shadow-sm sm:p-6"><h2 className="text-xl font-bold text-[#3E322D]">اختيارات حبّة ليكي</h2><h3 className="mt-2 text-lg font-semibold text-[#4D413C]">{result.headlineAr}</h3><p className="mt-1 text-sm text-[#6D625C]">{result.summaryAr}</p><div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{result.products.map((product)=><article key={product.slug} className="rounded-2xl border border-[#F0DED0] bg-white p-3"><img src={product.image} alt={product.titleEn} className="aspect-square w-full rounded-xl border border-[#F4E5D8] object-contain" /><h4 className="mt-2 text-sm font-bold text-[#3E322D]">{product.titleAr}</h4><p className="text-xs text-[#7E736D]">{product.titleEn}</p><p className="text-xs text-[#8A7D76]">{product.categoryAr} • {product.collectionAr}</p><p className="mt-1 text-xs text-[#6A5E58]">{product.reasonAr}</p><Link href={`/product/${product.slug}`} className="mt-2 inline-block text-xs font-medium text-[#D07D70] hover:underline">عرض القطعة ←</Link></article>)}</div><a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-5 inline-block w-full rounded-full bg-[#F87070] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#ef6666]">اسألي عن الترشيحات على واتساب</a></div> : null}
    </section>
  );
}
