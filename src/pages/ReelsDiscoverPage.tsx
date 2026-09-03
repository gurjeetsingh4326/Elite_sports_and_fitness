import { Link } from 'react-router-dom'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { ReelThumb } from '@/components/reels/ReelThumb'
import { SkeletonThumbGrid } from '@/components/ui/SkeletonBlocks'
import { useDataStore } from '@/context/DataStoreContext'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'

export default function ReelsDiscoverPage() {
  const { reels } = useDataStore()
  const visible = reels.filter((r) => r.status === 'Published' && r.visibility === 'Public')
  const loading = useSimulatedLoading(450)

  return (
    <div className="min-h-screen animate-fade-in bg-white">
      <PublicHeader />

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-6">
        <h1 className="text-3xl font-bold text-navy">Reels</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Training tips, highlights, and wellness content from coaches, athletes, and physicians.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {loading ? (
          <SkeletonThumbGrid count={8} />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((reel, i) => (
              <Link
                key={reel.id}
                to={`/reels/${reel.id}`}
                className="flex animate-fade-in flex-col gap-2"
                style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
              >
                <ReelThumb reel={reel} />
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[9px] font-bold text-brand-amber">
                    {reel.authorInitials}
                  </div>
                  <span className="truncate text-xs font-semibold text-navy">{reel.authorName}</span>
                </div>
                <div className="flex gap-3 text-[11px] text-muted">
                  <span>{reel.likeCount.toLocaleString()} likes</span>
                  <span>{reel.commentCount} comments</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        {!loading && visible.length === 0 && (
          <p className="animate-fade-in py-16 text-center text-sm text-muted">No Reels published yet.</p>
        )}
      </section>

      <PublicFooter />
    </div>
  )
}
