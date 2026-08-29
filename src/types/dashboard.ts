export type AcademyCategory = 'Football' | 'Cricket' | 'Multi-Sport' | 'Swimming'

export interface AcademyRow {
  name: string
  branch: string
  category: AcademyCategory
  athletes: number
  attendancePct: number
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
