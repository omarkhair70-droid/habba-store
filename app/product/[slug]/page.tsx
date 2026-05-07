import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { ProductCard } from '@/components/habba/product-card';
import { createWhatsAppLink, launchProducts } from '@/content/habba-products';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = launchProducts.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'المنتج غير موجود | Habba',
      description: 'هذا المنتج غير متاح حاليًا على حبّة.'
    };
  }

  const title = `${product.titleAr} | Habba`;
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
  const product = launchProducts.find((p) => p.slug === slug);

  if (!product) notFound();

  const related = launchProducts.filter((p) => p.collection === product.collection && p.slug !== product.slug);

  return (
    <main>
      <HabbaHeader />

      <section className="mx-auto grid w-[92%] max-w-6xl gap-5 py-6 md:grid-cols-2 md:gap-8 md:py-8">
        <div className="rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-3">
          <img src={product.image} alt={product.titleEn} className="aspect-square w-full rounded-2xl bg-white object-contain" />
        </div>

        <div className="rounded-3xl border border-[#F0DED0] bg-[#FFFCF7] p-4 sm:p-5">
          <div className="mb-2 flex flex-wrap justify-end gap-2">
            <span className="rounded-full border border-[#F0DED0] bg-[#fff7ee] px-2.5 py-1 text-xs text-[#6B615B]">{product.categoryAr}</span>
            <span className="rounded-full border border-[#F0DED0] bg-[#fff7ee] px-2.5 py-1 text-xs text-[#6B615B]">{product.collectionAr}</span>
          </div>

          <h1 className="text-right text-2xl font-bold sm:text-3xl">{product.titleAr}</h1>
          <h2 className="mt-1 text-sm text-[#6B615B] sm:text-base">{product.titleEn}</h2>

          <p className="mt-4 text-right leading-relaxed">{product.descriptionAr}</p>
          <p className="mt-2 text-sm leading-relaxed text-[#7B6F68]">{product.descriptionEn}</p>

          <div className="mt-4 rounded-2xl bg-[#fff7ee] p-3">
            <p className="text-right font-semibold">{product.priceLabelAr}</p>
            <p className="mt-1 text-right text-sm text-[#7B6F68]">{product.statusAr}</p>
          </div>

          <p className="mt-3 text-right text-xs text-[#7B6F68]">كل قطعة handmade، وقد تختلف التفاصيل البسيطة حسب الخامات المتاحة.</p>

          <a
            href={createWhatsAppLink(product.titleAr)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-full bg-[#F87070] px-5 py-2 text-sm font-bold text-white sm:text-base"
          >
            اسأل على واتساب
          </a>
        </div>
      </section>

      <section className="mx-auto w-[92%] max-w-6xl pb-10">
        <h3 className="mb-4 text-right text-xl font-bold">منتجات مشابهة</h3>
        {related.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-right text-sm text-[#7B6F68]">لا يوجد منتجات مشابهة حاليًا.</p>
        )}
      </section>

      <HabbaFooter />
    </main>
  );
}
