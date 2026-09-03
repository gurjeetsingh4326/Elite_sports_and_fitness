# 5. Data Model

## Organization

| Field | Notes |
|-------|-------|
| Name | Business name |
| Categories | One or more [Academy Categories](02-architecture.md#academy-category) — multi-select |
| Logo | Optional image |
| Owner | Name + email of the Super Admin/Owner created at registration |
| Created date | — |

Created via [Organization Registration](02-architecture.md#organization-registration). Every
Academy below belongs to exactly one Organization (`organizationId`); nothing crosses that
boundary — see [Multi-Tenancy](02-architecture.md#multi-tenancy-organizations-register-too).

## Academy

| Field | Notes |
|-------|-------|
| Name, Branch | Branch doubles as its display location, e.g. "Downtown" |
| Categories | One or more [Academy Categories](02-architecture.md#academy-category) — multi-select |
| Image | Optional photo shown on its card and detail header |
| Location | Latitude/longitude, plotted on the org's [Academy Map](06-product-pages.md) |
| Athletes / Coaches / Classes counts, Attendance % | Rolled-up stats shown on Academy Management and the Academy Dashboard |

## Academy Class

The concrete unit under a Program — what the blueprint calls a **Batch**. An Academy Manager
creates one per group of athletes that trains together:

| Field | Notes |
|-------|-------|
| Name | e.g. "U14 Boys — Batch B" |
| Category | Which sport this class trains — one of the academy's categories |
| Coach | The single coach assigned to this class |
| Timing | Free-text schedule, e.g. "Mon / Wed / Fri · 4:00 – 5:30 PM" |
| Assigned students | The athlete roster — grown over time from the Class detail page |

Academy → Class → Coach → Timing → Assigned Students is the full chain a coach or Academy
Manager works with day to day; Attendance and Performance both key off a class's roster.

## Program & Facility

Both belong to exactly one Academy (`academyId`) and are created inline from the Academy
Dashboard:

| Entity | Field | Notes |
|--------|-------|-------|
| Program | Name, Category, Levels, Description | A sport offering within the academy, e.g. "Youth Football Development" |
| Facility | Name, Category, Capacity, Description | A physical space at the academy, e.g. "Main Pitch" |

Both are also readable platform-wide (not just within the creating org) on the public Programs,
Program Details, and Facilities pages and the home Category Browser.

## Athlete Profile Sections

The Athlete 360 Profile is the single continuous record for an athlete, organized into:

| Section | Contents |
|---------|----------|
| Overview | Summary snapshot |
| Personal Information & Guardian | Contact details, guardian info |
| Academy/Program/Batch/Coach | Current placement |
| Attendance | Session-based attendance history |
| Performance | Historical assessments |
| Practice Level | Current level and promotion history |
| Training | Training plans |
| Medical | Physician sessions and clearance status (role-restricted) |
| Nutrition | Nutrition plans |
| Competitions | Tournament participation |
| Achievements | Awards and results |
| Transfer History | Full academy transfer log |
| Memberships & Payments | Billing and membership records |

## Practice Levels

```
Level 1 Beginner → Level 2 Foundation → Level 3 Intermediate → Level 4 Advanced → Level 5 Elite
```

Each sport can define its own promotion criteria — levels are not a single global scale but a
per-sport progression. Practice-level changes are **permanent records** (see
[Product Rules](08-product-rules.md)): once promoted, the change and its history are kept, not
overwritten.

## Coach Profile Sections

Every coach — academy-affiliated or [independent](flows/independent-coach-flow.md) — has a
public Coach Profile:

| Section | Contents |
|---------|----------|
| Overview | Name, photo, bio, sport specialties |
| Affiliation | Academy/academies they belong to — empty for independent coaches |
| Certifications | Coaching certifications/qualifications |
| Reels | Their posted video content |
| Classes (if affiliated) | Classes they currently coach — only present once they hold an Org Membership |

Academies and Organizations can create user accounts directly — an Academy Manager or Super
Admin adds an Athlete or Coach (name, contact, photo, academy, and either a class assignment or a
specialty) from the [Users page](06-product-pages.md), rather than every person self-registering.
This is in addition to, not instead of, self-registration (`/register`, `/register-coach`).

## Reel

| Field | Notes |
|-------|-------|
| Author | The Platform Account that posted it (Coach, Athlete, or Physician) |
| Video / Thumbnail | Media assets |
| Caption | Free text |
| Tags | Sport/hashtag tags for discovery |
| Academy tag | Optional — links the Reel to an academy's public feed |
| Visibility | Public or Academy-only |
| Status | Published / In Review / Removed |
| Engagement | Like count, comment count, view count |

See [Reels Flow](flows/reels-flow.md) for how these are created, fed out, and moderated.

---
[← Flows](flows/academy-transfer-flow.md) · [Next: Product Pages →](06-product-pages.md)
