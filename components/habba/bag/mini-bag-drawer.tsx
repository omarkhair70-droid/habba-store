'use client';

import Link from 'next/link';
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
        className={`fixed inset-0 z-40 bg-[#3E302A]/25 transition-opacity duration-200 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <aside className={`fixed bottom-0 right-0 z-50 w-full rounded-t-3xl border border-[#F1DDD0] bg-[#FFFCF7] p-4 shadow-2xl transition-transform duration-200 sm:top-0 sm:h-full sm:max-w-sm sm:rounded-none sm:rounded-l-3xl ${open ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-x-full sm:translate-y-0'}`}>
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="rounded-full border border-[#ECD8C9] px-2.5 py-1 text-xs text-[#6C5D56] hover:bg-white">إغلاق</button>
          <h2 className="text-base font-bold text-[#51433D]">شنطتك ({itemCount})</h2>
        </div>

        {bagProducts.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#EDD8CA] bg-[#FFF7EE] p-4 text-right">
            <p className="text-sm font-semibold text-[#5E524B]">لسه الشنطة فاضية 🌸</p>
            <p className="mt-1 text-xs text-[#81736D]">اختاري قطعة أو قطعتين، واحنا نكمّل معك على واتساب.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {bagProducts.map(({ slug, quantity, product }) => (
              <article key={slug} className="grid grid-cols-[58px_1fr] gap-2 rounded-2xl border border-[#F1DED0] bg-white p-2">
                <img src={product.image} alt={product.titleEn} className="h-14 w-14 rounded-xl border border-[#F2E4D7] bg-[#FFFCF8] object-contain p-1" />
                <div className="text-right">
                  <p className="text-xs font-semibold text-[#584A44]">{product.titleAr}</p>
                  <p className="mt-1 text-[11px] text-[#8A7A73]">الكمية: {quantity}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-4 space-y-2">
          <Link href="/bag" onClick={onClose} className="block rounded-full bg-[#F87070] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[#ef6666]">افتحي الشنطة</Link>
          {waLink ? <a href={waLink} target="_blank" rel="noreferrer" className="block rounded-full border border-[#EBCFBE] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#5E534C] transition hover:border-[#F87070] hover:text-[#F87070]">ابعتيها واتساب</a> : null}
        </div>
      </aside>
    </>
  );
}
