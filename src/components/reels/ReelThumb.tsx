import { ReelsIcon } from '@/components/icons'
import type { Reel } from '@/types/reel'

const THEME_CLASSES: Record<Reel['theme'], string> = {
  amber: 'bg-gradient-to-br from-brand-amber to-[oklch(68%_0.18_35)]',
  blue: 'bg-gradient-to-br from-brand-blue to-[oklch(50%_0.18_270)]',
  green: 'bg-gradient-to-br from-brand-green to-[oklch(48%_0.13_170)]',
  violet: 'bg-gradient-to-br from-brand-violet to-[oklch(45%_0.15_320)]',
  navy: 'bg-gradient-to-br from-navy to-[oklch(12%_0.02_260)]',
}

export function ReelThumb({ reel, className }: { reel: Reel; className?: string }) {
  return (
    <div
      className={`relative flex aspect-[9/16] flex-col justify-between overflow-hidden rounded-tile p-4 text-white ${THEME_CLASSES[reel.theme]} ${className ?? ''}`}
    >
      <div className="flex justify-end">
        <ReelsIcon size={20} className="text-white/80" />
      </div>
      <p className="line-clamp-3 text-sm font-semibold leading-snug">{reel.caption}</p>
    </div>
  )
}
