import { Tile } from '@/components/ui/Tile'
import { AcademiesIcon, AthletesIcon, AttendanceIcon, ReelsIcon } from '@/components/icons'
import { academyRows } from '@/data/mockDashboard'
import type { AcademyCategory } from '@/types/dashboard'

const CATEGORY_TILES: { category: AcademyCategory; icon: typeof AcademiesIcon; tone: string }[] = [
  { category: 'Football', icon: AcademiesIcon, tone: 'bg-category-football-bg text-category-football-fg' },
  { category: 'Cricket', icon: AthletesIcon, tone: 'bg-category-cricket-bg text-category-cricket-fg' },
  { category: 'Multi-Sport', icon: ReelsIcon, tone: 'bg-category-multi-sport-bg text-category-multi-sport-fg' },
  { category: 'Swimming', icon: AttendanceIcon, tone: 'bg-category-swimming-bg text-category-swimming-fg' },
]

export function CategoryBrowser() {
  return (
    <section id="programs" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy">Browse by sport</h2>
        <p className="mt-1.5 text-sm text-muted">
          Every academy carries a category, so you can go straight to the sport you're after.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {CATEGORY_TILES.map(({ category, icon: Icon, tone }) => {
          const row = academyRows.find((r) => r.category === category)
          return (
            <Tile key={category} className={`flex flex-col justify-between p-6 ${tone}`}>
              <Icon size={24} />
              <div>
                <div className="mt-6 text-base font-bold">{category}</div>
                {row && <div className="mt-1 text-xs font-semibold opacity-80">{row.athletes} athletes enrolled</div>}
              </div>
            </Tile>
          )
        })}
      </div>
    </section>
  )
}
