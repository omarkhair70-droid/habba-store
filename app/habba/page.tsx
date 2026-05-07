import Link from 'next/link';
import { HabbaHeader } from '@/components/habba/header';
import { ProductCard } from '@/components/habba/product-card';
import { launchProducts } from '@/content/habba-products';

const featured = launchProducts.filter((p) => p.featured);

export default function HabbaHomePage() {
  return <main>
    <HabbaHeader />
    <section className="mx-auto grid w-[92%] max-w-6xl gap-6 py-8 md:grid-cols-2 md:items-center">
      <div>
        <p className="text-right">إكسسوارات خرز handmade</p><h1 className="text-right text-4xl font-extrabold">حبّة حلوة لكل يوم</h1>
        <p className="mt-2 text-right">قطع خرز خفيفة وملونة، معمولة بإيد، مناسبة للبس اليومي أو كهدية بسيطة.</p>
        <p className="mt-2 text-sm text-[#7B6F68]">Handmade bead accessories, colorful, light, and giftable. Made to feel playful, honest, and easy to wear.</p>
        <div className="mt-4 flex gap-2"><Link href="/habba/shop" className="rounded-full bg-[#F87070] px-4 py-2 font-bold text-white">تسوّقي المنتجات</Link><a href="https://wa.me/201011549509" className="rounded-full border border-[#F0DED0] bg-[#FFFCF7] px-4 py-2 font-bold">اطلب عبر واتساب</a></div>
      </div>
      <img src="/images/habba/products/hbb-colorful-star-set-card.png" alt="Hero" className="aspect-square w-full rounded-3xl object-cover shadow" />
    </section>
    <section className="mx-auto w-[92%] max-w-6xl py-6"><h2 className="text-right text-2xl font-bold">معمولة بإيد، بألوان تفرّح</h2><p className="text-sm">Handmade, colorful, and honest.</p><p className="mt-2 text-right">حبّة بتقدم إكسسوارات خرز بسيطة ومرحة، من غير فخامة مزيفة أو وعود مبالغ فيها. كل قطعة شكلها واضح، خامتها صادقة، وروحها خفيفة.</p></section>
    <section className="mx-auto w-[92%] max-w-6xl py-4"><h2 className="mb-3 text-right text-2xl font-bold">منتجات مميزة</h2><div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p.slug} product={p} />)}</div></section>
    <section className="mx-auto w-[92%] max-w-6xl py-6"><h2 className="mb-3 text-2xl font-bold">Collections</h2><div className="grid gap-3 md:grid-cols-3">{[['Colorful Star Collection','كولرفل ستار','/images/habba/products/hbb-colorful-star-set-card.png','قطع مرحة وملونة فيها نجوم وتفاصيل صغيرة تدي شكل playful من غير مبالغة.'],['Green Mood Collection','جرين مود','/images/habba/products/hbb-green-speckle-bracelet-card.png','درجات أخضر وأكوا هادية، مناسبة للبس اليومي وإحساس clean وfresh.'],['Cute Gift Collection','هدايا صغيرة','/images/habba/products/hbb-lavender-rose-bracelet-card.png','قطع لطيفة وناعمة، مناسبة كهدية بسيطة أو تفصيلة حلوة في اليوم.']].map((c)=><article key={c[0]} className="rounded-2xl bg-[#FDE2E4] p-4"><img src={c[2]} className="aspect-square w-full rounded-xl object-cover"/><h3 className="mt-2 font-bold">{c[0]}</h3><p className="text-right">{c[1]}</p><p className="text-right text-sm">{c[3]}</p></article>)}</div></section>
  </main>;
}
