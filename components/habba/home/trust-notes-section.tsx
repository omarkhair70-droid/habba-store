import { habbaTrustNotes } from '@/content/habba-sections';

export function TrustNotesSection() {
  return (
    <section className="mx-auto w-[92%] max-w-6xl py-4">
      <article className="rounded-3xl border border-[#F0DED0] bg-[#FFFCF7] p-5 md:p-6">
        <h2 className="text-right text-2xl font-bold">قبل ما تطلبي</h2>
        <ul className="mt-3 space-y-2 text-right text-sm text-[#615651] sm:text-base">
          {habbaTrustNotes.map((note) => <li key={note}>• {note}</li>)}
        </ul>
      </article>
    </section>
  );
}
