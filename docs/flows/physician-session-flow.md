# Physician Session Flow

```mermaid
flowchart LR
    A[Request Session] --> B[Physician Reviews Authorized Profile]
    B --> C[Conducts Session]
    C --> D["Records Assessment & Recommendations"]
    D --> E["Sets Training Status\n(Cleared / Restricted / Temporarily Not Cleared)"]
    E --> F[Follow-up]
```

Medical data is **role-restricted** — only the physician (and authorized roles) can view the
full medical profile (see [Product Rules](../08-product-rules.md)). The resulting training
status directly gates whether an athlete can participate in training and competitions.

---
[← Performance Flow](performance-flow.md) · [Next: Academy Transfer Flow →](academy-transfer-flow.md)
