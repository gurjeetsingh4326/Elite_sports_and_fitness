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
