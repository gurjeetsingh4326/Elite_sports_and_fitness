import type { AcademyCategory } from '@/types/dashboard'

export interface ProgramSummary {
  id: string
  academyId: string
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
    academyId: 'elite-football-downtown',
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
    academyId: 'elite-football-downtown',
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
    academyId: 'elite-cricket-riverside',
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
    academyId: 'elite-multi-sport-north',
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
    academyId: 'elite-multi-sport-north',
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
    academyId: 'elite-swimming-bayview',
    academyName: 'Elite Swimming Academy',
    branch: 'Bayview',
    category: 'Swimming',
    programName: 'Competitive Swim Squad',
    description: 'Stroke technique, endurance, and race-pace training for competitive swimmers.',
    levels: 'Intermediate – Elite',
    batches: 6,
  },
  {
    id: 'apex-football-development',
    academyId: 'apex-football-central',
    academyName: 'Apex Football Academy',
    branch: 'Central',
    category: 'Football',
    programName: 'Apex Football Development',
    description: 'Foundational technical training and match play for young footballers.',
    levels: 'Beginner – Intermediate',
    batches: 8,
  },
]
