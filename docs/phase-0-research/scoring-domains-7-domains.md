# Scoring Domains — 7 Domains

**Notion URL:** https://www.notion.so/31ed807b91118185900cf126fd1ebaed

---

## AI Workforce Map — 7 Assessment Domains
**Version:** 1.0  
**Date:** March 9, 2026  
**Status:** Implementation-Ready  
**Dependencies:** deliverable_role_[taxonomy.md](http://taxonomy.md), deliverable_scoring_[rubric.md](http://rubric.md)
---
## How to Use This Document
This document defines the 7 scoring domains used by the AI Workforce Map assessment. Each domain includes:
- A definition of what it measures
- Observable behaviors at each score level (0–4)
- Role relevance weights (which roles depend on this domain)
- Best scenario archetypes for testing (maps to the 12 archetypes in the V1 spec)
- Common scoring errors (calibration guidance for the LLM grading pipeline)
**For the grading pipeline:** Use the behavior descriptions at each score level as the primary rubric anchors. The LLM grader should identify which level's behaviors best match the response, then assign the score. The "Common Scoring Errors" section should be included in the skeptic grader prompt.
**For scenario writers:** The "Best Scenario Archetypes" section indicates which archetypes generate the strongest signal for each domain. Ensure each domain is tested by at least 2–3 scenarios in any assessment instance.
**Scale note:** The assessment uses a 0–4 raw scoring scale per scenario per domain. Raw scores are converted to normalized 0–100 domain scores using the aggregation formulas in `deliverable_scoring_rubric.md`.
---
## Domain 1: Task Framing
### What It Measures
Task Framing assesses whether a person can translate vague, ambiguous, or poorly structured goals into bounded, specific, and actionable instructions suitable for AI execution. This is the foundational skill of converting human intent ("make this better," "help with customer complaints," "summarize our data") into structured inputs that produce useful AI outputs. It includes the ability to identify what's missing from a request, specify constraints, define success criteria, and scope the task to an appropriate size.
### Observable Behaviors by Score Level
#### Score 0 — Unsafe/Poor
**Behavior:** Passes vague requests directly to AI without any restructuring.
**Example:** Given "Use AI to help with our marketing," the response repeats or slightly rephrases the same instruction. No constraints, no scope, no success criteria, no input specification.
**Markers:** No decomposition of the task. No identification of missing information. No constraints or boundaries specified. No success criteria.
---
#### Score 1 — Weak
**Behavior:** Attempts to add some structure but the instruction remains too broad or misses critical elements.
**Example:** Given "Use AI to help with our marketing," writes: "Use AI to create marketing emails for our products. Make them professional and engaging." — Adds a *what* but lacks: which products, what audience, what tone, what length, what CTA, what compliance constraints.
**Markers:** Identifies a task type but leaves multiple critical parameters undefined. Missing audience specification. Missing output format or length. Missing quality criteria beyond vague adjectives.
---
#### Score 2 — Acceptable
**Behavior:** Produces a structured instruction that addresses the core task with reasonable specificity. Includes most major parameters but may miss edge cases, exception handling, or secondary requirements.
**Example:** "Draft 3 email subject lines and body copy (150–200 words each) for our Q2 product launch targeting existing enterprise customers. Tone should be professional but not overly formal. Include a clear CTA to schedule a demo. Do not mention pricing or competitor comparisons."
**Markers:** Task is scoped to a specific deliverable. Audience identified. Format and length specified. Major constraints included. Missing one or two secondary elements.
---
#### Score 3 — Strong
**Behavior:** Produces a well-structured instruction that is specific, bounded, and anticipates common issues. Includes task type, audience, format, constraints, quality criteria, and at least one contingency or edge case consideration.
**Example:** Includes everything at Level 2, plus: specifies which product features to highlight, references the brand voice guide, includes an example of a previous successful email for tone calibration, specifies what to do if the AI generates unsupported claims, and defines how outputs will be evaluated.
**Markers:** All Level 2 markers present. Edge case handling included. Quality evaluation criteria defined. Context or reference materials specified. The instruction is reproducible.
---
#### Score 4 — Excellent
**Behavior:** Produces an instruction that is expertly structured, demonstrates deep understanding of the translation challenge, and includes elements that prevent predictable failure modes. May also identify that the original request needs to be reframed.
**Example:** Includes everything at Level 3, plus: identifies that "help with our marketing" is too broad and proposes breaking it into 3 distinct workstreams. Specifies the approval workflow (draft → marketing lead review → legal compliance check → send), defines what "failure" looks like, and proposes a feedback loop where approved/rejected emails improve future instructions.
**Markers:** All Level 3 markers present. Reframes the original request if poorly scoped. Considers downstream workflow implications. Specifies input requirements. Defines failure modes and how to handle them.
---
### Role Relevance
| Role | Weight | Rationale |
|---|---|---|
| AI Workflow Translator | **Primary (Critical)** | Task Framing is the core skill — Translators must convert business needs into AI-executable structures |
| AI Change Champion | Secondary | Champions need to help others frame tasks |
| AI Operator | Secondary | Operators need to recognize when inputs are poorly framed and flag them |
| AI Approver | Secondary | Approvers need to assess whether poor framing caused a poor output |
| AI QA / Risk Reviewer | Tertiary | QA Reviewers benefit from framing skill but their core job is detecting output problems |
### Best Scenario Archetypes
| Archetype | Signal Strength | Why |
|---|---|---|
| ----------- | :--------------: | ----- |
| **2. Instruction Rewrite** | ★★★★★ | Directly tests the framing translation skill |
| **5. Missing Context** | ★★★★ | Tests whether the person identifies what's missing |
| **1. Automation Boundary** | ★★★ | Requires framing judgment about what AI can/should handle |
| **6. Workflow Handoff** | ★★★ | Requires framing each step's inputs and outputs |
### Common Scoring Errors
1. **Rewarding length over specificity.** A long instruction with many vague phrases should score lower than a shorter instruction with precise parameters.
2. **Confusing domain knowledge with framing skill.** Deep domain expertise ≠ excellent framing skill.
3. **Ignoring the reframing signal.** A Level 4 response may push back on the original request. Reward this as sophisticated framing.
4. **Over-crediting constraint lists.** Assess whether constraints are *actionable*, not just *present*.
---
## Domain 2: Process Thinking
### What It Measures
Process Thinking assesses whether a person can decompose work into sequential steps, identify dependencies between steps, define handoff points between humans and AI, and anticipate where the process needs decision gates, exception paths, or quality checks. This is the architectural thinking skill — the ability to see a workflow as a system of interconnected parts rather than a single monolithic task.
### Observable Behaviors by Score Level
#### Score 0 — Unsafe/Poor
**Behavior:** Cannot break a process into steps. Treats the entire workflow as a single action or describes steps in a jumbled, non-sequential order with no attention to dependencies.
**Example:** Asked to design a workflow for AI-assisted invoice processing, writes: "The AI processes the invoices and sends them for payment."
**Markers:** No step decomposition. No sequential logic. No identification of dependencies. No human-AI handoff points. No quality gates.
---
#### Score 1 — Weak
**Behavior:** Identifies some steps but the sequence is incomplete, dependencies are ignored, and critical process elements are missing. The workflow has obvious gaps where things could go wrong.
**Example:** "Step 1: AI reads the invoices. Step 2: AI categorizes them. Step 3: Finance approves the payments." Missing: data extraction validation, matching invoices to POs, handling discrepancies, exception path for unmatched invoices.
**Markers:** Some steps identified but major steps missing. Dependencies between steps not addressed. At least one critical handoff or quality gate absent.
---
#### Score 2 — Acceptable
**Behavior:** Breaks the process into a logical sequence of steps with clear ordering. Identifies the main human-AI handoff points and includes at least one quality check or approval gate.
**Example:** "Step 1: AI extracts data from invoice images. Step 2: System matches extracted data against purchase orders. Step 3: If match found, route to finance for approval review. Step 4: Finance approves or rejects. Step 5: Approved invoices queued for payment." No handling for partial matches, missing POs, or duplicate invoices.
**Markers:** Steps are sequential and logically ordered. Main human-AI handoff points identified. At least one approval/quality gate present. Happy path is functional. Missing exception handling.
---
#### Score 3 — Strong
**Behavior:** Designs a workflow with clear step sequencing, well-defined handoff points, multiple quality gates, and exception handling for the most common failure scenarios.
**Example:** Everything at Level 2, plus: "Step 2a: If match confidence is below 90%, flag for human review. Step 2b: If no PO match found, route to the requestor. Step 3a: For amounts over \$10,000, require two-person approval. Step 6: Log all decisions with timestamps and rationale for audit trail."
**Markers:** All Level 2 markers present. Exception paths defined for common failure modes (2+). Different handling for different risk levels. Audit/documentation requirements included.
---
#### Score 4 — Excellent
**Behavior:** Designs a comprehensive workflow system that includes step sequencing, dependency logic, exception handling, feedback loops, performance metrics, and continuous improvement mechanisms.
**Example:** Everything at Level 3, plus: identifies parallel processing opportunities. Defines performance metrics: extraction accuracy rate, PO match rate, average approval time. Proposes a weekly review where common exception types are analyzed. Notes: "In the first 4 weeks, all AI-extracted invoices should be manually verified (100% audit) to calibrate the extraction accuracy threshold."
**Markers:** All Level 3 markers present. Parallel processing opportunities identified. Performance metrics defined. Feedback loop or continuous improvement mechanism included. Pilot/calibration phase proposed.
---
### Role Relevance
| Role | Weight | Rationale |
|---|---|---|
| AI Workflow Translator | **Primary (Critical)** | Process Thinking is the Translator's defining capability |
| AI Operator | Primary | Operators must understand the process they're executing |
| AI QA / Risk Reviewer | Secondary | QA Reviewers need process understanding to identify where failures originate |
| AI Approver | Secondary | Approvers benefit from understanding where their decision point sits in the larger process |
| AI Change Champion | Tertiary | Champions need basic process awareness to explain workflows to others |
### Best Scenario Archetypes
| Archetype | Signal Strength | Why |
|---|---|---|
| ----------- | :--------------: | ----- |
| **6. Workflow Handoff** | ★★★★★ | Directly tests process decomposition and handoff design |
| **1. Automation Boundary** | ★★★★ | Requires thinking about which process steps belong to AI vs. humans |
| **9. Exception Handling** | ★★★★ | Tests whether the person designs for process failure, not just happy path |
| **4. Hidden Error Review** | ★★★ | Tests understanding of where in the process errors originate |
### Common Scoring Errors
1. **Rewarding step count over step quality.** A response with 12 poorly defined steps should score lower than one with 6 well-defined steps with clear handoffs.
2. **Ignoring missing dependencies.** A response may list steps in the right order but ignore that Step 3 depends on data produced in Step 1.
3. **Overlooking the human experience.** A technically sound workflow that would be impossible for an Operator to follow should score lower than one that's practical.
4. **Confusing Process Thinking with Task Framing.** Task Framing is about structuring a single AI instruction. Process Thinking is about structuring the workflow that the instruction lives within.
---
## Domain 3: Verification Instinct
### What It Measures
Verification Instinct assesses whether a person naturally checks, compares, validates, and questions AI-generated outputs before accepting or passing them along. This is not learned process compliance but an internalized behavioral tendency — the instinct to ask "is this actually right?" before trusting what the AI produced.
### Observable Behaviors by Score Level
#### Score 0 — Unsafe/Poor
**Behavior:** Accepts AI outputs at face value without any verification.
**Example:** Given an AI-generated market analysis with a fabricated statistic, recommends sharing it with the client: "the analysis is well-written and thorough." No questioning, checking, or validation.
**Markers:** No verification behavior. Accepts polished output as evidence of accuracy. Would pass errors to downstream consumers.
---
#### Score 1 — Weak
**Behavior:** Shows minimal verification behavior — may mention checking "in general" but doesn't identify what specifically needs checking or how.
**Example:** Says "I'd review it before sending" but doesn't identify the fabricated statistic. Catches a formatting inconsistency but misses substantive errors.
**Markers:** Mentions verification in general terms. Catches only surface-level errors. Misses factual errors, logical inconsistencies, or unsupported claims.
---
#### Score 2 — Acceptable
**Behavior:** Identifies the most important things to verify and demonstrates a reasonable verification approach. Catches at least one substantive error.
**Example:** Identifies that key statistics should be cross-referenced with original source data. Catches the fabricated statistic: "I can't verify this 43% market share claim — I'd need to check the source report."
**Markers:** Identifies specific elements to verify. Catches at least one substantive error. Proposes a verification method. Distinguishes high-risk claims from low-risk elements.
---
#### Score 3 — Strong
**Behavior:** Demonstrates systematic verification — identifies multiple categories of potential error, applies appropriate methods for each, and prioritizes by risk/impact.
**Example:** Systematically reviews: (1) statistical claims against source data, (2) logical consistency between sections, (3) completeness, (4) recency. Catches the fabricated statistic AND identifies a logical inconsistency. Notes: "The tone of certainty in paragraph 3 doesn't match the evidence — the AI is stating a correlation as causation."
**Markers:** All Level 2 markers present. Multiple error categories checked. Multiple substantive errors caught. Verification is systematic. Skepticism is calibrated. Recognizes that AI confidence ≠ accuracy.
---
#### Score 4 — Excellent
**Behavior:** Expert-level verification that goes beyond checking what's present to identifying what's missing, what's misleadingly framed, and what downstream risks exist even for technically accurate outputs.
**Example:** Everything at Level 3, plus: identifies that the analysis omits a major competitor. Notes the narrative frames market position more favorably than the data supports even after fixing the statistic. Proposes a standard verification checklist for future market analyses.
**Markers:** All Level 3 markers present. Identifies errors of omission. Evaluates narrative framing and tone. Considers fitness for purpose beyond accuracy. Proposes systematized verification processes.
---
### Role Relevance
| Role | Weight | Rationale |
|---|---|---|
| AI QA / Risk Reviewer | **Primary (Critical)** | Verification Instinct is the QA Reviewer's defining capability |
| AI Approver | **Primary (Critical)** | Approvers must verify before approving |
| AI Operator | Primary | Operators need verification to catch obvious errors |
| AI Workflow Translator | Secondary | Translators need verification awareness to design workflows with appropriate verification steps |
| AI Change Champion | Tertiary | Champions benefit from verification awareness but don't primarily verify outputs |
### Best Scenario Archetypes
| Archetype | Signal Strength | Why |
|---|---|---|
| ----------- | :--------------: | ----- |
| **4. Hidden Error Review** | ★★★★★ | Directly tests ability to find errors in polished AI output |
| **3. Output Comparison** | ★★★★★ | Tests comparative verification |
| **8. Stakeholder Pressure** | ★★★★ | Tests whether verification instinct survives time pressure |
| **12. Drift/Repeated Failure** | ★★★ | Tests whether verification standards eroding over time is noticed |
### Common Scoring Errors
1. **Confusing stated intention with demonstrated capability.** Score based on what they *do*, not what they *say they'd do*.
2. **Over-crediting paranoia.** Calibrated skepticism scores higher than blanket distrust.
3. **Missing the omission signal.** Identifying what's *wrong* is Level 2–3. Identifying what's *missing* is Level 3–4.
4. **Penalizing efficient triage.** "The formatting looks good so I'll focus on the data claims" is Level 3+ behavior, not insufficient verification.
---
## Domain 4: Exception Handling
### What It Measures
Exception Handling assesses what a person does when things go wrong — when AI outputs are unexpected, when inputs conflict, when systems fail, or when edge cases arise. This domain measures the ability to detect exceptions, triage severity, decide on the right response (fix, escalate, halt, work around), and communicate the situation clearly.
### Observable Behaviors by Score Level
#### Score 0 — Unsafe/Poor
**Behavior:** Ignores exceptions entirely or freezes without taking any action.
**Example:** AI produces a customer communication with contradictory refund instructions. The response sends it anyway.
**Markers:** Exception not detected or detected but no response attempted. No triage. No escalation. Process continues as if the exception didn't occur.
---
#### Score 1 — Weak
**Behavior:** Detects the exception but responds inappropriately — either overreacts or underreacts. Cannot distinguish severity levels.
**Example:** Detects the contradiction but responds by stopping all company-wide communications and emailing the CEO. Or: notes the inconsistency but sends anyway.
**Markers:** Exception detected but response is miscalibrated. No clear decision framework for handling the exception.
---
#### Score 2 — Acceptable
**Behavior:** Detects the exception, correctly assesses basic severity, and takes a reasonable response action.
**Example:** Catches the contradiction, holds the communication, routes it back for correction with a specific note: "paragraphs 2 and 4 contradict each other on the refund policy — needs to match our actual policy before sending."
**Markers:** Exception detected. Severity reasonably assessed. Immediate harm prevented. Appropriate action taken. Root cause investigation not present.
---
#### Score 3 — Strong
**Behavior:** Detects the exception, accurately triages severity, takes the right immediate action, communicates clearly, and investigates whether the exception is isolated or part of a pattern.
**Example:** Everything at Level 2, plus: "Before regenerating, I'd check the last 10 communications from this template — this might be a template issue. I'd also notify the Approver to review this batch more carefully." Under time pressure: "I'd send the client a delay notice while I fix this — sending a contradictory communication is worse than being 20 minutes late."
**Markers:** All Level 2 markers present. Pattern investigation initiated. Root cause hypothesis formed. Downstream impact considered. Composure maintained under pressure.
---
#### Score 4 — Excellent
**Behavior:** Expert-level exception handling including immediate triage, root cause investigation, pattern analysis, stakeholder communication, process improvement recommendations, and documentation.
**Example:** Everything at Level 3, plus: categorizes the exception by type and severity tier. Documents in the error tracking system. Proposes: "We should add an automated consistency check for customer communications referencing policy-dependent content." Under extreme pressure, articulates tradeoff reasoning explicitly.
**Markers:** All Level 3 markers present. Exception categorized by type and severity. Documentation included naturally. Specific process improvement recommended. Creative alternatives proposed under pressure.
---
### Role Relevance
| Role | Weight | Rationale |
|---|---|---|
| AI Approver | Primary | Approvers handle escalations from Operators — exception handling IS much of the job |
| AI QA / Risk Reviewer | Primary | QA Reviewers investigate exceptions as evidence of systemic issues |
| AI Workflow Translator | Primary | Translators must design exception paths into workflows |
| AI Operator | Secondary | Operators need to detect and escalate exceptions |
| AI Change Champion | Tertiary | Champions encounter adoption exceptions but at lower severity |
### Best Scenario Archetypes
| Archetype | Signal Strength | Why |
|---|---|---|
| ----------- | :--------------: | ----- |
| **9. Exception Handling** | ★★★★★ | Directly tests exception detection, triage, and response |
| **7. Escalation Judgment** | ★★★★★ | Tests when to stop, ask for help, or block |
| **8. Stakeholder Pressure** | ★★★★ | Tests exception handling under time/authority pressure |
| **5. Missing Context** | ★★★ | Tests response to an input-level exception |
| **12. Drift/Repeated Failure** | ★★★ | Tests response to a systemic, recurring exception pattern |
### Common Scoring Errors
1. **Not distinguishing escalation quality from escalation presence.** The *quality* of escalation matters as much as its presence.
2. **Penalizing caution unfairly.** Halting a dangerous process pending investigation is correct — only penalize when the exception is clearly minor.
3. **Missing the pressure test.** Assess whether the response *changes* under pressure.
4. **Confusing Exception Handling with Verification Instinct.** Verification is about *detecting* that something is wrong. Exception Handling is about *what you do about it*.
---
## Domain 5: Risk Judgment
### What It Measures
Risk Judgment assesses whether a person can distinguish between safe automation, risky automation, and situations that require human-only handling. This includes evaluating the consequences of AI errors in different contexts, assessing whether a given task's risk level is appropriate for AI execution, and applying proportional safeguards based on risk severity. Risk Judgment is not about being risk-averse — it's about being risk-*calibrated*: knowing where the real dangers are and applying oversight proportional to the actual stakes.
### Observable Behaviors by Score Level
#### Score 0 — Unsafe/Poor
**Behavior:** Shows no awareness that different AI use cases carry different risk levels. Treats all AI tasks as either "fine to automate" or "too dangerous for AI" with no calibration.
**Example:** Asked whether to automate customer refund approvals under \$50 vs. contract termination notices: treats both the same way with no risk differentiation.
**Markers:** No risk differentiation between tasks. No consideration of error consequences. No proportional safeguarding. Would either over-automate dangerous tasks or block all automation.
---
#### Score 1 — Weak
**Behavior:** Shows basic awareness that some tasks are riskier than others but cannot accurately assess *which* tasks are riskier or *why*. Risk assessment is based on surface-level heuristics rather than consequence analysis.
**Example:** Correctly identifies contract termination notices are higher risk than refund approvals, but cannot articulate why. Proposes the same approval gate for both.
**Markers:** Basic high/low risk distinction present but poorly reasoned. Cannot articulate specific consequences of AI errors. Safeguards are not proportional to risk.
---
#### Score 2 — Acceptable
**Behavior:** Accurately assesses risk levels for different AI tasks and can articulate the consequences of AI errors. Proposes safeguards roughly proportional to risk level.
**Example:** "\$50 refund approvals: low risk — financial impact bounded, errors correctable. AI automation with random audit sampling is appropriate." "Contract termination notices: high risk — incorrect notice creates legal liability, damages client relationship. Needs full human review before sending."
**Markers:** Multiple risk levels accurately identified. Consequences articulated for each level. Safeguards roughly proportional to risk. At least one human-only boundary correctly identified.
---
#### Score 3 — Strong
**Behavior:** Demonstrates sophisticated risk assessment considering multiple risk dimensions (financial, legal, reputational, safety, compliance), probability AND severity of errors, and second-order consequences.
**Example:** Everything at Level 2, plus: "The risk for termination notices isn't just the individual letter — sending a wrong notice and retracting it undermines credibility for all future notices. Reputational risk exceeds transactional risk." Proposes tiered thresholds: automated for \\$5,000.
**Markers:** All Level 2 markers present. Multiple risk dimensions considered. Second-order consequences identified. Safeguard strategies are nuanced and tiered.
---
#### Score 4 — Excellent
**Behavior:** Expert-level risk judgment considering tail risks, systemic risks, and emergent risks including risks created by the safeguards themselves (e.g., approval fatigue leading to rubber-stamping).
**Example:** Everything at Level 3, plus: "If the Approver reviews 100 communications daily, verification quality will degrade by communication 75 — the safeguard itself becomes a risk. We should rotate reviewers or limit daily review volume." Also: "If the AI is trained on our historical communications that had compliance issues, it will reproduce those issues at scale. We should audit the training data, not just the outputs."
**Markers:** All Level 3 markers present. Tail/systemic risks identified. Risks created by safeguards themselves considered. Risk monitoring over time proposed. Residual risk explicitly addressed with acceptance criteria.
---
### Role Relevance
| Role | Weight | Rationale |
|---|---|---|
| AI Approver | **Primary (Critical)** | Approvers make risk-weighted accept/reject decisions constantly |
| AI QA / Risk Reviewer | **Primary (Critical)** | QA Reviewers assess systemic risk and recommend safeguards |
| AI Workflow Translator | Primary | Translators must build appropriate risk controls into workflow designs |
| AI Change Champion | Secondary | Champions need risk awareness to credibly address team concerns about AI safety |
| AI Operator | Tertiary | Operators need basic risk awareness but escalate rather than make risk-level decisions |
### Best Scenario Archetypes
| Archetype | Signal Strength | Why |
|---|---|---|
| ----------- | :--------------: | ----- |
| **1. Automation Boundary** | ★★★★★ | Directly tests risk judgment — safe vs. risky vs. human-only |
| **8. Stakeholder Pressure** | ★★★★★ | Tests whether risk judgment holds when pressured to accept risk |
| **11. Policy/Constraint Adherence** | ★★★★ | Tests risk awareness in the context of regulatory/policy constraints |
| **7. Escalation Judgment** | ★★★ | Tests the connection between risk assessment and escalation decisions |
### Common Scoring Errors
1. **Confusing risk aversion with risk judgment.** "We should never use AI for anything important" is not strong Risk Judgment — it's inability to calibrate. Score based on calibration quality, not caution level.
2. **Missing proportionality assessment.** The key differentiator between Level 2 and Level 3+ is whether safeguards are *proportional* to risk.
3. **Ignoring the second-order test.** Level 3+ considers consequences beyond the immediate error. Under-scoring responses that show systemic risk thinking is a common error.
4. **Over-rewarding regulatory knowledge.** Citing specific regulations (GDPR, SOX) demonstrates domain knowledge, not Risk Judgment. Risk Judgment is the *reasoning process*, not the regulatory knowledge.
---
## Domain 6: Operational Consistency
### What It Measures
Operational Consistency assesses whether a person executes defined processes reliably, accurately, and completely across time and conditions. This includes following procedures without shortcuts, maintaining documentation standards, checking their own work before passing it along, and sustaining performance quality even when work is repetitive, volume is high, or conditions are stressful. It also captures whether a person can maintain standards independently without constant supervision.
### Observable Behaviors by Score Level
#### Score 0 — Unsafe/Poor
**Behavior:** Frequently skips process steps, ignores documentation requirements, and produces inconsistent outputs. Cannot maintain reliable execution even for simple, well-defined tasks.
**Example:** Tasked with running a daily AI report generation workflow, frequently forgets to verify that all input fields are populated before submitting, resulting in outputs with missing data. Doesn't document exceptions. Changes the process each day based on how they're feeling.
**Markers:** Process steps frequently skipped. Documentation absent or inconsistent. Output quality varies significantly day to day. No self-checking behavior. Relies on others to catch errors rather than catching them independently.
---
#### Score 1 — Weak
**Behavior:** Follows most process steps but skips verification steps or documentation requirements, especially under time pressure or when the work is tedious. Inconsistency is predictable — the same corners get cut repeatedly.
**Example:** Runs the daily report workflow correctly most of the time but consistently skips the input validation checklist when the batch is large ("it takes too long"). Doesn't document which reports were reviewed vs. generated without review.
**Markers:** Core steps executed but non-core steps (verification, documentation) frequently skipped. Shortcuts are predictable and consistent. Self-checking is inconsistent. Would require supervision to maintain full compliance.
---
#### Score 2 — Acceptable
**Behavior:** Follows all documented process steps consistently under normal conditions. Maintains documentation requirements. Completes verification steps. May show some degradation under high volume or time pressure but generally maintains standards.
**Example:** Consistently completes all steps of the report generation workflow including input validation checklist, output review, and exception logging. Under high-volume days (2x normal batch), completes all steps but acknowledges that the review is more rushed than usual.
**Markers:** All documented process steps followed. Documentation maintained. Verification steps completed. Some acknowledged degradation under pressure but core compliance maintained. Works reliably without supervision.
---
#### Score 3 — Strong
**Behavior:** Maintains high execution quality across all conditions — volume, time pressure, task repetitiveness, and complexity. Proactively identifies when the process itself is unclear or insufficient and flags it for improvement. Creates their own verification structures when they're not provided.
**Example:** Everything at Level 2, plus: "After the first week, I built a checklist for the report validation that goes beyond what's in the SOP — I noticed 3 error types that weren't in the official checklist. I flag any report where two or more of my checklist items are questionable, even if none individually fails the official criteria. This catches borderline cases earlier." Under high volume: maintains the same process with no acknowledged degradation by batching work differently.
**Markers:** All Level 2 markers present. No degradation under pressure. Proactively identifies process gaps. Creates additional verification structures. Flags process improvement opportunities. Demonstrates that consistency is an internalized standard, not external compliance.
---
#### Score 4 — Excellent
**Behavior:** Exceptional execution quality with systematic quality monitoring. Tracks their own performance metrics, identifies drift in their own standards, and self-corrects before being caught. Contributes to process improvement by documenting patterns that inform workflow redesign.
**Example:** Everything at Level 3, plus: "I keep a weekly log of exception types and flag rates. This month I noticed my flag rate dropped from 8% to 3% — which could mean quality improved, but it could also mean I'm getting too comfortable and missing things. I reviewed 20 random reports I'd marked as 'clean' and found I had missed a subtle error type that I was now pattern-matching past. I recalibrated by reviewing all 'clean' reports for that error type before archiving."
**Markers:** All Level 3 markers present. Tracks own performance metrics. Identifies drift in own standards. Self-corrects proactively. Contributes pattern data to process improvement. Demonstrates meta-awareness of consistency itself (knows how and when their own consistency degrades).
---
### Role Relevance
| Role | Weight | Rationale |
|---|---|---|
| AI Operator | **Primary (Critical)** | Operational Consistency is the Operator's defining requirement |
| AI QA / Risk Reviewer | Secondary | QA Reviewers need consistency to conduct reliable audits |
| AI Approver | Secondary | Approvers need consistency to apply standards uniformly |
| AI Change Champion | Secondary | Champions need consistency to model the behaviors they're advocating |
| AI Workflow Translator | Tertiary | Translators need basic process awareness but don't primarily execute workflows |
### Best Scenario Archetypes
| Archetype | Signal Strength | Why |
|---|---|---|
| ----------- | :--------------: | ----- |
| **12. Drift/Repeated Failure** | ★★★★★ | Directly tests whether consistency is maintained over time and across repetition |
| **8. Stakeholder Pressure** | ★★★★ | Tests whether consistency holds under pressure to cut corners |
| **11. Policy/Constraint Adherence** | ★★★★ | Tests adherence to defined rules even when they're inconvenient |
| **6. Workflow Handoff** | ★★★ | Tests whether handoff quality is consistent (documentation, communication) |
### Common Scoring Errors
1. **Confusing Operational Consistency with Process Thinking.** Process Thinking is about *designing* processes. Operational Consistency is about *following* them reliably. A person could design excellent workflows (high Process Thinking) but be unreliable at executing them (low Operational Consistency).
2. **Missing the pressure test.** If the scenario includes time pressure, volume increase, or tedium signals, assess whether the response acknowledges any change in behavior. Level 2+ maintains consistency under pressure.
3. **Not distinguishing compliance from internalization.** Level 2 follows the documented process. Level 3–4 extends beyond the documented process because they've internalized the purpose, not just the steps.
4. **Over-crediting procedure recitation.** A response that describes the correct process steps in detail but doesn't demonstrate that they *actually follow them* (vs. knowing they should) should score lower than one that demonstrates consistent execution through specific behavioral examples.
---
## Domain 7: Change Leverage
### What It Measures
Change Leverage assesses whether a person can help others adopt AI-enabled workflows — communicating clearly, reducing resistance, building trust, training effectively, documenting patterns, and serving as a bridge between the system and the people who use it. This domain measures interpersonal and organizational effectiveness, not technical knowledge. It includes audience adaptation, empathy for resistance, practical teaching ability, feedback collection, and the instinct to create systems that scale adoption beyond their own personal involvement.
### Observable Behaviors by Score Level
#### Score 0 — Unsafe/Poor
**Behavior:** Shows no awareness of or interest in helping others adopt new tools or processes. When a scenario involves team resistance or confusion, either ignores the human dynamics entirely (focuses only on the technical solution) or dismisses concerns as illegitimate ("they just need to deal with it").
**Example:** Asked how to help a skeptical team adopt a new AI workflow, responds with: "Just show them the tool and they'll see it works" or "Management should mandate that everyone use it." No acknowledgment of emotional barriers, practical concerns, or the need for support during transition.
**Markers:** No empathy for resistance. No audience awareness. No adaptation of communication style. Dismisses concerns. No training or support approach. Would likely increase resistance rather than reduce it.
---
#### Score 1 — Weak
**Behavior:** Acknowledges that people may resist change and that communication matters, but the proposed approach is generic and one-directional (present information → expect compliance). Does not adapt to different audiences or address the root causes of resistance. Training is described as a one-time event rather than an ongoing process.
**Example:** "I'd hold a training session to show everyone how to use the new system, explain the benefits, and answer questions." No consideration of different audiences, emotional barriers, follow-up support, or what to do when the training doesn't resolve the resistance.
**Markers:** Basic acknowledgment of resistance. Communication is one-directional and undifferentiated. Training is a single event. No audience adaptation. No follow-up or ongoing support planned. Root causes of resistance not investigated.
---
#### Score 2 — Acceptable
**Behavior:** Proposes a reasonable adoption approach that includes audience-aware communication, addresses at least one emotional barrier (not just informational gaps), and includes some form of ongoing support beyond a single training event. Demonstrates awareness that different people need different things during a transition.
**Example:** "First, I'd meet with the team leads to understand their specific concerns. Then I'd run a demo session focused on how the tool helps with their actual daily tasks — not a generic overview. I'd pair hesitant team members with early adopters for the first week. I'd also create a FAQ document based on the questions that come up during the first sessions."
**Markers:** Audience-specific communication (not one-size-fits-all). At least one emotional barrier acknowledged. Ongoing support beyond initial training. Peer support or mentoring included. Some feedback collection (FAQ from questions).
---
#### Score 3 — Strong
**Behavior:** Designs a structured adoption plan that addresses multiple dimensions of change: emotional (fear, frustration, loss of control), practical (how to do the actual work), organizational (who supports whom, what happens when things go wrong), and cultural (how this fits into the team's identity and values). Adapts approach for different audiences. Creates feedback loops to learn from the adoption experience and adjust the approach.
**Example:** Everything at Level 2, plus: "I'd segment the team into three groups: early enthusiasts (leverage them as champions), pragmatic middle (need to see practical benefits in their specific workflows), and active skeptics (need their concerns heard and addressed honestly). For skeptics specifically, I'd meet one-on-one to understand what's really driving the resistance — it's usually not about the technology. I'd set up weekly 15-minute check-ins for the first month where the team can share what's working, what isn't, and what they wish was different. I'd track adoption metrics (usage, completion time, error rates) and share the results transparently — including any problems we find." Also: "I'd be honest about the system's limitations up front — nothing destroys trust faster than over-promising."
**Markers:** All Level 2 markers present. Additionally: multiple stakeholder groups addressed differently. Emotional, practical, AND organizational dimensions of change covered. Feedback loops established. Transparent communication about both benefits and limitations. Adoption metrics tracked. Honest about system limitations. Approach is phased over time, not front-loaded.
---
#### Score 4 — Excellent
**Behavior:** Demonstrates change leadership that scales beyond personal involvement. Builds systems for sustainable adoption — documentation, peer networks, self-service resources, feedback mechanisms — that continue working even when the Champion steps back. Anticipates resistance patterns before they emerge. Creates measurement frameworks for adoption success that go beyond "are people using it?" to "are people using it well?" Considers the organizational culture implications of the change, not just the tool adoption mechanics.
**Example:** Everything at Level 3, plus: "The goal isn't just adoption — it's the team *owning* the tool. By month 2, the FAQ should be maintained by the team, not by me. I'd identify 2–3 'floor experts' in each group who naturally emerge as go-to people and formally recognize their role. I'd create a shared library of tips, templates, and workarounds that the team builds together — this gives them ownership over the knowledge, not dependency on me." Also: "I'd conduct a pre-launch survey to establish a baseline for team confidence, sentiment, and perceived productivity. At 30 and 90 days, I'd re-survey to measure actual change — this gives leadership concrete evidence of the adoption's impact, not just anecdotes." Anticipates: "Around week 3, we'll hit the 'trough of disillusionment' — initial excitement fades and daily friction builds. That's when the most visible leadership support is needed. I'd schedule a leadership visit to the team during week 3 to reinforce commitment."
**Markers:** All Level 3 markers present. Additionally: builds systems that scale beyond personal involvement. Transfers ownership to the team over time. Creates measurement frameworks for adoption quality, not just quantity. Anticipates resistance phases (e.g., trough of disillusionment). Develops internal experts who replace the Champion's direct involvement. Considers cultural implications of the change. Links adoption measurement to business outcomes.
---
### Role Relevance
| Role | Weight | Rationale |
|---|---|---|
| AI Change Champion | **Primary (Critical)** | Change Leverage IS the Change Champion role — this is the defining domain |
| AI Workflow Translator | Secondary | Translators need to communicate workflow changes to operators and gain buy-in for new processes |
| AI Operator | Tertiary | Operators may informally help peers but don't primarily drive adoption |
| AI Approver | Tertiary | Approvers may need to explain approval standards to others but adoption enablement isn't core |
| AI QA / Risk Reviewer | Tertiary | QA Reviewers communicate findings but don't typically lead adoption efforts |
### Best Scenario Archetypes
| Archetype | Signal Strength | Why |
|---|---|---|
| ----------- | :--------------: | ----- |
| **10. Adoption/Communication** | ★★★★★ | Directly tests change facilitation and adoption support skills |
| **8. Stakeholder Pressure** | ★★★ | Tests interpersonal skill under pressure — communicating difficult truths to leadership |
| **6. Workflow Handoff** | ★★ | Tests ability to explain process changes to affected team members |
| **12. Drift/Repeated Failure** | ★★ | Tests whether the person can communicate about systemic issues constructively |
### Common Scoring Errors
1. **Rewarding enthusiasm over strategy.** A response that says "I'm really passionate about AI and I love helping people learn!" demonstrates enthusiasm, not Change Leverage. Score based on the *quality of the adoption plan*, not the expressed attitude.
2. **Confusing communication quality with Change Leverage.** A well-written response that doesn't address the specific adoption challenge in the scenario is demonstrating good writing, not good change management. The response must engage with the actual dynamics of the situation.
3. **Missing the scalability signal.** Level 3–4 responses consider what happens after the Champion moves on. If the grader only assesses the immediate adoption plan, it will miss this sustainability dimension.
4. **Under-crediting honest limitation communication.** A response that includes "I'd be upfront about what the tool can't do" is a strong Level 3+ signal. Graders sometimes penalize this as "negative" — it should be rewarded as trust-building behavior.
5. **Penalizing emotional awareness.** Responses that address fear, frustration, or loss of control are demonstrating the interpersonal awareness that distinguishes Level 2+ from Level 1. Do not discount emotional intelligence in favor of purely tactical responses.
---
## Cross-Domain Reference: Scenario Archetype Coverage Map
This matrix shows which domains each scenario archetype is best suited to test. Use this when designing assessment instances to ensure all 7 domains receive adequate coverage.
| Scenario Archetype | TF | PT | VI | EH | RJ | OC | CL |
|---|---|---|---|---|---|---|---|
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 1. Automation Boundary | ★★★ | ★★★★ | ★★ | ★ | ★★★★★ | ★★★ | ★ |
| 2. Instruction Rewrite | ★★★★★ | ★★ | ★ | ★ | ★★ | ★★ | ★ |
| 3. Output Comparison | ★★ | ★ | ★★★★★ | ★★ | ★★★ | ★★ | ★ |
| 4. Hidden Error Review | ★ | ★★★ | ★★★★★ | ★★★ | ★★★ | ★★ | ★ |
| 5. Missing Context | ★★★★ | ★★ | ★★ | ★★★ | ★★ | ★★ | ★ |
| 6. Workflow Handoff | ★★★ | ★★★★★ | ★★ | ★★★ | ★★ | ★★★ | ★★ |
| 7. Escalation Judgment | ★ | ★★ | ★★ | ★★★★★ | ★★★ | ★★ | ★ |
| 8. Stakeholder Pressure | ★ | ★ | ★★★★ | ★★★★ | ★★★★★ | ★★ | ★★★ |
| 9. Exception Handling | ★ | ★★ | ★★ | ★★★★★ | ★★★ | ★★ | ★ |
| 10. Adoption/Communication | ★★ | ★ | ★ | ★ | ★★ | ★★ | ★★★★★ |
| 11. Policy/Constraint | ★★ | ★★ | ★★ | ★★ | ★★★★ | ★★★★★ | ★ |
| 12. Drift/Repeated Failure | ★ | ★★ | ★★★ | ★★★ | ★★★ | ★★★★ | ★★ |
**TF** = Task Framing, **PT** = Process Thinking, **VI** = Verification Instinct, **EH** = Exception Handling, **RJ** = Risk Judgment, **OC** = Operational Consistency, **CL** = Change Leverage
**Recommended minimum scenario selection per assessment:** Each domain should be the primary target of at least 2 scenarios. Given 6–8 scenarios per assessment, this requires careful selection across archetypes. A well-designed 8-scenario assessment should cover all 7 domains with at least 2 high-signal touchpoints each.
---
## Domain Correlation Patterns
Understanding how domains correlate helps with validity assessment and identifies profiles that warrant closer examination.
### Expected Positive Correlations
- **Task Framing ↔ Process Thinking:** High (r ≈ 0.55–0.65). Both require decomposition and structural thinking. A person who frames tasks well almost always thinks in processes.
- **Verification Instinct ↔ Risk Judgment:** Moderate-High (r ≈ 0.45–0.55). People who verify naturally tend to be risk-aware. However, they can diverge: some people are great verifiers but poor at calibrating risk proportionality.
- **Exception Handling ↔ Verification Instinct:** Moderate (r ≈ 0.40–0.50). Exception detection requires verification; exception response is a separate skill.
### Expected Low/Weak Correlations
- **Operational Consistency ↔ Change Leverage:** Low (r ≈ 0.15–0.25). These are fundamentally different skill sets — one is personal discipline, the other is interpersonal effectiveness. High performers in one are not reliably high in the other.
- **Task Framing ↔ Change Leverage:** Low (r ≈ 0.10–0.20). Analytical structuring skill and interpersonal adoption skill are largely independent.
### Anomaly Patterns to Flag
- **High Verification Instinct + Low Risk Judgment:** Catches errors but can't assess their severity. May create bottlenecks by treating all errors as critical. Flag for Approver/QA roles.
- **High Process Thinking + Low Operational Consistency:** Can design excellent processes but won't follow them reliably. Flag as a potential Translator (not Operator).
- **High Change Leverage + Low Verification Instinct:** Great at helping people adopt tools but may not catch when the tools produce bad outputs. Dangerous if placed in a QA or Approver role.
---
*Document version 1.0 — March 9, 2026*
*Cross-reference: deliverable_role_*[*taxonomy.md*](http://taxonomy.md)*, deliverable_scoring_*[*rubric.md*](http://rubric.md)*, scoring_schema.json*