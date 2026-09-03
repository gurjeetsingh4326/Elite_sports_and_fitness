import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { CategoryBadge } from '@/components/ui/Badge'
import { ClockIcon } from '@/components/icons'
import { useIdentity } from '@/context/IdentityContext'
import { useDataStore } from '@/context/DataStoreContext'
import { useAthletesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'

const DAY_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function isToday(timing: string) {
  const today = DAY_ABBR[new Date().getDay()]
  return timing.includes(today)
}

export default function MyClassesPage() {
  const { role, coachId, athleteId } = useIdentity()
  const { currentOrg } = useOrg()
  const { classes } = useDataStore()
  const athletes = useAthletesForOrg(currentOrg.id)

  const isCoach = role === 'Coach/Trainer'
  const myClasses = isCoach
    ? classes.filter((c) => c.coachId === coachId)
    : classes.filter((c) => c.studentIds.includes(athleteId))

  const todayClasses = myClasses.filter((c) => isToday(c.timing))

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-navy">My Classes</h1>
          <p className="mt-1 text-sm text-muted">
            {isCoach ? `${myClasses.length} classes you coach` : `${myClasses.length} classes you're enrolled in`}
          </p>
        </div>

        {todayClasses.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-bold text-navy">Today</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {todayClasses.map((cls, i) => (
                <Tile
                  key={cls.id}
                  className="flex animate-fade-in flex-col gap-2 bg-brand-amber-tile p-4 transition-transform duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-brand-amber-ink">{cls.name}</span>
                    <CategoryBadge category={cls.category} />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-amber-ink/80">
                    <ClockIcon size={13} />
                    {cls.timing}
                  </div>
                  {!isCoach && <div className="text-xs text-brand-amber-ink/80">Coach {cls.coachName}</div>}
                </Tile>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="mb-3 text-sm font-bold text-navy">All classes</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {myClasses.map((cls, i) => {
              const roster = athletes.filter((a) => cls.studentIds.includes(a.id))
              return (
                <Link
                  key={cls.id}
                  to={`/dashboard/academies/${cls.academyId}/classes/${cls.id}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
                >
                  <Tile className="flex flex-col gap-3 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_oklch(50%_0.05_40_/_20%)]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-bold text-navy">{cls.name}</div>
                      <CategoryBadge category={cls.category} />
                    </div>
                    {!isCoach && <div className="text-xs text-muted">Coach {cls.coachName}</div>}
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <ClockIcon size={13} />
                      {cls.timing}
                    </div>
                    {isCoach && (
                      <div className="flex items-center justify-between border-t border-[oklch(93%_0.005_90)] pt-3">
                        <div className="flex -space-x-2">
                          {roster.slice(0, 4).map((a) => (
                            <div
                              key={a.id}
                              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-navy text-[9px] font-bold text-brand-amber"
                            >
                              {a.initials}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs font-semibold text-muted">{cls.studentIds.length} students</span>
                      </div>
                    )}
                  </Tile>
                </Link>
              )
            })}
          </div>
          {myClasses.length === 0 && (
            <Tile className="bg-white p-8 text-center text-sm text-muted">
              {isCoach ? 'No classes assigned to you yet.' : 'Not enrolled in any classes yet.'}
            </Tile>
          )}
        </div>
      </div>
    </AppShell>
  )
}
