import { Link, useParams, Navigate } from 'react-router-dom'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Tile } from '@/components/ui/Tile'
import { CategoryBadge } from '@/components/ui/Badge'
import { CoachMiniCard } from '@/components/coaches/CoachMiniCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { SkeletonRowList } from '@/components/ui/SkeletonBlocks'
import { ArrowRightIcon } from '@/components/icons'
import { useAllPrograms, useAllCoaches } from '@/lib/orgScope'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'

export default function ProgramDetailsPage() {
  const { programId } = useParams()
  const programs = useAllPrograms()
  const coaches = useAllCoaches()
  const program = programs.find((p) => p.id === programId)
  const loading = useSimulatedLoading(400, [programId])

  if (!program) return <Navigate to="/programs" replace />

  const programCoaches = coaches.filter((c) => c.specialty === program.category && !c.isIndependent).slice(0, 2)

  return (
    <div className="min-h-screen animate-fade-in bg-white">
      <PublicHeader />

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-6">
        <Link to="/programs" className="text-xs font-semibold text-muted transition-colors hover:text-navy">
          ← Back to Programs
        </Link>

        {loading ? (
          <div className="mt-4">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="mt-3 h-8 w-96 max-w-full rounded-lg" />
            <Skeleton className="mt-2 h-3.5 w-56 rounded" />
          </div>
        ) : (
          <div className="mt-4 flex animate-fade-in items-start justify-between gap-6">
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
              className="flex shrink-0 items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-navy-light active:scale-[0.98]"
            >
              Enroll now
              <ArrowRightIcon size={16} />
            </a>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Tile className="bg-white p-6">
                <Skeleton className="h-3.5 w-32 rounded" />
                <Skeleton className="mt-4 h-3 w-full rounded" />
                <Skeleton className="mt-2 h-3 w-4/5 rounded" />
              </Tile>
              <div className="mt-6">
                <Skeleton className="mb-3 h-3.5 w-24 rounded" />
                <SkeletonRowList count={2} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Tile key={i} className="bg-surface p-6">
                  <Skeleton className="h-3 w-24 rounded" />
                  <Skeleton className="mt-2.5 h-4 w-16 rounded" />
                </Tile>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid animate-fade-in grid-cols-1 gap-6 md:grid-cols-3">
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
        )}
      </section>

      <PublicFooter />
    </div>
  )
}
