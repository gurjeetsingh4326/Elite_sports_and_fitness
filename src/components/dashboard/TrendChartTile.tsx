import { Tile } from '@/components/ui/Tile'
import type { WeekdayAttendance } from '@/types/dashboard'

const BAR_WIDTH = 24
const GAP = 8
const CHART_HEIGHT = 70

export function TrendChartTile({ data, peakLabel }: { data: WeekdayAttendance[]; peakLabel: string }) {
  const width = data.length * BAR_WIDTH + (data.length - 1) * GAP + 4
  const peakDay = data.reduce((max, d) => (d.pct > max.pct ? d : max), data[0])

  return (
    <Tile className="flex flex-col bg-navy p-5 text-white sm:col-span-2 lg:col-span-2">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[13px] font-bold">Attendance — 7 Days</span>
        <span className="text-[11.5px] font-bold text-brand-amber">{peakLabel}</span>
      </div>
      <svg width="100%" height={CHART_HEIGHT} viewBox={`0 0 ${width} ${CHART_HEIGHT}`} preserveAspectRatio="none">
        {data.map((d, i) => {
          const barHeight = (d.pct / 100) * CHART_HEIGHT
          const x = 2 + i * (BAR_WIDTH + GAP)
          const y = CHART_HEIGHT - barHeight
          const isPeak = d.day === peakDay.day
          return (
            <rect
              key={d.day}
              x={x}
              y={y}
              width={BAR_WIDTH}
              height={barHeight}
              rx={5}
              fill={isPeak ? 'oklch(80% 0.14 70)' : 'oklch(35% 0.03 260)'}
            />
          )
        })}
      </svg>
    </Tile>
  )
}
