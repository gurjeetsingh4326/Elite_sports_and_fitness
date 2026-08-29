export interface NotificationItem {
  id: string
  title: string
  time: string
  read: boolean
}

export const notifications: NotificationItem[] = [
  { id: 'n1', title: 'Transfer request approved for Aisha Khan', time: '12m ago', read: false },
  { id: 'n2', title: 'Attendance not yet marked for Batch U14-B', time: '1h ago', read: false },
  { id: 'n3', title: 'New performance assessment due for 3 athletes', time: '3h ago', read: true },
]
