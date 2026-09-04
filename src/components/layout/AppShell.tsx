import { useState, type ReactNode } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { MenuIcon, TrophyIcon } from '@/components/icons'
import { useOrg } from '@/context/OrgContext'

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { currentOrg } = useOrg()

  return (
    <div className="min-h-screen bg-surface md:h-screen md:overflow-hidden">
      <div className="flex items-center justify-between border-b border-[oklch(92%_0.005_90)] bg-white px-4 py-3 md:hidden">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-navy">
            {currentOrg.logoUrl ? (
              <img src={currentOrg.logoUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <TrophyIcon size={16} className="text-brand-amber" />
            )}
          </div>
          <span className="truncate text-sm font-bold text-navy">{currentOrg.name}</span>
        </div>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMobileNavOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface transition-transform active:scale-90"
        >
          <MenuIcon size={18} className="text-navy" />
        </button>
      </div>

      <div className="flex gap-4 p-4 md:h-full md:min-h-0 md:overflow-hidden md:p-5">
        <Sidebar mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />
        <main data-capture="main" className="min-w-0 flex-1 animate-fade-in md:h-full md:overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
