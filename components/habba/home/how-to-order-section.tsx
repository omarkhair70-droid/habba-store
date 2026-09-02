import { habbaOrderSteps } from '@/content/habba-sections';

export function HowToOrderSection() {
  return (
    <section className="mx-auto w-[94%] max-w-7xl py-8 sm:py-12">
      <div className="border-y border-[#4F3B31]/12 py-9">
        <div className="grid gap-8 lg:grid-cols-[0.52fr_1.48fr] lg:items-start">
          <div className="text-right">
            <p className="text-xs font-extrabold text-[#A9534D]">من الشنطة لواتساب</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">الطلب بسيط</h2>
          </div>

          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {habbaOrderSteps.map((step, index) => (
              <li key={step} className="relative min-h-[145px] rounded-[1.75rem] bg-white/70 p-4">
                <span className="text-[11px] font-black tracking-[0.15em] text-[#BA6B62]">0{index + 1}</span>
                <p className="mt-7 text-sm font-bold leading-7 text-[#554944]">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
