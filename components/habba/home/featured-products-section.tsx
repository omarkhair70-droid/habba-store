import Link from 'next/link';
import { featuredProducts } from '@/content/habba-products';

export function FeaturedProductsSection() {
  const [lead, ...rest] = featuredProducts;

  if (!lead) return null;

  return (
    <section className="mx-auto w-[94%] max-w-7xl py-16 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div className="text-right">
          <p className="mb-2 text-xs font-extrabold text-[#B3544F]">على ترابيزة حبّة دلوقتي</p>
          <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">قطع نبدأ منها المود</h2>
        </div>
        <Link href="/shop" className="hidden text-sm font-bold text-[#6E5D55] underline decoration-[#DABCB0] underline-offset-4 sm:block">
          كل المنتجات
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.28fr_0.72fr]">
        <Link
          href={'/product/' + lead.slug}
          className="group relative min-h-[470px] overflow-hidden rounded-[2.75rem] bg-[#F0DDE8] p-5 sm:min-h-[590px] sm:p-8"
        >
          <div className="absolute left-7 top-7 z-10 rounded-full bg-white/75 px-3 py-1.5 text-xs font-extrabold text-[#755B68] backdrop-blur">
            {lead.collectionAr}
          </div>
          <img
            src={lead.image}
            alt={lead.titleEn}
            className="absolute inset-x-[7%] bottom-[15%] mx-auto aspect-square w-[76%] object-contain transition duration-500 group-hover:-translate-y-2 group-hover:scale-[1.025]"
          />
          <div className="absolute inset-x-6 bottom-6 rounded-[2rem] bg-white/82 p-5 backdrop-blur-md sm:inset-x-8 sm:bottom-8 sm:p-6">
            <p className="text-xs font-bold text-[#8A716A]">{lead.categoryAr}</p>
            <h3 className="mt-1 text-2xl font-black sm:text-3xl">{lead.titleAr}</h3>
            <p className="mt-2 max-w-xl text-sm leading-7 text-[#6E605A]">{lead.descriptionAr}</p>
          </div>
        </Link>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {rest.slice(0, 3).map((product, index) => {
            const tones = ['#DDEDE8', '#F4E5B9', '#E8DFF5'];
            return (
              <Link
                key={product.slug}
                href={'/product/' + product.slug}
                className="group grid min-h-[176px] grid-cols-[0.9fr_1.1fr] items-center overflow-hidden rounded-[2rem] p-4 sm:min-h-[210px]"
                style={{ backgroundColor: tones[index % tones.length] }}
              >
                <div className="text-right">
                  <p className="text-[11px] font-extrabold text-[#786A63]">{product.collectionAr}</p>
                  <h3 className="mt-1 text-lg font-black leading-tight">{product.titleAr}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#6E605A]">افتحي القطعة وشوفي تفاصيلها</p>
                </div>
                <img
                  src={product.image}
                  alt={product.titleEn}
                  className="aspect-square w-full object-contain transition duration-500 group-hover:-translate-y-1 group-hover:rotate-2 group-hover:scale-[1.04]"
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
