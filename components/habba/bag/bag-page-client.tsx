'use client';

import Link from 'next/link';
import { ProductVisual } from '@/components/habba/product-visual';
import { ProductCard } from '@/components/habba/product-card';
import { visibleProducts } from '@/content/habba-products';
import { createBagWhatsAppLink, getBagRecommendations } from '@/lib/habba-bag';
import { useBag } from '@/components/habba/bag/bag-provider';

const toneByCollection: Record<string, string> = {
  'كولرفل ستار': '#F3E7B5',
  'هدايا صغيرة': '#F2DFE9',
  'جرين مود': '#DDE9CF',
  'ألوان ناعمة': '#E7DEF3',
  'أساسيات هادية': '#E0E8ED',
  'ناتشورال': '#E9DFD0'
};

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
      <section className="mx-auto w-[94%] max-w-5xl py-14 sm:py-20">
        <div className="grid overflow-hidden rounded-[3rem] bg-[#F2DFE9] lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="p-7 text-right sm:p-10">
            <p className="text-xs font-extrabold text-[#985B75]">شنطة حبّة</p>
            <h1 className="mt-2 text-4xl font-black leading-tight tracking-[-0.04em] text-[#302722] sm:text-5xl">لسه فاضية.</h1>
            <p className="mt-4 text-sm leading-8 text-[#655851] sm:text-base">
              اختاري القطع اللي شبهك، أو خلي Habba Match يبدأ معاكي لو مش عارفة تختاري منين.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link href="/shop" className="rounded-full bg-[#302722] px-6 py-3 text-sm font-extrabold text-white">شوفي المنتجات</Link>
              <Link href="/match" className="rounded-full border border-[#6F5360]/[0.15] bg-white/[0.55] px-6 py-3 text-sm font-extrabold text-[#714F5E]">حبّة ترشحلك</Link>
            </div>
          </div>
          <div className="relative min-h-[340px] bg-[#F7E7B9]">
            <ProductVisual
              src="/images/habba/products/hbb-pastel-candy-bracelet-card.png"
              alt="أسورة ألوان باستيل"
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="absolute inset-[6%] h-[88%] w-[88%] scale-[1.08] object-contain"
            />
          </div>
        </div>
      </section>
    );
  }

  const waLink = createBagWhatsAppLink(items);
  const recommendations = getBagRecommendations(items, 3);

  return (
    <section className="mx-auto w-[94%] max-w-7xl py-10 pb-28 sm:py-14 lg:pb-16">
      <div className="mb-8 max-w-3xl text-right">
        <p className="text-xs font-extrabold text-[#A9534D]">اختياراتك اتجمعت</p>
        <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#302722] sm:text-5xl">شنطة حبّة</h1>
        <p className="mt-3 text-sm leading-7 text-[#746761] sm:text-base">
          هنا بنجمع القطع قبل handoff واحد على واتساب. التوفر والسعر النهائي يتأكدوا هناك.
        </p>
      </div>

      <div className="grid gap-7 lg:grid-cols-[1fr_340px] lg:items-start">
        <div>
          <div className="space-y-3">
            {bagProducts.map(({ slug, quantity, product }) => (
              <article
                key={slug}
                className="grid grid-cols-[105px_1fr] gap-4 overflow-hidden rounded-[2rem] p-3 sm:grid-cols-[150px_1fr] sm:p-4"
                style={{ backgroundColor: toneByCollection[product.collectionAr] ?? '#F1E5DA' }}
              >
                <Link href={'/product/' + product.slug} className="overflow-hidden rounded-[1.5rem] bg-white/[0.55]">
                  <ProductVisual
                    src={product.image}
                    alt={product.titleEn}
                    sizes="(max-width: 640px) 105px, 150px"
                    className="aspect-square h-full w-full object-contain p-1"
                  />
                </Link>
                <div className="flex min-w-0 flex-col justify-between text-right">
                  <div>
                    <p className="text-[10px] font-extrabold text-[#786A63]">{product.collectionAr}</p>
                    <h2 className="mt-1 text-base font-black text-[#302722] sm:text-lg">{product.titleAr}</h2>
                    <p className="mt-1 text-xs text-[#766862]">{product.priceLabelAr}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 rounded-full bg-white/60 p-1">
                      <button
                        onClick={() => incrementItem(slug)}
                        aria-label={'زيادة كمية ' + product.titleAr}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#302722] text-sm font-black text-white"
                      >
                        +
                      </button>
                      <span className="min-w-7 text-center text-sm font-black">{quantity}</span>
                      <button
                        onClick={() => decrementItem(slug)}
                        aria-label={'تقليل كمية ' + product.titleAr}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-black text-[#302722]"
                      >
                        −
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(slug)}
                      className="text-xs font-bold text-[#7A5D56] underline decoration-black/15 underline-offset-4"
                    >
                      شيليها
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {recommendations.length > 0 ? (
            <section className="mt-12">
              <div className="mb-5 text-right">
                <p className="text-xs font-extrabold text-[#A9534D]">ممكن تمشي معاهم</p>
                <h2 className="mt-1 text-2xl font-black">كمّلي التكوين</h2>
                <p className="mt-2 text-sm text-[#746761]">ترشيحات من الكتالوج حسب اللي جمعتيه.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
                {recommendations.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="h-fit overflow-hidden rounded-[2.5rem] bg-[#302722] p-6 text-right text-white lg:sticky lg:top-28">
          <div className="flex items-center justify-between gap-4">
            <span className="habba-bead h-7 w-7 bg-[#F56F67]" aria-hidden="true" />
            <p className="text-xs font-extrabold text-[#F0BBB5]">جاهزة للhandoff</p>
          </div>
          <h2 className="mt-5 text-2xl font-black">ملخص الشنطة</h2>
          <p className="mt-2 text-sm text-[#DCCFC9]">{itemCount} قطع مختارة</p>
          <p className="mt-4 text-xs leading-6 text-[#BFB0AA]">
            مفيش دفع أو سعر نهائي هنا؛ حبّة بتأكد التوفر والسعر والتفاصيل معاكِ على واتساب.
          </p>

          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 hidden rounded-full bg-[#F56F67] px-5 py-3 text-center text-sm font-extrabold text-white transition hover:bg-[#E9625B] lg:block"
            >
              ابعتي الشنطة على واتساب
            </a>
          ) : null}
          <Link
            href="/shop"
            className="mt-2 block rounded-full border border-white/20 px-5 py-3 text-center text-sm font-extrabold text-white transition hover:bg-white/10"
          >
            كمّلي تسوّق
          </Link>
        </aside>
      </div>

      {waLink ? (
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="fixed inset-x-4 bottom-4 z-30 rounded-full bg-[#302722] px-4 py-3.5 text-center text-sm font-extrabold text-white shadow-2xl lg:hidden"
        >
          ابعتي الشنطة على واتساب
        </a>
      ) : null}
    </section>
  );
}
