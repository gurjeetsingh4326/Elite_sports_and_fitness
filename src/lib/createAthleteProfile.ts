import type { AthleteRow } from '@/types/athlete'
import type { AthleteProfileDetail } from '@/types/athleteProfile'

export function buildDefaultAthleteProfile(athlete: AthleteRow, branch: string, programName: string): AthleteProfileDetail {
  const today = new Date().toISOString().slice(0, 10)
  return {
    id: athlete.id,
    name: athlete.name,
    initials: athlete.initials,
    dob: '—',
    guardian: { name: '—', relation: '—', phone: '—', email: '—' },
    academyId: athlete.academyId,
    academyName: athlete.academyName,
    branch,
    programName,
    batch: athlete.batch,
    coachName: athlete.coachName,
    category: athlete.category,
    practiceLevel: athlete.practiceLevel,
    attendancePct: athlete.attendancePct,
    memberSince: today,
    attendanceHistory: [],
    performanceAssessments: [],
    practiceLevelHistory: [{ level: athlete.practiceLevel, date: today, promotedBy: 'Registration' }],
    trainingPlan: { focus: 'Getting started', sessionsPerWeek: 0, notes: 'Training plan not yet set.' },
    medical: { status: 'Cleared', lastSession: '—', physicianName: '—', notes: 'No medical sessions recorded yet.' },
    nutrition: { planName: '—', notes: 'No nutrition plan assigned yet.' },
    competitions: [],
    achievements: [],
    transferHistory: [],
    membership: { planName: 'Single Sport', status: 'Active', renewalDate: '—' },
    payments: [],
  }
}

export function initialsFromName(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
