import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { PlanCard } from '@/components/memberships/PlanCard'
import { membershipPlans } from '@/data/mockMemberships'

export default function MembershipsPage() {
  return (
    <div className="min-h-screen animate-fade-in bg-white">
      <PublicHeader />

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-6 text-center">
        <h1 className="text-3xl font-bold text-navy">Memberships</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Pick a plan that matches how many sports — and athletes — you need covered.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {membershipPlans.map((plan, i) => (
            <div key={plan.id} className="animate-fade-in" style={{ animationDelay: `${i * 90}ms` }}>
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
