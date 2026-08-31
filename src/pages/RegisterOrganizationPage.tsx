import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field } from '@/components/ui/Field'
import { CategoryMultiSelect } from '@/components/ui/CategoryMultiSelect'
import { ImageUploadField } from '@/components/ui/ImageUploadField'
import { useOrg } from '@/context/OrgContext'
import type { AcademyCategory } from '@/types/dashboard'

export default function RegisterOrganizationPage() {
  const navigate = useNavigate()
  const { organizations, addOrganization } = useOrg()

  const [orgName, setOrgName] = useState('')
  const [categories, setCategories] = useState<AcademyCategory[]>([])
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!orgName.trim() || !ownerName.trim() || !ownerEmail.trim() || categories.length === 0) return

    const slug = orgName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    if (organizations.some((o) => o.slug === slug)) {
      setError('An organization with that name is already registered.')
      return
    }

    addOrganization({
      id: slug,
      name: orgName.trim(),
      slug,
      categories,
      logoUrl,
      ownerName: ownerName.trim(),
      ownerEmail: ownerEmail.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    })

    navigate('/dashboard')
  }

  return (
    <AuthLayout
      title="Register your organization"
      subtitle="Set up your organization, then add academies, coaches, and athletes underneath it."
      footer={<>Registering as an athlete or coach instead? Use the links in the header.</>}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <ImageUploadField label="Organization logo" value={logoUrl} onChange={setLogoUrl} shape="circle" />

        <Field
          label="Organization name"
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="Apex Youth Sports"
        />

        <CategoryMultiSelect label="Sports offered" selected={categories} onChange={setCategories} />

        <Field
          label="Your name"
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Jane Owner"
          autoComplete="name"
        />
        <Field
          label="Your email"
          type="email"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
          placeholder="you@yourorg.com"
          autoComplete="email"
        />
        <Field label="Password" type="password" name="password" placeholder="••••••••" autoComplete="new-password" />

        {error && <p className="text-xs font-semibold text-[oklch(55%_0.19_25)]">{error}</p>}

        <button
          type="submit"
          disabled={categories.length === 0}
          className="mt-2 rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
        >
          Create organization
        </button>
      </form>

      <p className="mt-6 text-[11.5px] leading-relaxed text-muted">
        You&apos;ll become the Super Admin/Owner for this organization. You can add academies, invite
        Academy Managers, and register coaches once you&apos;re in.
      </p>
    </AuthLayout>
  )
}
