import Link from 'next/link';
import { ProductVisual } from '@/components/habba/product-visual';

const tones = ['#F2DFE9', '#DDE9CF', '#E1EAF0', '#F3E6B8', '#E8E0F4', '#F5DED8'];

export function GuidedResultCard({
  product,
  index
}: {
  product: {
    slug: string;
    titleAr: string;
    titleEn: string;
    image: string;
    categoryAr: string;
    collectionAr: string;
    reasonAr?: string;
  };
  index: number;
}) {
  return (
    <Link
      href={'/product/' + product.slug}
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] transition hover:-translate-y-1"
      style={{ backgroundColor: tones[index % tones.length] }}
    >
      <div className="relative aspect-square overflow-hidden">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-white/75 px-2.5 py-1 text-[10px] font-black text-[#685B55] backdrop-blur">
          0{index + 1}
        </span>
        <ProductVisual
          src={product.image}
          alt={product.titleEn}
          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
          className="h-full w-full scale-[1.04] object-contain p-2 transition duration-500 group-hover:scale-[1.1]"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 text-right">
        <p className="text-[10px] font-extrabold text-[#786A63]">{product.collectionAr}</p>
        <h3 className="mt-1 text-base font-black text-[#302722]">{product.titleAr}</h3>
        {product.reasonAr ? <p className="mt-2 text-xs leading-6 text-[#655851]">{product.reasonAr}</p> : null}
        <span className="mt-auto pt-4 text-xs font-extrabold text-[#5D5049] underline decoration-black/15 underline-offset-4">
          شوفي القطعة
        </span>
      </div>
    </Link>
  );
}
