import { CATEGORY_META, ACADEMY_CATEGORIES } from '@/data/categoryMeta'
import type { AcademyCategory } from '@/types/dashboard'
import { clsx } from '@/lib/clsx'

interface CategoryMultiSelectProps {
  selected: AcademyCategory[]
  onChange: (categories: AcademyCategory[]) => void
  label?: string
}

export function CategoryMultiSelect({ selected, onChange, label = 'Categories' }: CategoryMultiSelectProps) {
  function toggle(category: AcademyCategory) {
    if (selected.includes(category)) {
      onChange(selected.filter((c) => c !== category))
    } else {
      onChange([...selected, category])
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-navy">{label}</span>
      <div className="flex flex-wrap gap-2">
        {ACADEMY_CATEGORIES.map((category) => {
          const { Icon } = CATEGORY_META[category]
          const active = selected.includes(category)
          return (
            <button
              key={category}
              type="button"
              onClick={() => toggle(category)}
              aria-pressed={active}
              className={clsx(
                'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-150 hover:scale-105',
                active
                  ? 'border-navy bg-navy text-white'
                  : 'border-[oklch(90%_0.005_90)] bg-white text-muted hover:bg-hover',
              )}
            >
              <Icon size={14} />
              {category}
            </button>
          )
        })}
      </div>
      {selected.length === 0 && <p className="text-[11px] text-muted">Select at least one category.</p>}
    </div>
  )
}
