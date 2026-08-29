import { useMemo, useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { Select } from '@/components/ui/Select'
import { CheckIcon } from '@/components/icons'
import { clsx } from '@/lib/clsx'
import { programs } from '@/data/mockPrograms'
import { athletes } from '@/data/mockAthletes'
import { academiesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'

type Status = 'Present' | 'Absent' | 'Late' | 'Excused'

const STATUSES: Status[] = ['Present', 'Absent', 'Late', 'Excused']

const STATUS_CLASSES: Record<Status, string> = {
  Present: 'bg-[oklch(90%_0.06_145)] text-[oklch(38%_0.1_145)]',
  Absent: 'bg-[oklch(92%_0.06_25)] text-[oklch(45%_0.15_25)]',
  Late: 'bg-[oklch(92%_0.05_70)] text-[oklch(45%_0.13_70)]',
  Excused: 'bg-surface text-muted',
}

const SESSIONS = ['Today — Aug 30, 2026', 'Aug 28, 2026', 'Aug 26, 2026']

export default function AttendancePage() {
  const { currentOrg } = useOrg()
  const academyRows = academiesForOrg(currentOrg.id)
  const [academyId, setAcademyId] = useState('')
  const [programId, setProgramId] = useState('')
  const [batch, setBatch] = useState('')
  const [session, setSession] = useState('')
  const [statuses, setStatuses] = useState<Record<string, Status>>({})
  const [saved, setSaved] = useState(false)

  const availablePrograms = useMemo(() => programs.filter((p) => p.academyId === academyId), [academyId])
  const availableBatches = useMemo(
    () => Array.from(new Set(athletes.filter((a) => a.programId === programId).map((a) => a.batch))),
    [programId],
  )
  const roster = useMemo(
    () => athletes.filter((a) => a.academyId === academyId && a.programId === programId && a.batch === batch),
    [academyId, programId, batch],
  )

  const ready = academyId && programId && batch && session

  function setAcademy(id: string) {
    setAcademyId(id)
    setProgramId('')
    setBatch('')
    setSession('')
    setSaved(false)
  }

  function setProgram(id: string) {
    setProgramId(id)
    setBatch('')
    setSession('')
    setSaved(false)
  }

  function markStatus(athleteId: string, status: Status) {
    setStatuses((prev) => ({ ...prev, [athleteId]: status }))
    setSaved(false)
  }

  function save() {
    setSaved(true)
  }

  const counts = STATUSES.reduce<Record<Status, number>>(
    (acc, s) => {
      acc[s] = roster.filter((a) => (statuses[a.id] ?? 'Present') === s).length
      return acc
    },
    { Present: 0, Absent: 0, Late: 0, Excused: 0 },
  )

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-navy">Attendance</h1>
          <p className="mt-1 text-sm text-muted">Select an academy, program, batch, and session to mark attendance.</p>
        </div>

        <Tile className="grid max-w-3xl grid-cols-1 gap-4 bg-white p-6 sm:grid-cols-4">
          <Select label="Academy" value={academyId} onChange={(e) => setAcademy(e.target.value)}>
            <option value="">Select academy</option>
            {academyRows.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </Select>
          <Select label="Program" value={programId} onChange={(e) => setProgram(e.target.value)} disabled={!academyId}>
            <option value="">Select program</option>
            {availablePrograms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.programName}
              </option>
            ))}
          </Select>
          <Select
            label="Batch"
            value={batch}
            onChange={(e) => {
              setBatch(e.target.value)
              setSession('')
              setSaved(false)
            }}
            disabled={!programId}
          >
            <option value="">Select batch</option>
            {availableBatches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
          <Select
            label="Session"
            value={session}
            onChange={(e) => {
              setSession(e.target.value)
              setSaved(false)
            }}
            disabled={!batch}
          >
            <option value="">Select session</option>
            {SESSIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Tile>

        {ready && (
          <>
            <Tile className="bg-white p-2">
              <div className="overflow-x-auto">
                <div className="min-w-[480px]">
                  <div className="grid grid-cols-[2fr_2fr] gap-3 px-4 py-3 text-[10.5px] font-bold uppercase tracking-wide text-muted">
                    <span>Athlete</span>
                    <span>Status</span>
                  </div>
                  {roster.length === 0 && <p className="px-4 py-6 text-sm text-muted">No athletes in this batch yet.</p>}
                  {roster.map((athlete) => {
                    const current = statuses[athlete.id] ?? 'Present'
                    return (
                      <div key={athlete.id} className="grid grid-cols-[2fr_2fr] items-center gap-3 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-brand-amber">
                            {athlete.initials}
                          </div>
                          <span className="text-sm font-semibold text-navy">{athlete.name}</span>
                        </div>
                        <div className="flex gap-1.5">
                          {STATUSES.map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => markStatus(athlete.id, status)}
                              className={clsx(
                                'rounded-full px-3 py-1.5 text-xs font-semibold transition-opacity',
                                current === status ? STATUS_CLASSES[status] : 'bg-surface text-muted opacity-60 hover:opacity-100',
                              )}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Tile>

            {roster.length > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex gap-5">
                  {STATUSES.map((s) => (
                    <div key={s} className="text-xs font-semibold text-muted">
                      {s}: <span className="text-navy">{counts[s]}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={save}
                  className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-navy-light"
                >
                  {saved && <CheckIcon size={16} />}
                  {saved ? 'Saved' : 'Save attendance'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AppShell>
  )
}
