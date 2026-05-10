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
    <div className="pointer-events-none fixed inset-x-0 top-20 z-50 flex justify-center px-4">
      <div
        className={`${open ? 'pointer-events-auto' : 'pointer-events-none'} w-full max-w-sm rounded-2xl border border-[#EFC8B6] bg-[#FFF7EE] p-3 text-right shadow-[0_10px_30px_rgba(213,124,109,0.16)] transition-all duration-250 ${
          open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
        }`}
        aria-live="polite"
      >
        <p className="text-sm font-bold text-[#5A4B44]">{title}</p>
        <p className="mt-0.5 text-xs text-[#7A6C65]">{body}</p>
        <div className="mt-2 flex items-center justify-between">
          <button onClick={onClose} className="text-xs text-[#9A857B] transition hover:text-[#6A5B55]">
            إغلاق
          </button>
          <Link href="/bag" className="rounded-full bg-[#F7D7C6] px-3 py-1.5 text-xs font-semibold text-[#6A5248] transition hover:bg-[#F3C5AF]">
            افتحي الشنطة
          </Link>
        </div>
      </div>
    </div>
  );
}
