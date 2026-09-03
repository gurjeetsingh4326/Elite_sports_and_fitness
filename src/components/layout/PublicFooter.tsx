import { Link } from 'react-router-dom'
import { TrophyIcon } from '@/components/icons'

const COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'Programs', to: '/programs' },
      { label: 'Coaches', to: '/coaches' },
      { label: 'Facilities', to: '/facilities' },
      { label: 'Memberships', to: '/memberships' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Reels', to: '/reels' },
      { label: 'Tournaments', to: '#' },
      { label: 'Achievements', to: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '#' },
      { label: 'Registration', to: '/register' },
      { label: 'For Organizations', to: '/register-organization' },
      { label: 'Log in', to: '/login' },
    ],
  },
]

export function PublicFooter() {
  return (
    <footer className="border-t border-[oklch(92%_0.006_90)]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy">
                <TrophyIcon size={16} className="text-brand-amber" />
              </div>
              <span className="text-sm font-bold text-navy">Elite Sports &amp; Fitness</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] text-muted">
              A multi-academy sports, fitness &amp; athlete development platform.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-bold uppercase tracking-wide text-muted">{col.title}</div>
              <ul className="mt-3 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-navy/80 transition-colors hover:text-navy">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
