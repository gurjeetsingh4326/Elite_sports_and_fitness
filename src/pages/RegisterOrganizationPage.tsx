import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field } from '@/components/ui/Field'
import { useOrg } from '@/context/OrgContext'

export default function RegisterOrganizationPage() {
  const navigate = useNavigate()
  const { organizations, addOrganization } = useOrg()

  const [orgName, setOrgName] = useState('')
  const [category, setCategory] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!orgName.trim() || !ownerName.trim() || !ownerEmail.trim()) return

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
      category: category.trim() || 'Multi-Sport Group',
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
        <Field
          label="Organization name"
          type="text"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          placeholder="Apex Youth Sports"
        />
        <Field
          label="Primary focus (optional)"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Football Academy Group"
        />
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
          className="mt-2 rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light"
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
