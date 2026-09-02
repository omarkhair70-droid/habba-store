import type { Metadata } from 'next';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { BrandPromiseSection } from '@/components/habba/home/brand-promise-section';
import { CollectionsSection } from '@/components/habba/home/collections-section';
import { FeaturedProductsSection } from '@/components/habba/home/featured-products-section';
import { FinalCtaSection } from '@/components/habba/home/final-cta-section';
import { GiftableSection } from '@/components/habba/home/giftable-section';
import { HeroSection } from '@/components/habba/home/hero-section';
import { HowToOrderSection } from '@/components/habba/home/how-to-order-section';
import { MatchEntrySection } from '@/components/habba/home/match-entry-section';
import { TrustNotesSection } from '@/components/habba/home/trust-notes-section';

export const metadata: Metadata = {
  title: 'حبّة إكسسوارات خرز handmade',
  description:
    'حبّة — إكسسوارات خرز handmade، ملونة، بسيطة، ومناسبة كهدايا صغيرة. Handmade bead accessories, colorful, light, and giftable.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Habba | حبّة',
    description: 'حبّة براند إكسسوارات خرز handmade، ملونة وخفيفة ومناسبة للهدايا البسيطة.',
    url: '/',
    images: ['/images/habba/brand/hbb-logo-preview.png']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Habba | حبّة',
    description: 'Handmade bead accessories, colorful, light, and giftable.',
    images: ['/images/habba/brand/hbb-logo-preview.png']
  }
};

export default function HabbaHomePage() {
  return (
    <main>
      <HabbaHeader />
      <HeroSection />
      <FeaturedProductsSection />
      <MatchEntrySection />
      <CollectionsSection />
      <BrandPromiseSection />
      <GiftableSection />
      <HowToOrderSection />
      <TrustNotesSection />
      <FinalCtaSection />
      <HabbaFooter />
    </main>
  );
}
