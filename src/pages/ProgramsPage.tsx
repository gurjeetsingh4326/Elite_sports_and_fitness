import { useState } from 'react'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { CategoryFilterBar } from '@/components/programs/CategoryFilterBar'
import { ProgramCard } from '@/components/programs/ProgramCard'
import { useAllPrograms } from '@/lib/orgScope'
import type { AcademyCategory } from '@/types/dashboard'

export default function ProgramsPage() {
  const [category, setCategory] = useState<AcademyCategory | 'All'>('All')
  const programs = useAllPrograms()
  const visible = category === 'All' ? programs : programs.filter((p) => p.category === category)

  return (
    <div className="min-h-screen bg-white">
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
        {visible.length === 0 && (
          <p className="py-16 text-center text-sm text-muted">No programs in this category yet.</p>
        )}
      </section>

      <PublicFooter />
    </div>
  )
}
