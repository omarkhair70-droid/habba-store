import { NextRequest, NextResponse } from 'next/server';
import { visibleProducts, type HabbaProduct } from '@/content/habba-products';

type BundleInput = {
  bundleIntent: 'gift' | 'everyday' | 'colorful' | 'calm' | 'green' | 'cute';
  productCount: 2 | 3;
  includeType: 'any' | 'bracelet-necklace' | 'bracelets' | 'set-plus';
  optionalNote?: string;
};

type RecommendationPick = { slug: string; reasonAr: string };

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 10;
const ipHits = new Map<string, number[]>();

const sets = {
  bundleIntent: new Set(['gift', 'everyday', 'colorful', 'calm', 'green', 'cute']),
  productCount: new Set([2, 3]),
  includeType: new Set(['any', 'bracelet-necklace', 'bracelets', 'set-plus'])
};

function checkLimit(ip: string) {
  const now = Date.now();
  const recent = (ipHits.get(ip) || []).filter((time) => now - time <= WINDOW_MS);
  if (recent.length >= LIMIT) return false;
  recent.push(now);
  ipHits.set(ip, recent);
  return true;
}

function scoreProduct(product: HabbaProduct, input: BundleInput) {
  let score = 0;
  const blob = `${product.titleAr} ${product.titleEn} ${product.descriptionAr} ${product.collectionAr} ${product.tags.join(' ')}`.toLowerCase();
  const boosts: Record<BundleInput['bundleIntent'], string[]> = {
    gift: ['giftable', 'cute-gift', 'soft', 'cute'],
    everyday: ['daily', 'simple', 'calm'],
    colorful: ['colorful', 'stars', 'playful'],
    calm: ['calm', 'neutral', 'simple', 'soft'],
    green: ['green', 'lime', 'sage', 'aqua', 'green-mood'],
    cute: ['cute', 'heart', 'smile', 'strawberry', 'flower', 'giftable']
  };
  boosts[input.bundleIntent].forEach((token) => {
    if (blob.includes(token)) score += 3;
  });
  if (input.includeType === 'bracelets' && product.category === 'Bracelets') score += 7;
  if (input.includeType === 'bracelet-necklace' && (product.category === 'Bracelets' || product.category === 'Necklaces')) score += 4;
  if (input.includeType === 'set-plus' && product.category === 'Sets') score += 6;
  return score;
}

function smartPick(input: BundleInput): RecommendationPick[] {
  const sorted = [...visibleProducts].sort((a, b) => scoreProduct(b, input) - scoreProduct(a, input) || a.slug.localeCompare(b.slug));
  const picks: HabbaProduct[] = [];

  if (input.includeType === 'bracelets') {
    picks.push(...sorted.filter((p) => p.category === 'Bracelets').slice(0, input.productCount));
  } else if (input.includeType === 'bracelet-necklace') {
    const bracelet = sorted.find((p) => p.category === 'Bracelets');
    const necklace = sorted.find((p) => p.category === 'Necklaces');
    if (bracelet) picks.push(bracelet);
    if (necklace && necklace.slug !== bracelet?.slug) picks.push(necklace);
  } else if (input.includeType === 'set-plus') {
    const setProduct = sorted.find((p) => p.category === 'Sets');
    if (setProduct) picks.push(setProduct);
  }

  for (const product of sorted) {
    if (picks.length >= input.productCount) break;
    if (!picks.some((p) => p.slug === product.slug)) picks.push(product);
  }

  return picks.slice(0, input.productCount).map((p) => ({ slug: p.slug, reasonAr: 'قطعة مناسبة مع مود الباندل اللي اخترتيه.' }));
}

function createWhatsappMessage(products: Array<{ titleAr: string }>) {
  return `أهلًا، حابة أسأل عن الباندل ده:\n${products.map((p) => `- ${p.titleAr}`).join('\n')}\nهل متاحين؟ والتفاصيل إيه؟`;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkLimit(ip)) return NextResponse.json({ error: 'طلبات كتير في وقت قصير، جربي بعد شوية.' }, { status: 429 });

  const body = await req.json().catch(() => null) as Partial<BundleInput> | null;
  const optionalNote = (body?.optionalNote || '').trim();
  if (!body || !sets.bundleIntent.has(body.bundleIntent as string) || !sets.productCount.has(body.productCount as number) || !sets.includeType.has(body.includeType as string) || optionalNote.length > 120) {
    return NextResponse.json({ error: 'البيانات غير صحيحة.' }, { status: 400 });
  }

  const input: BundleInput = { bundleIntent: body.bundleIntent as BundleInput['bundleIntent'], productCount: body.productCount as 2 | 3, includeType: body.includeType as BundleInput['includeType'], optionalNote };
  const fallbackPicks = smartPick(input);
  const key = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const formatResult = (picks: RecommendationPick[], source: 'ai' | 'fallback', bundleNameAr: string, summaryAr: string, whatsappMessageAr?: string) => {
    const products = picks.map((pick) => {
      const p = visibleProducts.find((item) => item.slug === pick.slug)!;
      return { slug: p.slug, titleAr: p.titleAr, titleEn: p.titleEn, image: p.image, categoryAr: p.categoryAr, collectionAr: p.collectionAr, reasonAr: pick.reasonAr };
    });
    return { bundleNameAr, summaryAr, products, whatsappMessageAr: whatsappMessageAr || createWhatsappMessage(products), source };
  };

  if (!key) return NextResponse.json(formatResult(fallbackPicks, 'fallback', 'باندل حبّة جاهز', 'اختيارات مناسبة لبعض حسب مودك.'));

  const catalog = visibleProducts.map(({ slug, titleAr, titleEn, category, categoryAr, collectionAr, tags, descriptionAr }) => ({ slug, titleAr, titleEn, category, categoryAr, collectionAr, tags, descriptionAr }));
  try {
    const aiRes = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        input: [
          { role: 'system', content: `You are Habba Bundle Builder. Return strict JSON only. Pick exactly ${input.productCount} slugs from catalog only. Do not invent. No prices. No material claims. No luxury/gold/crystal/healing/energy language. Keep Arabic reasons short and giftable.` },
          { role: 'user', content: JSON.stringify({ input, catalog, outputSchema: { bundleNameAr: 'string', summaryAr: 'string', items: [{ slug: 'string', reasonAr: 'string' }], whatsappMessageAr: 'string' } }) }
        ],
        max_output_tokens: 350
      })
    });
    const raw = await aiRes.json();
    const text = raw?.output_text || '';
    const parsed = JSON.parse(text) as { bundleNameAr?: unknown; summaryAr?: unknown; items?: unknown; whatsappMessageAr?: unknown };
    const valid = Array.isArray(parsed.items) ? parsed.items.filter((item): item is RecommendationPick => typeof item === 'object' && item !== null && typeof (item as { slug?: unknown }).slug === 'string' && typeof (item as { reasonAr?: unknown }).reasonAr === 'string').filter((item) => visibleProducts.some((p) => p.slug === item.slug)) : [];
    const deduped = Array.from(new Map(valid.map((v) => [v.slug, { slug: v.slug, reasonAr: v.reasonAr.trim() || 'قطعة مناسبة مع الباندل.' }])).values());
    const padded = [...deduped];
    for (const item of fallbackPicks) {
      if (padded.length >= input.productCount) break;
      if (!padded.some((x) => x.slug === item.slug)) padded.push(item);
    }
    return NextResponse.json(formatResult(padded.slice(0, input.productCount), 'ai', typeof parsed.bundleNameAr === 'string' ? parsed.bundleNameAr : 'باندل حبّة ليكي', typeof parsed.summaryAr === 'string' ? parsed.summaryAr : 'باندل من قطع مناسبة لبعض.', typeof parsed.whatsappMessageAr === 'string' ? parsed.whatsappMessageAr : undefined));
  } catch {
    return NextResponse.json(formatResult(fallbackPicks, 'fallback', 'باندل حبّة جاهز', 'اختيارات مناسبة لبعض حسب مودك.'));
  }
}
