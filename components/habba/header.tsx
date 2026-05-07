import Link from 'next/link';
import { createWhatsAppLink } from '@/content/habba-products';

export function HabbaHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#F0DED0] bg-[#FFFCF7]/95 backdrop-blur">
      <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between gap-2 py-3 sm:gap-3">
        <Link href="/" aria-label="Habba home" className="flex h-14 w-40 items-center">
          <img
            src="/images/habba/brand/hbb-logo-bilingual.png"
            alt="Habba | حبّة"
            className="h-auto w-auto max-h-12 max-w-full object-contain"
          />
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2 text-xs font-medium text-[#514740] sm:text-sm md:gap-4">
          <Link href="/" className="transition hover:text-[#F87070]">Home</Link>
          <Link href="/shop" className="transition hover:text-[#F87070]">Shop</Link>
          <Link href="/about" className="transition hover:text-[#F87070]">About</Link>
          <a
            href={createWhatsAppLink('منتجات حبّة')}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#F0DED0] bg-white px-3 py-1.5 text-xs font-semibold text-[#3d3530] transition hover:border-[#F87070] hover:text-[#F87070] md:text-sm"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
