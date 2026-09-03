import { clsx } from '@/lib/clsx'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={clsx('relative overflow-hidden bg-[oklch(92%_0.006_90)]', className)}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/80 to-transparent" />
    </div>
  )
}
