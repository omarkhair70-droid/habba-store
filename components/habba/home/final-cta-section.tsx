import { createWhatsAppLink } from '@/content/habba-products';

export function FinalCtaSection() {
  return (
    <section className="mx-auto w-[92%] max-w-6xl py-6">
      <article className="rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-5 text-right md:p-7">
        <h2 className="text-2xl font-bold">لقيتي قطعة شبهك؟</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#615651] sm:text-base">اسألي عن التوفر والتفاصيل، ونرد عليكِ على واتساب.</p>
        <a href={createWhatsAppLink('منتجات حبّة')} className="mt-4 inline-block rounded-full bg-[#F87070] px-5 py-2 text-sm font-bold text-white sm:text-base">اسألي على واتساب</a>
      </article>
    </section>
  );
}
