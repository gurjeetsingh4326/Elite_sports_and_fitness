import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { Field } from '@/components/ui/Field'
import { CategoryMultiSelect } from '@/components/ui/CategoryMultiSelect'
import { ImageUploadField } from '@/components/ui/ImageUploadField'
import { CheckIcon } from '@/components/icons'
import { athleteProfiles as seedAthleteProfiles } from '@/data/mockAthleteProfiles'
import { useOrg } from '@/context/OrgContext'
import { useIdentity } from '@/context/IdentityContext'
import { useDataStore } from '@/context/DataStoreContext'
import { useCurrentPersona } from '@/lib/useCurrentPersona'
import { useAllCoaches } from '@/lib/orgScope'
import { initialsFromName } from '@/lib/createAthleteProfile'
import type { AcademyCategory } from '@/types/dashboard'

function SavedBadge() {
  return (
    <div className="flex animate-pop-in items-center gap-1.5 text-xs font-semibold text-[oklch(45%_0.13_145)]">
      <CheckIcon size={15} />
      Saved
    </div>
  )
}

function OrganizationSettings() {
  const { currentOrg, updateOrganization } = useOrg()
  const [name, setName] = useState(currentOrg.name)
  const [categories, setCategories] = useState<AcademyCategory[]>(currentOrg.categories)
  const [logoUrl, setLogoUrl] = useState<string | null>(currentOrg.logoUrl)
  const [ownerName, setOwnerName] = useState(currentOrg.ownerName)
  const [ownerEmail, setOwnerEmail] = useState(currentOrg.ownerEmail)
  const [saved, setSaved] = useState(false)

  function save() {
    if (!name.trim() || !ownerName.trim() || !ownerEmail.trim() || categories.length === 0) return
    updateOrganization(currentOrg.id, {
      name: name.trim(),
      categories,
      logoUrl,
      ownerName: ownerName.trim(),
      ownerEmail: ownerEmail.trim(),
    })
    setSaved(true)
  }

  return (
    <Tile className="flex max-w-xl animate-fade-in-scale flex-col gap-4 bg-white p-6">
      <h2 className="text-sm font-bold text-navy">Organization settings</h2>
      <ImageUploadField label="Organization logo" value={logoUrl} onChange={setLogoUrl} shape="circle" />
      <Field label="Organization name" value={name} onChange={(e) => { setName(e.target.value); setSaved(false) }} />
      <CategoryMultiSelect label="Sports offered" selected={categories} onChange={(c) => { setCategories(c); setSaved(false) }} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Owner name" value={ownerName} onChange={(e) => { setOwnerName(e.target.value); setSaved(false) }} />
        <Field label="Owner email" type="email" value={ownerEmail} onChange={(e) => { setOwnerEmail(e.target.value); setSaved(false) }} />
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={!name.trim() || !ownerName.trim() || !ownerEmail.trim() || categories.length === 0}
          className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          Save changes
        </button>
        {saved && <SavedBadge />}
      </div>
    </Tile>
  )
}

function CoachSettings() {
  const persona = useCurrentPersona()
  const coaches = useAllCoaches()
  const coach = coaches.find((c) => c.id === persona.id)
  const { updateCoach } = useDataStore()
  const [name, setName] = useState(coach?.name ?? '')
  const [bio, setBio] = useState(coach?.bio ?? '')
  const [certifications, setCertifications] = useState(coach?.certifications.join(', ') ?? '')
  const [saved, setSaved] = useState(false)

  if (!coach) return <Tile className="max-w-xl bg-white p-6 text-sm text-muted">No coach profile found for this preview.</Tile>

  function save() {
    if (!name.trim()) return
    updateCoach(coach!.id, {
      name: name.trim(),
      initials: initialsFromName(name),
      bio: bio.trim(),
      certifications: certifications.split(',').map((c) => c.trim()).filter(Boolean),
    })
    setSaved(true)
  }

  return (
    <Tile className="flex max-w-xl animate-fade-in-scale flex-col gap-4 bg-white p-6">
      <h2 className="text-sm font-bold text-navy">My coach profile</h2>
      <Field label="Full name" value={name} onChange={(e) => { setName(e.target.value); setSaved(false) }} />
      <div>
        <label htmlFor="settings-coach-bio" className="mb-1.5 block text-xs font-semibold text-navy">
          Bio
        </label>
        <textarea
          id="settings-coach-bio"
          rows={3}
          value={bio}
          onChange={(e) => { setBio(e.target.value); setSaved(false) }}
          className="w-full rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-brand-blue"
        />
      </div>
      <Field label="Certifications (comma-separated)" value={certifications} onChange={(e) => { setCertifications(e.target.value); setSaved(false) }} />
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={!name.trim()}
          className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          Save changes
        </button>
        {saved && <SavedBadge />}
      </div>
    </Tile>
  )
}

function AthleteSettings() {
  const persona = useCurrentPersona()
  const { extraAthleteProfiles, updateAthlete, updateAthleteProfile } = useDataStore()
  const athleteProfiles = { ...seedAthleteProfiles, ...extraAthleteProfiles }
  const profile = athleteProfiles[persona.id]
  const [name, setName] = useState(profile?.name ?? '')
  const [phone, setPhone] = useState(profile?.guardian.phone ?? '')
  const [email, setEmail] = useState(profile?.guardian.email ?? '')
  const [saved, setSaved] = useState(false)

  if (!profile) return <Tile className="max-w-xl bg-white p-6 text-sm text-muted">No athlete profile found for this preview.</Tile>

  function save() {
    if (!name.trim()) return
    const initials = initialsFromName(name)
    updateAthlete(persona.id, { name: name.trim(), initials })
    updateAthleteProfile(persona.id, {
      name: name.trim(),
      initials,
      guardian: { ...profile!.guardian, phone: phone.trim() || '—', email: email.trim() || '—' },
    })
    setSaved(true)
  }

  return (
    <Tile className="flex max-w-xl animate-fade-in-scale flex-col gap-4 bg-white p-6">
      <h2 className="text-sm font-bold text-navy">My profile</h2>
      <Field label="Full name" value={name} onChange={(e) => { setName(e.target.value); setSaved(false) }} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Contact phone" value={phone} onChange={(e) => { setPhone(e.target.value); setSaved(false) }} />
        <Field label="Contact email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setSaved(false) }} />
      </div>
      <p className="text-[11px] text-muted">
        Practice level, medical, and nutrition data are managed by your coach, physician, and nutritionist.
      </p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={save}
          disabled={!name.trim()}
          className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          Save changes
        </button>
        {saved && <SavedBadge />}
      </div>
    </Tile>
  )
}

export default function SettingsPage() {
  const { role } = useIdentity()

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-navy">My Profile</h1>
          <p className="mt-1 text-sm text-muted">Manage settings for your current role preview.</p>
        </div>

        {(role === 'Super Admin/Owner' || role === 'Academy Manager') && <OrganizationSettings />}
        {role === 'Coach/Trainer' && <CoachSettings />}
        {role === 'Athlete/Member' && <AthleteSettings />}
        {['Physician', 'Nutritionist', 'Receptionist', 'Parent/Guardian'].includes(role) && (
          <Tile className="max-w-xl bg-white p-6 text-sm text-muted">
            Profile editing for the {role} role isn&apos;t tied to an individual account yet — this preview role
            shares a single demo identity.
          </Tile>
        )}
      </div>
    </AppShell>
  )
}
