import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { clsx } from '@/lib/clsx'
import { athleteProfiles as seedAthleteProfiles } from '@/data/mockAthleteProfiles'
import { useAthletesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'
import { useDataStore } from '@/context/DataStoreContext'

const STATUS_CLASSES: Record<string, string> = {
  Paid: 'text-[oklch(45%_0.13_145)]',
  Pending: 'text-[oklch(58%_0.14_70)]',
  Failed: 'text-[oklch(55%_0.19_25)]',
}

export default function PaymentsPage() {
  const { currentOrg } = useOrg()
  const { extraAthleteProfiles } = useDataStore()
  const athleteProfiles = { ...seedAthleteProfiles, ...extraAthleteProfiles }
  const orgAthleteIds = new Set(useAthletesForOrg(currentOrg.id).map((a) => a.id))
  const rows = Object.values(athleteProfiles)
    .filter((profile) => orgAthleteIds.has(profile.id))
    .flatMap((profile) =>
      profile.payments.map((payment) => ({
        ...payment,
        athleteId: profile.id,
        athleteName: profile.name,
        planName: profile.membership.planName,
      })),
    )

  const paidTotal = rows
    .filter((r) => r.status === 'Paid')
    .reduce((sum, r) => sum + Number(r.amount.replace(/[^0-9.]/g, '')), 0)
  const pendingCount = rows.filter((r) => r.status === 'Pending').length

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-navy">Payments</h1>
          <p className="mt-1 text-sm text-muted">Membership billing across all athletes at {currentOrg.name}.</p>
        </div>

        <div className="grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
          <Tile className="bg-white p-5">
            <div className="text-2xl font-bold text-navy">${paidTotal.toFixed(2)}</div>
            <div className="mt-1 text-xs font-semibold text-muted">Collected</div>
          </Tile>
          <Tile className="bg-white p-5">
            <div className="text-2xl font-bold text-[oklch(58%_0.14_70)]">{pendingCount}</div>
            <div className="mt-1 text-xs font-semibold text-muted">Pending</div>
          </Tile>
          <Tile className="bg-white p-5">
            <div className="text-2xl font-bold text-navy">{rows.length}</div>
            <div className="mt-1 text-xs font-semibold text-muted">Total records</div>
          </Tile>
        </div>

        <Tile className="bg-white p-2">
          <div className="overflow-x-auto">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-[1.6fr_1.2fr_1fr_1fr_0.8fr] gap-3 px-4 py-3 text-[10.5px] font-bold uppercase tracking-wide text-muted">
                <span>Athlete</span>
                <span>Plan</span>
                <span>Date</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {rows.map((row, i) => (
                <Link
                  key={`${row.athleteId}-${i}`}
                  to={`/dashboard/athletes/${row.athleteId}`}
                  className="grid grid-cols-[1.6fr_1.2fr_1fr_1fr_0.8fr] items-center gap-3 rounded-xl px-4 py-2.5 hover:bg-hover"
                >
                  <span className="text-sm font-semibold text-navy">{row.athleteName}</span>
                  <span className="text-xs text-muted">{row.planName}</span>
                  <span className="text-xs text-muted">{row.date}</span>
                  <span className="text-sm font-semibold text-navy">{row.amount}</span>
                  <span className={clsx('text-xs font-bold', STATUS_CLASSES[row.status])}>{row.status}</span>
                </Link>
              ))}
            </div>
          </div>
        </Tile>
      </div>
    </AppShell>
  )
}
