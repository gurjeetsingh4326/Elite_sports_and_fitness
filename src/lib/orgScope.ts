import { useMemo } from 'react'
import { academyRows } from '@/data/mockDashboard'
import { programs } from '@/data/mockPrograms'
import { coaches } from '@/data/mockCoaches'
import { athletes } from '@/data/mockAthletes'
import { transfers } from '@/data/mockTransfers'
import { facilities } from '@/data/mockFacilities'
import { athleteProfiles } from '@/data/mockAthleteProfiles'
import { useDataStore } from '@/context/DataStoreContext'

/** Platform-wide (not org-scoped) — for public, cross-org pages like Programs/Facilities/Coaches Directory. */
export function useAllAcademies() {
  const { extraAcademies, academyOverrides } = useDataStore()
  return useMemo(
    () => [...academyRows, ...extraAcademies].map((a) => ({ ...a, ...academyOverrides[a.id] })),
    [extraAcademies, academyOverrides],
  )
}

export function useAllPrograms() {
  const { extraPrograms } = useDataStore()
  return useMemo(() => [...programs, ...extraPrograms], [extraPrograms])
}

export function useAllFacilities() {
  const { extraFacilities } = useDataStore()
  return useMemo(() => [...facilities, ...extraFacilities], [extraFacilities])
}

export function useAllCoaches() {
  const { extraCoaches, coachOverrides } = useDataStore()
  return useMemo(
    () => [...coaches, ...extraCoaches].map((c) => ({ ...c, ...coachOverrides[c.id] })),
    [extraCoaches, coachOverrides],
  )
}

/** Merged seed + locally-created + edits, for looking up one athlete's full profile by id. */
export function useAthleteProfiles(): Record<string, import('@/types/athleteProfile').AthleteProfileDetail> {
  const { extraAthleteProfiles, athleteProfileOverrides } = useDataStore()
  return useMemo(() => {
    const merged = { ...athleteProfiles, ...extraAthleteProfiles }
    for (const id of Object.keys(athleteProfileOverrides)) {
      if (merged[id]) merged[id] = { ...merged[id], ...athleteProfileOverrides[id] }
    }
    return merged
  }, [extraAthleteProfiles, athleteProfileOverrides])
}

export function useAcademiesForOrg(orgId: string) {
  const { extraAcademies, academyOverrides } = useDataStore()
  return useMemo(
    () =>
      [...academyRows, ...extraAcademies]
        .filter((a) => a.organizationId === orgId)
        .map((a) => ({ ...a, ...academyOverrides[a.id] })),
    [extraAcademies, academyOverrides, orgId],
  )
}

export function useAcademyIdsForOrg(orgId: string) {
  const rows = useAcademiesForOrg(orgId)
  return useMemo(() => new Set(rows.map((a) => a.id)), [rows])
}

export function useProgramsForOrg(orgId: string) {
  const { extraPrograms } = useDataStore()
  const ids = useAcademyIdsForOrg(orgId)
  return useMemo(() => [...programs, ...extraPrograms].filter((p) => ids.has(p.academyId)), [extraPrograms, ids])
}

export function useFacilitiesForOrg(orgId: string) {
  const { extraFacilities } = useDataStore()
  const ids = useAcademyIdsForOrg(orgId)
  return useMemo(
    () => [...facilities, ...extraFacilities].filter((f) => ids.has(f.academyId)),
    [extraFacilities, ids],
  )
}

/** Independent coaches have no academyId and are platform-wide, not org-scoped. */
export function useCoachesForOrg(orgId: string) {
  const { extraCoaches, coachOverrides } = useDataStore()
  const ids = useAcademyIdsForOrg(orgId)
  return useMemo(
    () =>
      [...coaches, ...extraCoaches]
        .filter((c) => c.academyId && ids.has(c.academyId))
        .map((c) => ({ ...c, ...coachOverrides[c.id] })),
    [extraCoaches, coachOverrides, ids],
  )
}

export function useAthletesForOrg(orgId: string) {
  const { extraAthletes, athleteOverrides } = useDataStore()
  const ids = useAcademyIdsForOrg(orgId)
  return useMemo(
    () =>
      [...athletes, ...extraAthletes]
        .filter((a) => ids.has(a.academyId))
        .map((a) => ({ ...a, ...athleteOverrides[a.id] })),
    [extraAthletes, athleteOverrides, ids],
  )
}

export function useTransfersForOrg(orgId: string) {
  const athleteRows = useAthletesForOrg(orgId)
  return useMemo(() => {
    const athleteIds = new Set(athleteRows.map((a) => a.id))
    return transfers.filter((t) => athleteIds.has(t.athleteId))
  }, [athleteRows])
}
