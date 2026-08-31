import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { Select } from '@/components/ui/Select'
import { CheckIcon } from '@/components/icons'
import { clsx } from '@/lib/clsx'
import { athleteProfiles } from '@/data/mockAthleteProfiles'
import { useAthletesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'

type TrainingStatus = 'Cleared' | 'Restricted' | 'Temporarily Not Cleared'

const STATUS_CLASSES: Record<TrainingStatus, string> = {
  Cleared: 'bg-[oklch(90%_0.06_145)] text-[oklch(38%_0.1_145)]',
  Restricted: 'bg-[oklch(92%_0.06_70)] text-[oklch(45%_0.13_70)]',
  'Temporarily Not Cleared': 'bg-[oklch(92%_0.06_25)] text-[oklch(45%_0.15_25)]',
}

export default function PhysicianPortalPage() {
  const { currentOrg } = useOrg()
  const athletes = useAthletesForOrg(currentOrg.id)
  const [athleteId, setAthleteId] = useState('')
  const [overrides, setOverrides] = useState<Record<string, { status: TrainingStatus; notes: string; date: string }>>({})
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<TrainingStatus>('Cleared')
  const [saved, setSaved] = useState(false)

  const athlete = athletes.find((a) => a.id === athleteId)
  const profile = athleteId ? athleteProfiles[athleteId] : undefined
  const current = athleteId ? overrides[athleteId] ?? profile?.medical : undefined

  function selectAthlete(id: string) {
    setAthleteId(id)
    setNotes('')
    setStatus((athleteProfiles[id]?.medical.status as TrainingStatus) ?? 'Cleared')
    setSaved(false)
  }

  function save() {
    if (!athleteId || !notes.trim()) return
    setOverrides((prev) => ({
      ...prev,
      [athleteId]: { status, notes, date: 'Today' },
    }))
    setSaved(true)
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-navy">Physician Portal</h1>
          <p className="mt-1 text-sm text-muted">
            Review an athlete&apos;s authorized medical profile, conduct a session, and set training status.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Tile className="bg-white p-2 md:col-span-1">
            <div className="px-3 py-2 text-[10.5px] font-bold uppercase tracking-wide text-muted">Athletes</div>
            <div className="flex flex-col">
              {athletes.map((a) => {
                const st = (overrides[a.id]?.status ?? athleteProfiles[a.id]?.medical.status) as TrainingStatus
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => selectAthlete(a.id)}
                    className={clsx(
                      'flex items-center justify-between rounded-xl px-3 py-2.5 text-left hover:bg-hover',
                      athleteId === a.id && 'bg-hover',
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[10.5px] font-bold text-brand-amber">
                        {a.initials}
                      </div>
                      <span className="text-sm font-semibold text-navy">{a.name}</span>
                    </div>
                    <span className={clsx('rounded-full px-2 py-0.5 text-[10px] font-bold', STATUS_CLASSES[st])}>{st}</span>
                  </button>
                )
              })}
            </div>
          </Tile>

          {athlete && profile && current && (
            <div className="flex flex-col gap-4 md:col-span-2">
              <Tile className="bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-navy">{athlete.name} — Current Status</h2>
                  <span className={clsx('rounded-full px-3 py-1 text-xs font-bold', STATUS_CLASSES[current.status as TrainingStatus])}>
                    {current.status}
                  </span>
                </div>
                <div className="text-xs font-bold uppercase tracking-wide text-muted">Last session</div>
                <div className="mt-1.5 text-sm text-navy">
                  {'date' in current ? current.date : profile.medical.lastSession} — {profile.medical.physicianName}
                </div>
                <p className="mt-3 text-sm text-muted">{'notes' in current ? current.notes : profile.medical.notes}</p>
              </Tile>

              <Tile className="bg-white p-6">
                <h2 className="mb-4 text-sm font-bold text-navy">Record new session</h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="notes" className="mb-1.5 block text-xs font-semibold text-navy">
                      Assessment &amp; recommendations
                    </label>
                    <textarea
                      id="notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="What did you observe in this session?"
                      className="w-full rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-brand-blue"
                    />
                  </div>
                  <Select label="Training status" value={status} onChange={(e) => setStatus(e.target.value as TrainingStatus)}>
                    <option value="Cleared">Cleared</option>
                    <option value="Restricted">Restricted</option>
                    <option value="Temporarily Not Cleared">Temporarily Not Cleared</option>
                  </Select>
                  <button
                    type="button"
                    onClick={save}
                    disabled={!notes.trim()}
                    className="flex items-center justify-center gap-2 rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {saved && <CheckIcon size={16} />}
                    {saved ? 'Saved' : 'Save session'}
                  </button>
                </div>
              </Tile>

              <p className="text-[11px] text-muted">
                Medical data is role-restricted — only the physician and explicitly authorized roles can view this.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
