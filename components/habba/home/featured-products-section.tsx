import Link from 'next/link';
import { ProductVisual } from '@/components/habba/product-visual';
import { visibleProducts } from '@/content/habba-products';

const editorialSlugs = [
  'white-daisy-smile-necklace',
  'pastel-candy-bracelet',
  'blue-star-heishi-bracelet',
  'red-heart-bracelet'
] as const;

export function FeaturedProductsSection() {
  const products = editorialSlugs
    .map((slug) => visibleProducts.find((product) => product.slug === slug))
    .filter((product): product is (typeof visibleProducts)[number] => Boolean(product));

  const [lead, ...rest] = products;

  if (!lead) return null;

  return (
    <section className="mx-auto w-[94%] max-w-7xl py-16 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="text-right">
          <p className="mb-2 text-xs font-extrabold text-[#B3544F]">اختيارات حبّة النهارده</p>
          <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">كل قطعة لها شخصية</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6E605A] sm:text-base">
            سمايل ودايزي وباستيل ونجوم — تفاصيل صغيرة تغيّر إحساس القطعة كلها.
          </p>
        </div>
        <Link href="/shop" className="hidden text-sm font-bold text-[#6E5D55] underline decoration-[#DABCB0] underline-offset-4 sm:block">
          كل المنتجات
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.28fr_0.72fr]">
        <Link
          href={'/product/' + lead.slug}
          className="group relative min-h-[470px] overflow-hidden rounded-[2.75rem] bg-[#E7EEF0] p-5 sm:min-h-[590px] sm:p-8"
        >
          <div className="absolute left-7 top-7 z-10 rounded-full bg-white/75 px-3 py-1.5 text-xs font-extrabold text-[#657478] backdrop-blur">
            {lead.collectionAr}
          </div>
          <div className="absolute inset-x-[6%] bottom-[12%] top-[4%] overflow-hidden rounded-[2.4rem]">
            <ProductVisual
              src={lead.image}
              alt={lead.titleEn}
              sizes="(max-width: 1024px) 86vw, 50vw"
              className="h-full w-full scale-[1.08] object-contain transition duration-500 group-hover:-translate-y-2 group-hover:scale-[1.13]"
            />
          </div>
          <div className="absolute inset-x-6 bottom-6 rounded-[2rem] bg-white/[0.84] p-5 backdrop-blur-md sm:inset-x-8 sm:bottom-8 sm:p-6">
            <p className="text-xs font-bold text-[#7B6C65]">{lead.categoryAr}</p>
            <h3 className="mt-1 text-2xl font-black sm:text-3xl">{lead.titleAr}</h3>
            <p className="mt-2 max-w-xl text-sm leading-7 text-[#6E605A]">{lead.descriptionAr}</p>
          </div>
        </Link>

        <div className="habba-scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-1">
          {rest.map((product, index) => {
            const tones = ['#F4E5B9', '#DDE9F4', '#F2DFE9'];
            return (
              <Link
                key={product.slug}
                href={'/product/' + product.slug}
                className="group grid min-h-[176px] min-w-[78vw] snap-start grid-cols-[0.9fr_1.1fr] items-center overflow-hidden rounded-[2rem] p-4 sm:min-h-[210px] sm:min-w-0"
                style={{ backgroundColor: tones[index % tones.length] }}
              >
                <div className="text-right">
                  <p className="text-[11px] font-extrabold text-[#786A63]">{product.collectionAr}</p>
                  <h3 className="mt-1 text-lg font-black leading-tight">{product.titleAr}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#6E605A]">تفصيلة خفيفة تغيّر المود</p>
                </div>
                <ProductVisual
                  src={product.image}
                  alt={product.titleEn}
                  sizes="(max-width: 640px) 42vw, (max-width: 1024px) 25vw, 19vw"
                  className="aspect-square w-full object-contain transition duration-500 group-hover:-translate-y-1 group-hover:rotate-2 group-hover:scale-[1.06]"
                />
              </Link>
            );
          })}
        </div>
      </div>

      <Link href="/shop" className="mt-5 inline-flex text-sm font-bold text-[#6E5D55] underline decoration-[#DABCB0] underline-offset-4 sm:hidden">
        شوفي كل المنتجات
      </Link>
    </section>
  );
}
