import { orgDashboardStatsByOrg } from '@/data/mockDashboard'

// The public home page is marketing content shown to logged-out visitors, so it
// always shows the flagship org's numbers rather than reacting to the (authenticated) org switcher.
const orgDashboardStats = orgDashboardStatsByOrg['elite-sports-fitness']

const STATS = [
  { value: String(orgDashboardStats.academies), label: 'Academies' },
  { value: orgDashboardStats.totalAthletes.toLocaleString(), label: 'Athletes' },
  { value: `${orgDashboardStats.attendanceTodayPct}%`, label: 'Attendance today' },
  { value: String(orgDashboardStats.programsRunning), label: 'Programs running' },
]

export function StatsStrip() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="grid grid-cols-2 gap-6 rounded-panel bg-navy px-8 py-10 text-white md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className="text-4xl font-bold">{stat.value}</div>
            <div className="mt-1.5 text-sm text-white/70">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
