import { NextRequest, NextResponse } from 'next/server';
import { scoreProductsForIntent } from '@/lib/habba-ai/scoring';
import { callHabbaOpenAIJson } from '@/lib/habba-ai/openai';
import { fillWithFallback, mapPicksToProducts, validateVisibleSlugs } from '@/lib/habba-ai/validation';
import { getHabbaCatalogProfiles } from '@/lib/habba-ai/catalog';

const WINDOW_MS=600000,LIMIT=10,ipHits=new Map<string,number[]>();
const sets={bundleIntent:new Set(['gift','everyday','colorful','calm','green','cute']),productCount:new Set([2,3]),includeType:new Set(['any','bracelet-necklace','bracelets','set-plus'])};
const checkLimit=(ip:string)=>{const now=Date.now();const recent=(ipHits.get(ip)||[]).filter((t)=>now-t<=WINDOW_MS);if(recent.length>=LIMIT)return false;recent.push(now);ipHits.set(ip,recent);return true;};

export async function POST(req:NextRequest){const ip=req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';if(!checkLimit(ip))return NextResponse.json({error:'طلبات كتير في وقت قصير، جربي بعد شوية.'},{status:429});
const body=await req.json().catch(()=>null) as any;const optionalNote=(body?.optionalNote||'').trim();if(!body||!sets.bundleIntent.has(body.bundleIntent)||!sets.productCount.has(body.productCount)||!sets.includeType.has(body.includeType)||optionalNote.length>120)return NextResponse.json({error:'البيانات غير صحيحة.'},{status:400});
const count=body.productCount as 2|3; const intent={mode:'bundle' as const,bundleIntent:body.bundleIntent,focusType:body.includeType,optionalNote,desiredCount:count};
let fallback=scoreProductsForIntent(intent).slice(0,8).map((x)=>({slug:x.slug,reasonAr:x.reasonAr}));
const profiles=getHabbaCatalogProfiles();
if(body.includeType==='bracelet-necklace'){const br=fallback.find((x)=>profiles.find((p)=>p.slug===x.slug)?.productType==='bracelet');const ne=fallback.find((x)=>profiles.find((p)=>p.slug===x.slug)?.productType==='necklace');if(br&&ne) fallback=[br,ne,...fallback.filter((x)=>x.slug!==br.slug&&x.slug!==ne.slug)];}
if(body.includeType==='bracelets'){fallback=fallback.filter((x)=>profiles.find((p)=>p.slug===x.slug)?.productType==='bracelet').concat(fallback);}
if(body.includeType==='set-plus'){const st=fallback.find((x)=>profiles.find((p)=>p.slug===x.slug)?.productType==='set'); if(st) fallback=[st,...fallback.filter((x)=>x.slug!==st.slug)];}
const fallbackPicks=fallback.slice(0,count);
const ai=await callHabbaOpenAIJson<{bundleNameAr?:string;summaryAr?:string;items?:Array<{slug:string;reasonAr:string}>;whatsappMessageAr?:string}>({system:`You are Habba Bundle Builder. Return exactly ${count} items.`,user:{input:intent},maxTokens:350});
const aiPicks=ai.ok&&Array.isArray(ai.data.items)?ai.data.items.filter((x)=>x&&typeof x.slug==='string'&&typeof x.reasonAr==='string'&&validateVisibleSlugs([x.slug]).length):[];
const picks=fillWithFallback(aiPicks,fallbackPicks,count);
const products=mapPicksToProducts(picks).map((p)=>({slug:p.slug,titleAr:p.titleAr,titleEn:p.titleEn,image:p.image,categoryAr:p.categoryAr,collectionAr:p.collectionAr,reasonAr:p.reasonAr||'قطعة مناسبة للباندل.'}));
return NextResponse.json({bundleNameAr:ai.ok&&ai.data.bundleNameAr?ai.data.bundleNameAr:'باندل حبّة جاهز',summaryAr:ai.ok&&ai.data.summaryAr?ai.data.summaryAr:'اختيارات مناسبة لبعض حسب مودك.',products,whatsappMessageAr:ai.ok&&ai.data.whatsappMessageAr?ai.data.whatsappMessageAr:`أهلًا، حابة أسأل عن الباندل ده:
${products.map((p)=>`- ${p.titleAr}`).join('
')}
هل متاحين؟ والتفاصيل إيه؟`,source:ai.ok?'ai':'fallback'});
}
