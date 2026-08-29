export const ROLES = [
  'Super Admin/Owner',
  'Academy Manager',
  'Coach/Trainer',
  'Physician',
  'Nutritionist',
  'Receptionist',
  'Athlete/Member',
  'Parent/Guardian',
] as const

export type Role = (typeof ROLES)[number]
