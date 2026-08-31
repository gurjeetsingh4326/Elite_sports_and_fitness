import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { Select } from '@/components/ui/Select'
import { CheckIcon } from '@/components/icons'
import { athleteProfiles } from '@/data/mockAthleteProfiles'
import { PRACTICE_LEVELS, type PracticeLevel } from '@/types/athlete'
import { useAthletesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'

interface DraftMetrics {
  technical: number
  tactical: number
  fitness: number
}

const METRIC_LABELS: Record<keyof DraftMetrics, string> = {
  technical: 'Technical Skill',
  tactical: 'Tactical Awareness',
  fitness: 'Fitness Level',
}

export default function PerformancePage() {
  const { currentOrg } = useOrg()
  const athletes = useAthletesForOrg(currentOrg.id)
  const [athleteId, setAthleteId] = useState('')
  const [metrics, setMetrics] = useState<DraftMetrics>({ technical: 6, tactical: 6, fitness: 6 })
  const [feedback, setFeedback] = useState('')
  const [recommendedLevel, setRecommendedLevel] = useState<PracticeLevel | ''>('')
  const [savedCount, setSavedCount] = useState(0)

  const athlete = athletes.find((a) => a.id === athleteId)
  const profile = athleteId ? athleteProfiles[athleteId] : undefined

  function selectAthlete(id: string) {
    setAthleteId(id)
    setFeedback('')
    setMetrics({ technical: 6, tactical: 6, fitness: 6 })
    setRecommendedLevel(athleteProfiles[id]?.practiceLevel ?? '')
    setSavedCount(0)
  }

  function save() {
    setSavedCount((n) => n + 1)
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-navy">Performance</h1>
          <p className="mt-1 text-sm text-muted">Select an athlete to create an assessment or review their history.</p>
        </div>

        <Tile className="max-w-md bg-white p-6">
          <Select label="Athlete" value={athleteId} onChange={(e) => selectAthlete(e.target.value)}>
            <option value="">Select athlete</option>
            {athletes.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} — {a.academyName}
              </option>
            ))}
          </Select>
        </Tile>

        {athlete && profile && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Tile className="bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-navy">New assessment</h2>
                <span className="text-xs font-semibold text-muted">Current: {athlete.practiceLevel}</span>
              </div>

              <div className="flex flex-col gap-4">
                {(Object.keys(metrics) as (keyof DraftMetrics)[]).map((key) => (
                  <div key={key}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label htmlFor={key} className="text-xs font-semibold text-navy">
                        {METRIC_LABELS[key]}
                      </label>
                      <span className="text-xs font-bold text-brand-blue">{metrics[key]}/10</span>
                    </div>
                    <input
                      id={key}
                      type="range"
                      min={1}
                      max={10}
                      value={metrics[key]}
                      onChange={(e) => setMetrics((m) => ({ ...m, [key]: Number(e.target.value) }))}
                      className="w-full accent-[oklch(64%_0.17_255)]"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="feedback" className="mb-1.5 block text-xs font-semibold text-navy">
                    Feedback
                  </label>
                  <textarea
                    id="feedback"
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="What did you observe in this session?"
                    className="w-full rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-brand-blue"
                  />
                </div>

                <Select
                  label="Recommend practice level"
                  value={recommendedLevel}
                  onChange={(e) => setRecommendedLevel(e.target.value as PracticeLevel)}
                >
                  {PRACTICE_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </Select>

                <button
                  type="button"
                  onClick={save}
                  disabled={!feedback}
                  className="mt-1 flex items-center justify-center gap-2 rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {savedCount > 0 && <CheckIcon size={16} />}
                  {savedCount > 0 ? `Saved (${savedCount})` : 'Save assessment'}
                </button>
              </div>
            </Tile>

            <div>
              <h2 className="mb-3 text-sm font-bold text-navy">Assessment history</h2>
              <div className="flex flex-col gap-3">
                {profile.performanceAssessments.map((a) => (
                  <Tile key={a.date} className="bg-white p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-navy">{a.date}</span>
                      {a.recommendedLevel && (
                        <span className="rounded-full bg-brand-amber-tile px-2.5 py-0.5 text-[11px] font-bold text-brand-amber-ink">
                          {a.recommendedLevel}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted">{a.summary}</p>
                    <div className="mt-2 text-xs font-semibold text-muted">Assessed by {a.coachName}</div>
                  </Tile>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
