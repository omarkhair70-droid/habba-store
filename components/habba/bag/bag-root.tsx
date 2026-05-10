'use client';

import { BagProvider, useBag } from '@/components/habba/bag/bag-provider';
import { BagToast } from '@/components/habba/bag/bag-toast';

function BagFloatingUi() {
  const { toast, closeToast } = useBag();

  return <BagToast open={toast.open} title={toast.title} body={toast.body} onClose={closeToast} />;
}

export function BagRoot({ children }: { children: React.ReactNode }) {
  return (
    <BagProvider>
      {children}
      <BagFloatingUi />
    </BagProvider>
  );
}
