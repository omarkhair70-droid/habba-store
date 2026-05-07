export type HabbaFilterKey = 'all' | 'bracelets' | 'necklaces' | 'sets' | 'cute-gift' | 'green-mood';

export const habbaFilterChips: { key: HabbaFilterKey; label: string }[] = [
  { key: 'all', label: 'الكل' },
  { key: 'bracelets', label: 'أساور' },
  { key: 'necklaces', label: 'عقود' },
  { key: 'sets', label: 'أطقم' },
  { key: 'cute-gift', label: 'هدايا صغيرة' },
  { key: 'green-mood', label: 'جرين مود' }
];

export const habbaValidFilters: HabbaFilterKey[] = ['all', 'bracelets', 'necklaces', 'sets', 'cute-gift', 'green-mood'];

export function getHabbaFilterFromQuery(value: string | null): HabbaFilterKey {
  if (!value) return 'all';
  return habbaValidFilters.includes(value as HabbaFilterKey) ? (value as HabbaFilterKey) : 'all';
}
