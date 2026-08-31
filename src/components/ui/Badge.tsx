import { CATEGORY_META, CATEGORY_BG_CLASSES } from '@/data/categoryMeta'
import type { AcademyCategory } from '@/types/dashboard'

export function CategoryBadge({ category }: { category: AcademyCategory }) {
  const { Icon } = CATEGORY_META[category]
  return (
    <span
      className={`flex w-fit items-center gap-1.5 rounded-full py-0.5 pl-2 pr-2.5 text-[11px] font-bold ${CATEGORY_BG_CLASSES[category]}`}
    >
      <Icon size={13} />
      {category}
    </span>
  )
}

export function CategoryBadgeList({ categories, max = 3 }: { categories: AcademyCategory[]; max?: number }) {
  const visible = categories.slice(0, max)
  const overflow = categories.length - visible.length

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {visible.map((category) => (
        <CategoryBadge key={category} category={category} />
      ))}
      {overflow > 0 && (
        <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-bold text-muted">+{overflow}</span>
      )}
    </div>
  )
}
