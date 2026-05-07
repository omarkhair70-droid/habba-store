import Link from 'next/link';
import { createWhatsAppLink } from '@/content/habba-products';

export function HabbaHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#F0DED0] bg-[#FFFCF7]/95 backdrop-blur">
      <div className="mx-auto flex w-[92%] max-w-6xl flex-col gap-2 py-2.5 sm:gap-3 sm:py-3">
        <div className="flex items-center justify-between gap-2">
          <Link href="/" aria-label="Habba home" className="flex h-12 w-32 items-center sm:h-14 sm:w-40">
            <img
              src="/images/habba/brand/hbb-logo-bilingual.png"
              alt="Habba | حبّة"
              className="h-auto w-auto max-h-10 max-w-full object-contain sm:max-h-12"
            />
          </Link>
          <a
            href={createWhatsAppLink('منتجات حبّة')}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full border border-[#F0DED0] bg-white px-3 py-1.5 text-xs font-semibold text-[#3d3530] transition hover:border-[#F87070] hover:text-[#F87070]"
          >
            واتساب
          </a>
        </div>

        <nav className="flex items-center justify-center gap-5 text-sm font-medium text-[#514740] sm:justify-end sm:gap-6">
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
  );
}
