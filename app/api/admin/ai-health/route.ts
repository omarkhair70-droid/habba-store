import { NextRequest, NextResponse } from 'next/server';
import { getHabbaAiMode } from '@/lib/habba-ai/config';

type OpenAIErrorShape = {
  error?: { type?: string; code?: string; message?: string };
  output_text?: string;
  output?: Array<{ content?: Array<{ text?: string }> }>;
};

function extractOutputText(raw: OpenAIErrorShape): string {
  return raw?.output_text || raw?.output?.[0]?.content?.map((c) => c?.text || '').join('') || '';
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as { adminToken?: string } | null;
  if (!body?.adminToken || body.adminToken !== process.env.HABBA_ADMIN_TOKEN) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const mode = getHabbaAiMode();
  const key = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  if (mode === 'local') {
    return NextResponse.json({
      mode,
      openaiConfigured: Boolean(key),
      openaiWillBeCalled: false,
      message: 'Habba is running in free local AI mode.'
    });
  }

  if (!key) {
    return NextResponse.json({
      mode,
      openaiConfigured: false,
      openaiWillBeCalled: true,
      openaiReachable: false,
      model,
      testResponseOk: false,
      status: null,
      statusText: null,
      errorType: null,
      errorCode: null,
      safeErrorMessage: 'OPENAI_API_KEY is missing.',
      message: 'OPENAI_API_KEY is missing.'
    });
  }

  try {
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, input: 'Return exactly this JSON: {"ok":true,"service":"habba-ai"}', max_output_tokens: 50 })
    });

    const raw = (await res.json().catch(() => ({}))) as OpenAIErrorShape;
    const outputText = extractOutputText(raw);
    const testResponseOk = outputText.includes('"ok":true') && outputText.includes('"service":"habba-ai"');

    return NextResponse.json({
      mode,
      openaiConfigured: true,
      openaiWillBeCalled: true,
      openaiReachable: res.ok,
      model,
      testResponseOk,
      status: res.status,
      statusText: res.statusText || null,
      errorType: raw?.error?.type || null,
      errorCode: raw?.error?.code || null,
      safeErrorMessage: raw?.error?.message || null,
      message: res.ok ? 'OpenAI check completed.' : 'OpenAI is not reachable right now.'
    });
  } catch {
    return NextResponse.json({
      mode,
      openaiConfigured: true,
      openaiWillBeCalled: true,
      openaiReachable: false,
      model,
      testResponseOk: false,
      status: null,
      statusText: null,
      errorType: 'network_or_fetch_error',
      errorCode: null,
      safeErrorMessage: 'Fetch to OpenAI failed.',
      message: 'OpenAI request failed before receiving a response.'
    });
  }
}
