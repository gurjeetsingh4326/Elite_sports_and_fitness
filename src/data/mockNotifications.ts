export interface NotificationItem {
  id: string
  title: string
  time: string
  read: boolean
  /** When set, only shown to this specific coach/athlete persona (see IdentityContext). */
  forPersonId?: string
}

export const notifications: NotificationItem[] = [
  { id: 'n1', title: 'Transfer request approved for Aisha Khan', time: '12m ago', read: false },
  { id: 'n2', title: 'Attendance not yet marked for Batch U14-B', time: '1h ago', read: false },
  { id: 'n3', title: 'New performance assessment due for 3 athletes', time: '3h ago', read: true },
  {
    id: 'n-coach-1',
    title: '2 athletes in U14 Boys — Batch B are due a performance review',
    time: '20m ago',
    read: false,
    forPersonId: 'marcus-webb',
  },
  {
    id: 'n-coach-2',
    title: 'Liam Carter marked Absent for yesterday’s session',
    time: '1d ago',
    read: true,
    forPersonId: 'marcus-webb',
  },
  {
    id: 'n-coach-3',
    title: 'Noor Hassan is ready for a goalkeeping assessment',
    time: '2h ago',
    read: false,
    forPersonId: 'priya-nair',
  },
  {
    id: 'n-athlete-1',
    title: 'Your practice level was promoted to Level 4 · Advanced',
    time: '2d ago',
    read: false,
    forPersonId: 'aisha-khan',
  },
  {
    id: 'n-athlete-2',
    title: 'Attendance marked: Present for today’s session',
    time: '5h ago',
    read: true,
    forPersonId: 'aisha-khan',
  },
  {
    id: 'n-athlete-3',
    title: 'Coach Marcus Webb left feedback on your last assessment',
    time: '1d ago',
    read: false,
    forPersonId: 'liam-carter',
  },
]
