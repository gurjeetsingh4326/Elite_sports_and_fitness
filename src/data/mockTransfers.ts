import type { TransferRecord } from '@/types/transfer'

export const transfers: TransferRecord[] = [
  {
    id: 't1',
    athleteId: 'meera-iyer',
    athleteName: 'Meera Iyer',
    fromAcademy: 'Elite Cricket Academy — South Branch',
    toAcademy: 'Elite Cricket Academy — Riverside',
    date: '2026-01-15',
    reason: 'Family relocation',
    status: 'Approved',
  },
  {
    id: 't2',
    athleteId: 'ethan-brooks',
    athleteName: 'Ethan Brooks',
    fromAcademy: 'Elite Multi-Sport Academy — South Branch',
    toAcademy: 'Elite Multi-Sport Academy — North Campus',
    date: '2026-05-04',
    reason: 'Closer to home',
    status: 'Approved',
  },
]
