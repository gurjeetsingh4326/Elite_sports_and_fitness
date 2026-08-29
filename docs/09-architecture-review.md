# 9. Architecture Review & Recommendations

A review of the original blueprint against two new requirements — a Reels module and
independent (no-academy) coaches — surfaced some structural gaps. This doc records what was
found and what changed.

## Issues found in the original blueprint

1. **Identity was conflated with org membership.** The User Roles table implicitly assumed every
   user belongs to exactly one organization. That blocks independent coaches outright, and also
   doesn't cleanly represent a coach who works at two academies. Fixed by the
   [Identity & Membership Model](02-architecture.md#identity--membership-model): a Platform
   Account (identity) is separate from an Org Membership (role-within-an-academy), and an
   account can have zero, one, or many memberships.
2. **No content/community layer existed.** The blueprint is entirely operational (attendance,
   performance, medical, payments) — there was no module for social/marketing content. Addressed
   by the new [Reels module](flows/reels-flow.md).
3. **Notifications has no defined flow.** It's named in the module list but has no trigger list
   or flow doc. Once Reels ships (likes, comments) it will generate real events — worth writing
   a `flows/notifications-flow.md` before or alongside a Reels build, rather than after.
4. **No UGC moderation ownership existed.** Introducing user-generated video requires a
   moderation path. Independent users have no Academy Manager, so that responsibility falls to
   the org's Super Admin by default (documented in the Reels flow) — this is new operational
   surface the original blueprint never had to account for.
5. **Physician role had no content-policy boundary.** The blueprint restricts medical *data* but
   never anticipated physicians publishing public content. There's real risk of a physician
   inadvertently referencing an identifiable athlete's medical situation in a Reel. Addressed by
   an explicit content-policy rule (see [Product Rules](08-product-rules.md)).
6. **Coach↔Batch cardinality is ambiguous.** The hierarchy diagram draws `Batch → Coach` as if
   one coach maps to one batch. In practice a coach runs multiple batches, and now potentially
   works across multiple academies. Worth confirming as many-to-many when this is implemented as
   a real data model, not just documented as a tree.
7. **Parent/Guardian has no independent-identity path.** Parent/Guardian is listed as a role, but
   the only mention beyond that is a Phase 2 dashboard. Under the new Identity model, a guardian
   should also be able to hold a Platform Account and link to multiple athletes across academies
   without a membership of their own — the model already supports this for free, it's just not
   built out (see Suggested Future Features below).
8. **Practice-level promotion criteria has no owner.** Section 8 of the blueprint says "each
   sport can define its own promotion criteria" but never assigns who authors/edits that
   criteria. Likely an Academy Manager or Super Admin per academy/sport — worth adding to Roles
   & Permissions when this is built.

## Fine-tuning applied

- Added the **Identity & Membership Model**, splitting Platform Account from Org Membership.
- Generalized the "athlete is never duplicated on transfer" rule into a platform-wide identity
  rule (see [Product Rules](08-product-rules.md)).
- Added the **Reels module** and its flow, including a physician-specific content-policy check
  and a moderation path that accounts for users with no Academy Manager.
- Added the **Independent Coach flow**, including an explicit "can/cannot do" boundary and an
  upgrade path into a full Org Membership that never duplicates the account.
- Added **Coach Profile** as a first-class entity — previously a coach only existed implicitly as
  an assignment target for a batch, with no standalone profile.

## Suggested future features (flagged, not built)

These extend naturally from the changes above but weren't requested — noting them for you to
weigh in on:

- **Follow system** — follow a coach/athlete to prioritize their Reels in Discover.
- **Direct messaging** — coach ↔ prospective athlete/parent, useful once independent coaches are
  discoverable via Reels/profile.
- **Coach marketplace/booking** — independent coaches offering paid private sessions, with
  in-app booking and payment.
- **Leaderboards/gamification** — tied to Practice Levels or attendance streaks.
- **Push notifications** — for Reels engagement and academy announcements (pairs with issue #3
  above).
- **Extend independent access beyond Coach** — the Identity model already supports an
  Athlete training independently (browse/apply to academies) or a Physician building a public
  reputation before affiliating; only new registration flows would be needed, no further
  architecture change.

---
[← Product Rules](08-product-rules.md) · [Next: Milestones →](10-milestones.md)
