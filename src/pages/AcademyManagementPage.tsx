import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { CategoryBadgeList } from '@/components/ui/Badge'
import { ImagePlaceholderIcon } from '@/components/icons'
import { academiesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'

export default function AcademyManagementPage() {
  const { currentOrg } = useOrg()
  const academyRows = academiesForOrg(currentOrg.id)

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-navy">Academies</h1>
            <p className="mt-1 text-sm text-muted">
              {academyRows.length} {academyRows.length === 1 ? 'academy' : 'academies'} at {currentOrg.name}
            </p>
          </div>
          <button type="button" className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light">
            + Add academy
          </button>
        </div>

        {academyRows.length === 0 && (
          <Tile className="bg-white p-8 text-center text-sm text-muted">No academies yet — add your first one.</Tile>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {academyRows.map((academy) => (
            <Link key={academy.id} to={`/dashboard/academies/${academy.id}`}>
              <Tile className="flex flex-col gap-4 bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_-8px_oklch(50%_0.05_40_/_15%)]">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface">
                    {academy.imageUrl ? (
                      <img src={academy.imageUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <ImagePlaceholderIcon size={18} className="text-muted" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-bold text-navy">{academy.name}</div>
                    <div className="mt-1 text-xs font-semibold text-muted">{academy.branch}</div>
                    <div className="mt-2">
                      <CategoryBadgeList categories={academy.categories} />
                    </div>
                  </div>
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
