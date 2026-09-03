import Link from 'next/link';
import { createWhatsAppLink } from '@/content/habba-products';

export function FinalCtaSection() {
  return (
    <section className="mx-auto w-[94%] max-w-7xl py-14 sm:py-20">
      <div className="relative overflow-hidden rounded-[3rem] bg-[#F56F67] p-7 text-right text-white sm:p-10 lg:p-14">
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[#E7D9F5]/30 blur-2xl" />
        <div className="absolute -bottom-20 right-20 h-56 w-56 rounded-full bg-[#CFE9E1]/25 blur-2xl" />

        <div className="relative max-w-3xl">
          <div className="mb-4 flex gap-2" aria-hidden="true">
            <span className="habba-bead h-4 w-4 bg-[#F7E1A8]" />
            <span className="habba-bead h-6 w-6 bg-[#DDEFE8]" />
            <span className="habba-bead h-5 w-5 bg-[#E9DEF7]" />
          </div>
          <h2 className="text-3xl font-black leading-tight tracking-[-0.03em] sm:text-5xl">لقيتي حاجة شبهك؟</h2>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-white/[0.85] sm:text-base">
            احفظي القطع في شنطتك، أو ابعتي على واتساب عشان نتأكد من التوفر والسعر والتفاصيل قبل الطلب.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={createWhatsAppLink('منتجات حبّة')}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#302722] px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5"
            >
              اسألي حبّة على واتساب
            </a>
            <Link
              href="/shop"
              className="rounded-full border border-white/[0.35] bg-white/[0.15] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/25"
            >
              كمّلي تصفح
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
