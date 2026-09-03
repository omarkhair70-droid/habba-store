'use client';

import { useMemo, useState } from 'react';
import { whatsappNumber } from '@/content/habba-products';
import { useBag } from '@/components/habba/bag/bag-provider';
import { GuidedChoiceGroup } from '@/components/habba/guided-choice';
import { GuidedResultCard } from '@/components/habba/guided-result-card';
import { ProductVisual } from '@/components/habba/product-visual';

type DropPayload = {
  dropMood: 'soft-gift' | 'green-calm' | 'colorful-day' | 'cute-pieces' | 'everyday-calm' | 'natural-simple';
  dropSize: 4 | 5 | 6;
  focusType: 'mixed' | 'bracelets' | 'necklaces' | 'giftable';
  colorDirection: 'surprise' | 'green' | 'pink' | 'blue' | 'colorful' | 'neutral';
  optionalNote?: string;
};

type DropResponse = {
  dropNameAr: string;
  dropSubtitleAr: string;
  dropStoryAr: string;
  heroProduct: {
    slug: string;
    titleAr: string;
    titleEn: string;
    image: string;
    categoryAr: string;
    collectionAr: string;
  };
  products: Array<{
    slug: string;
    titleAr: string;
    titleEn: string;
    image: string;
    categoryAr: string;
    collectionAr: string;
    reasonAr: string;
  }>;
  instagramCaptionAr: string;
  whatsappMessageAr: string;
  source: 'ai' | 'local' | 'fallback';
};

const aiSourceLabel = (source: 'ai' | 'local' | 'fallback') =>
  source === 'ai' ? 'openai' : source === 'local' ? 'local-brain' : 'fallback';

const choices = {
  dropMood: [
    { value: 'soft-gift', label: 'هدايا ناعمة' },
    { value: 'green-calm', label: 'جرين مود' },
    { value: 'colorful-day', label: 'يوم ملون' },
    { value: 'cute-pieces', label: 'كيوت وخفيف' },
    { value: 'everyday-calm', label: 'يومي وهادي' },
    { value: 'natural-simple', label: 'ناتشورال بسيط' }
  ],
  dropSize: [
    { value: 4, label: '4 قطع' },
    { value: 5, label: '5 قطع' },
    { value: 6, label: '6 قطع' }
  ],
  focusType: [
    { value: 'mixed', label: 'متنوع' },
    { value: 'bracelets', label: 'أساور' },
    { value: 'necklaces', label: 'عقود' },
    { value: 'giftable', label: 'مناسب للهدايا' }
  ],
  colorDirection: [
    { value: 'surprise', label: 'فاجئيني' },
    { value: 'green', label: 'أخضر' },
    { value: 'pink', label: 'وردي' },
    { value: 'blue', label: 'أزرق' },
    { value: 'colorful', label: 'ملون' },
    { value: 'neutral', label: 'هادي ومحايد' }
  ]
} as const;

export function DropBuilderClient() {
  const { addItems } = useBag();
  const [payload, setPayload] = useState<DropPayload>({
    dropMood: 'soft-gift',
    dropSize: 4,
    focusType: 'mixed',
    colorDirection: 'surprise',
    optionalNote: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<DropResponse | null>(null);
  const isAiDebug =
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'ai';

  const whatsappHref = useMemo(
    () =>
      result
        ? 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(result.whatsappMessageAr)
        : '#',
    [result]
  );

  const submit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/habba/drop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'حصلت مشكلة بسيطة، جربي تاني.');
        setResult(null);
      } else {
        setResult(data as DropResponse);
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
          <div className="relative overflow-hidden rounded-[2.75rem] bg-[#DDEBE5] p-6 sm:p-8">
            <div className="absolute -left-12 top-0 h-44 w-44 rounded-full bg-[#F4E8BF]/70 blur-2xl" />
            <div className="relative">
              <p className="text-xs font-extrabold text-[#4D705F]">Habba Drop</p>
              <h1 className="mt-2 text-4xl font-black leading-[1.12] tracking-[-0.04em] text-[#302722] sm:text-5xl">
                مش pairing بس،
                <span className="block text-[#638873]">ده مود كامل.</span>
              </h1>
              <p className="mt-4 text-sm leading-8 text-[#655851] sm:text-base">
                اختاري الإحساس واللون والحجم، وحبّة تبني مجموعة كاملة من 4 لـ6 قطع موجودة فعلًا في الكتالوج.
              </p>

              <div className="relative mt-8 min-h-[330px] overflow-hidden rounded-[2.25rem] bg-white/45">
                <ProductVisual
                  src="/images/habba/products/hbb-green-flower-necklace-card.png"
                  alt="عقد وردة خضراء"
                  sizes="(max-width: 1024px) 58vw, 26vw"
                  className="absolute right-[4%] top-[3%] w-[68%] rotate-[4deg] object-contain"
                />
                <ProductVisual
                  src="/images/habba/products/hbb-pink-smiley-bracelet-card.png"
                  alt="أسورة سمايلي وردي"
                  sizes="(max-width: 1024px) 42vw, 19vw"
                  className="absolute bottom-[-6%] left-[-1%] w-[49%] rotate-[-7deg] object-contain"
                />
                <div className="absolute bottom-5 right-5 flex gap-1.5" aria-hidden="true">
                  <span className="habba-bead h-4 w-4 bg-[#F56F67]" />
                  <span className="habba-bead h-6 w-6 bg-[#9274B3]" />
                  <span className="habba-bead h-5 w-5 bg-[#A88636]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2.75rem] bg-white/78 p-5 habba-tray-shadow sm:p-7">
          <GuidedChoiceGroup
            step="01"
            label="المود الكبير"
            hint="ده اللي هيقود شكل الـDrop كله."
            items={choices.dropMood}
            value={payload.dropMood}
            onChange={(value) => setPayload((current) => ({ ...current, dropMood: value }))}
            tone="sage"
          />
          <GuidedChoiceGroup
            step="02"
            label="حجم الـDrop"
            hint="كل ما العدد يزيد، حبّة توسّع التكوين."
            items={choices.dropSize}
            value={payload.dropSize}
            onChange={(value) => setPayload((current) => ({ ...current, dropSize: value }))}
            tone="butter"
          />
          <GuidedChoiceGroup
            step="03"
            label="نوع التركيز"
            hint="خليه mix، أو وجّهي المجموعة لنوع معين."
            items={choices.focusType}
            value={payload.focusType}
            onChange={(value) => setPayload((current) => ({ ...current, focusType: value }))}
            tone="lavender"
          />
          <GuidedChoiceGroup
            step="04"
            label="اتجاه الألوان"
            hint="لون واضح، مود محايد، أو مفاجأة."
            items={choices.colorDirection}
            value={payload.colorDirection}
            onChange={(value) => setPayload((current) => ({ ...current, colorDirection: value }))}
            tone="coral"
          />

          <label className="block border-t border-[#4F3B31]/10 pt-6">
            <span className="text-sm font-black text-[#40342F]">ملاحظة صغيرة</span>
            <textarea
              maxLength={120}
              value={payload.optionalNote || ''}
              onChange={(event) => setPayload((current) => ({ ...current, optionalNote: event.target.value }))}
              placeholder="مثال: عايزاها هدية لصاحبتي أو بحب الألوان الهادية"
              className="mt-3 min-h-24 w-full rounded-[1.5rem] border border-[#4F3B31]/10 bg-[#FFF8F2] p-4 text-sm outline-none"
            />
          </label>

          <button
            onClick={submit}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-[#302722] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#4B3B34] disabled:opacity-65"
          >
            {loading ? 'بنكوّن الـDrop...' : 'كوّني الـDrop'}
          </button>
          {error ? <p className="mt-3 text-right text-sm font-semibold text-[#B14E4E]">{error}</p> : null}
        </div>
      </div>

      {result ? (
        <section className="mt-12 overflow-hidden rounded-[3rem] bg-[#302722] p-5 text-white sm:p-8 lg:p-10">
          <div className="grid gap-7 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
            <div className="relative min-h-[360px] overflow-hidden rounded-[2.5rem] bg-[#DDEBE5]">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-black text-[#496656] backdrop-blur">
                قطعة البطلة
              </span>
              <ProductVisual
                src={result.heroProduct.image}
                alt={result.heroProduct.titleEn}
                sizes="(max-width: 1024px) 86vw, 38vw"
                quality={84}
                className="absolute inset-[4%] h-[92%] w-[92%] scale-[1.08] object-contain"
              />
              <p className="absolute bottom-4 right-4 rounded-full bg-[#302722]/88 px-4 py-2 text-xs font-extrabold text-white backdrop-blur">
                {result.heroProduct.titleAr}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-extrabold text-[#A9D0BF]">Drop حبّة ليكي</p>
              <h2 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">{result.dropNameAr}</h2>
              <p className="mt-2 text-sm font-bold text-[#D9CDC7]">{result.dropSubtitleAr}</p>
              <p className="mt-5 max-w-xl text-sm leading-8 text-[#D9CDC7]">{result.dropStoryAr}</p>
              {isAiDebug ? (
                <p className="mt-3 text-[10px] text-[#AFA09A]">AI source: {aiSourceLabel(result.source)}</p>
              ) : null}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {result.products.map((product, index) => (
              <GuidedResultCard key={product.slug} product={product} index={index} />
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="rounded-[2rem] bg-white/8 p-5">
              <p className="text-xs font-extrabold text-[#F1BBB5]">كابشن جاهز لو حبيتي تشاركي الـDrop</p>
              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[#DDD0CA]">{result.instagramCaptionAr}</p>
              <p className="mt-2 text-[10px] text-[#AFA09A]">راجعيه قبل النشر.</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() =>
                  addItems(result.products.map((product) => product.slug), {
                    title: 'اتضاف الـ Drop لشنطتك',
                    body: 'الاختيارات اتسجلت في شنطة حبّة 🌷'
                  })
                }
                className="rounded-full bg-[#F56F67] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#E9625B]"
              >
                ضيفي الـDrop لشنطتك
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-extrabold text-white transition hover:bg-white/10"
              >
                اسألي عنه على واتساب
              </a>
            </div>
          </div>
        </section>
      ) : null}
    </section>
  );
}
