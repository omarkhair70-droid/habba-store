export function HabbaFooter() {
  return (
    <footer className="mt-10 border-t border-[#F0DED0] bg-[#FFFCF7]">
      <div className="mx-auto flex w-[92%] max-w-6xl flex-col gap-3 py-8 text-center md:text-left">
        <img src="/images/habba/brand/hbb-logo-bilingual.png" alt="Habba | حبّة" className="mx-auto h-12 w-auto md:mx-0" />
        <p className="text-sm text-[#514740]">حبّة — إكسسوارات خرز handmade، ملونة، بسيطة، ومناسبة كهدايا صغيرة.</p>
        <a href="https://wa.me/201011549509" target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#F87070]">
          Order on WhatsApp: +20 101 154 9509
        </a>
      </div>
    </footer>
  );
}
