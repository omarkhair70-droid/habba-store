import Link from 'next/link';
import { HabbaProduct, createWhatsAppLink } from '@/content/habba-products';

export function ProductCard({ product }: { product: HabbaProduct }) {
  return <article className="rounded-2xl border border-[#F0DED0] bg-[#FFFCF7] p-3 shadow-sm">
    <Link href={`/habba/product/${product.slug}`}><img src={product.image} alt={product.titleEn} className="aspect-square w-full rounded-xl object-cover" /></Link>
    <h3 className="mt-2 text-right text-lg font-bold">{product.titleAr}</h3>
    <p className="text-sm">{product.titleEn}</p>
    <p className="text-xs text-[#7B6F68]">{product.category} • {product.collectionAr}</p>
    <p className="text-xs text-[#7B6F68]">السعر: قريبًا</p>
    <a href={createWhatsAppLink(product.titleAr)} target="_blank" className="mt-2 inline-block rounded-full bg-[#F87070] px-4 py-2 text-sm font-bold text-white">اسأل على واتساب</a>
  </article>;
}
