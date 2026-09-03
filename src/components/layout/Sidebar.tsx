import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Tile } from '@/components/ui/Tile'
import { NavRow } from '@/components/layout/NavRow'
import { DropdownPanel } from '@/components/ui/DropdownPanel'
import { BellIcon, TrophyIcon, CheckIcon, LogoutIcon, EditIcon } from '@/components/icons'
import { ROLE_NAV } from '@/data/roleNav'
import { ROLES } from '@/types/role'
import { clsx } from '@/lib/clsx'
import { useOrg } from '@/context/OrgContext'
import { useIdentity } from '@/context/IdentityContext'
import { useDataStore } from '@/context/DataStoreContext'
import { useAthletesForOrg, useCoachesForOrg } from '@/lib/orgScope'
import { SidebarSearch } from '@/components/layout/SidebarSearch'

const NAV_ROUTES: Record<string, string> = {
  dashboard: '/dashboard',
  academies: '/dashboard/academies',
  athletes: '/dashboard/athletes',
  attendance: '/dashboard/attendance',
  performance: '/dashboard/performance',
  'practice-levels': '/dashboard/practice-levels',
  reels: '/dashboard/reels-studio',
  gallery: '/dashboard/gallery',
  'my-classes': '/dashboard/my-classes',
  'my-results': '/dashboard/my-results',
  moderation: '/dashboard/moderation',
  medical: '/dashboard/physician',
  transfers: '/dashboard/transfers',
  tournaments: '/dashboard/tournaments',
  payments: '/dashboard/payments',
  reports: '/dashboard/reports',
  users: '/dashboard/users',
  nutrition: '/dashboard/nutrition',
}

function chunk<T>(items: T[], size: number): T[][] {
  const groups: T[][] = []
  for (let i = 0; i < items.length; i += size) groups.push(items.slice(i, i + size))
  return groups
}

interface SidebarProps {
  mobileOpen: boolean
  onCloseMobile: () => void
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const { role, setRole, coachId, setCoachId, athleteId, setAthleteId } = useIdentity()
  const { notifications, markAllNotificationsRead } = useDataStore()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { currentOrg, organizations, setCurrentOrgId } = useOrg()
  const orgCoaches = useCoachesForOrg(currentOrg.id)
  const orgAthletes = useAthletesForOrg(currentOrg.id)

  const currentCoach = orgCoaches.find((c) => c.id === coachId) ?? orgCoaches[0]
  const currentAthlete = orgAthletes.find((a) => a.id === athleteId) ?? orgAthletes[0]

  const currentPerson =
    role === 'Coach/Trainer' && currentCoach
      ? { name: currentCoach.name, initials: currentCoach.initials }
      : role === 'Athlete/Member' && currentAthlete
        ? { name: currentAthlete.name, initials: currentAthlete.initials }
        : { name: 'Ravi Shastri', initials: 'RS' }

  const personId = role === 'Coach/Trainer' ? currentCoach?.id : role === 'Athlete/Member' ? currentAthlete?.id : undefined
  const visibleNotifications = notifications.filter((n) => !n.forPersonId || n.forPersonId === personId)

  const navGroups = chunk(ROLE_NAV[role], 4)
  const unreadCount = visibleNotifications.filter((n) => !n.read).length

  const routeForKey = (key: string) => (key === 'my-child' ? (currentAthlete ? `/dashboard/athletes/${currentAthlete.id}` : undefined) : NAV_ROUTES[key])

  const isActive = (key: string) => {
    const route = routeForKey(key)
    if (!route) return false
    if (route === '/dashboard') return location.pathname === '/dashboard'
    return location.pathname.startsWith(route)
  }

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}
      <div
        className={clsx(
          'flex w-56 min-w-[224px] flex-col gap-3.5 overflow-y-auto',
          'fixed inset-y-0 left-0 z-50 bg-surface p-4 transition-transform duration-200 ease-out',
          'md:static md:z-auto md:h-full md:bg-transparent md:p-0 md:transition-none',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
      <Tile className="bg-navy p-[18px] text-white">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-brand-amber">
            {currentOrg.logoUrl ? (
              <img src={currentOrg.logoUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              <TrophyIcon size={18} className="text-navy" />
            )}
          </div>
          <div className="flex gap-2">
            <SidebarSearch />
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
              <DropdownPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} align="right" className="w-72">
                <div className="flex items-center justify-between px-2 py-1.5">
                  <span className="text-xs font-bold text-navy">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={() => markAllNotificationsRead(personId)}
                      className="text-[10.5px] font-semibold text-brand-blue hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="flex max-h-72 flex-col gap-0.5 overflow-y-auto">
                  {visibleNotifications.slice(0, 6).map((n) => (
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
                  {visibleNotifications.length === 0 && (
                    <div className="px-2 py-3 text-xs text-muted">Nothing new.</div>
                  )}
                </div>
                <div className="my-1.5 h-px bg-[oklch(93%_0.005_90)]" />
                <button
                  type="button"
                  onClick={() => {
                    setNotificationsOpen(false)
                    navigate('/dashboard/notifications')
                  }}
                  className="flex w-full items-center justify-center rounded-lg px-2 py-1.5 text-xs font-semibold text-brand-blue hover:bg-hover"
                >
                  View all
                </button>
              </DropdownPanel>
            </div>
          </div>
        </div>
        <div className="mb-3.5 truncate text-sm font-bold leading-tight" title={currentOrg.name}>
          {currentOrg.name}
        </div>

        <div className="relative border-t border-white/10 pt-3">
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            className="flex w-full items-center gap-2.5 text-left"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-amber text-[11px] font-bold text-navy">
              {currentPerson.initials}
            </div>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-xs font-semibold text-white/95">{currentPerson.name}</div>
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
                  onClick={() => setRole(r)}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-medium text-navy hover:bg-hover"
                >
                  {r}
                  {r === role && <CheckIcon size={14} className="text-brand-blue" />}
                </button>
              ))}
            </div>

            {role === 'Coach/Trainer' && orgCoaches.length > 0 && (
              <>
                <div className="my-1.5 h-px bg-[oklch(93%_0.005_90)]" />
                <div className="px-2 py-1.5 text-[10.5px] font-bold uppercase tracking-wide text-muted">
                  As which coach?
                </div>
                <div className="flex flex-col gap-0.5">
                  {orgCoaches.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCoachId(c.id)}
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-medium text-navy hover:bg-hover"
                    >
                      <span className="truncate">{c.name}</span>
                      {c.id === currentCoach?.id && <CheckIcon size={14} className="shrink-0 text-brand-blue" />}
                    </button>
                  ))}
                </div>
              </>
            )}

            {(role === 'Athlete/Member' || role === 'Parent/Guardian') && orgAthletes.length > 0 && (
              <>
                <div className="my-1.5 h-px bg-[oklch(93%_0.005_90)]" />
                <div className="px-2 py-1.5 text-[10.5px] font-bold uppercase tracking-wide text-muted">
                  {role === 'Parent/Guardian' ? 'Which child?' : 'As which athlete?'}
                </div>
                <div className="flex flex-col gap-0.5">
                  {orgAthletes.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setAthleteId(a.id)}
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-medium text-navy hover:bg-hover"
                    >
                      <span className="truncate">{a.name}</span>
                      {a.id === currentAthlete?.id && <CheckIcon size={14} className="shrink-0 text-brand-blue" />}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="my-1.5 h-px bg-[oklch(93%_0.005_90)]" />
            <div className="px-2 py-1.5 text-[10.5px] font-bold uppercase tracking-wide text-muted">
              Organization (demo preview)
            </div>
            <div className="flex flex-col gap-0.5">
              {organizations.map((org) => (
                <button
                  key={org.id}
                  type="button"
                  onClick={() => setCurrentOrgId(org.id)}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs font-medium text-navy hover:bg-hover"
                >
                  <span className="truncate">{org.name}</span>
                  {org.id === currentOrg.id && <CheckIcon size={14} className="shrink-0 text-brand-blue" />}
                </button>
              ))}
            </div>
            <Link
              to="/register-organization"
              onClick={() => setProfileOpen(false)}
              className="flex items-center rounded-lg px-2 py-1.5 text-xs font-semibold text-brand-blue hover:bg-hover"
            >
              + Register new organization
            </Link>
            <div className="my-1.5 h-px bg-[oklch(93%_0.005_90)]" />
            <Link
              to="/dashboard/settings"
              onClick={() => setProfileOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-navy hover:bg-hover"
            >
              <EditIcon size={14} />
              My Profile
            </Link>
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
            const route = routeForKey(item.key)
            return route ? (
              <Link key={item.key} to={route} onClick={onCloseMobile}>
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
    </>
  )
}
