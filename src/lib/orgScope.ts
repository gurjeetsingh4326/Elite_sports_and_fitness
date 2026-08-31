import { useMemo } from 'react'
import { academyRows } from '@/data/mockDashboard'
import { programs } from '@/data/mockPrograms'
import { coaches } from '@/data/mockCoaches'
import { athletes } from '@/data/mockAthletes'
import { transfers } from '@/data/mockTransfers'
import { useDataStore } from '@/context/DataStoreContext'

export function useAcademiesForOrg(orgId: string) {
  const { extraAcademies } = useDataStore()
  return useMemo(
    () => [...academyRows, ...extraAcademies].filter((a) => a.organizationId === orgId),
    [extraAcademies, orgId],
  )
}

export function useAcademyIdsForOrg(orgId: string) {
  const rows = useAcademiesForOrg(orgId)
  return useMemo(() => new Set(rows.map((a) => a.id)), [rows])
}

export function useProgramsForOrg(orgId: string) {
  const ids = useAcademyIdsForOrg(orgId)
  return useMemo(() => programs.filter((p) => ids.has(p.academyId)), [ids])
}

/** Independent coaches have no academyId and are platform-wide, not org-scoped. */
export function useCoachesForOrg(orgId: string) {
  const { extraCoaches } = useDataStore()
  const ids = useAcademyIdsForOrg(orgId)
  return useMemo(
    () => [...coaches, ...extraCoaches].filter((c) => c.academyId && ids.has(c.academyId)),
    [extraCoaches, ids],
  )
}

export function useAthletesForOrg(orgId: string) {
  const { extraAthletes } = useDataStore()
  const ids = useAcademyIdsForOrg(orgId)
  return useMemo(
    () => [...athletes, ...extraAthletes].filter((a) => ids.has(a.academyId)),
    [extraAthletes, ids],
  )
}

export function useTransfersForOrg(orgId: string) {
  const athleteRows = useAthletesForOrg(orgId)
  return useMemo(() => {
    const athleteIds = new Set(athleteRows.map((a) => a.id))
    return transfers.filter((t) => athleteIds.has(t.athleteId))
  }, [athleteRows])
}
