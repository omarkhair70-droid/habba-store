import type { Metadata } from 'next';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { MatchClient } from './match-client';

export const metadata: Metadata = {
  title: 'Habba Match | اختاري مودك',
  description: 'اختاري مودك وحبّة ترشحلك قطع خرز مناسبة من الكتالوج.'
};

export default function MatchPage() {
  return (
    <main className="min-h-screen bg-[#FFF9F2]">
      <HabbaHeader />
      <MatchClient />
      <HabbaFooter />
    </main>
  );
}
