import { ProductCard } from '@/components/habba/product-card';
import type { HabbaProduct } from '@/content/habba-products';

export function RelatedProducts({ related }: { related: HabbaProduct[] }) {
  if (related.length === 0) return null;

  return (
    <section className="mx-auto w-[94%] max-w-7xl pb-16 pt-6 sm:pb-20">
      <div className="mb-6 max-w-2xl text-right">
        <p className="text-xs font-extrabold text-[#A9534D]">نفس المود</p>
        <h2 className="mt-1 text-2xl font-black sm:text-3xl">قطع ممكن تكملها</h2>
        <p className="mt-2 text-sm leading-7 text-[#746761]">من نفس الـcollection، لو حبيتي تجمعي أكتر من قطعة.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {related.slice(0, 4).map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
