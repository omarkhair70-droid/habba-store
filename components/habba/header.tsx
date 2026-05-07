import Link from 'next/link';

export function HabbaHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#F0DED0] bg-[#FFFCF7]/95 backdrop-blur">
      <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between gap-3 py-3">
        <Link href="/" aria-label="Habba home">
          <img src="/images/habba/brand/hbb-logo-bilingual.png" alt="Habba | حبّة" className="h-12 w-auto" />
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-[#514740] md:gap-5">
          <Link href="/" className="transition hover:text-[#F87070]">Home</Link>
          <Link href="/shop" className="transition hover:text-[#F87070]">Shop</Link>
          <Link href="/about" className="transition hover:text-[#F87070]">About</Link>
          <a
            href="https://wa.me/201011549509"
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
