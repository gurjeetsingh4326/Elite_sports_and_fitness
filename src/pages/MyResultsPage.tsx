import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { useIdentity } from '@/context/IdentityContext'
import { useDataStore } from '@/context/DataStoreContext'
import { useAthletesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'
import { athleteProfiles as seedAthleteProfiles } from '@/data/mockAthleteProfiles'

export default function MyResultsPage() {
  const { coachId } = useIdentity()
  const { currentOrg } = useOrg()
  const { classes, extraAthleteProfiles } = useDataStore()
  const athletes = useAthletesForOrg(currentOrg.id)
  const athleteProfiles = { ...seedAthleteProfiles, ...extraAthleteProfiles }

  const myClassIds = new Set(classes.filter((c) => c.coachId === coachId).map((c) => c.id))
  const myAthleteIds = new Set(classes.filter((c) => myClassIds.has(c.id)).flatMap((c) => c.studentIds))
  const myAthletes = athletes.filter((a) => myAthleteIds.has(a.id))

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-navy">My Athletes</h1>
          <p className="mt-1 text-sm text-muted">{myAthletes.length} athletes across your classes</p>
        </div>

        <Tile className="bg-white p-2">
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-[1.6fr_1.2fr_0.9fr_1.6fr] gap-3 px-4 py-3 text-[10.5px] font-bold uppercase tracking-wide text-muted">
                <span>Athlete</span>
                <span>Practice Level</span>
                <span>Attend.</span>
                <span>Latest assessment</span>
              </div>
              {myAthletes.map((athlete, i) => {
                const profile = athleteProfiles[athlete.id]
                const latest = profile?.performanceAssessments[0]
                return (
                  <Link
                    key={athlete.id}
                    to={`/dashboard/athletes/${athlete.id}`}
                    className="group grid animate-fade-in grid-cols-[1.6fr_1.2fr_0.9fr_1.6fr] items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-hover"
                    style={{ animationDelay: `${Math.min(i, 10) * 30}ms` }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-brand-amber transition-transform duration-200 group-hover:scale-110">
                        {athlete.initials}
                      </div>
                      <span className="text-sm font-semibold text-navy">{athlete.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-navy">{athlete.practiceLevel}</span>
                    <span
                      className={`text-xs font-bold ${
                        athlete.attendancePct >= 90 ? 'text-[oklch(45%_0.13_145)]' : 'text-[oklch(58%_0.14_70)]'
                      }`}
                    >
                      {athlete.attendancePct}%
                    </span>
                    <span className="truncate text-xs text-muted">
                      {latest ? `${latest.date} — ${latest.summary}` : 'No assessments yet'}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
          {myAthletes.length === 0 && (
            <p className="py-10 text-center text-sm text-muted">No athletes assigned to your classes yet.</p>
          )}
        </Tile>
      </div>
    </AppShell>
  )
}
