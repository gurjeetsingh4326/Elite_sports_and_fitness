import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { AppShell } from '@/components/layout/AppShell'
import { CategoryBadgeList } from '@/components/ui/Badge'
import { useAcademiesForOrg } from '@/lib/orgScope'
import { useOrg } from '@/context/OrgContext'

const pinIcon = divIcon({
  className: '',
  html: `<div style="width:30px;height:30px;border-radius:9999px 9999px 0 9999px;transform:rotate(45deg);background:oklch(22% 0.035 260);border:2px solid white;box-shadow:0 4px 10px -2px oklch(0% 0 0 / 35%);"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 28],
  popupAnchor: [0, -26],
})

export default function AcademyMapPage() {
  const { currentOrg } = useOrg()
  const academyRows = useAcademiesForOrg(currentOrg.id)

  const center: [number, number] =
    academyRows.length > 0
      ? [
          academyRows.reduce((sum, a) => sum + a.lat, 0) / academyRows.length,
          academyRows.reduce((sum, a) => sum + a.lng, 0) / academyRows.length,
        ]
      : [40.7128, -74.006]

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <div>
          <Link to="/dashboard/academies" className="text-xs font-semibold text-muted hover:text-navy">
            ← Back to Academies
          </Link>
          <h1 className="mt-3 text-xl font-bold text-navy">Academy Locations</h1>
          <p className="mt-1 text-sm text-muted">
            {academyRows.length} {academyRows.length === 1 ? 'academy' : 'academies'} at {currentOrg.name}
          </p>
        </div>

        {academyRows.length === 0 ? (
          <div className="rounded-tile bg-white p-8 text-center text-sm text-muted">No academies to show yet.</div>
        ) : (
          <div className="overflow-hidden rounded-tile border border-[oklch(91%_0.005_90)]" style={{ height: 520 }}>
            <MapContainer center={center} zoom={academyRows.length > 1 ? 10 : 12} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {academyRows.map((academy) => (
                <Marker key={academy.id} position={[academy.lat, academy.lng]} icon={pinIcon}>
                  <Popup>
                    <div style={{ minWidth: 160 }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{academy.name}</div>
                      <div style={{ fontSize: 11, color: '#666', marginBottom: 6 }}>{academy.branch}</div>
                      <div style={{ fontSize: 11 }}>{academy.athletes} athletes · {academy.attendancePct}% attendance</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {academyRows.map((academy) => (
            <Link
              key={academy.id}
              to={`/dashboard/academies/${academy.id}`}
              className="flex items-center justify-between rounded-xl border border-[oklch(91%_0.005_90)] bg-white p-4 hover:bg-hover"
            >
              <div>
                <div className="text-sm font-bold text-navy">{academy.name}</div>
                <div className="text-xs text-muted">{academy.branch}</div>
              </div>
              <CategoryBadgeList categories={academy.categories} max={2} />
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
