import { useIdentity } from '@/context/IdentityContext'
import { useOrg } from '@/context/OrgContext'
import { useAthletesForOrg, useCoachesForOrg } from '@/lib/orgScope'
import type { ReelAuthorRole } from '@/types/reel'

export interface CurrentPersona {
  id: string
  name: string
  initials: string
  reelRole: ReelAuthorRole
  academyName?: string
}

/** Who "you" are for content-authorship purposes (Reels), based on the current role-preview identity. */
export function useCurrentPersona(): CurrentPersona {
  const { role, coachId, athleteId } = useIdentity()
  const { currentOrg } = useOrg()
  const coaches = useCoachesForOrg(currentOrg.id)
  const athletes = useAthletesForOrg(currentOrg.id)

  const coach = coaches.find((c) => c.id === coachId) ?? coaches[0]
  const athlete = athletes.find((a) => a.id === athleteId) ?? athletes[0]

  if (role === 'Coach/Trainer' && coach) {
    return { id: coach.id, name: coach.name, initials: coach.initials, reelRole: 'Coach', academyName: coach.academyName }
  }
  if (role === 'Athlete/Member' && athlete) {
    return { id: athlete.id, name: athlete.name, initials: athlete.initials, reelRole: 'Athlete', academyName: athlete.academyName }
  }
  if (role === 'Physician') {
    return { id: 'dr-elena-voss', name: 'Dr. Elena Voss', initials: 'EV', reelRole: 'Physician' }
  }
  return { id: 'ravi-shastri', name: 'Ravi Shastri', initials: 'RS', reelRole: 'Coach', academyName: currentOrg.name }
}
