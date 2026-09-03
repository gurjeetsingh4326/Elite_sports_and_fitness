import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { BellIcon } from '@/components/icons'
import { clsx } from '@/lib/clsx'
import { useDataStore } from '@/context/DataStoreContext'
import { useCurrentPersona } from '@/lib/useCurrentPersona'

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useDataStore()
  const persona = useCurrentPersona()

  const visible = notifications
    .filter((n) => !n.forPersonId || n.forPersonId === persona.id)
    .sort((a, b) => Number(a.read) - Number(b.read))

  const unreadCount = visible.filter((n) => !n.read).length

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-navy">Notifications</h1>
            <p className="mt-1 text-sm text-muted">
              {unreadCount > 0 ? `${unreadCount} unread` : 'You’re all caught up.'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={() => markAllNotificationsRead(persona.id)}
              className="rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-navy-light active:scale-[0.98]"
            >
              Mark all read
            </button>
          )}
        </div>

        <Tile className="animate-fade-in bg-white p-2">
          <div className="flex flex-col">
            {visible.map((n, i) => (
              <button
                key={n.id}
                type="button"
                onClick={() => markNotificationRead(n.id)}
                className={clsx(
                  'flex animate-fade-in items-start gap-3 rounded-xl px-4 py-3.5 text-left transition-colors hover:bg-hover',
                  !n.read && 'bg-surface',
                )}
                style={{ animationDelay: `${Math.min(i, 10) * 30}ms` }}
              >
                <div
                  className={clsx(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300',
                    n.read ? 'bg-surface text-muted' : 'bg-navy text-brand-amber',
                  )}
                >
                  <BellIcon size={14} />
                </div>
                <div className="min-w-0">
                  <div className={clsx('text-sm', n.read ? 'text-muted' : 'font-semibold text-navy')}>{n.title}</div>
                  <div className="mt-0.5 text-xs text-muted">{n.time}</div>
                </div>
                {!n.read && <span className="ml-auto mt-1.5 h-2 w-2 shrink-0 animate-pulse-ring rounded-full bg-brand-blue" />}
              </button>
            ))}
            {visible.length === 0 && <div className="animate-fade-in px-4 py-8 text-center text-sm text-muted">No notifications yet.</div>}
          </div>
        </Tile>
      </div>
    </AppShell>
  )
}
