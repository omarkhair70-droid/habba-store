import { createWhatsAppLink } from '@/content/habba-products';

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
        <p className="text-sm text-[#514740]">حبّة — تفاصيل خرز handmade، ملونة وخفيفة، مناسبة ليومك أو كهدية بسيطة.</p>
        <p className="text-xs text-[#7B6F68]">Handmade bead accessories</p>
        <a href={createWhatsAppLink('منتجات حبّة')} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#F87070]">
          اطلبي أو اسألي عن أي قطعة عبر واتساب.
        </a>
        <p className="text-sm text-[#7B6F68]">Instagram قريبًا</p>
      </div>
    </footer>
  );
}
