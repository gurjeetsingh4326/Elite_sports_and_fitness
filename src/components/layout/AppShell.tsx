import { useState, type ReactNode } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { MenuIcon, TrophyIcon } from '@/components/icons'

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface">
      <div className="flex items-center justify-between border-b border-[oklch(92%_0.005_90)] bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy">
            <TrophyIcon size={16} className="text-brand-amber" />
          </div>
          <span className="text-sm font-bold text-navy">Elite Sports &amp; Fitness</span>
        </div>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileNavOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface"
        >
          <MenuIcon size={18} className="text-navy" />
        </button>
      </div>

      <div className="flex gap-4 p-4 md:p-5">
        <Sidebar mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
