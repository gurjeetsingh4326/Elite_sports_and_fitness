import { Tile } from '@/components/ui/Tile'

const RADIUS = 40
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function AttendanceRingTile({ pct }: { pct: number }) {
  const offset = CIRCUMFERENCE * (1 - pct / 100)

  return (
    <Tile className="flex flex-col items-center justify-center bg-brand-green p-[18px] text-white">
      <svg width={82} height={82} viewBox="0 0 100 100" className="mb-1.5">
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="oklch(100% 0 0 / 25%)" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="57" textAnchor="middle" fontFamily="Space Grotesk" fontSize="21" fontWeight="700" fill="white">
          {pct}%
        </text>
      </svg>
      <div className="text-xs font-semibold opacity-90">Attendance Today</div>
    </Tile>
  )
}
