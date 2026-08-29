export interface TransferRecord {
  id: string
  athleteId: string
  athleteName: string
  fromAcademy: string
  toAcademy: string
  date: string
  reason: string
  status: 'Pending' | 'Approved'
}
