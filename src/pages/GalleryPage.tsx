import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { ReelThumb } from '@/components/reels/ReelThumb'
import { useDataStore } from '@/context/DataStoreContext'
import { useCurrentPersona } from '@/lib/useCurrentPersona'

export default function GalleryPage() {
  const { reels } = useDataStore()
  const persona = useCurrentPersona()
  const myReels = reels.filter((r) => r.authorId === persona.id && r.status !== 'Removed')
  const totalLikes = myReels.reduce((sum, r) => sum + r.likeCount, 0)
  const totalViews = myReels.reduce((sum, r) => sum + r.viewCount, 0)

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-navy">Gallery</h1>
            <p className="mt-1 text-sm text-muted">
              {persona.name}&apos;s posted Reels — {myReels.length} total
            </p>
          </div>
          <Link
            to="/dashboard/reels-studio"
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-navy-light active:scale-[0.98]"
          >
            Open Studio
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md">
          <Tile className="bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_oklch(50%_0.05_40_/_20%)]">
            <div className="text-2xl font-bold text-navy">{myReels.length}</div>
            <div className="mt-1 text-xs font-semibold text-muted">Reels</div>
          </Tile>
          <Tile className="bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_oklch(50%_0.05_40_/_20%)]">
            <div className="text-2xl font-bold text-navy">{totalLikes.toLocaleString()}</div>
            <div className="mt-1 text-xs font-semibold text-muted">Likes</div>
          </Tile>
          <Tile className="bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-10px_oklch(50%_0.05_40_/_20%)]">
            <div className="text-2xl font-bold text-navy">{totalViews.toLocaleString()}</div>
            <div className="mt-1 text-xs font-semibold text-muted">Views</div>
          </Tile>
        </div>

        {myReels.length === 0 ? (
          <Tile className="animate-fade-in-scale bg-white p-10 text-center">
            <p className="text-sm text-muted">Nothing here yet.</p>
            <Link to="/dashboard/reels-studio" className="mt-3 inline-block text-sm font-semibold text-brand-blue transition-opacity hover:opacity-70">
              Post your first Reel →
            </Link>
          </Tile>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {myReels.map((reel, i) => (
              <Link
                key={reel.id}
                to={`/reels/${reel.id}`}
                className="flex animate-fade-in flex-col gap-2"
                style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
              >
                <ReelThumb reel={reel} />
                <div className="flex gap-3 text-[11px] text-muted">
                  <span>{reel.likeCount.toLocaleString()} likes</span>
                  <span>{reel.commentCount} comments</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
