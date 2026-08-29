import { Tile } from '@/components/ui/Tile'
import { CategoryBadge } from '@/components/ui/Badge'
import type { ProgramSummary } from '@/data/mockPrograms'

export function ProgramCard({ program }: { program: ProgramSummary }) {
  return (
    <Tile className="flex flex-col gap-4 bg-white p-6">
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
  )
}
