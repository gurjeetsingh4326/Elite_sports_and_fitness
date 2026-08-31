export const ACADEMY_CATEGORIES = [
  'Football',
  'Cricket',
  'Basketball',
  'Tennis',
  'Swimming',
  'Athletics',
  'Martial Arts',
  'Fitness & Gym',
  'Multi-Sport',
] as const

export type AcademyCategory = (typeof ACADEMY_CATEGORIES)[number]

export interface AcademyRow {
  id: string
  organizationId: string
  name: string
  branch: string
  categories: AcademyCategory[]
  imageUrl: string | null
  lat: number
  lng: number
  athletes: number
  attendancePct: number
  coaches: number
  batches: number
}

export interface OrgDashboardStats {
  academies: number
  academiesDeltaLabel: string
  totalAthletes: number
  athletesDeltaLabel: string
  attendanceTodayPct: number
  attendanceMarked: number
  attendanceTotal: number
  monthlyRevenueLabel: string
  revenueDeltaLabel: string
  transfersPending: number
  programsRunning: number
}

export interface WeekdayAttendance {
  day: string
  pct: number
}
