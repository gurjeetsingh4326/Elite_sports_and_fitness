import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { Field } from '@/components/ui/Field'
import { Select } from '@/components/ui/Select'
import { CategoryBadge } from '@/components/ui/Badge'
import { ClockIcon } from '@/components/icons'
import { useAcademiesForOrg, useCoachesForOrg, useAthletesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'
import { useDataStore } from '@/context/DataStoreContext'
import type { AcademyCategory } from '@/types/dashboard'
import type { AcademyClass } from '@/types/academyClass'

export default function AcademyClassesPage() {
  const { academyId } = useParams()
  const { currentOrg } = useOrg()
  const { classes, addClass } = useDataStore()
  const academyRows = useAcademiesForOrg(currentOrg.id)
  const coaches = useCoachesForOrg(currentOrg.id)
  const athletes = useAthletesForOrg(currentOrg.id)

  const academy = academyRows.find((a) => a.id === academyId)

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [category, setCategory] = useState<AcademyCategory | ''>('')
  const [coachId, setCoachId] = useState('')
  const [timing, setTiming] = useState('')

  if (!academy) return <Navigate to="/dashboard/academies" replace />

  const academyClasses = classes.filter((c) => c.academyId === academyId)
  const academyCoaches = coaches.filter((c) => c.academyId === academyId)

  function createClass() {
    if (!name.trim() || !category || !coachId || !timing.trim() || !academy) return
    const coach = academyCoaches.find((c) => c.id === coachId)
    if (!coach) return

    const cls: AcademyClass = {
      id: `${academy!.id}-class-${academyClasses.length}`,
      academyId: academy!.id,
      name: name.trim(),
      category,
      coachId: coach.id,
      coachName: coach.name,
      timing: timing.trim(),
      studentIds: [],
    }
    addClass(cls)
    setShowForm(false)
    setName('')
    setCategory('')
    setCoachId('')
    setTiming('')
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <Link to={`/dashboard/academies/${academyId}`} className="text-xs font-semibold text-muted hover:text-navy">
              ← Back to {academy.name}
            </Link>
            <h1 className="mt-3 text-xl font-bold text-navy">Classes</h1>
            <p className="mt-1 text-sm text-muted">{academyClasses.length} classes at {academy.name}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light"
          >
            {showForm ? 'Cancel' : '+ Create class'}
          </button>
        </div>

        {showForm && (
          <Tile className="grid max-w-2xl grid-cols-1 gap-4 bg-white p-6 sm:grid-cols-2">
            <Field label="Class name" value={name} onChange={(e) => setName(e.target.value)} placeholder="U10 Boys — Batch A" />
            <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value as AcademyCategory)}>
              <option value="">Select category</option>
              {academy.categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Select label="Coach" value={coachId} onChange={(e) => setCoachId(e.target.value)}>
              <option value="">Select coach</option>
              {academyCoaches.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
            <Field
              label="Timing"
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              placeholder="Mon / Wed / Fri · 4:00 – 5:30 PM"
            />
            <button
              type="button"
              onClick={createClass}
              disabled={!name.trim() || !category || !coachId || !timing.trim()}
              className="rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-2"
            >
              Create class
            </button>
            {academyCoaches.length === 0 && (
              <p className="text-[11px] text-muted sm:col-span-2">
                No coaches at this academy yet — add one from the Users page first.
              </p>
            )}
          </Tile>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {academyClasses.map((cls) => {
            const roster = athletes.filter((a) => cls.studentIds.includes(a.id))
            return (
              <Link key={cls.id} to={`/dashboard/academies/${academyId}/classes/${cls.id}`}>
                <Tile className="flex flex-col gap-3 bg-white p-5 hover:shadow-[0_8px_24px_-8px_oklch(50%_0.05_40_/_15%)]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-bold text-navy">{cls.name}</div>
                    <CategoryBadge category={cls.category} />
                  </div>
                  <div className="text-xs text-muted">Coach {cls.coachName}</div>
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <ClockIcon size={13} />
                    {cls.timing}
                  </div>
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
                </Tile>
              </Link>
            )
          })}
        </div>
        {academyClasses.length === 0 && (
          <Tile className="bg-white p-8 text-center text-sm text-muted">No classes yet — create the first one.</Tile>
        )}
      </div>
    </AppShell>
  )
}
