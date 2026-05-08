import type { HabbaProduct } from '@/content/habba-products';

export type HabbaMode = 'search' | 'match' | 'bundle' | 'drop';

export type HabbaIntent = {
  mode: HabbaMode;
  query?: string;
  productType?: string;
  mood?: string;
  colorPreference?: string;
  shoppingFor?: string;
  bundleIntent?: string;
  dropMood?: string;
  focusType?: string;
  colorDirection?: string;
  optionalNote?: string;
  desiredCount: number;
};

export type HabbaCatalogProfile = Pick<HabbaProduct, 'slug' | 'titleAr' | 'titleEn' | 'category' | 'categoryAr' | 'collection' | 'collectionAr' | 'descriptionAr' | 'tags'> & {
  searchableText: string;
  inferredColors: string[];
  inferredMoods: string[];
  inferredUseCases: string[];
  productType: 'bracelet' | 'necklace' | 'set';
};

export type ScoredProduct = { slug: string; score: number; reasonAr: string };
