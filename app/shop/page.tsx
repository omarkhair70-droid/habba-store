import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { ProductCard } from '@/components/habba/product-card';
import { launchProducts } from '@/content/habba-products';

export default function ShopPage() {
  return <main><HabbaHeader /><section className="mx-auto w-[92%] max-w-6xl py-8"><h1 className="mb-4 text-right text-3xl font-bold">تسوّقي المنتجات</h1><div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{launchProducts.map((p)=><ProductCard key={p.slug} product={p} />)}</div></section><HabbaFooter /></main>;
}
