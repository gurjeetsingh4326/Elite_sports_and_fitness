import { Link } from 'react-router-dom'
import { Tile } from '@/components/ui/Tile'
import { CategoryBadge } from '@/components/ui/Badge'
import type { ProgramSummary } from '@/data/mockPrograms'

export function ProgramCard({ program }: { program: ProgramSummary }) {
  return (
    <Link to={`/programs/${program.id}`}>
      <Tile className="flex h-full flex-col gap-4 bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_-8px_oklch(50%_0.05_40_/_15%)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-bold text-navy">{program.programName}</div>
            <div className="mt-1 text-xs font-semibold text-muted">
              {program.academyName} — {program.branch}
            </div>
          </div>
          <CategoryBadge category={program.category} />
        </div>
        <p className="text-[13px] leading-relaxed text-muted">{program.description}</p>
        <div className="mt-auto flex items-center justify-between border-t border-[oklch(93%_0.005_90)] pt-4 text-xs font-semibold text-muted">
          <span>{program.levels}</span>
          <span>{program.batches} batches</span>
        </div>
      </Tile>
    </Link>
  )
}
