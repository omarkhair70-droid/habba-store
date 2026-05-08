import { getHabbaCatalogProfiles } from './catalog';
import type { HabbaIntent, ScoredProduct } from './types';

const AR_DIACRITICS = /[\u064B-\u0652]/g;
export const normalizeArabic = (value: string) => value.toLowerCase().replace(AR_DIACRITICS, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/\s+/g, ' ').trim();
const hasAny = (blob: string, tokens: string[]) => tokens.some((t) => blob.includes(normalizeArabic(t)));

const terms = {
  bracelet: ['اسوره', 'اساور', 'bracelet'],
  necklace: ['عقد', 'chain', 'necklace'],
  set: ['طقم', 'set'],
  gift: ['هديه', 'gift', 'صاحبتي'],
  calm: ['هادي', 'calm'],
  cute: ['كيوت', 'cute', 'لطيف'],
  colorful: ['ملون', 'الوان', 'star', 'colorful'],
  green: ['اخضر', 'خضرا', 'جرين', 'green', 'sage', 'aqua', 'lime'],
  pink: ['وردي', 'pink', 'لافندر', 'pastel', 'berry'],
  natural: ['ناتشورال', 'natural', 'neutral', 'wood', 'خشب', 'بسيط'],
  daily: ['يومي', 'لبس اليومي', 'خفيف'],
  negativeChildish: ['مش طفوليه', 'مش طفولي', 'مش childish'],
  negativeColorful: ['مش ملون', 'مش ملونه', 'مش ملونه اوي', 'مش اوفر', 'مش صريحه']
};

export function scoreProductsForIntent(input: HabbaIntent): ScoredProduct[] {
  const profiles = getHabbaCatalogProfiles();
  const blob = normalizeArabic([input.query, input.productType, input.mood, input.colorPreference, input.shoppingFor, input.bundleIntent, input.dropMood, input.focusType, input.colorDirection, input.optionalNote].filter(Boolean).join(' '));
  const wantsNonChildish = hasAny(blob, terms.negativeChildish);
  const wantsMuted = hasAny(blob, terms.negativeColorful);

  return profiles.map((p) => {
    let score = 0;
    const reasons: string[] = [];

    if ((input.productType === 'bracelet' || hasAny(blob, terms.bracelet)) && p.productType === 'bracelet') { score += 10; reasons.push('أسورة بسيطة وتنفع للبس اليومي.'); }
    if ((input.productType === 'necklace' || hasAny(blob, terms.necklace)) && p.productType === 'necklace') { score += 10; reasons.push('عقد خفيف وواضح من غير تفاصيل كتير.'); }
    if ((input.productType === 'set' || hasAny(blob, terms.set)) && p.productType === 'set') { score += 9; reasons.push('طقم جاهز ومتناسق للمناسبة.'); }
    if (hasAny(blob, terms.gift) && p.inferredUseCases.includes('gift')) { score += 8; reasons.push('ناعمة وبتفاصيل لطيفة، فتنفع كهدية بسيطة.'); }
    if ((input.mood === 'calm' || hasAny(blob, terms.calm)) && p.inferredMoods.includes('calm')) { score += 6; reasons.push('قريبة من مود هادي ومريحة للبس اليومي.'); }
    if ((input.mood === 'cute' || hasAny(blob, terms.cute)) && p.inferredMoods.includes('cute')) { score += 6; reasons.push('كيوت وناعمة من غير ما تبقى طفولية زيادة.'); }
    if ((input.mood === 'natural' || hasAny(blob, terms.natural)) && (p.inferredMoods.includes('natural') || p.inferredColors.includes('neutral'))) { score += 7; reasons.push('ستايل ناتشورال بسيط بألوان هادية.'); }
    if (hasAny(blob, terms.green) && p.inferredColors.includes('green')) { score += 7; reasons.push('قريبة من مود الأخضر الهادي ولبسها يومي.'); }
    if (hasAny(blob, terms.pink) && p.inferredColors.includes('pink')) { score += 7; reasons.push('فيها درجة وردي/لافندر ناعمة وهادية.'); }
    if ((input.mood === 'colorful' || hasAny(blob, terms.colorful)) && p.inferredMoods.includes('colorful')) { score += 5; reasons.push('ألوانها مرحة بس مش أوفر.'); }
    if (hasAny(blob, terms.daily) && p.inferredUseCases.includes('everyday')) score += 5;
    if (wantsNonChildish && p.inferredMoods.includes('cute')) score -= 3;
    if (wantsMuted && p.inferredMoods.includes('colorful')) score -= 6;
    if (blob && normalizeArabic(p.searchableText).includes(blob)) score += 2;

    return { slug: p.slug, score, reasonAr: reasons[0] || 'اختيار متناسق مع طلبك الحالي.' };
  }).sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug));
}
