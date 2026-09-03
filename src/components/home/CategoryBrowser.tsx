import { Link } from 'react-router-dom'
import { Tile } from '@/components/ui/Tile'
import { useAllAcademies } from '@/lib/orgScope'
import { CATEGORY_META, CATEGORY_BG_CLASSES } from '@/data/categoryMeta'
import type { AcademyCategory } from '@/types/dashboard'

const FEATURED_CATEGORIES: AcademyCategory[] = ['Football', 'Cricket', 'Multi-Sport', 'Swimming']

export function CategoryBrowser() {
  const academyRows = useAllAcademies()

  return (
    <section id="programs" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-navy">Browse by sport</h2>
          <p className="mt-1.5 text-sm text-muted">
            Every academy carries one or more categories, so you can go straight to the sport you're after.
          </p>
        </div>
        <Link to="/programs" className="text-sm font-semibold text-navy underline underline-offset-4">
          View all programs
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {FEATURED_CATEGORIES.map((category, i) => {
          const { Icon } = CATEGORY_META[category]
          const matching = academyRows.filter((r) => r.categories.includes(category))
          const totalAthletes = matching.reduce((sum, r) => sum + r.athletes, 0)
          return (
            <Tile
              key={category}
              className={`animate-fade-in flex cursor-default flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_oklch(30%_0.05_260_/_25%)] ${CATEGORY_BG_CLASSES[category]}`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <Icon size={24} />
              <div>
                <div className="mt-6 text-base font-bold">{category}</div>
                {totalAthletes > 0 && (
                  <div className="mt-1 text-xs font-semibold opacity-80">{totalAthletes} athletes enrolled</div>
                )}
              </div>
            </Tile>
          )
        })}
      </div>
    </section>
  )
}
