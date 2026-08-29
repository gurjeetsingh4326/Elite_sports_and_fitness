import { Tile } from '@/components/ui/Tile'
import { CategoryBadge } from '@/components/ui/Badge'
import type { AcademyRow } from '@/types/dashboard'

export function AcademiesOverviewTile({ rows }: { rows: AcademyRow[] }) {
  return (
    <Tile className="col-span-2 row-span-2 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-base font-bold text-navy">Academies Overview</span>
        <span className="cursor-pointer text-xs font-semibold text-brand-blue">View all →</span>
      </div>
      <div className="grid grid-cols-[2.1fr_1.1fr_0.8fr_0.9fr] border-b border-[oklch(93%_0.005_90)] pb-2.5">
        <span className="text-[10.5px] font-bold uppercase tracking-wide text-[oklch(52%_0.008_90)]">Academy</span>
        <span className="text-[10.5px] font-bold uppercase tracking-wide text-[oklch(52%_0.008_90)]">Category</span>
        <span className="text-[10.5px] font-bold uppercase tracking-wide text-[oklch(52%_0.008_90)]">Athletes</span>
        <span className="text-[10.5px] font-bold uppercase tracking-wide text-[oklch(52%_0.008_90)]">Attend.</span>
      </div>
      {rows.map((row, i) => (
        <div
          key={row.name}
          className={`grid grid-cols-[2.1fr_1.1fr_0.8fr_0.9fr] items-center py-3.5 ${
            i < rows.length - 1 ? 'border-b border-[oklch(95%_0.003_90)]' : ''
          }`}
        >
          <span className="text-sm font-semibold text-navy">
            {row.name} — {row.branch}
          </span>
          <CategoryBadge category={row.category} />
          <span className="text-[13px] text-[oklch(35%_0.008_90)]">{row.athletes}</span>
          <span
            className={`text-[13px] font-bold ${
              row.attendancePct >= 90 ? 'text-[oklch(45%_0.13_145)]' : 'text-[oklch(58%_0.14_70)]'
            }`}
          >
            {row.attendancePct}%
          </span>
        </div>
      ))}
    </Tile>
  )
}
