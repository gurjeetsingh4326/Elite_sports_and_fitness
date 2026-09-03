import { useState } from 'react'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { CategoryFilterBar } from '@/components/programs/CategoryFilterBar'
import { CoachCard } from '@/components/coaches/CoachCard'
import { SkeletonCardGrid } from '@/components/ui/SkeletonBlocks'
import { useAllCoaches } from '@/lib/orgScope'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import type { AcademyCategory } from '@/types/dashboard'

export default function CoachesDirectoryPage() {
  const coaches = useAllCoaches()
  const [category, setCategory] = useState<AcademyCategory | 'All'>('All')
  const visible = category === 'All' ? coaches : coaches.filter((c) => c.specialty === category)
  const loading = useSimulatedLoading(400, [category])

  return (
    <div className="min-h-screen animate-fade-in bg-white">
      <PublicHeader />

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-6">
        <h1 className="text-3xl font-bold text-navy">Coaches</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Academy-affiliated and independent coaches, all in one directory.
        </p>
        <div className="mt-6">
          <CategoryFilterBar active={category} onChange={setCategory} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {loading ? (
          <SkeletonCardGrid count={6} />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((coach, i) => (
              <div key={coach.id} className="animate-fade-in" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
                <CoachCard coach={coach} />
              </div>
            ))}
          </div>
        )}
        {!loading && visible.length === 0 && (
          <p className="animate-fade-in py-16 text-center text-sm text-muted">No coaches in this category yet.</p>
        )}
      </section>

      <PublicFooter />
    </div>
  )
}
