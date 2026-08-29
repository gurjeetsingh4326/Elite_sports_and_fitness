import type { ComponentType } from 'react'
import type { IconProps } from '@/components/icons'
import {
  DashboardIcon,
  AcademiesIcon,
  AthletesIcon,
  AttendanceIcon,
  PerformanceIcon,
  PracticeLevelsIcon,
  ReelsIcon,
  TransfersIcon,
  PaymentsIcon,
  MedicalIcon,
  NutritionIcon,
  TrophyIcon,
} from '@/components/icons'
import type { Role } from '@/types/role'

export interface NavItemDef {
  key: string
  label: string
  Icon: ComponentType<IconProps>
}

const DASHBOARD: NavItemDef = { key: 'dashboard', label: 'Dashboard', Icon: DashboardIcon }
const ACADEMIES: NavItemDef = { key: 'academies', label: 'Academies', Icon: AcademiesIcon }
const ATHLETES: NavItemDef = { key: 'athletes', label: 'Athletes', Icon: AthletesIcon }
const ATTENDANCE: NavItemDef = { key: 'attendance', label: 'Attendance', Icon: AttendanceIcon }
const PERFORMANCE: NavItemDef = { key: 'performance', label: 'Performance', Icon: PerformanceIcon }
const PRACTICE_LEVELS: NavItemDef = { key: 'practice-levels', label: 'Practice Levels', Icon: PracticeLevelsIcon }
const REELS: NavItemDef = { key: 'reels', label: 'Reels', Icon: ReelsIcon }
const TRANSFERS: NavItemDef = { key: 'transfers', label: 'Transfers', Icon: TransfersIcon }
const PAYMENTS: NavItemDef = { key: 'payments', label: 'Payments', Icon: PaymentsIcon }
const MEDICAL: NavItemDef = { key: 'medical', label: 'Physician Sessions', Icon: MedicalIcon }
const NUTRITION: NavItemDef = { key: 'nutrition', label: 'Nutrition Plans', Icon: NutritionIcon }
const ACHIEVEMENTS: NavItemDef = { key: 'achievements', label: 'Achievements', Icon: TrophyIcon }

export const ROLE_NAV: Record<Role, NavItemDef[]> = {
  'Super Admin/Owner': [
    DASHBOARD,
    ACADEMIES,
    ATHLETES,
    ATTENDANCE,
    PERFORMANCE,
    PRACTICE_LEVELS,
    REELS,
    TRANSFERS,
    PAYMENTS,
  ],
  'Academy Manager': [DASHBOARD, ATHLETES, ATTENDANCE, PERFORMANCE, PRACTICE_LEVELS, TRANSFERS, PAYMENTS],
  'Coach/Trainer': [DASHBOARD, ATTENDANCE, PERFORMANCE, PRACTICE_LEVELS, REELS],
  Physician: [DASHBOARD, ATHLETES, MEDICAL, REELS],
  Nutritionist: [DASHBOARD, ATHLETES, NUTRITION],
  Receptionist: [DASHBOARD, ATHLETES, ATTENDANCE, PAYMENTS],
  'Athlete/Member': [DASHBOARD, ATTENDANCE, PERFORMANCE, PRACTICE_LEVELS, REELS, PAYMENTS],
  'Parent/Guardian': [DASHBOARD, ATTENDANCE, PERFORMANCE, ACHIEVEMENTS],
}
