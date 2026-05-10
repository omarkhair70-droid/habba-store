import type { Metadata } from 'next';
import { HabbaHeader } from '@/components/habba/header';
import { HabbaFooter } from '@/components/habba/footer';
import { BagPageClient } from '@/components/habba/bag/bag-page-client';

export const metadata: Metadata = {
  title: 'شنطة حبّة'
};

export default function BagPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] text-[#4E433D]">
      <HabbaHeader />
      <BagPageClient />
      <HabbaFooter />
    </main>
  );
}
