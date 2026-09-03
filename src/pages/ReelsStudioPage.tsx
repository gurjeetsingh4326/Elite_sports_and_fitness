import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Tile } from '@/components/ui/Tile'
import { Field } from '@/components/ui/Field'
import { Select } from '@/components/ui/Select'
import { ReelThumb } from '@/components/reels/ReelThumb'
import { useDataStore } from '@/context/DataStoreContext'
import { useCurrentPersona } from '@/lib/useCurrentPersona'
import type { Reel, ReelVisibility } from '@/types/reel'

const STATUS_CLASSES: Record<Reel['status'], string> = {
  Published: 'bg-[oklch(90%_0.06_145)] text-[oklch(38%_0.1_145)]',
  'In Review': 'bg-[oklch(92%_0.06_70)] text-[oklch(45%_0.13_70)]',
  Removed: 'bg-[oklch(92%_0.06_25)] text-[oklch(45%_0.15_25)]',
}

const THEMES: Reel['theme'][] = ['amber', 'blue', 'green', 'violet', 'navy']

export default function ReelsStudioPage() {
  const { reels, addReel } = useDataStore()
  const persona = useCurrentPersona()
  const myReels = reels.filter((r) => r.authorId === persona.id)

  const [showForm, setShowForm] = useState(false)
  const [caption, setCaption] = useState('')
  const [tags, setTags] = useState('')
  const [visibility, setVisibility] = useState<ReelVisibility>('Public')

  function publish() {
    if (!caption.trim()) return
    const reel: Reel = {
      id: `local-${reels.length}`,
      authorId: persona.id,
      authorName: persona.name,
      authorInitials: persona.initials,
      authorRole: persona.reelRole,
      academyName: persona.academyName,
      caption,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      visibility,
      status: 'In Review',
      likeCount: 0,
      commentCount: 0,
      viewCount: 0,
      createdDate: 'Just now',
      theme: THEMES[reels.length % THEMES.length],
    }
    addReel(reel)
    setCaption('')
    setTags('')
    setVisibility('Public')
    setShowForm(false)
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-navy">Reels Studio</h1>
            <p className="mt-1 text-sm text-muted">
              Posting as <span className="font-semibold text-navy">{persona.name}</span> ({persona.reelRole}) —
              switch persona from the profile menu.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-navy-light active:scale-[0.98]"
          >
            {showForm ? 'Cancel' : '+ New Reel'}
          </button>
        </div>

        {showForm && (
          <Tile className="flex max-w-xl animate-fade-in-scale flex-col gap-4 bg-white p-6">
            <div>
              <label htmlFor="caption" className="mb-1.5 block text-xs font-semibold text-navy">
                Caption
              </label>
              <textarea
                id="caption"
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's this Reel about?"
                className="w-full rounded-xl border border-[oklch(90%_0.005_90)] bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:border-brand-blue"
              />
            </div>
            <Field label="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Football, Drills" />
            <Select label="Visibility" value={visibility} onChange={(e) => setVisibility(e.target.value as ReelVisibility)}>
              <option value="Public">Public</option>
              <option value="Academy-only">Academy-only</option>
            </Select>
            <button
              type="button"
              onClick={publish}
              className="rounded-full bg-navy py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:bg-navy-light"
            >
              Submit for review
            </button>
          </Tile>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myReels.map((reel, i) => (
            <Tile
              key={reel.id}
              className="flex animate-fade-in gap-3 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_oklch(50%_0.05_40_/_20%)]"
              style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
            >
              <Link to={`/reels/${reel.id}`} className="w-24 shrink-0">
                <ReelThumb reel={reel} />
              </Link>
              <div className="flex min-w-0 flex-col justify-between py-1">
                <div>
                  <span className={`w-fit rounded-full px-2 py-0.5 text-[10.5px] font-bold ${STATUS_CLASSES[reel.status]}`}>
                    {reel.status}
                  </span>
                  <p className="mt-1.5 line-clamp-2 text-xs text-navy">{reel.caption}</p>
                </div>
                <div className="flex gap-2.5 text-[10.5px] text-muted">
                  <span>{reel.likeCount} likes</span>
                  <span>{reel.commentCount} comments</span>
                  <span>{reel.viewCount} views</span>
                </div>
              </div>
            </Tile>
          ))}
        </div>
        {myReels.length === 0 && (
          <Tile className="bg-white p-8 text-center text-sm text-muted">
            {persona.name} hasn&apos;t posted any Reels yet.
          </Tile>
        )}
      </div>
    </AppShell>
  )
}
