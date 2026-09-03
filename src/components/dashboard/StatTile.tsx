import type { ReactNode } from 'react'
import { Tile } from '@/components/ui/Tile'
import { clsx } from '@/lib/clsx'

type Tone = 'amber' | 'blue' | 'violet'

const TONE_CLASSES: Record<Tone, { bg: string; text: string; sub: string }> = {
  amber: { bg: 'bg-brand-amber-tile', text: 'text-brand-amber-ink', sub: 'text-brand-amber-ink/80' },
  blue: { bg: 'bg-brand-blue', text: 'text-white', sub: 'text-white/90' },
  violet: { bg: 'bg-brand-violet', text: 'text-white', sub: 'text-white/90' },
}

interface StatTileProps {
  tone: Tone
  icon: ReactNode
  value: string
  label: string
  className?: string
}

export function StatTile({ tone, icon, value, label, className }: StatTileProps) {
  const t = TONE_CLASSES[tone]
  return (
    <Tile
      className={clsx(
        'flex flex-col justify-between p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_oklch(30%_0.05_260_/_30%)]',
        t.bg,
        className,
      )}
    >
      <div className={t.text}>{icon}</div>
      <div>
        <div className={clsx('text-[32px] font-bold leading-none', t.text)}>{value}</div>
        <div className={clsx('mt-1.5 text-xs font-semibold', t.sub)}>{label}</div>
      </div>
    </Tile>
  )
}
