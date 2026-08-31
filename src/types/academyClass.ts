import type { AcademyCategory } from '@/types/dashboard'

export interface AcademyClass {
  id: string
  academyId: string
  name: string
  category: AcademyCategory
  coachId: string
  coachName: string
  timing: string
  studentIds: string[]
}
