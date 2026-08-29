import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { HeroTile } from '@/components/dashboard/HeroTile'
import { StatTile } from '@/components/dashboard/StatTile'
import { AcademiesOverviewTile } from '@/components/dashboard/AcademiesOverviewTile'
import { AttendanceRingTile } from '@/components/dashboard/AttendanceRingTile'
import { TrendChartTile } from '@/components/dashboard/TrendChartTile'
import { Tile } from '@/components/ui/Tile'
import { AcademiesIcon, AthletesIcon, PaymentsIcon } from '@/components/icons'
import { orgDashboardStatsByOrg, weekAttendance, peakDayLabel } from '@/data/mockDashboard'
import { academiesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'

export default function DashboardPage() {
  const { currentOrg } = useOrg()
  const orgAcademies = academiesForOrg(currentOrg.id)
  const stats = orgDashboardStatsByOrg[currentOrg.id] ?? {
    academies: orgAcademies.length,
    academiesDeltaLabel: 'New',
    totalAthletes: orgAcademies.reduce((sum, a) => sum + a.athletes, 0),
    athletesDeltaLabel: 'New',
    attendanceTodayPct: 0,
    attendanceMarked: 0,
    attendanceTotal: 0,
    monthlyRevenueLabel: '$0',
    revenueDeltaLabel: 'New',
    transfersPending: 0,
    programsRunning: 0,
  }

  if (orgAcademies.length === 0) {
    return (
      <AppShell>
        <Tile className="mx-auto mt-12 max-w-md bg-white p-8 text-center">
          <div className="text-base font-bold text-navy">Welcome to {currentOrg.name}</div>
          <p className="mt-2 text-sm text-muted">
            You don&apos;t have any academies yet. Add your first one to start building out programs,
            batches, and athlete profiles.
          </p>
          <Link
            to="/dashboard/academies"
            className="mt-5 inline-block rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light"
          >
            + Add your first academy
          </Link>
        </Tile>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:h-full lg:grid-cols-4 lg:grid-rows-[190px_1fr_190px]">
        <div className="sm:col-span-2 lg:col-span-2">
          <HeroTile stats={stats} />
        </div>

        <StatTile
          tone="amber"
          icon={<AcademiesIcon size={22} />}
          value={String(stats.academies)}
          label={`Academies · ${stats.academiesDeltaLabel}`}
        />
        <StatTile
          tone="blue"
          icon={<AthletesIcon size={22} />}
          value={stats.totalAthletes.toLocaleString()}
          label={`Athletes · ${stats.athletesDeltaLabel}`}
        />

        <AcademiesOverviewTile rows={orgAcademies} />

        <AttendanceRingTile pct={stats.attendanceTodayPct} />
        <StatTile
          tone="violet"
          icon={<PaymentsIcon size={22} />}
          value={stats.monthlyRevenueLabel}
          label={`Revenue · ${stats.revenueDeltaLabel}`}
        />

        <TrendChartTile data={weekAttendance} peakLabel={peakDayLabel} />
      </div>
    </AppShell>
  )
}
