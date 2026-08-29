import { useState } from 'react'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { CategoryFilterBar } from '@/components/programs/CategoryFilterBar'
import { CoachCard } from '@/components/coaches/CoachCard'
import { coaches } from '@/data/mockCoaches'
import type { AcademyCategory } from '@/types/dashboard'

export default function CoachesDirectoryPage() {
  const [category, setCategory] = useState<AcademyCategory | 'All'>('All')
  const visible = category === 'All' ? coaches : coaches.filter((c) => c.specialty === category)

  return (
    <div className="min-h-screen bg-white">
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
        {visible.length === 0 && (
          <p className="py-16 text-center text-sm text-muted">No coaches in this category yet.</p>
        )}
      </section>

      <PublicFooter />
    </div>
  )
}
