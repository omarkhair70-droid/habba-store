import Link from 'next/link';
import { HabbaProduct, createWhatsAppLink } from '@/content/habba-products';

export function ProductCard({ product }: { product: HabbaProduct }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#F0DED0] bg-[#FFFCF7] p-2.5 shadow-sm sm:p-3">
      <Link href={`/product/${product.slug}`} className="block rounded-xl bg-white p-1.5">
        <img src={product.image} alt={product.titleEn} className="aspect-square w-full rounded-lg object-contain" />
      </Link>
      <div className="mt-2.5 flex flex-1 flex-col space-y-1.5">
        <h3 className="text-right text-base font-bold leading-snug sm:text-lg">
          <Link href={`/product/${product.slug}`} className="transition-colors hover:text-[#D86F64] focus-visible:text-[#D86F64]">
            {product.titleAr}
          </Link>
        </h3>
        <p className="line-clamp-2 text-xs leading-snug text-[#6B615B] sm:text-sm">{product.titleEn}</p>
        <p className="text-[11px] text-[#8A7D76]">{product.categoryAr} • {product.collectionAr}</p>
        <p className="text-[11px] text-[#7B6F68]">{product.priceLabelAr}</p>
        <Link
          href={`/product/${product.slug}`}
          aria-label={`عرض تفاصيل ${product.titleAr}`}
          className="inline-flex text-xs text-[#D07D70] transition-colors hover:text-[#F87070] hover:underline focus-visible:text-[#F87070] focus-visible:underline"
        >
          تفاصيل القطعة ←
        </Link>
      </div>
      <a
        href={createWhatsAppLink(product.titleAr)}
        target="_blank"
        rel="noreferrer"
        className="mt-2.5 inline-block rounded-full bg-[#F87070] px-3 py-1.5 text-center text-xs font-bold text-white sm:px-4 sm:py-2 sm:text-sm"
      >
        اسأل على واتساب
      </a>
    </article>
  );
}
