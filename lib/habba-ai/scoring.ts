import { getHabbaCatalogProfiles } from './catalog';
import type { HabbaIntent, ScoredProduct } from './types';

const AR_DIACRITICS = /[\u064B-\u0652]/g;
export const normalizeArabic = (value: string) => value.toLowerCase().replace(AR_DIACRITICS, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/\s+/g, ' ').trim();

const synonymSets = {
  bracelet: ['اسوره', 'أسورة', 'bracelet', 'bracelets'],
  necklace: ['عقد', 'necklace', 'necklaces'],
  set: ['طقم', 'set', 'sets'],
  gift: ['هديه', 'هدية', 'gift'],
  daily: ['لنفسي', 'يومي', 'daily'],
  outing: ['خروجه', 'outing'],
  simple: ['بسيط', 'simple'],
  soft: ['ناعم', 'soft'],
  cute: ['كيوت', 'لطيف', 'cute'],
  calm: ['هادي', 'هادئ', 'calm'],
  colorful: ['ملون', 'الوان', 'ألوان', 'colorful'],
  green: ['اخضر', 'خضرا', 'جرين', 'green'],
  pink: ['وردي', 'بينك', 'pink'],
  blue: ['ازرق', 'blue'],
  red: ['احمر', 'red'],
  lime: ['لايم', 'lime'],
  lavender: ['لافندر', 'lavender'],
  neutral: ['رمادي', 'grey', 'gray', 'محايد', 'neutral']
};

const hasAny = (blob: string, tokens: string[]) => tokens.some((t) => blob.includes(normalizeArabic(t)));

export function scoreProductsForIntent(input: HabbaIntent): ScoredProduct[] {
  const profiles = getHabbaCatalogProfiles();
  const blob = normalizeArabic([input.query, input.productType, input.mood, input.colorPreference, input.shoppingFor, input.bundleIntent, input.dropMood, input.focusType, input.colorDirection, input.optionalNote].filter(Boolean).join(' '));

  return profiles
    .map((p) => {
      let score = 0;
      const reasons: string[] = [];
      const pBlob = normalizeArabic(p.searchableText);

      if (input.productType && input.productType !== 'any' && (input.productType === p.productType || hasAny(blob, synonymSets[p.productType]))) { score += 8; reasons.push(`نوعها ${p.categoryAr} مناسب لطلبك`); }
      if (hasAny(blob, synonymSets.gift) && p.inferredUseCases.includes('gift')) { score += 6; reasons.push('تفاصيلها لطيفة وتنفع هدية'); }
      if (hasAny(blob, synonymSets.daily) && p.inferredUseCases.includes('everyday')) { score += 5; reasons.push('خفيفة ومريحة للبس اليومي'); }
      if (hasAny(blob, synonymSets.calm) && p.inferredMoods.includes('calm')) { score += 4; reasons.push('مودها هادي وبسيط'); }
      if (hasAny(blob, synonymSets.cute) && p.inferredMoods.includes('cute')) { score += 4; reasons.push('تفاصيلها كيوت من غير مبالغة'); }
      if (hasAny(blob, synonymSets.colorful) && p.inferredMoods.includes('colorful')) { score += 4; reasons.push('ألوانها مبهجة ومرحة'); }
      if (hasAny(blob, [...synonymSets.green, ...synonymSets.lime]) && p.inferredColors.includes('green')) { score += 5; reasons.push('قريبة من مود الأخضر الهادي'); }
      if (hasAny(blob, [...synonymSets.pink, ...synonymSets.lavender]) && p.inferredColors.includes('pink')) { score += 5; reasons.push('فيها درجة وردي/لافندر ناعمة'); }
      if (hasAny(blob, synonymSets.blue) && p.inferredColors.includes('blue')) score += 4;
      if (hasAny(blob, synonymSets.red) && p.inferredColors.includes('red')) score += 4;
      if (hasAny(blob, synonymSets.neutral) && p.inferredColors.includes('neutral')) score += 4;
      if (pBlob.includes(blob) && blob.length > 2) score += 3;

      return { slug: p.slug, score, reasonAr: reasons[0] || 'مناسبة لذوقك واختيارك الحالي.' };
    })
    .sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug));
}
