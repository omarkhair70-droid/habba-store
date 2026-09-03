'use client';

import Link from 'next/link';
import { ProductVisual } from '@/components/habba/product-visual';
import { visibleProducts } from '@/content/habba-products';
import { createBagWhatsAppLink } from '@/lib/habba-bag';
import { useBag } from '@/components/habba/bag/bag-provider';

type MiniBagDrawerProps = { open: boolean; onClose: () => void };

export function MiniBagDrawer({ open, onClose }: MiniBagDrawerProps) {
  const { items, itemCount } = useBag();

  const bagProducts = items
    .map((item) => {
      const product = visibleProducts.find((entry) => entry.slug === item.slug);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .slice(0, 4);

  const waLink = createBagWhatsAppLink(items);

  return (
    <>
      <button
        onClick={onClose}
        aria-hidden={!open}
        aria-label="إغلاق شنطة حبّة"
        tabIndex={open ? 0 : -1}
        className={'fixed inset-0 z-40 bg-[#302722]/35 backdrop-blur-[2px] transition-opacity duration-200 ' + (open ? 'opacity-100' : 'pointer-events-none opacity-0')}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="شنطة حبّة"
        aria-hidden={!open}
        className={'fixed bottom-0 right-0 z-50 w-full overflow-hidden rounded-t-[2.5rem] bg-[#FFF9F2] shadow-2xl transition-transform duration-200 sm:top-0 sm:h-full sm:max-w-md sm:rounded-none sm:rounded-l-[2.5rem] ' + (open ? 'visible translate-y-0 sm:translate-x-0' : 'invisible translate-y-full sm:translate-x-full sm:translate-y-0')}
      >
        <div className="bg-[#302722] p-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-bold text-white"
            >
              إغلاق
            </button>
            <div className="text-right">
              <p className="text-[10px] font-extrabold text-[#F0BBB5]">اختياراتك</p>
              <h2 className="text-xl font-black">شنطتك ({itemCount})</h2>
            </div>
          </div>
        </div>

        <div className="max-h-[58vh] overflow-y-auto p-4 sm:max-h-[calc(100vh-210px)]">
          {bagProducts.length === 0 ? (
            <div className="rounded-[2rem] bg-[#F2DFE9] p-5 text-right">
              <span className="habba-bead h-5 w-5 bg-[#F56F67]" aria-hidden="true" />
              <p className="mt-3 text-base font-black text-[#302722]">لسه فاضية</p>
              <p className="mt-1 text-xs leading-6 text-[#6F625C]">اختاري قطعة، أو ابدئي بـHabba Match لو محتاجة ترشيح.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {bagProducts.map(({ slug, quantity, product }, index) => {
                const tones = ['#F2DFE9', '#DDE9CF', '#E1EAF0', '#F3E6B8'];
                return (
                  <Link
                    key={slug}
                    href={'/product/' + product.slug}
                    onClick={onClose}
                    className="grid grid-cols-[72px_1fr] gap-3 rounded-[1.75rem] p-2.5"
                    style={{ backgroundColor: tones[index % tones.length] }}
                  >
                    <ProductVisual
                      src={product.image}
                      alt={product.titleEn}
                      sizes="72px"
                      quality={76}
                      className="aspect-square h-[72px] w-[72px] rounded-[1.25rem] bg-white/55 object-contain"
                    />
                    <div className="self-center text-right">
                      <p className="text-xs font-black text-[#302722]">{product.titleAr}</p>
                      <p className="mt-1 text-[10px] font-bold text-[#786A63]">{product.collectionAr}</p>
                      <p className="mt-1 text-[11px] text-[#746761]">الكمية: {quantity}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t border-[#4F3B31]/10 bg-white/70 p-4">
          <Link
            href="/bag"
            onClick={onClose}
            className="block rounded-full bg-[#302722] px-4 py-3 text-center text-sm font-extrabold text-white"
          >
            افتحي الشنطة
          </Link>
          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block rounded-full bg-[#F56F67] px-4 py-3 text-center text-sm font-extrabold text-white"
            >
              ابعتيها واتساب
            </a>
          ) : null}
        </div>
      </aside>
    </>
  );
}
