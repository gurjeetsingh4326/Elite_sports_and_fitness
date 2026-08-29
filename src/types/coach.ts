import type { AcademyCategory } from '@/types/dashboard'

export interface CoachSummary {
  id: string
  name: string
  initials: string
  specialty: AcademyCategory
  bio: string
  isIndependent: boolean
  academyName?: string
  certifications: string[]
}
