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

---
[← Flows](flows/academy-transfer-flow.md) · [Next: Product Pages →](06-product-pages.md)
