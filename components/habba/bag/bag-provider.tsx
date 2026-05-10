'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { HABBA_BAG_STORAGE_KEY, HabbaBagItem, readBagFromStorage, sanitizeBagItems } from '@/lib/habba-bag';

type BagContextValue = {
  items: HabbaBagItem[];
  itemCount: number;
  addItem: (slug: string) => void;
  removeItem: (slug: string) => void;
  incrementItem: (slug: string) => void;
  decrementItem: (slug: string) => void;
  clearBag: () => void;
};

const BagContext = createContext<BagContextValue | null>(null);

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<HabbaBagItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

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

  const value = useMemo<BagContextValue>(() => ({
    items: sanitizeBagItems(items),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    addItem: (slug) => mutateItem(slug, 1),
    removeItem: (slug) => setItems((current) => sanitizeBagItems(current).filter((item) => item.slug !== slug)),
    incrementItem: (slug) => mutateItem(slug, 1),
    decrementItem: (slug) => mutateItem(slug, -1),
    clearBag: () => setItems([])
  }), [items]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error('useBag must be used inside BagProvider');
  }

  return context;
};
