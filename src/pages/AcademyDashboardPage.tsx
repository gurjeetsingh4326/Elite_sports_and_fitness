import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { CategoryBadge } from '@/components/ui/Badge'
import { CoachMiniCard } from '@/components/coaches/CoachMiniCard'
import { CheckIcon } from '@/components/icons'
import { academyRows } from '@/data/mockDashboard'
import { programs } from '@/data/mockPrograms'
import { coaches } from '@/data/mockCoaches'
import { athletes } from '@/data/mockAthletes'

export default function AcademyDashboardPage() {
  const { academyId } = useParams()
  const academy = academyRows.find((a) => a.id === academyId)
  const [showInvite, setShowInvite] = useState(false)
  const [selectedCoach, setSelectedCoach] = useState('')
  const [invited, setInvited] = useState<string[]>([])

  if (!academy) return <Navigate to="/dashboard/academies" replace />

  const academyPrograms = programs.filter((p) => p.academyId === academyId)
  const academyCoaches = coaches.filter((c) => c.academyId === academyId)
  const academyAthletes = athletes.filter((a) => a.academyId === academyId).slice(0, 4)
  const independentCoaches = coaches.filter((c) => c.isIndependent && !invited.includes(c.id))

  function sendInvite() {
    if (!selectedCoach) return
    setInvited((prev) => [...prev, selectedCoach])
    setSelectedCoach('')
    setShowInvite(false)
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <Link to="/dashboard/academies" className="text-xs font-semibold text-muted hover:text-navy">
            ← Back to Academies
          </Link>
          <div className="mt-3 flex items-center gap-3">
            <h1 className="text-xl font-bold text-navy">{academy.name}</h1>
            <CategoryBadge category={academy.category} />
          </div>
          <p className="mt-1 text-sm text-muted">{academy.branch}</p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Tile className="bg-white p-5">
            <div className="text-2xl font-bold text-navy">{academy.athletes}</div>
            <div className="mt-1 text-xs font-semibold text-muted">Athletes</div>
          </Tile>
          <Tile className="bg-white p-5">
            <div className="text-2xl font-bold text-navy">{academy.coaches}</div>
            <div className="mt-1 text-xs font-semibold text-muted">Coaches</div>
          </Tile>
          <Tile className="bg-white p-5">
            <div className="text-2xl font-bold text-navy">{academy.batches}</div>
            <div className="mt-1 text-xs font-semibold text-muted">Batches</div>
          </Tile>
          <Tile className="bg-white p-5">
            <div className="text-2xl font-bold text-[oklch(45%_0.13_145)]">{academy.attendancePct}%</div>
            <div className="mt-1 text-xs font-semibold text-muted">Attendance</div>
          </Tile>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-navy">Programs</h2>
            </div>
            <div className="flex flex-col gap-2.5">
              {academyPrograms.map((program) => (
                <Link key={program.id} to={`/programs/${program.id}`}>
                  <Tile className="flex items-center justify-between bg-white p-4 hover:shadow-[0_8px_24px_-8px_oklch(50%_0.05_40_/_15%)]">
                    <div>
                      <div className="text-sm font-bold text-navy">{program.programName}</div>
                      <div className="text-xs text-muted">{program.levels}</div>
                    </div>
                    <span className="text-xs font-semibold text-muted">{program.batches} batches</span>
                  </Tile>
                </Link>
              ))}
            </div>

            <div className="mb-3 mt-6 flex items-center justify-between">
              <h2 className="text-sm font-bold text-navy">Athletes</h2>
              <Link to="/dashboard/athletes" className="text-xs font-semibold text-brand-blue">
                View all →
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              {academyAthletes.map((athlete) => (
                <Link key={athlete.id} to={`/dashboard/athletes/${athlete.id}`}>
                  <Tile className="flex items-center justify-between bg-white p-4 hover:shadow-[0_8px_24px_-8px_oklch(50%_0.05_40_/_15%)]">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-brand-amber">
                        {athlete.initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy">{athlete.name}</div>
                        <div className="text-xs text-muted">{athlete.batch}</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-muted">{athlete.practiceLevel}</span>
                  </Tile>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-navy">Coaches</h2>
              <button type="button" onClick={() => setShowInvite((v) => !v)} className="text-xs font-semibold text-brand-blue">
                {showInvite ? 'Cancel' : '+ Invite coach'}
              </button>
            </div>

            {showInvite && (
              <Tile className="mb-3 flex flex-col gap-2.5 bg-white p-4">
                <select
                  value={selectedCoach}
                  onChange={(e) => setSelectedCoach(e.target.value)}
                  className="rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3 py-2 text-xs text-navy outline-none focus:border-brand-blue"
                >
                  <option value="">Select an independent coach</option>
                  {independentCoaches.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.specialty}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  disabled={!selectedCoach}
                  onClick={sendInvite}
                  className="rounded-full bg-navy py-2 text-xs font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Send invite
                </button>
              </Tile>
            )}

            {invited.length > 0 && (
              <div className="mb-3 flex items-center gap-2 rounded-xl bg-[oklch(90%_0.06_145)] px-3 py-2 text-xs font-semibold text-[oklch(38%_0.1_145)]">
                <CheckIcon size={14} />
                {invited.length} invite{invited.length > 1 ? 's' : ''} sent
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {academyCoaches.map((coach) => (
                <CoachMiniCard key={coach.id} coach={coach} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
