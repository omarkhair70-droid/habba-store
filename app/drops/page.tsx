import type { Metadata } from 'next';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { DropBuilderClient } from './drop-builder-client';

export const metadata: Metadata = {
  title: 'Habba Drops | حبّة',
  description: 'ابني Drop صغير من قطع حبّة حسب المود، الألوان، والمناسبة.',
  alternates: { canonical: '/drops' }
};

export default function DropsPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F2]">
      <HabbaHeader />
      <DropBuilderClient />
      <HabbaFooter />
    </main>
  );
}
