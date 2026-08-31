import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { CategoryFilterBar } from '@/components/programs/CategoryFilterBar'
import { PRACTICE_LEVELS } from '@/types/athlete'
import type { AcademyCategory } from '@/types/dashboard'
import { useAthletesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'

export default function PracticeLevelsPage() {
  const { currentOrg } = useOrg()
  const athletes = useAthletesForOrg(currentOrg.id)
  const [category, setCategory] = useState<AcademyCategory | 'All'>('All')
  const visible = category === 'All' ? athletes : athletes.filter((a) => a.category === category)

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-bold text-navy">Practice Levels</h1>
          <p className="mt-1 text-sm text-muted">
            Level 1 Beginner through Level 5 Elite — each sport defines its own promotion criteria.
          </p>
        </div>

        <CategoryFilterBar active={category} onChange={setCategory} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {PRACTICE_LEVELS.map((level) => {
            const [num, name] = level.split(' · ')
            const inLevel = visible.filter((a) => a.practiceLevel === level)
            return (
              <div key={level} className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between px-1">
                  <div>
                    <div className="text-xs font-bold text-navy">{num}</div>
                    <div className="text-[11px] font-semibold text-muted">{name}</div>
                  </div>
                  <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-bold text-muted">
                    {inLevel.length}
                  </span>
                </div>
                <div className="flex min-h-[80px] flex-col gap-2">
                  {inLevel.map((athlete) => (
                    <Link key={athlete.id} to={`/dashboard/athletes/${athlete.id}`}>
                      <Tile className="flex items-center gap-2.5 bg-white p-3 hover:shadow-[0_8px_24px_-8px_oklch(50%_0.05_40_/_15%)]">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-[10.5px] font-bold text-brand-amber">
                          {athlete.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-xs font-bold text-navy">{athlete.name}</div>
                          <div className="truncate text-[10.5px] text-muted">{athlete.academyName}</div>
                        </div>
                      </Tile>
                    </Link>
                  ))}
                  {inLevel.length === 0 && (
                    <div className="flex min-h-[80px] items-center justify-center rounded-tile border border-dashed border-[oklch(90%_0.005_90)] text-[11px] text-muted">
                      No athletes
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
