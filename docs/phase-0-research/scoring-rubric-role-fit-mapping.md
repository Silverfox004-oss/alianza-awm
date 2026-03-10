# Scoring Rubric & Role-Fit Mapping

**Notion URL:** https://www.notion.so/31ed807b91118140afabc410436c0d81

---

## AI Workforce Map — Scoring Pipeline Specification
**Version:** 1.0  
**Date:** March 9, 2026  
**Status:** Implementation-Ready  
**Dependencies:** deliverable_role_[taxonomy.md](http://taxonomy.md), deliverable_scoring_[domains.md](http://domains.md), scoring_schema.json
---
## How to Use This Document
This document defines the complete scoring pipeline — from individual scenario responses to final employee reports. It is the authoritative reference for implementing the scoring logic.
**For developers:** Implement the formulas exactly as specified. The JSON schema in `scoring_schema.json` defines the data structures. The worked example at the end of this document serves as an integration test — your implementation should produce matching results for the same inputs.
**For the grading pipeline:** The 0–4 scoring scale, reliability modifiers, and aggregation formulas define how the LLM grader's output flows through the system.
**For product managers:** The readiness bands, training tracks, and role-fit outputs define what the employee and employer see.
---
## Section 1: Scoring Scale (0–4)
### Scale Definition
Every scenario response is scored on a 0–4 scale for each domain the scenario targets. This scale is intentionally compressed (5 levels, not 10) to maximize grading reliability between the LLM grader and human calibration benchmarks, consistent with research showing that 0–5 scales produce the strongest human-LLM alignment (ICC = 0.853).
| Score | Label | Anchor Description | General Behavioral Marker |
|---|---|---|---|
| :-----: | ------- | -------------------- | ----------------------- |
| **0** | Unsafe/Poor | Response demonstrates behavior that would cause harm, create risk, or fail catastrophically in the role. | Ignores the domain entirely; takes actions that would produce downstream damage; no awareness of the competency being measured. |
| **1** | Weak | Response shows minimal awareness of the domain but the behavior is insufficient for any AI-adjacent role. | Surface-level engagement; gestures toward the right behavior without substance; critical gaps in execution. |
| **2** | Acceptable | Response demonstrates adequate competency for routine, supervised operations. | Core behavior present; handles routine cases; misses at least one significant secondary consideration. |
| **3** | Strong | Response demonstrates solid competency suitable for independent work. | Core behavior plus edge case awareness; multiple dimensions considered; proactive rather than reactive. |
| **4** | Excellent | Response demonstrates exceptional competency that indicates leadership potential in the domain. | All Level 3 behaviors plus: systemic thinking; second-order consequence awareness; process improvement proposals. |
### Per-Domain Score Examples
Detailed behavioral examples for each score level within each domain are defined in `deliverable_scoring_domains.md`. The grading pipeline should reference those domain-specific markers, not just the general anchors above.
### Scoring Rules
1. **Score the demonstrated behavior, not the stated intention.** "I would carefully verify everything" (intention) is not the same as identifying 3 specific errors (demonstration). Default to the lower score when intention and demonstration diverge.
2. **Score each domain independently.** A response may demonstrate Level 4 Verification Instinct and Level 1 Exception Handling simultaneously.
3. **Half-scores are not permitted.** Scores must be integers 0, 1, 2, 3, or 4.
4. **A scenario may target 2–4 domains.** Each targeted domain receives its own score. Non-targeted domains receive no score (null), not zero.
5. **Follow-up responses are scored as modifiers to the initial response score.** A follow-up can raise or lower the initial score by up to 1 point per domain.
---
## Section 2: Reliability Modifiers
### Purpose
Reliability modifiers detect patterns across an employee's full assessment that indicate the scores may overstate actual capability. A person might produce one excellent response and five mediocre ones, or consistently sound confident while making poor decisions. Reliability modifiers reduce role-fit scores to account for these patterns.
### The 6 Reliability Modifiers
#### RM-1: Contradiction Across Answers
**What it detects:** The employee gives conflicting positions on the same issue in different scenarios.
**Detection criteria:**
- Employee states a principle in one scenario and violates it in another
- Employee's recommended action in one scenario would undermine their recommended action in another
- Employee provides conflicting risk assessments for equivalent risk levels
**Score impact:** -0.5 per contradicted domain score. Maximum reduction: -1.0 total per domain.
**Example:** Employee scores 3 on Verification Instinct in Scenario A but scores 1 on the same domain in Scenario D (forwards an AI output without checking). RM-1 reduces Scenario A score by 0.5.
---
#### RM-2: Overconfidence
**What it detects:** The employee demonstrates certainty beyond what the evidence supports.
**Detection criteria:**
- Uses absolutist language ("this is definitely correct," "there's no risk here") in situations with genuine ambiguity
- Recommends final actions without any verification or contingency planning
- Dismisses potential problems without evidence
**Score impact:** -0.5 applied to Risk Judgment domain score. If severe (3+ instances), additional -0.5 applied to Verification Instinct.
---
#### RM-3: Failure to Verify When Prompted
**What it detects:** The scenario explicitly presents an opportunity or cue to verify, and the employee skips verification.
**Detection criteria:**
- Scenario contains an explicit verification cue (suspicious data, low confidence score, colleague flag) and the employee proceeds without checking
- Follow-up question asks "how would you verify this?" and the employee cannot articulate a method
**Score impact:** -1.0 applied to Verification Instinct domain score for the specific scenario. This is the most severe per-scenario modifier.
---
#### RM-4: Unsafe Automation Bias
**What it detects:** The employee consistently favors automation over human oversight, even when the risk profile clearly calls for human involvement.
**Detection criteria:**
- Recommends full automation for 2+ tasks that are flagged as high-risk or human-judgment-required
- Proposes removing existing human checkpoints to improve "efficiency" without assessing the risk tradeoff
- Treats human review as a bottleneck rather than a safeguard
**Score impact:** -0.5 applied to Risk Judgment per instance (maximum -1.5 total). Additionally flags: "Unsafe Automation Bias — not suitable for workflow design or approval roles without additional training."
---
#### RM-5: Inconsistency Under Pressure
**What it detects:** The employee's quality of reasoning degrades significantly when the scenario introduces time pressure, authority pressure, or adversarial conditions.
**Detection criteria:**
- A drop of 2+ points on the same domain between a non-pressure and pressure scenario
- Employee explicitly abandons stated principles when the scenario introduces pressure
**Score impact:** -0.5 applied to the affected domain score in the pressure scenario. Additionally flags: "Quality degrades under pressure — assign to supervised roles only until trained."
---
#### RM-6: Inability to Explain Reasoning
**What it detects:** The employee reaches a correct or reasonable conclusion but cannot articulate *why*.
**Detection criteria:**
- Follow-up question asks "why did you choose this approach?" and the employee cannot provide a coherent rationale
- Employee's initial response is a conclusion without supporting reasoning
- Employee uses circular reasoning
**Score impact:** -0.5 applied to the domain score of the scenario where reasoning is absent. Additionally reduces Change Leverage by 0.25.
---
### Reliability Modifier Application Rules
1. **Modifiers are applied after initial scoring but before domain aggregation.** Pipeline: Raw scenario scores → Apply reliability modifiers → Aggregate to domain scores.
2. **Modifiers can reduce scores but never below 0.**
3. **Modifiers stack but are capped.** Total reliability modifier reduction per domain per assessment is capped at -2.0.
4. **Modifier detection should be performed by the skeptic grader**, not the primary grader.
5. **All modifier applications must be logged** with the specific evidence for audit trail purposes.
---
## Section 3: Domain Score Aggregation
### From Scenario Scores to Domain Scores
Each domain is targeted by multiple scenarios across the assessment. The domain score aggregation converts per-scenario domain scores into a single domain score (0–100 normalized scale).
#### Step 1: Collect Per-Scenario Domain Scores
For each domain, collect all scenario scores (after reliability modifier application) where that domain was a target. Null scores (scenarios that didn't target the domain) are excluded.
#### Step 2: Calculate Weighted Average
Not all scenarios contribute equally. Scenarios where the domain is the *primary* target carry more weight.
```javascript
Domain_Raw = Σ(scenario_score × scenario_weight) / Σ(scenario_weight)

Where:
  scenario_weight = 1.0 if domain is PRIMARY target
  scenario_weight = 0.6 if domain is SECONDARY target
  scenario_weight = 0.3 if domain is TERTIARY target
```
Example for Verification Instinct:
- Scenario A (primary): 3.0 × 1.0 = 3.0
- Scenario C (primary): 2.5 × 1.0 = 2.5
- Scenario E (secondary): 3.0 × 0.6 = 1.8
Domain_Raw = (3.0 + 2.5 + 1.8) / (1.0 + 1.0 + 0.6) = 7.3 / 2.6 = 2.808
#### Step 3: Normalize to 0–100
```javascript
Domain_Normalized = (Domain_Raw / 4.0) × 100
Example: (2.808 / 4.0) × 100 = 70.2
```
#### Step 4: Apply Confidence Penalty
If a domain has fewer than 2 primary-target scenarios, apply a confidence penalty:
```javascript
If primary_scenario_count  2 domains below threshold, OR 2 | 60–90 days | Potential exists but gaps are broad. Needs structured development program. |
| **D** | Not Suitable Yet | 1 | Reassess in 6 months | Recommend foundational AI literacy training before re-assessment. |
### Training Recommendations by Domain Gap
| Domain Gap | Recommended Training Focus |
|---|---|
| Task Framing \ 1 on any domain, flag for human review
    Output: Validated per-scenario domain scores (0-4)
                    ↓
STAGE 3: RELIABILITY MODIFIER DETECTION (cross-scenario)
    Step 3a: Skeptic LLM reviews ALL responses together
    Step 3b: Checks for 6 reliability modifiers (RM-1 through RM-6)
    Step 3c: Applies score reductions per modifier rules
    Output: Modified per-scenario domain scores (0-4, may include decimals)
                    ↓
STAGE 4: DOMAIN AGGREGATION
    For each of 7 domains:
      Step 4a: Collect all scenario scores targeting this domain
      Step 4b: Apply weighted average (primary=1.0, secondary=0.6, tertiary=0.3)
      Step 4c: Normalize to 0-100 scale
      Step 4d: Apply confidence penalty if  formatting). Proposes transparency with the board. Documents the decision if overridden. Level 3: proportional risk response with clear reasoning. |
| Exception Handling | 3 | Clear triage: identifies what to check first, what can be deferred, and how to handle the VP disagreement. Proposes a concrete fallback (VP approval + documentation) if the preferred approach is rejected. Maintains composure under authority pressure. |
| Verification Instinct | 2 | Under pressure, verification is still present but reduced. Proposes checking key numbers but acknowledges some sections will go unverified. This is acceptable triage but represents a reduction from her non-pressure performance. *(Note: No RM-5 trigger — the reduction is only 1 point from Scenario 3, not the 2-point threshold.)* |
| Operational Consistency | 2 | Mentions documentation of the decision (good), but the response implicitly accepts deviating from the standard review process. Doesn't reference the standard operating procedure or propose how to prevent this situation in the future. |
| Flag ID | Flag Name | Detection Source | Impact |
|---|---|---|---|
| RF-1 | Over-trusts polished outputs | RM-3 + low Verification Instinct in hidden-error scenarios | "Should not be placed in Approver or QA roles without verification training" |
| RF-2 | Under-specifies constraints | Task Framing consistently ≤ 1 across scenarios | "Needs Task Framing training before Operator or Translator roles" |
| RF-3 | Weak escalation habits | Exception Handling ≤ 1 in escalation scenarios | "Should not handle exceptions independently" |
| RF-4 | Poor exception handling under pressure | RM-5 | "Quality degrades under pressure — assign to low-urgency workflows" |
| RF-5 | Unsafe automation bias | RM-4 | "Should not design or approve workflows — restrict to Operator role with oversight" |
| RF-6 | Cannot explain reasoning | RM-6 across 2+ scenarios | "Not suitable for Approver, Translator, or Champion roles" |
| RF-7 | Contradictory judgment | RM-1 across 2+ scenarios | "Inconsistent judgment — may perform unpredictably in varied situations" |