import { habbaBrandTags } from '@/content/habba-sections';

export function BrandPromiseSection() {
  return (
    <section className="mx-auto w-[92%] max-w-6xl py-5">
      <article className="grid items-center gap-5 rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-5 md:grid-cols-2 md:gap-8 md:p-6">
        <div className="order-2 md:order-1 rounded-3xl border border-[#F0DED0] bg-[#FFFCF7] p-3">
          <img src="/images/habba/products/hbb-lavender-rose-bracelet-card.png" alt="Lavender rose bracelet" className="mx-auto aspect-square w-full max-w-xs rounded-2xl object-contain" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-right text-2xl font-bold leading-tight sm:text-3xl">معمولة بإيد، بألوان تفرّح</h2>
          <p className="mt-3 max-w-xl text-right text-sm leading-relaxed text-[#615651] sm:text-base">حبّة بتقدّم قطع خرز خفيفة وملونة، معمولة بإيد وبشكل صادق. كل قطعة بسيطة، لطيفة، ومناسبة لتفصيلة يومية أو هدية صغيرة.</p>
          <div className="mt-4 flex flex-wrap justify-end gap-2 text-sm text-[#6B615B]">
            {habbaBrandTags.map((tag) => <span key={tag} className="rounded-full border border-[#F0DED0] bg-[#FFFCF7] px-3 py-1">{tag}</span>)}
          </div>
        </div>
      </article>
    </section>
  );
}
