import { ProductCard } from '@/components/habba/product-card';
import type { HabbaProduct } from '@/content/habba-products';

export function RelatedProducts({ related }: { related: HabbaProduct[] }) {
  return (
    <section className="mx-auto w-[92%] max-w-6xl pb-10">
      <h3 className="mb-4 text-right text-xl font-bold">منتجات مشابهة</h3>
      {related.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {related.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      ) : (
        <p className="text-right text-sm text-[#7B6F68]">لا يوجد منتجات مشابهة حاليًا.</p>
      )}
    </section>
  );
}
