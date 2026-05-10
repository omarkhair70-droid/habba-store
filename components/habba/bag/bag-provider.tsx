'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { HABBA_BAG_STORAGE_KEY, HabbaBagItem, readBagFromStorage, sanitizeBagItems } from '@/lib/habba-bag';

type BagToastState = { open: boolean; title: string; body: string };
type GroupedToastMessage = { title: string; body: string };

type BagContextValue = {
  items: HabbaBagItem[];
  itemCount: number;
  addItem: (slug: string, productTitle?: string) => void;
  addItems: (slugs: string[], toastMessage?: GroupedToastMessage) => void;
  removeItem: (slug: string) => void;
  incrementItem: (slug: string) => void;
  decrementItem: (slug: string) => void;
  clearBag: () => void;
  toast: BagToastState;
  closeToast: () => void;
};

const BagContext = createContext<BagContextValue | null>(null);

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<HabbaBagItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState<BagToastState>({ open: false, title: '', body: '' });

  useEffect(() => {
    setItems(readBagFromStorage());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(HABBA_BAG_STORAGE_KEY, JSON.stringify(sanitizeBagItems(items)));
  }, [items, isHydrated]);

  const mutateItem = (slug: string, delta: number) => {
    setItems((current) => {
      const safe = sanitizeBagItems(current);
      const index = safe.findIndex((item) => item.slug === slug);

      if (index === -1) {
        if (delta <= 0) return safe;
        return sanitizeBagItems([...safe, { slug, quantity: delta }]);
      }

      const nextQuantity = safe[index].quantity + delta;
      if (nextQuantity <= 0) {
        return safe.filter((item) => item.slug !== slug);
      }

      return safe.map((item) => (item.slug === slug ? { ...item, quantity: nextQuantity } : item));
    });
  };

  const closeToast = useCallback(() => setToast((current) => ({ ...current, open: false })), []);

  const value = useMemo<BagContextValue>(() => ({
    items: sanitizeBagItems(items),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    addItem: (slug, productTitle) => {
      mutateItem(slug, 1);
      if (productTitle) {
        setToast({ open: true, title: 'اتضافت لشنطتك', body: productTitle });
      }
    },
    addItems: (slugs, toastMessage) => {
      const uniqueSlugs = Array.from(new Set(slugs));
      if (!uniqueSlugs.length) return;

      setItems((current) => {
        const safe = sanitizeBagItems(current);
        const nextMap = new Map(safe.map((item) => [item.slug, item.quantity]));

        uniqueSlugs.forEach((slug) => {
          if (!nextMap.has(slug)) {
            nextMap.set(slug, 1);
            return;
          }

          nextMap.set(slug, (nextMap.get(slug) ?? 0) + 1);
        });

        return sanitizeBagItems(Array.from(nextMap.entries()).map(([slug, quantity]) => ({ slug, quantity })));
      });

      if (toastMessage) {
        setToast({ open: true, title: toastMessage.title, body: toastMessage.body });
      }
    },
    removeItem: (slug) => setItems((current) => sanitizeBagItems(current).filter((item) => item.slug !== slug)),
    incrementItem: (slug) => mutateItem(slug, 1),
    decrementItem: (slug) => mutateItem(slug, -1),
    clearBag: () => setItems([]),
    toast,
    closeToast
  }), [items, toast, closeToast]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error('useBag must be used inside BagProvider');
  }

  return context;
};
