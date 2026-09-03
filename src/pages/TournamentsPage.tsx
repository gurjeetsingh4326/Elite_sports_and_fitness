import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { CategoryBadge } from '@/components/ui/Badge'
import { CategoryFilterBar } from '@/components/programs/CategoryFilterBar'
import { TrophyIcon } from '@/components/icons'
import { clsx } from '@/lib/clsx'
import { tournaments } from '@/data/mockTournaments'
import type { AcademyCategory } from '@/types/dashboard'

export default function TournamentsPage() {
  const [category, setCategory] = useState<AcademyCategory | 'All'>('All')
  const visible = category === 'All' ? tournaments : tournaments.filter((t) => t.category === category)

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-xl font-bold text-navy">Tournaments</h1>
          <p className="mt-1 text-sm text-muted">{visible.length} tournaments across the organization</p>
        </div>

        <CategoryFilterBar active={category} onChange={setCategory} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visible.map((t, i) => (
            <Tile
              key={t.id}
              className="flex animate-fade-in flex-col gap-4 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_oklch(50%_0.05_40_/_20%)]"
              style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-bold text-navy">{t.name}</div>
                  <div className="mt-1 text-xs font-semibold text-muted">
                    {t.date} · {t.location}
                  </div>
                </div>
                <CategoryBadge category={t.category} />
              </div>
              <div className="flex items-center justify-between border-t border-[oklch(93%_0.005_90)] pt-4">
                <span
                  className={clsx(
                    'w-fit rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                    t.status === 'Completed'
                      ? 'bg-surface text-muted'
                      : 'bg-[oklch(90%_0.06_145)] text-[oklch(38%_0.1_145)]',
                  )}
                >
                  {t.status === 'Upcoming' ? 'Registration open' : 'Completed'}
                </span>
                <span className="text-xs font-semibold text-muted">{t.participants} participants</span>
              </div>
              {t.winner && (
                <div className="flex items-center gap-2 rounded-xl bg-brand-amber-tile px-3 py-2 transition-transform duration-200 hover:scale-[1.02]">
                  <TrophyIcon size={16} className="text-brand-amber-ink" />
                  <span className="text-xs font-bold text-brand-amber-ink">{t.winner}</span>
                </div>
              )}
            </Tile>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
