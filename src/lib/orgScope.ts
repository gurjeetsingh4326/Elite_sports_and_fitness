import { academyRows } from '@/data/mockDashboard'
import { programs } from '@/data/mockPrograms'
import { coaches } from '@/data/mockCoaches'
import { athletes } from '@/data/mockAthletes'
import { transfers } from '@/data/mockTransfers'

export function academiesForOrg(orgId: string) {
  return academyRows.filter((a) => a.organizationId === orgId)
}

export function academyIdsForOrg(orgId: string) {
  return new Set(academiesForOrg(orgId).map((a) => a.id))
}

export function programsForOrg(orgId: string) {
  const ids = academyIdsForOrg(orgId)
  return programs.filter((p) => ids.has(p.academyId))
}

/** Independent coaches have no academyId and are platform-wide, not org-scoped. */
export function coachesForOrg(orgId: string) {
  const ids = academyIdsForOrg(orgId)
  return coaches.filter((c) => c.academyId && ids.has(c.academyId))
}

export function athletesForOrg(orgId: string) {
  const ids = academyIdsForOrg(orgId)
  return athletes.filter((a) => ids.has(a.academyId))
}

export function transfersForOrg(orgId: string) {
  const athleteIds = new Set(athletesForOrg(orgId).map((a) => a.id))
  return transfers.filter((t) => athleteIds.has(t.athleteId))
}
