export function HabbaFooter() {
  return (
    <footer className="mt-10 border-t border-[#F0DED0] bg-[#FFFCF7]">
      <div className="mx-auto flex w-[92%] max-w-6xl flex-col gap-3 py-6 text-center md:text-left">
        <div className="mx-auto flex h-16 w-48 items-center justify-center md:mx-0">
          <img
            src="/images/habba/brand/hbb-logo-bilingual.png"
            alt="Habba | حبّة"
            className="h-auto w-auto max-h-14 max-w-full object-contain"
          />
        </div>
        <p className="text-sm text-[#514740]">حبّة — إكسسوارات خرز handmade، ملونة، بسيطة، ومناسبة كهدايا صغيرة.</p>
        <a href="https://wa.me/201011549509" target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#F87070]">
          Order on WhatsApp: +20 101 154 9509
        </a>
      </div>
    </footer>
  );
}
