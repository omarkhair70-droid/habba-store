import './globals.css';
import type { Metadata } from 'next';
import { BagRoot } from '@/components/habba/bag/bag-root';

const siteTitle = 'Habba | حبّة';
const descriptionAr = 'حبّة — إكسسوارات خرز handmade، ملونة، بسيطة، ومناسبة كهدايا صغيرة.';
const descriptionEn = 'Handmade bead accessories, colorful, light, and giftable.';
const siteDescription = `${descriptionAr} ${descriptionEn}`;
const siteUrl = 'https://habba-store.vercel.app';
const socialImage = '/images/habba/brand/hbb-logo-preview.png';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Habba'
  },
  description: siteDescription,
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Habba',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'Habba | حبّة'
      }
    ],
    locale: 'ar_EG',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [socialImage]
  },
  icons: {
    icon: '/images/habba/brand/hbb-favicon.png',
    shortcut: '/images/habba/brand/hbb-favicon.png',
    apple: '/images/habba/brand/hbb-favicon.png'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar"><body><BagRoot>{children}</BagRoot></body></html>;
}
