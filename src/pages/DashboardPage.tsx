import { AppShell } from '@/components/layout/AppShell'
import { HeroTile } from '@/components/dashboard/HeroTile'
import { StatTile } from '@/components/dashboard/StatTile'
import { AcademiesOverviewTile } from '@/components/dashboard/AcademiesOverviewTile'
import { AttendanceRingTile } from '@/components/dashboard/AttendanceRingTile'
import { TrendChartTile } from '@/components/dashboard/TrendChartTile'
import { AcademiesIcon, AthletesIcon, PaymentsIcon } from '@/components/icons'
import { orgDashboardStats, academyRows, weekAttendance, peakDayLabel } from '@/data/mockDashboard'

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="grid h-full grid-cols-4 grid-rows-[190px_1fr_190px] gap-4">
        <div className="col-span-2">
          <HeroTile stats={orgDashboardStats} />
        </div>

        <StatTile
          tone="amber"
          icon={<AcademiesIcon size={22} />}
          value={String(orgDashboardStats.academies)}
          label={`Academies · ${orgDashboardStats.academiesDeltaLabel}`}
        />
        <StatTile
          tone="blue"
          icon={<AthletesIcon size={22} />}
          value={orgDashboardStats.totalAthletes.toLocaleString()}
          label={`Athletes · ${orgDashboardStats.athletesDeltaLabel}`}
        />

        <AcademiesOverviewTile rows={academyRows} />

        <AttendanceRingTile pct={orgDashboardStats.attendanceTodayPct} />
        <StatTile
          tone="violet"
          icon={<PaymentsIcon size={22} />}
          value={orgDashboardStats.monthlyRevenueLabel}
          label={`Revenue · ${orgDashboardStats.revenueDeltaLabel}`}
        />

        <TrendChartTile data={weekAttendance} peakLabel={peakDayLabel} />
      </div>
    </AppShell>
  )
}
