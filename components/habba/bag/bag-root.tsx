'use client';

import { BagProvider } from '@/components/habba/bag/bag-provider';

export function BagRoot({ children }: { children: React.ReactNode }) {
  return <BagProvider>{children}</BagProvider>;
}
