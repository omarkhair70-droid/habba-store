import { habbaOrderSteps } from '@/content/habba-sections';

export function HowToOrderSection() {
  return (
    <section className="mx-auto w-[92%] max-w-6xl py-4">
      <article className="rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-5 md:p-6">
        <h2 className="text-right text-2xl font-bold">طريقة الطلب بسيطة</h2>
        <ol className="mt-3 space-y-2 text-right text-sm text-[#615651] sm:text-base">
          {habbaOrderSteps.map((step, idx) => <li key={step}>{idx + 1}. {step}</li>)}
        </ol>
      </article>
    </section>
  );
}
