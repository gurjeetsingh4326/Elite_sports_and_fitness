import type { AcademyCategory } from '@/types/dashboard'

export interface TournamentRecord {
  id: string
  name: string
  category: AcademyCategory
  date: string
  location: string
  status: 'Completed' | 'Upcoming'
  participants: number
  winner?: string
}

export const tournaments: TournamentRecord[] = [
  {
    id: 'city-youth-league',
    name: 'City Youth League — Regional Round',
    category: 'Football',
    date: '2026-05-10',
    location: 'Downtown Stadium',
    status: 'Completed',
    participants: 48,
    winner: 'Aisha Khan — Elite Football Academy',
  },
  {
    id: 'riverside-invitational',
    name: 'Riverside Invitational',
    category: 'Cricket',
    date: '2026-04-02',
    location: 'Riverside Ground',
    status: 'Completed',
    participants: 32,
    winner: 'Rohan Desai — Elite Cricket Academy',
  },
  {
    id: 'bayview-sprint-invitational',
    name: 'Bayview Sprint Invitational',
    category: 'Swimming',
    date: '2026-06-14',
    location: 'Bayview Aquatic Center',
    status: 'Completed',
    participants: 24,
    winner: 'Oliver Tan — Elite Swimming Academy',
  },
  {
    id: 'downtown-cup-u16',
    name: 'Downtown Cup U16',
    category: 'Football',
    date: '2026-09-15',
    location: 'Downtown Stadium',
    status: 'Upcoming',
    participants: 40,
  },
  {
    id: 'multi-sport-championship',
    name: 'Elite Multi-Sport Championship',
    category: 'Multi-Sport',
    date: '2026-10-05',
    location: 'North Campus',
    status: 'Upcoming',
    participants: 60,
  },
]
