export type HabbaFilterKey =
  | 'all'
  | 'bracelets'
  | 'necklaces'
  | 'sets'
  | 'cute-gift'
  | 'green-mood'
  | 'colorful-star'
  | 'soft-colors'
  | 'calm-basics'
  | 'natural';

export const habbaFilterChips: { key: HabbaFilterKey; label: string }[] = [
  { key: 'all', label: 'الكل' },
  { key: 'bracelets', label: 'أساور' },
  { key: 'necklaces', label: 'عقود' },
  { key: 'sets', label: 'أطقم' },
  { key: 'cute-gift', label: 'هدايا صغيرة' },
  { key: 'green-mood', label: 'جرين مود' },
  { key: 'colorful-star', label: 'كولرفل ستار' },
  { key: 'soft-colors', label: 'ألوان ناعمة' },
  { key: 'calm-basics', label: 'أساسيات هادية' },
  { key: 'natural', label: 'ناتشورال' }
];

export const habbaValidFilters: HabbaFilterKey[] = [
  'all',
  'bracelets',
  'necklaces',
  'sets',
  'cute-gift',
  'green-mood',
  'colorful-star',
  'soft-colors',
  'calm-basics',
  'natural'
];

export function getHabbaFilterFromQuery(value: string | null): HabbaFilterKey {
  if (!value) return 'all';
  return habbaValidFilters.includes(value as HabbaFilterKey) ? (value as HabbaFilterKey) : 'all';
}
