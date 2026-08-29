import type { AcademyCategory } from '@/types/dashboard'

const CATEGORY_CLASSES: Record<AcademyCategory, string> = {
  Football: 'text-category-football-fg bg-category-football-bg',
  Cricket: 'text-category-cricket-fg bg-category-cricket-bg',
  'Multi-Sport': 'text-category-multi-sport-fg bg-category-multi-sport-bg',
  Swimming: 'text-category-swimming-fg bg-category-swimming-bg',
}

export function CategoryBadge({ category }: { category: AcademyCategory }) {
  return (
    <span
      className={`w-fit rounded-full px-2.5 py-0.5 text-[11px] font-bold ${CATEGORY_CLASSES[category]}`}
    >
      {category}
    </span>
  )
}
