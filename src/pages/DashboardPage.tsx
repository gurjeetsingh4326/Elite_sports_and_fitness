import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { HeroTile } from '@/components/dashboard/HeroTile'
import { StatTile } from '@/components/dashboard/StatTile'
import { AcademiesOverviewTile } from '@/components/dashboard/AcademiesOverviewTile'
import { AttendanceRingTile } from '@/components/dashboard/AttendanceRingTile'
import { TrendChartTile } from '@/components/dashboard/TrendChartTile'
import { Tile } from '@/components/ui/Tile'
import { Skeleton } from '@/components/ui/Skeleton'
import { AcademiesIcon, AthletesIcon, PaymentsIcon } from '@/components/icons'
import { orgDashboardStatsByOrg, weekAttendance, peakDayLabel } from '@/data/mockDashboard'
import { useAcademiesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'

export default function DashboardPage() {
  const { currentOrg } = useOrg()
  const orgAcademies = useAcademiesForOrg(currentOrg.id)
  const loading = useSimulatedLoading(450, [currentOrg.id])
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

  if (loading) {
    return (
      <AppShell>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:h-full lg:grid-cols-4 lg:grid-rows-[190px_1fr_190px]">
          <Skeleton className="rounded-tile sm:col-span-2 lg:col-span-2" />
          <Skeleton className="rounded-tile" />
          <Skeleton className="rounded-tile" />
          <Skeleton className="rounded-tile sm:col-span-2 lg:col-span-2 lg:row-span-2" />
          <Skeleton className="rounded-tile" />
          <Skeleton className="rounded-tile" />
          <Skeleton className="rounded-tile sm:col-span-2 lg:col-span-2" />
        </div>
      </AppShell>
    )
  }

  if (orgAcademies.length === 0) {
    return (
      <AppShell>
        <Tile className="mx-auto mt-12 max-w-md animate-fade-in-scale bg-white p-8 text-center">
          <div className="text-base font-bold text-navy">Welcome to {currentOrg.name}</div>
          <p className="mt-2 text-sm text-muted">
            You don&apos;t have any academies yet. Add your first one to start building out programs,
            batches, and athlete profiles.
          </p>
          <Link
            to="/dashboard/academies"
            className="mt-5 inline-block rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-navy-light active:scale-95"
          >
            + Add your first academy
          </Link>
        </Tile>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="grid animate-fade-in grid-cols-1 gap-4 sm:grid-cols-2 lg:h-full lg:grid-cols-4 lg:grid-rows-[190px_1fr_190px]">
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
