import Link from 'next/link';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { ProductCard } from '@/components/habba/product-card';
import { createWhatsAppLink, launchProducts } from '@/content/habba-products';

const featured = launchProducts.filter((p) => p.featured).slice(0, 8);

export default function HabbaHomePage() {
  return (
    <main>
      <HabbaHeader />

      <section className="mx-auto grid w-[92%] max-w-6xl gap-4 py-5 md:grid-cols-2 md:items-center md:gap-6 md:py-8">
        <div className="space-y-2.5">
          <p className="text-right text-sm font-medium text-[#6B615B]">إكسسوارات خرز معمولة بإيد</p>
          <h1 className="text-right text-3xl font-extrabold leading-tight sm:text-4xl">حبّة حلوة لكل يوم</h1>
          <p className="text-right text-sm leading-relaxed sm:text-base">
            قطع خرز خفيفة وملونة، معمولة بإيد، مناسبة للبس اليومي أو كهدية بسيطة.
          </p>
          <p className="text-xs leading-relaxed text-[#7B6F68] sm:text-sm">
            Handmade bead accessories, colorful, light, and giftable. Made to feel playful, honest, and easy to wear.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/shop" className="rounded-full bg-[#F87070] px-4 py-2 text-sm font-bold text-white sm:text-base">
              تسوّقي المنتجات
            </Link>
            <a
              href={createWhatsAppLink('منتجات حبّة')}
              className="rounded-full border border-[#F0DED0] bg-[#FFFCF7] px-4 py-2 text-sm font-bold sm:text-base"
            >
              اطلب عبر واتساب
            </a>
          </div>
        </div>
        <div className="rounded-3xl bg-[#fff7ee] p-2.5 sm:p-3">
          <img
            src="/images/habba/products/hbb-colorful-star-set-card.png"
            alt="Colorful star set"
            className="aspect-square w-full rounded-2xl bg-white object-contain shadow"
          />
        </div>
      </section>

      <section className="mx-auto w-[92%] max-w-6xl py-4">
        <h2 className="mb-3 text-right text-2xl font-bold">منتجات مميزة</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-[92%] max-w-6xl py-6">
        <h2 className="mb-3 text-right text-2xl font-bold">لمسة حبّة</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <article className="rounded-2xl border border-[#F0DED0] bg-[#fff7ee] p-4">
            <h3 className="text-right font-bold">وعد الهاندميد</h3>
            <p className="mt-2 text-right text-sm text-[#615651]">معمولة بإيد، بألوان خفيفة، وبتفاصيل بسيطة.</p>
          </article>
          <article className="rounded-2xl border border-[#F0DED0] bg-[#fff7ee] p-4">
            <h3 className="text-right font-bold">طريقة الطلب</h3>
            <ol className="mt-2 space-y-1 text-right text-sm text-[#615651]">
              <li>1. اختاري القطعة</li>
              <li>2. اسألي على واتساب</li>
              <li>3. نأكد التوفر والتفاصيل</li>
            </ol>
          </article>
          <article className="rounded-2xl border border-[#F0DED0] bg-[#fff7ee] p-4">
            <h3 className="text-right font-bold">Giftable note</h3>
            <p className="mt-2 text-right text-sm text-[#615651]">مناسبة كهدايا صغيرة أو تفصيلة حلوة في اليوم.</p>
          </article>
        </div>
      </section>

      <HabbaFooter />
    </main>
  );
}
