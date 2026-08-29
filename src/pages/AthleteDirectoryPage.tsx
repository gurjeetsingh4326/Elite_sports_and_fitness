import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { CategoryFilterBar } from '@/components/programs/CategoryFilterBar'
import { athletesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'
import type { AcademyCategory } from '@/types/dashboard'

export default function AthleteDirectoryPage() {
  const { currentOrg } = useOrg()
  const [category, setCategory] = useState<AcademyCategory | 'All'>('All')
  const athletes = athletesForOrg(currentOrg.id)
  const visible = category === 'All' ? athletes : athletes.filter((a) => a.category === category)

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-bold text-navy">Athletes</h1>
          <p className="mt-1 text-sm text-muted">{visible.length} of {athletes.length} athletes</p>
        </div>

        <CategoryFilterBar active={category} onChange={setCategory} />

        <Tile className="bg-white p-2">
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[2fr_1.4fr_1.6fr_1.4fr_0.8fr] gap-3 px-4 py-3 text-[10.5px] font-bold uppercase tracking-wide text-muted">
                <span>Athlete</span>
                <span>Academy</span>
                <span>Batch</span>
                <span>Practice Level</span>
                <span>Attend.</span>
              </div>
              <div className="flex flex-col">
                {visible.map((athlete) => (
                  <Link
                    key={athlete.id}
                    to={`/dashboard/athletes/${athlete.id}`}
                    className="grid grid-cols-[2fr_1.4fr_1.6fr_1.4fr_0.8fr] items-center gap-3 rounded-xl px-4 py-3 hover:bg-hover"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-brand-amber">
                        {athlete.initials}
                      </div>
                      <span className="text-sm font-semibold text-navy">{athlete.name}</span>
                    </div>
                    <span className="truncate text-xs text-muted">{athlete.academyName}</span>
                    <span className="truncate text-xs text-muted">{athlete.batch}</span>
                    <span className="text-xs font-semibold text-navy">{athlete.practiceLevel}</span>
                    <span
                      className={`text-xs font-bold ${
                        athlete.attendancePct >= 90 ? 'text-[oklch(45%_0.13_145)]' : 'text-[oklch(58%_0.14_70)]'
                      }`}
                    >
                      {athlete.attendancePct}%
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {visible.length === 0 && <p className="py-10 text-center text-sm text-muted">No athletes in this category yet.</p>}
        </Tile>
      </div>
    </AppShell>
  )
}
