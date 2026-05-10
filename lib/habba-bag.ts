import { featuredProducts, visibleProducts, whatsappNumber } from '@/content/habba-products';

export const HABBA_BAG_STORAGE_KEY = 'habba-bag-v1';

export type HabbaBagItem = {
  slug: string;
  quantity: number;
};

const visibleSlugSet = new Set(visibleProducts.map((product) => product.slug));

export const sanitizeBagItems = (value: unknown): HabbaBagItem[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  const normalized = new Map<string, number>();

  for (const entry of value) {
    if (!entry || typeof entry !== 'object') {
      continue;
    }

    const slug = (entry as { slug?: unknown }).slug;
    const quantity = (entry as { quantity?: unknown }).quantity;

    if (typeof slug !== 'string' || !visibleSlugSet.has(slug)) {
      continue;
    }

    if (!Number.isInteger(quantity) || typeof quantity !== 'number' || quantity <= 0) {
      continue;
    }

    normalized.set(slug, (normalized.get(slug) ?? 0) + quantity);
  }

  return Array.from(normalized.entries()).map(([slug, quantity]) => ({ slug, quantity }));
};

export const readBagFromStorage = (): HabbaBagItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(HABBA_BAG_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    return sanitizeBagItems(parsed);
  } catch {
    return [];
  }
};

export const getBagRecommendations = (items: HabbaBagItem[], maxCount = 3) => {
  const safeItems = sanitizeBagItems(items);
  const bagSlugSet = new Set(safeItems.map((item) => item.slug));
  if (safeItems.length === 0) {
    return featuredProducts.filter((product) => !bagSlugSet.has(product.slug)).slice(0, maxCount);
  }

  const mostRecentSlug = safeItems[safeItems.length - 1]?.slug;
  const mostRecentProduct = visibleProducts.find((product) => product.slug === mostRecentSlug);
  const preferredCollection = mostRecentProduct?.collection;

  const fromPreferredCollection = preferredCollection
    ? visibleProducts.filter((product) => product.collection === preferredCollection && !bagSlugSet.has(product.slug))
    : [];

  const fromFeatured = featuredProducts.filter((product) => !bagSlugSet.has(product.slug) && !fromPreferredCollection.some((candidate) => candidate.slug === product.slug));
  const fromVisible = visibleProducts.filter((product) => !bagSlugSet.has(product.slug) && !fromPreferredCollection.some((candidate) => candidate.slug === product.slug) && !fromFeatured.some((candidate) => candidate.slug === product.slug));

  return [...fromPreferredCollection, ...fromFeatured, ...fromVisible].slice(0, maxCount);
};

export const createBagWhatsAppLink = (items: HabbaBagItem[]): string | null => {
  const safeItems = sanitizeBagItems(items);
  if (safeItems.length === 0) {
    return null;
  }

  const lineItems = safeItems
    .map((item) => {
      const product = visibleProducts.find((candidate) => candidate.slug === item.slug);
      if (!product) {
        return null;
      }

      return `- ${product.titleAr} × ${item.quantity}`;
    })
    .filter((line): line is string => Boolean(line));

  if (lineItems.length === 0) {
    return null;
  }

  const msg = `أهلًا، حابة أسأل عن اختياراتي من حبّة:\n${lineItems.join('\n')}\n\nهل القطع دي متاحة؟ والتفاصيل والسعر إيه؟`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
};
