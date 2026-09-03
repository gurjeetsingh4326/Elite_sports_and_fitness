import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { Field } from '@/components/ui/Field'
import { CategoryBadgeList } from '@/components/ui/Badge'
import { CategoryMultiSelect } from '@/components/ui/CategoryMultiSelect'
import { ImageUploadField } from '@/components/ui/ImageUploadField'
import { SkeletonCardGrid } from '@/components/ui/SkeletonBlocks'
import { ImagePlaceholderIcon, MapPinIcon } from '@/components/icons'
import { useAcademiesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'
import { useDataStore } from '@/context/DataStoreContext'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import type { AcademyCategory } from '@/types/dashboard'

export default function AcademyManagementPage() {
  const { currentOrg } = useOrg()
  const { addAcademy } = useDataStore()
  const academyRows = useAcademiesForOrg(currentOrg.id)
  const loading = useSimulatedLoading(420, [currentOrg.id])

  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [branch, setBranch] = useState('')
  const [categories, setCategories] = useState<AcademyCategory[]>([])
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')

  const defaultLat = academyRows[0]?.lat ?? 40.7128
  const defaultLng = academyRows[0]?.lng ?? -74.006

  function createAcademy() {
    if (!name.trim() || !branch.trim() || categories.length === 0) return

    const id = `${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${academyRows.length}`

    addAcademy({
      id,
      organizationId: currentOrg.id,
      name: name.trim(),
      branch: branch.trim(),
      categories,
      imageUrl,
      lat: lat ? Number(lat) : defaultLat + (Math.random() - 0.5) * 0.05,
      lng: lng ? Number(lng) : defaultLng + (Math.random() - 0.5) * 0.05,
      athletes: 0,
      attendancePct: 0,
      coaches: 0,
      batches: 0,
    })

    setShowForm(false)
    setName('')
    setBranch('')
    setCategories([])
    setImageUrl(null)
    setLat('')
    setLng('')
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-navy">Academies</h1>
            <p className="mt-1 text-sm text-muted">
              {academyRows.length} {academyRows.length === 1 ? 'academy' : 'academies'} at {currentOrg.name}
            </p>
          </div>
          <div className="flex gap-2.5">
            <Link
              to="/dashboard/academies/map"
              className="flex items-center gap-1.5 rounded-full border border-[oklch(90%_0.005_90)] bg-white px-4 py-2.5 text-sm font-semibold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-hover"
            >
              <MapPinIcon size={15} />
              View map
            </Link>
            <button
              type="button"
              onClick={() => setShowForm((v) => !v)}
              className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-navy-light active:scale-[0.98]"
            >
              {showForm ? 'Cancel' : '+ Add academy'}
            </button>
          </div>
        </div>

        {showForm && (
          <Tile className="flex max-w-2xl animate-fade-in-scale flex-col gap-4 bg-white p-6">
            <ImageUploadField label="Academy photo" value={imageUrl} onChange={setImageUrl} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Academy name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Riverside Tennis Academy" />
              <Field label="Branch / location" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="Downtown" />
            </div>
            <CategoryMultiSelect label="Categories" selected={categories} onChange={setCategories} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                label="Latitude (optional)"
                type="number"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder={String(defaultLat)}
              />
              <Field
                label="Longitude (optional)"
                type="number"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder={String(defaultLng)}
              />
            </div>
            <button
              type="button"
              onClick={createAcademy}
              disabled={!name.trim() || !branch.trim() || categories.length === 0}
              className="rounded-full bg-navy py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              Create academy
            </button>
          </Tile>
        )}

        {loading ? (
          <SkeletonCardGrid count={4} className="md:grid-cols-2 lg:grid-cols-2" />
        ) : (
          <>
            {academyRows.length === 0 && (
              <Tile className="animate-fade-in bg-white p-8 text-center text-sm text-muted">No academies yet — add your first one.</Tile>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {academyRows.map((academy, i) => (
                <Link
                  key={academy.id}
                  to={`/dashboard/academies/${academy.id}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
                >
                  <Tile className="flex flex-col gap-4 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_oklch(50%_0.05_40_/_20%)]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface">
                        {academy.imageUrl ? (
                          <img src={academy.imageUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <ImagePlaceholderIcon size={18} className="text-muted" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-base font-bold text-navy">{academy.name}</div>
                        <div className="mt-1 text-xs font-semibold text-muted">{academy.branch}</div>
                        <div className="mt-2">
                          <CategoryBadgeList categories={academy.categories} />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 border-t border-[oklch(93%_0.005_90)] pt-4 sm:grid-cols-4">
                      <div>
                        <div className="text-lg font-bold text-navy">{academy.athletes}</div>
                        <div className="text-[11px] font-semibold text-muted">Athletes</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-navy">{academy.coaches}</div>
                        <div className="text-[11px] font-semibold text-muted">Coaches</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-navy">{academy.batches}</div>
                        <div className="text-[11px] font-semibold text-muted">Batches</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[oklch(45%_0.13_145)]">{academy.attendancePct}%</div>
                        <div className="text-[11px] font-semibold text-muted">Attendance</div>
                      </div>
                    </div>
                  </Tile>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </AppShell>
  )
}
