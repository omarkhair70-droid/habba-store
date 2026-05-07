import { ProductCard } from '@/components/habba/product-card';
import { featuredProducts } from '@/content/habba-products';

export function FeaturedProductsSection() {
  return (
    <section className="mx-auto w-[92%] max-w-6xl py-5">
      <h2 className="mb-3 text-right text-2xl font-bold leading-tight sm:text-3xl">منتجات مميزة</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </section>
  );
}
