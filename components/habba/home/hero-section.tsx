import Link from 'next/link';
import { createWhatsAppLink } from '@/content/habba-products';

export function HeroSection() {
  return (
    <section className="mx-auto grid w-[92%] max-w-6xl gap-5 py-6 md:grid-cols-2 md:items-center md:gap-8 md:py-10">
      <div className="space-y-3 text-right">
        <p className="text-sm font-medium text-[#6B615B]">إكسسوارات خرز معمولة بإيد</p>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">حبّة حلوة لكل يوم</h1>
        <p className="max-w-xl text-sm leading-relaxed sm:text-base">قطع خرز خفيفة وملونة، معمولة بإيد، مناسبة لتفصيلة يومية أو هدية بسيطة.</p>
        <p className="text-xs leading-relaxed text-[#8A7D76] sm:text-sm">Handmade bead accessories, colorful, light, and giftable.</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <Link href="/shop" className="rounded-full bg-[#F87070] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#ef6666]">تسوّقي المنتجات</Link>
          <a href={createWhatsAppLink('منتجات حبّة')} className="rounded-full border border-[#EFD9CB] bg-[#FFFCF7] px-4 py-2 text-sm font-semibold text-[#574B45] transition hover:border-[#E4C3AD]">اسألي على واتساب</a>
        </div>
      </div>
      <div className="rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-2.5 sm:p-3">
        <img src="/images/habba/products/hbb-colorful-star-set-card.png" alt="Colorful star set" className="aspect-square w-full rounded-2xl bg-white object-contain shadow" />
      </div>
    </section>
  );
}
