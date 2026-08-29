import type { AcademyRow, OrgDashboardStats, WeekdayAttendance } from '@/types/dashboard'

export const orgDashboardStats: OrgDashboardStats = {
  academies: 12,
  academiesDeltaLabel: '+2 this quarter',
  totalAthletes: 3482,
  athletesDeltaLabel: '+4.2% MoM',
  attendanceTodayPct: 91,
  attendanceMarked: 3169,
  attendanceTotal: 3482,
  monthlyRevenueLabel: '$184.2k',
  revenueDeltaLabel: '+8.1% MoM',
  transfersPending: 4,
  programsRunning: 37,
}

export const academyRows: AcademyRow[] = [
  {
    id: 'elite-football-downtown',
    name: 'Elite Football Academy',
    branch: 'Downtown',
    category: 'Football',
    athletes: 612,
    attendancePct: 94,
    coaches: 18,
    batches: 18,
  },
  {
    id: 'elite-cricket-riverside',
    name: 'Elite Cricket Academy',
    branch: 'Riverside',
    category: 'Cricket',
    athletes: 448,
    attendancePct: 89,
    coaches: 12,
    batches: 11,
  },
  {
    id: 'elite-multi-sport-north',
    name: 'Elite Multi-Sport Academy',
    branch: 'North Campus',
    category: 'Multi-Sport',
    athletes: 890,
    attendancePct: 92,
    coaches: 24,
    batches: 27,
  },
  {
    id: 'elite-swimming-bayview',
    name: 'Elite Swimming Academy',
    branch: 'Bayview',
    category: 'Swimming',
    athletes: 305,
    attendancePct: 88,
    coaches: 9,
    batches: 6,
  },
]

export const weekAttendance: WeekdayAttendance[] = [
  { day: 'Mon', pct: 80 },
  { day: 'Tue', pct: 88 },
  { day: 'Wed', pct: 84 },
  { day: 'Thu', pct: 96 },
  { day: 'Fri', pct: 90 },
  { day: 'Sat', pct: 100 },
  { day: 'Sun', pct: 92 },
]

export const peakDayLabel = 'Sat 96%'
