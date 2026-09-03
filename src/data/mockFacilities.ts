import type { AcademyCategory } from '@/types/dashboard'

export interface Facility {
  id: string
  academyId: string
  name: string
  academyName: string
  branch: string
  category: AcademyCategory
  description: string
  capacity: string
}

export const facilities: Facility[] = [
  {
    id: 'downtown-main-pitch',
    academyId: 'elite-football-downtown',
    name: 'Main Pitch',
    academyName: 'Elite Football Academy',
    branch: 'Downtown',
    category: 'Football',
    description: 'Full-size FIFA-standard turf with floodlights for evening sessions.',
    capacity: '22 players',
  },
  {
    id: 'downtown-indoor-arena',
    academyId: 'elite-football-downtown',
    name: 'Indoor Training Arena',
    academyName: 'Elite Football Academy',
    branch: 'Downtown',
    category: 'Football',
    description: 'Weather-proof indoor space for technical drills and goalkeeping.',
    capacity: '14 players',
  },
  {
    id: 'riverside-nets',
    academyId: 'elite-cricket-riverside',
    name: 'Practice Nets',
    academyName: 'Elite Cricket Academy',
    branch: 'Riverside',
    category: 'Cricket',
    description: 'Eight-lane bowling and batting nets with bowling machines.',
    capacity: '8 lanes',
  },
  {
    id: 'north-campus-gym',
    academyId: 'elite-multi-sport-north',
    name: 'Strength & Conditioning Gym',
    academyName: 'Elite Multi-Sport Academy',
    branch: 'North Campus',
    category: 'Multi-Sport',
    description: 'Full weight room and functional training space shared across sports.',
    capacity: '30 athletes',
  },
  {
    id: 'north-campus-track',
    academyId: 'elite-multi-sport-north',
    name: 'Outdoor Track',
    academyName: 'Elite Multi-Sport Academy',
    branch: 'North Campus',
    category: 'Multi-Sport',
    description: '400m track for conditioning and athletics-based programs.',
    capacity: '8 lanes',
  },
  {
    id: 'bayview-pool',
    academyId: 'elite-swimming-bayview',
    name: 'Olympic Pool',
    academyName: 'Elite Swimming Academy',
    branch: 'Bayview',
    category: 'Swimming',
    description: '50m, 8-lane competition pool with electronic timing.',
    capacity: '8 lanes',
  },
]
