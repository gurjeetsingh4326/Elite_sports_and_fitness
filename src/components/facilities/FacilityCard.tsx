import { Tile } from '@/components/ui/Tile'
import { CategoryBadge } from '@/components/ui/Badge'
import type { Facility } from '@/data/mockFacilities'

export function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Tile className="flex flex-col gap-4 bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-bold text-navy">{facility.name}</div>
          <div className="mt-1 text-xs font-semibold text-muted">
            {facility.academyName} — {facility.branch}
          </div>
        </div>
        <CategoryBadge category={facility.category} />
      </div>
      <p className="text-[13px] leading-relaxed text-muted">{facility.description}</p>
      <div className="mt-auto border-t border-[oklch(93%_0.005_90)] pt-4 text-xs font-semibold text-muted">
        Capacity: {facility.capacity}
      </div>
    </Tile>
  )
}
