import type { AcademyCategory } from '@/types/dashboard'

export interface Organization {
  id: string
  name: string
  slug: string
  categories: AcademyCategory[]
  logoUrl: string | null
  ownerName: string
  ownerEmail: string
  createdAt: string
}
