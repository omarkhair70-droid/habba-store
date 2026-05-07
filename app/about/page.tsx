import type { Metadata } from 'next';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';

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

export default function AboutPage() {
  return (
    <main>
      <HabbaHeader />
      <section className="mx-auto w-[92%] max-w-3xl space-y-6 py-8">
        <h1 className="text-right text-3xl font-bold">عن حبّة</h1>

        <div className="rounded-2xl border border-[#F0DED0] bg-[#fff7ee] p-4">
          <p className="text-right leading-relaxed">
            حبّة براند إكسسوارات خرز handmade، بيقدّم قطع ملونة وخفيفة مناسبة للبس اليومي أو كهدايا بسيطة. كل قطعة معمولة بروح لطيفة وشكل صادق، من غير فخامة مبالغ فيها أو وعود بعيدة عن المنتج الحقيقي.
          </p>
          <p className="mt-2 text-sm text-[#7B6F68]">
            Habba is a handmade bead accessories brand made for colorful everyday pieces and simple gifting.
          </p>
        </div>

        <article>
          <h2 className="text-right text-xl font-bold">إحنا بنعمل إيه؟</h2>
          <p className="mt-2 text-right text-sm leading-relaxed text-[#615651]">بنقدّم أساور وعقود وأطقم خرز handmade بألوان مرحة وتفاصيل بسيطة تناسب يومك.</p>
        </article>

        <article>
          <h2 className="text-right text-xl font-bold">ليه handmade؟</h2>
          <p className="mt-2 text-right text-sm leading-relaxed text-[#615651]">لأن كل قطعة بتتعمل بعناية صغيرة، وده بيخليها أقرب لذوقك وشخصيتك.</p>
        </article>

        <article>
          <h2 className="text-right text-xl font-bold">طريقة الطلب</h2>
          <ol className="mt-2 space-y-1 text-right text-sm leading-relaxed text-[#615651]">
            <li>1. اختاري القطعة</li>
            <li>2. اضغطي اسأل على واتساب</li>
            <li>3. نأكد التوفر والتفاصيل</li>
            <li>4. يتم الاتفاق على الاستلام أو التوصيل</li>
          </ol>
        </article>

        <article>
          <h2 className="text-right text-xl font-bold">تواصل معنا</h2>
          <p className="mt-2 text-right text-sm text-[#615651]">اطلبي أو اسألي عن أي قطعة عبر واتساب.</p>
          <a href="https://wa.me/201011549509" target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-semibold text-[#F87070]">
            WhatsApp: +20 101 154 9509
          </a>
          <p className="mt-2 text-right text-sm text-[#7B6F68]">Instagram قريبًا</p>
          <a href="#" className="text-xs text-[#7B6F68]">#</a>
        </article>

        <div className="rounded-2xl border border-[#F0DED0] bg-[#FFFCF7] p-4 text-right text-xs text-[#7B6F68]">
          <p>كل قطعة handmade</p>
          <p>التوفر حسب الخامات المتاحة</p>
          <p>الألوان ممكن تختلف اختلاف بسيط حسب الإضاءة</p>
          <p>لا يوجد دفع أونلاين حاليًا، الطلب عبر واتساب فقط</p>
        </div>
      </section>
      <HabbaFooter />
    </main>
  );
}
