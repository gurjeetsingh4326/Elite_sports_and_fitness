import { Link } from 'react-router-dom'
import { Tile } from '@/components/ui/Tile'
import { CategoryBadge } from '@/components/ui/Badge'
import type { CoachSummary } from '@/types/coach'

export function CoachCard({ coach }: { coach: CoachSummary }) {
  return (
    <Link to={`/coaches/${coach.id}`}>
      <Tile className="flex h-full flex-col gap-4 bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_-8px_oklch(50%_0.05_40_/_15%)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-brand-amber">
              {coach.initials}
            </div>
            <div>
              <div className="text-sm font-bold text-navy">{coach.name}</div>
              <div className="text-xs font-semibold text-muted">
                {coach.isIndependent ? 'Independent coach' : coach.academyName}
              </div>
            </div>
          </div>
          <CategoryBadge category={coach.specialty} />
        </div>
        <p className="text-[13px] leading-relaxed text-muted">{coach.bio}</p>
      </Tile>
    </Link>
  )
}
