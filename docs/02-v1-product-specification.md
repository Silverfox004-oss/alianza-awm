# V1 Product Specification

**Notion URL:** https://www.notion.so/31ed807b91118127b505e60cd62fb0c2  
**Parent:** AI Workforce Map

---

**Working Name:** AI Workforce Map  
**Purpose:** Assess employees for AI-adjacent roles inside a business and produce: readiness score, role-fit ranking, risk flags, upskill path, and team-wide talent map for leadership.  
**Build Difficulty:** 6/10 (valuable product) — 8/10 (enterprise reliable)  
**Estimated Build Timeline:** 10–12 weeks

---

## V1 Buyer Outcome
A company uploads or enters a list of employees and has each person complete a 20–35 minute assessment.

At the end, leadership gets:
- Who can support AI adoption now
- Who is best suited for which AI-adjacent role
- Who is risky to place near autonomous workflows
- Who is trainable within 30–90 days
- What capability gaps require external hiring

---

## V1 Output Roles (5 Lanes)

| # | Role | Description |
|---|------|-------------|
| 1 | **AI Operator** | Runs defined AI workflows reliably |
| 2 | **AI Approver** | Reviews outputs, decides approve/edit/reject, handles escalation. Separated from general supervisor because many companies need human checkpoint operators, not broad supervisors. |
| 3 | **AI Workflow Translator** | Turns business tasks into structured AI-enabled workflows. "Translator" better than "Designer" because many candidates won't be technical builders — they'll be process translators. |
| 4 | **AI QA / Risk Reviewer** | Finds bad outputs, hidden errors, unsafe logic, weak sourcing, broken handoffs |
| 5 | **AI Change Champion** | Helps teams adopt the system, teaches usage, documents patterns, reduces friction. Many rollouts fail because the smartest person is not the best adoption bridge. |

---

## V1 Scoring Domains (7 Domains)

| # | Domain | What It Measures |
|---|--------|-----------------|
| 1 | **Task Framing** | Can this person translate vague goals into bounded, structured instructions? |
| 2 | **Process Thinking** | Can they break work into steps, dependencies, approvals, and exceptions? |
| 3 | **Verification Instinct** | Do they naturally check, compare, validate, and question outputs? |
| 4 | **Exception Handling** | When things go wrong, can they catch, triage, and escalate correctly? |
| 5 | **Risk Judgment** | Can they tell the difference between safe automation and risky automation? |
| 6 | **Operational Consistency** | Will they follow rules, document actions, and operate repeatably? |
| 7 | **Change Leverage** | Can they help others use the system, communicate clearly, and become internal leverage? |

**Scoring Scale (per trait):**
- 0 = unsafe / poor
- 1 = weak
- 2 = acceptable
- 3 = strong
- 4 = excellent

Scores are converted to normalized domain scores out of 100.

---

## V1 Assessment Structure (6 Modules, ~20 Tasks)

### Module 1: Safe Use Judgment
Tests whether the employee understands when AI is useful, risky, or inappropriate.
- 6 short items (multiple-choice + short answer)
- Example: "Can this task be fully automated, approval-gated, or human-only?"

### Module 2: Structured Instruction
Tests ability to frame tasks for AI clearly.
- 3 written tasks
- Example: "Rewrite a messy business request into a usable AI instruction."

### Module 3: Output Review (QA / Error Detection)
Tests ability to identify bad output, weak evidence, or unsafe assumptions.
- 5 review tasks
- Example: "Review 3 AI-generated customer summaries and rank them by safety."

### Module 4: Workflow Logic
Tests process design and human/AI division of labor.
- 3 tasks
- Example: "Build the correct handoff between agent, approver, and operator."

### Module 5: Failure and Escalation (Adversarial Stress)
Tests what they do when the system gives a plausible but flawed answer.
- 3 live turns
- Example: "AI gives a polished answer with weak support and the manager wants speed. What now?"

### Module 6: Adoption Fit
Tests whether the person can communicate and stabilize rollout.
- Example: "Your department is skeptical and confused. How do you introduce this system without creating chaos?"

---

## V1 Scoring Output (4 Layers)

### Layer 1: Readiness Band
- Not Ready
- Emerging
- Capable
- Strong
- High-Leverage

### Layer 2: Best-Fit Lane Ranking
Example: (1) AI Approver, (2) AI QA / Risk Reviewer, (3) AI Operator

### Layer 3: Risk Flags
Examples: Over-trusts polished outputs, under-specifies constraints, weak escalation habits, poor exception handling under pressure

### Layer 4: Deployment Recommendation
Examples: Suitable for approval-gated workflows only, can support pilot rollout in bounded process, should not oversee autonomous systems yet

---

## Reliability Layer
A person may sound smart once but be unreliable. V1 adds **reliability modifiers**:
- Contradiction across answers
- Overconfidence
- Failure to verify when prompted
- Unsafe automation bias
- Inconsistency under pressure
- Inability to explain reasoning clearly

These reduce final role-fit scores.

---

## Role-Fit Mapping Logic

| Role | Strong If... |
|------|-------------|
| **AI Operator** | Adequate instruction quality, good discipline, acceptable verification, low risk flags |
| **AI Approver** | Very good verification, strong ambiguity judgment, strong QA instinct, measured approvals |
| **AI Workflow Translator** | Strong systems thinking, strong instruction design, decent ambiguity handling |
| **AI QA / Risk Reviewer** | Elite error detection, strong skepticism, strong contradiction spotting |
| **AI Change Champion** | Clear communication, patience, documentation instinct, team friction reduction |

---

## Training Tracks (Post-Assessment)

| Track | Criteria |
|-------|----------|
| **Track A: Ready Now** | Can support pilots immediately |
| **Track B: Trainable in 30 Days** | Needs lightweight upskilling |
| **Track C: Trainable in 60–90 Days** | Potential exists, but gaps are meaningful |
| **Track D: Not Suitable Yet** | Keep outside AI-critical functions for now |

---

## V1 Employer Dashboard
The dashboard answers 5 questions and should look like **AI deployment planning**, not HR analytics.

| Question | What It Shows |
|----------|---------------|
| **Where can we start safely?** | Which teams have enough Operators + Approvers + QA coverage? |
| **Where are we structurally weak?** | Do we lack reviewers? Enthusiastic users but no risk control? |
| **Who are our internal leverage people?** | Who can help adopt AI without external dependence? |
| **What should remain human-only?** | If department readiness is low, the tool says so clearly |
| **Where do we need outside help?** | E.g., workflow translation weak across company |

Additional views: Employee heatmap, Role-fit distribution, Team Readiness Map (per department), Top AI candidates by role, Risk concentration dashboard, Training recommendations

---

## V1 Product Flow

### Step 1: Company Setup
Admin enters: company name, department(s), AI adoption goals, risk sensitivity level, target functions.

### Step 2: Employee Intake (~3 min)
Name, title, department, years of experience, manager/IC, current tool usage, prior AI exposure, confidence with ambiguity.

### Step 3: Core Assessment (~20–30 min)
Employee completes 6 modules (Modules 1–6 above).

### Step 4: Scoring + Synthesis
System scores across rubrics, runs second-pass challenge grader, outputs: domain scores, role-fit ranking, confidence level, risk flags, training recommendation.

### Step 5: Employer Dashboard
Admin sees team-level and individual-level results.

---

## V1 Prompt Architecture (Multi-Prompt Chain)

| # | Component | Responsibility |
|---|-----------|----------------|
| 1 | **Orchestrator** | User state, module progression, question selection, timing, routing |
| 2 | **Scenario Engine** | Pulls tasks from structured scenario library with markers and weights |
| 3 | **Examiner** | Interacts with employee, asks follow-ups, introduces ambiguity |
| 4 | **Primary Grader** | Evaluates responses against rubric, outputs structured JSON |
| 5 | **Skeptic Grader** | Re-checks for inflated scoring, missed risk, inconsistency |
| 6 | **Synthesizer** | Converts scores into employee report, manager report, dashboard metrics |

Pattern: **Generate → Test → Score → Challenge → Synthesize**

---

## V1 Scenario System

### The Formula
A scenario = **Task Primitive + Failure Mode + Role Lens + Business Skin**

### 8 Task Primitives
Summarize, Extract, Classify, Draft, Compare, Approve/Reject, Route/Handoff, Escalate/Investigate

### 10 Failure Modes
Unsupported claim, Omission of key detail, False confidence, Stale/incomplete context, Policy violation, Wrong classification, Broken handoff, Unsafe automation, Ambiguous instruction, Escalation failure

### 12 Scenario Archetypes
1. **Automation Boundary** — AI-only vs. approval-gated vs. human-only?
2. **Instruction Rewrite** — Turn vague request into usable AI instruction
3. **Output Comparison** — Choose the safer/stronger of two AI outputs
4. **Hidden Error Review** — Polished output with factual/logical problems
5. **Missing Context** — Incomplete response due to weak input
6. **Workflow Handoff** — Design correct human/AI handoff
7. **Escalation Judgment** — When to stop, ask for help, or block
8. **Stakeholder Pressure** — Manager wants speed; output is questionable
9. **Exception Handling** — Inputs conflict, tool returns uncertainty
10. **Adoption/Communication** — Help team use AI without causing chaos
11. **Policy/Constraint Adherence** — Keep tool inside guardrails
12. **Drift/Repeated Failure** — Detect system consistently going wrong

### V1 Library Size
- 12 archetypes x 2 base variants = **24 total scenario cards**
- Each employee sees 6–8 scenarios + follow-ups
- 3 difficulty levels: Obvious → Mixed → Deceptive

---

## Structured Markdown Architecture (Content Operating Layer)
The product uses **structured Markdown (.md) files** as the content operating layer for scenarios, rubrics, and role definitions. This separates knowledge design from engineering and enables rapid iteration without code changes.

### Why Markdown
- **Non-engineers can build the product** — product designers, domain experts, and researchers iterate on scenarios without touching application code
- **Version control is trivial** — Markdown works perfectly with Git, enabling traceable scenario evolution
- **Scenarios become test cases** — each scenario file has expected behavior, failure behavior, and automated testing potential
- **LLMs handle Markdown natively** — headings create structure, lists define rules, code blocks preserve artifacts, metadata can be embedded
- **RAG-ready** — Markdown files can later become vector embeddings, RAG documents, or knowledge graph nodes

### Required File Structure
Every scenario file must follow exactly the same schema with three parts:

**1. YAML Metadata Header** (machine-readable)
```yaml
---
scenario_id: QA-04
archetype: hidden_error_review
difficulty: medium
target_roles: [ai_approver, ai_qa_reviewer]
domains: [verification_instinct, exception_handling]
artifact_type: ai_summary
---
```

**2. Scenario Body** (the user experience)
```markdown
# Scenario
You are reviewing an AI-generated lead summary.
## Original Notes
...
## AI Output
...
## Task
Approve, edit, or reject the output and explain your reasoning.
```

**3. Scoring Rubric** (the measurement)
```markdown
# Strong Indicators
- identifies unsupported claim
- proposes verification step
# Weak Indicators
- approves without questioning
# Red Flags
- "looks fine to me"
- "I trust the AI here"
```

### File Organization
```
/scenarios
  /approval
    approval_under_pressure.md
    approval_missing_context.md
  /qa
    hidden_error_review.md
    unsupported_claim.md
/rubrics
  verification_instinct.md
  exception_handling.md
/roles
  ai_operator.md
  ai_approver.md
  workflow_translator.md
```

### Architecture Pipeline
Markdown Scenario Files → Scenario Loader → Assessment Engine → Candidate Response → LLM Evaluation Prompt → Structured Score Output → Dashboard

### Best Hybrid Model (Recommended for V1)
**Markdown + lightweight database index**: Markdown stores the full scenario content. Database stores metadata fields (scenario_id, difficulty, archetype, domains, role_targets) for filtering and querying. The app loads Markdown files based on database lookups.

---

## V1 Data Model
- **Employee:** id, company_id, title, department, seniority, ai_exposure, assessment_status
- **Scenario:** id, archetype, domain_targets, role_relevance, difficulty, scenario_text, ideal_markers, red_flags, scoring_rubric, time_target
- **Response:** employee_id, scenario_id, raw_response, followup_response, timestamps
- **Evaluation:** response_id, domain_scores, red_flags, confidence, grader_notes, skeptic_notes
- **RoleFit:** employee_id, operator_score, approver_score, workflow_translator_score, qa_score, change_champion_score, recommended_lane, training_priority
- **CompanyReport:** team_distribution, strength_clusters, risk_clusters, hire_recommendations

---

## V1 UI (Keep It Simple)

### Employee Side — 3 Screens
1. Welcome / instructions
2. Assessment experience
3. Final results summary

### Employer Side — 5 Views
1. Overview
2. Employee ranking
3. Role-fit matrix
4. Risk dashboard
5. Training recommendations

---

## V1 Build Sequence

| Week | Milestone |
|------|-----------|
| **1–2** | Define: domains, output roles, scoring rubric, red flags |
| **3–4** | Write: 30–40 scenarios, ideal answer markers, grading JSON schema |
| **5–6** | Build: assessment flow, grader chain, result synthesis, basic dashboard |
| **7–8** | Pilot with 20–50 people, hand-review results, calibrate scoring |

### Minimal Team Required
- 1 full-stack developer
- 1 product designer / domain expert
- 1 prompt / evaluation designer

---

## What NOT to Build in V1
- Deep personality testing
- IQ testing as the headline
- Full psychometric claims
- Custom verticalization for 20 industries
- Complex external labor market benchmarking
- Automated hiring decisions
- Full autonomy recommendations
- External candidate ranking

**V1 is a decision support product, not an oracle.**
