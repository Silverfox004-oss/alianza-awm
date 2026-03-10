# Role Taxonomy — 5 AI Roles

**Notion URL:** https://www.notion.so/31ed807b911181609b24e76ec00c96ce  
**Parent:** Phase 0 — Research & Foundation > AI Workforce Map

---

**Version:** 1.0  
**Date:** March 9, 2026  
**Status:** Implementation-Ready  
**Dependencies:** deliverable_scoring_domains.md, deliverable_scoring_rubric.md

---

## How to Use This Document

This taxonomy defines the five AI-adjacent roles that the AI Workforce Map assessment identifies. Each role definition includes behavioral markers that the scoring rubric uses to determine role fit. The "Minimum Domain Score Thresholds" section for each role connects directly to the 7 scoring domains defined in `deliverable_scoring_domains.md` and the role-fit mapping logic in `deliverable_scoring_rubric.md`.

**For developers:** Use the role definitions and domain thresholds to implement the role-fit algorithm. The minimum thresholds are expressed as normalized scores (0–100) derived from the 0–4 raw domain scores.

**For scenario writers:** Use the "Observable Strong Signals" and "Red Flags" to design scenario rubrics that discriminate between role-fit levels.

**For the grading pipeline:** The "Observable Weak Signals" and "Red Flags" map directly to marker-based scoring tiers (Strong Indicators, Weak/Partial Indicators, Red Flags) in the rubric.

---

## Role 1: AI Operator

### Definition
The AI Operator reliably executes defined AI-enabled workflows by following established procedures, entering correct inputs, monitoring outputs for obvious errors, and escalating when results fall outside expected parameters. This role is the operational backbone of AI deployment — the person who runs the machinery daily with discipline and consistency. The Operator does not design workflows or make judgment calls on ambiguous outputs; they execute known processes and flag anything unexpected.

### Core Responsibilities
1. **Execute structured AI workflows** according to documented procedures
2. **Prepare and validate inputs** before submitting them to AI systems
3. **Monitor outputs for obvious deviations** from expected patterns
4. **Follow escalation protocols** when outputs appear abnormal
5. **Document operational activity** including inputs submitted, outputs received, exceptions encountered
6. **Maintain workflow cadence** by completing tasks on schedule
7. **Report recurring patterns** such as repeated errors, degraded output quality

### Observable Strong Signals
- **Follows procedures precisely even under time pressure.**
- **Catches surface-level output errors without being prompted.**
- **Escalates appropriately rather than improvising.**
- **Documents actions without being asked.**
- **Distinguishes between "looks wrong" and "I don't know if this is right."**
- **Asks for clarification on ambiguous instructions before proceeding.**

### Observable Weak Signals
- **Follows most steps but skips verification under pressure.**
- **Identifies errors only when they are extremely obvious.**
- **Over-relies on the system's confidence indicators.**
- **Documents only when explicitly required.**
- **Escalates too broadly.**

### Red Flags
- **Approves or forwards outputs without any verification.**
- **Improvises solutions to problems outside their scope.**
- **Ignores documented procedures.**
- **Cannot distinguish between different types of AI errors.**
- **Shows impatience with repetitive work.**
- **Blames the system for errors without taking ownership of their operational responsibilities.**

### Minimum Domain Score Thresholds (Normalized 0–100)

| Domain | Minimum | Weight |
|--------|---------|--------|
| Task Framing | 40 | Secondary |
| Process Thinking | 50 | Primary |
| Verification Instinct | 50 | Primary |
| Exception Handling | 40 | Secondary |
| Risk Judgment | 35 | Tertiary |
| Operational Consistency | 65 | **Primary (Critical)** |
| Change Leverage | 20 | Tertiary |

**Role assignment rule:** Must meet ALL Primary minimums AND at least 2 of 3 Secondary/Tertiary minimums. Operational Consistency is the gating domain — candidates below 65 should not be assigned this role regardless of other scores.

---

## Role 2: AI Approver

### Definition
The AI Approver serves as the human decision gate in AI-enabled workflows, reviewing AI-generated outputs and making approve/edit/reject decisions based on quality standards, organizational policy, and contextual judgment. This role requires the ability to evaluate whether an output is good enough for its intended purpose — not just whether it's technically correct, but whether it's appropriate, complete, safe, and aligned with business intent.

### Core Responsibilities
1. **Make approve/edit/reject decisions** on AI-generated outputs
2. **Evaluate output quality across multiple dimensions** simultaneously
3. **Apply contextual judgment** that the AI cannot
4. **Handle escalations from Operators** by reviewing flagged outputs
5. **Maintain approval velocity without sacrificing quality**
6. **Provide structured feedback** when rejecting outputs
7. **Set and enforce approval standards** for their domain

### Observable Strong Signals
- **Balances speed and quality explicitly.**
- **Evaluates on multiple dimensions without being prompted.**
- **Makes clear, committal decisions with reasoning.**
- **Distinguishes between "imperfect but acceptable" and "needs rework."**
- **Considers the audience and context of the output.**
- **Provides actionable rejection feedback.**

### Observable Weak Signals
- **Makes approval decisions but can't articulate the reasoning.**
- **Applies a single quality dimension.**
- **Defaults to reject when uncertain.**
- **Approves too quickly under pressure.**
- **Provides vague rejection feedback.**

### Red Flags
- **Rubber-stamps everything.**
- **Cannot distinguish between severity levels of errors.**
- **Defers all decisions upward.**
- **Over-trusts polished AI outputs.**
- **Makes approval decisions based on effort rather than quality.**
- **Ignores context or audience.**

### Minimum Domain Score Thresholds (Normalized 0–100)

| Domain | Minimum | Weight |
|--------|---------|--------|
| Task Framing | 40 | Secondary |
| Process Thinking | 40 | Secondary |
| Verification Instinct | 65 | **Primary (Critical)** |
| Exception Handling | 55 | Primary |
| Risk Judgment | 60 | **Primary (Critical)** |
| Operational Consistency | 50 | Secondary |
| Change Leverage | 25 | Tertiary |

**Role assignment rule:** Must meet BOTH Critical Primary minimums (Verification Instinct ≥ 65 AND Risk Judgment ≥ 60). Must also meet Exception Handling ≥ 55.

---

## Role 3: AI Workflow Translator

### Definition
The AI Workflow Translator converts business processes and operational tasks into structured, AI-compatible workflows by identifying which components can be automated, which require human checkpoints, and how handoffs between human and AI should be sequenced. This is a design and systems-thinking role — the Translator understands both the business logic of what needs to happen and the operational constraints of how AI tools work. They don't write code, but they architect the process logic that developers and Operators implement.

### Core Responsibilities
1. **Decompose business processes into AI-compatible components**
2. **Define the human-AI handoff points** in each workflow
3. **Translate vague business requests into structured AI instructions**
4. **Design exception handling paths** for each workflow
5. **Balance automation ambition with operational reality**
6. **Iterate workflow designs based on operational feedback**
7. **Document workflow logic** in formats actionable by developers and understandable by business stakeholders

### Observable Strong Signals
- **Breaks problems into structured components unprompted.**
- **Identifies what should NOT be automated.**
- **Specifies inputs, outputs, and quality criteria for each step.**
- **Anticipates failure modes.**
- **Thinks about the people who will operate the workflow.**
- **Distinguishes between "possible to automate" and "should automate."**
- **Proposes iterative deployment.**

### Observable Weak Signals
- **Identifies some components but misses the connective logic.**
- **Over-automates without justifying the choice.**
- **Designs for the happy path only.**
- **Uses vague language for key specifications.**
- **Focuses on technology over process.**

### Red Flags
- **Cannot decompose a process into steps.**
- **Ignores human roles in the workflow.**
- **Confuses "AI can do this" with "AI should do this."**
- **Cannot translate between business language and operational language.**
- **Proposes solutions that ignore stated constraints.**
- **No concept of versioning or iteration.**

### Minimum Domain Score Thresholds (Normalized 0–100)

| Domain | Minimum | Weight |
|--------|---------|--------|
| Task Framing | 65 | **Primary (Critical)** |
| Process Thinking | 70 | **Primary (Critical)** |
| Verification Instinct | 45 | Secondary |
| Exception Handling | 55 | Primary |
| Risk Judgment | 55 | Primary |
| Operational Consistency | 40 | Tertiary |
| Change Leverage | 40 | Secondary |

**Role assignment rule:** Must meet BOTH Critical Primary minimums (Task Framing ≥ 65 AND Process Thinking ≥ 70). Must also meet Exception Handling ≥ 55 and Risk Judgment ≥ 55.

---

## Role 4: AI QA / Risk Reviewer

### Definition
The AI QA / Risk Reviewer systematically evaluates AI-generated outputs for accuracy, completeness, consistency, and risk before or after they enter operational workflows. This role goes beyond the Approver's real-time judgment calls to conduct structured quality audits, identify systemic failure patterns, assess downstream risks, and recommend process corrections. The QA/Risk Reviewer is the organization's defense against AI errors that are too subtle, too infrequent, or too context-dependent for frontline review to catch reliably.

### Core Responsibilities
1. **Conduct structured quality audits** of AI output samples
2. **Identify systemic error patterns** across output batches
3. **Assess risk levels** of identified errors
4. **Investigate root causes** of quality failures
5. **Recommend and test process corrections**
6. **Maintain quality metrics** and track performance over time
7. **Brief stakeholders** on quality trends and risk levels

### Observable Strong Signals
- **Thinks in patterns, not just incidents.**
- **Distinguishes between error types** (factual, logical, formatting, scope).
- **Proposes root cause hypotheses** before being asked.
- **Quantifies risk** rather than describing it qualitatively.
- **Considers downstream impact** of errors that reach end users.
- **Designs verification protocols** that are systematic and repeatable.

### Observable Weak Signals
- **Reviews individual outputs but misses patterns.**
- **Identifies errors but cannot categorize them.**
- **Describes problems without proposing solutions.**
- **Treats all errors with equal urgency** regardless of risk level.

### Red Flags
- **Cannot identify errors in polished AI output** containing subtle mistakes.
- **Conflates frequency with severity.**
- **Proposes quality checks that are too burdensome** to sustain operationally.
- **Cannot articulate what "acceptable quality" means** in measurable terms.

### Minimum Domain Score Thresholds (Normalized 0–100)

| Domain | Minimum | Weight |
|--------|---------|--------|
| Task Framing | 40 | Tertiary |
| Process Thinking | 55 | Secondary |
| Verification Instinct | 75 | **Primary (Critical)** |
| Exception Handling | 60 | Primary |
| Risk Judgment | 65 | **Primary (Critical)** |
| Operational Consistency | 55 | Secondary |
| Change Leverage | 25 | Tertiary |

**Role assignment rule:** Must meet BOTH Critical Primary minimums (Verification Instinct ≥ 75 AND Risk Judgment ≥ 65). These are the highest gating thresholds of any role, reflecting the QA/Risk Reviewer's role as the last line of defense.

---

## Role 5: AI Change Champion

### Definition
The AI Change Champion drives adoption of AI-enabled workflows by helping colleagues understand, trust, and effectively use AI tools. This role sits at the intersection of communication, coaching, and change management. The Change Champion doesn't need to be the most technically sophisticated AI user — they need to be the most effective at helping others navigate the transition, addressing fears and misconceptions, and building organizational confidence in AI-assisted work.

### Core Responsibilities
1. **Model effective AI use** in their own work
2. **Coach colleagues** on AI-assisted workflows
3. **Communicate clearly** about what AI can and cannot do
4. **Identify and address adoption barriers**
5. **Gather and relay feedback** from end users to workflow designers
6. **Build organizational confidence** in AI-assisted processes
7. **Advocate for responsible AI deployment**

### Observable Strong Signals
- **Explains AI concepts in accessible, non-technical language.**
- **Anticipates fears and misconceptions** before they become barriers.
- **Uses concrete examples** rather than abstract descriptions.
- **Acknowledges AI limitations** honestly while maintaining confidence in appropriate use.
- **Motivates without overselling.**

### Observable Weak Signals
- **Uses technical jargon** that non-technical colleagues won't understand.
- **Focuses on capabilities without addressing concerns.**
- **Oversells AI** in ways that will erode trust when limitations appear.

### Red Flags
- **Cannot explain AI in plain language.**
- **Dismisses colleagues' concerns** rather than addressing them.
- **Becomes an AI booster** without critical perspective.
- **Cannot distinguish between appropriate and inappropriate AI use** in their own advocacy.

### Minimum Domain Score Thresholds (Normalized 0–100)

| Domain | Minimum | Weight |
|--------|---------|--------|
| Task Framing | 45 | Secondary |
| Process Thinking | 35 | Tertiary |
| Verification Instinct | 40 | Tertiary |
| Exception Handling | 35 | Tertiary |
| Risk Judgment | 45 | Secondary |
| Operational Consistency | 45 | Secondary |
| Change Leverage | 70 | **Primary (Critical)** |

**Role assignment rule:** Change Leverage ≥ 70 is the gating requirement. This is the highest single-domain gate of any role. A person who cannot effectively communicate about and advocate for AI use cannot perform the Change Champion role regardless of other scores.

---

## Cross-Role Reference: Domain Importance Matrix

| Domain | AI Operator | AI Approver | AI Workflow Translator | AI QA / Risk Reviewer | AI Change Champion |
|--------|:-----------:|:-----------:|:---------------------:|:--------------------:|:-----------------:|
| Task Framing | Secondary | Secondary | **Critical** | Tertiary | Secondary |
| Process Thinking | **Primary** | Secondary | **Critical** | Secondary | Tertiary |
| Verification Instinct | **Primary** | **Critical** | Secondary | **Critical** | Tertiary |
| Exception Handling | Secondary | **Primary** | **Primary** | **Primary** | Tertiary |
| Risk Judgment | Tertiary | **Critical** | **Primary** | **Critical** | Secondary |
| Operational Consistency | **Critical** | Secondary | Tertiary | Secondary | Secondary |
| Change Leverage | Tertiary | Tertiary | Secondary | Tertiary | **Critical** |

**How to read this table:** "Critical" domains are gating thresholds — failing them disqualifies from the role. "Primary" domains are heavily weighted. "Secondary" and "Tertiary" domains contribute to the score but are not gating.
