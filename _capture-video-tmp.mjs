import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

const BASE = process.env.BASE_URL || 'http://localhost:5173'
const REPO = 'c:\\Users\\gurjeet singh\\Documents\\GitHub\\Elite_sports_and_fitness'
const OUT_DIR = path.join(REPO, 'captures')
const FRAMES_FILE = path.join(OUT_DIR, 'walkthrough-frames.mjpeg')
const OUT_FILE = path.join(OUT_DIR, 'walkthrough.webm')
const FFMPEG = 'C:\\Users\\gurjeet singh\\AppData\\Local\\ms-playwright\\ffmpeg-1011\\ffmpeg-win64.exe'
const WIDTH = 1920
const HEIGHT = 1080

fs.rmSync(FRAMES_FILE, { force: true })

const log = (...args) => console.log(new Date().toISOString().slice(11, 19), ...args)

async function main() {
  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 })
  const page = await context.newPage()
  page.on('pageerror', (err) => log('PAGE ERROR:', err.message))
  page.setDefaultTimeout(15000)

  const frameStream = fs.createWriteStream(FRAMES_FILE)
  let frameCount = 0
  let captureElapsedMs = 0

  async function captureFrame() {
    const t0 = Date.now()
    const buf = await page.screenshot({ type: 'jpeg', quality: 90 })
    frameStream.write(buf)
    frameCount += 1
    captureElapsedMs += Date.now() - t0
  }

  async function holdFor(ms) {
    const end = Date.now() + ms
    while (Date.now() < end) {
      await captureFrame()
    }
  }

  const mainLocator = () => page.locator('[data-capture="main"]')

  async function resetScroll(scrollTarget) {
    await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {})
    if (scrollTarget === 'main') {
      await mainLocator()
        .evaluate((el) => el.scrollTo(0, 0))
        .catch(() => {})
    }
  }

  async function smoothScrollAndCapture(scrollTarget) {
    const distance =
      scrollTarget === 'main'
        ? await mainLocator()
            .evaluate((el) => el.scrollHeight - el.clientHeight)
            .catch(() => 0)
        : await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight)

    if (!distance || distance <= 40) return

    // ~500px/sec target speed, sized to the empirically-observed ~80ms/frame capture cost;
    // the real achieved fps (computed at the end from actual elapsed time) is what ffmpeg
    // uses for playback speed, so this is just for a reasonable number of steps, not exact timing.
    const assumedFrameMs = 80
    const targetPxPerSec = 500
    const stepSize = Math.max(20, Math.round((targetPxPerSec * assumedFrameMs) / 1000))
    const maxSteps = Math.ceil(2500 / assumedFrameMs) // cap any single page's scroll at ~2.5s of frames
    const effectiveStep = distance / stepSize > maxSteps ? Math.ceil(distance / maxSteps) : stepSize

    let scrolled = 0
    while (scrolled < distance) {
      const n = Math.min(effectiveStep, distance - scrolled)
      if (scrollTarget === 'main') {
        await mainLocator()
          .evaluate((el, amount) => el.scrollBy(0, amount), n)
          .catch(() => {})
      } else {
        await page.evaluate((amount) => window.scrollBy(0, amount), n).catch(() => {})
      }
      scrolled += n
      await captureFrame()
    }
  }

  async function settle() {
    await page.waitForLoadState('networkidle').catch(() => {})
    await page.waitForTimeout(400)
  }

  async function visit(label, scrollTarget) {
    await resetScroll(scrollTarget)
    await holdFor(900)
    await smoothScrollAndCapture(scrollTarget)
    await holdFor(900)
    log('visited', label)
  }

  async function goto(url, label, scrollTarget) {
    await page.goto(BASE + url, { waitUntil: 'networkidle' })
    await settle()
    await visit(label, scrollTarget)
  }

  async function ensureNoDropdownOpen() {
    for (let i = 0; i < 6; i += 1) {
      const n = await page.locator('button[aria-label="Close menu"]').count()
      if (n === 0) return
      await page.keyboard.press('Escape')
      await page.waitForTimeout(150)
    }
  }

  async function clickLink(name, label, scrollTarget) {
    await ensureNoDropdownOpen()
    await page.getByRole('link', { name, exact: true }).first().click()
    await settle()
    await visit(label, scrollTarget)
  }

  async function openProfileMenu() {
    await ensureNoDropdownOpen()
    await page.getByRole('button', { name: 'Switch role or organization' }).click()
    await page.waitForTimeout(250)
  }

  async function switchRole(role) {
    await openProfileMenu()
    await page.getByRole('button', { name: role, exact: true }).click()
    await page.waitForTimeout(250)
    await ensureNoDropdownOpen()
  }

  async function settingsForRole(label, scrollTarget) {
    await openProfileMenu()
    await page.getByRole('link', { name: 'My Profile', exact: true }).click()
    await settle()
    await visit(label, scrollTarget)
  }

  // ---------- Public pages ----------
  log('== Public pages ==')
  await goto('/', 'home', 'window')
  await goto('/programs', 'programs', 'window')
  await goto('/programs/football-youth-development', 'program-details', 'window')
  await goto('/coaches', 'coaches-directory', 'window')
  await goto('/coaches/marcus-webb', 'coach-profile-public', 'window')
  await goto('/facilities', 'facilities', 'window')
  await goto('/memberships', 'memberships', 'window')
  await goto('/reels', 'reels-discover', 'window')
  await goto('/reels/reel-1', 'reel-detail', 'window')
  await goto('/login', 'login', 'window')
  await goto('/register', 'register-athlete', 'window')
  await goto('/register-coach', 'register-coach', 'window')
  await goto('/register-organization', 'register-organization', 'window')

  // ---------- Dashboard, default Super Admin/Owner ----------
  log('== Dashboard (Super Admin/Owner) ==')
  await goto('/dashboard', 'dashboard-super-admin', 'main')
  await goto('/dashboard/academies', 'academy-management', 'main')
  await goto('/dashboard/academies/map', 'academy-map', 'main')
  await page.waitForTimeout(1200)
  await goto('/dashboard/academies/elite-football-downtown', 'academy-dashboard', 'main')
  await goto('/dashboard/academies/elite-football-downtown/classes', 'academy-classes', 'main')
  await goto(
    '/dashboard/academies/elite-football-downtown/classes/class-u14-boys-b',
    'class-detail',
    'main',
  )
  await goto('/dashboard/athletes', 'athlete-directory', 'main')
  await goto('/dashboard/athletes/aisha-khan', 'athlete-profile-editable', 'main')
  await goto('/dashboard/attendance', 'attendance', 'main')
  await goto('/dashboard/performance', 'performance', 'main')
  await goto('/dashboard/practice-levels', 'practice-levels', 'main')
  await goto('/dashboard/reels-studio', 'reels-studio-super-admin', 'main')
  await goto('/dashboard/moderation', 'moderation-queue', 'main')
  await goto('/dashboard/transfers', 'transfers', 'main')
  await goto('/dashboard/tournaments', 'tournaments', 'main')
  await goto('/dashboard/payments', 'payments', 'main')
  await goto('/dashboard/reports', 'reports', 'main')
  await goto('/dashboard/users', 'users', 'main')
  await goto('/dashboard/notifications', 'notifications', 'main')
  await settingsForRole('settings-super-admin', 'main')

  // ---------- Role-specific (client-side nav to preserve identity) ----------
  log('== Coach/Trainer ==')
  await page.goto(BASE + '/dashboard', { waitUntil: 'networkidle' })
  await switchRole('Coach/Trainer')
  await visit('dashboard-coach', 'main')
  await clickLink('My Classes', 'my-classes-coach', 'main')
  await clickLink('My Athletes', 'my-athletes-coach', 'main')
  await clickLink('Gallery', 'gallery-coach', 'main')
  await clickLink('Reels', 'reels-studio-coach', 'main')
  await settingsForRole('settings-coach', 'main')

  log('== Athlete/Member ==')
  await page.goto(BASE + '/dashboard', { waitUntil: 'networkidle' })
  await switchRole('Athlete/Member')
  await visit('dashboard-athlete', 'main')
  await clickLink('My Classes', 'my-classes-athlete', 'main')
  await clickLink('Gallery', 'gallery-athlete', 'main')
  await clickLink('Reels', 'reels-studio-athlete', 'main')
  await settingsForRole('settings-athlete', 'main')

  log('== Physician ==')
  await page.goto(BASE + '/dashboard', { waitUntil: 'networkidle' })
  await switchRole('Physician')
  await visit('dashboard-physician', 'main')
  await clickLink('Physician Sessions', 'physician-portal', 'main')
  await settingsForRole('settings-physician', 'main')

  log('== Nutritionist ==')
  await page.goto(BASE + '/dashboard', { waitUntil: 'networkidle' })
  await switchRole('Nutritionist')
  await visit('dashboard-nutritionist', 'main')
  await clickLink('Nutrition Plans', 'nutrition-plans', 'main')
  await settingsForRole('settings-nutritionist', 'main')

  log('== Receptionist ==')
  await page.goto(BASE + '/dashboard', { waitUntil: 'networkidle' })
  await switchRole('Receptionist')
  await visit('dashboard-receptionist', 'main')
  await settingsForRole('settings-receptionist', 'main')

  log('== Academy Manager ==')
  await page.goto(BASE + '/dashboard', { waitUntil: 'networkidle' })
  await switchRole('Academy Manager')
  await visit('dashboard-academy-manager', 'main')
  await settingsForRole('settings-academy-manager', 'main')

  log('== Parent/Guardian ==')
  await page.goto(BASE + '/dashboard', { waitUntil: 'networkidle' })
  await switchRole('Parent/Guardian')
  await visit('dashboard-parent', 'main')
  await clickLink('My Child', 'athlete-profile-readonly-parent', 'main')
  await settingsForRole('settings-parent-guardian', 'main')

  log('== Done capturing, closing browser ==')
  await browser.close()
  await new Promise((resolve) => frameStream.end(resolve))

  const fps = frameCount / (captureElapsedMs / 1000)
  log(`Captured ${frameCount} frames, ${(captureElapsedMs / 1000).toFixed(1)}s of content time, ${fps.toFixed(2)} fps`)

  log('Encoding with ffmpeg (high bitrate VP8)...')
  await new Promise((resolve, reject) => {
    const args = [
      '-y',
      '-f', 'image2pipe',
      '-vcodec', 'mjpeg',
      '-framerate', fps.toFixed(2),
      '-i', FRAMES_FILE,
      '-c:v', 'libvpx',
      '-b:v', '8M',
      '-minrate', '6M',
      '-maxrate', '12M',
      '-quality', 'good',
      '-cpu-used', '0',
      '-pix_fmt', 'yuv420p',
      OUT_FILE,
    ]
    const proc = spawn(FFMPEG, args)
    let stderr = ''
    proc.stderr.on('data', (d) => {
      stderr += d.toString()
    })
    proc.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`ffmpeg exited ${code}\n${stderr.slice(-2000)}`))
    })
  })

  fs.rmSync(FRAMES_FILE, { force: true })
  log('video saved to', OUT_FILE)
  log('All done.')
}

main().catch((err) => {
  console.error('CAPTURE FAILED:', err)
  process.exit(1)
})
