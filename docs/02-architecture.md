# 2. Architecture

## Core Hierarchy

```mermaid
flowchart TD
    Org[Organization] --> Academy[Academies / Branches]
    Academy --> Dept[Sports / Departments]
    Dept --> Program[Programs]
    Program --> Batch[Batches]
    Batch --> Coach[Coaches / Trainers]
    Batch --> Athlete[Athletes / Members]
```

`Organization → Academies / Branches → Sports / Departments → Programs → Batches →
Coaches / Trainers + Athletes / Members`

One organization can operate multiple academies. Every entity below Organization is scoped to
its parent, so data (attendance, performance, billing) always rolls up cleanly to an academy
and ultimately to the organization.

## Academy Category

Each academy carries a **category** — a single classification attribute answering "what kind
of academy is this?" (e.g. Football Academy, Cricket Academy). This is separate from the
Sports/Departments layer in the hierarchy above:

- **Category** is the academy's primary classification, used for branding, search/filtering on
  the public site (Academy Directory, Programs page), and reporting (e.g. revenue or athlete
  count by category).
- **Sports/Departments** is the operational layer underneath the academy that actually defines
  which sports/programs it runs.

For a single-sport academy the two line up (a "Cricket Academy" runs a Cricket department). For
an academy that runs several sports, category is set to `Multi-Sport` while its
Sports/Departments layer still lists each sport individually — no data is lost either way.

| Example categories |
|---|
| Football Academy |
| Cricket Academy |
| Basketball Academy |
| Tennis Academy |
| Swimming Academy |
| Athletics / Track & Field Academy |
| Martial Arts Academy |
| Fitness & Gym |
| Multi-Sport Academy |

Category is set when an academy is created and can be changed by an Academy Manager or Super
Admin; it does not affect existing athlete, program, or batch data.

## User Roles

| Role | Scope |
|------|-------|
| Super Admin / Owner | Organization-wide control |
| Academy Manager | Manages a single academy/branch |
| Coach / Trainer | Runs batches: attendance, training, performance |
| Physician | Medical sessions and clearance status |
| Nutritionist | Nutrition plans and guidance |
| Receptionist | Front-desk: registration, payments, scheduling support |
| Athlete / Member | Own profile, schedule, performance, achievements |
| Parent / Guardian | View into a linked athlete's profile (Phase 2 dashboard) |

Permissions are role-based and data-sensitive: medical data in particular is
role-restricted (see [Product Rules](08-product-rules.md)).

---
[← Overview](01-overview.md) · [Next: Modules →](03-modules.md)
