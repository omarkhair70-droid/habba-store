'use client';

import Image from 'next/image';
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
      <header className="sticky top-0 z-30 border-b border-[#4F3B31]/10 bg-[#FFFAF3]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-[94%] max-w-7xl items-center justify-between gap-3 py-2.5 sm:py-3">
          <Link href="/" aria-label="Habba home" className="relative flex h-11 w-24 shrink-0 items-center sm:h-12 sm:w-28">
            <Image
              src="/images/habba/brand/hbb-logo-bilingual.png"
              alt="Habba | حبّة"
              fill
              sizes="112px"
              className="object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-[#4F3B31]/10 bg-white/70 p-1 text-sm font-semibold text-[#5D5049] md:flex">
            <Link href="/shop" className="rounded-full px-4 py-2 transition hover:bg-[#FFE8DF] hover:text-[#A94E48]">
              المنتجات
            </Link>
            <Link href="/match" className="rounded-full px-4 py-2 transition hover:bg-[#E8E0F5] hover:text-[#66507E]">
              حبّة ترشحلك
            </Link>
            <Link href="/drops" className="rounded-full px-4 py-2 transition hover:bg-[#DDEFE9] hover:text-[#42665C]">
              اعملي Drop
            </Link>
            <Link href="/about" className="rounded-full px-4 py-2 transition hover:bg-[#F7EAC6] hover:text-[#705C2F]">
              عن حبّة
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenMiniBag(true)}
              className="rounded-full border border-[#4F3B31]/[0.12] bg-white px-3 py-2 text-xs font-bold text-[#554842] transition hover:-translate-y-0.5 hover:border-[#F1A39B] sm:px-4 sm:text-sm"
            >
              {itemCount > 0 ? 'شنطتك ' + itemCount : 'شنطتك'}
            </button>
            <a
              href={createWhatsAppLink('منتجات حبّة')}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-[#302722] px-4 py-2 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#4B3B34] sm:inline-flex sm:text-sm"
            >
              واتساب
            </a>
          </div>
        </div>

        <nav className="mx-auto flex w-[94%] max-w-7xl items-center gap-4 overflow-x-auto border-t border-[#4F3B31]/[0.08] py-2 text-xs font-bold text-[#665A54] md:hidden">
          <Link href="/shop" className="whitespace-nowrap">المنتجات</Link>
          <Link href="/match" className="whitespace-nowrap">حبّة ترشحلك</Link>
          <Link href="/bundle" className="whitespace-nowrap">باندل</Link>
          <Link href="/drops" className="whitespace-nowrap">Drop</Link>
          <Link href="/about" className="whitespace-nowrap">عن حبّة</Link>
        </nav>
      </header>
      <MiniBagDrawer open={openMiniBag} onClose={() => setOpenMiniBag(false)} />
    </>
  );
}
