'use client';

import { useMemo, useState } from 'react';
import { whatsappNumber } from '@/content/habba-products';
import { useBag } from '@/components/habba/bag/bag-provider';
import { GuidedChoiceGroup } from '@/components/habba/guided-choice';
import { GuidedResultCard } from '@/components/habba/guided-result-card';
import { ProductVisual } from '@/components/habba/product-visual';

type BundlePayload = {
  bundleIntent: 'gift' | 'everyday' | 'colorful' | 'calm' | 'green' | 'cute';
  productCount: 2 | 3;
  includeType: 'any' | 'bracelet-necklace' | 'bracelets' | 'set-plus';
  optionalNote?: string;
};

type BundleResponse = {
  bundleNameAr: string;
  summaryAr: string;
  products: Array<{
    slug: string;
    titleAr: string;
    titleEn: string;
    image: string;
    categoryAr: string;
    collectionAr: string;
    reasonAr: string;
  }>;
  whatsappMessageAr: string;
  source: 'ai' | 'local' | 'fallback';
};

const aiSourceLabel = (source: 'ai' | 'local' | 'fallback') =>
  source === 'ai' ? 'openai' : source === 'local' ? 'local-brain' : 'fallback';

const choices = {
  bundleIntent: [
    { value: 'gift', label: 'هدية' },
    { value: 'everyday', label: 'لبس يومي' },
    { value: 'colorful', label: 'ألوان مبهجة' },
    { value: 'calm', label: 'هادي وبسيط' },
    { value: 'green', label: 'جرين مود' },
    { value: 'cute', label: 'كيوت' }
  ],
  productCount: [
    { value: 2, label: 'قطعتين' },
    { value: 3, label: '3 قطع' }
  ],
  includeType: [
    { value: 'any', label: 'مش فارقة' },
    { value: 'bracelet-necklace', label: 'أسورة + عقد' },
    { value: 'bracelets', label: 'أساور' },
    { value: 'set-plus', label: 'طقم + قطعة' }
  ]
} as const;

export function BundleClient() {
  const [payload, setPayload] = useState<BundlePayload>({
    bundleIntent: 'gift',
    productCount: 2,
    includeType: 'any',
    optionalNote: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<BundleResponse | null>(null);
  const { addItems } = useBag();
  const isAiDebug =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'ai';

  const whatsappHref = useMemo(() => {
    if (!result) return '#';
    const fallbackMsg =
      'أهلًا، حابة أسأل عن الباندل ده:\n' +
      result.products.map((product) => '- ' + product.titleAr).join('\n') +
      '\nهل متاحين؟ والتفاصيل إيه؟';
    return 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(result.whatsappMessageAr || fallbackMsg);
  }, [result]);

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/habba/bundle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(null);
        setError(data?.error || 'حصلت مشكلة بسيطة، جربي تاني.');
      } else {
        setResult(data as BundleResponse);
      }
    } catch {
      setError('حصلت مشكلة بسيطة، جربي تاني.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-[94%] max-w-7xl py-10 sm:py-14" dir="rtl">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-[2.75rem] bg-[#E8E0F4] p-6 sm:p-8">
            <div className="absolute -right-12 bottom-0 h-44 w-44 rounded-full bg-[#F4E8BF]/70 blur-2xl" />
            <div className="relative">
              <p className="text-xs font-extrabold text-[#6C5482]">Habba Bundle</p>
              <h1 className="mt-2 text-4xl font-black leading-[1.12] tracking-[-0.04em] text-[#302722] sm:text-5xl">
                قطعتين أو 3،
                <span className="block text-[#8468A3]">يتكلموا نفس اللغة.</span>
              </h1>
              <p className="mt-4 text-sm leading-8 text-[#655851] sm:text-base">
                اختاري المود وعدد القطع، وحبّة تجمعلك باندل متناسق من الموجود بدل ما تلفّي بين المنتجات واحدة واحدة.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-2">
                <div className="overflow-hidden rounded-[1.75rem] bg-white/55">
                  <ProductVisual
                    src="/images/habba/products/hbb-blue-star-heishi-bracelet-card.png"
                    alt="أسورة النجمة الزرقاء"
                    sizes="(max-width: 1024px) 40vw, 16vw"
                    className="aspect-square w-full scale-[1.1] object-contain"
                  />
                </div>
                <div className="overflow-hidden rounded-[1.75rem] bg-[#F4E8BF]/70">
                  <ProductVisual
                    src="/images/habba/products/hbb-white-daisy-smile-necklace-card.png"
                    alt="عقد دايزي سمايل"
                    sizes="(max-width: 1024px) 40vw, 16vw"
                    className="aspect-square w-full scale-[1.08] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2.75rem] bg-white/78 p-5 habba-tray-shadow sm:p-7">
          <GuidedChoiceGroup
            step="01"
            label="الباندل ده لمين أو لإيه؟"
            hint="ابدئي بالمناسبة أو الإحساس."
            items={choices.bundleIntent}
            value={payload.bundleIntent}
            onChange={(value) => setPayload((current) => ({ ...current, bundleIntent: value }))}
            tone="lavender"
          />
          <GuidedChoiceGroup
            step="02"
            label="كام قطعة؟"
            hint="قطعتين لو عايزة pairing بسيط، أو 3 لو عايزة presence أوضح."
            items={choices.productCount}
            value={payload.productCount}
            onChange={(value) => setPayload((current) => ({ ...current, productCount: value }))}
            tone="butter"
          />
          <GuidedChoiceGroup
            step="03"
            label="تحبي التكوين يبقى إزاي؟"
            hint="اختاري نوع pairing، أو سيبيها مفتوحة."
            items={choices.includeType}
            value={payload.includeType}
            onChange={(value) => setPayload((current) => ({ ...current, includeType: value }))}
            tone="sage"
          />

          <label className="block border-t border-[#4F3B31]/10 pt-6">
            <span className="text-sm font-black text-[#40342F]">ملاحظة اختيارية</span>
            <textarea
              maxLength={120}
              value={payload.optionalNote || ''}
              onChange={(event) => setPayload((current) => ({ ...current, optionalNote: event.target.value }))}
              placeholder="مثال: عايزاها هدية لصاحبتي أو بحب الأخضر"
              className="mt-3 min-h-24 w-full rounded-[1.5rem] border border-[#4F3B31]/10 bg-[#FFF8F2] p-4 text-sm outline-none"
            />
          </label>

          <button
            onClick={submit}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-[#302722] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#4B3B34] disabled:opacity-65"
          >
            {loading ? 'بنركب الباندل...' : 'ركّبي الباندل'}
          </button>
          {error ? <p className="mt-3 text-right text-sm font-semibold text-[#B14E4E]">{error}</p> : null}
        </div>
      </div>

      {result ? (
        <section className="mt-12 overflow-hidden rounded-[3rem] bg-[#E8E0F4] p-5 text-[#302722] sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
            <div className="text-right">
              <p className="text-xs font-extrabold text-[#6C5482]">الباندل المقترح</p>
              <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">{result.bundleNameAr}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#655851]">{result.summaryAr}</p>
          </div>

          {isAiDebug ? (
            <p className="mt-3 text-right text-[10px] text-[#8A7D76]">AI source: {aiSourceLabel(result.source)}</p>
          ) : null}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.products.map((product, index) => (
              <GuidedResultCard key={product.slug} product={product} index={index} />
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                addItems(result.products.map((product) => product.slug), {
                  title: 'اتضاف الباندل لشنطتك',
                  body: 'الباندل بقى محفوظ في شنطة حبّة ✨'
                })
              }
              className="rounded-full bg-[#302722] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#4B3B34]"
            >
              ضيفي الباندل لشنطتك
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#5C486C]/20 bg-white/45 px-6 py-3 text-center text-sm font-extrabold text-[#55425F] transition hover:bg-white/70"
            >
              اسألي عنه على واتساب
            </a>
          </div>
        </section>
      ) : null}
    </section>
  );
}
