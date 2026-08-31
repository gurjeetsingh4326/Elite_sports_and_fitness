import type { AcademyCategory } from '@/types/dashboard'
import { CATEGORY_META, ACADEMY_CATEGORIES } from '@/data/categoryMeta'
import { clsx } from '@/lib/clsx'

interface CategoryFilterBarProps {
  active: AcademyCategory | 'All'
  onChange: (category: AcademyCategory | 'All') => void
}

export function CategoryFilterBar({ active, onChange }: CategoryFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      <button
        type="button"
        onClick={() => onChange('All')}
        className={clsx(
          'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
          active === 'All' ? 'bg-navy text-white' : 'bg-surface text-muted hover:bg-hover',
        )}
      >
        All
      </button>
      {ACADEMY_CATEGORIES.map((category) => {
        const { Icon } = CATEGORY_META[category]
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={clsx(
              'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
              active === category ? 'bg-navy text-white' : 'bg-surface text-muted hover:bg-hover',
            )}
          >
            <Icon size={14} />
            {category}
          </button>
        )
      })}
    </div>
  )
}
