import { NextRequest, NextResponse } from 'next/server';
import { scoreProductsForIntent } from '@/lib/habba-ai/scoring';
import { callHabbaOpenAIJson } from '@/lib/habba-ai/openai';
import { fillWithFallback, mapPicksToProducts, validateVisibleSlugs } from '@/lib/habba-ai/validation';

type DropInput={dropMood:'soft-gift'|'green-calm'|'colorful-day'|'cute-pieces'|'everyday-calm'|'natural-simple';dropSize:4|5|6;focusType:'mixed'|'bracelets'|'necklaces'|'giftable';colorDirection:'surprise'|'green'|'pink'|'blue'|'colorful'|'neutral';optionalNote?:string};
const WINDOW_MS=600000,LIMIT=8,ipHits=new Map<string,number[]>();
const sets={dropMood:new Set(['soft-gift','green-calm','colorful-day','cute-pieces','everyday-calm','natural-simple']),dropSize:new Set([4,5,6]),focusType:new Set(['mixed','bracelets','necklaces','giftable']),colorDirection:new Set(['surprise','green','pink','blue','colorful','neutral'])};
const checkLimit=(ip:string)=>{const now=Date.now();const recent=(ipHits.get(ip)||[]).filter((t)=>now-t<=WINDOW_MS);if(recent.length>=LIMIT)return false;recent.push(now);ipHits.set(ip,recent);return true;};

export async function POST(req:NextRequest){const ip=req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';if(!checkLimit(ip))return NextResponse.json({error:'طلبات كتير في وقت قصير، جربي بعد شوية.'},{status:429});
const body=await req.json().catch(()=>null) as Partial<DropInput>|null;const optionalNote=(body?.optionalNote||'').trim();if(!body||!sets.dropMood.has(body.dropMood as string)||!sets.dropSize.has(body.dropSize as number)||!sets.focusType.has(body.focusType as string)||!sets.colorDirection.has(body.colorDirection as string)||optionalNote.length>120)return NextResponse.json({error:'البيانات غير صحيحة.'},{status:400});
const input={mode:'drop' as const,dropMood:body.dropMood,focusType:body.focusType,colorDirection:body.colorDirection,optionalNote,desiredCount:body.dropSize as number};
const fb=scoreProductsForIntent(input).slice(0,input.desiredCount).map((x)=>({slug:x.slug,reasonAr:x.reasonAr}));
const ai=await callHabbaOpenAIJson<{dropNameAr?:string;dropSubtitleAr?:string;dropStoryAr?:string;heroSlug?:string;items?:Array<{slug:string;reasonAr:string}>;instagramCaptionAr?:string;whatsappMessageAr?:string}>({system:`You are Habba Drop curator. Return exactly ${input.desiredCount} items and one heroSlug.`,user:{input},maxTokens:650});
const aiPicks=ai.ok&&Array.isArray(ai.data.items)?ai.data.items.filter((x)=>x&&typeof x.slug==='string'&&typeof x.reasonAr==='string'&&validateVisibleSlugs([x.slug]).length):[];
const picks=fillWithFallback(aiPicks,fb,input.desiredCount);
const products=mapPicksToProducts(picks).map((p)=>({slug:p.slug,titleAr:p.titleAr,titleEn:p.titleEn,image:p.image,categoryAr:p.categoryAr,collectionAr:p.collectionAr,reasonAr:p.reasonAr||'قطعة مناسبة للـ Drop.'}));
const hero=products.find((p)=>p.slug=== (ai.ok?ai.data.heroSlug:undefined))||products[0];
return NextResponse.json({dropNameAr:ai.ok&&ai.data.dropNameAr?ai.data.dropNameAr:'Drop حبّة ناعم',dropSubtitleAr:ai.ok&&ai.data.dropSubtitleAr?ai.data.dropSubtitleAr:'اختيارات صغيرة على مودك من الكتالوج المتاح.',dropStoryAr:ai.ok&&ai.data.dropStoryAr?ai.data.dropStoryAr:'جمعنالك قطع قريبة من ذوقك في Drop بسيط ينفع هدية أو لنفسك.',heroProduct:hero,products,instagramCaptionAr:ai.ok&&ai.data.instagramCaptionAr?ai.data.instagramCaptionAr:'Drop صغير ومبهج من حبّة ✨',whatsappMessageAr:ai.ok&&ai.data.whatsappMessageAr?ai.data.whatsappMessageAr:`أهلًا، حابة أسأل عن الـ Drop ده:
${products.map((p)=>`- ${p.titleAr}`).join('
')}
هل متاحين؟ والتفاصيل إيه؟`,source:ai.ok?'ai':'fallback'});
}
