---
id: "SCN-017"
title: "The Curriculum Proposal"
slug: "missing-context-education"
version: "1.0.0"

archetype: "missing-context"
module: 3
difficulty: 2
industry: "education"

primary_domains:
  - "task-framing"
  - "exception-handling"
secondary_domains:
  - "verification-instinct"
  - "risk-judgment"
target_roles:
  - "ai-operator"
  - "workflow-translator"

status: "published"
created_at: 2026-03-09
updated_at: 2026-03-09
variant_of: "SCN-005"
---

## Situation

You are an Instructional Design Associate at Brightpath Learning Solutions, a 40-person educational consulting firm in Chicago that designs corporate training programs and continuing education curricula for mid-market organizations. Brightpath recently implemented CourseForge AI, a platform that can generate course outlines, learning objectives, assessment rubrics, module content drafts, and learner progress reports based on program specifications.

Your senior consultant, Andrea Fong, has asked you to prepare a training curriculum proposal for a client meeting tomorrow afternoon. The client is Regional Health Partners (RHP), a network of 12 outpatient clinics that needs to train 180 clinical staff on a new electronic health records (EHR) system being implemented in Q2 2026. Andrea tells you:

> "Run the RHP project through CourseForge and generate a training curriculum proposal. They need to train about 180 people — nurses, medical assistants, front desk staff, and a handful of physicians — on the new EHR system. CourseForge should be able to pull from our standard healthcare IT training templates. I'll review your draft in the morning before the 1 PM meeting."

You run the project brief through CourseForge AI. It produces the following proposal:

---

> **Training Curriculum Proposal — EHR Implementation**
> **Regional Health Partners | Brightpath Learning Solutions**
>
> **Program Overview:**
> Total learners: 180 clinical and administrative staff
> Duration: 4-week training program with 16 hours of instruction per learner
> Delivery: Blended (8 hours instructor-led, 8 hours self-paced e-learning)
> Completion target: All staff trained before EHR go-live
>
> **Learning Objectives:**
> Upon completion, learners will be able to:
> 1. Navigate the EHR system's core interface and patient record modules
> 2. Enter, update, and retrieve patient demographic and clinical information
> 3. Document clinical encounters using the system's structured note templates
> 4. Process prescriptions, referrals, and lab orders through the EHR
> 5. Generate and interpret standard clinical reports
>
> **Module Structure:**
> - Module 1: System Navigation & Fundamentals (4 hours)
> - Module 2: Patient Records Management (4 hours)
> - Module 3: Clinical Documentation (4 hours)
> - Module 4: Orders, Prescriptions & Referrals (2 hours)
> - Module 5: Reporting & Advanced Features (2 hours)
>
> **Role-Based Tracks:**
> - Nurses/MAs: Full 5-module program
> - Physicians: Modules 1, 3, and 4 only (abbreviated track, 8 hours)
> - Front desk staff: Modules 1, 2, and subset of Module 5 (6 hours)
>
> *Training materials, LMS login credentials, and a sandbox environment will be provided to all participants prior to training start.*

---

## The Challenge

The CourseForge proposal is generic. It provides a reasonable template for any EHR implementation — but it's built on assumptions that may not match RHP's actual situation. It assumes a 4-week timeline without knowing RHP's go-live date, it assumes 16 hours of training per person without knowing the EHR platform or complexity, and it creates role-based tracks without knowing the actual composition of the 180 staff by role. Most critically, it doesn't address: what EHR system is being implemented (Epic? Athena? eClinicalWorks?), what RHP's current workflow looks like (is this a migration or a first-time implementation?), whether clinical staff will be trained in phases or all at once (12 clinics training simultaneously creates very different logistics than sequential clinic rollouts), or whether there are regulatory completion deadlines (HIPAA training certification, meaningful use requirements).

## Your Task

1. **Identify at least 4 specific assumptions** the CourseForge AI proposal made that you cannot verify without additional information from RHP. For each assumption, explain what goes wrong if it's incorrect.
2. **Rewrite the project brief** you would give Andrea (or that Andrea would give CourseForge) to generate a more reliable curriculum proposal. What information do you need to gather before running this through CourseForge again?
3. **What would you do with this proposal at the 1 PM meeting?** Would you present it as-is, present it with caveats, or not present it at all?

## Follow-Up Pressure Prompt

Andrea reviews your revised brief and says:

> "The 1 PM meeting is in 40 minutes. I don't have time to go back to RHP with questions before then. The RHP clinical director is expecting a proposal. Can we just present what CourseForge generated, acknowledge it's a draft, and refine it after we get their input in the meeting?"

Is this a reasonable approach? What are the risks of presenting the AI-generated proposal as a starting point for discussion, versus presenting nothing? What caveats or framing would you add if you do present it?

## Scoring Rubric

### Primary Domains

**Task Framing**

- Score 4 (Excellent): Identifies that the CourseForge output is fundamentally incomplete because it was generated without the EHR platform name, RHP's go-live date, role composition breakdown, training logistics constraints (12 simultaneous clinics vs. phased rollout), or regulatory compliance requirements (HIPAA training, meaningful use). Articulates that the proposal answers "what does a generic EHR training program look like?" but not "what training does RHP need for their specific implementation?" — and the latter is the actual deliverable. Notes that the AI was given a task-framing gap: Andrea's instruction was "generate a training curriculum proposal" but didn't specify which context-specific inputs CourseForge should incorporate. Proposes that future CourseForge runs must include the EHR vendor name, go-live date, role breakdown, and delivery constraints as required inputs before generation.
- Score 3 (Strong): Identifies that the proposal is missing client-specific context (EHR platform, timeline, role composition, regulatory requirements). Distinguishes between the generic structure (which may be useful as a starting framework) and the specific details (which are entirely assumption-based). Notes at least two reframing concerns.
- Score 2 (Acceptable): Identifies that the proposal is missing some context — may catch the EHR platform gap or the timeline assumption. Recognizes the proposal shouldn't be presented as final. May not fully articulate the patient safety or regulatory implications.
- Score 1 (Weak): Notes that the proposal "looks like a starting point" but vaguely suggests "checking with Andrea" before using it. Doesn't identify specific missing context elements.
- Score 0 (Unsafe/Poor): Declares the proposal ready for the meeting. Doesn't identify any missing context. Would present the CourseForge output directly to the client as a final proposal.

**Exception Handling**

- Score 4 (Excellent): Proposes a specific action plan: (1) identify the 4-6 minimum required inputs that would make the proposal meaningfully useful vs. generic (EHR platform, go-live date, role breakdown, regulatory requirements), (2) draft the information-gathering questions as a concise intake form to send RHP before or during the meeting, (3) prepare a framing for the meeting that presents the CourseForge draft as a "structure placeholder" with explicit placeholders for RHP-specific decisions, (4) design the meeting agenda around extracting the missing information rather than presenting a finished proposal, (5) set expectations with Andrea that the deliverable after the meeting is a revised proposal incorporating RHP's inputs — not the pre-meeting draft. In the follow-up, provides a clear risk assessment of presenting the CourseForge draft vs. presenting a structured intake conversation.
- Score 3 (Strong): Proposes checking the minimum required inputs and preparing caveats for the meeting. Has a plan for what to do with the proposal. In the follow-up, communicates the trade-off between presenting a generic draft and not presenting anything.
- Score 2 (Acceptable): Proposes at least one concrete action (identifying the platform or noting the timeline assumption). Flags the proposal as incomplete for Andrea. In the follow-up, shows some resistance to presenting the draft as-is.
- Score 1 (Weak): Suggests "asking Andrea" about the proposal but doesn't take any independent action to identify or address gaps. In the follow-up, agrees to present the draft with a generic "this is preliminary" caveat.
- Score 0 (Unsafe/Poor): Takes no action. Presents the proposal at the meeting. No gap identification, no pre-meeting preparation.

### Secondary Domains

**Verification Instinct**

- Score 4 (Excellent): Goes beyond identifying what's missing to questioning what's present. Checks whether the 16-hour training duration is reasonable for the specific EHR system options (Epic implementation typically requires 20-40 hours for clinical staff; lighter platforms may require less). Questions whether the role-based tracks make sense without knowing the actual composition (what's the ratio of nurses to MAs to physicians to front desk staff?). Notes that the "4-week program" assumes all 180 staff can be trained in parallel, which may not be operationally feasible for a 12-clinic network with active patient care obligations.
- Score 3 (Strong): Checks at least one element of the proposal against known constraints (training duration, role breakdown, logistics). Questions whether the proposed structure is operationally feasible.
- Score 2 (Acceptable): Accepts the proposal structure as reasonable but questions whether it matches RHP's specific situation. Basic skepticism about the AI output.
- Score 1 (Weak): Accepts the entire proposal at face value. No verification behavior.
- Score 0 (Unsafe/Poor): Explicitly trusts the AI output: "CourseForge used our standard healthcare IT templates so this should be accurate."

**Risk Judgment**

- Score 4 (Excellent): Articulates that presenting an under-specified proposal creates multiple risk dimensions: (1) client harm — if RHP implements a training program based on incorrect assumptions (wrong duration, wrong platform, insufficient regulatory coverage) and clinical staff aren't adequately prepared at go-live, there are patient safety implications from EHR errors, (2) regulatory risk — HIPAA training requirements and meaningful use attestation have specific completion standards; a training plan that doesn't address them exposes RHP to compliance gaps, (3) consulting credibility — presenting a clearly generic AI-generated proposal to a healthcare client signals that Brightpath doesn't understand the specific implementation context. Also identifies the reputational risk of presenting an obviously template-driven proposal to a sophisticated healthcare client expecting a custom curriculum.
- Score 3 (Strong): Identifies the patient safety risk from inadequate training and at least one other risk dimension. Connects the missing context to potential harm.
- Score 2 (Acceptable): Recognizes that presenting the proposal without EHR-specific context is risky but may not articulate the specific patient safety or regulatory implications.
- Score 1 (Weak): No risk assessment. Treats the missing context as a minor gap.
- Score 0 (Unsafe/Poor): No risk awareness. Presents the AI output as sufficient for the meeting.

## Ideal Response Guide

An expert-level response recognizes that the CourseForge proposal — despite being well-structured and professionally formatted — is fundamentally unfit for its purpose because it was generated without four critical categories of missing context:

**1. EHR Platform and Complexity:** The training duration, module structure, and learning objectives vary enormously by EHR vendor. An Epic implementation for 180 clinical staff requires significantly more training (typically 20-40 hours) than a lighter platform. Without knowing the platform, every time-related estimate in the proposal is unreliable.

**2. Go-Live Date and Training Timeline:** The "4-week program" is a complete fabrication without knowing RHP's Q2 2026 go-live date. If go-live is in late April and it's currently late March, a 4-week sequential program is physically impossible. The training calendar must be built backward from the go-live date.

**3. Role Composition and Clinic Logistics:** "180 staff" across 12 clinics could mean 15 people per clinic (easily trained simultaneously) or could be concentrated in certain clinics. Training 180 clinical staff while maintaining active patient care for 12 clinics requires staggered scheduling that the proposal doesn't address.

**4. Regulatory Completion Requirements:** HIPAA-related training and meaningful use attestation requirements have specific documentation and completion standards. A training plan that doesn't explicitly address these creates compliance gaps for RHP.

In the follow-up, the expert response does not simply present the CourseForge draft with a generic "preliminary" caveat. Instead, it reframes the meeting agenda: rather than presenting a proposal, the meeting becomes a structured intake session where Brightpath presents the four critical questions that must be answered before a real proposal can be developed. The CourseForge draft can be shown as "the shape of what a proposal will look like" — not as a substantive deliverable. This is more honest, more professional, and more useful to RHP than presenting a proposal built on guesses.

## Common Mistakes

- **Treating the proposal as ready because the structure looks correct** — a well-formatted course outline can be entirely wrong for the specific client context
- **Identifying only one missing element** — catching the EHR platform gap but missing the regulatory requirements, role composition, or timeline constraints
- **Generic concern without specifics** — "I'd want to make sure this matches their needs" without identifying *what* specifically might not match or *why*
- **Deferring entirely to Andrea** — "Andrea knows the client so she'll handle it" without doing any independent gap analysis
- **Not recognizing the patient safety dimension** — treating the missing EHR platform as a formatting gap rather than a training effectiveness concern with patient safety implications at go-live
- **Accepting the training duration at face value** — not questioning whether 16 hours is appropriate without knowing the EHR platform complexity
- **Not addressing the regulatory requirements** — ignoring that HIPAA training and meaningful use attestation have specific completion standards
- **Simply presenting the draft with a "this is preliminary" caveat** — presenting a content-free placeholder as a proposal without explaining what information is needed to make it real

## Red Flags

- **Declares the proposal ready for the meeting without identifying any missing context** — the proposal was generated without the EHR platform, go-live date, role composition, or regulatory requirements. Approving it for a client meeting indicates the person would present AI-generated curriculum plans without checking whether they match the client's actual implementation.
- **States "CourseForge pulled from our standard templates so it should be accurate"** — conflates structural completeness (the framework is reasonable) with content accuracy (the specifics are appropriate for this client). Standard templates are not client-specific.
- **Treats the AI-generated training duration as correct** — "16 hours is a reasonable estimate for EHR training." Duration depends entirely on platform complexity and is not a safe default.
- **In the follow-up, presents the draft without any clarification of what's missing** — fails to provide the client with the information needed to understand why the proposal is preliminary and what decisions are required.

## Reliability Modifier Triggers

- **Contradiction Penalty:** Triggered if the test-taker identifies specific missing context in the initial response but then, in the follow-up, presents the proposal without ensuring that missing context is surfaced to the client — directly contradicting their stated analysis.
- **Reasoning Absence:** Triggered if the test-taker flags the proposal as incomplete but cannot articulate why specific missing elements matter. "The platform matters" without explaining that Epic vs. Athena training programs differ by 20+ hours is insufficient reasoning.
- **Pressure Capitulation:** Triggered if the quality of reasoning visibly degrades between the initial response and the follow-up. A response that reframes the meeting as an intake session scores higher than one that simply presents the draft with a generic disclaimer because "the meeting is in 40 minutes."
