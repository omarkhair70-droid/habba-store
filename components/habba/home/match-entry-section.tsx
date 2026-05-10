import Link from 'next/link';

const discoveryPaths = [
  {
    label: 'لو مش عارفة تبدأي',
    title: 'حبّة ترشحلك',
    description: 'جاوبي كام سؤال بسيط، وخدي ترشيحات مناسبة ليكي من المنتجات الموجودة فعلًا.',
    cta: 'جربي Habba Match',
    href: '/match',
    highlighted: true,
  },
  {
    label: 'لو عايزة أكتر من قطعة',
    title: 'اعملي باندل',
    description: 'اختاري المود، وحبّة تركبلك 2 أو 3 قطع ينفعوا مع بعض.',
    cta: 'اعملي باندل',
    href: '/bundle',
  },
  {
    label: 'لو عايزة مود كامل',
    title: 'اعملي Drop',
    description: 'اختاري الألوان والإحساس، وحبّة تجمعلك مجموعة صغيرة كاملة.',
    cta: 'اعملي Drop',
    href: '/drops',
  },
];

export function MatchEntrySection() {
  return (
    <section className="mx-auto w-[92%] max-w-6xl py-4">
      <div className="rounded-3xl border border-[#EEDFD2] bg-[#FFFCF8] p-4 text-right shadow-sm sm:p-6">
        <h2 className="text-2xl font-bold text-[#3E322D]">اختاري بطريقتك</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-[#6D625C] sm:text-base">
          مش كل مرة الاختيار بيبدأ من نفس المكان. حبّة تساعدك تلاقي قطعة، تركّبي باندل، أو تجمعي Drop كامل حسب مودك.
        </p>

        <div className="mt-5 grid gap-3 sm:mt-6 sm:gap-4 md:grid-cols-3">
          {discoveryPaths.map((path) => (
            <article
              key={path.href}
              className="flex h-full flex-col rounded-2xl border border-[#F0DED0] bg-[#FFF7EE] p-4 text-right"
            >
              <p className={`text-xs font-bold ${path.highlighted ? 'text-[#CC6F60]' : 'text-[#8E7B73]'}`}>{path.label}</p>
              <h3 className="mt-2 text-lg font-bold text-[#4D413C]">{path.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-[#6D625C]">{path.description}</p>

              <Link
                href={path.href}
                className={`mt-4 inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-bold transition ${
                  path.highlighted
                    ? 'bg-[#F87070] text-white hover:bg-[#ef6666]'
                    : 'border border-[#F0B8AE] text-[#A85A4D] hover:bg-[#FEE9E2]'
                }`}
              >
                {path.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
