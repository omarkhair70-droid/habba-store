import { visibleProducts, type HabbaProduct } from '@/content/habba-products';

const visibleSet = new Set(visibleProducts.map((p) => p.slug));

export const dedupeSlugs = (slugs: string[]) => Array.from(new Set(slugs));
export const validateVisibleSlugs = (slugs: string[]) => dedupeSlugs(slugs).filter((slug) => visibleSet.has(slug));
export const ensureExactCount = <T>(picks: T[], count: number) => picks.slice(0, count);

export function fillWithFallback<T extends { slug: string }>(validPicks: T[], fallbackPicks: T[], count: number): T[] {
  const out = [...validPicks];
  for (const pick of fallbackPicks) {
    if (out.length >= count) break;
    if (!out.some((x) => x.slug === pick.slug)) out.push(pick);
  }
  return out.slice(0, count);
}

export function mapPicksToProducts<T extends { slug: string; reasonAr?: string }>(
  picks: T[]
): Array<HabbaProduct & { reasonAr?: string }> {
  return picks.flatMap((pick) => {
    const product = visibleProducts.find((p) => p.slug === pick.slug);

    if (!product) {
      return [];
    }

    return [{ ...product, reasonAr: pick.reasonAr }];
  });
}
