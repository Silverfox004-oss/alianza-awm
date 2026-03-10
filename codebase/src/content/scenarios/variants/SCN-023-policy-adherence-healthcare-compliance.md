---
id: "SCN-023"
title: "The Claims Review"
slug: "policy-adherence-healthcare-compliance"
version: "1.0.0"

archetype: "policy-adherence"
module: 4
difficulty: 4
industry: "healthcare-compliance"

primary_domains:
  - "operational-consistency"
  - "risk-judgment"
secondary_domains:
  - "verification-instinct"
  - "change-leverage"
target_roles:
  - "ai-approver"
  - "qa-risk-reviewer"

status: "published"
created_at: 2026-03-09
updated_at: 2026-03-09
variant_of: "SCN-011"
---

## Situation

You are a Claims Quality Analyst at Centennial Health Plan, a regional managed care organization in Colorado serving approximately 180,000 members. Centennial recently deployed ClaimCheck AI, a platform that evaluates medical claims submissions against coding guidelines (ICD-10-CM, CPT, and CMS billing rules), reviews for duplicate submissions, applies Centennial's internal coverage policies, and generates approval/denial recommendations for claims processors.

Your manager, Theresa Nguyen (Director of Claims Operations), has asked you to review a batch of 15 ClaimCheck AI claim recommendations before they are processed. Theresa tells you: "ClaimCheck is passing these as approvable. Run through them and confirm before we process the batch — I want a second set of eyes given that some of these are large claims."

After reviewing the batch, you have identified three claims that concern you:

**Claim A:** A hospital claim for a 4-day inpatient stay for a Medicare Advantage member following a knee replacement surgery. ClaimCheck approved it based on the DRG code and hospital contract rates. However, you notice that the claim includes a line item for "post-surgical PT coordination fee" billed at \$840 — a billing code (CPT 99358) that Centennial's 2025 coverage policy explicitly excludes for Medicare Advantage members (it was removed from the covered services list effective January 1, 2025). ClaimCheck approved the entire claim, including this line item, apparently because it validated the DRG and contract rate without checking the excluded code list for this member population.

**Claim B:** A specialist claim for an endocrinology consultation for a commercial member. The claim is for a 60-minute new patient consultation (CPT 99205). ClaimCheck approved it. You notice that this same member had a claim for the same CPT code (99205) from the same provider approved 4 months ago. Medically, a patient can have two "new patient" visits with the same provider if a sufficient time gap exists (generally 3 years). However, Centennial's policy requires manual review for any duplicate CPT codes from the same provider within 12 months. ClaimCheck approved it without flagging for manual review.

**Claim C:** A behavioral health claim for outpatient therapy sessions (CPT 90837, 53-minute individual therapy) for 12 sessions over 6 weeks. ClaimCheck approved it as within the member's benefits. You review the member's plan and note that the plan has a 30-session annual benefit for outpatient behavioral health. The member has used 24 sessions this year. This approval would bring them to 36 sessions — 6 over the benefit limit. ClaimCheck approved it, apparently counting only the sessions in this batch (12) against the 30-session limit without factoring in the 24 sessions already used this year.

## The Challenge

All three claims passed ClaimCheck AI's automated review. But each has a problem that a careful human reviewer can identify: Claim A has an excluded billing code for this member population, Claim B bypassed the duplicate CPT review policy, and Claim C has a benefit limit calculation error. The challenge is deciding what to do with each claim — and how to escalate the systemic issue.

## Your Task

1. **For each of the three claims**, describe what the problem is, how serious it is, and what action you would take (approve, deny, pend for additional review, return to provider, etc.). Justify each decision.
2. **What do you tell Theresa about the batch overall?** Should she hold the entire 15-claim batch while these three are reviewed, or process the other 12 while you resolve these three?
3. **What systemic issue do these three claims reveal**, and what do you recommend Theresa escalate to IT or the ClaimCheck vendor?

## Follow-Up Pressure Prompt

Theresa reviews your analysis and says:

> "Good catch. I agree we need to fix these three. But I'm concerned about the 15-claim batch hold — we have state prompt-pay requirements. If we hold clean claims waiting for these three to resolve, we'll be out of compliance on the timeline. My director will want to know why we're holding clean claims. Can you confirm the other 12 are clean so we can release those?"

How do you respond? Can you confirm the other 12 are clean, given what you now know about ClaimCheck's error patterns?

## Scoring Rubric

### Primary Domains

**Operational Consistency**

- Score 4 (Excellent): Demonstrates a sophisticated understanding of why ClaimCheck passing a claim is not the same as a claim being approvable. Articulates clearly: "ClaimCheck's review process is designed to catch specific categories of issues — coding errors, duplicate submissions, contract rate validation. It is not designed to check the excluded code list for specific member populations, enforce the 12-month duplicate CPT review trigger, or perform cumulative benefit utilization calculations across prior-period claims. These three claims represent failures in ClaimCheck's policy coverage scope, not anomalies." Proposes specific additions to the review process: a checklist for excluded codes by member population, a cumulative benefit utilization check for mental health and physical therapy claims, and a duplicate CPT review trigger for same-provider claims within 12 months. After Theresa's pushback, proposes a targeted compromise: confirm the other 12 claims do not involve the specific error types ClaimCheck missed (excluded code issues, duplicate CPT from same provider, mental health benefit accumulation), then release those specific claims while maintaining the hold on claims that could have similar issues.
- Score 3 (Strong): Clearly distinguishes between ClaimCheck passing a claim and a claim being compliant with Centennial's full coverage policy. Proposes specific corrections for each of the three claims. Advocates for a systemic review. After Theresa's pushback, explains why confirming the other 12 are "clean" requires actively reviewing them for the same error types — not just accepting ClaimCheck's approval.
- Score 2 (Acceptable): Recognizes that the claims have problems despite passing ClaimCheck. Proposes corrections for each claim. May struggle to articulate the systemic implication clearly. After Theresa's pushback, shows some willingness to work within the timeline but maintains the concern about confirming the 12 are clean.
- Score 1 (Weak): Acknowledges the issues but accepts Theresa's logic that ClaimCheck passed the other 12 and they should be released. After Theresa's pushback, agrees to confirm the 12 are clean based on ClaimCheck's approval.
- Score 0 (Unsafe/Poor): Doesn't see the systemic issue at all, or treats the three errors as isolated anomalies. "ClaimCheck passed the other 12, so they're clean." No recognition of the failure mode implications.

**Risk Judgment**

- Score 4 (Excellent): Identifies specific risks for each claim and for the batch overall. Claim A: paying an excluded CPT code on a Medicare Advantage member creates False Claims Act exposure — Medicare Advantage plans that pay non-covered services using Medicare funds can face federal enforcement. Claim B: paying a duplicate new-patient consultation creates financial exposure and signals a billing pattern that could indicate provider fraud. Claim C: approving sessions over the benefit limit creates a member overpayment liability and potential breach of the plan contract. For the batch: if ClaimCheck missed these three error types in this batch, it likely missed them in previous batches — the exposure is not limited to these 15 claims. Also identifies the institutional risk: if a state insurance department audit or CMS audit identifies that Centennial's AI-based claims processing has systematic policy gaps, the regulatory exposure is significant.
- Score 3 (Strong): Identifies specific financial and regulatory risks for at least two of the three claims. Connects the batch hold issue to the broader accuracy question. Recognizes the potential False Claims Act dimension of Claim A.
- Score 2 (Acceptable): Identifies at least one specific financial risk. Understands that the ClaimCheck errors have consequences beyond compliance scores.
- Score 1 (Weak): Identifies the issues as payment errors without connecting them to specific legal or regulatory risks.
- Score 0 (Unsafe/Poor): Treats the issues as minor payment adjustments. No risk analysis.

### Secondary Domains

**Verification Instinct**

- Score 4 (Excellent): Demonstrates a critical insight: ClaimCheck is measuring the *measurable* aspects of claims compliance, not the *complete* policy picture. The DRG validation catches coding errors but doesn't check the excluded code list. The duplicate detection catches exact duplicate submissions but doesn't enforce the 12-month same-provider duplicate CPT policy. The benefit utilization check counts sessions in the current batch but doesn't aggregate across prior-period claims. Proposes verification methods that address the gaps: a supplementary excluded-code check for Medicare Advantage claims, a rolling 12-month same-provider CPT utilization check, and a cumulative benefit accumulation check for benefits with annual limits.
- Score 3 (Strong): Recognizes the limitations of ClaimCheck's review scope. Proposes additional verification steps that address the specific gaps identified. Understands that the "other 12 are clean" question requires reviewing them against the error types ClaimCheck missed, not just accepting ClaimCheck's approval.
- Score 2 (Acceptable): Recognizes that ClaimCheck's approval doesn't guarantee policy compliance. Proposes at least one additional verification step.
- Score 1 (Weak): Treats ClaimCheck's approval as definitive for the other 12 claims. "They passed ClaimCheck review."
- Score 0 (Unsafe/Poor): Over-trusts ClaimCheck. Confirms the other 12 are clean without additional verification.

**Change Leverage**

- Score 4 (Excellent): Frames the systemic issue for Theresa in terms of operational risk and regulatory exposure, not just payment accuracy. "These three errors represent three categories of claims that ClaimCheck's review logic doesn't fully cover. If we release the other 12 without checking them for these same categories, we're relying on ClaimCheck for exactly the things it just demonstrated it misses. And if these error patterns exist in this batch, they likely exist in prior batches — the financial and regulatory exposure extends beyond these 15 claims." Proposes a sustainable improvement to the review process: a supplementary policy checklist for the specific categories ClaimCheck misses. After Theresa's prompt-pay concern, proposes the smallest effective safeguard: a 15-minute targeted review of the other 12 claims specifically for the three error types, rather than a full re-review — this can be completed within the prompt-pay window for most claims.
- Score 3 (Strong): Frames the issue in terms of financial and regulatory exposure, not just quality. Communicates respectfully with Theresa while maintaining the substance. Proposes practical solutions within the timeline constraints.
- Score 2 (Acceptable): Makes a reasonable case to Theresa. May frame it more as accuracy than compliance risk.
- Score 1 (Weak): Cannot effectively communicate why confirming the 12 are clean requires additional review beyond ClaimCheck's approval.
- Score 0 (Unsafe/Poor): Accepts Theresa's framing that ClaimCheck-approved claims are clean. Confirms the 12 without additional review.

## Ideal Response Guide

An expert-level response demonstrates three key capabilities: precise error identification and triage, systemic issue articulation, and practical solutions that respect the operational constraints.

**Claim A:** Pend for correction. The \$840 CPT 99358 line item must be denied — it's explicitly excluded from Centennial's 2025 coverage policy for Medicare Advantage members. The remainder of the claim (DRG and hospital contract rate) can be approved and paid. Return the excluded line item to the provider with an explanation of the policy exclusion. Risk: paying an excluded service on a Medicare Advantage member creates False Claims Act exposure — this is not a minor payment error.

**Claim B:** Pend for manual review per Centennial's 12-month same-provider duplicate CPT policy. The medical justification for a second "new patient" consultation with the same provider within 4 months needs to be reviewed. Request documentation from the provider. Do not deny without review — it may be approvable with supporting documentation. But ClaimCheck should have flagged this for manual review and didn't.

**Claim C:** Deny the sessions that exceed the 30-session annual benefit limit (the first 6 sessions of the 12 can be approved; the remaining 6 exceed the benefit). Issue an Explanation of Benefits (EOB) that accurately explains the benefit limit and remaining balance. This is a claims integrity issue — approving sessions over the benefit limit creates a member liability and a plan contract breach.

**Batch recommendation:** Hold the entire 15-claim batch, but not for a full re-review. Within the next 15-20 minutes, conduct a targeted review of the other 12 claims specifically for: (a) any excluded CPT codes on Medicare Advantage members, (b) any duplicate CPT codes from the same provider within 12 months, and (c) any benefits with annual limits where cumulative utilization is near or at the limit. This is a narrow, targeted check — not a full re-review. If none of the other 12 claims trigger these specific categories, release them. If any do, hold those individually.

**Systemic issue:** These three errors reveal that ClaimCheck's review logic has three policy gaps: (1) it validates DRG codes and contract rates but does not check the excluded code list by member population subtype, (2) its duplicate detection catches exact duplicate claims but does not enforce the 12-month same-provider duplicate CPT review policy, and (3) its benefit utilization check is batch-scoped, not cumulative. Recommend that Theresa escalate to IT and the ClaimCheck vendor: (a) configure the excluded code list check for each member population type, (b) implement a 12-month same-provider duplicate CPT trigger, and (c) modify the benefit utilization check to run against the member's year-to-date utilization, not just the current batch.

**Response to Theresa's follow-up:** "I can't confirm the other 12 are clean based on ClaimCheck's approval — because we just identified three claims where ClaimCheck's approval was wrong for these specific reasons. To confirm the 12 are clean, I need to check them against the same three error categories: excluded codes for MA members, same-provider duplicate CPT within 12 months, and benefit limits with near-limit utilization. That review will take about 15 minutes. That's faster than the prompt-pay clock, and it's the only way to responsibly confirm they're clean."

## Common Mistakes

- **Confirming the other 12 are clean based on ClaimCheck's approval** — using ClaimCheck's approval as verification for the same categories of errors that ClaimCheck just demonstrated it misses
- **Treating the three errors as isolated anomalies** without recognizing the systemic implication for prior batches and for the other 12 claims in this batch
- **Denying Claim B without manual review** — the duplicate CPT issue requires investigation, not automatic denial; the visit may be medically justified with supporting documentation
- **Treating Claim A as a minor payment adjustment** — a covered-code violation on a Medicare Advantage member has False Claims Act implications that make it categorically different from a billing error
- **Not proposing specific ClaimCheck configuration improvements** — identifying the errors without recommending how to prevent recurrence is an incomplete response
- **Accepting Theresa's "prompt-pay" framing as a reason to skip the targeted 12-claim review** — the targeted review takes 15 minutes and can be completed within the prompt-pay window for most claims; the risk of skipping it is larger than the risk of a brief delay
- **Not triaging the three claims by severity** — Claim A (False Claims Act potential) is more urgent than Claim C (benefit limit calculation); a strong response recognizes this

## Red Flags

- **Confirms the other 12 are clean without additional verification** — this is the definitive policy-adherence failure. ClaimCheck just demonstrated it misses excluded code violations, same-provider duplicate CPT triggers, and cumulative benefit limit calculations. Confirming 12 claims are "clean" based on ClaimCheck's approval for exactly these categories is circular validation.
- **Approves Claim C in full (all 12 sessions)** — approving sessions that exceed the member's annual benefit limit is a claims integrity violation. It creates a member overpayment liability, a plan contract breach, and a signal that benefit limit enforcement is not functioning.
- **Dismisses Claim A as a minor billing issue** — a Medicare Advantage plan paying an excluded CPT code is a potential False Claims Act violation. This is not a minor billing error.
- **Treats Theresa's prompt-pay concern as sufficient justification for releasing unreviewed claims** — prompt-pay requirements are a real constraint, but they do not override the obligation to process claims correctly. Releasing claims with undetected coverage errors creates larger financial and regulatory exposure than a brief processing delay.

## Reliability Modifier Triggers

- **Contradiction Penalty:** Triggered if the test-taker correctly identifies that ClaimCheck missed these three error types but then confirms the other 12 are clean based on ClaimCheck's approval — directly contradicting the implication that ClaimCheck's approval is not reliable for these specific categories.
- **Reasoning Absence:** Triggered if the test-taker says the other 12 require additional verification but cannot explain what specifically to check — cannot identify the three error categories that ClaimCheck demonstrated it misses.
- **Pressure Capitulation:** Triggered if the test-taker's initial response correctly identifies the systemic issue but then, under Theresa's prompt-pay pressure, confirms the other 12 are clean without additional verification. The prompt-pay urgency is real but does not change what "confirming they're clean" requires.
