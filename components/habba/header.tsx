import Link from 'next/link';

export function HabbaHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#F0DED0] bg-[#FFFCF7]/95 backdrop-blur">
      <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between py-3">
        <Link href="/habba"><img src="/images/habba/brand/hbb-logo-bilingual.png" alt="Habba" className="h-10" /></Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/habba/shop">Shop</Link><Link href="/habba/about" className="font-semibold">عن حبّة</Link>
        </nav>
      </div>
    </header>
  );
}
