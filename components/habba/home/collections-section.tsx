import Link from 'next/link';
import { habbaCollections } from '@/content/habba-sections';

export function CollectionsSection() {
  return (
    <section className="mx-auto w-[92%] max-w-6xl py-6">
      <h2 className="mb-3 text-right text-2xl font-bold leading-tight sm:text-3xl">Collections</h2>
      <p className="mb-4 text-right text-sm leading-relaxed text-[#7B6F68]">تشكيلات ملونة تناسب يومك وهدية بسيطة بنفس روح حبّة.</p>
      <div className="grid gap-3 md:grid-cols-3">
        {habbaCollections.map((collection) => (
          <Link key={collection.key} href={collection.href} className="rounded-2xl border border-[#F0DED0] bg-[#fff7ee] p-3 text-right transition hover:border-[#E8CDBA]">
            <div className="rounded-2xl bg-[#FFFCF7] p-2.5">
              <img src={collection.image} alt={collection.imageAlt} className="aspect-square w-full rounded-xl object-contain" />
            </div>
            <h3 className="mt-3 text-base font-bold leading-tight">{collection.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#6A5F59]">{collection.description}</p>
            <p className="mt-1 text-xs text-[#D07D70]">شاهدي المجموعة</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
