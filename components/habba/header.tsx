import Link from 'next/link';
import { createWhatsAppLink } from '@/content/habba-products';

export function HabbaHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#F0DED0] bg-[#FFFCF7]/95 backdrop-blur">
      <div className="mx-auto flex w-[92%] max-w-6xl flex-col gap-1.5 py-2 sm:gap-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2">
          <Link href="/" aria-label="Habba home" className="flex h-10 w-28 items-center sm:h-12 sm:w-36">
            <img
              src="/images/habba/brand/hbb-logo-bilingual.png"
              alt="Habba | حبّة"
              className="h-auto w-auto max-h-9 max-w-full object-contain sm:max-h-10"
            />
          </Link>
          <a
            href={createWhatsAppLink('منتجات حبّة')}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full border border-[#EBCFBE] bg-white px-3 py-1.5 text-xs font-semibold text-[#4E433D] transition hover:border-[#F87070] hover:text-[#F87070]"
          >
            واتساب
          </a>
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
  );
}
