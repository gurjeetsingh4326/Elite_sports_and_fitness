import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field } from '@/components/ui/Field'

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to your Elite Sports & Fitness account."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-navy underline underline-offset-4">
            Register
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4">
        <Field label="Email" type="email" name="email" placeholder="you@example.com" autoComplete="email" />
        <Field label="Password" type="password" name="password" placeholder="••••••••" autoComplete="current-password" />
        <button
          type="submit"
          className="mt-2 rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light"
        >
          Log in
        </button>
      </form>
    </AuthLayout>
  )
}
