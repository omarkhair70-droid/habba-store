import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { ProductDetailView } from '@/components/habba/product-detail/product-detail-view';
import { RelatedProducts } from '@/components/habba/product-detail/related-products';
import { visibleProducts } from '@/content/habba-products';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = visibleProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'المنتج غير موجود',
      description: 'هذا المنتج غير متاح حاليًا على حبّة.'
    };
  }

  const title = product.titleAr;
  const description = `${product.descriptionAr} ${product.descriptionEn}`;
  return {
    title,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.titleAr} | ${product.titleEn} | Habba`,
      description,
      url: `/product/${product.slug}`,
      images: [product.image],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image]
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = visibleProducts.find((p) => p.slug === slug);

  if (!product) notFound();

  const related = visibleProducts.filter((p) => p.collection === product.collection && p.slug !== product.slug);

  return (
    <main>
      <HabbaHeader />
      <ProductDetailView product={product} />
      <RelatedProducts related={related} />
      <HabbaFooter />
    </main>
  );
}
