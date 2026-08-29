import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Tile } from '@/components/ui/Tile'
import { NavRow } from '@/components/layout/NavRow'
import { DropdownPanel } from '@/components/ui/DropdownPanel'
import { SearchIcon, BellIcon, TrophyIcon, CheckIcon, LogoutIcon } from '@/components/icons'
import { ROLE_NAV } from '@/data/roleNav'
import { notifications } from '@/data/mockNotifications'
import { ROLES, type Role } from '@/types/role'

const CURRENT_USER = { initials: 'RS', name: 'Ravi Shastri' }

const NAV_ROUTES: Record<string, string> = {
  dashboard: '/dashboard',
  academies: '/dashboard/academies',
  athletes: '/dashboard/athletes',
  attendance: '/dashboard/attendance',
  performance: '/dashboard/performance',
  'practice-levels': '/dashboard/practice-levels',
  reels: '/dashboard/reels-studio',
  moderation: '/dashboard/moderation',
}

function chunk<T>(items: T[], size: number): T[][] {
  const groups: T[][] = []
  for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size))
  return groups
}

export function Sidebar() {
  const [role, setRole] = useState<Role>('Super Admin/Owner')
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const location = useLocation()

  const navGroups = chunk(ROLE_NAV[role], 4)
  const unreadCount = notifications.filter((n) => !n.read).length

  const isActive = (key: string) => {
    const route = NAV_ROUTES[key]
    if (!route) return false
    if (route === '/dashboard') return location.pathname === '/dashboard'
    return location.pathname.startsWith(route)
  }

  return (
    <div className="flex h-full w-56 min-w-[224px] flex-col gap-3.5">
      <Tile className="bg-navy p-[18px] text-white">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-brand-amber">
            <TrophyIcon size={18} className="text-navy" />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Search"
              className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-navy-light"
            >
              <SearchIcon size={13} className="text-white/85" />
            </button>
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => setNotificationsOpen((v) => !v)}
                className="relative flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-navy-light"
              >
                <BellIcon size={13} className="text-white/85" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-amber text-[8px] font-bold text-navy">
                    {unreadCount}
                  </span>
                )}
              </button>
              <DropdownPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} align="right">
                <div className="px-2 py-1.5 text-xs font-bold text-navy">Notifications</div>
                <div className="flex flex-col gap-0.5">
                  {notifications.map((n) => (
                    <div key={n.id} className="flex items-start gap-2 rounded-lg px-2 py-2 hover:bg-hover">
                      <span
                        className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${n.read ? 'bg-transparent' : 'bg-brand-blue'}`}
                      />
                      <div>
                        <div className="text-xs font-medium text-navy">{n.title}</div>
                        <div className="mt-0.5 text-[10.5px] text-muted">{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownPanel>
            </div>
          </div>
        </div>
        <div className="mb-3.5 text-sm font-bold leading-tight">
          Elite Sports
          <br />
          &amp; Fitness
        </div>

        <div className="relative border-t border-white/10 pt-3">
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            className="flex w-full items-center gap-2.5 text-left"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-amber text-[11px] font-bold text-navy">
              {CURRENT_USER.initials}
            </div>
            <div className="leading-tight">
              <div className="text-xs font-semibold text-white/95">{CURRENT_USER.name}</div>
              <div className="text-[10.5px] text-white/60">{role}</div>
            </div>
          </button>

          <DropdownPanel open={profileOpen} onClose={() => setProfileOpen(false)} align="left" side="top">
            <div className="px-2 py-1.5 text-[10.5px] font-bold uppercase tracking-wide text-muted">
              Preview as role
            </div>
            <div className="flex flex-col gap-0.5">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r)
                    setProfileOpen(false)
                  }}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-medium text-navy hover:bg-hover"
                >
                  {r}
                  {r === role && <CheckIcon size={14} className="text-brand-blue" />}
                </button>
              ))}
            </div>
            <div className="my-1.5 h-px bg-[oklch(93%_0.005_90)]" />
            <Link
              to="/"
              onClick={() => setProfileOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-navy hover:bg-hover"
            >
              <LogoutIcon size={14} />
              Log out
            </Link>
          </DropdownPanel>
        </div>
      </Tile>

      {navGroups.map((group, i) => (
        <Tile key={i} className="flex flex-col gap-0.5 bg-white p-2.5">
          {group.map((item) => {
            const row = <NavRow icon={<item.Icon size={17} />} label={item.label} active={isActive(item.key)} />
            const route = NAV_ROUTES[item.key]
            return route ? (
              <Link key={item.key} to={route}>
                {row}
              </Link>
            ) : (
              <div key={item.key}>{row}</div>
            )
          })}
        </Tile>
      ))}

      <Tile className="flex grow flex-col justify-end bg-gradient-to-br from-brand-amber to-[oklch(72%_0.19_25)] p-4">
        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-brand-amber-ink/80">
          Attendance Streak
        </div>
        <div className="text-2xl font-bold text-brand-amber-ink">12 days</div>
      </Tile>
    </div>
  )
}
