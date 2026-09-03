import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Role } from '@/types/role'

interface IdentityContextValue {
  role: Role
  setRole: (role: Role) => void
  coachId: string
  setCoachId: (id: string) => void
  athleteId: string
  setAthleteId: (id: string) => void
}

const IdentityContext = createContext<IdentityContextValue | null>(null)

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('Super Admin/Owner')
  const [coachId, setCoachId] = useState('marcus-webb')
  const [athleteId, setAthleteId] = useState('aisha-khan')

  return (
    <IdentityContext.Provider value={{ role, setRole, coachId, setCoachId, athleteId, setAthleteId }}>
      {children}
    </IdentityContext.Provider>
  )
}

export function useIdentity() {
  const ctx = useContext(IdentityContext)
  if (!ctx) throw new Error('useIdentity must be used within IdentityProvider')
  return ctx
}
