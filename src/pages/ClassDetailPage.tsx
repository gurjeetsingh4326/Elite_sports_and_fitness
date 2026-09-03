import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { CategoryBadge } from '@/components/ui/Badge'
import { ClockIcon, XIcon } from '@/components/icons'
import { useAthletesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'
import { useDataStore } from '@/context/DataStoreContext'

export default function ClassDetailPage() {
  const { academyId, classId } = useParams()
  const { currentOrg } = useOrg()
  const { classes, assignStudentToClass, removeStudentFromClass } = useDataStore()
  const athletes = useAthletesForOrg(currentOrg.id)
  const [showAssign, setShowAssign] = useState(false)
  const [selectedAthleteId, setSelectedAthleteId] = useState('')

  const cls = classes.find((c) => c.id === classId)
  if (!cls) return <Navigate to={`/dashboard/academies/${academyId}/classes`} replace />

  const roster = athletes.filter((a) => cls.studentIds.includes(a.id))
  const available = athletes.filter((a) => a.academyId === academyId && !cls.studentIds.includes(a.id))

  function assign() {
    if (!selectedAthleteId) return
    assignStudentToClass(cls!.id, selectedAthleteId)
    setSelectedAthleteId('')
    setShowAssign(false)
  }

  function remove(athleteId: string) {
    removeStudentFromClass(cls!.id, athleteId)
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <Link to={`/dashboard/academies/${academyId}/classes`} className="text-xs font-semibold text-muted transition-colors hover:text-navy">
            ← Back to Classes
          </Link>
          <div className="mt-3 flex items-center gap-3">
            <h1 className="text-xl font-bold text-navy">{cls.name}</h1>
            <CategoryBadge category={cls.category} />
          </div>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted">
            <span>Coach {cls.coachName}</span>
            <span className="flex items-center gap-1.5">
              <ClockIcon size={14} />
              {cls.timing}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-navy">Students ({roster.length})</h2>
          <button
            type="button"
            onClick={() => setShowAssign((v) => !v)}
            className="text-xs font-semibold text-brand-blue"
          >
            {showAssign ? 'Cancel' : '+ Assign student'}
          </button>
        </div>

        {showAssign && (
          <Tile className="flex max-w-md animate-fade-in-scale flex-col gap-3 bg-white p-4">
            <select
              aria-label="Select a student to assign"
              value={selectedAthleteId}
              onChange={(e) => setSelectedAthleteId(e.target.value)}
              className="rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3 py-2 text-xs text-navy outline-none focus:border-brand-blue"
            >
              <option value="">Select an athlete at this academy</option>
              {available.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={!selectedAthleteId}
              onClick={assign}
              className="rounded-full bg-navy py-2 text-xs font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
            >
              Assign to class
            </button>
            {available.length === 0 && (
              <p className="text-[11px] text-muted">Every athlete at this academy is already in this class.</p>
            )}
          </Tile>
        )}

        <div className="flex flex-col gap-2.5">
          {roster.map((athlete, i) => (
            <Tile
              key={athlete.id}
              className="group flex animate-fade-in items-center justify-between bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_oklch(50%_0.05_40_/_20%)]"
              style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
            >
              <Link to={`/dashboard/athletes/${athlete.id}`} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-brand-amber transition-transform duration-200 group-hover:scale-110">
                  {athlete.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-navy">{athlete.name}</div>
                  <div className="text-xs text-muted">{athlete.practiceLevel}</div>
                </div>
              </Link>
              <button
                type="button"
                aria-label={`Remove ${athlete.name} from class`}
                onClick={() => remove(athlete.id)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-all duration-150 hover:scale-110 hover:bg-hover hover:text-[oklch(55%_0.19_25)]"
              >
                <XIcon size={14} />
              </button>
            </Tile>
          ))}
          {roster.length === 0 && (
            <Tile className="animate-fade-in bg-white p-8 text-center text-sm text-muted">No students assigned yet.</Tile>
          )}
        </div>
      </div>
    </AppShell>
  )
}
