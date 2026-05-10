'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/habba/product-card';
import { visibleProducts } from '@/content/habba-products';
import { createBagWhatsAppLink, getBagRecommendations } from '@/lib/habba-bag';
import { useBag } from '@/components/habba/bag/bag-provider';

export function BagPageClient() {
  const { items, itemCount, incrementItem, decrementItem, removeItem } = useBag();

  const bagProducts = items
    .map((item) => {
      const product = visibleProducts.find((entry) => entry.slug === item.slug);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  if (bagProducts.length === 0) {
    return (
      <section className="mx-auto w-[92%] max-w-3xl py-10 text-center">
        <h1 className="text-3xl font-bold text-[#4E433D]">شنطتك لسه فاضية</h1>
        <p className="mt-3 text-sm text-[#7E736D]">اختاري القطع اللي شبهك، ولمّيهم هنا قبل ما تبعتي الطلب على واتساب.</p>
        <Link href="/shop" className="mt-6 inline-block rounded-full bg-[#F87070] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#ef6666]">تسوّقي المنتجات</Link>
      </section>
    );
  }

  const waLink = createBagWhatsAppLink(items);
  const recommendations = getBagRecommendations(items, 3);

  return (
    <section className="mx-auto grid w-[92%] max-w-6xl gap-6 py-8 pb-28 lg:grid-cols-[1fr_320px] lg:pb-8">
      <div>
        <h1 className="text-right text-3xl font-bold text-[#4E433D]">شنطة حبّة</h1>
        <p className="mt-2 text-right text-sm text-[#7E736D]">لمي القطع اللي عجبتك، ولما تكملي ابعتيهم كلهم مرة واحدة على واتساب.</p>

        <div className="mt-5 space-y-3">
          {bagProducts.map(({ slug, quantity, product }) => (
            <article key={slug} className="grid grid-cols-[90px_1fr] gap-3 rounded-2xl border border-[#F0DED0] bg-[#FFFCF7] p-3 sm:grid-cols-[110px_1fr]">
              <img src={product.image} alt={product.titleEn} className="aspect-square w-full rounded-xl border border-[#F4E5D8] bg-white object-contain p-1.5" />
              <div className="text-right">
                <h2 className="text-base font-bold text-[#4E433D]">{product.titleAr}</h2>
                <p className="text-xs text-[#7E736D]">{product.titleEn}</p>
                <p className="mt-1 text-xs text-[#8A7D76]">{product.categoryAr} • {product.collectionAr}</p>
                <div className="mt-3 flex items-center justify-end gap-2">
                  <button onClick={() => incrementItem(slug)} className="h-8 w-8 rounded-full border border-[#EBCFBE] bg-white text-sm font-bold transition hover:border-[#DCA790] hover:text-[#A85A4D]">+</button>
                  <span className="min-w-8 text-center text-sm font-semibold">{quantity}</span>
                  <button onClick={() => decrementItem(slug)} className="h-8 w-8 rounded-full border border-[#EBCFBE] bg-white text-sm font-bold transition hover:border-[#DCA790] hover:text-[#A85A4D]">-</button>
                  <button onClick={() => removeItem(slug)} className="mr-2 text-xs text-[#A85A4D] underline underline-offset-2 transition hover:text-[#8F4C41]">إزالة</button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {recommendations.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-right text-xl font-bold text-[#4E433D]">تكملها حلو</h2>
            <p className="mt-1 text-right text-sm text-[#7E736D]">اختيارات خفيفة ممكن تليق مع اللي في شنطتك.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
          </section>
        ) : null}
      </div>

      <aside className="h-fit rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-4 text-right lg:sticky lg:top-24">
        <h2 className="text-lg font-bold text-[#4E433D]">ملخص الشنطة</h2>
        <p className="mt-1 text-sm text-[#6F635E]">{itemCount} قطع مختارة</p>
        <p className="mt-2 text-xs text-[#7E736D]">السعر النهائي والتوفر يتأكدوا على واتساب.</p>

        {waLink ? (
          <a href={waLink} target="_blank" rel="noreferrer" className="mt-4 hidden rounded-full bg-[#F87070] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#ef6666] lg:block">ابعتِ الشنطة على واتساب</a>
        ) : null}
        <Link href="/shop" className="mt-2 block rounded-full border border-[#EBCFBE] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#5E534C]">كمّلي تسوّق</Link>
      </aside>

      {waLink ? <a href={waLink} target="_blank" rel="noreferrer" className="fixed inset-x-4 bottom-4 z-20 rounded-full bg-[#F87070] px-4 py-3 text-center text-sm font-bold text-white shadow-lg transition hover:bg-[#ef6666] lg:hidden">ابعتِ الشنطة على واتساب</a> : null}
    </section>
  );
}
