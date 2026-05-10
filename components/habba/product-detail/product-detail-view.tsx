'use client';

import Link from 'next/link';
import type { HabbaProduct } from '@/content/habba-products';
import { createWhatsAppLink } from '@/content/habba-products';
import { useBag } from '@/components/habba/bag/bag-provider';

export function ProductDetailView({ product }: { product: HabbaProduct }) {
  const { addItem } = useBag();

  return (
    <section className="mx-auto grid w-[92%] max-w-6xl gap-5 py-6 md:grid-cols-2 md:gap-8 md:py-8">
      <div className="rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-3 sm:p-4">
        <img src={product.image} alt={product.titleEn} className="aspect-square w-full rounded-2xl bg-white object-contain" />
      </div>
      <div className="rounded-3xl border border-[#F0DED0] bg-[#FFFCF7] p-4 sm:p-6">
        <div className="mb-2 flex flex-wrap justify-end gap-2">
          <span className="rounded-full border border-[#F0DED0] bg-[#fff7ee] px-2.5 py-1 text-xs text-[#6B615B]">{product.categoryAr}</span>
          <span className="rounded-full border border-[#F0DED0] bg-[#fff7ee] px-2.5 py-1 text-xs text-[#6B615B]">{product.collectionAr}</span>
        </div>
        <h1 className="text-right text-2xl font-bold leading-tight sm:text-3xl">{product.titleAr}</h1>
        <h2 className="mt-1 text-right text-xs leading-relaxed text-[#7E736D] sm:text-sm">{product.titleEn}</h2>
        <p className="mt-4 text-right text-sm leading-relaxed sm:text-base">{product.descriptionAr}</p>
        <p className="mt-2 text-right text-xs leading-relaxed text-[#7B6F68] sm:text-sm">{product.descriptionEn}</p>
        <div className="mt-4 rounded-2xl bg-[#fff7ee] p-3">
          <p className="text-right font-semibold">{product.priceLabelAr}</p>
          <p className="mt-1 text-right text-sm text-[#7B6F68]">{product.statusAr}</p>
        </div>
        <p className="mt-3 text-right text-xs text-[#7B6F68]">كل قطعة handmade، وقد تختلف التفاصيل البسيطة حسب الخامات المتاحة.</p>
        <div className="mt-4 grid gap-2 sm:max-w-xs">
          <button onClick={() => addItem(product.slug)} className="rounded-full bg-[#F87070] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#ef6666]">ضيفي لشنطتك</button>
          <a href={createWhatsAppLink(product.titleAr)} target="_blank" rel="noreferrer" className="rounded-full border border-[#EBCFBE] bg-white px-5 py-2 text-center text-sm font-semibold text-[#5E534C] transition hover:border-[#F87070] hover:text-[#F87070]">اسأل على واتساب</a>
        </div>
        <div className="mt-3 text-right">
          <Link href="/bundle" className="text-xs text-[#A85A4D] underline decoration-[#E5B5A8] underline-offset-2 hover:text-[#8f4d43]">
            كمّلي القطعة في باندل
          </Link>
        </div>
      </div>
    </section>
  );
}
