import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as { adminToken?: string } | null;
  if (!body?.adminToken || body.adminToken !== process.env.HABBA_ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const key = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  if (!key) {
    return NextResponse.json({ openaiKeyPresent: false, openaiReachable: false, model: null, testResponseOk: false, message: 'OPENAI_API_KEY is missing.' });
  }

  try {
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, input: 'Return exactly this JSON: {"ok":true,"service":"habba-ai"}', max_output_tokens: 50 })
    });
    const raw = await res.json().catch(() => ({}));
    const outputText = (raw as any)?.output_text || '';
    const testResponseOk = outputText.includes('"ok":true') && outputText.includes('"service":"habba-ai"');
    return NextResponse.json({ openaiKeyPresent: true, openaiReachable: res.ok, model, testResponseOk, message: res.ok ? 'OpenAI check completed.' : 'OpenAI is not reachable right now.' });
  } catch {
    return NextResponse.json({ openaiKeyPresent: true, openaiReachable: false, model, testResponseOk: false, message: 'OpenAI is not reachable right now.' });
  }
}
