import { Tile } from '@/components/ui/Tile'
import type { CoachSummary } from '@/types/coach'

export function CoachMiniCard({ coach }: { coach: CoachSummary }) {
  return (
    <Tile className="flex items-center gap-3.5 bg-white p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-brand-amber">
        {coach.initials}
      </div>
      <div className="min-w-0">
        <div className="text-sm font-bold text-navy">{coach.name}</div>
        <div className="truncate text-xs text-muted">
          {coach.isIndependent ? 'Independent coach' : coach.academyName}
        </div>
      </div>
    </Tile>
  )
}
