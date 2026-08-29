import type { HTMLAttributes } from 'react'
import { clsx } from '@/lib/clsx'

type TileProps = HTMLAttributes<HTMLDivElement>

export function Tile({ className, ...props }: TileProps) {
  return <div className={clsx('rounded-tile', className)} {...props} />
}
