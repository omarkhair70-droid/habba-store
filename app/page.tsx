import type { Metadata } from 'next';
import Link from 'next/link';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { ProductCard } from '@/components/habba/product-card';
import { createWhatsAppLink, launchProducts } from '@/content/habba-products';

export const metadata: Metadata = {
  title: 'حبّة إكسسوارات خرز handmade',
  description:
    'حبّة — إكسسوارات خرز handmade، ملونة، بسيطة، ومناسبة كهدايا صغيرة. Handmade bead accessories, colorful, light, and giftable.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Habba | حبّة',
    description: 'حبّة براند إكسسوارات خرز handmade، ملونة وخفيفة ومناسبة للهدايا البسيطة.',
    url: '/',
    images: ['/images/habba/brand/hbb-logo-preview.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habba | حبّة',
    description: 'Handmade bead accessories, colorful, light, and giftable.',
    images: ['/images/habba/brand/hbb-logo-preview.png']
  }
};

const featured = launchProducts.filter((p) => p.featured).slice(0, 8);

const orderSteps = ['اختاري القطعة', 'اضغطي اسأل على واتساب', 'نأكد التوفر والتفاصيل', 'نتفق على الاستلام أو التوصيل'];
const trustNotes = ['كل قطعة handmade', 'التوفر حسب الخامات المتاحة', 'الألوان ممكن تختلف اختلاف بسيط حسب الإضاءة', 'الطلب حاليًا عبر واتساب فقط'];

export default function HabbaHomePage() {
  return (
    <main>
      <HabbaHeader />

      <section className="mx-auto grid w-[92%] max-w-6xl gap-5 py-6 md:grid-cols-2 md:items-center md:gap-8 md:py-10">
        <div className="space-y-3">
          <p className="text-right text-sm font-medium text-[#6B615B]">إكسسوارات خرز معمولة بإيد</p>
          <h1 className="text-right text-3xl font-extrabold leading-tight sm:text-4xl">حبّة حلوة لكل يوم</h1>
          <p className="text-right text-sm leading-relaxed sm:text-base">
            قطع خرز خفيفة وملونة، معمولة بإيد، مناسبة لتفصيلة يومية أو هدية بسيطة.
          </p>
          <p className="text-xs leading-relaxed text-[#7B6F68] sm:text-sm">
            Handmade bead accessories, colorful, light, and giftable.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link href="/shop" className="rounded-full bg-[#F87070] px-4 py-2 text-sm font-bold text-white sm:text-base">
              تسوّقي المنتجات
            </Link>
            <a
              href={createWhatsAppLink('منتجات حبّة')}
              className="rounded-full border border-[#F0DED0] bg-[#FFFCF7] px-4 py-2 text-sm font-bold sm:text-base"
            >
              اسألي على واتساب
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-2.5 sm:p-3">
          <img
            src="/images/habba/products/hbb-colorful-star-set-card.png"
            alt="Colorful star set"
            className="aspect-square w-full rounded-2xl bg-white object-contain shadow"
          />
        </div>
      </section>

      <section className="mx-auto w-[92%] max-w-6xl py-5">
        <h2 className="mb-3 text-right text-2xl font-bold">منتجات مميزة</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-[92%] max-w-6xl py-5">
        <article className="rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-5 md:p-6">
          <h2 className="text-right text-2xl font-bold">معمولة بإيد، بألوان تفرّح</h2>
          <p className="mt-3 max-w-2xl text-right text-sm leading-relaxed text-[#615651] sm:text-base">
            حبّة بتقدّم قطع خرز خفيفة وملونة، معمولة بإيد وبشكل صادق. كل قطعة بسيطة، لطيفة، ومناسبة لتفصيلة يومية أو هدية صغيرة.
          </p>
          <div className="mt-4 flex flex-wrap justify-end gap-2 text-sm text-[#6B615B]">
            <span className="rounded-full border border-[#F0DED0] bg-[#FFFCF7] px-3 py-1">handmade</span>
            <span className="rounded-full border border-[#F0DED0] bg-[#FFFCF7] px-3 py-1">ألوان خفيفة</span>
            <span className="rounded-full border border-[#F0DED0] bg-[#FFFCF7] px-3 py-1">مناسبة كهدايا بسيطة</span>
          </div>
        </article>
      </section>

      <section className="mx-auto w-[92%] max-w-6xl py-2">
        <article className="rounded-3xl border border-[#F0DED0] bg-[#FFFCF7] p-5 md:p-6">
          <h2 className="text-right text-2xl font-bold">هدية صغيرة، أو لمسة حلوة ليومك</h2>
          <p className="mt-3 text-right text-sm leading-relaxed text-[#615651] sm:text-base">
            اختيارات خفيفة وسهلة اللبس، من غير فخامة مبالغ فيها أو شكل بعيد عن المنتج الحقيقي.
          </p>
        </article>
      </section>

      <section className="mx-auto w-[92%] max-w-6xl py-6">
        <h2 className="mb-3 text-right text-2xl font-bold">Collections</h2>
        <p className="mb-4 text-right text-sm text-[#7B6F68]">تشكيلات ملونة تناسب يومك وهدية بسيطة بنفس روح حبّة.</p>
        <div className="grid gap-3 md:grid-cols-3">
          <article className="rounded-2xl border border-[#F0DED0] bg-[#fff7ee] p-4 text-right">
            <h3 className="font-bold">أطقم مبهجة</h3>
            <p className="mt-1 text-sm text-[#615651]">أطقم خرز خفيفة بتفاصيل مرحة.</p>
          </article>
          <article className="rounded-2xl border border-[#F0DED0] bg-[#fff7ee] p-4 text-right">
            <h3 className="font-bold">قطع يومية</h3>
            <p className="mt-1 text-sm text-[#615651]">أساور وعقود بسيطة وسهلة اللبس.</p>
          </article>
          <article className="rounded-2xl border border-[#F0DED0] bg-[#fff7ee] p-4 text-right">
            <h3 className="font-bold">هدايا صغيرة</h3>
            <p className="mt-1 text-sm text-[#615651]">اختيارات لطيفة للهدايا البسيطة.</p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-[92%] max-w-6xl py-4">
        <article className="rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-5 md:p-6">
          <h2 className="text-right text-2xl font-bold">طريقة الطلب بسيطة</h2>
          <ol className="mt-3 space-y-2 text-right text-sm text-[#615651] sm:text-base">
            {orderSteps.map((step, idx) => (
              <li key={step}>{idx + 1}. {step}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="mx-auto w-[92%] max-w-6xl py-4">
        <article className="rounded-3xl border border-[#F0DED0] bg-[#FFFCF7] p-5 md:p-6">
          <h2 className="text-right text-2xl font-bold">قبل ما تطلبي</h2>
          <ul className="mt-3 space-y-2 text-right text-sm text-[#615651] sm:text-base">
            {trustNotes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mx-auto w-[92%] max-w-6xl py-6">
        <article className="rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-5 text-right md:p-7">
          <h2 className="text-2xl font-bold">لقيتي قطعة شبهك؟</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#615651] sm:text-base">اسألي عن التوفر والتفاصيل، ونرد عليكِ على واتساب.</p>
          <a
            href={createWhatsAppLink('منتجات حبّة')}
            className="mt-4 inline-block rounded-full bg-[#F87070] px-5 py-2 text-sm font-bold text-white sm:text-base"
          >
            اسألي على واتساب
          </a>
        </article>
      </section>

      <HabbaFooter />
    </main>
  );
}
