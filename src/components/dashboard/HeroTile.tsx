import { Tile } from '@/components/ui/Tile'
import type { OrgDashboardStats } from '@/types/dashboard'

export function HeroTile({ stats }: { stats: OrgDashboardStats }) {
  return (
    <Tile className="flex flex-col justify-between bg-[linear-gradient(120deg,oklch(74%_0.19_25),oklch(68%_0.17_350)_55%,oklch(62%_0.18_320))] p-6 text-white">
      <div>
        <div className="text-[22px] font-bold">Good morning, Ravi</div>
        <div className="mt-1 text-[12.5px] text-white/85">
          {stats.transfersPending} transfers pending · {stats.programsRunning} programs running across the org
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-[38px] font-bold">{stats.attendanceTodayPct}%</span>
        <span className="text-[13px] text-white/85">
          attendance today · {stats.attendanceMarked.toLocaleString()} of {stats.attendanceTotal.toLocaleString()} marked
        </span>
      </div>
    </Tile>
  )
}
