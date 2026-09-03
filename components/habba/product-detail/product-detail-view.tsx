'use client';

import Link from 'next/link';
import { ProductVisual } from '@/components/habba/product-visual';
import type { HabbaProduct } from '@/content/habba-products';
import { createWhatsAppLink } from '@/content/habba-products';
import { useBag } from '@/components/habba/bag/bag-provider';

const collectionTone: Record<string, { surface: string; accent: string }> = {
  'كولرفل ستار': { surface: '#F3E7B5', accent: '#806622' },
  'هدايا صغيرة': { surface: '#F2DFE9', accent: '#985B75' },
  'جرين مود': { surface: '#DDE9CF', accent: '#627B55' },
  'ألوان ناعمة': { surface: '#E7DEF3', accent: '#75628D' },
  'أساسيات هادية': { surface: '#E0E8ED', accent: '#5F7079' },
  'ناتشورال': { surface: '#E9DFD0', accent: '#78634B' }
};

export function ProductDetailView({ product }: { product: HabbaProduct }) {
  const { addItem } = useBag();
  const tone = collectionTone[product.collectionAr] ?? { surface: '#F2E6DC', accent: '#79665D' };

  return (
    <section className="mx-auto w-[94%] max-w-7xl py-10 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div
          className="relative min-h-[520px] overflow-hidden rounded-[3rem] sm:min-h-[680px]"
          style={{ backgroundColor: tone.surface }}
        >
          <div className="absolute left-6 top-6 z-10 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/72 px-3 py-1.5 text-[11px] font-extrabold backdrop-blur" style={{ color: tone.accent }}>
              {product.collectionAr}
            </span>
            <span className="rounded-full bg-white/72 px-3 py-1.5 text-[11px] font-extrabold text-[#675A54] backdrop-blur">
              {product.categoryAr}
            </span>
          </div>

          <ProductVisual
            src={product.image}
            alt={product.titleEn}
            sizes="(max-width: 1024px) 90vw, 52vw"
            priority
            quality={84}
            className="absolute inset-[5%] h-[90%] w-[90%] scale-[1.04] object-contain"
          />

          <div className="absolute bottom-6 right-6 flex gap-1.5" aria-hidden="true">
            <span className="habba-bead h-4 w-4 bg-[#F56F67]" />
            <span className="habba-bead h-6 w-6 bg-[#9274B3]" />
            <span className="habba-bead h-5 w-5 bg-[#6E927F]" />
            <span className="habba-bead h-4 w-4 bg-[#A88636]" />
          </div>
        </div>

        <div className="text-right lg:sticky lg:top-28">
          <p className="text-xs font-extrabold" style={{ color: tone.accent }}>قطعة من حبّة</p>
          <h1 className="mt-2 text-4xl font-black leading-[1.12] tracking-[-0.04em] text-[#302722] sm:text-5xl">
            {product.titleAr}
          </h1>
          <p className="mt-2 text-sm font-semibold text-[#887B74]">{product.titleEn}</p>

          <p className="mt-6 text-base leading-8 text-[#5F534D] sm:text-lg">{product.descriptionAr}</p>
          <p className="mt-3 text-xs leading-6 text-[#8A7D76] sm:text-sm">{product.descriptionEn}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.75rem] bg-white/75 p-4">
              <p className="text-[10px] font-extrabold text-[#9A8A82]">السعر</p>
              <p className="mt-1 text-sm font-black text-[#302722]">{product.priceLabelAr}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white/75 p-4">
              <p className="text-[10px] font-extrabold text-[#9A8A82]">الحالة</p>
              <p className="mt-1 text-sm font-black text-[#302722]">{product.statusAr}</p>
            </div>
          </div>

          <div className="mt-5 rounded-[2rem] bg-[#302722] p-5 text-white">
            <p className="text-xs font-extrabold text-[#F0BBB5]">handmade note</p>
            <p className="mt-2 text-sm leading-7 text-[#E4D8D2]">
              كل قطعة معمولة بإيد، فممكن يحصل اختلاف بسيط في ترتيب خرزة أو درجة لون حسب الخامات المتاحة. بنأكد التفاصيل قبل الطلب.
            </p>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <button
              onClick={() => addItem(product.slug, product.titleAr)}
              className="rounded-full bg-[#302722] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#4B3B34]"
            >
              ضيفي لشنطتك
            </button>
            <a
              href={createWhatsAppLink(product.titleAr)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#4F3B31]/15 bg-white/65 px-6 py-3 text-center text-sm font-extrabold text-[#5C4F49] transition hover:bg-white"
            >
              اسألي على واتساب
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-4 text-xs font-bold">
            <Link href="/bundle" className="text-[#8A534B] underline decoration-[#DABCB0] underline-offset-4">
              كمّليها في باندل
            </Link>
            <Link href="/match" className="text-[#66517B] underline decoration-[#CFC0DE] underline-offset-4">
              خلي حبّة ترشحلك معاها
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
