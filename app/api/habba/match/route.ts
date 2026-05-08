import { NextRequest, NextResponse } from 'next/server';
import { scoreProductsForIntent } from '@/lib/habba-ai/scoring';
import { callHabbaOpenAIJson } from '@/lib/habba-ai/openai';
import { fillWithFallback, mapPicksToProducts, validateVisibleSlugs } from '@/lib/habba-ai/validation';

const WINDOW_MS=600000, LIMIT=10, ipHits=new Map<string,number[]>();
const sets={shoppingFor:new Set(['for-me','gift']),productType:new Set(['any','bracelet','necklace','set']),mood:new Set(['calm','colorful','cute','daily','natural']),colorPreference:new Set(['surprise','green','pink','blue','red','neutral'])};
const checkLimit=(ip:string)=>{const now=Date.now();const recent=(ipHits.get(ip)||[]).filter((t)=>now-t<=WINDOW_MS);if(recent.length>=LIMIT)return false;recent.push(now);ipHits.set(ip,recent);return true;};

export async function POST(req:NextRequest){const ip=req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';if(!checkLimit(ip))return NextResponse.json({error:'طلبات كتير في وقت قصير، جربي بعد شوية.'},{status:429});
const body=await req.json().catch(()=>null) as any;const optionalNote=(body?.optionalNote||'').trim();if(!body||!sets.shoppingFor.has(body.shoppingFor)||!sets.productType.has(body.productType)||!sets.mood.has(body.mood)||!sets.colorPreference.has(body.colorPreference)||optionalNote.length>120)return NextResponse.json({error:'البيانات غير صحيحة.'},{status:400});
const intent={mode:'match' as const,shoppingFor:body.shoppingFor,productType:body.productType,mood:body.mood,colorPreference:body.colorPreference,optionalNote,desiredCount:3};
const fallback=scoreProductsForIntent(intent).slice(0,3).map((x)=>({slug:x.slug,reasonAr: body.shoppingFor==='gift' ? `${x.reasonAr} ومناسبة كهدية.`:x.reasonAr}));
const ai=await callHabbaOpenAIJson<{headlineAr?:string;summaryAr?:string;recommendations?:Array<{slug:string;reasonAr:string}>;whatsappMessageAr?:string}>({system:'You are Habba Match. Return exactly 3 recommendations.',user:{input:intent},maxTokens:400});
const aiPicks=ai.ok&&Array.isArray(ai.data.recommendations)?ai.data.recommendations.filter((x)=>x&&typeof x.slug==='string'&&typeof x.reasonAr==='string'&&validateVisibleSlugs([x.slug]).length):[];
const picks=fillWithFallback(aiPicks,fallback,3);
const products=mapPicksToProducts(picks).map((p)=>({slug:p.slug,titleAr:p.titleAr,titleEn:p.titleEn,image:p.image,categoryAr:p.categoryAr,collectionAr:p.collectionAr,reasonAr:p.reasonAr||'مناسبة لاختيارك.'}));
const names=products.map((p)=>p.titleAr).join('
- ');
return NextResponse.json({headlineAr:ai.ok&&ai.data.headlineAr?ai.data.headlineAr:'اختيارات مناسبة لمودك',summaryAr:ai.ok&&ai.data.summaryAr?ai.data.summaryAr:'اختيارات من منتجات حبّة حسب إجاباتك.',products,whatsappMessageAr:ai.ok&&ai.data.whatsappMessageAr?ai.data.whatsappMessageAr:`أهلًا، حابة أسأل عن الترشيحات دي:
- ${names}
هل متاحين؟ والتفاصيل إيه؟`,source:ai.ok?'ai':'fallback'});
}
