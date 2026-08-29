import { Link } from 'react-router-dom'
import { TrophyIcon } from '@/components/icons'

const NAV_LINKS = [
  { label: 'Programs', to: '/programs' },
  { label: 'Coaches', to: '/coaches' },
  { label: 'Reels', to: '/#reels' },
  { label: 'Memberships', to: '/#memberships' },
]

export function PublicHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link to="/" className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy">
          <TrophyIcon size={19} className="text-brand-amber" />
        </div>
        <span className="text-base font-bold text-navy">Elite Sports &amp; Fitness</span>
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <Link key={link.label} to={link.to} className="text-sm font-medium text-muted hover:text-navy">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link to="/login" className="text-sm font-semibold text-navy">
          Log in
        </Link>
        <Link
          to="/register"
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light"
        >
          Register
        </Link>
      </div>
    </header>
  )
}
