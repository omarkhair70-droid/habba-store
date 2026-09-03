import Image from 'next/image';
import { createWhatsAppLink } from '@/content/habba-products';

export function HabbaFooter() {
  return (
    <footer className="mt-10 border-t border-[#F0DED0] bg-[#FFFCF7]">
      <div className="mx-auto flex w-[92%] max-w-6xl flex-col gap-2.5 py-5 text-center md:text-right">
        <div className="relative mx-auto flex h-16 w-44 items-center justify-center md:mx-0">
          <Image
            src="/images/habba/brand/hbb-logo-bilingual.png"
            alt="Habba | حبّة"
            fill
            sizes="176px"
            className="object-contain"
          />
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[#514740] md:max-w-none">حبّة — تفاصيل خرز handmade، ملونة وخفيفة، مناسبة ليومك أو كهدية بسيطة.</p>
        <p className="text-xs text-[#8A7D76]">Handmade bead accessories</p>
        <a href={createWhatsAppLink('منتجات حبّة')} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#E97466] hover:text-[#F87070]">
          اطلبي أو اسألي عن أي قطعة عبر واتساب.
        </a>
        <p className="text-sm text-[#7B6F68]">Instagram قريبًا</p>
      </div>
    </footer>
  );
}
