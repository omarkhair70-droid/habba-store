'use client';

import Link from 'next/link';
import { ProductVisual } from '@/components/habba/product-visual';
import type { HabbaProduct } from '@/content/habba-products';
import { useBag } from '@/components/habba/bag/bag-provider';

const toneByCollection: Record<string, { surface: string; accent: string }> = {
  'كولرفل ستار': { surface: '#F3E7B5', accent: '#7A6323' },
  'هدايا صغيرة': { surface: '#F2DFE9', accent: '#985B75' },
  'جرين مود': { surface: '#DDE9CF', accent: '#627B55' },
  'ألوان ناعمة': { surface: '#E7DEF3', accent: '#75628D' },
  'أساسيات هادية': { surface: '#E0E8ED', accent: '#5F7079' },
  'ناتشورال': { surface: '#E9DFD0', accent: '#78634B' }
};

export function ProductCard({ product }: { product: HabbaProduct }) {
  const { addItem } = useBag();
  const tone = toneByCollection[product.collectionAr] ?? { surface: '#F4E9DE', accent: '#79665D' };

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-1"
      style={{ backgroundColor: tone.surface }}
    >
      <Link
        href={'/product/' + product.slug}
        aria-label={'عرض ' + product.titleAr}
        className="relative block aspect-[4/4.35] overflow-hidden"
      >
        <div className="absolute left-3 top-3 z-10 rounded-full bg-white/[0.72] px-2.5 py-1 text-[10px] font-extrabold backdrop-blur">
          <span style={{ color: tone.accent }}>{product.collectionAr}</span>
        </div>
        <ProductVisual
          src={product.image}
          alt={product.titleEn}
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
          className="h-full w-full scale-[1.03] object-contain p-2 transition duration-500 group-hover:-translate-y-1 group-hover:rotate-[1deg] group-hover:scale-[1.08]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-3.5 text-right sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[10px] font-bold text-[#756862] sm:text-[11px]">{product.categoryAr}</p>
          <span className="habba-bead mt-1 h-2.5 w-2.5 shrink-0" style={{ backgroundColor: tone.accent }} aria-hidden="true" />
        </div>

        <h3 className="mt-1 text-sm font-black leading-6 text-[#302722] sm:text-base">
          <Link href={'/product/' + product.slug} className="transition hover:opacity-70">
            {product.titleAr}
          </Link>
        </h3>

        <p className="mt-1 text-[11px] leading-5 text-[#746761] sm:text-xs">{product.priceLabelAr}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <button
            onClick={() => addItem(product.slug, product.titleAr)}
            className="rounded-full bg-[#302722] px-3.5 py-2 text-[11px] font-extrabold text-white transition hover:bg-[#4B3B34] sm:px-4 sm:text-xs"
          >
            ضيفي لشنطتك
          </button>
          <Link
            href={'/product/' + product.slug}
            className="text-[11px] font-bold text-[#61534D] underline decoration-black/15 underline-offset-4 sm:text-xs"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </article>
  );
}
