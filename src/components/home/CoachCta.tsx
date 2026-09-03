import { Link } from 'react-router-dom'
import { Tile } from '@/components/ui/Tile'
import { ArrowRightIcon, ReelsIcon } from '@/components/icons'

export function CoachCta() {
  return (
    <section id="coach-cta" className="mx-auto max-w-6xl px-6 pb-24">
      <Tile className="flex flex-col items-start justify-between gap-6 bg-gradient-to-br from-brand-violet to-[oklch(50%_0.16_305)] p-10 text-white md:flex-row md:items-center">
        <div className="max-w-lg">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <ReelsIcon size={19} />
          </div>
          <h2 className="text-2xl font-bold">Coaching independently? Start here.</h2>
          <p className="mt-2 text-sm text-white/80">
            Register without joining an academy. Build a public profile, post training Reels, and
            apply to — or get invited by — an academy whenever you're ready. Nothing you build gets
            lost when you join one.
          </p>
        </div>
        <Link
          to="/register-coach"
          className="flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-navy transition-all duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"
        >
          Register as a coach
          <ArrowRightIcon size={16} />
        </Link>
      </Tile>
    </section>
  )
}
