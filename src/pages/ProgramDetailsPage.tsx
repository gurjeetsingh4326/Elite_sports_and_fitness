import { Link, useParams, Navigate } from 'react-router-dom'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Tile } from '@/components/ui/Tile'
import { CategoryBadge } from '@/components/ui/Badge'
import { CoachMiniCard } from '@/components/coaches/CoachMiniCard'
import { ArrowRightIcon } from '@/components/icons'
import { programs } from '@/data/mockPrograms'
import { coaches } from '@/data/mockCoaches'

export default function ProgramDetailsPage() {
  const { programId } = useParams()
  const program = programs.find((p) => p.id === programId)

  if (!program) return <Navigate to="/programs" replace />

  const programCoaches = coaches.filter((c) => c.specialty === program.category && !c.isIndependent).slice(0, 2)

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-6">
        <Link to="/programs" className="text-xs font-semibold text-muted hover:text-navy">
          ← Back to Programs
        </Link>

        <div className="mt-4 flex items-start justify-between gap-6">
          <div>
            <div className="mb-3">
              <CategoryBadge category={program.category} />
            </div>
            <h1 className="text-3xl font-bold text-navy">{program.programName}</h1>
            <p className="mt-1.5 text-sm text-muted">
              {program.academyName} — {program.branch}
            </p>
          </div>
          <a
            href="/register"
            className="flex shrink-0 items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white hover:bg-navy-light"
          >
            Enroll now
            <ArrowRightIcon size={16} />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tile className="bg-white p-6">
              <h2 className="text-base font-bold text-navy">About this program</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{program.description}</p>
            </Tile>

            <div className="mt-6">
              <h2 className="mb-3 text-base font-bold text-navy">Coaches</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {programCoaches.map((coach) => (
                  <CoachMiniCard key={coach.id} coach={coach} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Tile className="bg-surface p-6">
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Practice levels</div>
              <div className="mt-1.5 text-sm font-semibold text-navy">{program.levels}</div>
            </Tile>
            <Tile className="bg-surface p-6">
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Active batches</div>
              <div className="mt-1.5 text-sm font-semibold text-navy">{program.batches} running</div>
            </Tile>
            <Tile className="bg-surface p-6">
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Category</div>
              <div className="mt-1.5 text-sm font-semibold text-navy">{program.category}</div>
            </Tile>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
