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
        <h1 className="text-right text-2xl font-bold leading-tight sm:text-3xl">تسوّقي المنتجات</h1>
        <p className="mt-2 max-w-2xl text-right text-sm leading-relaxed text-[#6A5F59] sm:text-base">
          اختاري القطعة اللي شبهك، واسألي على واتساب للتوفر والتفاصيل.
        </p>
        <div className="mb-5 mt-4 flex flex-wrap justify-end gap-1.5 sm:gap-2">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => setActiveFilter(chip.key)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition sm:px-4 sm:py-1.5 sm:text-sm ${
                activeFilter === chip.key
                  ? 'border-[#F87070] bg-[#F87070] text-white'
                  : 'border-[#EFD9CB] bg-[#FFFCF7] text-[#5A4F49] hover:border-[#E4C3AD]'
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
