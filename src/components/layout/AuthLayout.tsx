import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { TrophyIcon } from '@/components/icons'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-6 py-12">
      <div className="w-full max-w-md animate-fade-in-scale">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy">
            <TrophyIcon size={19} className="text-brand-amber" />
          </div>
          <span className="text-base font-bold text-navy">Elite Sports &amp; Fitness</span>
        </Link>

        <div className="rounded-panel bg-white p-8 shadow-[0_8px_24px_-8px_oklch(50%_0.05_40_/_12%)]">
          <h1 className="text-2xl font-bold text-navy">{title}</h1>
          <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
          <div className="mt-7">{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-muted">{footer}</p>
      </div>
    </div>
  )
}
