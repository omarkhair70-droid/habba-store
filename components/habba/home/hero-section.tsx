import Link from 'next/link';

const beads = [
  { color: '#F56F67', size: 'h-5 w-5' },
  { color: '#DFD1F4', size: 'h-8 w-8' },
  { color: '#CBE9E2', size: 'h-6 w-6' },
  { color: '#F4DFA0', size: 'h-4 w-4' },
  { color: '#CDD9B8', size: 'h-7 w-7' }
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#4F3B31]/10">
      <div className="habba-soft-grid absolute inset-0 -z-20 opacity-50" />
      <div className="absolute -left-20 top-12 -z-10 h-72 w-72 rounded-full bg-[#DFD1F4]/45 blur-3xl" />
      <div className="absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-[#CBE9E2]/45 blur-3xl" />

      <div className="mx-auto grid min-h-[76vh] w-[94%] max-w-7xl items-center gap-10 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-16">
        <div className="order-1 text-right">
          <div className="mb-5 flex items-center justify-start gap-2 text-xs font-extrabold tracking-wide text-[#786861] sm:text-sm">
            <span className="habba-bead h-3 w-3 bg-[#F56F67]" />
            <span>إكسسوارات خرز معمولة بإيد</span>
          </div>

          <h1 className="max-w-2xl text-[2.85rem] font-black leading-[1.08] tracking-[-0.045em] text-[#302722] sm:text-6xl lg:text-7xl">
            حبّة صغيرة،
            <span className="block text-[#D95F58]">تغيّر المود كله.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#665954] sm:text-lg">
            أساور وعقود وأطقم خرز خفيفة وملونة. اختاري قطعة جاهزة، أو خلي حبّة تساعدك تجمعي مود كامل شبهك.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-[#302722] px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#4A3932]"
            >
              شوفي كل القطع
            </Link>
            <Link
              href="/match"
              className="rounded-full border border-[#D9B5AA] bg-white/75 px-6 py-3 text-sm font-extrabold text-[#8D4B46] transition hover:-translate-y-0.5 hover:bg-[#FFE9E1]"
            >
              مش عارفة تبدأي؟ حبّة ترشحلك
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-2 border-t border-[#4F3B31]/12 pt-5 text-xs leading-5 text-[#766963] sm:text-sm">
            <p>معمولة بإيد</p>
            <p>التوفر حسب الخامات</p>
            <p>السعر يتأكد على واتساب</p>
          </div>
        </div>

        <div className="relative order-2 mx-auto min-h-[420px] w-full max-w-2xl lg:min-h-[560px]">
          <div className="absolute left-[7%] top-[4%] flex items-center gap-2">
            {beads.map((bead, index) => (
              <span
                key={index}
                className={'habba-bead ' + bead.size}
                style={{ backgroundColor: bead.color }}
              />
            ))}
          </div>

          <div className="absolute right-[7%] top-[8%] h-[72%] w-[74%] rotate-[-3deg] rounded-[3.5rem] border border-[#6A4D3E]/12 bg-[#F6E8D8] habba-tray-shadow" />
          <div className="absolute right-[13%] top-[13%] h-[62%] w-[66%] rotate-[2deg] rounded-[3rem] bg-white/85" />

          <Link
            href="/product/colorful-star-set"
            className="habba-float absolute right-[14%] top-[14%] z-10 block w-[64%] overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/90 p-3 shadow-[0_24px_70px_rgba(86,57,46,0.14)] transition hover:scale-[1.015]"
          >
            <img
              src="/images/habba/products/hbb-colorful-star-set-card.png"
              alt="طقم النجوم الملونة"
              className="aspect-square w-full rounded-[2rem] object-contain"
            />
          </Link>

          <Link
            href="/product/lavender-rose-bracelet"
            className="habba-float-slow absolute bottom-[4%] left-[2%] z-20 block w-[37%] rotate-[-5deg] rounded-[2rem] border border-[#6A4D3E]/10 bg-[#E9DEF7] p-2.5 shadow-[0_18px_50px_rgba(86,57,46,0.12)] transition hover:rotate-[-2deg]"
          >
            <img
              src="/images/habba/products/hbb-lavender-rose-bracelet-card.png"
              alt="أسورة لافندر بوردة"
              className="aspect-square w-full rounded-[1.55rem] bg-white/75 object-contain"
            />
          </Link>

          <Link
            href="/product/green-speckle-bracelet"
            className="absolute bottom-[8%] right-[3%] z-20 block w-[30%] rotate-[6deg] rounded-[2rem] border border-[#6A4D3E]/10 bg-[#DDE9C9] p-2 shadow-[0_16px_44px_rgba(86,57,46,0.1)] transition hover:rotate-[2deg]"
          >
            <img
              src="/images/habba/products/hbb-green-speckle-bracelet-card.png"
              alt="أسورة خضراء مرقطة"
              className="aspect-square w-full rounded-[1.55rem] bg-white/75 object-contain"
            />
          </Link>

          <div className="absolute bottom-[1%] right-[40%] z-30 flex items-center gap-1.5" aria-hidden="true">
            <span className="habba-bead h-3 w-3 bg-[#F4DFA0]" />
            <span className="habba-bead h-5 w-5 bg-[#F56F67]" />
            <span className="habba-bead h-3.5 w-3.5 bg-[#CBE9E2]" />
            <span className="habba-bead h-4 w-4 bg-[#DFD1F4]" />
          </div>
        </div>
      </div>
    </section>
  );
}
