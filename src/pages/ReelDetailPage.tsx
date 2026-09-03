import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Tile } from '@/components/ui/Tile'
import { Skeleton } from '@/components/ui/Skeleton'
import { ReelThumb } from '@/components/reels/ReelThumb'
import { reelComments } from '@/data/mockReels'
import { useDataStore } from '@/context/DataStoreContext'
import { useSimulatedLoading } from '@/lib/useSimulatedLoading'
import { clsx } from '@/lib/clsx'

export default function ReelDetailPage() {
  const { reelId } = useParams()
  const { reels } = useDataStore()
  const reel = reels.find((r) => r.id === reelId)
  const loading = useSimulatedLoading(400, [reelId])
  const [liked, setLiked] = useState(false)
  const [justLiked, setJustLiked] = useState(false)
  const [comments, setComments] = useState(() => reelComments.filter((c) => c.reelId === reelId))
  const [draft, setDraft] = useState('')

  if (!reel) return <Navigate to="/reels" replace />

  const likeCount = reel.likeCount + (liked ? 1 : 0)

  function toggleLike() {
    setLiked((v) => !v)
    if (!liked) {
      setJustLiked(true)
      setTimeout(() => setJustLiked(false), 300)
    }
  }

  function postComment() {
    if (!draft.trim()) return
    setComments((prev) => [...prev, { id: `local-${prev.length}`, reelId: reel!.id, authorName: 'You', text: draft, createdDate: 'Just now' }])
    setDraft('')
  }

  return (
    <div className="min-h-screen animate-fade-in bg-white">
      <PublicHeader />

      <section className="mx-auto max-w-4xl px-6 pb-24 pt-6">
        <Link to="/reels" className="text-xs font-semibold text-muted transition-colors hover:text-navy">
          ← Back to Reels
        </Link>

        {loading ? (
          <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-[320px_1fr]">
            <Skeleton className="aspect-[9/16] w-full max-w-[320px] rounded-tile" />
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
                <div>
                  <Skeleton className="h-3.5 w-28 rounded" />
                  <Skeleton className="mt-2 h-3 w-20 rounded" />
                </div>
              </div>
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-2/3 rounded" />
            </div>
          </div>
        ) : (
        <div className="mt-4 grid animate-fade-in grid-cols-1 gap-8 md:grid-cols-[320px_1fr]">
          <ReelThumb reel={reel} className="max-w-[320px]" />

          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-brand-amber">
                  {reel.authorInitials}
                </div>
                <div>
                  <div className="text-sm font-bold text-navy">{reel.authorName}</div>
                  <div className="text-xs text-muted">
                    {reel.authorRole}
                    {reel.academyName ? ` · ${reel.academyName}` : ' · Independent'}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-navy">{reel.caption}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {reel.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-semibold text-muted transition-colors hover:bg-hover">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-5 border-y border-[oklch(93%_0.005_90)] py-3">
              <button
                type="button"
                aria-pressed={liked}
                aria-label={liked ? 'Unlike this Reel' : 'Like this Reel'}
                onClick={toggleLike}
                className={clsx(
                  'flex items-center gap-1 text-sm font-semibold transition-transform duration-200',
                  liked ? 'text-[oklch(55%_0.19_25)]' : 'text-navy',
                  justLiked && 'scale-125',
                )}
              >
                <span className={clsx('inline-block transition-transform', justLiked && 'scale-125')}>
                  {liked ? '♥' : '♡'}
                </span>{' '}
                {likeCount.toLocaleString()}
              </button>
              <span className="text-sm text-muted">{comments.length} comments</span>
              <span className="text-sm text-muted">{reel.viewCount.toLocaleString()} views</span>
            </div>

            <div className="flex flex-col gap-3">
              {comments.map((c) => (
                <div key={c.id} className="animate-fade-in">
                  <span className="text-sm font-bold text-navy">{c.authorName}</span>{' '}
                  <span className="text-sm text-muted">{c.text}</span>
                  <div className="text-[11px] text-muted">{c.createdDate}</div>
                </div>
              ))}
              {comments.length === 0 && <p className="text-sm text-muted">No comments yet.</p>}
            </div>

            <Tile className="flex items-center gap-3 bg-surface p-3 transition-shadow focus-within:shadow-[0_0_0_2px_oklch(64%_0.17_255_/_30%)]">
              <input
                aria-label="Add a comment"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && postComment()}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-sm text-navy outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={postComment}
                disabled={!draft.trim()}
                className="text-xs font-bold text-brand-blue transition-opacity hover:opacity-70 disabled:opacity-30"
              >
                Post
              </button>
            </Tile>
          </div>
        </div>
        )}
      </section>

      <PublicFooter />
    </div>
  )
}
