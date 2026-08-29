import type { AcademyCategory } from '@/types/dashboard'
import type { PracticeLevel } from '@/types/athlete'

export interface AttendanceEntry {
  date: string
  session: string
  status: 'Present' | 'Absent' | 'Late' | 'Excused'
}

export interface PerformanceAssessment {
  date: string
  coachName: string
  summary: string
  recommendedLevel?: PracticeLevel
}

export interface PracticeLevelHistoryEntry {
  level: PracticeLevel
  date: string
  promotedBy: string
}

export interface CompetitionEntry {
  name: string
  date: string
  result: string
}

export interface AchievementEntry {
  title: string
  date: string
}

export interface TransferHistoryEntry {
  fromAcademy: string
  toAcademy: string
  date: string
  reason: string
}

export interface PaymentEntry {
  date: string
  amount: string
  status: 'Paid' | 'Pending' | 'Failed'
}

export interface AthleteProfileDetail {
  id: string
  name: string
  initials: string
  dob: string
  guardian: { name: string; relation: string; phone: string; email: string }
  academyId: string
  academyName: string
  branch: string
  programName: string
  batch: string
  coachName: string
  category: AcademyCategory
  practiceLevel: PracticeLevel
  attendancePct: number
  memberSince: string
  attendanceHistory: AttendanceEntry[]
  performanceAssessments: PerformanceAssessment[]
  practiceLevelHistory: PracticeLevelHistoryEntry[]
  trainingPlan: { focus: string; sessionsPerWeek: number; notes: string }
  medical: {
    status: 'Cleared' | 'Restricted' | 'Temporarily Not Cleared'
    lastSession: string
    physicianName: string
    notes: string
  }
  nutrition: { planName: string; notes: string }
  competitions: CompetitionEntry[]
  achievements: AchievementEntry[]
  transferHistory: TransferHistoryEntry[]
  membership: { planName: string; status: string; renewalDate: string }
  payments: PaymentEntry[]
}
