import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { Field } from '@/components/ui/Field'
import { Select } from '@/components/ui/Select'
import { ImageUploadField } from '@/components/ui/ImageUploadField'
import { CategoryBadge } from '@/components/ui/Badge'
import { useAcademiesForOrg, useAthletesForOrg, useCoachesForOrg, useProgramsForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'
import { useDataStore } from '@/context/DataStoreContext'
import { buildDefaultAthleteProfile, initialsFromName } from '@/lib/createAthleteProfile'
import type { AcademyCategory } from '@/types/dashboard'
import type { AthleteRow } from '@/types/athlete'
import type { CoachSummary } from '@/types/coach'

type Role = 'Athlete' | 'Coach'

export default function UsersPage() {
  const { currentOrg } = useOrg()
  const { classes, addAthlete, addCoach, setClassStudents } = useDataStore()
  const academyRows = useAcademiesForOrg(currentOrg.id)
  const athletes = useAthletesForOrg(currentOrg.id)
  const coaches = useCoachesForOrg(currentOrg.id)
  const programs = useProgramsForOrg(currentOrg.id)

  const [showForm, setShowForm] = useState(false)
  const [role, setRole] = useState<Role>('Athlete')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [academyId, setAcademyId] = useState('')
  const [classId, setClassId] = useState('')
  const [specialty, setSpecialty] = useState<AcademyCategory | ''>('')

  const academy = academyRows.find((a) => a.id === academyId)
  const academyClasses = useMemo(() => classes.filter((c) => c.academyId === academyId), [classes, academyId])
  const selectedClass = academyClasses.find((c) => c.id === classId)

  function selectAcademy(id: string) {
    setAcademyId(id)
    setClassId('')
    const a = academyRows.find((row) => row.id === id)
    setSpecialty(a?.categories[0] ?? '')
  }

  function resetForm() {
    setShowForm(false)
    setRole('Athlete')
    setName('')
    setEmail('')
    setPhone('')
    setAvatarUrl(null)
    setAcademyId('')
    setClassId('')
    setSpecialty('')
  }

  function createUser() {
    if (!name.trim() || !academy) return
    const id = `${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${athletes.length + coaches.length}`
    const initials = initialsFromName(name)

    if (role === 'Athlete') {
      const category = selectedClass?.category ?? academy.categories[0]
      const matchingProgram = programs.find((p) => p.academyId === academy.id && p.category === category)
      const athlete: AthleteRow = {
        id,
        name: name.trim(),
        initials,
        academyId: academy.id,
        academyName: academy.name,
        category,
        programId: matchingProgram?.id ?? '',
        batch: selectedClass?.name ?? 'Unassigned',
        coachName: selectedClass?.coachName ?? '—',
        practiceLevel: 'Level 1 · Beginner',
        attendancePct: 0,
      }
      addAthlete(athlete, buildDefaultAthleteProfile(athlete, academy.branch, matchingProgram?.programName ?? ''))
      if (selectedClass) setClassStudents(selectedClass.id, [...selectedClass.studentIds, id])
    } else {
      const coach: CoachSummary = {
        id,
        name: name.trim(),
        initials,
        specialty: (specialty || academy.categories[0]) as AcademyCategory,
        bio: `Coach at ${academy.name}.`,
        isIndependent: false,
        academyId: academy.id,
        academyName: academy.name,
        certifications: [],
      }
      addCoach(coach)
    }

    resetForm()
  }

  const rows = [
    ...athletes.map((a) => ({ kind: 'Athlete' as const, id: a.id, name: a.name, initials: a.initials, category: a.category, academyName: a.academyName })),
    ...coaches.map((c) => ({ kind: 'Coach' as const, id: c.id, name: c.name, initials: c.initials, category: c.specialty, academyName: c.academyName ?? '—' })),
  ]

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-navy">Users</h1>
            <p className="mt-1 text-sm text-muted">
              {rows.length} people across {currentOrg.name} — {athletes.length} athletes, {coaches.length} coaches
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light"
          >
            {showForm ? 'Cancel' : '+ Add user'}
          </button>
        </div>

        {showForm && (
          <Tile className="flex max-w-2xl flex-col gap-4 bg-white p-6">
            <div className="flex gap-2">
              {(['Athlete', 'Coach'] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    role === r ? 'bg-navy text-white' : 'bg-surface text-muted hover:bg-hover'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <ImageUploadField label="Photo" value={avatarUrl} onChange={setAvatarUrl} shape="circle" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Reyes" />
              <Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jordan@example.com" />
              <Field label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 000 0000" />
              <Select label="Academy" value={academyId} onChange={(e) => selectAcademy(e.target.value)}>
                <option value="">Select academy</option>
                {academyRows.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.branch}
                  </option>
                ))}
              </Select>
            </div>

            {role === 'Athlete' && academy && (
              <Select label="Assign to class (optional)" value={classId} onChange={(e) => setClassId(e.target.value)}>
                <option value="">No class yet</option>
                {academyClasses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.coachName}
                  </option>
                ))}
              </Select>
            )}

            {role === 'Coach' && academy && (
              <Select label="Specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value as AcademyCategory)}>
                {academy.categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            )}

            <button
              type="button"
              onClick={createUser}
              disabled={!name.trim() || !academy}
              className="rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
            >
              Create {role.toLowerCase()}
            </button>
          </Tile>
        )}

        <Tile className="bg-white p-2">
          <div className="grid grid-cols-[2fr_1fr_1.4fr_1.2fr] gap-3 px-4 py-3 text-[10.5px] font-bold uppercase tracking-wide text-muted">
            <span>Name</span>
            <span>Role</span>
            <span>Academy</span>
            <span>Category</span>
          </div>
          {rows.map((row) => (
            <Link
              key={`${row.kind}-${row.id}`}
              to={row.kind === 'Athlete' ? `/dashboard/athletes/${row.id}` : `/coaches/${row.id}`}
              className="grid grid-cols-[2fr_1fr_1.4fr_1.2fr] items-center gap-3 rounded-xl px-4 py-3 hover:bg-hover"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-brand-amber">
                  {row.initials}
                </div>
                <span className="text-sm font-semibold text-navy">{row.name}</span>
              </div>
              <span className="text-xs font-semibold text-muted">{row.kind}</span>
              <span className="truncate text-xs text-muted">{row.academyName}</span>
              <CategoryBadge category={row.category} />
            </Link>
          ))}
          {rows.length === 0 && <p className="py-10 text-center text-sm text-muted">No users yet.</p>}
        </Tile>
      </div>
    </AppShell>
  )
}
