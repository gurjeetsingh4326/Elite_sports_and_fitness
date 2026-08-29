import { createContext, useContext, useState, type ReactNode } from 'react'
import { organizations as initialOrganizations } from '@/data/mockOrganizations'
import type { Organization } from '@/types/organization'

interface OrgContextValue {
  currentOrg: Organization
  setCurrentOrgId: (id: string) => void
  organizations: Organization[]
  addOrganization: (org: Organization) => void
}

const OrgContext = createContext<OrgContextValue | null>(null)

export function OrgProvider({ children }: { children: ReactNode }) {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations)
  const [currentOrgId, setCurrentOrgId] = useState(initialOrganizations[0].id)

  const currentOrg = organizations.find((o) => o.id === currentOrgId) ?? organizations[0]

  function addOrganization(org: Organization) {
    setOrganizations((prev) => [...prev, org])
    setCurrentOrgId(org.id)
  }

  return (
    <OrgContext.Provider value={{ currentOrg, setCurrentOrgId, organizations, addOrganization }}>
      {children}
    </OrgContext.Provider>
  )
}

export function useOrg() {
  const ctx = useContext(OrgContext)
  if (!ctx) throw new Error('useOrg must be used within OrgProvider')
  return ctx
}
