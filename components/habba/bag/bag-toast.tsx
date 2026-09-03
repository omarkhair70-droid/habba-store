'use client';

import Link from 'next/link';
import { useEffect } from 'react';

type BagToastProps = {
  open: boolean;
  title: string;
  body: string;
  onClose: () => void;
};

export function BagToast({ open, title, body, onClose }: BagToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, 2600);
    return () => window.clearTimeout(timer);
  }, [open, onClose]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-24 z-50 flex justify-center px-4">
      <div
        className={(open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0') + ' w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-[#302722] p-3.5 text-right text-white shadow-2xl transition-all duration-200'}
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <span className="habba-bead mt-1 h-5 w-5 shrink-0 bg-[#F56F67]" aria-hidden="true" />
          <div className="flex-1">
            <p className="text-sm font-black">{title}</p>
            <p className="mt-0.5 text-xs leading-5 text-[#DCCFC9]">{body}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
          <button onClick={onClose} className="text-xs font-bold text-[#BFAEA7]">
            كمّلي تصفح
          </button>
          <Link href="/bag" className="rounded-full bg-[#F56F67] px-3.5 py-1.5 text-xs font-extrabold text-white">
            افتحي الشنطة
          </Link>
        </div>
      </div>
    </div>
  );
}
