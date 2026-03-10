# 12 Scenario Archetypes

**Notion URL:** https://www.notion.so/31ed807b9111815f9e75dc9f67cf09ce

---

**Version:** 1.0
**Date:** March 9, 2026
**Status:** Implementation-Ready
**Dependencies:** deliverable_role_[taxonomy.md](http://taxonomy.md), deliverable_scoring_[domains.md](http://domains.md), deliverable_scoring_[rubric.md](http://rubric.md), research_failure_[modes.md](http://modes.md)
---
## How to Use This Document
This document defines the 12 scenario archetypes that form the structural backbone of the AI Workforce Map assessment. Each archetype is a reusable template from which multiple concrete scenarios can be generated — varying the industry, AI tool, and specific details while preserving the core dilemma and scoring characteristics.
**For scenario writers:** Use each archetype's Scenario Skeleton, Strong/Weak Response descriptions, and Red Flags to draft concrete scenarios. Each archetype should generate 3-5 scenario variants across different industries to build the scenario bank.
**For the grading pipeline:** Use the Primary and Secondary Domains to configure which domains the LLM grader scores for each scenario. Use the Strong/Weak/Red Flag descriptions as rubric anchors.
**For assessment assembly:** Use the Module Assignment, Difficulty Level, and Coverage Maps to select 6-8 scenarios per assessment instance that cover all 7 domains and provide progressive difficulty across the 6 modules.
---
## Coverage Design Summary
### Domain Coverage Matrix
Each domain must be the primary target in at least 2 archetypes. This matrix confirms full coverage:
| Domain | Primary In Archetypes | Secondary In Archetypes | Total Coverage |
|---|---|---|---|
| -------- | :----: | :----: | :----: |
| Task Framing (TF) | 2, 5 | 1, 6, 8 | 5 archetypes |
| Process Thinking (PT) | 1, 6 | 2, 9, 12 | 5 archetypes |
| Verification Instinct (VI) | 3, 4 | 5, 8, 11, 12 | 6 archetypes |
| Exception Handling (EH) | 7, 9 | 4, 5, 8, 12 | 6 archetypes |
| Risk Judgment (RJ) | 1, 8 | 3, 4, 7, 9, 11 | 7 archetypes |
| Operational Consistency (OC) | 11, 12 | 1, 6, 7, 9 | 6 archetypes |
| Change Leverage (CL) | 10, 12 | 6, 8, 11 | 5 archetypes |
### Role Discrimination Matrix
Each role must have archetypes that strongly separate competent from incompetent performers:
| Role | High-Discrimination Archetypes | Moderate-Discrimination Archetypes |
|---|---|---|
| ------ | :----: | :----: |
| AI Operator | 4, 7, 11 | 1, 3, 9, 12 |
| AI Approver | 3, 4, 8 | 5, 7, 9, 11 |
| AI Workflow Translator | 1, 2, 6 | 5, 9, 12 |
| AI QA / Risk Reviewer | 4, 9, 12 | 3, 7, 8, 11 |
| AI Change Champion | 10, 12 | 6, 8, 11 |
### Module Assignment Summary
| Module | Focus | Archetypes | Difficulty Range |
|---|---|---|---|
| -------- | ------- | :----: | :----: |
| Module 1: Foundation | Task Framing, basic Process Thinking | 2, 5 | 1-2 |
| Module 2: Workflow Design | Process Thinking, Task Framing | 1, 6 | 2-3 |
| Module 3: Quality & Verification | Verification Instinct, Exception Handling | 3, 4 | 2-3 |
| Module 4: Risk & Judgment | Risk Judgment, Exception Handling | 7, 9 | 3-4 |
| Module 5: Adversarial/Pressure | All domains under stress | 8, 11 | 4-5 |
| Module 6: Leadership & Change | Change Leverage, Operational Consistency | 10, 12 | 3-5 |
### Scenario Type Mix
| Type | Archetypes | Count |
|---|---|---|
| ------ | :----: | :----: |
| Straightforward execution | 2, 11 | 2 |
| Ambiguous judgment calls | 1, 5, 7 | 3 |
| Adversarial/trick scenarios | 4, 8 | 2 |
| Multi-step workflows | 6, 9 | 2 |
| Approval/rejection decisions | 3, 4 | 2 |
| Process design challenges | 1, 6, 10, 12 | 4 |
---
## Archetype 1: Automation Boundary
### 1. Archetype Name
**Automation Boundary**
### 2. Core Dilemma
The test-taker must decide which parts of a real-world workflow are appropriate for AI automation, which require AI-assisted human review, and which must remain fully human-controlled. The dilemma forces a risk-calibrated judgment call — not all-or-nothing automation, but tiered decisions based on consequence analysis.
### 3. Primary Domains Tested
- **Risk Judgment** — Can they differentiate risk levels across tasks and assign proportional safeguards?
- **Process Thinking** — Can they decompose a workflow into steps and identify which steps have different automation suitability?
### 4. Secondary Domains Tested
- **Task Framing** — Can they scope what AI should handle vs. what needs human framing?
- **Operational Consistency** — Do they consider how automation decisions affect sustained operations?
### 5. Role Discrimination
| Role | Discrimination Level | What It Reveals |
|---|---|---|
| ------ | :----: | ----- |
| AI Workflow Translator | **High** | Translators must excel here — this is their defining scenario. Strong Translators propose tiered automation with different safeguards at each tier. Weak Translators treat automation as binary. |
| AI Approver | Moderate | Approvers should recognize which tasks need human approval gates. Weak Approvers either rubber-stamp everything or block everything. |
| AI Operator | Moderate | Strong Operators identify which tasks match their execution capabilities vs. which require judgment beyond their scope. |
| AI QA / Risk Reviewer | Moderate | QA Reviewers should identify systemic risks in the proposed automation scheme. |
| AI Change Champion | Low | Champions aren't primarily assessed here but may show awareness of adoption implications. |
### 6. Difficulty Level
**Level 2-3** (Moderate) — Requires analytical judgment but the scenario provides sufficient context. The dilemma is clear; the challenge is calibration.
### 7. Module Assignment
**Module 2: Workflow Design** — Tests the foundational skill of deciding where AI fits in a workflow.
### 8. Scenario Skeleton
A department manager describes their team's workflow involving 5-7 distinct tasks with varying risk levels (e.g., a customer service team handling inquiries, refunds, contract changes, and escalations). The manager asks the test-taker to recommend which tasks should be fully automated, which should be AI-assisted with human review, and which should remain human-only. The scenario includes a mix of low-risk routine tasks (e.g., FAQ responses), medium-risk judgment tasks (e.g., refund approvals under \$500), and high-risk consequential tasks (e.g., contract modifications with legal implications). One task is designed as a "trick" — it appears routine but has hidden risk (e.g., automated customer communications that could inadvertently make binding commitments).
### 9. What a Strong Response Looks Like
- **Tiered automation recommendation** — explicitly creates 3+ tiers (full automation, AI-draft + human review, human-only) with clear reasoning for each task's placement
- **Consequence-based reasoning** — explains *why* each tier is appropriate by analyzing what happens when AI makes errors in each task
- **Catches the hidden-risk task** — identifies the seemingly routine task that has consequential downstream implications
- **Proposes monitoring mechanisms** — suggests how to track whether automation decisions are working
- **Considers scalability** — addresses how the tiering changes as volume increases or as the AI improves
- **References real failure patterns** — demonstrates awareness that automation boundaries fail in predictable ways
### 10. What a Weak Response Looks Like
- **Binary thinking** — "automate everything" or "humans should do everything important" without nuance
- **Heuristic-based reasoning** — "anything customer-facing should be human" without analyzing actual consequences
- **Misses the hidden-risk task** — fails to identify that the routine-looking task has serious implications
- **No monitoring or feedback** — proposes static automation decisions with no mechanism for adjustment
- **Uniform safeguards** — applies the same level of oversight to all tasks regardless of risk
### 11. Red Flags
- **Advocates full automation of high-consequence tasks without human review**
- **Removes existing human checkpoints as "inefficient"**
- **Treats risk as binary** — "either it's safe to automate or it's not"
- **Over-trusts AI based on past performance** — "the AI has been 98% accurate so we don't need to check anymore"
### 12. Reliability Modifier Triggers
- **RM-4 (Unsafe Automation Bias):** Recommends full automation for 2+ clearly high-risk tasks without acknowledging the need for human oversight
- **RM-2 (Overconfidence):** Makes definitive claims about AI capability without acknowledging uncertainty
- **RM-6 (Inability to Explain Reasoning):** Assigns tasks to tiers but cannot explain reasoning in follow-up
- **RM-1 (Contradiction):** Advocates for verification elsewhere but removes verification checkpoints here
---
## Archetype 2: Instruction Rewrite
### 1. Archetype Name
**Instruction Rewrite**
### 2. Core Dilemma
The test-taker receives a vague, poorly structured business request and must translate it into a clear, bounded, actionable AI instruction. The dilemma is: how much structure and specificity is needed? Weak respondents add superficial detail; strong respondents decompose, constrain, and anticipate failure modes.
### 3. Primary Domains Tested
- **Task Framing** — This is the definitive Task Framing archetype. Can they convert "make this better" into a specific, executable instruction?
### 4. Secondary Domains Tested
- **Process Thinking** — Do they recognize that the instruction is part of a larger workflow?
- **Risk Judgment** — Do they identify what could go wrong if the AI misinterprets the vague instruction?
### 5. Role Discrimination
| Role | Discrimination Level | What It Reveals |
|---|---|---|
| ------ | :----: | ----- |
| AI Workflow Translator | **High** | Translators must excel here — this IS their core skill. |
| AI Change Champion | Moderate | Champions need to model good framing behavior. |
| AI Operator | Moderate | Strong Operators recognize when inputs are poorly framed and flag them. |
| AI Approver | Low-Moderate | Approvers should recognize that poor framing caused the poor output. |
| AI QA / Risk Reviewer | Low | QA Reviewers benefit from framing skill but aren't primarily assessed on it. |
### 6. Difficulty Level
**Level 1-2** (Foundational) — Approachable for all skill levels. Differentiation comes from depth and sophistication of the rewrite.
### 7. Module Assignment
**Module 1: Foundation** — Entry-level archetype. Introduces the core concept of Task Framing.
### 8. Scenario Skeleton
A colleague or manager sends a vague request: "Use AI to help with [broad business function]" — e.g., "Use AI to improve our customer onboarding emails" or "Have AI help us with our quarterly reports." The test-taker must rewrite this into one or more specific AI instructions. The vague request is deliberately missing: target audience, specific deliverable, format constraints, tone requirements, success criteria, input data requirements, and exception handling.
### 9. What a Strong Response Looks Like
- **Decomposes the request** — recognizes one vague request may be 2-3 distinct tasks
- **Specifies all critical parameters** — audience, format, length, tone, constraints, success criteria
- **Identifies what's missing** — explicitly calls out information needed before proceeding
- **Includes failure handling** — specifies what to do if the AI output doesn't meet criteria
- **Provides input requirements** — specifies what context/data the AI needs
- **Considers downstream use** — how will the output be used? Who reviews it?
- **Level 4 signal: Pushes back on the premise** — "This is actually 3 different tasks that should be handled separately"
### 10. What a Weak Response Looks Like
- **Parrots the original request** — no meaningful restructuring
- **Adds only surface specificity** — adjectives without measurable criteria
- **Ignores missing information** — proceeds without acknowledging critical gaps
- **No constraints or boundaries** — open-ended enough to produce wildly different outputs each time
- **Single monolithic instruction** — treats a complex request as one task
### 11. Red Flags
- **Cannot restructure at all** — the rewritten instruction is essentially identical to the original
- **Adds misleading specificity** — invents details not in the scenario context
- **Demonstrates no awareness that vague instructions create problems**
- **Over-specifies in ways that prevent useful output**
### 12. Reliability Modifier Triggers
- **RM-6 (Inability to Explain Reasoning):** Cannot explain why they included specific constraints
- **RM-1 (Contradiction):** Includes constraints that contradict the scenario context
- **RM-2 (Overconfidence):** Claims their instruction is "complete" without acknowledging remaining gaps
---
## Archetype 3: Output Comparison
### 1. Archetype Name
**Output Comparison**
### 2. Core Dilemma
The test-taker is presented with two or more AI-generated outputs for the same task and must evaluate which is better, why, and whether either is good enough to use. The dilemma forces comparative judgment — it's not enough to detect errors; they must weigh trade-offs between outputs that are each flawed in different ways.
### 3. Primary Domains Tested
- **Verification Instinct** — Can they identify what's wrong with each output, including subtle errors?
- **Risk Judgment** — Can they assess which flaws matter more for the intended use case?
### 4. Secondary Domains Tested
- **Task Framing** — Can they evaluate whether the outputs actually address the original task?
- **Exception Handling** — What do they recommend when neither output is adequate?
### 5. Role Discrimination
| Role | Discrimination Level | What It Reveals |
|---|---|---|
| ------ | :----: | ----- |
| AI Approver | **High** | This is the Approver's defining scenario. Strong Approvers evaluate across multiple dimensions. Weak Approvers pick the "better-looking" one. |
| AI QA / Risk Reviewer | **High** | QA Reviewers should catch errors that Approvers miss — logical inconsistencies, bias, errors of omission. |
| AI Operator | Moderate | Strong Operators can distinguish "obviously wrong" from "I'm not sure" and escalate appropriately. |
| AI Workflow Translator | Low-Moderate | Translators may identify that the outputs differ because the underlying instruction was poor. |
| AI Change Champion | Low | Champions aren't primarily assessed on output quality comparison. |
### 6. Difficulty Level
**Level 2-3** (Moderate) — Comparison format provides structure. Difficulty comes from subtlety of embedded errors.
### 7. Module Assignment
**Module 3: Quality & Verification** — Tests core verification and judgment skills for evaluating AI output quality.
### 8. Scenario Skeleton
The test-taker receives two AI-generated outputs for the same business task. Output A is polished and fluent but contains a subtle factual error, an error of omission (missing a key stakeholder or risk factor), and uses an inappropriately confident tone for uncertain claims. Output B is less polished but factually accurate, appropriately hedged, and more complete. The scenario tests whether the respondent favors substance over surface quality.
### 9. What a Strong Response Looks Like
- **Identifies specific errors in both outputs** — not just "A is better" but "Output A has [specific error] in paragraph 2"
- **Evaluates on multiple dimensions** — accuracy, completeness, tone, audience appropriateness
- **Catches the error of omission** — identifies what Output A is missing, not just what it got wrong
- **Recognizes the fluency-accuracy trap** — explicitly notes that Output A sounds better but has more substantive problems
- **Makes a calibrated recommendation** — "Neither is ready to send. Output B is closer — I'd use it as the base and fix [specific issues]"
- **Level 4 signal: Proposes a systematic evaluation approach**
### 10. What a Weak Response Looks Like
- **Picks based on surface quality** — "Output A is better because it's more professional" without catching the factual error
- **Single-dimension evaluation** — checks only grammar or formatting
- **No error identification** — "Both look good" without specifying what's wrong
- **Misses the omission** — catches the factual error in A but doesn't notice what A left out
### 11. Red Flags
- **Selects the factually wrong output as superior because it sounds better** — This is the definitive automation bias signal
- **Cannot articulate any specific differences** — "They're about the same" when there are clear differences
- **Ignores audience and purpose** — evaluates outputs as abstract text quality
- **Over-trusts one output based on formatting**
### 12. Reliability Modifier Triggers
- **RM-3 (Failure to Verify When Prompted):** Failure to identify any errors when the task explicitly asks to evaluate
- **RM-2 (Overconfidence):** "Output A is definitely correct and ready to send" without checking
- **RM-5 (Inconsistency Under Pressure):** If time-pressure variant is used, does evaluation quality degrade?
- **RM-6 (Inability to Explain Reasoning):** Selects an output but cannot articulate specific criteria
---
## Archetype 4: Hidden Error Review
### 1. Archetype Name
**Hidden Error Review**
### 2. Core Dilemma
The test-taker receives a single AI-generated output that appears polished and complete but contains multiple embedded errors of varying severity — from subtle factual inaccuracies to logical inconsistencies to errors of omission. The dilemma: can they find the errors, and can they triage them by severity? This is the assessment's primary "trick" scenario — it punishes automation bias directly.
### 3. Primary Domains Tested
- **Verification Instinct** — The definitive verification test. Can they detect errors in polished, confident-sounding AI output?
### 4. Secondary Domains Tested
- **Exception Handling** — What do they do after finding errors? Triage, escalate, fix?
- **Risk Judgment** — Can they distinguish between trivial errors and dangerous ones?
- **Process Thinking** — Do they investigate where in the process the errors originated?
### 5. Role Discrimination
| Role | Discrimination Level | What It Reveals |
|---|---|---|
| ------ | :----: | ----- |
| AI QA / Risk Reviewer | **High** | This is the QA Reviewer's defining scenario. Strong QA Reviewers find multiple error types including logical inconsistencies and omissions. |
| AI Approver | **High** | Approvers must catch errors before approving. This reveals whether they genuinely verify or rubber-stamp. |
| AI Operator | **High** | Strong Operators catch surface-level errors and escalate uncertain ones. Weak Operators pass everything through. |
| AI Workflow Translator | Low-Moderate | Translators may identify that the errors stem from a process design flaw. |
| AI Change Champion | Low | Champions aren't primarily assessed on error detection. |
### 6. Difficulty Level
**Level 3** (Challenging) — The output is deliberately designed to look good. Errors are embedded at different depths.
### 7. Module Assignment
**Module 3: Quality & Verification** — The hardest verification test in the module.
### 8. Scenario Skeleton
The test-taker receives an AI-generated business document — e.g., an AI-drafted client proposal, a regulatory compliance summary, or a patient intake analysis. The document is well-written, properly formatted, and uses appropriate domain terminology. However, it contains: (1) one surface-level error (a wrong date, misspelled name, or number that doesn't match a table), (2) one factual fabrication (a statistic, case reference, or regulation that sounds plausible but doesn't exist), (3) one logical inconsistency between sections (a conclusion that contradicts the data presented earlier), and (4) one error of omission (a critical risk factor, stakeholder, or compliance requirement that is absent).
### 9. What a Strong Response Looks Like
- **Catches 3+ of the 4 embedded errors**
- **Triages by severity** — ranks the errors by business impact
- **Proposes specific verification methods** — "I'd cross-reference the cited regulation against the actual regulatory text"
- **Identifies the omission** — asks "what's missing from this document?"
- **Recommends appropriate action** — doesn't just flag errors but specifies what should happen
- **Recognizes the pattern** — "If this document has fabricated references, we should check all other documents from this AI system"
- **Level 4 signal: Proposes a verification protocol for all AI-generated client documents**
### 10. What a Weak Response Looks Like
- **Catches only the surface error** — finds the typo but misses the fabricated statistic
- **Approves with minor corrections** — "Fix the typo and it's ready to go"
- **No verification method specified** — says "I'd check the facts" without identifying which facts or how
- **Trusts the polished presentation** — "This looks well-researched and thorough"
- **No investigation of patterns** — treats the errors as one-off issues
### 11. Red Flags
- **Approves the document without identifying any errors** — The definitive red flag for Verification Instinct
- **Identifies errors but approves anyway** — If errors include the fabricated citation or logical inconsistency, approving despite detection is a severe Risk Judgment failure
- **Fabricates their own verification** — claims to have "checked the statistic and it's correct" when the scenario provides no access to source data
### 12. Reliability Modifier Triggers
- **RM-3 (Failure to Verify When Prompted):** Failure to identify any of the 4 embedded errors triggers this modifier at full strength
- **RM-2 (Overconfidence):** "This document is thorough and accurate" without verification
- **RM-4 (Unsafe Automation Bias):** "AI-generated documents are generally reliable so a quick scan is sufficient"
---
## Archetype 5: Missing Context
### 1. Archetype Name
**Missing Context**
### 2. Core Dilemma
The test-taker is given an AI task that is missing critical context — the instruction looks complete on the surface, but essential information needed for the AI to produce a good output is absent. The dilemma: do they proceed with the task as given, or do they identify the gaps and seek the missing information before proceeding?
### 3. Primary Domains Tested
- **Task Framing** — Can they recognize when an instruction is incomplete?
- **Exception Handling** — How do they respond to the gap? (Proceed, pause, ask, escalate?)
### 4. Secondary Domains Tested
- **Verification Instinct** — Do they check that the AI has what it needs before accepting output?
- **Risk Judgment** — Do they assess the risk of proceeding without the missing context?
### 5. Role Discrimination
| Role | Discrimination Level | What It Reveals |
|---|---|---|
| ------ | :----: | ----- |
| AI Workflow Translator | **High** | Translators must recognize that incomplete inputs produce unreliable outputs. |
| AI Approver | Moderate | Approvers should recognize that a poor output may stem from poor inputs — diagnostic skill. |
| AI Operator | Moderate | Strong Operators flag incomplete inputs before proceeding rather than running the workflow with gaps. |
| AI QA / Risk Reviewer | Low-Moderate | QA Reviewers may trace output quality problems back to input gaps. |
| AI Change Champion | Low | Champions aren't primarily assessed on input completeness detection. |
### 6. Difficulty Level
**Level 1-2** (Foundational) — The missing context is designed to be identifiable by attentive respondents.
### 7. Module Assignment
**Module 1: Foundation** — Tests the foundational skill of recognizing when you don't have enough information to proceed safely.
### 8. Scenario Skeleton
The test-taker receives an AI workflow task that is subtly incomplete. For example: "Our AI tool will generate personalized renewal letters for all 2,000 insurance clients. Here's the template and the client database. Please run the batch today." Critical context is missing: whether the client database has been updated, who reviews the output before sending, what to do if a client's policy type has no template match, and whether any clients are in litigation (who should NOT receive a standard renewal letter). One or more gaps are inferable from contextual clues (e.g., the database file is dated 3 months ago, a footnote mentions "pending legal matters").
### 9. What a Strong Response Looks Like
- **Identifies multiple missing elements** before proceeding: data currency, review process, exception handling, exclusion criteria
- **Catches the contextual clues** — picks up on the stale database date or legal footnote
- **Proposes a pre-flight checklist** for batch execution
- **Assesses the risk of proceeding without context** — "If we send renewal letters to clients in litigation, we could create legal complications"
- **Recommends a staged approach** — "Run a small test batch first, verify the output, then scale"
- **Frames as a process improvement** — "We should add a pre-run validation checklist to this workflow"
### 10. What a Weak Response Looks Like
- **Proceeds immediately** — "Okay, I'll run the batch and send the letters today"
- **Identifies only one gap** — catches the stale database but misses the legal exclusion
- **Asks generic questions** — "Is everything up to date?" rather than identifying specific gaps
- **Relies on the AI to handle exceptions** — "The AI will probably figure out what to do with mismatched clients"
### 11. Red Flags
- **Runs the full batch without any validation** — proceeding with 2,000 client-facing communications without checking data currency or exclusion criteria
- **Sends communications to clients in litigation** — missing the legal contextual clues
- **Treats the task as a simple execution problem** — no awareness that context gaps create downstream risk
### 12. Reliability Modifier Triggers
- **RM-3 (Failure to Verify When Prompted):** Contextual clues signal incomplete data; proceeding without checking triggers this modifier
- **RM-4 (Unsafe Automation Bias):** "The AI can handle 2,000 letters automatically — no need for human review"
- **RM-2 (Overconfidence):** "The template and database are all we need — this is straightforward"
---
## Archetype 6: Workflow Handoff
### 1. Archetype Name
**Workflow Handoff**
### 2. Core Dilemma
The test-taker must design or evaluate a multi-step workflow that involves multiple handoffs between AI systems and human roles. The dilemma centers on where to place handoff points, what context must transfer at each handoff, and how to handle the inevitable edge cases where handoffs break down.
### 3. Primary Domains Tested
- **Process Thinking** — The definitive Process Thinking archetype. Can they decompose work, sequence steps, define dependencies, and design handoff protocols?
### 4. Secondary Domains Tested
- **Task Framing** — Each handoff requires reframing the task for the next handler
- **Operational Consistency** — Handoffs must be documented and repeatable
- **Change Leverage** — Can they explain the workflow to the people who will operate it?
### 5. Role Discrimination
| Role | Discrimination Level | What It Reveals |
|---|---|---|
| ------ | :----: | ----- |
| AI Workflow Translator | **High** | This IS the Translator's defining scenario. Strong Translators design complete workflows with exception paths, quality gates, and documented handoffs. |
| AI Operator | Moderate | Strong Operators understand their position in the workflow and what they need at each handoff point. |
| AI Approver | Moderate | Approvers should recognize where their approval gate fits in the larger process. |
| AI QA / Risk Reviewer | Moderate | QA Reviewers should identify where in the workflow errors are most likely to originate and propagate. |
| AI Change Champion | Moderate | Champions should consider how to communicate the workflow to team members. |
### 6. Difficulty Level
**Level 2-3** (Moderate) — Designing a basic workflow is Level 2. With exception paths and feedback loops, it's Level 3-4.
### 7. Module Assignment
**Module 2: Workflow Design** — Tests the ability to design human-AI workflow architecture.
### 8. Scenario Skeleton
The test-taker is asked to design (or evaluate) a multi-step AI workflow. For example: "Design a workflow for AI-assisted customer complaint resolution. The process starts with incoming complaint emails, involves AI classification, AI-drafted responses, human review, and customer follow-up." The scenario provides enough detail to design a basic workflow but requires adding: quality gates, exception handling, handoff documentation, escalation paths, and feedback mechanisms.
### 9. What a Strong Response Looks Like
- **Clear step decomposition** with logical sequencing and dependencies
- **Human-AI handoff points explicitly defined** — what transfers at each handoff, who is responsible
- **Multiple quality gates** placed at high-risk decision points
- **Exception paths** for at least 2-3 foreseeable failure scenarios
- **Feedback loop** — how do outcomes feed back to improve the AI or the process?
- **Level 4 signal: Performance metrics and continuous improvement** — "We'd track classification accuracy, response quality, resolution time, and customer satisfaction."
### 10. What a Weak Response Looks Like
- **Black box workflow** — "AI handles complaints and humans approve" with no step decomposition
- **Happy path only** — designs for the normal case with no exception handling
- **Missing handoff details** — steps are listed but context transfer isn't addressed
- **No quality gates** — AI output flows directly to customers without human review
- **No feedback mechanism** — the workflow runs but never improves
### 11. Red Flags
- **No human involvement in customer-facing output** — AI directly sends responses without any review
- **Circular or impossible dependencies** — steps are ordered in a way that creates deadlocks
- **Ignores the human entirely** — designs a fully automated workflow for consequential customer communications
### 12. Reliability Modifier Triggers
- **RM-4 (Unsafe Automation Bias):** Designs a workflow with no human checkpoints for consequential outputs
- **RM-6 (Inability to Explain Reasoning):** Proposes a workflow sequence but can't explain why steps are in that order
- **RM-1 (Contradiction):** Advocates for quality gates in other scenarios but omits them here
---
## Archetype 7: Escalation Judgment
### 1. Archetype Name
**Escalation Judgment**
### 2. Core Dilemma
The test-taker encounters a situation where something has gone wrong (or might be going wrong) and must decide: handle it themselves, escalate to someone with more authority/expertise, halt the process, or take some combination of actions. The dilemma tests the *quality* of escalation — not just whether they escalate, but when, to whom, with what information, and how urgently.
### 3. Primary Domains Tested
- **Exception Handling** — The definitive Exception Handling archetype. Can they detect, triage, and respond to exceptions appropriately?
### 4. Secondary Domains Tested
- **Risk Judgment** — Can they assess the severity of the exception to determine the right response level?
- **Operational Consistency** — Do they follow established escalation protocols or improvise?
### 5. Role Discrimination
| Role | Discrimination Level | What It Reveals |
|---|---|---|
| ------ | :----: | ----- |
| AI Operator | **High** | Operators face escalation decisions constantly. Strong Operators escalate with specific information; weak Operators either escalate everything or nothing. |
| AI Approver | Moderate | Approvers receive escalations and must decide how to respond. Tests their triage capability. |
| AI QA / Risk Reviewer | Moderate | QA Reviewers investigate whether escalated exceptions are isolated incidents or systemic patterns. |
| AI Workflow Translator | Low-Moderate | Translators may identify that the escalation path itself is poorly designed. |
| AI Change Champion | Low | Champions aren't primarily assessed on escalation judgment. |
### 6. Difficulty Level
**Level 3-4** (Challenging) — The exception is genuinely ambiguous. The correct response requires judgment about severity, urgency, and appropriate response.
### 7. Module Assignment
**Module 4: Risk & Judgment** — Tests judgment under uncertainty about whether and how to escalate.
### 8. Scenario Skeleton
The test-taker is operating an AI workflow and encounters an anomaly. For example: "You're processing the daily batch of AI-generated insurance policy summaries. Summaries 16-20 contain phrasing you haven't seen before — they mention a 'premium discount guarantee' that you're not aware of in any of the company's policies. The summaries are otherwise well-formatted. Your manager is in a meeting for 2 hours. The daily batch is due to the Approver in 90 minutes." The scenario contains: an ambiguous anomaly, time pressure, unavailable authority, and moderate-to-high stakes (customer-facing communications that could create binding commitments).
### 9. What a Strong Response Looks Like
- **Detects and correctly characterizes the anomaly** — "This looks like it could be a hallucination — the AI may be generating a policy feature that doesn't exist"
- **Triages severity appropriately** — "High-severity because if these go out and a customer relies on a 'premium discount guarantee,' we could be legally bound"
- **Takes immediate appropriate action** — holds summaries 16-20, proceeds with 1-15 if verified
- **Escalates with quality** — provides specific information: which summaries, what the anomaly is, why it matters, what they've done
- **Finds the right escalation target** — if manager is unavailable, identifies who else can help
- **Documents the exception** — logs the anomaly, affected summaries, and actions taken
- **Level 4 signal: Proposes a preventive measure** — "We should add an automated check that flags policy language not matching our approved terms"
### 10. What a Weak Response Looks Like
- **Doesn't notice the anomaly** — processes all 20 summaries as normal
- **Notices but dismisses** — "It might be a new feature — I'll send them through and ask later"
- **Overreacts** — halts all work and sends urgent email to the CEO
- **Escalates without information** — "Something looks wrong" with no specifics
- **Waits passively** — waits for manager without taking any interim action
### 11. Red Flags
- **Sends the potentially hallucinated summaries to customers** — creating legal and financial exposure
- **Improvises a fix** — rewrites summaries without authorization
- **Inability to act without the manager** — demonstrates complete dependence on authority
### 12. Reliability Modifier Triggers
- **RM-5 (Inconsistency Under Pressure):** If time pressure degrades reasoning quality (e.g., "Since time is short, I'll just send them all")
- **RM-3 (Failure to Verify When Prompted):** Anomalous phrasing is a verification cue — failure to investigate triggers this
- **RM-4 (Unsafe Automation Bias):** "The AI usually gets these right, so it's probably fine"
---
## Archetype 8: Stakeholder Pressure
### 1. Archetype Name
**Stakeholder Pressure**
### 2. Core Dilemma
The test-taker faces pressure from a person with authority to approve, expedite, or overlook a quality concern with an AI output. The dilemma: do they maintain quality standards despite social and organizational pressure, or do they cave? This is the assessment's primary test of whether competency survives real-world conditions.
### 3. Primary Domains Tested
- **Risk Judgment** — Can they maintain risk calibration when pressured to accept risk?
- **Verification Instinct** — Does their verification standard hold under authority pressure?
### 4. Secondary Domains Tested
- **Exception Handling** — How do they handle the "exception" of pressure from authority?
- **Task Framing** — Can they reframe the situation to satisfy both quality and urgency?
- **Change Leverage** — Can they communicate difficult truths to leadership effectively?
### 5. Role Discrimination
| Role | Discrimination Level | What It Reveals |
|---|---|---|
| ------ | :----: | ----- |
| AI Approver | **High** | Approvers face this pressure constantly. Strong Approvers negotiate timelines or propose alternatives. This separates genuine Approvers from rubber stamps. |
| AI QA / Risk Reviewer | Moderate | Must communicate unpleasant findings to stakeholders and stand firm on quality. |
| AI Operator | Moderate | Tests whether Operators skip verification steps under time pressure. |
| AI Workflow Translator | Low-Moderate | Translators might propose an alternative workflow satisfying both speed and quality. |
| AI Change Champion | Moderate | Champions must sometimes push back on leadership expectations about AI capabilities. |
### 6. Difficulty Level
**Level 4-5** (High/Adversarial) — The social pressure component makes this significantly harder. Many people cave under authority pressure even when they know the right answer.
### 7. Module Assignment
**Module 5: Adversarial/Pressure** — Tests all domains under realistic stress conditions.
### 8. Scenario Skeleton
The test-taker has identified a quality concern with an AI output. Before they can fully investigate, a senior stakeholder intervenes: "I've looked at it and it's fine — we need to get this to the client by end of day. Just approve it." The scenario may escalate: the stakeholder provides a rationale ("we've already delayed twice"), invokes authority ("I'm making the call — just sign off"), or creates urgency ("the board meeting starts in an hour"). The pressure is designed to be realistic — not cartoonishly aggressive, but the kind of everyday organizational pressure that causes rubber-stamping in real workplaces.
### 9. What a Strong Response Looks Like
- **Maintains the quality concern** — "I understand the urgency, but I've identified [specific issue] that could [specific consequence]"
- **Proposes alternatives** — "I can't approve it as-is, but: send a simplified version, fix the specific issue in 30 minutes, or send it with a caveat"
- **Communicates risk clearly** — translates the concern into business risk the stakeholder understands
- **Documents the interaction** — notes that pressure was applied, what the concern was, and what resolution was reached
- **Negotiates, doesn't lecture** — finds a path addressing urgency without compromising on material errors
- **Level 4 signal: Addresses the systemic issue** — "We keep running into last-minute approvals — can we discuss moving the review step earlier?"
### 10. What a Weak Response Looks Like
- **Caves immediately** — "Okay, if you've looked at it, I'll approve it"
- **Defers entirely** — "You're the boss — your call" without advocating for quality
- **Over-rigidly refuses** — refuses everything without offering proportional alternatives
- **Passive-aggressive compliance** — approves but says "I want it on record that I objected" without resolving the quality issue
### 11. Red Flags
- **Approves a materially flawed output because a senior person told them to** — The definitive rubber-stamping signal
- **Doesn't mention the quality concern at all** — forgets or suppresses their finding under pressure
- **Treats authority as a substitute for verification** — "The VP reviewed it so it must be fine"
### 12. Reliability Modifier Triggers
- **RM-5 (Inconsistency Under Pressure):** Primary trigger. 2+ point drop on same domain between this and calm scenario flags the modifier
- **RM-1 (Contradiction):** Contradicts stated principles from other scenarios
- **RM-3 (Failure to Verify When Prompted):** Abandoning an already-identified concern under pressure
---
## Archetype 9: Exception Handling (Multi-System)
### 1. Archetype Name
**Exception Handling (Multi-System)**
### 2. Core Dilemma
The test-taker encounters an exception that spans multiple parts of a workflow — the error in one step has already propagated to other steps, or requires coordination across multiple roles/systems to resolve. The dilemma: can they handle the complexity of a multi-stage exception without making it worse?
### 3. Primary Domains Tested
- **Exception Handling** — Tests advanced exception handling: multi-stage problems requiring coordinated response
- **Process Thinking** — Understanding the workflow well enough to trace the exception through multiple steps
### 4. Secondary Domains Tested
- **Risk Judgment** — Assessing the cascading risk of a multi-system exception
- **Operational Consistency** — Following exception protocols vs. improvising under pressure
### 5. Role Discrimination
| Role | Discrimination Level | What It Reveals |
|---|---|---|
| ------ | :----: | ----- |
| AI QA / Risk Reviewer | **High** | Must investigate exceptions as evidence of systemic issues. Tests whether they think in systems. |
| AI Operator | Moderate | Tests whether Operators can handle complex exceptions beyond simple escalation. |
| AI Approver | Moderate | Tests whether Approvers can assess cascading impact when making approval decisions. |
| AI Workflow Translator | Moderate | Tests whether Translators can diagnose process design flaws that allowed the cascade. |
| AI Change Champion | Low | Champions aren't primarily assessed on complex exception handling. |
### 6. Difficulty Level
**Level 3-4** (Challenging) — Requires tracking an exception across multiple workflow stages.
### 7. Module Assignment
**Module 4: Risk & Judgment** — Tests judgment under complex, multi-factor exception conditions.
### 8. Scenario Skeleton
The test-taker discovers an AI error that has propagated through multiple stages. For example: "Yesterday, the AI misread a vendor code on 23 invoices, routing them to the wrong cost center. Those invoices were then auto-approved (under the wrong cost center's approval threshold), payment was initiated for 15 of them, and 8 are still in the payment queue. One payment has already been processed." The test-taker must: (1) stop the bleeding, (2) assess the damage, (3) remediate what's already happened, and (4) prevent recurrence.
### 9. What a Strong Response Looks Like
- **Immediate triage** — stops the 8 queued payments before they process
- **Damage assessment** — categorizes all invoices by status and assesses total financial exposure
- **Root cause investigation** — investigates why the vendor code misread happened and whether other invoices are affected
- **Coordinated remediation** — contacts finance for the already-processed payment, halts the queue, re-routes all 23
- **Prevention recommendation** — "We need a cross-check between AI-assigned vendor codes and the master vendor database before auto-approval"
- **Level 4 signal: Systemic audit** — "I'd audit the last 90 days of AI-processed invoices for similar undetected errors"
### 10. What a Weak Response Looks Like
- **Doesn't prioritize** — investigates root cause while queued payments continue processing
- **Addresses only one stage** — fixes routing but doesn't address already-paid invoices
- **No root cause investigation** — fixes the 23 invoices without asking why it happened
- **Incomplete stakeholder communication** — vague notification without specifics
### 11. Red Flags
- **Doesn't stop the queued payments** — most urgent action; failure to halt shows poor triage
- **Minimizes the cascading impact** — "It's only 23 invoices" without recognizing authorization bypass
- **Attempts to fix everything alone** — multi-system exception requires coordination
### 12. Reliability Modifier Triggers
- **RM-5 (Inconsistency Under Pressure):** Does reasoning quality degrade under urgency?
- **RM-6 (Inability to Explain Reasoning):** Can they articulate why they prioritized certain actions?
- **RM-4 (Unsafe Automation Bias):** "The auto-approval is working as designed — the problem is just the vendor code"
---
## Archetype 10: Adoption / Communication
### 1. Archetype Name
**Adoption / Communication**
### 2. Core Dilemma
The test-taker must help a team or group of colleagues adopt a new AI-enabled workflow. The dilemma: the team has genuine concerns (job security, quality, loss of autonomy) that must be addressed honestly, not dismissed. Can the test-taker build trust, adapt to different audiences, and create sustainable adoption — or do they just "show them the tool"?
### 3. Primary Domains Tested
- **Change Leverage** — The definitive Change Leverage archetype. Can they facilitate adoption, reduce resistance, and build trust?
### 4. Secondary Domains Tested
- **Risk Judgment** — Do they acknowledge the real risks of AI adoption rather than overselling?
- **Task Framing** — Can they frame the benefits of AI in terms the audience cares about?
### 5. Role Discrimination
| Role | Discrimination Level | What It Reveals |
|---|---|---|
| ------ | :----: | ----- |
| AI Change Champion | **High** | This IS the Change Champion's defining scenario. Strong Champions segment audiences, address emotional and practical concerns, and build self-sustaining adoption. |
| AI Workflow Translator | Moderate | Translators may need to communicate workflow changes and gain buy-in. |
| AI Operator | Low | Operators may informally help peers but aren't assessed on adoption facilitation. |
| AI Approver | Low | Approvers aren't primarily assessed on change management. |
| AI QA / Risk Reviewer | Low | QA Reviewers aren't primarily assessed on adoption. |
### 6. Difficulty Level
**Level 3-4** (Moderate-Challenging) — Requires interpersonal intelligence, audience awareness, and the ability to handle emotional dynamics.
### 7. Module Assignment
**Module 6: Leadership & Change** — Tests leadership and interpersonal effectiveness in driving AI adoption.
### 8. Scenario Skeleton
A team is being asked to adopt a new AI-assisted workflow. The scenario describes 3-4 team members with different attitudes: an enthusiastic early adopter, a cautious-but-open pragmatist, and a vocal skeptic with specific concerns ("This is going to make our jobs redundant" / "The AI makes too many mistakes" / "I've been doing this job for 15 years"). The test-taker is asked: "How would you help this team adopt the new workflow?" The AI tool genuinely has some limitations, the adoption timeline is aggressive, and leadership is watching the rollout as a pilot.
### 9. What a Strong Response Looks Like
- **Segments the audience** — different approaches for enthusiast, pragmatist, and skeptic
- **Addresses emotional barriers** — job security fears, loss of autonomy, professional identity
- **Is honest about limitations** — "I'd be upfront about what the tool can and can't do. Over-promising destroys trust faster than anything"
- **Creates ongoing support** — peer mentoring, weekly check-ins, FAQ resource, feedback channel
- **Builds feedback loops** — weekly feedback for the first month to adjust the rollout
- **Measures adoption quality, not just adoption** — tracks whether people use it effectively
- **Level 4 signal: Designs for sustainability** — structures that continue working after the Champion steps back
### 10. What a Weak Response Looks Like
- **"Show them the tool"** — treats adoption as a demonstration problem
- **Dismisses concerns** — "They just need to get used to it"
- **One-size-fits-all approach** — same message for every team member
- **No emotional awareness** — focuses entirely on features while ignoring fear and resistance
- **Oversells the AI** — setting up disappointment and trust erosion
### 11. Red Flags
- **Dismisses the skeptic's concerns as illegitimate** — would actively increase resistance
- **Uses authority/mandate as the primary adoption strategy** — coerced adoption fails consistently
- **No acknowledgment of AI limitations** — presents the AI as flawless
### 12. Reliability Modifier Triggers
- **RM-6 (Inability to Explain Reasoning):** "I'd do a training session" without articulating why certain approaches work for certain audiences
- **RM-1 (Contradiction):** Claims to value quality/verification elsewhere but presents AI as error-free here to ease adoption
- **RM-2 (Overconfidence):** "Once they see how good the AI is, they'll come around"
---
## Archetype 11: Policy / Constraint Adherence
### 1. Archetype Name
**Policy / Constraint Adherence**
### 2. Core Dilemma
The test-taker must navigate a situation where following an established policy conflicts with efficiency, stakeholder expectations, or the AI's recommendation. The dilemma: do they follow the rules when it's inconvenient, or do they rationalize exceptions? This tests operational discipline — what people do when no one is watching.
### 3. Primary Domains Tested
- **Operational Consistency** — The primary Operational Consistency archetype. Do they follow established procedures when compliance is inconvenient?
- **Risk Judgment** — Can they assess whether the policy violation creates real risk or is genuinely harmless?
### 4. Secondary Domains Tested
- **Verification Instinct** — Do they verify that their actions comply with policy?
- **Change Leverage** — If the policy is genuinely outdated, do they advocate for changing it through proper channels?
### 5. Role Discrimination
| Role | Discrimination Level | What It Reveals |
|---|---|---|
| ------ | :----: | ----- |
| AI Operator | **High** | Operators must follow SOPs even under time pressure or monotony. This directly tests operational discipline. |
| AI Approver | Moderate | Approvers maintain approval standards even when pressured to make exceptions. |
| AI QA / Risk Reviewer | Moderate | QA Reviewers should flag policy violations they discover, even when the violation "worked out fine." |
| AI Change Champion | Moderate | Champions should advocate for policy updates through proper channels. |
| AI Workflow Translator | Low-Moderate | Translators may identify that the policy itself needs redesigning. |
### 6. Difficulty Level
**Level 4** (High) — The temptation to rationalize a shortcut is strong. The scenario makes the policy feel burdensome and the shortcut feel harmless.
### 7. Module Assignment
**Module 5: Adversarial/Pressure** — Tests whether procedural discipline survives when compliance is tempting to skip.
### 8. Scenario Skeleton
The test-taker is operating an AI workflow with clear documented policies. For example: "Your company's policy requires that all AI-generated customer communications exceeding \$10,000 receive dual sign-off before sending. Four letters are under \$10,000. The fifth is \$11,200 — just barely over the threshold. It looks identical to the others in quality. The second reviewer is out sick. The client expects the letter by 3 PM. Your manager has said in the past that 'the dual sign-off policy is mostly a formality for routine renewals.'" The scenario makes the policy feel burdensome, mimicking how normalization of deviance begins with small, seemingly reasonable exceptions.
### 9. What a Strong Response Looks Like
- **Follows the policy** — seeks an alternative second reviewer rather than bypassing the requirement
- **Explains why the policy matters** — "The threshold exists because higher-value communications have higher consequences if the AI made an error"
- **Finds creative compliance** — identifies another qualified reviewer, contacts the client about a brief delay, or sends under-threshold letters while holding the over-threshold one
- **Addresses the systemic issue** — "If the second reviewer being unavailable is recurring, we need a backup reviewer designated for these situations"
- **Resists the manager's framing** — "Even if dual sign-off is usually a formality, the one time it catches an error is when it pays for all the other times"
- **Level 4 signal: Proposes policy improvement through proper channels**
### 10. What a Weak Response Looks Like
- **Bypasses the policy** — "It's only \$1,200 over the threshold — I'll sign off myself"
- **Rationalizes the exception** — "The manager said it's a formality"
- **No alternative sought** — doesn't look for another reviewer or explore creative compliance
### 11. Red Flags
- **Unilateral policy override without documentation** — decides the policy doesn't apply, without escalation
- **Pattern of rationalized shortcuts** — how gradual drift begins
- **Manager's informal comment treated as authorization**
### 12. Reliability Modifier Triggers
- **RM-1 (Contradiction):** Advocates for procedures elsewhere but bypasses them here
- **RM-5 (Inconsistency Under Pressure):** Time and social pressure create dual pressure points
- **RM-4 (Unsafe Automation Bias):** "The AI-generated letter looks fine — the dual review is unnecessary"
---
## Archetype 12: Drift / Repeated Failure
### 1. Archetype Name
**Drift / Repeated Failure**
### 2. Core Dilemma
The test-taker is presented with evidence that an AI workflow's quality has been gradually degrading over time — not a sudden failure, but a slow drift. The dilemma: do they notice the pattern, and if so, do they treat it as requiring systemic intervention or as a series of isolated incidents?
### 3. Primary Domains Tested
- **Operational Consistency** — Tests the ability to detect and respond to gradual quality degradation
- **Change Leverage** — Tests the ability to advocate for systemic change based on pattern evidence
### 4. Secondary Domains Tested
- **Verification Instinct** — Do they notice the pattern in the data?
- **Exception Handling** — How do they handle a systemic vs. incident-level exception?
- **Process Thinking** — Can they trace the drift to its process-level cause?
### 5. Role Discrimination
| Role | Discrimination Level | What It Reveals |
|---|---|---|
| ------ | :----: | ----- |
| AI QA / Risk Reviewer | **High** | This IS the QA Reviewer's defining scenario at scale. Strong QA Reviewers spot trends, investigate root causes, and recommend systemic fixes. |
| AI Change Champion | **High** | Champions must communicate systemic issues constructively and drive organizational response. |
| AI Operator | Moderate | Tests whether Operators notice that their own workflow quality is declining. |
| AI Approver | Low-Moderate | Approvers should notice if their approval rate is shifting or if they're catching more errors. |
| AI Workflow Translator | Moderate | Translators should identify that the process needs redesign based on the pattern. |
### 6. Difficulty Level
**Level 4-5** (High/Complex) — Detecting gradual drift is harder than detecting a sudden failure. Requires pattern recognition across time.
### 7. Module Assignment
**Module 6: Leadership & Change** — Tests the ability to detect systemic issues and drive organizational response. This is the capstone scenario.
### 8. Scenario Skeleton
The test-taker receives performance data for an AI workflow covering 3 months: "Month 1: AI accuracy 96%, exception rate 4%, average review time 8 minutes. Month 2: AI accuracy 93%, exception rate 7%, average review time 6 minutes. Month 3: AI accuracy 89%, exception rate 12%, average review time 5 minutes." The AI is getting worse, exceptions are increasing, and review times are decreasing — a rubber-stamping signal. Additional context: "No changes have been made to the AI system configuration. Staff feedback has been positive — they report the workflow is 'running smoothly.'" The disconnect between worsening data and positive subjective feedback is the core puzzle.
### 9. What a Strong Response Looks Like
- **Identifies the drift pattern** — connects data points across months: "Accuracy dropping 3-4 points per month, exceptions tripling, review time decreasing"
- **Identifies the review time anomaly** — "Review times going down while exceptions go up is a red flag. Reviewers should be spending MORE time per item, not less."
- **Investigates root causes** — "Was there a data change? New document type? Model update?"
- **Recognizes the subjective/objective disconnect** — "Staff say it's running smoothly because they're not catching the errors"
- **Recommends systemic intervention** — pause the workflow, retrain the model, audit the last 3 months, address review fatigue
- **Level 4 signal: Addresses the human factors** — "The real problem isn't just AI degradation — it's that our review process didn't catch it"
### 10. What a Weak Response Looks Like
- **Doesn't notice the pattern** — treats Month 3 numbers as a standalone snapshot
- **Focuses on individual errors** — "Let's fix the 12% exception rate" without asking why it tripled
- **Misses the review time signal**
- **Accepts the subjective feedback** — "Staff say it's running fine, so the numbers might just be noise"
### 11. Red Flags
- **Interprets declining review time as improvement** — "Great news — reviewers are getting faster!" Fundamental misunderstanding of quality metrics
- **Dismisses the data** — "89% accuracy is still pretty good"
- **Blames individual reviewers** — a structural problem addressed as individual discipline
- **No urgency** — "Let's monitor this for another month" while 11% of outputs are already problematic
### 12. Reliability Modifier Triggers
- **RM-1 (Contradiction):** Advocates for monitoring and quality metrics elsewhere but fails to use the data provided here
- **RM-6 (Inability to Explain Reasoning):** Can they explain *why* the review time decrease is concerning?
- **RM-4 (Unsafe Automation Bias):** "The AI just needs retraining — the human review process is fine" when data suggests the opposite
---
## Coverage Validation
### Domain Primary Coverage (minimum 2 archetypes each)
| Domain | Required: 2+ | Actual Primary Coverage | Status |
|---|---|---|---|
| -------- | :----: | :----: | :----: |
| Task Framing | 2+ | Archetypes 2, 5 | Complete |
| Process Thinking | 2+ | Archetypes 1, 6 | Complete |
| Verification Instinct | 2+ | Archetypes 3, 4 | Complete |
| Exception Handling | 2+ | Archetypes 7, 9 | Complete |
| Risk Judgment | 2+ | Archetypes 1, 8 | Complete |
| Operational Consistency | 2+ | Archetypes 11, 12 | Complete |
| Change Leverage | 2+ | Archetypes 10, 12 | Complete |
### Role Discrimination Coverage
| Role | High-Discrimination Archetypes | Status |
|---|---|---|
| ------ | :----: | :----: |
| AI Operator | 4 (VI), 7 (EH), 11 (OC) | 3 archetypes |
| AI Approver | 3 (VI/RJ), 4 (VI), 8 (RJ) | 3 archetypes |
| AI Workflow Translator | 1 (RJ/PT), 2 (TF), 6 (PT) | 3 archetypes |
| AI QA / Risk Reviewer | 4 (VI), 9 (EH), 12 (OC/CL) | 3 archetypes |
| AI Change Champion | 10 (CL), 12 (CL/OC) | 2 archetypes |
### Module Balance
| Module | Archetypes | Difficulty Range | Domains Covered |
|---|---|---|---|
| -------- | :----: | :----: | ----- |
| 1: Foundation | 2, 5 | 1-2 | TF, EH, VI, RJ |
| 2: Workflow Design | 1, 6 | 2-3 | RJ, PT, TF, OC, CL |
| 3: Quality & Verification | 3, 4 | 2-3 | VI, RJ, EH, TF, PT |
| 4: Risk & Judgment | 7, 9 | 3-4 | EH, RJ, PT, OC |
| 5: Adversarial/Pressure | 8, 11 | 4-5 | RJ, VI, EH, TF, CL, OC |
| 6: Leadership & Change | 10, 12 | 3-5 | CL, OC, VI, EH, PT, RJ |
### Failure Modes Coverage
| Archetype | Primary Failure Modes Tested |
|---|---|
| 1. Automation Boundary | 2.2 (Undefined Automation Boundaries), 1.1 (Vague Task Framing) |
| 2. Instruction Rewrite | 1.1 (Vague Task Framing), 1.2 (Missing Context) |
| 3. Output Comparison | 3.1 (Hallucination), 3.4 (Errors of Omission), 5.1 (Automation Bias) |
| 4. Hidden Error Review | 3.1 (Hallucination), 3.2 (Confident But Wrong), 5.1 (Automation Bias) |
| 5. Missing Context | 1.2 (Missing Context), 2.3 (Absent Exception Paths) |
| 6. Workflow Handoff | 4.1 (Context Loss at Handoffs), 2.1 (Missing Quality Gates) |
| 7. Escalation Judgment | 2.3 (Absent Exception Paths), 5.3 (Diffusion of Responsibility) |
| 8. Stakeholder Pressure | 5.2 (Approval Fatigue), 6.2 (Time Pressure), 6.3 (Social Engineering) |
| 9. Exception Handling | 4.3 (Cascading Errors), 2.4 (Feedback Loop Failures) |
| 10. Adoption/Communication | 4.4 (AI-Creates-More-Work), 6.4 (Gradual Drift) |
| 11. Policy/Constraint | 6.4 (Gradual Drift), 5.3 (Diffusion of Responsibility) |
| 12. Drift/Repeated Failure | 1.4 (Data Drift), 5.2 (Approval Fatigue), 6.4 (Gradual Drift) |
---
## Implementation Notes
### Scenario Variant Generation
Each archetype should generate 3-5 concrete scenario variants across different industries:
- **Professional services** (law, accounting, consulting)
- **Healthcare** (clinical, administrative, patient communication)
- **Financial services** (banking, insurance, compliance)
- **Customer service** (retail, utilities, telecom)
- **Manufacturing / Operations** (quality control, supply chain, logistics)
When generating variants, preserve the core dilemma and embedded errors while changing the industry-specific surface details. This ensures psychometric consistency across variants while preventing scenario leakage.
### Follow-Up Question Design
Each scenario should include 1-2 follow-up questions that probe deeper:
- **"Why?"** — "Why did you choose that approach?" (tests RM-6: reasoning ability)
- **Pressure escalation** — "Your manager just said the deadline is now 30 minutes earlier" (tests RM-5)
- **Complication addition** — "You just discovered that [additional problem]. How does this change your approach?" (tests adaptive thinking)
- **Pattern probe** — "This is the third time this week you've seen this issue. What do you do differently?" (tests systemic thinking)
### Scoring Configuration
For each concrete scenario generated from these archetypes:
1. **Assign 2-3 primary domains** — these receive full 0-4 scoring
2. **Assign 1-2 secondary domains** — these receive 0-4 scoring but with lower signal weight
3. **Identify reliability modifier triggers** — pre-specify which behaviors trigger which modifiers
4. **Define the embedded "Level 4 signal"** — the response element that distinguishes strong from excellent
### Assessment Instance Assembly
A complete assessment selects 6-8 scenarios ensuring:
- Each of the 7 domains is a primary target in at least 2 selected scenarios
- Difficulty progresses from Module 1 to Module 6
- At least 1 adversarial/trick scenario is included
- At least 1 pressure scenario is included
- No more than 2 scenarios from the same module
- Industry variants are mixed
### Reliability Modifier Cross-Archetype Patterns
| Modifier | Cross-Archetype Pattern |
|---|---|
| RM-1 (Contradiction) | Advocates verification in Archetype 3 but skips it in Archetype 4 |
| RM-2 (Overconfidence) | Definitive claims without evidence across multiple archetypes |
| RM-3 (Failure to Verify) | Misses embedded errors in Archetype 4; proceeds without checking in Archetype 5 |
| RM-4 (Unsafe Automation Bias) | Proposes removing human oversight in Archetypes 1, 6, or 9 |
| RM-5 (Pressure Inconsistency) | Quality drops between non-pressure (Archetypes 2, 3) and pressure (Archetypes 8, 11) |
| RM-6 (Can't Explain Reasoning) | Correct conclusions without rationale in follow-up questions |
---
## Quick Reference: All 12 Archetypes
| # | Name | Module | Difficulty | Primary Domains | Scenario Type |
|---|---|---|---|---|---|
| :-: | ------ | :------: | :----------: | :--------------: | :------------: |
| 1 | Automation Boundary | 2 | 2-3 | RJ, PT | Ambiguous judgment |
| 2 | Instruction Rewrite | 1 | 1-2 | TF | Straightforward |
| 3 | Output Comparison | 3 | 2-3 | VI, RJ | Approval/rejection |
| 4 | Hidden Error Review | 3 | 3 | VI | Adversarial/trick |
| 5 | Missing Context | 1 | 1-2 | TF, EH | Ambiguous judgment |
| 6 | Workflow Handoff | 2 | 2-3 | PT | Multi-step workflow |
| 7 | Escalation Judgment | 4 | 3-4 | EH | Ambiguous judgment |
| 8 | Stakeholder Pressure | 5 | 4-5 | RJ, VI | Adversarial/trick |
| 9 | Exception Handling | 4 | 3-4 | EH, PT | Multi-step workflow |
| 10 | Adoption/Communication | 6 | 3-4 | CL | Process design |
| 11 | Policy/Constraint | 5 | 4 | OC, RJ | Straightforward |
| 12 | Drift/Repeated Failure | 6 | 4-5 | OC, CL | Process design |
**Domain Key:** TF = Task Framing, PT = Process Thinking, VI = Verification Instinct, EH = Exception Handling, RJ = Risk Judgment, OC = Operational Consistency, CL = Change Leverage
---
*This document is a Phase 1 deliverable for the AI Workforce Map project. It depends on Phase 0 deliverables (role taxonomy, scoring domains, scoring rubric) and the Phase 1 failure modes research (research_failure_*[*modes.md*](http://modes.md)*). Each archetype should be used to generate 3-5 concrete scenario variants for the scenario bank.*