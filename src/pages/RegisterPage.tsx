import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field } from '@/components/ui/Field'
import { Select } from '@/components/ui/Select'
import { useOrg } from '@/context/OrgContext'
import { useIdentity } from '@/context/IdentityContext'
import { useDataStore } from '@/context/DataStoreContext'
import { useAcademiesForOrg } from '@/lib/orgScope'
import { buildDefaultAthleteProfile, initialsFromName } from '@/lib/createAthleteProfile'
import type { AthleteRow } from '@/types/athlete'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { organizations, setCurrentOrgId } = useOrg()
  const { setRole, setAthleteId } = useIdentity()
  const { addAthlete } = useDataStore()

  const [orgId, setOrgId] = useState(organizations[0]?.id ?? '')
  const [academyId, setAcademyId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const academies = useAcademiesForOrg(orgId)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const academy = academies.find((a) => a.id === academyId)
    if (!name.trim() || !academy) {
      setError('Pick an academy to join.')
      return
    }

    const id = `${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-self`
    const athlete: AthleteRow = {
      id,
      name: name.trim(),
      initials: initialsFromName(name),
      academyId: academy.id,
      academyName: academy.name,
      category: academy.categories[0],
      programId: '',
      batch: 'Unassigned',
      coachName: '—',
      practiceLevel: 'Level 1 · Beginner',
      attendancePct: 0,
    }
    addAthlete(athlete, buildDefaultAthleteProfile(athlete, academy.branch, ''))
    setCurrentOrgId(orgId)
    setRole('Athlete/Member')
    setAthleteId(id)
    navigate('/dashboard')
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register as an athlete or guardian to join an academy."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-navy underline underline-offset-4">
            Log in
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Field label="Full name" type="text" name="name" placeholder="Jane Athlete" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Field label="Email" type="email" name="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field label="Phone" type="tel" name="phone" placeholder="+1 555 000 0000" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <Select
          label="Organization"
          value={orgId}
          onChange={(e) => {
            setOrgId(e.target.value)
            setAcademyId('')
          }}
        >
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </Select>
        <Select label="Academy to join" value={academyId} onChange={(e) => setAcademyId(e.target.value)}>
          <option value="">Select an academy</option>
          {academies.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} — {a.branch}
            </option>
          ))}
        </Select>

        <Field label="Password" type="password" name="password" placeholder="••••••••" autoComplete="new-password" />

        {error && <p className="text-xs font-semibold text-[oklch(55%_0.19_25)]">{error}</p>}

        <button
          type="submit"
          className="mt-2 rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light"
        >
          Create account
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-2.5 rounded-xl bg-surface px-4 py-3.5 text-xs text-muted">
        <div>
          Coaching independently, without an academy yet?{' '}
          <Link to="/register-coach" className="font-semibold text-navy underline underline-offset-4">
            Register as a coach
          </Link>
          {' '}instead.
        </div>
        <div>
          Running a sports business with your own academies?{' '}
          <Link to="/register-organization" className="font-semibold text-navy underline underline-offset-4">
            Register your organization
          </Link>
          {' '}instead.
        </div>
      </div>
    </AuthLayout>
  )
}
