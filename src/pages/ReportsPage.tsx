import { useEffect, useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { CategoryBadgeList } from '@/components/ui/Badge'
import { TrendChartTile } from '@/components/dashboard/TrendChartTile'
import { SkeletonStatGrid, SkeletonTable } from '@/components/ui/SkeletonBlocks'
import { orgDashboardStatsByOrg, weekAttendance, peakDayLabel } from '@/data/mockDashboard'
import { PRACTICE_LEVELS } from '@/types/athlete'
import { useAcademiesForOrg, useAthletesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'

export default function ReportsPage() {
  const { currentOrg } = useOrg()
  const academyRows = useAcademiesForOrg(currentOrg.id)
  const athletes = useAthletesForOrg(currentOrg.id)
  const loading = useSimulatedLoading(450, [currentOrg.id])
  const [grown, setGrown] = useState(false)
  const orgDashboardStats = orgDashboardStatsByOrg[currentOrg.id] ?? {
    academies: academyRows.length,
    totalAthletes: athletes.length,
    attendanceTodayPct: 0,
    monthlyRevenueLabel: '$0',
  }
  const levelCounts = PRACTICE_LEVELS.map((level) => ({
    level,
    count: athletes.filter((a) => a.practiceLevel === level).length,
  }))
  const maxLevelCount = Math.max(...levelCounts.map((l) => l.count), 1)

  useEffect(() => {
    if (loading) {
      setGrown(false)
      return
    }
    const raf = requestAnimationFrame(() => setGrown(true))
    return () => cancelAnimationFrame(raf)
  }, [loading])

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-navy">Reports</h1>
          <p className="mt-1 text-sm text-muted">Organization-wide metrics at a glance.</p>
        </div>

        {loading ? (
          <>
            <SkeletonStatGrid />
            <SkeletonTable rows={5} columns={6} />
          </>
        ) : (
        <>
        <div className="grid animate-fade-in grid-cols-2 gap-4 sm:grid-cols-4">
          <Tile className="bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_oklch(50%_0.05_40_/_20%)]">
            <div className="text-2xl font-bold text-navy">{orgDashboardStats.academies}</div>
            <div className="mt-1 text-xs font-semibold text-muted">Academies</div>
          </Tile>
          <Tile className="bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_oklch(50%_0.05_40_/_20%)]">
            <div className="text-2xl font-bold text-navy">{orgDashboardStats.totalAthletes.toLocaleString()}</div>
            <div className="mt-1 text-xs font-semibold text-muted">Athletes</div>
          </Tile>
          <Tile className="bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_oklch(50%_0.05_40_/_20%)]">
            <div className="text-2xl font-bold text-[oklch(45%_0.13_145)]">{orgDashboardStats.attendanceTodayPct}%</div>
            <div className="mt-1 text-xs font-semibold text-muted">Attendance Today</div>
          </Tile>
          <Tile className="bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_oklch(50%_0.05_40_/_20%)]">
            <div className="text-2xl font-bold text-navy">{orgDashboardStats.monthlyRevenueLabel}</div>
            <div className="mt-1 text-xs font-semibold text-muted">Monthly Revenue</div>
          </Tile>
        </div>

        <div className="grid animate-fade-in grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <TrendChartTile data={weekAttendance} peakLabel={peakDayLabel} />

          <Tile className="bg-white p-5 sm:col-span-2 lg:col-span-2">
            <div className="mb-4 text-sm font-bold text-navy">Practice Level Distribution</div>
            <div className="flex flex-col gap-3">
              {levelCounts.map(({ level, count }, i) => (
                <div key={level}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-semibold text-navy">{level}</span>
                    <span className="text-muted">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface">
                    <div
                      className="h-2 rounded-full bg-brand-blue"
                      style={{
                        width: grown ? `${(count / maxLevelCount) * 100}%` : 0,
                        transition: `width 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Tile>
        </div>

        <Tile className="animate-fade-in bg-white p-2">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <div className="grid grid-cols-[1.8fr_1fr_0.8fr_0.8fr_0.8fr_0.9fr] gap-3 px-4 py-3 text-[10.5px] font-bold uppercase tracking-wide text-muted">
                <span>Academy</span>
                <span>Category</span>
                <span>Athletes</span>
                <span>Coaches</span>
                <span>Batches</span>
                <span>Attendance</span>
              </div>
              {academyRows.map((a, i) => (
                <div
                  key={a.id}
                  className="grid animate-fade-in grid-cols-[1.8fr_1fr_0.8fr_0.8fr_0.8fr_0.9fr] items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-hover"
                  style={{ animationDelay: `${Math.min(i, 10) * 30}ms` }}
                >
                  <span className="text-sm font-semibold text-navy">{a.name}</span>
                  <CategoryBadgeList categories={a.categories} max={1} />
                  <span className="text-xs text-muted">{a.athletes}</span>
                  <span className="text-xs text-muted">{a.coaches}</span>
                  <span className="text-xs text-muted">{a.batches}</span>
                  <span className="text-xs font-bold text-[oklch(45%_0.13_145)]">{a.attendancePct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Tile>
        </>
        )}
      </div>
    </AppShell>
  )
}
