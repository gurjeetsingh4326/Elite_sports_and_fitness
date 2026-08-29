import type { AcademyCategory } from '@/types/dashboard'
import { clsx } from '@/lib/clsx'

const CATEGORIES: AcademyCategory[] = ['Football', 'Cricket', 'Multi-Sport', 'Swimming']

interface CategoryFilterBarProps {
  active: AcademyCategory | 'All'
  onChange: (category: AcademyCategory | 'All') => void
}

export function CategoryFilterBar({ active, onChange }: CategoryFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {(['All', ...CATEGORIES] as const).map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={clsx(
            'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
            active === category ? 'bg-navy text-white' : 'bg-surface text-muted hover:bg-hover',
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
