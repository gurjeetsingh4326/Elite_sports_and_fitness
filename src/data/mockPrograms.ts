import type { AcademyCategory } from '@/types/dashboard'

export interface ProgramSummary {
  id: string
  academyName: string
  branch: string
  category: AcademyCategory
  programName: string
  description: string
  levels: string
  batches: number
}

export const programs: ProgramSummary[] = [
  {
    id: 'football-youth-development',
    academyName: 'Elite Football Academy',
    branch: 'Downtown',
    category: 'Football',
    programName: 'Youth Football Development',
    description: 'Technical skills, tactical awareness, and match fitness for ages 8–18.',
    levels: 'Beginner – Elite',
    batches: 14,
  },
  {
    id: 'football-goalkeeping',
    academyName: 'Elite Football Academy',
    branch: 'Downtown',
    category: 'Football',
    programName: 'Goalkeeping Specialist',
    description: 'Position-specific coaching for shot-stopping, distribution, and command of the box.',
    levels: 'Foundation – Advanced',
    batches: 4,
  },
  {
    id: 'cricket-pathway',
    academyName: 'Elite Cricket Academy',
    branch: 'Riverside',
    category: 'Cricket',
    programName: 'Batting & Bowling Pathway',
    description: 'All-round cricket development with net sessions and match simulation.',
    levels: 'Beginner – Elite',
    batches: 11,
  },
  {
    id: 'multi-sport-junior',
    academyName: 'Elite Multi-Sport Academy',
    branch: 'North Campus',
    category: 'Multi-Sport',
    programName: 'Junior Athletic Foundations',
    description: 'Cross-training across sports to build coordination and athleticism before specializing.',
    levels: 'Beginner – Intermediate',
    batches: 18,
  },
  {
    id: 'multi-sport-fitness',
    academyName: 'Elite Multi-Sport Academy',
    branch: 'North Campus',
    category: 'Multi-Sport',
    programName: 'Adult Fitness & Conditioning',
    description: 'Strength, conditioning, and general fitness programming for adult members.',
    levels: 'All levels',
    batches: 9,
  },
  {
    id: 'swimming-competitive',
    academyName: 'Elite Swimming Academy',
    branch: 'Bayview',
    category: 'Swimming',
    programName: 'Competitive Swim Squad',
    description: 'Stroke technique, endurance, and race-pace training for competitive swimmers.',
    levels: 'Intermediate – Elite',
    batches: 6,
  },
]
