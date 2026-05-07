import Link from 'next/link';
import { HabbaProduct, createWhatsAppLink } from '@/content/habba-products';

export function ProductCard({ product }: { product: HabbaProduct }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#F0DED0] bg-[#FFFCF7] p-3 shadow-sm">
      <Link href={`/product/${product.slug}`}>
        <img src={product.image} alt={product.titleEn} className="aspect-square w-full rounded-xl object-contain bg-white" />
      </Link>
      <div className="mt-3 space-y-1.5">
        <h3 className="text-right text-lg font-bold leading-tight">
          <Link href={`/product/${product.slug}`} className="transition-colors hover:text-[#D86F64] focus-visible:text-[#D86F64]">
            {product.titleAr}
          </Link>
        </h3>
        <p className="text-sm leading-tight text-[#514740]">{product.titleEn}</p>
        <p className="text-xs text-[#7B6F68]">{product.categoryAr} • {product.collectionAr}</p>
        <p className="text-xs text-[#7B6F68]">{product.priceLabelAr}</p>
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
        className="mt-3 inline-block rounded-full bg-[#F87070] px-4 py-2 text-center text-sm font-bold text-white"
      >
        اسأل على واتساب
      </a>
    </article>
  );
}
