import { Suspense } from 'react';
import ShopClient from './shop-client';

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto w-[92%] max-w-6xl py-10 text-right text-sm text-[#6A5F59]">جاري تحميل المنتجات...</div>}>
      <ShopClient />
    </Suspense>
  );
}
