# 10. Project Milestones

Stack: **React + Vite + Tailwind CSS** (no component library — components are hand-built).

All milestones through M9 are **UI-only**: real screens, real interactions, static/mock data
(local JSON fixtures). No API calls, no database, no auth backend. Backend work starts at M10.
This lets the full app be reviewed and iterated on screen-by-screen before any server work
begins.

## UI Milestones

| # | Milestone | Scope | Key screens |
|---|-----------|-------|--------------|
| M0 | Project Setup & Design System | Vite + React + Tailwind init, folder structure, React Router, design tokens (color/type/spacing), base primitives (Button, Input, Card, Badge, Modal, Table, Avatar, Tabs, Dropdown), the chosen app-shell layout (sidebar + header), mock-data fixtures layer | — |
| M1 | Public Marketing Pages | Public, unauthenticated pages | Home, Programs, Program Details, Coaches Directory, Coach Public Profile, Facilities, Memberships, Registration, Login, Register as Independent Coach |
| M2 | Authenticated App Shell | Sidebar/header shell for logged-in users, role-based nav (mock role switcher to preview each role's nav), notifications dropdown, profile menu | — |
| M3 | Org & Academy Dashboards | Org-level and academy-level operational views | Organization Dashboard, Academy Dashboard, Athlete Directory, Academy Management (incl. [categories](02-architecture.md#academy-category)) |
| M4 | Athlete 360 Profile | The full tabbed athlete profile | Overview, Personal Info & Guardian, Academy/Program/Batch/Coach, Attendance, Performance, Practice Level, Training, Medical, Nutrition, Competitions, Achievements, Transfer History, Memberships & Payments |
| M5 | Coach Operations | Day-to-day coach workflows | Coach Dashboard, [Attendance flow](flows/attendance-flow.md), [Performance assessment flow](flows/performance-flow.md), Practice Levels board |
| M6 | Reels Module | Content/social feature | Reels Discover feed, Reels Studio (upload/manage), Reel detail (comments/likes), Moderation queue — see [Reels Flow](flows/reels-flow.md) |
| M7 | Independent Coach | No-academy coach path | Independent registration, public Coach Profile (empty affiliation state), academy invite/apply UI — see [Independent Coach Flow](flows/independent-coach-flow.md) |
| M8 | Remaining Ops Pages | Everything else from the recommended pages list | Physician Portal, Transfers, Tournaments, Payments, Reports |
| M9 | Polish & Responsive QA | Cross-cutting pass, not new screens | Responsive audit (mobile/tablet/desktop), empty/loading/error states, accessibility pass |

## Post-M9: Multi-Tenancy & Operational Depth

Built after M9, ahead of the original plan, on direct request — still UI-only (a `DataStoreContext`
holds anything created at runtime; nothing survives a reload):

| Area | What shipped |
|---|---|
| Multi-tenancy | [Organization Registration](02-architecture.md#organization-registration), an org switcher (demo-only, stands in for real per-account login), and org-scoped data everywhere (`useAcademiesForOrg`, `useAthletesForOrg`, etc. in `src/lib/orgScope.ts`) |
| Multi-category | Organizations and Academies both moved from a single `category` to `categories: []`, with a 9-category icon set and a `CategoryMultiSelect` component |
| Create Academy | Real form on Academy Management: name, branch, categories, photo, location |
| Academy Map | Leaflet + OpenStreetMap, plotting an org's academies by lat/lng |
| Academy Classes | The `Academy → Class → Coach → Timing → Assigned Students` chain from [Academy Class](05-data-model.md#academy-class): list, create, assign/remove students |
| Users | Org-wide Athlete/Coach directory with an "add user" flow that creates a real athlete or coach (including a full default Athlete 360 Profile) |
| Images | Client-side upload with local preview (`ImageUploadField`) for org logos, academy photos, and user avatars — no object storage yet, see the note in [Database Schema](11-database-schema.md#notes-for-m11) |
| Persona identity | `IdentityContext` + `useCurrentPersona` — the role-preview switcher now tracks *which* coach/athlete you're previewing as (see the [UI-build note](02-architecture.md#identity--membership-model)), so Reels authorship, My Classes, My Athletes, and Gallery are all genuinely "yours" rather than a hardcoded admin persona |
| Reels persistence | Reels moved from page-local state into `DataStoreContext` — a post in Studio now actually shows up in Discover, Gallery, and the author's Coach Public Profile |
| My Classes / My Athletes / Gallery | New role-aware pages: `/dashboard/my-classes` (coach: taught; athlete: enrolled, with a "Today" section), `/dashboard/my-results` (coach's roster + latest assessments), `/dashboard/gallery` (current persona's own Reels) |
| Persona-aware notifications | `mockNotifications.ts` entries can target a specific `forPersonId`, so switching coach/athlete persona shows relevant items instead of one global list |

## Post-M9: Bug Fixes & CRUD Completion

A follow-up pass closing every remaining gap between the UI and a "real" app: broken forms, missing
edit/create flows, and role coverage that fell short of the nav.

| Area | What shipped |
|---|---|
| Auth forms | Login/Register/Register-as-Coach now actually submit — Register creates a real athlete (with org + academy pickers), Register-as-Coach creates a real independent coach; both set the previewed identity and route into the dashboard |
| Data-source bugs | Attendance and Users now read athletes/programs through the org-scoped hooks instead of stale static imports, so newly-created records show up everywhere |
| Class ↔ batch sync | `assignStudentToClass` / `removeStudentFromClass` on `DataStoreContext` keep an athlete's `batch`/`coachName` in sync with their class roster (`ClassDetailPage`) |
| Edit UI | Academy (name/branch/categories/photo), Athlete personal info (name/dob/guardian — hidden in the read-only Parent/Guardian view), and Coach profile (name/bio/certifications) are all editable in place, backed by the `update*` functions on `DataStoreContext` |
| Create Program / Create Facility | Inline forms on the Academy Dashboard, backed by `addProgram`/`addFacility`; `Facility` gained an `academyId` so facilities scope like everything else |
| Organization settings | `OrgContext` gained `updateOrganization`; a new role-aware **My Profile** page (`/dashboard/settings`) edits org settings (Super Admin/Academy Manager), the coach's own profile (Coach), or the athlete's own info (Athlete) |
| Notifications page | Notifications moved fully into `DataStoreContext` (was a static import in the Sidebar); a full `/dashboard/notifications` page backs the dropdown's "View all," with mark-one/mark-all-read |
| Nutrition Plans | New `/dashboard/nutrition` page for the Nutritionist role, editing each athlete's plan via `updateAthleteProfile` |
| Parent/Guardian scoping | Nav trimmed to Dashboard / My Child / Tournaments; the persona picker lets you choose "which child," and My Child routes to that child's (read-only) Athlete 360 Profile |
| Real sidebar search | The sidebar search box looks up academies/athletes/coaches by name within the current org and links to the match, replacing the decorative icon |
| Platform-wide public pages | Programs, Program Details, Facilities, Coaches Directory, and the home Category Browser now read through `useAllPrograms`/`useAllFacilities`/`useAllCoaches`/`useAllAcademies` so anything created at runtime is visible cross-org, not just within the creating org |

## Backend Milestones (after M9)

| # | Milestone | Scope |
|---|-----------|-------|
| M10 | API & Auth | API design, real authentication/session handling, replace the mock-data layer's interface with real HTTP calls |
| M11 | Database Implementation | Implement the [database schema](11-database-schema.md) in a real database, wire it to the API |
| M12 | Feature-by-feature integration | Reconnect each M1–M8 screen to real data/endpoints, one module at a time |

## Suggested build order rationale

M0 → M1 first because the public pages are the simplest surface to validate the design system and
layout shell on before tackling data-dense dashboards. M2 → M3 → M4 → M5 follow the athlete
lifecycle's operational core. M6/M7 (Reels, Independent Coach) come after the core is solid since
they're additive, not blocking. M8 mops up the remaining lower-traffic pages. M9 is a dedicated
polish pass rather than "polish as you go," so responsiveness/accessibility get a real review
instead of being an afterthought per screen.

---
[← Architecture Review](09-architecture-review.md) · [Next: Database Schema →](11-database-schema.md)
