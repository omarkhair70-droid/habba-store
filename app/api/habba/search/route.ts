import { NextRequest, NextResponse } from 'next/server';
import { visibleProducts } from '@/content/habba-products';
import { scoreProductsForIntent } from '@/lib/habba-ai/scoring';
import { callHabbaOpenAIJson } from '@/lib/habba-ai/openai';
import { fillWithFallback, mapPicksToProducts, validateVisibleSlugs } from '@/lib/habba-ai/validation';

const WINDOW_MS = 10 * 60 * 1000; const LIMIT = 15; const ipHits = new Map<string, number[]>();
const checkLimit = (ip: string) => { const now = Date.now(); const recent = (ipHits.get(ip) || []).filter((t) => now - t <= WINDOW_MS); if (recent.length >= LIMIT) return false; recent.push(now); ipHits.set(ip, recent); return true; };

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkLimit(ip)) return NextResponse.json({ error: 'طلبات كتير في وقت قصير، جربي بعد شوية.' }, { status: 429 });
  const body = await req.json().catch(() => null) as { query?: unknown } | null;
  const query = typeof body?.query === 'string' ? body.query.trim() : '';
  if (!query || query.length < 3 || query.length > 160) return NextResponse.json({ error: 'صيغة البحث غير صحيحة.' }, { status: 400 });

  const fallbackScored = scoreProductsForIntent({ mode: 'search', query, desiredCount: 8 }).slice(0, 8);
  const fallbackPicks = fallbackScored.map((x) => ({ slug: x.slug, reasonAr: x.reasonAr }));

  const ai = await callHabbaOpenAIJson<{ headlineAr?: string; summaryAr?: string; matchedSlugs?: string[]; interpretedMoodAr?: string; suggestedFilterKey?: string | null }>({
    system: 'You are Habba Search. Return strict JSON only with matchedSlugs up to 8.',
    user: { query, catalog: visibleProducts.map(({ slug, titleAr, titleEn, categoryAr, collectionAr, descriptionAr, tags }) => ({ slug, titleAr, titleEn, categoryAr, collectionAr, descriptionAr, tags })) },
    maxTokens: 350
  });

  const aiPicks = ai.ok ? validateVisibleSlugs(ai.data.matchedSlugs || []).map((slug) => ({ slug, reasonAr: fallbackPicks.find((x) => x.slug === slug)?.reasonAr || 'مناسبة لوصفك.' })) : [];
  const picks = fillWithFallback(aiPicks, fallbackPicks, 8);
  const products = mapPicksToProducts(picks).map((p) => ({ slug: p.slug, titleAr: p.titleAr, titleEn: p.titleEn, image: p.image, categoryAr: p.categoryAr, collectionAr: p.collectionAr, reasonAr: p.reasonAr }));

  return NextResponse.json({ headlineAr: ai.ok && ai.data.headlineAr ? ai.data.headlineAr : 'اختيارات قريبة من اللي بتدوري عليه', summaryAr: ai.ok && ai.data.summaryAr ? ai.data.summaryAr : 'رشّحنا منتجات من الكتالوج المتاح بناءً على وصفك.', products, interpretedMoodAr: ai.ok && ai.data.interpretedMoodAr ? ai.data.interpretedMoodAr : 'مودك هادي/كيوت حسب الوصف.', suggestedFilterKey: ai.ok ? ai.data.suggestedFilterKey || null : null, source: ai.ok ? 'ai' : ai.error === 'local_mode' ? 'local' : 'fallback', debug: { interpretedMoodAr: ai.ok ? ai.data.interpretedMoodAr || null : null, suggestedFilterKey: ai.ok ? ai.data.suggestedFilterKey || null : null } });
}
