import type { ReactNode } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen gap-4 bg-surface p-5">
      <Sidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
