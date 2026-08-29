# Performance Flow

```mermaid
flowchart LR
    A[Coach Selects Athlete] --> B[Creates Assessment]
    B --> C["Records Sport-Specific Skills & Fitness Metrics"]
    C --> D[Adds Feedback]
    D --> E[Compares History]
    E --> F[Saves Assessment]
    F --> G[Recommends Level Promotion]
```

Assessments are **historical** — every assessment is retained as an immutable record so
progress can be compared over time, not overwritten (see
[Product Rules](../08-product-rules.md)). A completed assessment can recommend a
[practice level](../05-data-model.md#practice-levels) promotion.

---
[← Attendance Flow](attendance-flow.md) · [Next: Physician Session Flow →](physician-session-flow.md)
