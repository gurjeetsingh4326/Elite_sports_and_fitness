export type ReelAuthorRole = 'Coach' | 'Athlete' | 'Physician'
export type ReelVisibility = 'Public' | 'Academy-only'
export type ReelStatus = 'Published' | 'In Review' | 'Removed'

export interface Reel {
  id: string
  authorName: string
  authorInitials: string
  authorRole: ReelAuthorRole
  authorId?: string
  caption: string
  tags: string[]
  academyName?: string
  visibility: ReelVisibility
  status: ReelStatus
  likeCount: number
  commentCount: number
  viewCount: number
  createdDate: string
  theme: 'amber' | 'blue' | 'green' | 'violet' | 'navy'
  reported?: boolean
}

export interface ReelComment {
  id: string
  reelId: string
  authorName: string
  text: string
  createdDate: string
}
