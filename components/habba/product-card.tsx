'use client';

import Link from 'next/link';
import { HabbaProduct, createWhatsAppLink } from '@/content/habba-products';
import { useBag } from '@/components/habba/bag/bag-provider';

export function ProductCard({ product }: { product: HabbaProduct }) {
  const { addItem } = useBag();

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#F0DED0] bg-[#FFFCF7] p-2.5 shadow-sm transition hover:border-[#E8CDBA] sm:p-3">
      <Link href={`/product/${product.slug}`} className="block rounded-xl border border-[#F4E5D8] bg-white p-2">
        <img src={product.image} alt={product.titleEn} className="aspect-square w-full rounded-lg object-contain" />
      </Link>
      <div className="mt-2.5 flex flex-1 flex-col space-y-1.5 text-right">
        <h3 className="text-sm font-bold leading-relaxed sm:text-base">
          <Link href={`/product/${product.slug}`} className="transition-colors hover:text-[#D86F64] focus-visible:text-[#D86F64]">
            {product.titleAr}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[11px] leading-relaxed text-[#7E736D] sm:text-xs">{product.titleEn}</p>
        <p className="text-[11px] text-[#8A7D76]">{product.categoryAr} • {product.collectionAr}</p>
        <p className="text-xs font-medium text-[#6F635E]">{product.priceLabelAr}</p>
        <Link
          href={`/product/${product.slug}`}
          aria-label={`عرض تفاصيل ${product.titleAr}`}
          className="inline-flex text-xs text-[#D07D70] transition-colors hover:text-[#F87070] hover:underline focus-visible:text-[#F87070] focus-visible:underline"
        >
          تفاصيل القطعة ←
        </Link>
      </div>
      <div className="mt-3 grid gap-2">
        <button
          onClick={() => addItem(product.slug, product.titleAr)}
          className="rounded-full bg-[#F87070] px-3 py-1.5 text-center text-xs font-bold text-white transition hover:bg-[#ef6666] sm:px-4 sm:py-2"
        >
          ضيفي لشنطتك
        </button>
        <a
          href={createWhatsAppLink(product.titleAr)}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[#EBCFBE] bg-white px-3 py-1.5 text-center text-xs font-semibold text-[#5E534C] transition hover:border-[#F87070] hover:text-[#F87070]"
        >
          اسأل على واتساب
        </a>
      </div>
    </article>
  );
}
