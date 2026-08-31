import type { SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function base({ size = 18, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 20 20',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props,
  }
}

export function DashboardIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 9.5 10 4l7 5.5M5 8.5V16h10V8.5" />
    </svg>
  )
}

export function AcademiesIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="6" height="6" rx="2" />
      <rect x="11" y="3" width="6" height="6" rx="2" />
      <rect x="3" y="11" width="6" height="6" rx="2" />
      <rect x="11" y="11" width="6" height="6" rx="2" />
    </svg>
  )
}

export function AthletesIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="7" cy="7" r="2.6" />
      <circle cx="14" cy="8" r="2" />
      <path d="M2.5 16.5c.4-2.7 2.3-4.3 4.5-4.3s4.1 1.6 4.5 4.3" />
    </svg>
  )
}

export function AttendanceIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="14" height="13" rx="3" />
      <path d="M3 8h14" />
      <path d="M7.5 12.5l1.8 1.8 3.2-3.6" />
    </svg>
  )
}

export function PerformanceIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 14l4.5-5 3 3L17 5" />
      <path d="M12.5 5H17v4.5" />
    </svg>
  )
}

export function PracticeLevelsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="7" r="4" />
      <path d="M7.5 10.5 6.5 17l3.5-2 3.5 2-1-6.5" />
    </svg>
  )
}

export function ReelsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4.5" width="10.5" height="11" rx="3" />
      <path d="M8.2 8v4l3.3-2z" fill="currentColor" stroke="none" />
      <path d="M15.5 8.5 17.5 7v6l-2-1.5" />
    </svg>
  )
}

export function TransfersIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6h6l-2-2M9 6l-2 2" />
      <path d="M17 14h-6l2 2M11 14l2-2" />
    </svg>
  )
}

export function PaymentsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="14" height="10" rx="3" />
      <path d="M3 8.5h14" />
    </svg>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="M16 16l-3.5-3.5" />
    </svg>
  )
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 3.5a4 4 0 0 0-4 4v2.7c0 .7-.3 1.4-.8 1.9L4 13.5h12l-1.2-1.4a2.7 2.7 0 0 1-.8-1.9V7.5a4 4 0 0 0-4-4z" />
      <path d="M8.3 16a1.8 1.8 0 0 0 3.4 0" />
    </svg>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  )
}

export function MedicalIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="14" height="14" rx="3" />
      <path d="M10 6.5v7M6.5 10h7" />
    </svg>
  )
}

export function NutritionIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 5.5c-2.5-3-7-1.5-7 2.5 0 4 4.5 7 7 8.5 2.5-1.5 7-4.5 7-8.5 0-4-4.5-5.5-7-2.5z" />
    </svg>
  )
}

export function LogoutIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 3.5H4.5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1H8" />
      <path d="M13 13.5 17 10l-4-3.5M17 10H7.5" />
    </svg>
  )
}

export function FlagIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 17V3.5" />
      <path d="M5 4.5h9.5l-2.5 3 2.5 3H5" />
    </svg>
  )
}

export function BarChartIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 16V9M9 16V4M14 16v-7" />
      <path d="M3 16h14" />
    </svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6h14M3 10h14M3 14h14" />
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 10.5 8 14.5 16 6" />
    </svg>
  )
}

export function TrophyIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 4h8v3a4 4 0 0 1-8 0V4z" />
      <path d="M10 11v3M7.5 17h5l-.5-2.5h-4z" />
    </svg>
  )
}

export function FootballIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6.5l2 1.5-.8 2.4h-2.4l-.8-2.4z" />
      <path d="M10 6.5V4M7.8 8 5.5 7M12.2 8l2.3-1M8.8 10.4l-1 2.6M11.2 10.4l1 2.6" />
    </svg>
  )
}

export function CricketIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 15 13 8" />
      <path d="M13 8l1.5-1.5a1 1 0 0 0-1.4-1.4L11.6 6.6" />
      <path d="M5 16l-1.5 1.5" />
      <circle cx="15.5" cy="4.5" r="1.3" />
    </svg>
  )
}

export function BasketballIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="7" />
      <path d="M3 10h14M10 3v14" />
      <path d="M5.2 4.8c2.2 2.6 2.2 7.8 0 10.4M14.8 4.8c-2.2 2.6-2.2 7.8 0 10.4" />
    </svg>
  )
}

export function TennisIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="8" cy="7.5" r="4.5" />
      <path d="M8 3v9M4 7.5h8" />
      <path d="M11 11l5.5 5.5" />
    </svg>
  )
}

export function SwimmingIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="14.5" cy="4.5" r="1.5" />
      <path d="M6 6.5l4-1.5 3 1.5-1 2.3" />
      <path d="M2 10.5c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0" />
      <path d="M2 14c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0" />
    </svg>
  )
}

export function AthleticsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <ellipse cx="10" cy="10" rx="7" ry="4.2" />
      <ellipse cx="10" cy="10" rx="4" ry="2.3" />
    </svg>
  )
}

export function MartialArtsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2 10h5M13 10h5" />
      <rect x="7" y="7.3" width="6" height="5.4" rx="1.5" />
      <path d="M9 10h2" />
    </svg>
  )
}

export function FitnessGymIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.2" y="8.5" width="2.6" height="3" rx="0.6" />
      <rect x="15.2" y="8.5" width="2.6" height="3" rx="0.6" />
      <path d="M5.3 10h9.4" />
      <rect x="6.6" y="7" width="1.7" height="6" rx="0.5" />
      <rect x="11.7" y="7" width="1.7" height="6" rx="0.5" />
    </svg>
  )
}

export function MultiSportIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="7.2" cy="7.2" r="3.4" />
      <circle cx="12.8" cy="7.2" r="3.4" />
      <circle cx="10" cy="13" r="3.4" />
    </svg>
  )
}

export function UploadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 13V4M6.5 7.5 10 4l3.5 3.5" />
      <path d="M4 14v1.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V14" />
    </svg>
  )
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 17s6-5.5 6-9.8A6 6 0 0 0 4 7.2C4 11.5 10 17 10 17z" />
      <circle cx="10" cy="7.3" r="2" />
    </svg>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l3 2" />
    </svg>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 4v12M4 10h12" />
    </svg>
  )
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 5l10 10M15 5 5 15" />
    </svg>
  )
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="3" width="8" height="14" rx="1" />
      <path d="M12 8h4v9h-4" />
      <path d="M6.5 6h1M9 6h1M6.5 9h1M9 9h1M6.5 12h1M9 12h1" />
    </svg>
  )
}

export function ImagePlaceholderIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="4" width="15" height="12" rx="1.5" />
      <circle cx="7" cy="8.5" r="1.4" />
      <path d="M2.5 14l4-3.5 3 2.5 3.5-4 4.5 5" />
    </svg>
  )
}
