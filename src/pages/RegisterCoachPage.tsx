import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field } from '@/components/ui/Field'

const SPECIALTIES = ['Football', 'Cricket', 'Basketball', 'Tennis', 'Swimming', 'Athletics', 'Martial Arts', 'Fitness & Gym']

export default function RegisterCoachPage() {
  return (
    <AuthLayout
      title="Register as an independent coach"
      subtitle="No academy needed to get started — join one later, or stay independent."
      footer={
        <>
          Registering as an athlete instead?{' '}
          <Link to="/register" className="font-semibold text-navy underline underline-offset-4">
            Go there
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4">
        <Field label="Full name" type="text" name="name" placeholder="Alex Coach" autoComplete="name" />
        <Field label="Email" type="email" name="email" placeholder="you@example.com" autoComplete="email" />
        <Field label="Phone" type="tel" name="phone" placeholder="+1 555 000 0000" autoComplete="tel" />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="specialty" className="text-xs font-semibold text-navy">
            Primary sport specialty
          </label>
          <select
            id="specialty"
            name="specialty"
            className="rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-brand-blue"
          >
            {SPECIALTIES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <Field label="Password" type="password" name="password" placeholder="••••••••" autoComplete="new-password" />

        <button
          type="submit"
          className="mt-2 rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light"
        >
          Create coach profile
        </button>
      </form>

      <p className="mt-6 text-[11.5px] leading-relaxed text-muted">
        You&apos;ll get a public profile and can post Reels right away. Batches, attendance, and
        athlete data unlock once you join or are invited into an academy — your profile and content
        carry over either way.
      </p>
    </AuthLayout>
  )
}
