import { useState } from 'react'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { CategoryFilterBar } from '@/components/programs/CategoryFilterBar'
import { FacilityCard } from '@/components/facilities/FacilityCard'
import { facilities } from '@/data/mockFacilities'
import type { AcademyCategory } from '@/types/dashboard'

export default function FacilitiesPage() {
  const [category, setCategory] = useState<AcademyCategory | 'All'>('All')
  const visible = category === 'All' ? facilities : facilities.filter((f) => f.category === category)

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-6">
        <h1 className="text-3xl font-bold text-navy">Facilities</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Take a look at the pitches, pools, and training spaces across our academies.
        </p>
        <div className="mt-6">
          <CategoryFilterBar active={category} onChange={setCategory} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
        {visible.length === 0 && (
          <p className="py-16 text-center text-sm text-muted">No facilities in this category yet.</p>
        )}
      </section>

      <PublicFooter />
    </div>
  )
}
