import type { ComponentType } from 'react'
import type { IconProps } from '@/components/icons'
import {
  FootballIcon,
  CricketIcon,
  BasketballIcon,
  TennisIcon,
  SwimmingIcon,
  AthleticsIcon,
  MartialArtsIcon,
  FitnessGymIcon,
  MultiSportIcon,
} from '@/components/icons'
import { ACADEMY_CATEGORIES, type AcademyCategory } from '@/types/dashboard'

export { ACADEMY_CATEGORIES }

interface CategoryMeta {
  Icon: ComponentType<IconProps>
  colorKey: string
}

export const CATEGORY_META: Record<AcademyCategory, CategoryMeta> = {
  Football: { Icon: FootballIcon, colorKey: 'football' },
  Cricket: { Icon: CricketIcon, colorKey: 'cricket' },
  Basketball: { Icon: BasketballIcon, colorKey: 'basketball' },
  Tennis: { Icon: TennisIcon, colorKey: 'tennis' },
  Swimming: { Icon: SwimmingIcon, colorKey: 'swimming' },
  Athletics: { Icon: AthleticsIcon, colorKey: 'athletics' },
  'Martial Arts': { Icon: MartialArtsIcon, colorKey: 'martial-arts' },
  'Fitness & Gym': { Icon: FitnessGymIcon, colorKey: 'fitness-gym' },
  'Multi-Sport': { Icon: MultiSportIcon, colorKey: 'multi-sport' },
}

export const CATEGORY_BG_CLASSES: Record<AcademyCategory, string> = {
  Football: 'bg-category-football-bg text-category-football-fg',
  Cricket: 'bg-category-cricket-bg text-category-cricket-fg',
  Basketball: 'bg-category-basketball-bg text-category-basketball-fg',
  Tennis: 'bg-category-tennis-bg text-category-tennis-fg',
  Swimming: 'bg-category-swimming-bg text-category-swimming-fg',
  Athletics: 'bg-category-athletics-bg text-category-athletics-fg',
  'Martial Arts': 'bg-category-martial-arts-bg text-category-martial-arts-fg',
  'Fitness & Gym': 'bg-category-fitness-gym-bg text-category-fitness-gym-fg',
  'Multi-Sport': 'bg-category-multi-sport-bg text-category-multi-sport-fg',
}
