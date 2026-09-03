'use client';

import { useMemo, useState } from 'react';
import { whatsappNumber } from '@/content/habba-products';
import { useBag } from '@/components/habba/bag/bag-provider';
import { GuidedChoiceGroup } from '@/components/habba/guided-choice';
import { GuidedResultCard } from '@/components/habba/guided-result-card';

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

export function MatchClient() {
  const [payload, setPayload] = useState<MatchPayload>({
    shoppingFor: 'for-me',
    productType: 'any',
    mood: 'calm',
    colorPreference: 'surprise',
    optionalNote: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<MatchResponse | null>(null);
  const { addItems } = useBag();
  const isAiDebug =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'ai';

  const whatsappHref = useMemo(() => {
    if (!result) return '#';
    const fallbackMsg =
      'أهلًا، حابة أسأل عن الترشيحات دي:\n' +
      result.products.map((product) => '- ' + product.titleAr).join('\n') +
      '\nهل متاحين؟ والتفاصيل إيه؟';
    return 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(result.whatsappMessageAr || fallbackMsg);
  }, [result]);

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/habba/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
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
    <section className="mx-auto w-[94%] max-w-7xl py-10 sm:py-14" dir="rtl">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-[2.75rem] bg-[#F2DFE9] p-6 sm:p-8">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#E1EAF0]/70 blur-2xl" />
            <div className="relative">
              <p className="text-xs font-extrabold text-[#95566F]">Habba Match</p>
              <h1 className="mt-2 text-4xl font-black leading-[1.12] tracking-[-0.04em] text-[#302722] sm:text-5xl">
                قولي مودك،
                <span className="block text-[#B25D7B]">مش اسم المنتج.</span>
              </h1>
              <p className="mt-4 text-sm leading-8 text-[#655851] sm:text-base">
                أربع خطوات خفاف، وفي الآخر حبّة ترشحلك 3 قطع من المنتجات الموجودة فعلًا.
              </p>

              <div className="mt-7 flex items-center gap-2" aria-hidden="true">
                <span className="habba-bead h-4 w-4 bg-[#F56F67]" />
                <span className="habba-thread w-10" />
                <span className="habba-bead h-5 w-5 bg-[#9274B3]" />
                <span className="habba-thread w-10" />
                <span className="habba-bead h-4 w-4 bg-[#6E927F]" />
                <span className="habba-thread w-10" />
                <span className="habba-bead h-5 w-5 bg-[#A88636]" />
              </div>

              <div className="mt-8 overflow-hidden rounded-[2rem] bg-white/55">
                <img
                  src="/images/habba/products/hbb-pastel-candy-bracelet-card.png"
                  alt="أسورة ألوان باستيل"
                  className="aspect-square w-full scale-[1.08] object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-[2.75rem] bg-white/78 p-5 habba-tray-shadow sm:p-7">
            <GuidedChoiceGroup
              step="01"
              label="بتشتري لمين؟"
              hint="لنفسك ولا هدية؟ دي أول إشارة للترشيح."
              items={choices.shoppingFor}
              value={payload.shoppingFor}
              onChange={(value) => setPayload((current) => ({ ...current, shoppingFor: value }))}
              tone="coral"
            />
            <GuidedChoiceGroup
              step="02"
              label="نوع القطعة"
              hint="لو مش فارقة، سيبي حبّة تختار من كل الكتالوج."
              items={choices.productType}
              value={payload.productType}
              onChange={(value) => setPayload((current) => ({ ...current, productType: value }))}
              tone="lavender"
            />
            <GuidedChoiceGroup
              step="03"
              label="المود"
              hint="الإحساس أهم من اسم الـcollection."
              items={choices.mood}
              value={payload.mood}
              onChange={(value) => setPayload((current) => ({ ...current, mood: value }))}
              tone="sage"
            />
            <GuidedChoiceGroup
              step="04"
              label="اتجاه اللون"
              hint="اختاري لون، أو سيبيها مفاجأة."
              items={choices.colorPreference}
              value={payload.colorPreference}
              onChange={(value) => setPayload((current) => ({ ...current, colorPreference: value }))}
              tone="butter"
            />

            <label className="block border-t border-[#4F3B31]/10 pt-6">
              <span className="text-sm font-black text-[#40342F]">حاجة صغيرة تحبي نعرفها؟</span>
              <textarea
                maxLength={120}
                value={payload.optionalNote || ''}
                onChange={(event) => setPayload((current) => ({ ...current, optionalNote: event.target.value }))}
                placeholder="مثال: بحب الألوان الهادية أو عايزاها هدية لصاحبتي"
                className="mt-3 min-h-24 w-full rounded-[1.5rem] border border-[#4F3B31]/10 bg-[#FFF8F2] p-4 text-sm outline-none"
              />
            </label>

            <button
              onClick={submit}
              disabled={loading}
              className="mt-6 w-full rounded-full bg-[#302722] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#4B3B34] disabled:opacity-65"
            >
              {loading ? 'بنرتب الاختيارات...' : 'رشحيلي 3 قطع'}
            </button>
            {error ? <p className="mt-3 text-right text-sm font-semibold text-[#B14E4E]">{error}</p> : null}
          </div>
        </div>
      </div>

      {result ? (
        <section className="mt-12 overflow-hidden rounded-[3rem] bg-[#302722] p-5 text-white sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.58fr_1.42fr] lg:items-end">
            <div className="text-right">
              <p className="text-xs font-extrabold text-[#F1BBB5]">اختيارات حبّة ليكي</p>
              <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">{result.headlineAr}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#DDD0CA]">{result.summaryAr}</p>
          </div>

          {result && isAiDebug ? (
            <p className="mt-3 text-right text-[10px] text-[#AFA09A]">AI source: {aiSourceLabel(result.source)}</p>
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
                  title: 'اتضافت الترشيحات لشنطتك',
                  body: 'اختياراتك بقت محفوظة في شنطة حبّة 💛'
                })
              }
              className="rounded-full bg-[#F56F67] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#E9625B]"
            >
              ضيفي الاختيارات لشنطتك
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-extrabold text-white transition hover:bg-white/10"
            >
              اسألي عنهم على واتساب
            </a>
          </div>
        </section>
      ) : null}
    </section>
  );
}
