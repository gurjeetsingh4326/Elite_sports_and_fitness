import { Skeleton } from '@/components/ui/Skeleton'
import { Tile } from '@/components/ui/Tile'
import { clsx } from '@/lib/clsx'

/** 4-up stat tile grid, matching the `grid-cols-2 sm:grid-cols-4` stat pattern used across dashboards. */
export function SkeletonStatGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Tile key={i} className="bg-white p-5">
          <Skeleton className="h-7 w-14 rounded-lg" />
          <Skeleton className="mt-2.5 h-3 w-16 rounded" />
        </Tile>
      ))}
    </div>
  )
}

/** A row with a circular avatar, two text lines, and a trailing chip — for athlete/coach/user lists. */
export function SkeletonRow({ className }: { className?: string }) {
  return (
    <Tile className={clsx('flex items-center justify-between bg-white p-4', className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
        <div>
          <Skeleton className="h-3.5 w-32 rounded" />
          <Skeleton className="mt-2 h-3 w-20 rounded" />
        </div>
      </div>
      <Skeleton className="h-3 w-16 rounded" />
    </Tile>
  )
}

export function SkeletonRowList({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div className={clsx('flex flex-col gap-2.5', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  )
}

/** A card with an image block, title, subtitle, and badges — for academy/program/facility/coach grids. */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <Tile className={clsx('flex flex-col gap-4 bg-white p-6', className)}>
      <div className="flex items-start gap-3">
        <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-4 w-3/4 rounded" />
          <Skeleton className="mt-2 h-3 w-1/2 rounded" />
        </div>
      </div>
      <Skeleton className="h-3 w-full rounded" />
      <Skeleton className="h-3 w-2/3 rounded" />
    </Tile>
  )
}

export function SkeletonCardGrid({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={clsx('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

/** A vertical video/reel thumbnail card. */
export function SkeletonThumb({ className }: { className?: string }) {
  return <Skeleton className={clsx('aspect-[9/16] w-full rounded-tile', className)} />
}

export function SkeletonThumbGrid({ count = 8, className }: { count?: number; className?: string }) {
  return (
    <div className={clsx('grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonThumb key={i} />
      ))}
    </div>
  )
}

/** Page heading placeholder: title + subtitle lines. */
export function SkeletonHeading() {
  return (
    <div>
      <Skeleton className="h-6 w-48 rounded-lg" />
      <Skeleton className="mt-2.5 h-3.5 w-72 rounded" />
    </div>
  )
}

/** A small table with a header row and N body rows, matching the dense list pattern (Tile p-2 + grid rows). */
export function SkeletonTable({ rows = 5, columns = 3 }: { rows?: number; columns?: number }) {
  return (
    <Tile className="bg-white p-2">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 px-4 py-3.5">
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={c} className={clsx('h-3.5 rounded', c === 0 ? 'w-2/5' : 'flex-1 max-w-[140px]')} />
          ))}
        </div>
      ))}
    </Tile>
  )
}
