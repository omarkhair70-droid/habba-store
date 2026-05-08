import Link from 'next/link';

export function MatchEntrySection() {
  return (
    <section className="mx-auto w-[92%] max-w-6xl py-4">
      <div className="rounded-3xl border border-[#EEDFD2] bg-[#FFFCF8] p-4 text-right shadow-sm sm:p-5">
        <p className="text-lg font-bold text-[#3E322D]">مش عارفة تختاري؟</p>
        <p className="mt-1 text-sm text-[#6D625C]">جربي Habba Match واختاري مودك، ونرشحلك قطع تناسبك من الكتالوج.</p>
        <Link href="/match" className="mt-3 inline-block rounded-full bg-[#F87070] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#ef6666]">
          جربي Habba Match
        </Link>
              <div className="mt-3 rounded-2xl border border-[#F0DED0] bg-[#fff7ee] p-3 text-right">
          <p className="text-sm font-bold text-[#4D413C]">عايزة أكتر من قطعة؟</p>
          <p className="mt-1 text-xs text-[#6D625C]">اعملي باندل بسيط من قطع حبّة، واسألي عنهم مرة واحدة على واتساب.</p>
          <Link href="/bundle" className="mt-2 inline-block rounded-full border border-[#F0B8AE] px-3 py-1.5 text-xs font-bold text-[#A85A4D] transition hover:bg-[#FEE9E2]">
            اعملي باندل
          </Link>
        </div>
      </div>
    </section>
  );
}
