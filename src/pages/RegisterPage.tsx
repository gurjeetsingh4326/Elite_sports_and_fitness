import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field } from '@/components/ui/Field'

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register as an athlete or guardian to join an academy."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-navy underline underline-offset-4">
            Log in
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4">
        <Field label="Full name" type="text" name="name" placeholder="Jane Athlete" autoComplete="name" />
        <Field label="Email" type="email" name="email" placeholder="you@example.com" autoComplete="email" />
        <Field label="Phone" type="tel" name="phone" placeholder="+1 555 000 0000" autoComplete="tel" />
        <Field label="Password" type="password" name="password" placeholder="••••••••" autoComplete="new-password" />
        <button
          type="submit"
          className="mt-2 rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light"
        >
          Create account
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-2.5 rounded-xl bg-surface px-4 py-3.5 text-xs text-muted">
        <div>
          Coaching independently, without an academy yet?{' '}
          <Link to="/register-coach" className="font-semibold text-navy underline underline-offset-4">
            Register as a coach
          </Link>
          {' '}instead.
        </div>
        <div>
          Running a sports business with your own academies?{' '}
          <Link to="/register-organization" className="font-semibold text-navy underline underline-offset-4">
            Register your organization
          </Link>
          {' '}instead.
        </div>
      </div>
    </AuthLayout>
  )
}
