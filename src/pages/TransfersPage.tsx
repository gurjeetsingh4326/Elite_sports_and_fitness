import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { Select } from '@/components/ui/Select'
import { clsx } from '@/lib/clsx'
import { athletes } from '@/data/mockAthletes'
import { academyRows } from '@/data/mockDashboard'
import { transfers as initialTransfers } from '@/data/mockTransfers'
import type { TransferRecord } from '@/types/transfer'

export default function TransfersPage() {
  const [transfers, setTransfers] = useState(initialTransfers)
  const [showForm, setShowForm] = useState(false)
  const [athleteId, setAthleteId] = useState('')
  const [destinationId, setDestinationId] = useState('')
  const [date, setDate] = useState('')
  const [reason, setReason] = useState('')

  const athlete = athletes.find((a) => a.id === athleteId)

  function startTransfer() {
    if (!athlete || !destinationId || !date || !reason.trim()) return
    const destination = academyRows.find((a) => a.id === destinationId)
    if (!destination) return

    const record: TransferRecord = {
      id: `local-${transfers.length}`,
      athleteId: athlete.id,
      athleteName: athlete.name,
      fromAcademy: athlete.academyName,
      toAcademy: `${destination.name} — ${destination.branch}`,
      date,
      reason,
      status: 'Pending',
    }
    setTransfers((prev) => [record, ...prev])
    setShowForm(false)
    setAthleteId('')
    setDestinationId('')
    setDate('')
    setReason('')
  }

  function approve(id: string) {
    setTransfers((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'Approved' } : t)))
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-navy">Transfers</h1>
            <p className="mt-1 text-sm text-muted">Full history is preserved — an athlete is never duplicated on transfer.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light"
          >
            {showForm ? 'Cancel' : '+ Start transfer'}
          </button>
        </div>

        {showForm && (
          <Tile className="grid max-w-3xl grid-cols-1 gap-4 bg-white p-6 sm:grid-cols-2">
            <Select label="Athlete" value={athleteId} onChange={(e) => setAthleteId(e.target.value)}>
              <option value="">Select athlete</option>
              {athletes.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Select>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-navy">Source academy</label>
              <div className="rounded-xl border border-[oklch(90%_0.005_90)] bg-surface px-3.5 py-2.5 text-sm text-muted">
                {athlete ? athlete.academyName : 'Select an athlete first'}
              </div>
            </div>
            <Select label="Destination academy" value={destinationId} onChange={(e) => setDestinationId(e.target.value)}>
              <option value="">Select academy</option>
              {academyRows
                .filter((a) => a.id !== athlete?.academyId)
                .map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} — {a.branch}
                  </option>
                ))}
            </Select>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="transfer-date" className="text-xs font-semibold text-navy">
                Date
              </label>
              <input
                id="transfer-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-brand-blue"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="reason" className="mb-1.5 block text-xs font-semibold text-navy">
                Reason
              </label>
              <textarea
                id="reason"
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Why is this transfer happening?"
                className="w-full rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-brand-blue"
              />
            </div>
            <button
              type="button"
              onClick={startTransfer}
              className="rounded-full bg-navy py-3 text-sm font-semibold text-white hover:bg-navy-light sm:col-span-2"
            >
              Submit for review
            </button>
          </Tile>
        )}

        <Tile className="bg-white p-2">
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-[1.4fr_1.6fr_1.6fr_1fr_0.9fr_0.9fr] gap-3 px-4 py-3 text-[10.5px] font-bold uppercase tracking-wide text-muted">
                <span>Athlete</span>
                <span>From</span>
                <span>To</span>
                <span>Date</span>
                <span>Status</span>
                <span></span>
              </div>
              {transfers.map((t) => (
                <div key={t.id} className="grid grid-cols-[1.4fr_1.6fr_1.6fr_1fr_0.9fr_0.9fr] items-center gap-3 rounded-xl px-4 py-3 hover:bg-hover">
                  <span className="text-sm font-semibold text-navy">{t.athleteName}</span>
                  <span className="truncate text-xs text-muted">{t.fromAcademy}</span>
                  <span className="truncate text-xs text-muted">{t.toAcademy}</span>
                  <span className="text-xs text-muted">{t.date}</span>
                  <span
                    className={clsx(
                      'w-fit rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                      t.status === 'Approved' ? 'bg-[oklch(90%_0.06_145)] text-[oklch(38%_0.1_145)]' : 'bg-[oklch(92%_0.06_70)] text-[oklch(45%_0.13_70)]',
                    )}
                  >
                    {t.status}
                  </span>
                  {t.status === 'Pending' ? (
                    <button type="button" onClick={() => approve(t.id)} className="text-xs font-bold text-brand-blue">
                      Approve
                    </button>
                  ) : (
                    <span />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Tile>
      </div>
    </AppShell>
  )
}
