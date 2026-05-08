export type HabbaAiMode = 'local' | 'openai';

export function getHabbaAiMode(): HabbaAiMode {
  return process.env.HABBA_AI_MODE === 'openai' ? 'openai' : 'local';
}

export function isLocalHabbaAiMode(): boolean {
  return getHabbaAiMode() === 'local';
}
