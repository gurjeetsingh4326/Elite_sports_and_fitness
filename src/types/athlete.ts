import type { AcademyCategory } from '@/types/dashboard'

export const PRACTICE_LEVELS = [
  'Level 1 · Beginner',
  'Level 2 · Foundation',
  'Level 3 · Intermediate',
  'Level 4 · Advanced',
  'Level 5 · Elite',
] as const

export type PracticeLevel = (typeof PRACTICE_LEVELS)[number]

export interface AthleteRow {
  id: string
  name: string
  initials: string
  academyId: string
  academyName: string
  category: AcademyCategory
  programId: string
  batch: string
  coachName: string
  practiceLevel: PracticeLevel
  attendancePct: number
}
