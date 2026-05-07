import { notFound } from 'next/navigation';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { ProductCard } from '@/components/habba/product-card';
import { createWhatsAppLink, launchProducts } from '@/content/habba-products';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = launchProducts.find((p) => p.slug === slug);
  if (!product) notFound();
  const related = launchProducts.filter((p) => p.collection === product.collection && p.slug !== product.slug);
  return <main><HabbaHeader /><section className="mx-auto w-[92%] max-w-6xl py-8 md:grid md:grid-cols-2 md:gap-8"><img src={product.image} alt={product.titleEn} className="aspect-square w-full rounded-3xl object-contain bg-white" /><div><h1 className="text-right text-3xl font-bold">{product.titleAr}</h1><h2 className="text-xl">{product.titleEn}</h2><p className="text-sm text-[#7B6F68]">{product.category} • {product.collectionAr}</p><p className="mt-4 text-right">{product.descriptionAr}</p><p className="mt-2 text-sm text-[#7B6F68]">{product.descriptionEn}</p><p className="mt-2">السعر: قريبًا</p><a href={createWhatsAppLink(product.titleAr)} target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-full bg-[#F87070] px-4 py-2 font-bold text-white">اسأل على واتساب</a></div></section><section className="mx-auto w-[92%] max-w-6xl pb-10"><h3 className="mb-3 text-right text-xl font-bold">منتجات مشابهة</h3><div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{related.map((p)=><ProductCard key={p.slug} product={p} />)}</div></section><HabbaFooter /></main>;
}
