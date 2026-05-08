import { NextRequest, NextResponse } from 'next/server';
import { visibleProducts, type HabbaProduct } from '@/content/habba-products';

type RecommendationPick = {
  slug: string;
  reasonAr: string;
};

type MatchInput = {
  shoppingFor: 'for-me' | 'gift';
  productType: 'any' | 'bracelet' | 'necklace' | 'set';
  mood: 'calm' | 'colorful' | 'cute' | 'daily' | 'natural';
  colorPreference: 'surprise' | 'green' | 'pink' | 'blue' | 'red' | 'neutral';
  optionalNote?: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 10;
const ipHits = new Map<string, number[]>();

const sets = {
  shoppingFor: new Set(['for-me', 'gift']),
  productType: new Set(['any', 'bracelet', 'necklace', 'set']),
  mood: new Set(['calm', 'colorful', 'cute', 'daily', 'natural']),
  colorPreference: new Set(['surprise', 'green', 'pink', 'blue', 'red', 'neutral'])
};

function checkLimit(ip: string) {
  const now = Date.now();
  const recent = (ipHits.get(ip) || []).filter((time) => now - time <= WINDOW_MS);
  if (recent.length >= LIMIT) return false;
  recent.push(now);
  ipHits.set(ip, recent);
  return true;
}

function scoreProduct(product: HabbaProduct, input: MatchInput) {
  let score = 0;
  const blob = `${product.titleAr} ${product.titleEn} ${product.descriptionAr} ${product.collectionAr} ${product.tags.join(' ')}`.toLowerCase();
  if (input.productType === 'bracelet' && product.category === 'Bracelets') score += 8;
  if (input.productType === 'necklace' && product.category === 'Necklaces') score += 8;
  if (input.productType === 'set' && product.category === 'Sets') score += 8;
  if (input.shoppingFor === 'gift' && (product.tags.includes('giftable') || product.collectionAr.includes('هدايا صغيرة'))) score += 4;

  const moodBoost: Record<MatchInput['mood'], string[]> = {
    calm: ['calm', 'soft', 'neutral', 'daily'],
    colorful: ['colorful', 'playful', 'stars'],
    cute: ['cute', 'giftable', 'smile', 'heart', 'strawberry', 'flower'],
    daily: ['daily', 'simple', 'calm'],
    natural: ['natural', 'wooden', 'neutral', 'green']
  };
  moodBoost[input.mood].forEach((token) => { if (blob.includes(token)) score += 2; });

  if (input.colorPreference !== 'surprise') {
    const colorMap: Record<Exclude<MatchInput['colorPreference'], 'surprise'>, string[]> = {
      green: ['green', 'أخضر', 'جرين', 'sage', 'olive', 'lime'],
      pink: ['pink', 'وردي', 'lavender', 'coral', 'berry'],
      blue: ['blue', 'أزرق', 'aqua'],
      red: ['red', 'أحمر', 'heart', 'flower'],
      neutral: ['neutral', 'grey', 'gray', 'simple', 'calm', 'محايد']
    };
    colorMap[input.colorPreference].forEach((token) => { if (blob.includes(token.toLowerCase())) score += 2; });
  }

  return score;
}

function fallback(input: MatchInput): RecommendationPick[] {
  return [...visibleProducts]
    .sort((a, b) => scoreProduct(b, input) - scoreProduct(a, input) || a.slug.localeCompare(b.slug))
    .slice(0, 3)
    .map((p) => ({ slug: p.slug, reasonAr: 'اختيار مناسب للمود والتفاصيل اللي اخترتيها.' }));
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkLimit(ip)) {
    return NextResponse.json({ error: 'طلبات كتير في وقت قصير، جربي بعد شوية.' }, { status: 429 });
  }

  const body = await req.json().catch(() => null) as Partial<MatchInput> | null;
  const optionalNote = (body?.optionalNote || '').trim();
  if (!body || !sets.shoppingFor.has(body.shoppingFor as string) || !sets.productType.has(body.productType as string) || !sets.mood.has(body.mood as string) || !sets.colorPreference.has(body.colorPreference as string) || optionalNote.length > 120) {
    return NextResponse.json({ error: 'البيانات غير صحيحة.' }, { status: 400 });
  }

  const input: MatchInput = { shoppingFor: body.shoppingFor as MatchInput['shoppingFor'], productType: body.productType as MatchInput['productType'], mood: body.mood as MatchInput['mood'], colorPreference: body.colorPreference as MatchInput['colorPreference'], optionalNote };
  const fallbackPicks: RecommendationPick[] = fallback(input);

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const key = process.env.OPENAI_API_KEY;

  const formatProducts = (picks: RecommendationPick[], source: 'ai' | 'fallback', headlineAr: string, summaryAr: string, whatsappMessageAr: string) => ({
    headlineAr,
    summaryAr,
    products: picks.map((pick) => {
      const product = visibleProducts.find((x) => x.slug === pick.slug)!;
      return { slug: product.slug, titleAr: product.titleAr, titleEn: product.titleEn, image: product.image, categoryAr: product.categoryAr, collectionAr: product.collectionAr, reasonAr: pick.reasonAr };
    }),
    whatsappMessageAr,
    source
  });

  if (!key) {
    const names = fallbackPicks.map((pick) => visibleProducts.find((p) => p.slug === pick.slug)?.titleAr).filter(Boolean).join('\n- ');
    return NextResponse.json(formatProducts(fallbackPicks, 'fallback', 'اختيارات قريبة من مودك', 'دي قطع من الكتالوج مناسبة لاختياراتك.', `أهلًا، حابة أسأل عن الترشيحات دي:\n- ${names}\nهل متاحين؟ والتفاصيل إيه؟`));
  }

  const catalog = visibleProducts.map(({ slug, titleAr, titleEn, category, categoryAr, collection, collectionAr, tags, descriptionAr }) => ({ slug, titleAr, titleEn, category, categoryAr, collection, collectionAr, tags, descriptionAr }));
  try {
    const aiRes = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        input: [
          { role: 'system', content: 'You are Habba Match. Return only strict JSON. Pick exactly 3 product slugs from catalog only. No prices. No luxury/gold/crystal/healing/energy language. Arabic-first warm concise tone.' },
          { role: 'user', content: JSON.stringify({ input, catalog, outputSchema: { headlineAr: 'string', summaryAr: 'string', recommendations: [{ slug: 'string', reasonAr: 'string' }], whatsappMessageAr: 'string' } }) }
        ],
        max_output_tokens: 400
      })
    });

    const raw = await aiRes.json();
    const text = raw?.output_text || raw?.output?.[0]?.content?.map((c: { text?: string }) => c.text).join('') || '';
    const parsed: unknown = JSON.parse(text);
    const parsedObj = typeof parsed === 'object' && parsed !== null ? parsed as Record<string, unknown> : {};
    const rawRecommendations = Array.isArray(parsedObj.recommendations) ? parsedObj.recommendations : [];
    const validAiPicks: RecommendationPick[] = Array.from(
      new Map(
        rawRecommendations
          .filter((item): item is RecommendationPick => {
            return (
              typeof item === 'object' &&
              item !== null &&
              typeof (item as { slug?: unknown }).slug === 'string' &&
              typeof (item as { reasonAr?: unknown }).reasonAr === 'string'
            );
          })
          .filter((item) => visibleProducts.some((product) => product.slug === item.slug))
          .map((item) => [item.slug, { slug: item.slug, reasonAr: item.reasonAr.trim() || 'اختيار مناسب لذوقك الحالي.' }])
      ).values()
    ).slice(0, 3);
    const padded: RecommendationPick[] = [...validAiPicks];
    for (const pick of fallbackPicks) {
      if (padded.length >= 3) break;
      if (!padded.some((p) => p.slug === pick.slug)) padded.push(pick);
    }
    const names = padded.map((pick) => visibleProducts.find((p) => p.slug === pick.slug)?.titleAr).filter(Boolean).join('\n- ');
    return NextResponse.json(formatProducts(padded, 'ai', (typeof parsedObj.headlineAr === 'string' ? parsedObj.headlineAr : '') || 'اختيارات مناسبة لمودك', (typeof parsedObj.summaryAr === 'string' ? parsedObj.summaryAr : '') || 'اختيارات من منتجات حبّة حسب إجاباتك.', (typeof parsedObj.whatsappMessageAr === 'string' ? parsedObj.whatsappMessageAr : '') || `أهلًا، حابة أسأل عن الترشيحات دي:\n- ${names}\nهل متاحين؟ والتفاصيل إيه؟`));
  } catch {
    const names = fallbackPicks.map((pick) => visibleProducts.find((p) => p.slug === pick.slug)?.titleAr).filter(Boolean).join('\n- ');
    return NextResponse.json(formatProducts(fallbackPicks, 'fallback', 'اختيارات قريبة من مودك', 'دي قطع من الكتالوج مناسبة لاختياراتك.', `أهلًا، حابة أسأل عن الترشيحات دي:\n- ${names}\nهل متاحين؟ والتفاصيل إيه؟`));
  }
}
