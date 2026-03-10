# Scenario Template + Validation Rules

**Notion URL:** https://www.notion.so/31ed807b911181bf9360ef31a811afa8  
**Parent:** Phase 1.5 — Structured Markdown Architecture > AI Workforce Map

---

## Scenario Template

This is the standardized template for all scenario markdown files. Copy this template when creating a new scenario.

```markdown
---
id: "SCN-000"                    # Stable ID (SCN-001 through SCN-024)
title: ""                         # Human-readable title
slug: ""                          # kebab-case URL-safe slug
version: "1.0.0"                 # Semantic version

# Classification
archetype: ""                    # One of: automation-boundary, instruction-rewrite, output-comparison,
                                 #   hidden-error-review, missing-context, workflow-handoff,
                                 #   escalation-judgment, stakeholder-pressure, exception-handling,
                                 #   adoption-communication, policy-adherence, drift-detection
module: 1                        # 1-6 (1=Foundation, 2=Workflow Design, 3=Quality & Verification,
                                 #   4=Risk & Judgment, 5=Adversarial/Pressure, 6=Leadership & Change)
difficulty: 3                    # 1-5
industry: ""                     # e.g., "insurance", "healthcare", "legal"

# Assessment Targeting
primary_domains:                 # 2-3 from the 7 domains
  - ""                           # Options: task-framing, process-thinking, verification-instinct,
                                 #   exception-handling, risk-judgment, operational-consistency, change-leverage
secondary_domains:               # 1-2 additional domains
  - ""
target_roles:                    # Roles this scenario discriminates for
  - ""                           # Options: ai-operator, ai-approver, workflow-translator,
                                 #   qa-risk-reviewer, change-champion

# Lifecycle
status: "draft"                  # draft | review | published | archived
created_at: 2026-03-09
updated_at: 2026-03-09
variant_of: null                 # null for base scenarios; parent SCN ID for variants (e.g., "SCN-001")
---

## Situation

<!-- 150-300 word scenario setup. -->

## The Challenge

<!-- 50-100 words. Defines the specific decision or tension. -->

## Your Task

<!-- 50-150 words. Explicit instructions for the assessment-taker. -->

## Follow-Up Pressure Prompt

<!-- 50-100 words. Second prompt introducing pressure or contradictory information. -->

## Scoring Rubric

### Primary Domains

<!-- For each primary domain (2-3), provide score anchors at levels 0-4 -->

### Secondary Domains

<!-- For each secondary domain (1-2), provide score anchors at levels 0-4 -->

## Ideal Response Guide

<!-- 100-200 words describing what an expert-level (Score 4) response looks like -->

## Common Mistakes

<!-- Bulleted list of 4-8 common errors -->

## Red Flags

<!-- Bulleted list of 3-5 behaviors that trigger Score 0 or Score 1 -->

## Reliability Modifier Triggers

<!-- Address contradiction, reasoning absence, and pressure capitulation -->
```

---

## Validation Rules

### 1. YAML Frontmatter Constraints

#### 1.1 Required Fields
Every scenario file **must** include all of the following YAML frontmatter fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier matching pattern `SCN-[0-9]{3}` |
| `title` | string | Yes | Non-empty human-readable title (max 120 chars) |
| `slug` | string | Yes | Kebab-case URL-safe string matching `^[a-z0-9]+(-[a-z0-9]+)*$` |
| `version` | string | Yes | Semantic version matching `^[0-9]+\.[0-9]+\.[0-9]+$` |
| `archetype` | string | Yes | Must be one of the 12 allowed archetype values |
| `module` | integer | Yes | Integer 1-6 |
| `difficulty` | integer | Yes | Integer 1-5 |
| `industry` | string | Yes | Non-empty industry label |
| `primary_domains` | array | Yes | 1-3 domain slugs |
| `secondary_domains` | array | Yes | 1-3 domain slugs |
| `target_roles` | array | Yes | 1-5 role slugs |
| `status` | string | Yes | One of: `draft`, `review`, `published`, `archived` |
| `created_at` | date | Yes | ISO 8601 date |
| `updated_at` | date | Yes | ISO 8601 date |
| `variant_of` | string or null | Yes | Null for base scenarios; valid SCN ID for variants |

#### 1.2 Allowed Values

**Archetype** (exactly one):
- `automation-boundary`
- `instruction-rewrite`
- `output-comparison`
- `hidden-error-review`
- `missing-context`
- `workflow-handoff`
- `escalation-judgment`
- `stakeholder-pressure`
- `exception-handling`
- `adoption-communication`
- `policy-adherence`
- `drift-detection`

**Domain slugs** (used in `primary_domains` and `secondary_domains`):
- `task-framing`
- `process-thinking`
- `verification-instinct`
- `exception-handling`
- `risk-judgment`
- `operational-consistency`
- `change-leverage`

**Role slugs** (used in `target_roles`):
- `ai-operator`
- `ai-approver`
- `workflow-translator`
- `qa-risk-reviewer`
- `change-champion`

**Status values:**
- `draft` — In development, not available for assessments
- `review` — Under review, not available for assessments
- `published` — Active and available for assessments
- `archived` — Retired, not available for new assessments

#### 1.3 Cross-Field Constraints

| Rule | Constraint | Error Level |
|------|------------|-------------|
| No domain overlap | `primary_domains` and `secondary_domains` must be disjoint sets | ERROR |
| Domain count | `primary_domains` must have 1-3 entries; `secondary_domains` must have 1-3 entries | ERROR |
| Total domains | Combined primary + secondary must be between 2 and 6 | ERROR |
| Module range | `module` must be an integer between 1 and 6 inclusive | ERROR |
| Difficulty range | `difficulty` must be an integer between 1 and 5 inclusive | ERROR |
| Version format | Must match semantic versioning `MAJOR.MINOR.PATCH` | ERROR |
| Date ordering | `updated_at` must be >= `created_at` | WARNING |
| Variant reference | If `variant_of` is not null, the referenced SCN ID must exist in the scenario index | ERROR |
| Variant archetype | If `variant_of` is set, the variant's archetype must match its parent's archetype | ERROR |
| ID uniqueness | No two scenario files may share the same `id` | ERROR |
| Slug uniqueness | No two scenario files may share the same `slug` | ERROR |
| ID range | Base scenarios: SCN-001 through SCN-012; Variants: SCN-013 through SCN-024 | WARNING |
| Filename convention | Filename must match `{id_lower}-{archetype_slug}[-{industry_slug}].md` | WARNING |

---

### 2. Body Section Constraints

#### 2.1 Required Sections
Every scenario file must contain the following Markdown sections **in this exact order**:
1. `## Situation`
2. `## The Challenge`
3. `## Your Task`
4. `## Follow-Up Pressure Prompt`
5. `## Scoring Rubric` (with `### Primary Domains` and `### Secondary Domains` subsections)
6. `## Ideal Response Guide`
7. `## Common Mistakes`
8. `## Red Flags`
9. `## Reliability Modifier Triggers`

#### 2.2 Section Content Rules

| Section | Min Length | Max Length | Notes |
|---------|-----------|-----------|-------|
| Situation | 150 words | 500 words | Must establish role, company, AI tool, and context |
| The Challenge | 50 words | 200 words | Must contain an embedded conflict or tension |
| Your Task | 50 words | 300 words | Must be actionable with specific deliverables |
| Follow-Up Pressure Prompt | 30 words | 200 words | Must introduce new pressure or contradictory info |
| Ideal Response Guide | 80 words | 400 words | Must describe Score 4 behavior end-to-end |
| Common Mistakes | — | — | Must contain at least 3 bulleted items |
| Red Flags | — | — | Must contain at least 2 bulleted items |
| Reliability Modifier Triggers | — | — | Must address contradiction, reasoning absence, and pressure capitulation |

---

### 3. File Organization Constraints

#### 3.1 Directory Rules
```
content/
  scenarios/
    base/       ← SCN-001 through SCN-012 (base scenarios only)
    variants/   ← SCN-013 through SCN-024 (variants only)
```

- Base scenarios (variant_of: null) must be in `scenarios/base/`
- Variant scenarios (variant_of: SCN-XXX) must be in `scenarios/variants/`
- No scenario files in any other directory

#### 3.2 Filename Convention
**Base scenarios:** `SCN-{NNN}-{archetype-slug}.md`  
Example: `SCN-001-automation-boundary.md`

**Variant scenarios:** `SCN-{NNN}-{archetype-slug}-{industry-slug}.md`  
Example: `SCN-013-automation-boundary-healthcare.md`

---

### 4. Referential Integrity Constraints

| Constraint | Description |
|------------|-------------|
| Domain references valid | All domain slugs in frontmatter must exist in `content/rubrics/` |
| Role references valid | All role slugs in `target_roles` must exist in `content/roles/` |
| Variant parent exists | If `variant_of` is set, a scenario with that ID must exist in `scenarios/base/` |
| Archetype coverage | All 12 archetypes must have at least one published base scenario |
| Domain coverage | All 7 domains must appear as primary in at least 2 scenarios |

---

### 5. Validation Error Levels

| Level | Behavior |
|-------|----------|
| **ERROR** | File is invalid. Must not be used in assessments. Build pipeline rejects. |
| **WARNING** | File may have issues. Allowed in draft/review status. Must be resolved before `published`. |
| **INFO** | Style or convention suggestion. Does not block any status. |
