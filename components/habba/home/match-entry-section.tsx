import Link from 'next/link';

const discoveryPaths = [
  {
    step: '01',
    label: 'ابدئي بإجابات بسيطة',
    title: 'حبّة ترشحلك',
    description: 'لو لسه مش محددة قطعة، اختاري المناسبة والمود واللون وخدي 3 ترشيحات من القطع المتاحة.',
    cta: 'جربي Habba Match',
    href: '/match',
    bg: '#F8DCD7',
    bead: '#F56F67'
  },
  {
    step: '02',
    label: 'خلي القطع تشتغل مع بعض',
    title: 'اعملي باندل',
    description: 'لما تبقي عايزة قطعتين أو 3 متناسقين بدل ما تجمعيهم واحدة واحدة.',
    cta: 'ركّبي باندل',
    href: '/bundle',
    bg: '#E8E0F4',
    bead: '#A98BC7'
  },
  {
    step: '03',
    label: 'ابني مود كامل',
    title: 'اعملي Drop',
    description: 'اختاري الإحساس واتجاه الألوان وعدد القطع، وحبّة تجمعلك Drop كامل جاهز للحفظ في شنطتك.',
    cta: 'اعملي Drop',
    href: '/drops',
    bg: '#DCECE6',
    bead: '#75A795'
  }
];

export function MatchEntrySection() {
  return (
    <section className="border-y border-[#4F3B31]/10 bg-white/[0.45] py-16 sm:py-20">
      <div className="mx-auto w-[94%] max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div className="text-right">
            <p className="text-xs font-extrabold text-[#A9534D]">مش لازم تبدأي من المنتج</p>
            <h2 className="mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-5xl">
              من قطعة واحدة
              <span className="block text-[#D95F58]">لمود كامل.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-8 text-[#6E605A] sm:text-base">
            عايزة ترشيح سريع؟ ابدئي بـMatch. عايزة قطعتين يليقوا على بعض؟ اعملي Bundle. ولو نفسك في مود كامل، خلي الـDrop يجمعهولك.
          </p>
        </div>

        <div className="habba-scrollbar-none relative mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          <div className="habba-thread absolute left-[8%] right-[8%] top-8 hidden lg:block" aria-hidden="true" />
          {discoveryPaths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group relative z-10 min-h-[300px] min-w-[82vw] snap-center overflow-hidden rounded-[2.5rem] p-6 transition duration-300 hover:-translate-y-1 sm:min-w-[58vw] sm:p-7 lg:min-h-[320px] lg:min-w-0"
              style={{ backgroundColor: path.bg }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-[0.18em] text-[#6E605A]">{path.step}</span>
                <span className="habba-bead h-8 w-8 transition duration-300 group-hover:scale-125" style={{ backgroundColor: path.bead }} />
              </div>
              <p className="mt-14 text-xs font-extrabold text-[#796A63]">{path.label}</p>
              <h3 className="mt-2 text-2xl font-black">{path.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#685A54]">{path.description}</p>
              <span className="absolute bottom-6 right-6 text-sm font-extrabold text-[#443630] underline decoration-[#7C665A]/30 underline-offset-4">
                {path.cta}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
