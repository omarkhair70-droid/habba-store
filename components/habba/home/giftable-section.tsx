import Link from 'next/link';

export function GiftableSection() {
  return (
    <section className="mx-auto w-[94%] max-w-7xl py-12 sm:py-16">
      <div className="grid overflow-hidden rounded-[2.75rem] bg-[#F7E2B4] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="order-2 p-6 text-right sm:p-9 lg:order-1 lg:p-12">
          <p className="text-xs font-extrabold text-[#8A682C]">لو دي هدية</p>
          <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight tracking-[-0.03em] sm:text-5xl">
            ابدئي بالشخص،
            <span className="block">مش باسم المنتج.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-8 text-[#6B5836] sm:text-base">
            قولي لحبّة الهدية لمين، والمود إيه، والألوان الأقرب — وخلي الترشيح يبدأ من المناسبة بدل ما تلفّي في الكتالوج كله.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/match" className="rounded-full bg-[#302722] px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5">
              اختاري هدية مع Habba Match
            </Link>
            <Link href="/shop?filter=cute-gift" className="rounded-full border border-[#6C532E]/20 bg-white/55 px-6 py-3 text-sm font-extrabold text-[#684F27] transition hover:bg-white/75">
              شوفي هدايا صغيرة
            </Link>
          </div>
        </div>

        <div className="relative order-1 min-h-[330px] bg-[#F0DCE8] lg:order-2 lg:min-h-[480px]">
          <img
            src="/images/habba/products/hbb-pink-strawberry-necklace-card.png"
            alt="عقد فراولة وردي"
            className="absolute inset-[8%] h-[84%] w-[84%] object-contain"
          />
          <div className="absolute left-6 top-6 flex gap-2" aria-hidden="true">
            <span className="habba-bead h-5 w-5 bg-[#F56F67]" />
            <span className="habba-bead h-7 w-7 bg-[#CBE9E2]" />
            <span className="habba-bead h-4 w-4 bg-[#F4DFA0]" />
          </div>
        </div>
      </div>
    </section>
  );
}
