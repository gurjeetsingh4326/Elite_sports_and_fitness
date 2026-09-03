import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { ReelThumb } from '@/components/reels/ReelThumb'
import { useDataStore } from '@/context/DataStoreContext'

export default function ModerationQueuePage() {
  const { reels, removeReel, clearReelReport } = useDataStore()
  const reported = reels.filter((r) => r.reported)

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold text-navy">Moderation Queue</h1>
          <p className="mt-1 text-sm text-muted">
            Reels reported by a viewer. Academy-affiliated content routes to that academy's Manager; independent
            content routes here to Super Admin.
          </p>
        </div>

        {reported.length === 0 && (
          <Tile className="max-w-md animate-fade-in-scale bg-white p-8 text-center">
            <p className="text-sm text-muted">Nothing in the queue right now.</p>
          </Tile>
        )}

        <div className="flex flex-col gap-3">
          {reported.map((reel, i) => (
            <Tile
              key={reel.id}
              className="flex animate-fade-in items-center gap-4 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_oklch(50%_0.05_40_/_20%)]"
              style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
            >
              <div className="w-16 shrink-0">
                <ReelThumb reel={reel} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-navy">{reel.authorName}</span>
                  <span className="text-xs text-muted">{reel.authorRole}</span>
                </div>
                <p className="mt-1 truncate text-xs text-muted">{reel.caption}</p>
                <p className="mt-1 text-[11px] font-semibold text-[oklch(55%_0.19_25)]">Reported by a viewer</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => clearReelReport(reel.id)}
                  className="rounded-full bg-surface px-4 py-2 text-xs font-semibold text-navy transition-all duration-150 hover:scale-105 hover:bg-hover"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => removeReel(reel.id)}
                  className="rounded-full bg-[oklch(55%_0.19_25)] px-4 py-2 text-xs font-semibold text-white transition-all duration-150 hover:scale-105 hover:brightness-110"
                >
                  Remove
                </button>
              </div>
            </Tile>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
