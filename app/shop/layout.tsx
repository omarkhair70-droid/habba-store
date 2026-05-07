import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تسوّقي منتجات حبّة',
  description: 'تسوّقي إكسسوارات حبّة: أساور، عقود، وأطقم خرز handmade ملونة وخفيفة.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop | Habba | حبّة',
    description: 'تشكيلة إكسسوارات خرز handmade للبس اليومي والهدايا البسيطة.',
    url: '/shop',
    images: ['/images/habba/brand/hbb-logo-preview.png']
  }
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
