import type { Metadata } from 'next';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { createWhatsAppLink } from '@/content/habba-products';
import { habbaOrderSteps } from '@/content/habba-sections';

export const metadata: Metadata = {
  title: 'عن حبّة',
  description: 'تعرفي على حبّة، طريقة الطلب عبر واتساب، وكيف بنصنع إكسسوارات خرز handmade بروح بسيطة وصادقة.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'عن حبّة | Habba',
    description: 'حبّة براند إكسسوارات خرز handmade بقطع ملونة وخفيفة مناسبة للبس اليومي والهدايا البسيطة.',
    url: '/about',
    images: ['/images/habba/brand/hbb-logo-preview.png']
  }
};

const trustNotes = ['كل قطعة handmade', 'التوفر حسب الخامات المتاحة', 'الألوان ممكن تختلف اختلاف بسيط حسب الإضاءة', 'الطلب عبر واتساب فقط'];

export default function AboutPage() {
  return (
    <main>
      <HabbaHeader />
      <section className="mx-auto w-[92%] max-w-4xl space-y-4 py-7 md:space-y-5 md:py-10">
        <article className="rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-5 md:p-7">
          <h1 className="text-right text-2xl font-bold leading-tight sm:text-3xl">عن حبّة</h1>
          <p className="mt-3 max-w-2xl text-right text-sm leading-relaxed text-[#615651] sm:text-base">
            حبّة مش براند فخامة. حبّة تفاصيل صغيرة، ألوان خفيفة، وقطع خرز handmade تتلبس بسهولة وتنفع كهدية بسيطة.
          </p>
          <p className="mt-2 text-right text-xs leading-relaxed text-[#8A7D76] sm:text-sm">
            Habba is a handmade bead accessories brand for colorful everyday pieces and simple gifting.
          </p>
        </article>

        <article className="rounded-3xl border border-[#F0DED0] bg-[#FFFCF7] p-5 md:p-6">
          <h2 className="text-right text-xl font-bold leading-tight">إحنا بنعمل إيه؟</h2>
          <p className="mt-2 text-right text-sm leading-relaxed text-[#615651] sm:text-base">
            بنقدّم أساور، عقود، وأطقم خرز بألوان مرحة وتفاصيل بسيطة، مناسبة للبس اليومي أو كهدايا صغيرة.
          </p>
        </article>

        <article className="rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-5 md:p-6">
          <h2 className="text-right text-xl font-bold leading-tight">ليه handmade؟</h2>
          <p className="mt-2 text-right text-sm leading-relaxed text-[#615651] sm:text-base">
            لأن كل قطعة بتتعمل بعناية صغيرة، وده بيخليها أقرب لذوقك وشخصيتك.
          </p>
        </article>

        <article className="rounded-3xl border border-[#F0DED0] bg-[#FFFCF7] p-5 md:p-6">
          <h2 className="text-right text-xl font-bold leading-tight">طريقة الطلب</h2>
          <ol className="mt-3 space-y-2 text-right text-sm text-[#615651] sm:text-base">
            {habbaOrderSteps.map((step, idx) => (
              <li key={step}>{idx + 1}. {step}</li>
            ))}
          </ol>
        </article>

        <article className="rounded-3xl border border-[#F0DED0] bg-[#fff7ee] p-5 md:p-6">
          <h2 className="text-right text-xl font-bold leading-tight">قبل ما تطلبي</h2>
          <ul className="mt-3 space-y-2 text-right text-sm text-[#615651] sm:text-base">
            {trustNotes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-[#F0DED0] bg-[#FFFCF7] p-5 text-right md:p-7">
          <h2 className="text-2xl font-bold leading-tight">تواصلي معنا</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#615651] sm:text-base">اطلبي أو اسألي عن أي قطعة عبر واتساب.</p>
          <a
            href={createWhatsAppLink('منتجات حبّة')}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-full bg-[#F87070] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#ef6666]"
          >
            اسألي على واتساب
          </a>
        </article>
      </section>
      <HabbaFooter />
    </main>
  );
}
