import { habbaTrustNotes } from '@/content/habba-sections';

export function TrustNotesSection() {
  return (
    <section className="mx-auto w-[94%] max-w-7xl py-6 sm:py-8">
      <div className="grid gap-5 rounded-[2.5rem] border border-[#4F3B31]/10 bg-[#FFF2E8] p-6 sm:p-8 lg:grid-cols-[0.55fr_1.45fr]">
        <div className="text-right">
          <p className="text-xs font-extrabold text-[#A9534D]">قبل ما تطلبي</p>
          <h2 className="mt-2 text-2xl font-black">الحاجات المهمة من غير لف</h2>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {habbaTrustNotes.map((note, index) => {
            const colors = ['#F56F67', '#9F83C1', '#75A795', '#C19B43'];
            return (
              <li key={note} className="flex items-start gap-3 rounded-2xl bg-white/65 p-3 text-sm leading-7 text-[#655851]">
                <span className="habba-bead mt-2 h-3 w-3 shrink-0" style={{ backgroundColor: colors[index % colors.length] }} />
                <span>{note}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
