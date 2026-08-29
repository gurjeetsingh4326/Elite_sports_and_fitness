import { Tile } from '@/components/ui/Tile'
import { AthletesIcon, AttendanceIcon, PerformanceIcon, TrophyIcon } from '@/components/icons'

const STEPS = [
  {
    icon: AthletesIcon,
    title: 'Register & get assigned',
    body: 'Join an academy, get placed into a sport, program, batch, and coach.',
  },
  {
    icon: AttendanceIcon,
    title: 'Train & attend',
    body: 'Session-based attendance and coach-authored training plans, batch by batch.',
  },
  {
    icon: PerformanceIcon,
    title: 'Progress through levels',
    body: 'Coaches assess performance over time and recommend practice-level promotions.',
  },
  {
    icon: TrophyIcon,
    title: 'Compete & achieve',
    body: 'Tournament results and achievements stay on your profile, wherever you train next.',
  },
]

export function LifecycleSteps() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy">One continuous athlete journey</h2>
        <p className="mt-1.5 text-sm text-muted">
          The full path from registration to competition — history follows the athlete, not the academy.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {STEPS.map((step, i) => (
          <Tile key={step.title} className="bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface">
                <step.icon size={19} className="text-navy" />
              </div>
              <span className="text-xs font-bold text-muted">0{i + 1}</span>
            </div>
            <div className="text-sm font-bold text-navy">{step.title}</div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{step.body}</p>
          </Tile>
        ))}
      </div>
    </section>
  )
}
