import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@/components/icons'

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-10">
      <div className="max-w-2xl">
        <div className="mb-5 w-fit rounded-full bg-brand-amber-tile px-3.5 py-1.5 text-xs font-bold text-brand-amber-ink">
          One platform, every academy
        </div>
        <h1 className="text-5xl font-bold leading-[1.1] text-navy">
          One athlete profile, across every academy you run.
        </h1>
        <p className="mt-5 text-lg text-muted">
          Elite Sports &amp; Fitness manages the full athlete journey — registration, training,
          attendance, performance, medical clearance, and competitions — continuously, even as
          athletes move between academies.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            to="/programs"
            className="group flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-navy-light active:scale-[0.98]"
          >
            Explore Programs
            <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/coaches"
            className="text-sm font-semibold text-navy underline underline-offset-4 transition-colors hover:text-navy-light"
          >
            Browse Coaches
          </Link>
        </div>
      </div>
    </section>
  )
}
