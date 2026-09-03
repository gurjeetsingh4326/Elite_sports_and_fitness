import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { Field } from '@/components/ui/Field'
import { CategoryBadgeList } from '@/components/ui/Badge'
import { CategoryMultiSelect } from '@/components/ui/CategoryMultiSelect'
import { ImageUploadField } from '@/components/ui/ImageUploadField'
import { CoachMiniCard } from '@/components/coaches/CoachMiniCard'
import { Skeleton } from '@/components/ui/Skeleton'
import { SkeletonRowList, SkeletonStatGrid } from '@/components/ui/SkeletonBlocks'
import { CheckIcon, ImagePlaceholderIcon, MapPinIcon, ClockIcon, EditIcon } from '@/components/icons'
import { useAcademiesForOrg, useProgramsForOrg, useCoachesForOrg, useAthletesForOrg, useFacilitiesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'
import { useDataStore } from '@/context/DataStoreContext'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import type { AcademyCategory } from '@/types/dashboard'

export default function AcademyDashboardPage() {
  const { academyId } = useParams()
  const { currentOrg } = useOrg()
  const { classes, addProgram, addFacility, updateAcademy } = useDataStore()
  const academyRows = useAcademiesForOrg(currentOrg.id)
  const programs = useProgramsForOrg(currentOrg.id)
  const coaches = useCoachesForOrg(currentOrg.id)
  const athletes = useAthletesForOrg(currentOrg.id)
  const facilities = useFacilitiesForOrg(currentOrg.id)
  const loading = useSimulatedLoading(420, [academyId])

  const academy = academyRows.find((a) => a.id === academyId)
  const [showInvite, setShowInvite] = useState(false)
  const [selectedCoach, setSelectedCoach] = useState('')
  const [invited, setInvited] = useState<string[]>([])

  const [showEdit, setShowEdit] = useState(false)
  const [editName, setEditName] = useState('')
  const [editBranch, setEditBranch] = useState('')
  const [editCategories, setEditCategories] = useState<AcademyCategory[]>([])
  const [editImageUrl, setEditImageUrl] = useState<string | null>(null)

  const [showAddProgram, setShowAddProgram] = useState(false)
  const [programName, setProgramName] = useState('')
  const [programCategory, setProgramCategory] = useState<AcademyCategory>('Football')
  const [programLevels, setProgramLevels] = useState('')
  const [programDescription, setProgramDescription] = useState('')

  const [showAddFacility, setShowAddFacility] = useState(false)
  const [facilityName, setFacilityName] = useState('')
  const [facilityCategory, setFacilityCategory] = useState<AcademyCategory>('Football')
  const [facilityCapacity, setFacilityCapacity] = useState('')
  const [facilityDescription, setFacilityDescription] = useState('')

  if (!academy) return <Navigate to="/dashboard/academies" replace />

  const academyPrograms = programs.filter((p) => p.academyId === academyId)
  const academyFacilities = facilities.filter((f) => f.academyId === academyId)
  const academyCoaches = coaches.filter((c) => c.academyId === academyId)
  const academyAthletes = athletes.filter((a) => a.academyId === academyId).slice(0, 4)
  const academyClasses = classes.filter((c) => c.academyId === academyId)
  const independentCoaches = coaches.filter((c) => c.isIndependent && !invited.includes(c.id))

  function sendInvite() {
    if (!selectedCoach) return
    setInvited((prev) => [...prev, selectedCoach])
    setSelectedCoach('')
    setShowInvite(false)
  }

  function openEdit() {
    setEditName(academy!.name)
    setEditBranch(academy!.branch)
    setEditCategories(academy!.categories)
    setEditImageUrl(academy!.imageUrl)
    setShowEdit(true)
  }

  function saveEdit() {
    if (!editName.trim() || !editBranch.trim() || editCategories.length === 0) return
    updateAcademy(academy!.id, {
      name: editName.trim(),
      branch: editBranch.trim(),
      categories: editCategories,
      imageUrl: editImageUrl,
    })
    setShowEdit(false)
  }

  function createProgram() {
    if (!programName.trim() || !programLevels.trim()) return
    const id = `${programName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${academy!.id}`
    addProgram({
      id,
      academyId: academy!.id,
      academyName: academy!.name,
      branch: academy!.branch,
      category: programCategory,
      programName: programName.trim(),
      description: programDescription.trim() || 'No description yet.',
      levels: programLevels.trim(),
      batches: 0,
    })
    setShowAddProgram(false)
    setProgramName('')
    setProgramLevels('')
    setProgramDescription('')
  }

  function createFacility() {
    if (!facilityName.trim() || !facilityCapacity.trim()) return
    const id = `${facilityName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${academy!.id}`
    addFacility({
      id,
      academyId: academy!.id,
      name: facilityName.trim(),
      academyName: academy!.name,
      branch: academy!.branch,
      category: facilityCategory,
      description: facilityDescription.trim() || 'No description yet.',
      capacity: facilityCapacity.trim(),
    })
    setShowAddFacility(false)
    setFacilityName('')
    setFacilityCapacity('')
    setFacilityDescription('')
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link to="/dashboard/academies" className="text-xs font-semibold text-muted hover:text-navy">
              ← Back to Academies
            </Link>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface">
                {academy.imageUrl ? (
                  <img src={academy.imageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <ImagePlaceholderIcon size={22} className="text-muted" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-navy">{academy.name}</h1>
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <MapPinIcon size={14} />
                  {academy.branch}
                </div>
                <div className="mt-2">
                  <CategoryBadgeList categories={academy.categories} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => (showEdit ? setShowEdit(false) : openEdit())}
              className="flex items-center gap-1.5 rounded-full border border-[oklch(90%_0.005_90)] bg-white px-4 py-2.5 text-sm font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-hover"
            >
              <EditIcon size={15} />
              {showEdit ? 'Cancel edit' : 'Edit academy'}
            </button>
            <Link
              to={`/dashboard/academies/${academyId}/classes`}
              className="flex items-center gap-1.5 rounded-full border border-[oklch(90%_0.005_90)] bg-white px-4 py-2.5 text-sm font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-hover"
            >
              <ClockIcon size={15} />
              Classes ({academyClasses.length})
            </Link>
          </div>
        </div>

        {showEdit && (
          <Tile className="flex max-w-2xl animate-fade-in-scale flex-col gap-4 bg-white p-6">
            <ImageUploadField label="Academy photo" value={editImageUrl} onChange={setEditImageUrl} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Academy name" value={editName} onChange={(e) => setEditName(e.target.value)} />
              <Field label="Branch / location" value={editBranch} onChange={(e) => setEditBranch(e.target.value)} />
            </div>
            <CategoryMultiSelect label="Categories" selected={editCategories} onChange={setEditCategories} />
            <button
              type="button"
              onClick={saveEdit}
              disabled={!editName.trim() || !editBranch.trim() || editCategories.length === 0}
              className="rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save changes
            </button>
          </Tile>
        )}

        {loading && (
          <>
            <SkeletonStatGrid />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col gap-3 md:col-span-2">
                <Skeleton className="h-4 w-24 rounded" />
                <SkeletonRowList count={3} />
              </div>
              <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-24 rounded" />
                <SkeletonRowList count={3} />
              </div>
            </div>
          </>
        )}

        {!loading && (
        <>
        <div className="grid animate-fade-in grid-cols-2 gap-4 sm:grid-cols-4">
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
              <button type="button" onClick={() => setShowAddProgram((v) => !v)} className="text-xs font-semibold text-brand-blue">
                {showAddProgram ? 'Cancel' : '+ Add program'}
              </button>
            </div>

            {showAddProgram && (
              <Tile className="mb-3 flex animate-fade-in-scale flex-col gap-3 bg-white p-4">
                <Field label="Program name" value={programName} onChange={(e) => setProgramName(e.target.value)} placeholder="Youth Development" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-navy">Category</span>
                    <select
                      value={programCategory}
                      onChange={(e) => setProgramCategory(e.target.value as AcademyCategory)}
                      className="rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-brand-blue"
                    >
                      {academy.categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Field label="Levels" value={programLevels} onChange={(e) => setProgramLevels(e.target.value)} placeholder="Beginner – Elite" />
                </div>
                <Field label="Description" value={programDescription} onChange={(e) => setProgramDescription(e.target.value)} placeholder="What this program covers" />
                <button
                  type="button"
                  onClick={createProgram}
                  disabled={!programName.trim() || !programLevels.trim()}
                  className="rounded-full bg-navy py-2.5 text-xs font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Create program
                </button>
              </Tile>
            )}

            <div className="flex flex-col gap-2.5">
              {academyPrograms.map((program) => (
                <Link key={program.id} to={`/programs/${program.id}`}>
                  <Tile className="flex items-center justify-between bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_oklch(50%_0.05_40_/_20%)]">
                    <div>
                      <div className="text-sm font-bold text-navy">{program.programName}</div>
                      <div className="text-xs text-muted">{program.levels}</div>
                    </div>
                    <span className="text-xs font-semibold text-muted">{program.batches} batches</span>
                  </Tile>
                </Link>
              ))}
              {academyPrograms.length === 0 && (
                <Tile className="bg-white p-4 text-center text-xs text-muted">No programs yet.</Tile>
              )}
            </div>

            <div className="mb-3 mt-6 flex items-center justify-between">
              <h2 className="text-sm font-bold text-navy">Facilities</h2>
              <button type="button" onClick={() => setShowAddFacility((v) => !v)} className="text-xs font-semibold text-brand-blue">
                {showAddFacility ? 'Cancel' : '+ Add facility'}
              </button>
            </div>

            {showAddFacility && (
              <Tile className="mb-3 flex animate-fade-in-scale flex-col gap-3 bg-white p-4">
                <Field label="Facility name" value={facilityName} onChange={(e) => setFacilityName(e.target.value)} placeholder="Main Pitch" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-navy">Category</span>
                    <select
                      value={facilityCategory}
                      onChange={(e) => setFacilityCategory(e.target.value as AcademyCategory)}
                      className="rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-brand-blue"
                    >
                      {academy.categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Field label="Capacity" value={facilityCapacity} onChange={(e) => setFacilityCapacity(e.target.value)} placeholder="22 players" />
                </div>
                <Field label="Description" value={facilityDescription} onChange={(e) => setFacilityDescription(e.target.value)} placeholder="What this facility offers" />
                <button
                  type="button"
                  onClick={createFacility}
                  disabled={!facilityName.trim() || !facilityCapacity.trim()}
                  className="rounded-full bg-navy py-2.5 text-xs font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Add facility
                </button>
              </Tile>
            )}

            <div className="flex flex-col gap-2.5">
              {academyFacilities.map((facility) => (
                <Tile key={facility.id} className="flex items-center justify-between bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_oklch(50%_0.05_40_/_20%)]">
                  <div>
                    <div className="text-sm font-bold text-navy">{facility.name}</div>
                    <div className="text-xs text-muted">{facility.description}</div>
                  </div>
                  <span className="text-xs font-semibold text-muted">{facility.capacity}</span>
                </Tile>
              ))}
              {academyFacilities.length === 0 && (
                <Tile className="bg-white p-4 text-center text-xs text-muted">No facilities yet.</Tile>
              )}
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
                  <Tile className="flex items-center justify-between bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_oklch(50%_0.05_40_/_20%)]">
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
              {academyAthletes.length === 0 && (
                <Tile className="bg-white p-4 text-center text-xs text-muted">No athletes yet.</Tile>
              )}
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
              <Tile className="mb-3 flex animate-fade-in-scale flex-col gap-2.5 bg-white p-4">
                <select
                  aria-label="Select an independent coach to invite"
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
              <div className="mb-3 flex animate-pop-in items-center gap-2 rounded-xl bg-[oklch(90%_0.06_145)] px-3 py-2 text-xs font-semibold text-[oklch(38%_0.1_145)]">
                <CheckIcon size={14} />
                {invited.length} invite{invited.length > 1 ? 's' : ''} sent
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {academyCoaches.map((coach) => (
                <CoachMiniCard key={coach.id} coach={coach} />
              ))}
              {academyCoaches.length === 0 && (
                <Tile className="bg-white p-4 text-center text-xs text-muted">No coaches yet.</Tile>
              )}
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </AppShell>
  )
}
