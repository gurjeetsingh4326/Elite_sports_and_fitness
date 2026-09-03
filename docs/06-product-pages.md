# 6. Dashboards & Recommended Pages

## Dashboard Requirements

| Audience | Shows |
|----------|-------|
| Organization | Academies, athletes, attendance, programs, revenue, transfers |
| Coach | Their own classes (My Classes), their athletes' results (My Athletes), sessions, attendance, assessments, Gallery |
| Athlete | Their own classes (My Classes, with a "Today" section), schedule, attendance, level, performance, plans, achievements, Gallery |
| Independent Coach | Own Reels & engagement stats, public profile, academy invites/applications |
| Parent/Guardian | Read-only view of their child's athlete profile (My Child), tournaments |
| Nutritionist | Nutrition plan editor per athlete (Nutrition Plans) |

## Recommended Pages

**Public:** Home, Programs, Program Details, Coaches, Facilities, Memberships, Registration, Login,
Reels / Discover, Coach Directory, Coach Public Profile, Register as Independent Coach,
[Register Organization](02-architecture.md#organization-registration)

The Programs page and Academy Directory should be filterable by
[academy category](02-architecture.md#academy-category) (Football, Cricket, Multi-Sport, etc.),
which now supports selecting more than one, so visitors can browse straight to the sport they're
interested in.

**Authenticated:**
- Organization Dashboard
- Academy Management (list + create academy, with a multi-category picker and photo upload)
- Academy Map (org's academies plotted by location)
- Academy Dashboard (edit academy details; create programs and facilities inline; invite
  independent coaches)
- Academy Classes + Class Detail (create a class, assign/remove students — assigning or removing
  a student keeps their `batch`/`coachName` in sync automatically, see
  [Academy Class](05-data-model.md#academy-class))
- Users (org-wide Athlete/Coach directory + "add user" — see
  [Data Model](05-data-model.md#coach-profile-sections))
- Athlete Directory
- Athlete 360 Profile (editable personal info for staff/self; read-only when viewed as the
  athlete's Parent/Guardian)
- Coach Dashboard
- Attendance
- Performance
- Practice Levels
- Nutrition Plans (Nutritionist — set/update each athlete's nutrition plan)
- Physician Portal
- Transfers
- Tournaments
- Payments
- Reports
- Notifications (full list, org- and persona-scoped, with mark-as-read / mark-all-read)
- My Profile (role-aware settings: organization settings for Super Admin/Academy Manager, own
  coach profile for Coach, own personal info for Athlete)
- Reels Studio (create/manage own Reels, view engagement — posts as whichever persona you're
  currently previewing, see [Identity & Membership Model](02-architecture.md#identity--membership-model))
- Gallery (Coach/Athlete — the current persona's own posted Reels, as a visual grid)
- My Classes (Coach/Athlete — role-aware: classes taught vs. classes enrolled in, with a "Today" section)
- My Athletes (Coach only — roster + practice level + latest assessment across the coach's own classes)
- My Child (Parent/Guardian — read-only link into their child's Athlete 360 Profile)
- Moderation Queue (Academy Manager / Super Admin)

A sidebar search box looks up academies, athletes, and coaches by name within the current
organization and links straight to the matching record.

---
[← Data Model](05-data-model.md) · [Next: Roadmap →](07-roadmap.md)
