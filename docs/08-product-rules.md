# 8. Key Product Rules

These rules are non-negotiable constraints that should hold across every module and flow:

- **One organization can operate multiple academies.**
- **Athletes can transfer without losing history.** A transfer updates the athlete's current
  academy; it never duplicates or resets the athlete record (see
  [Academy Transfer Flow](flows/academy-transfer-flow.md)).
- **Assessments are historical.** Performance assessments are append-only records, never
  overwritten (see [Performance Flow](flows/performance-flow.md)).
- **Attendance is session-based.** Each record ties to a specific session of a specific batch
  (see [Attendance Flow](flows/attendance-flow.md)).
- **Practice-level changes are permanent records.** Promotions are logged, not overwritten (see
  [Practice Levels](05-data-model.md#practice-levels)).
- **Medical data is role-restricted.** Only authorized roles (physician, and roles explicitly
  granted access) can view medical records.
- **Important actions should have audit trails.** Transfers, level promotions, clearance
  changes, and payments should be traceable to who performed them and when.
- **Platform identity is independent of org membership.** A Platform Account (and its content,
  e.g. Reels) is never duplicated or lost when a user joins, leaves, or switches organizations —
  this generalizes the transfer rule above to all accounts, not just athletes (see
  [Identity & Membership Model](02-architecture.md#identity--membership-model)).
- **Reels must not expose role-restricted data.** A Reel can never reveal an identifiable
  athlete's medical or performance record without that athlete's (or guardian's) consent — this
  applies with extra force to Physicians (see [Reels Flow](flows/reels-flow.md)).
- **Independent users are scope-limited.** Anyone without an Org Membership (e.g. an
  [independent coach](flows/independent-coach-flow.md)) gets community features only — no
  academy operational data — until they hold one.

---
[← Roadmap](07-roadmap.md) · [Next: Architecture Review →](09-architecture-review.md)
