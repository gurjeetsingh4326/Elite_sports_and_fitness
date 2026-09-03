import { useState } from 'react'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { CategoryFilterBar } from '@/components/programs/CategoryFilterBar'
import { ProgramCard } from '@/components/programs/ProgramCard'
import { SkeletonCardGrid } from '@/components/ui/SkeletonBlocks'
import { useAllPrograms } from '@/lib/orgScope'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import type { AcademyCategory } from '@/types/dashboard'

export default function ProgramsPage() {
  const [category, setCategory] = useState<AcademyCategory | 'All'>('All')
  const programs = useAllPrograms()
  const visible = category === 'All' ? programs : programs.filter((p) => p.category === category)
  const loading = useSimulatedLoading(400, [category])

  return (
    <div className="min-h-screen animate-fade-in bg-white">
      <PublicHeader />

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-6">
        <h1 className="text-3xl font-bold text-navy">Programs</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Browse every program across our academies, filtered by sport.
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
            {visible.map((program, i) => (
              <div key={program.id} className="animate-fade-in" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
        )}
        {!loading && visible.length === 0 && (
          <p className="animate-fade-in py-16 text-center text-sm text-muted">No programs in this category yet.</p>
        )}
      </section>

      <PublicFooter />
    </div>
  )
}
