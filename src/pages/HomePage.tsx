import { PublicHeader } from '@/components/layout/PublicHeader'
import { PublicFooter } from '@/components/layout/PublicFooter'
import { Hero } from '@/components/home/Hero'
import { StatsStrip } from '@/components/home/StatsStrip'
import { CategoryBrowser } from '@/components/home/CategoryBrowser'
import { LifecycleSteps } from '@/components/home/LifecycleSteps'
import { CoachCta } from '@/components/home/CoachCta'

export default function HomePage() {
  return (
    <div className="min-h-screen animate-fade-in bg-white">
      <PublicHeader />
      <Hero />
      <StatsStrip />
      <CategoryBrowser />
      <LifecycleSteps />
      <CoachCta />
      <PublicFooter />
    </div>
  )
}
