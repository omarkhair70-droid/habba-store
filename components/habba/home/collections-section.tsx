import Link from 'next/link';
import { ProductVisual } from '@/components/habba/product-visual';
import { habbaCollections } from '@/content/habba-sections';

const collectionTone = {
  'green-mood': { bg: '#DDE9CF', accent: '#6E8B5E', span: 'md:col-span-5' },
  'cute-gift': { bg: '#F4DDE8', accent: '#A85E7D', span: 'md:col-span-4' },
  sets: { bg: '#F2E1AE', accent: '#856F34', span: 'md:col-span-3' }
} as const;

export function CollectionsSection() {
  return (
    <section className="mx-auto w-[94%] max-w-7xl py-16 sm:py-20">
      <div className="mb-8 max-w-2xl text-right">
        <p className="text-xs font-extrabold text-[#A9534D]">اختاري بالإحساس</p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl">اختاري بالمود</h2>
        <p className="mt-3 text-sm leading-7 text-[#6E605A] sm:text-base">
          نفس نوع القطعة ممكن يحس مختلف تمامًا حسب اللون والتفاصيل. عشان كده حبّة بتجمع المنتجات كمودات قبل ما تكون أقسام.
        </p>
      </div>

      <div className="habba-scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-12 md:overflow-visible md:pb-0">
        {habbaCollections.map((collection) => {
          const tone = collectionTone[collection.key];
          return (
            <Link
              key={collection.key}
              href={collection.href}
              className={'group relative min-h-[370px] min-w-[82vw] snap-center overflow-hidden rounded-[2.5rem] p-5 transition hover:-translate-y-1 sm:min-w-[58vw] md:min-h-[390px] md:min-w-0 ' + tone.span}
              style={{ backgroundColor: tone.bg }}
            >
              <div className="relative z-10">
                <span
                  className="inline-flex rounded-full border border-black/10 bg-white/50 px-3 py-1 text-[11px] font-extrabold"
                  style={{ color: tone.accent }}
                >
                  مود من حبّة
                </span>
                <h3 className="mt-3 text-2xl font-black leading-tight">{collection.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-7 text-[#655851]">{collection.description}</p>
              </div>

              <div className="absolute bottom-[-7%] left-[-4%] w-[82%] transition duration-500 group-hover:-translate-y-3 group-hover:rotate-2 group-hover:scale-[1.03] md:w-[92%]">
                <div className="rounded-full bg-white/[0.45] p-5">
                  <ProductVisual
                    src={collection.image}
                    alt={collection.imageAlt}
                    sizes="(max-width: 768px) 78vw, 28vw"
                    className="aspect-square w-full object-contain"
                  />
                </div>
              </div>

              <span className="absolute bottom-5 right-5 z-20 text-xs font-extrabold underline decoration-black/20 underline-offset-4">
                شوفي المجموعة
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
