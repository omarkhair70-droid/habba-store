'use client';

type Tone = 'coral' | 'lavender' | 'sage' | 'butter';

const tones = {
  coral: { active: '#F56F67', soft: '#F8DDD8', text: '#8F4944' },
  lavender: { active: '#9274B3', soft: '#E9E0F4', text: '#68517E' },
  sage: { active: '#6E927F', soft: '#DDEBE5', text: '#48685A' },
  butter: { active: '#A88636', soft: '#F4E8BF', text: '#755D27' }
} as const;

export function GuidedChoiceGroup<T extends string | number>({
  step,
  label,
  hint,
  items,
  value,
  onChange,
  tone = 'coral'
}: {
  step: string;
  label: string;
  hint?: string;
  items: ReadonlyArray<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
  tone?: Tone;
}) {
  const palette = tones[tone];

  return (
    <section className="border-t border-[#4F3B31]/10 py-6 first:border-t-0 first:pt-0">
      <div className="flex items-start justify-between gap-5">
        <div className="text-right">
          <p className="text-sm font-black text-[#40342F]">{label}</p>
          {hint ? <p className="mt-1 text-xs leading-6 text-[#7B6D67]">{hint}</p> : null}
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white" style={{ backgroundColor: palette.active }}>
          {step}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-start">
        {items.map((item) => {
          const selected = value === item.value;
          return (
            <button
              key={String(item.value)}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(item.value)}
              className="min-h-11 rounded-[1.25rem] border px-4 py-2.5 text-sm font-extrabold transition hover:-translate-y-0.5"
              style={selected
                ? { backgroundColor: palette.active, borderColor: palette.active, color: '#fff' }
                : { backgroundColor: palette.soft, borderColor: 'transparent', color: palette.text }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
