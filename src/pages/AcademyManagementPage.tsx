import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { CategoryBadge } from '@/components/ui/Badge'
import { academyRows } from '@/data/mockDashboard'

export default function AcademyManagementPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-navy">Academies</h1>
            <p className="mt-1 text-sm text-muted">{academyRows.length} academies across the organization</p>
          </div>
          <button type="button" className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light">
            + Add academy
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {academyRows.map((academy) => (
            <Link key={academy.id} to={`/dashboard/academies/${academy.id}`}>
              <Tile className="flex flex-col gap-4 bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_-8px_oklch(50%_0.05_40_/_15%)]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-bold text-navy">{academy.name}</div>
                    <div className="mt-1 text-xs font-semibold text-muted">{academy.branch}</div>
                  </div>
                  <CategoryBadge category={academy.category} />
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-[oklch(93%_0.005_90)] pt-4 sm:grid-cols-4">
                  <div>
                    <div className="text-lg font-bold text-navy">{academy.athletes}</div>
                    <div className="text-[11px] font-semibold text-muted">Athletes</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-navy">{academy.coaches}</div>
                    <div className="text-[11px] font-semibold text-muted">Coaches</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-navy">{academy.batches}</div>
                    <div className="text-[11px] font-semibold text-muted">Batches</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[oklch(45%_0.13_145)]">{academy.attendancePct}%</div>
                    <div className="text-[11px] font-semibold text-muted">Attendance</div>
                  </div>
                </div>
              </Tile>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
