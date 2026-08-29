import type { ReactNode } from 'react'
import { clsx } from '@/lib/clsx'

interface NavRowProps {
  icon: ReactNode
  label: string
  active?: boolean
}

export function NavRow({ icon, label, active }: NavRowProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition-colors',
        active
          ? 'bg-brand-amber-tile font-bold text-brand-amber-ink'
          : 'font-medium text-muted hover:bg-hover',
      )}
    >
      {icon}
      {label}
    </div>
  )
}
