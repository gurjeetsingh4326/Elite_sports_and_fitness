# 5. Data Model

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
| Batches (if affiliated) | Batches they currently coach — only present once they hold an Org Membership |

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
