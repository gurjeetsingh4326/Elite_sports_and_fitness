import type { ReactNode } from 'react'
import { clsx } from '@/lib/clsx'

interface DropdownPanelProps {
  open: boolean
  onClose: () => void
  align?: 'left' | 'right'
  side?: 'top' | 'bottom'
  className?: string
  children: ReactNode
}

export function DropdownPanel({ open, onClose, align = 'left', side = 'bottom', className, children }: DropdownPanelProps) {
  if (!open) return null

  return (
    <>
      <button type="button" aria-label="Close menu" onClick={onClose} className="fixed inset-0 z-40 cursor-default" />
      <div
        className={clsx(
          'absolute z-50 min-w-[220px] rounded-xl border border-[oklch(91%_0.005_90)] bg-white p-2 shadow-[0_12px_30px_-10px_oklch(30%_0.05_260_/_25%)]',
          align === 'right' ? 'right-0' : 'left-0',
          side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
          className,
        )}
      >
        {children}
      </div>
    </>
  )
}
