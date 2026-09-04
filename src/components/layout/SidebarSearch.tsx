import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DropdownPanel } from '@/components/ui/DropdownPanel'
import { SearchIcon, AcademiesIcon, AthletesIcon, ReelsIcon } from '@/components/icons'
import { useOrg } from '@/context/OrgContext'
import { useAcademiesForOrg, useAthletesForOrg, useCoachesForOrg } from '@/lib/orgScope'

export function SidebarSearch() {
  const navigate = useNavigate()
  const { currentOrg } = useOrg()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const academies = useAcademiesForOrg(currentOrg.id)
  const athletes = useAthletesForOrg(currentOrg.id)
  const coaches = useCoachesForOrg(currentOrg.id)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return { academies: [], athletes: [], coaches: [] }
    return {
      academies: academies.filter((a) => a.name.toLowerCase().includes(q)).slice(0, 4),
      athletes: athletes.filter((a) => a.name.toLowerCase().includes(q)).slice(0, 4),
      coaches: coaches.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 4),
    }
  }, [query, academies, athletes, coaches])

  const hasResults = results.academies.length + results.athletes.length + results.coaches.length > 0

  function go(path: string) {
    navigate(path)
    setQuery('')
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Search"
        onClick={() => setOpen((v) => !v)}
        className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-navy-light transition-transform hover:scale-110 active:scale-95"
      >
        <SearchIcon size={13} className="text-white/85" />
      </button>
      <DropdownPanel open={open} onClose={() => setOpen(false)} align="left" className="w-72">
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search academies, athletes, coaches…"
          className="mb-1.5 w-full rounded-lg border border-[oklch(90%_0.005_90)] px-2.5 py-1.5 text-xs text-navy outline-none focus:border-brand-blue"
        />
        {query.trim() && !hasResults && <div className="px-2 py-3 text-xs text-muted">No matches in {currentOrg.name}.</div>}
        {results.academies.length > 0 && (
          <div className="flex flex-col gap-0.5">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-muted">Academies</div>
            {results.academies.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => go(`/dashboard/academies/${a.id}`)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-medium text-navy hover:bg-hover"
              >
                <AcademiesIcon size={14} className="text-muted" />
                <span className="truncate">{a.name}</span>
              </button>
            ))}
          </div>
        )}
        {results.athletes.length > 0 && (
          <div className="flex flex-col gap-0.5">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-muted">Athletes</div>
            {results.athletes.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => go(`/dashboard/athletes/${a.id}`)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-medium text-navy hover:bg-hover"
              >
                <AthletesIcon size={14} className="text-muted" />
                <span className="truncate">{a.name}</span>
              </button>
            ))}
          </div>
        )}
        {results.coaches.length > 0 && (
          <div className="flex flex-col gap-0.5">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-muted">Coaches</div>
            {results.coaches.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => go(`/coaches/${c.id}`)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-medium text-navy hover:bg-hover"
              >
                <ReelsIcon size={14} className="text-muted" />
                <span className="truncate">{c.name}</span>
              </button>
            ))}
          </div>
        )}
      </DropdownPanel>
    </div>
  )
}
