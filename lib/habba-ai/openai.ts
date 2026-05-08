export const HABBA_AI_BRAND_RULES = [
  'Arabic-first tone.',
  'Habba is handmade bead accessories: soft, colorful, honest, giftable.',
  'Playful but polished copy.',
  'No fake luxury claims.',
  'No gold/crystal/diamonds/healing/energy/gemstones language.',
  'No invented products or slugs.',
  'No prices.',
  'No materials not in catalog.',
  'Use only visible product slugs.',
  'Keep Arabic short and natural.'
].join(' ');

export async function callHabbaOpenAIJson<T>(input: { system: string; user: unknown; maxTokens?: number }): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { ok: false, error: 'missing_openai_key' };
  try {
    const res = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        input: [
          { role: 'system', content: `${HABBA_AI_BRAND_RULES} ${input.system}` },
          { role: 'user', content: JSON.stringify(input.user) }
        ],
        max_output_tokens: input.maxTokens ?? 500
      })
    });
    if (!res.ok) return { ok: false, error: `openai_http_${res.status}` };
    const raw = await res.json();
    const text = raw?.output_text || raw?.output?.[0]?.content?.map((c: { text?: string }) => c.text || '').join('') || '';
    if (!text.trim()) return { ok: false, error: 'openai_empty_output' };
    const data = JSON.parse(text) as T;
    return { ok: true, data };
  } catch (error) {
    if (error instanceof SyntaxError) return { ok: false, error: 'openai_invalid_json' };
    return { ok: false, error: 'openai_failed' };
  }
}
