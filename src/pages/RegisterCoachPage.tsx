import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field } from '@/components/ui/Field'
import { clsx } from '@/lib/clsx'
import { useIdentity } from '@/context/IdentityContext'
import { useDataStore } from '@/context/DataStoreContext'
import { CATEGORY_META, ACADEMY_CATEGORIES } from '@/data/categoryMeta'
import type { AcademyCategory } from '@/types/dashboard'
import type { CoachSummary } from '@/types/coach'
import { initialsFromName } from '@/lib/createAthleteProfile'

export default function RegisterCoachPage() {
  const navigate = useNavigate()
  const { setRole, setCoachId } = useIdentity()
  const { addCoach } = useDataStore()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialty, setSpecialty] = useState<AcademyCategory>('Football')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Enter your full name to continue.')
      return
    }

    const id = `${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-self`
    const coach: CoachSummary = {
      id,
      name: name.trim(),
      initials: initialsFromName(name),
      specialty,
      bio: 'New independent coach — bio not added yet.',
      isIndependent: true,
      certifications: [],
    }
    addCoach(coach)
    setRole('Coach/Trainer')
    setCoachId(id)
    navigate(`/coaches/${id}`)
  }

  return (
    <AuthLayout
      title="Register as an independent coach"
      subtitle="No academy needed to get started — join one later, or stay independent."
      footer={
        <>
          Registering as an athlete instead?{' '}
          <Link to="/register" className="font-semibold text-navy underline underline-offset-4">
            Go there
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Field label="Full name" type="text" name="name" placeholder="Alex Coach" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Field label="Email" type="email" name="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field label="Phone" type="tel" name="phone" placeholder="+1 555 000 0000" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-navy">Primary sport specialty</span>
          <div className="flex flex-wrap gap-2">
            {ACADEMY_CATEGORIES.map((category) => {
              const { Icon } = CATEGORY_META[category]
              const active = specialty === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSpecialty(category)}
                  aria-pressed={active}
                  className={clsx(
                    'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                    active
                      ? 'border-navy bg-navy text-white'
                      : 'border-[oklch(90%_0.005_90)] bg-white text-muted hover:bg-hover',
                  )}
                >
                  <Icon size={14} />
                  {category}
                </button>
              )
            })}
          </div>
        </div>

        <Field label="Password" type="password" name="password" placeholder="••••••••" autoComplete="new-password" />

        {error && <p className="text-xs font-semibold text-[oklch(55%_0.19_25)]">{error}</p>}

        <button
          type="submit"
          className="mt-2 rounded-full bg-navy py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:bg-navy-light active:scale-[0.99]"
        >
          Create coach profile
        </button>
      </form>

      <p className="mt-6 text-[11.5px] leading-relaxed text-muted">
        You&apos;ll get a public profile and can post Reels right away. Batches, attendance, and
        athlete data unlock once you join or are invited into an academy — your profile and content
        carry over either way.
      </p>
    </AuthLayout>
  )
}
