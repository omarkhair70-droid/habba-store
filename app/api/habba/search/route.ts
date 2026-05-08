import { NextRequest, NextResponse } from 'next/server';
import { visibleProducts, type HabbaProduct } from '@/content/habba-products';

type SearchResponse = {
  headlineAr: string;
  summaryAr: string;
  products: Array<{
    slug: string;
    titleAr: string;
    titleEn: string;
    image: string;
    categoryAr: string;
    collectionAr: string;
  }>;
  interpretedMoodAr: string;
  suggestedFilterKey: string | null;
  source: 'ai' | 'fallback';
};

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 15;
const ipHits = new Map<string, number[]>();

const toSearchBlob = (product: HabbaProduct) => `${product.titleAr} ${product.titleEn} ${product.categoryAr} ${product.collectionAr} ${product.descriptionAr} ${product.tags.join(' ')}`.toLowerCase();

function checkLimit(ip: string) {
  const now = Date.now();
  const recent = (ipHits.get(ip) || []).filter((time) => now - time <= WINDOW_MS);
  if (recent.length >= LIMIT) return false;
  recent.push(now);
  ipHits.set(ip, recent);
  return true;
}

function fallbackSearch(query: string) {
  const q = query.toLowerCase();
  const scored = visibleProducts.map((product) => {
    let score = 0;
    const blob = toSearchBlob(product);
    const add = (tokens: string[], points = 3) => tokens.forEach((token) => { if (blob.includes(token)) score += points; });

    if (/هدية|gift/.test(q)) add(['giftable', 'هدايا صغيرة'], 4);
    if (/كيوت|لطيف|cute/.test(q)) add(['cute', 'heart', 'smile', 'strawberry', 'flower', 'giftable'], 3);
    if (/هادي|هادية|بسيط|neutral|calm/.test(q)) add(['calm', 'simple', 'neutral', 'daily'], 3);
    if (/يومي|daily/.test(q)) add(['daily', 'simple'], 3);
    if (/ملون|colorful|ألوان/.test(q)) add(['colorful', 'playful', 'stars'], 3);
    if (/أخضر|خضرا|green/.test(q)) add(['green', 'lime', 'sage', 'aqua'], 3);
    if (/وردي|pink/.test(q)) add(['pink', 'pastel', 'lavender', 'berry'], 3);
    if (/أزرق|blue/.test(q)) add(['blue', 'aqua'], 3);
    if (/أحمر|red/.test(q)) add(['red', 'heart'], 3);
    if (/أسورة|bracelet/.test(q) && product.category === 'Bracelets') score += 6;
    if (/عقد|necklace/.test(q) && product.category === 'Necklaces') score += 6;
    if (/طقم|set/.test(q) && product.category === 'Sets') score += 6;
    if (blob.includes(q)) score += 5;

    return { product, score };
  });

  return scored.sort((a, b) => b.score - a.score || a.product.slug.localeCompare(b.product.slug)).slice(0, 8).map((row) => row.product);
}

function toResponse(products: HabbaProduct[], source: 'ai' | 'fallback', headlineAr: string, summaryAr: string, interpretedMoodAr: string, suggestedFilterKey: string | null): SearchResponse {
  return {
    headlineAr,
    summaryAr,
    products: products.map((product) => ({ slug: product.slug, titleAr: product.titleAr, titleEn: product.titleEn, image: product.image, categoryAr: product.categoryAr, collectionAr: product.collectionAr })),
    interpretedMoodAr,
    suggestedFilterKey,
    source
  };
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkLimit(ip)) return NextResponse.json({ error: 'طلبات كتير في وقت قصير، جربي بعد شوية.' }, { status: 429 });

  const body = await req.json().catch(() => null) as { query?: unknown } | null;
  const query = typeof body?.query === 'string' ? body.query.trim() : '';
  if (!query || query.length < 3 || query.length > 160) return NextResponse.json({ error: 'صيغة البحث غير صحيحة.' }, { status: 400 });

  const fallbackProducts = fallbackSearch(query);
  const fallbackResult = toResponse(fallbackProducts, 'fallback', 'اختيارات قريبة من اللي بتدوري عليه', 'رشّحنا منتجات من الكتالوج المتاح بناءً على وصفك.', 'مود بسيط ومناسب لذوقك.', null);

  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json(fallbackResult);

  const catalog = visibleProducts.map(({ slug, titleAr, titleEn, categoryAr, collectionAr, descriptionAr, tags }) => ({ slug, titleAr, titleEn, categoryAr, collectionAr, descriptionAr, tags }));

  try {
    const aiRes = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        input: [
          { role: 'system', content: 'You are Habba Search. Return strict JSON only. Select up to 8 slugs from provided catalog only. Never invent products. Arabic-first concise tone. No prices. No material claims outside catalog. No luxury/gold/crystal/healing/energy language.' },
          { role: 'user', content: JSON.stringify({ query, catalog, outputSchema: { headlineAr: 'string', summaryAr: 'string', matchedSlugs: ['string'], interpretedMoodAr: 'string', suggestedFilterKey: 'string|null' } }) }
        ],
        max_output_tokens: 350
      })
    });

    const raw = await aiRes.json();
    const text = raw?.output_text || raw?.output?.[0]?.content?.map((c: { text?: string }) => c.text).join('') || '';
    const parsed: unknown = JSON.parse(text);
    const parsedObj = typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : {};
    const rawSlugs = Array.isArray(parsedObj.matchedSlugs) ? parsedObj.matchedSlugs : [];
    const validSlugSet = new Set(visibleProducts.map((product) => product.slug));
    const validSlugs = Array.from(new Set(rawSlugs.filter((slug): slug is string => typeof slug === 'string' && validSlugSet.has(slug)))).slice(0, 8);

    if (validSlugs.length === 0) return NextResponse.json(fallbackResult);

    const aiProducts = validSlugs.map((slug) => visibleProducts.find((product) => product.slug === slug)).filter((product): product is HabbaProduct => Boolean(product));

    return NextResponse.json(toResponse(aiProducts, 'ai', (typeof parsedObj.headlineAr === 'string' && parsedObj.headlineAr.trim()) || 'اختيارات شبه مودك', (typeof parsedObj.summaryAr === 'string' && parsedObj.summaryAr.trim()) || 'لقينا منتجات مناسبة من الكتالوج المتاح.', (typeof parsedObj.interpretedMoodAr === 'string' && parsedObj.interpretedMoodAr.trim()) || 'مود ناعم وبسيط.', typeof parsedObj.suggestedFilterKey === 'string' ? parsedObj.suggestedFilterKey : null));
  } catch {
    return NextResponse.json(fallbackResult);
  }
}
