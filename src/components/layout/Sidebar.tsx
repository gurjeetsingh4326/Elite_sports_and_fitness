import { Tile } from '@/components/ui/Tile'
import { NavRow } from '@/components/layout/NavRow'
import {
  DashboardIcon,
  AcademiesIcon,
  AthletesIcon,
  AttendanceIcon,
  PerformanceIcon,
  PracticeLevelsIcon,
  ReelsIcon,
  TransfersIcon,
  SearchIcon,
  BellIcon,
  TrophyIcon,
} from '@/components/icons'

const CURRENT_USER = { initials: 'RS', name: 'Ravi Shastri', role: 'Super Admin' }

export function Sidebar() {
  return (
    <div className="flex h-full w-56 min-w-[224px] flex-col gap-3.5">
      <Tile className="bg-navy p-[18px] text-white">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-brand-amber">
            <TrophyIcon size={18} className="text-navy" />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Search"
              className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-navy-light"
            >
              <SearchIcon size={13} className="text-white/85" />
            </button>
            <button
              type="button"
              aria-label="Notifications"
              className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-navy-light"
            >
              <BellIcon size={13} className="text-white/85" />
            </button>
          </div>
        </div>
        <div className="mb-3.5 text-sm font-bold leading-tight">
          Elite Sports
          <br />
          &amp; Fitness
        </div>
        <div className="flex items-center gap-2.5 border-t border-white/10 pt-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-amber text-[11px] font-bold text-navy">
            {CURRENT_USER.initials}
          </div>
          <div className="leading-tight">
            <div className="text-xs font-semibold text-white/95">{CURRENT_USER.name}</div>
            <div className="text-[10.5px] text-white/60">{CURRENT_USER.role}</div>
          </div>
        </div>
      </Tile>

      <Tile className="flex flex-col gap-0.5 bg-white p-2.5">
        <NavRow icon={<DashboardIcon size={17} />} label="Dashboard" active />
        <NavRow icon={<AcademiesIcon size={17} />} label="Academies" />
        <NavRow icon={<AthletesIcon size={17} />} label="Athletes" />
        <NavRow icon={<AttendanceIcon size={17} />} label="Attendance" />
      </Tile>

      <Tile className="flex flex-col gap-0.5 bg-white p-2.5">
        <NavRow icon={<PerformanceIcon size={17} />} label="Performance" />
        <NavRow icon={<PracticeLevelsIcon size={17} />} label="Practice Levels" />
        <NavRow icon={<ReelsIcon size={17} />} label="Reels" />
        <NavRow icon={<TransfersIcon size={17} />} label="Transfers" />
      </Tile>

      <Tile className="flex grow flex-col justify-end bg-gradient-to-br from-brand-amber to-[oklch(72%_0.19_25)] p-4">
        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-brand-amber-ink/80">
          Attendance Streak
        </div>
        <div className="text-2xl font-bold text-brand-amber-ink">12 days</div>
      </Tile>
    </div>
  )
}
