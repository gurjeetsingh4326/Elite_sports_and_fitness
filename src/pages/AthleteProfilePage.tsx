import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { Field } from '@/components/ui/Field'
import { CategoryBadge } from '@/components/ui/Badge'
import { EditIcon, CheckIcon } from '@/components/icons'
import { Skeleton } from '@/components/ui/Skeleton'
import { athleteProfiles as seedAthleteProfiles } from '@/data/mockAthleteProfiles'
import { useDataStore } from '@/context/DataStoreContext'
import { useIdentity } from '@/context/IdentityContext'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import { initialsFromName } from '@/lib/createAthleteProfile'
import { clsx } from '@/lib/clsx'

const TABS = [
  'Overview',
  'Personal Info',
  'Attendance',
  'Performance',
  'Practice Level',
  'Training',
  'Medical',
  'Nutrition',
  'Competitions',
  'Achievements',
  'Transfer History',
  'Memberships & Payments',
] as const

type Tab = (typeof TABS)[number]

const ATTENDANCE_COLORS: Record<string, string> = {
  Present: 'text-[oklch(45%_0.13_145)]',
  Late: 'text-[oklch(58%_0.14_70)]',
  Absent: 'text-[oklch(55%_0.19_25)]',
  Excused: 'text-muted',
}

export default function AthleteProfilePage() {
  const { athleteId } = useParams()
  const [tab, setTab] = useState<Tab>('Overview')
  const { extraAthleteProfiles, updateAthlete, updateAthleteProfile } = useDataStore()
  const { role } = useIdentity()
  const athleteProfiles = { ...seedAthleteProfiles, ...extraAthleteProfiles }
  const athlete = athleteId ? athleteProfiles[athleteId] : undefined
  const loading = useSimulatedLoading(400, [athleteId])

  const canEdit = role !== 'Parent/Guardian'
  const [showEdit, setShowEdit] = useState(false)
  const [editName, setEditName] = useState('')
  const [editDob, setEditDob] = useState('')
  const [editGuardianName, setEditGuardianName] = useState('')
  const [editGuardianRelation, setEditGuardianRelation] = useState('')
  const [editGuardianPhone, setEditGuardianPhone] = useState('')
  const [editGuardianEmail, setEditGuardianEmail] = useState('')

  if (!athlete) return <Navigate to="/dashboard/athletes" replace />

  function openEdit() {
    setEditName(athlete!.name)
    setEditDob(athlete!.dob)
    setEditGuardianName(athlete!.guardian.name)
    setEditGuardianRelation(athlete!.guardian.relation)
    setEditGuardianPhone(athlete!.guardian.phone)
    setEditGuardianEmail(athlete!.guardian.email)
    setShowEdit(true)
  }

  function saveEdit() {
    if (!editName.trim() || !athleteId) return
    const initials = initialsFromName(editName)
    updateAthlete(athleteId, { name: editName.trim(), initials })
    updateAthleteProfile(athleteId, {
      name: editName.trim(),
      initials,
      dob: editDob.trim() || '—',
      guardian: {
        name: editGuardianName.trim() || '—',
        relation: editGuardianRelation.trim() || '—',
        phone: editGuardianPhone.trim() || '—',
        email: editGuardianEmail.trim() || '—',
      },
    })
    setShowEdit(false)
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <Link to="/dashboard/athletes" className="text-xs font-semibold text-muted transition-colors hover:text-navy">
            ← Back to Athletes
          </Link>

          {loading ? (
            <div className="mt-4 flex items-center gap-4">
              <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
              <div>
                <Skeleton className="h-5 w-40 rounded-lg" />
                <Skeleton className="mt-2.5 h-3.5 w-64 rounded" />
              </div>
            </div>
          ) : (
          <div className="mt-4 flex animate-fade-in flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-xl font-bold text-brand-amber transition-transform duration-300 hover:scale-105">
                {athlete.initials}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-xl font-bold text-navy">{athlete.name}</h1>
                  <CategoryBadge category={athlete.category} />
                </div>
                <p className="mt-1 text-sm text-muted">
                  {athlete.academyName} — {athlete.branch} · {athlete.programName} · {athlete.batch} · Coach{' '}
                  {athlete.coachName}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Tile className="bg-surface px-4 py-3 text-center transition-transform duration-200 hover:-translate-y-0.5">
                <div className="text-lg font-bold text-navy">{athlete.practiceLevel.split(' · ')[0]}</div>
                <div className="text-[10.5px] font-semibold text-muted">{athlete.practiceLevel.split(' · ')[1]}</div>
              </Tile>
              <Tile className="bg-surface px-4 py-3 text-center transition-transform duration-200 hover:-translate-y-0.5">
                <div className="text-lg font-bold text-[oklch(45%_0.13_145)]">{athlete.attendancePct}%</div>
                <div className="text-[10.5px] font-semibold text-muted">Attendance</div>
              </Tile>
            </div>
          </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 border-b border-[oklch(92%_0.005_90)] pb-3">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={clsx(
                'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-150',
                tab === t ? 'bg-navy text-white' : 'text-muted hover:-translate-y-0.5 hover:bg-hover',
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div key={tab} className="animate-fade-in">
        {tab === 'Overview' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Tile className="bg-white p-5 transition-shadow hover:shadow-[0_8px_20px_-10px_oklch(50%_0.05_40_/_20%)]">
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Membership</div>
              <div className="mt-1.5 text-sm font-semibold text-navy">{athlete.membership.planName}</div>
              <div className="mt-1 text-xs text-muted">{athlete.membership.status} · renews {athlete.membership.renewalDate}</div>
            </Tile>
            <Tile className="bg-white p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Latest assessment</div>
              <div className="mt-1.5 text-sm font-semibold text-navy">{athlete.performanceAssessments[0]?.date}</div>
              <p className="mt-1 text-xs text-muted">{athlete.performanceAssessments[0]?.summary}</p>
            </Tile>
            <Tile className="bg-white p-5">
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Latest achievement</div>
              <div className="mt-1.5 text-sm font-semibold text-navy">{athlete.achievements[0]?.title ?? 'None yet'}</div>
              {athlete.achievements[0] && <div className="mt-1 text-xs text-muted">{athlete.achievements[0].date}</div>}
            </Tile>
          </div>
        )}

        {tab === 'Personal Info' && (
          <div className="flex max-w-lg flex-col gap-4">
            {canEdit && (
              <button
                type="button"
                onClick={() => (showEdit ? setShowEdit(false) : openEdit())}
                className="flex w-fit items-center gap-1.5 rounded-full border border-[oklch(90%_0.005_90)] bg-white px-4 py-2 text-xs font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-hover"
              >
                <EditIcon size={14} />
                {showEdit ? 'Cancel edit' : 'Edit personal info'}
              </button>
            )}

            {showEdit && (
              <Tile className="flex animate-fade-in-scale flex-col gap-4 bg-white p-6">
                <Field label="Full name" value={editName} onChange={(e) => setEditName(e.target.value)} />
                <Field label="Date of birth" value={editDob} onChange={(e) => setEditDob(e.target.value)} placeholder="YYYY-MM-DD" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Guardian name" value={editGuardianName} onChange={(e) => setEditGuardianName(e.target.value)} />
                  <Field label="Relation" value={editGuardianRelation} onChange={(e) => setEditGuardianRelation(e.target.value)} placeholder="Mother" />
                  <Field label="Guardian phone" value={editGuardianPhone} onChange={(e) => setEditGuardianPhone(e.target.value)} />
                  <Field label="Guardian email" value={editGuardianEmail} onChange={(e) => setEditGuardianEmail(e.target.value)} />
                </div>
                <button
                  type="button"
                  onClick={saveEdit}
                  disabled={!editName.trim()}
                  className="flex items-center justify-center gap-2 rounded-full bg-navy py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  <CheckIcon size={15} />
                  Save changes
                </button>
              </Tile>
            )}

            <Tile className="bg-white p-6">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-muted">Date of birth</div>
                  <div className="mt-1 text-sm font-semibold text-navy">{athlete.dob}</div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-muted">Member since</div>
                  <div className="mt-1 text-sm font-semibold text-navy">{athlete.memberSince}</div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-muted">Guardian</div>
                  <div className="mt-1 text-sm font-semibold text-navy">
                    {athlete.guardian.name} ({athlete.guardian.relation})
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-muted">Guardian contact</div>
                  <div className="mt-1 text-sm font-semibold text-navy">{athlete.guardian.phone}</div>
                  <div className="text-xs text-muted">{athlete.guardian.email}</div>
                </div>
              </div>
            </Tile>
          </div>
        )}

        {tab === 'Attendance' && (
          <Tile className="bg-white p-2">
            <div className="grid grid-cols-[1fr_2fr_1fr] gap-3 px-4 py-3 text-[10.5px] font-bold uppercase tracking-wide text-muted">
              <span>Date</span>
              <span>Session</span>
              <span>Status</span>
            </div>
            {athlete.attendanceHistory.map((entry) => (
              <div key={entry.date + entry.session} className="grid grid-cols-[1fr_2fr_1fr] items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-hover">
                <span className="text-xs text-muted">{entry.date}</span>
                <span className="text-sm text-navy">{entry.session}</span>
                <span className={clsx('text-xs font-bold', ATTENDANCE_COLORS[entry.status])}>{entry.status}</span>
              </div>
            ))}
          </Tile>
        )}

        {tab === 'Performance' && (
          <div className="flex flex-col gap-3">
            {athlete.performanceAssessments.map((a) => (
              <Tile key={a.date} className="bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-navy">{a.date}</span>
                  {a.recommendedLevel && (
                    <span className="rounded-full bg-brand-amber-tile px-2.5 py-0.5 text-[11px] font-bold text-brand-amber-ink">
                      Recommended: {a.recommendedLevel}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">{a.summary}</p>
                <div className="mt-2 text-xs font-semibold text-muted">Assessed by {a.coachName}</div>
              </Tile>
            ))}
          </div>
        )}

        {tab === 'Practice Level' && (
          <Tile className="max-w-lg bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Current level</div>
              <span className="rounded-full bg-brand-amber-tile px-3 py-1 text-xs font-bold text-brand-amber-ink">
                {athlete.practiceLevel}
              </span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wide text-muted">Promotion history</div>
            <div className="mt-3 flex flex-col gap-3">
              {athlete.practiceLevelHistory.map((h) => (
                <div key={h.date} className="flex items-center justify-between border-b border-[oklch(94%_0.003_90)] pb-3 last:border-0">
                  <div>
                    <div className="text-sm font-semibold text-navy">{h.level}</div>
                    <div className="text-xs text-muted">Promoted by {h.promotedBy}</div>
                  </div>
                  <span className="text-xs text-muted">{h.date}</span>
                </div>
              ))}
            </div>
          </Tile>
        )}

        {tab === 'Training' && (
          <Tile className="max-w-lg bg-white p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-muted">Current focus</div>
            <div className="mt-1.5 text-sm font-semibold text-navy">{athlete.trainingPlan.focus}</div>
            <div className="mt-4 text-xs font-bold uppercase tracking-wide text-muted">Sessions per week</div>
            <div className="mt-1.5 text-sm font-semibold text-navy">{athlete.trainingPlan.sessionsPerWeek}</div>
            <div className="mt-4 text-xs font-bold uppercase tracking-wide text-muted">Notes</div>
            <p className="mt-1.5 text-sm text-muted">{athlete.trainingPlan.notes}</p>
          </Tile>
        )}

        {tab === 'Medical' && (
          <Tile className="max-w-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Training status</div>
              <span
                className={clsx(
                  'rounded-full px-3 py-1 text-xs font-bold',
                  athlete.medical.status === 'Cleared'
                    ? 'bg-[oklch(90%_0.06_145)] text-[oklch(38%_0.1_145)]'
                    : 'bg-[oklch(92%_0.06_45)] text-[oklch(45%_0.14_45)]',
                )}
              >
                {athlete.medical.status}
              </span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wide text-muted">Last session</div>
            <div className="mt-1.5 text-sm font-semibold text-navy">
              {athlete.medical.lastSession} — {athlete.medical.physicianName}
            </div>
            <p className="mt-3 text-sm text-muted">{athlete.medical.notes}</p>
            <p className="mt-4 text-[11px] text-muted">
              Medical data is role-restricted — only the physician and explicitly authorized roles can view this
              section.
            </p>
          </Tile>
        )}

        {tab === 'Nutrition' && (
          <Tile className="max-w-lg bg-white p-6">
            <div className="text-xs font-bold uppercase tracking-wide text-muted">Plan</div>
            <div className="mt-1.5 text-sm font-semibold text-navy">{athlete.nutrition.planName}</div>
            <div className="mt-4 text-xs font-bold uppercase tracking-wide text-muted">Notes</div>
            <p className="mt-1.5 text-sm text-muted">{athlete.nutrition.notes}</p>
          </Tile>
        )}

        {tab === 'Competitions' && (
          <Tile className="bg-white p-2">
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 px-4 py-3 text-[10.5px] font-bold uppercase tracking-wide text-muted">
              <span>Competition</span>
              <span>Date</span>
              <span>Result</span>
            </div>
            {athlete.competitions.map((c) => (
              <div key={c.name + c.date} className="grid grid-cols-[2fr_1fr_1fr] items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-hover">
                <span className="text-sm text-navy">{c.name}</span>
                <span className="text-xs text-muted">{c.date}</span>
                <span className="text-xs font-bold text-navy">{c.result}</span>
              </div>
            ))}
          </Tile>
        )}

        {tab === 'Achievements' && (
          <div className="flex flex-col gap-3">
            {athlete.achievements.map((a) => (
              <Tile key={a.title} className="flex items-center justify-between bg-white p-5">
                <span className="text-sm font-semibold text-navy">{a.title}</span>
                <span className="text-xs text-muted">{a.date}</span>
              </Tile>
            ))}
          </div>
        )}

        {tab === 'Transfer History' && (
          <Tile className="max-w-lg bg-white p-6">
            {athlete.transferHistory.length === 0 ? (
              <p className="text-sm text-muted">No transfers on record — {athlete.name} has trained at {athlete.academyName} since {athlete.memberSince}.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {athlete.transferHistory.map((t) => (
                  <div key={t.date} className="border-b border-[oklch(94%_0.003_90)] pb-3 last:border-0">
                    <div className="text-sm font-semibold text-navy">
                      {t.fromAcademy} → {t.toAcademy}
                    </div>
                    <div className="text-xs text-muted">{t.date} · {t.reason}</div>
                  </div>
                ))}
              </div>
            )}
          </Tile>
        )}

        {tab === 'Memberships & Payments' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Tile className="bg-white p-6">
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Membership</div>
              <div className="mt-1.5 text-base font-bold text-navy">{athlete.membership.planName}</div>
              <div className="mt-1 text-xs text-muted">{athlete.membership.status} · renews {athlete.membership.renewalDate}</div>
            </Tile>
            <Tile className="bg-white p-2">
              <div className="grid grid-cols-3 gap-3 px-4 py-3 text-[10.5px] font-bold uppercase tracking-wide text-muted">
                <span>Date</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {athlete.payments.map((p) => (
                <div key={p.date} className="grid grid-cols-3 items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-hover">
                  <span className="text-xs text-muted">{p.date}</span>
                  <span className="text-sm font-semibold text-navy">{p.amount}</span>
                  <span className="text-xs font-bold text-[oklch(45%_0.13_145)]">{p.status}</span>
                </div>
              ))}
            </Tile>
          </div>
        )}
        </div>
      </div>
    </AppShell>
  )
}
