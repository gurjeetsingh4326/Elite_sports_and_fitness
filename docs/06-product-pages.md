# 6. Dashboards & Recommended Pages

## Dashboard Requirements

| Audience | Shows |
|----------|-------|
| Organization | Academies, athletes, attendance, programs, revenue, transfers |
| Coach | Batches, sessions, attendance, assessments |
| Athlete | Schedule, attendance, level, performance, plans and achievements |
| Independent Coach | Own Reels & engagement stats, public profile, academy invites/applications |

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
- Academy Dashboard
- Academy Classes + Class Detail (create a class, assign/remove students — see
  [Academy Class](05-data-model.md#academy-class))
- Users (org-wide Athlete/Coach directory + "add user" — see
  [Data Model](05-data-model.md#coach-profile-sections))
- Athlete Directory
- Athlete 360 Profile
- Coach Dashboard
- Attendance
- Performance
- Practice Levels
- Physician Portal
- Transfers
- Tournaments
- Payments
- Reports
- Reels Studio (create/manage own Reels, view engagement)
- Moderation Queue (Academy Manager / Super Admin)

---
[← Data Model](05-data-model.md) · [Next: Roadmap →](07-roadmap.md)
