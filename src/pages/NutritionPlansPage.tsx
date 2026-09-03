import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { Field } from '@/components/ui/Field'
import { CheckIcon } from '@/components/icons'
import { clsx } from '@/lib/clsx'
import { athleteProfiles as seedAthleteProfiles } from '@/data/mockAthleteProfiles'
import { useAthletesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'
import { useDataStore } from '@/context/DataStoreContext'

export default function NutritionPlansPage() {
  const { currentOrg } = useOrg()
  const { extraAthleteProfiles, updateAthleteProfile } = useDataStore()
  const athleteProfiles = { ...seedAthleteProfiles, ...extraAthleteProfiles }
  const athletes = useAthletesForOrg(currentOrg.id)
  const [athleteId, setAthleteId] = useState('')
  const [planName, setPlanName] = useState('')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  const athlete = athletes.find((a) => a.id === athleteId)
  const profile = athleteId ? athleteProfiles[athleteId] : undefined

  function selectAthlete(id: string) {
    setAthleteId(id)
    setPlanName(athleteProfiles[id]?.nutrition.planName ?? '')
    setNotes(athleteProfiles[id]?.nutrition.notes ?? '')
    setSaved(false)
  }

  function save() {
    if (!athleteId || !planName.trim()) return
    updateAthleteProfile(athleteId, { nutrition: { planName: planName.trim(), notes } })
    setSaved(true)
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-navy">Nutrition Plans</h1>
          <p className="mt-1 text-sm text-muted">Set and update each athlete&apos;s nutrition plan.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Tile className="bg-white p-2 md:col-span-1">
            <div className="px-3 py-2 text-[10.5px] font-bold uppercase tracking-wide text-muted">Athletes</div>
            <div className="flex flex-col">
              {athletes.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => selectAthlete(a.id)}
                  className={clsx(
                    'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left hover:bg-hover',
                    athleteId === a.id && 'bg-hover',
                  )}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[10.5px] font-bold text-brand-amber">
                    {a.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-navy">{a.name}</div>
                    <div className="truncate text-[11px] text-muted">
                      {athleteProfiles[a.id]?.nutrition.planName ?? 'No plan yet'}
                    </div>
                  </div>
                </button>
              ))}
              {athletes.length === 0 && <div className="px-3 py-6 text-sm text-muted">No athletes yet.</div>}
            </div>
          </Tile>

          {athlete && profile && (
            <div className="flex flex-col gap-4 md:col-span-2">
              <Tile className="bg-white p-6">
                <h2 className="mb-4 text-sm font-bold text-navy">{athlete.name} — Current plan</h2>
                <div className="text-xs font-bold uppercase tracking-wide text-muted">Plan</div>
                <div className="mt-1.5 text-sm text-navy">{profile.nutrition.planName}</div>
                <p className="mt-3 text-sm text-muted">{profile.nutrition.notes}</p>
              </Tile>

              <Tile className="bg-white p-6">
                <h2 className="mb-4 text-sm font-bold text-navy">Update plan</h2>
                <div className="flex flex-col gap-4">
                  <Field label="Plan name" value={planName} onChange={(e) => setPlanName(e.target.value)} placeholder="High-protein performance plan" />
                  <div>
                    <label htmlFor="nutrition-notes" className="mb-1.5 block text-xs font-semibold text-navy">
                      Notes
                    </label>
                    <textarea
                      id="nutrition-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Meal timing, hydration, supplements…"
                      className="w-full rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-brand-blue"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={save}
                    disabled={!planName.trim()}
                    className="flex items-center justify-center gap-2 rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {saved && <CheckIcon size={16} />}
                    {saved ? 'Saved' : 'Save plan'}
                  </button>
                </div>
              </Tile>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
