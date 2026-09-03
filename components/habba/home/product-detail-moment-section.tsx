import Link from 'next/link';
import { ProductVisual } from '@/components/habba/product-visual';

const moments = [
  {
    href: '/product/pink-strawberry-necklace',
    image: '/images/habba/products/hbb-pink-strawberry-necklace-card.png',
    alt: 'عقد فراولة وردي',
    eyebrow: 'تفصيلة',
    title: 'فراولة صغيرة',
    note: 'الحاجة اللي تخلي القطعة تتحفظ في الذاكرة.',
    bg: '#F0DCE8',
    imageClass: 'scale-[1.65] translate-x-[8%] translate-y-[8%]'
  },
  {
    href: '/product/colorful-flower-bracelet',
    image: '/images/habba/products/hbb-colorful-flower-bracelet-card.png',
    alt: 'أسورة ورد ملون',
    eyebrow: 'إيقاع',
    title: 'ورد وألوان',
    note: 'مش كل الخرزة بتشتغل لوحدها؛ الترتيب نفسه جزء من المود.',
    bg: '#F4E5B9',
    imageClass: 'scale-[1.72] -translate-x-[10%] translate-y-[5%]'
  },
  {
    href: '/product/green-flower-necklace',
    image: '/images/habba/products/hbb-green-flower-necklace-card.png',
    alt: 'عقد وردة خضراء',
    eyebrow: 'لون',
    title: 'أخضر هادي',
    note: 'نفس المنتج البسيط يقدر يبقى عالم كامل لما اللون يقود المشهد.',
    bg: '#DDE9CF',
    imageClass: 'scale-[1.58] translate-x-[4%] translate-y-[10%]'
  }
] as const;

export function ProductDetailMomentSection() {
  return (
    <section className="overflow-hidden border-y border-[#4F3B31]/10 bg-[#302722] py-16 text-white sm:py-20">
      <div className="mx-auto w-[94%] max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[0.62fr_1.38fr] lg:items-end">
          <div className="text-right">
            <p className="text-xs font-extrabold text-[#EAB7B1]">قربي أكتر</p>
            <h2 className="mt-2 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-5xl">
              المنتج مش
              <span className="block text-[#F2C8C3]">صورة كارت بس.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-8 text-[#E5D9D3] sm:text-base">
            نفس صور حبّة الحالية نقدر نستخدمها بأكتر من مسافة وزاوية عرض: مرة كقطعة كاملة، ومرة كتفصيلة قريبة، ومرة كجزء من مود. ده يدي للمنتجات مساحة تتنفس من غير ما نخترع منتج مش موجود.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {moments.map((moment, index) => (
            <Link
              key={moment.href}
              href={moment.href}
              className="group relative min-h-[430px] overflow-hidden rounded-[2.5rem]"
              style={{ backgroundColor: moment.bg }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <ProductVisual
                  src={moment.image}
                  alt={moment.alt}
                  sizes="(max-width: 1024px) 88vw, 30vw"
                  className={'h-full w-full object-contain transition duration-700 group-hover:scale-[1.78] ' + moment.imageClass}
                />
              </div>
              <div className="absolute inset-x-4 bottom-4 z-10 rounded-[1.75rem] bg-[#302722]/88 p-4 text-right backdrop-blur-md sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-black tracking-[0.18em] text-[#F2C8C3]">0{index + 1}</span>
                  <span className="text-xs font-extrabold text-[#E8D9D2]">{moment.eyebrow}</span>
                </div>
                <h3 className="mt-2 text-xl font-black">{moment.title}</h3>
                <p className="mt-2 text-xs leading-6 text-[#DACDC7]">{moment.note}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
