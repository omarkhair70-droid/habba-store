'use client';

import { useMemo, useState } from 'react';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { ProductCard } from '@/components/habba/product-card';
import { launchProducts } from '@/content/habba-products';

type FilterKey = 'all' | 'bracelets' | 'necklaces' | 'sets' | 'cute-gift' | 'green-mood';

const chips: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'الكل' },
  { key: 'bracelets', label: 'أساور' },
  { key: 'necklaces', label: 'عقود' },
  { key: 'sets', label: 'أطقم' },
  { key: 'cute-gift', label: 'هدايا صغيرة' },
  { key: 'green-mood', label: 'جرين مود' }
];

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return launchProducts;
    if (activeFilter === 'bracelets') return launchProducts.filter((p) => p.category === 'Bracelets');
    if (activeFilter === 'necklaces') return launchProducts.filter((p) => p.category === 'Necklaces');
    if (activeFilter === 'sets') return launchProducts.filter((p) => p.category === 'Sets');
    if (activeFilter === 'cute-gift') return launchProducts.filter((p) => p.collectionAr === 'هدايا صغيرة');
    return launchProducts.filter((p) => p.collectionAr === 'جرين مود');
  }, [activeFilter]);

  return (
    <main>
      <HabbaHeader />
      <section className="mx-auto w-[92%] max-w-6xl py-6 sm:py-8">
        <h1 className="mb-4 text-right text-2xl font-bold sm:text-3xl">تسوّقي المنتجات</h1>
        <div className="mb-5 flex flex-wrap justify-end gap-1.5 sm:gap-2">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => setActiveFilter(chip.key)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold sm:px-4 sm:py-1.5 sm:text-sm ${
                activeFilter === chip.key ? 'border-[#F87070] bg-[#F87070] text-white' : 'border-[#F0DED0] bg-[#FFFCF7]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      <HabbaFooter />
    </main>
  );
}
