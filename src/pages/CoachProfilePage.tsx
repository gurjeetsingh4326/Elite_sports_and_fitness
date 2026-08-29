import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Tile } from '@/components/ui/Tile'
import { Select } from '@/components/ui/Select'
import { CategoryBadge } from '@/components/ui/Badge'
import { ReelThumb } from '@/components/reels/ReelThumb'
import { ReelsIcon, CheckIcon } from '@/components/icons'
import { coaches } from '@/data/mockCoaches'
import { reels } from '@/data/mockReels'
import { academyRows } from '@/data/mockDashboard'

export default function CoachProfilePage() {
  const { coachId } = useParams()
  const coach = coaches.find((c) => c.id === coachId)
  const [selectedAcademy, setSelectedAcademy] = useState('')
  const [applied, setApplied] = useState(false)

  if (!coach) return <Navigate to="/coaches" replace />

  const coachReels = reels.filter((r) => r.authorId === coach.id)

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-6">
        <Link to="/coaches" className="text-xs font-semibold text-muted hover:text-navy">
          ← Back to Coaches
        </Link>

        <div className="mt-4 flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy text-2xl font-bold text-brand-amber">
            {coach.initials}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-navy">{coach.name}</h1>
              <CategoryBadge category={coach.specialty} />
            </div>
            <p className="mt-1 text-sm text-muted">
              {coach.isIndependent ? 'Independent coach' : `Coach at ${coach.academyName}`}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-6 md:col-span-2">
            <Tile className="bg-white p-6">
              <h2 className="text-base font-bold text-navy">Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{coach.bio}</p>
            </Tile>

            <Tile className="bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-navy">Reels</h2>
                <ReelsIcon size={18} className="text-muted" />
              </div>
              {coachReels.length === 0 ? (
                <p className="text-sm text-muted">This coach hasn&apos;t posted any Reels yet.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {coachReels.map((reel) => (
                    <Link key={reel.id} to={`/reels/${reel.id}`}>
                      <ReelThumb reel={reel} />
                    </Link>
                  ))}
                </div>
              )}
            </Tile>
          </div>

          <div className="flex flex-col gap-4">
            <Tile className="bg-surface p-6">
              <div className="text-xs font-bold uppercase tracking-wide text-muted">Affiliation</div>
              <div className="mt-1.5 text-sm font-semibold text-navy">
                {coach.isIndependent ? 'Not affiliated with an academy' : coach.academyName}
              </div>
              {coach.isIndependent && (
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Registered independently — can join an academy any time without losing this
                  profile.
                </p>
              )}
            </Tile>

            {coach.isIndependent && (
              <Tile className="bg-white p-6">
                <div className="text-xs font-bold uppercase tracking-wide text-muted">Apply to an academy</div>
                {applied ? (
                  <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[oklch(45%_0.13_145)]">
                    <CheckIcon size={16} />
                    Application sent — Org will review and respond.
                  </div>
                ) : (
                  <div className="mt-3 flex flex-col gap-3">
                    <Select label="Academy" value={selectedAcademy} onChange={(e) => setSelectedAcademy(e.target.value)}>
                      <option value="">Select an academy</option>
                      {academyRows.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} — {a.branch}
                        </option>
                      ))}
                    </Select>
                    <button
                      type="button"
                      disabled={!selectedAcademy}
                      onClick={() => setApplied(true)}
                      className="rounded-full bg-navy py-2.5 text-sm font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Send application
                    </button>
                  </div>
                )}
              </Tile>
            )}

            <Tile className="bg-surface p-6">
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Certifications</div>
              <div className="flex flex-wrap gap-1.5">
                {coach.certifications.map((cert) => (
                  <span key={cert} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-navy">
                    {cert}
                  </span>
                ))}
              </div>
            </Tile>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
