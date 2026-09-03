import { Link } from 'react-router-dom'
import { TrophyIcon } from '@/components/icons'

const NAV_LINKS = [
  { label: 'Programs', to: '/programs' },
  { label: 'Coaches', to: '/coaches' },
  { label: 'Reels', to: '/reels' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Memberships', to: '/memberships' },
]

export function PublicHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy">
          <TrophyIcon size={19} className="text-brand-amber" />
        </div>
        <span className="text-base font-bold text-navy">Elite Sports &amp; Fitness</span>
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="group relative text-sm font-medium text-muted transition-colors hover:text-navy"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-navy transition-all duration-200 group-hover:w-full" />
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link to="/login" className="text-sm font-semibold text-navy transition-opacity hover:opacity-70">
          Log in
        </Link>
        <Link
          to="/register"
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-navy-light active:scale-[0.98]"
        >
          Register
        </Link>
      </div>
    </header>
  )
}
