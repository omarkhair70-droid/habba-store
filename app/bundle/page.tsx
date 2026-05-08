import type { Metadata } from 'next';
import { HabbaFooter } from '@/components/habba/footer';
import { HabbaHeader } from '@/components/habba/header';
import { BundleClient } from './bundle-client';

export const metadata: Metadata = {
  title: 'Bundle Builder | حبّة',
  description: 'اعملي باندل حبّة من 2 أو 3 قطع مناسبة لبعض واسألي عنهم مرة واحدة على واتساب.',
  alternates: { canonical: '/bundle' }
};

export default function BundlePage() {
  return (
    <main>
      <HabbaHeader />
      <BundleClient />
      <HabbaFooter />
    </main>
  );
}
