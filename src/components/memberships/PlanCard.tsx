import { Link } from 'react-router-dom'
import { Tile } from '@/components/ui/Tile'
import { CheckIcon } from '@/components/icons'
import { clsx } from '@/lib/clsx'
import type { MembershipPlan } from '@/data/mockMemberships'

export function PlanCard({ plan }: { plan: MembershipPlan }) {
  return (
    <Tile
      className={clsx(
        'flex flex-col gap-6 p-7',
        plan.highlighted ? 'bg-navy text-white' : 'bg-white text-navy',
      )}
    >
      {plan.highlighted && (
        <span className="w-fit rounded-full bg-brand-amber-tile px-3 py-1 text-[11px] font-bold text-brand-amber-ink">
          Most popular
        </span>
      )}
      <div>
        <div className="text-sm font-bold">{plan.name}</div>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold">{plan.priceLabel}</span>
          <span className={clsx('text-sm', plan.highlighted ? 'text-white/70' : 'text-muted')}>
            {plan.billingLabel}
          </span>
        </div>
        <p className={clsx('mt-3 text-[13px] leading-relaxed', plan.highlighted ? 'text-white/80' : 'text-muted')}>
          {plan.description}
        </p>
      </div>

      <ul className="flex flex-col gap-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[13px]">
            <CheckIcon size={16} className={plan.highlighted ? 'text-brand-amber shrink-0' : 'text-brand-blue shrink-0'} />
            <span className={plan.highlighted ? 'text-white/90' : 'text-navy'}>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/register"
        className={clsx(
          'mt-auto rounded-full py-3 text-center text-sm font-semibold',
          plan.highlighted ? 'bg-white text-navy' : 'bg-navy text-white hover:bg-navy-light',
        )}
      >
        Get started
      </Link>
    </Tile>
  )
}
