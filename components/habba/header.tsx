'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createWhatsAppLink } from '@/content/habba-products';
import { useBag } from '@/components/habba/bag/bag-provider';
import { MiniBagDrawer } from '@/components/habba/bag/mini-bag-drawer';

export function HabbaHeader() {
  const { itemCount } = useBag();
  const [openMiniBag, setOpenMiniBag] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-[#F0DED0] bg-[#FFFCF7]/95 backdrop-blur">
        <div className="mx-auto flex w-[92%] max-w-6xl flex-col gap-1.5 py-2 sm:gap-2 sm:py-2.5">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" aria-label="Habba home" className="flex h-12 w-24 items-center sm:h-14 sm:w-28">
              <img
                src="/images/habba/brand/hbb-logo-bilingual.png"
                alt="Habba | حبّة"
                className="h-auto w-auto max-h-[52px] max-w-full object-contain sm:max-h-[60px]"
              />
            </Link>
            <div className="flex items-center gap-2">
              <button onClick={() => setOpenMiniBag(true)} className="shrink-0 rounded-full border border-[#F5E6DA] bg-white px-3 py-1.5 text-xs font-semibold text-[#665952] transition hover:border-[#EBCFBE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2C5B0]">
                {itemCount > 0 ? `شنطتك ${itemCount}` : 'شنطتك'}
              </button>
              <a
                href={createWhatsAppLink('منتجات حبّة')}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-full border border-[#EBCFBE] bg-white px-3 py-1.5 text-xs font-semibold text-[#4E433D] transition hover:border-[#F87070] hover:text-[#F87070]"
              >
                واتساب
              </a>
            </div>
          </div>

          <nav className="flex items-center justify-center gap-4 border-t border-[#F5E6DA] pt-1.5 text-sm font-medium text-[#514740] sm:justify-end sm:gap-6 sm:border-0 sm:pt-0">
            <Link href="/" className="whitespace-nowrap transition hover:text-[#F87070]">
              الرئيسية
            </Link>
            <Link href="/shop" className="whitespace-nowrap transition hover:text-[#F87070]">
              المنتجات
            </Link>
            <Link href="/about" className="whitespace-nowrap transition hover:text-[#F87070]">
              عن حبّة
            </Link>
          </nav>
        </div>
      </header>
      <MiniBagDrawer open={openMiniBag} onClose={() => setOpenMiniBag(false)} />
    </>
  );
}
