import { visibleProducts } from '@/content/habba-products';
import type { HabbaCatalogProfile } from './types';

const detect = (text: string, dictionary: Record<string, string[]>) =>
  Object.entries(dictionary)
    .filter(([, tokens]) => tokens.some((t) => text.includes(t)))
    .map(([k]) => k);

export function getHabbaCatalogProfiles(): HabbaCatalogProfile[] {
  return visibleProducts.map((product) => {
    const searchableText = [product.titleAr, product.titleEn, product.categoryAr, product.collectionAr, product.descriptionAr, product.tags.join(' ')].join(' ').toLowerCase();
    const inferredColors = detect(searchableText, {
      green: ['green', 'اخضر', 'أخضر', 'lime', 'sage', 'aqua', 'olive'],
      pink: ['pink', 'وردي', 'lavender', 'berry', 'pastel', 'coral'],
      blue: ['blue', 'ازرق', 'أزرق', 'aqua'],
      red: ['red', 'احمر', 'أحمر'],
      neutral: ['neutral', 'محايد', 'grey', 'gray', 'smoky']
    });
    const inferredMoods = detect(searchableText, {
      cute: ['cute', 'heart', 'smile', 'strawberry', 'flower', 'giftable'],
      soft: ['soft', 'pastel', 'lavender', 'calm'],
      calm: ['calm', 'neutral', 'simple', 'daily', 'هادي', 'بسيط'],
      colorful: ['colorful', 'stars', 'playful', 'pastel']
    });
    const inferredUseCases = detect(searchableText, {
      gift: ['giftable', 'هديه', 'هدية'],
      everyday: ['daily', 'simple', 'easy to wear', 'يومي'],
      outing: ['playful', 'colorful', 'cheerful']
    });
    const productType = product.category === 'Bracelets' ? 'bracelet' : product.category === 'Necklaces' ? 'necklace' : 'set';
    return { ...product, searchableText, inferredColors, inferredMoods, inferredUseCases, productType };
  });
}
