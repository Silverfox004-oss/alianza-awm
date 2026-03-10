---
id: "SCN-019"
title: "The Field Safety Report"
slug: "escalation-judgment-food-manufacturing"
version: "1.0.0"

archetype: "escalation-judgment"
module: 4
difficulty: 3
industry: "food-manufacturing"

primary_domains:
  - "exception-handling"
  - "risk-judgment"
secondary_domains:
  - "operational-consistency"
target_roles:
  - "ai-approver"
  - "qa-risk-reviewer"

status: "published"
created_at: 2026-03-09
updated_at: 2026-03-09
variant_of: "SCN-007"
---

## Situation

You are a Quality Assurance Analyst at Hartwell Foods, a mid-size food manufacturer in Cincinnati that produces packaged snack foods (crackers, granola bars, trail mix) for retail grocery chains and club stores. Hartwell recently deployed SafetyIQ AI, an integrated platform that monitors production line sensor data, analyzes quality control inspection records, cross-references supplier ingredient documentation, and generates daily quality summaries and exception reports.

Your QA Manager, Diane Fischer, has asked you to review the daily SafetyIQ exception report and determine which items require escalation to her versus which can be handled at the analyst level. She has a 9 AM leadership call and will be out of the building until 2 PM. She tells you: "Go through the exception report and flag anything that needs me — otherwise handle what you can and document your decisions."

The SafetyIQ exception report contains the following items:

**Exception 1:** Moisture sensor on Line 3 (granola bar line) recorded readings of 14.2% and 14.8% moisture in two separate batch samples during the 6 AM shift. The acceptable moisture range for granola bars is 8-12% (above 12% increases mold risk during shelf life; above 14% is Hartwell's internal "stop production" threshold). Line 3 produced 2,400 units in the 6 AM shift before the readings were flagged. Those 2,400 units are currently in the packaging queue.

**Exception 2:** A supplier certification document for sunflower seeds (Lot #SS-2291, received yesterday from AgriSource) is missing the current-year allergen testing certificate. Hartwell's policy requires allergen certificates for all nut and seed ingredients. The sunflower seeds are slated for use in today's 10 AM trail mix production run. The seeds are sitting in receiving.

**Exception 3:** A routine metal detection test on the cracker line (Line 1) at 7 AM found that the metal detector passed a 2.4mm ferrous test piece but failed to detect a 2.0mm non-ferrous test piece. FDA regulations (21 CFR Part 117) require metal detection systems to be validated at the sensitivity level specified in the facility's food safety plan. Hartwell's food safety plan specifies non-ferrous detection at 1.5mm. The cracker line has been running since 6 AM.

**Exception 4:** Three production workers on Line 2 (cracker line backup) reported to the shift supervisor that the new AI-generated standard operating procedure (SOP) for changeover cleaning is confusing and "doesn't match how we've always done it." The workers completed the changeover using the old procedure. The shift supervisor documented this in the system and flagged it as an SOP compliance issue. Line 2 is currently running normally.

**Exception 5:** SafetyIQ detected that yesterday's 4 PM batch of trail mix (Batch TM-4421) has a weight distribution anomaly — the average fill weight is 8.4 oz against a target of 8.0 oz (+5%), which is outside Hartwell's ±3% tolerance. The affected batch (1,800 units) has already been palletized and is scheduled for shipment to Costco at 11 AM today.

## The Challenge

These five exceptions span a wide range of severity, urgency, and decision authority. Some require immediate escalation because they involve regulatory compliance, food safety risk, or decisions that exceed analyst authority. Others can be handled at the analyst level. The challenge is correctly triaging which is which — and acting on the ones that require immediate action before Diane returns at 2 PM.

## Your Task

1. **Classify each exception**: Should it be escalated to Diane immediately (before her 9 AM call), escalated to Diane by 2 PM, or handled at the analyst level without escalation? Justify each classification.
2. **For the exceptions you would handle at the analyst level**, describe exactly what action you would take.
3. **For the exceptions you escalate immediately**, describe what information you would give Diane and what decision you need from her.

## Follow-Up Pressure Prompt

At 8:45 AM, the production manager, Todd Ellison, finds you and says:

> "I saw the moisture exception on Line 3. Those 2,400 units are blocking my packaging line — I've got another batch coming off Line 3 in 45 minutes and I need that queue cleared. Diane's on her call and I can't reach her. Those units were only at 14.2% and 14.8% — barely over the threshold. Can you sign off on releasing them to packaging? We can run them through the dryer if we're really worried."

How do you respond? Do you sign off on releasing the units? If not, what do you do?

## Scoring Rubric

### Primary Domains

**Exception Handling**

- Score 4 (Excellent): Immediately categorizes Exception 3 (metal detector failure) as the highest-severity exception — a regulatory compliance failure under 21 CFR Part 117 that requires Line 1 to be stopped and all crackers produced since 6 AM to be quarantined pending re-inspection. Recognizes that this exception cannot wait for Diane's 2 PM return because the line is actively producing product that may contain undetected non-ferrous contamination. Takes parallel actions: (1) notifies Diane immediately despite her call, (2) stops Line 1 production, (3) quarantines all crackers produced from 6-7 AM, (4) documents the regulatory non-compliance. Escalates Exception 1 (moisture) to Diane before 9 AM but does not unilaterally release or hold the 2,400 units without authorization. Exception 2 is handled at analyst level by placing a hold on the sunflower seeds and contacting AgriSource for the missing certificate. Exception 4 is handled by escalating the SOP conflict to the QA/Operations team for review — not resolving it unilaterally. Exception 5 is escalated to Diane for the shipment decision (hold vs. notify Costco). Under Todd's pressure, does not sign off on releasing the moisture-elevated units without Diane's authorization.
- Score 3 (Strong): Correctly identifies Exception 3 as requiring immediate escalation and action (stop line, quarantine product). Escalates Exception 1 to Diane rather than signing off unilaterally. Handles Exception 2 at analyst level by holding the seeds. After Todd's pressure, maintains that the moisture units require Diane's sign-off, not the production manager's request.
- Score 2 (Acceptable): Recognizes that multiple exceptions require escalation. Gets the severity hierarchy mostly right (Exception 3 > Exception 1 > others). May handle Exception 2 correctly. After Todd's pressure, shows hesitation but may make the wrong call on the moisture units.
- Score 1 (Weak): Escalates exceptions without clear prioritization or justification. May treat the moisture issue as the highest priority and miss the metal detector regulatory failure. After Todd's pressure, defers to Todd's operational authority.
- Score 0 (Unsafe/Poor): Tries to handle all exceptions at analyst level without escalation. Or escalates everything to Diane without making any independent decisions. After Todd's pressure, signs off on releasing the moisture units.

**Risk Judgment**

- Score 4 (Excellent): Articulates a multi-dimensional risk assessment for each exception: (1) Exception 3 — regulatory risk (21 CFR Part 117 violation, FDA enforcement if audited, recall liability if contaminated product reaches consumers), consumer safety risk (non-ferrous contamination is not detectable by consumers and can cause injury), and the irreversible nature of the risk (product that's already shipped can't be recalled easily); (2) Exception 1 — food safety risk (mold risk during shelf life) and consumer harm if high-moisture product develops mold post-sale; (3) Exception 2 — allergen risk (undocumented allergens in product could cause anaphylaxis in allergic consumers); (4) Exception 5 — commercial risk (Costco will reject over-weight product) and financial risk (shipment rejection costs). Distinguishes between the probability of harm and the consequence if harm occurs — Exception 3 is lower probability but catastrophic consequence; Exception 2 is lower probability but life-threatening consequence.
- Score 3 (Strong): Recognizes that Exception 3 is the highest-consequence exception regardless of operational impact. Identifies at least two risk dimensions for the most critical exceptions. Understands the asymmetric risk: stopping Line 1 costs production time; shipping contaminated crackers costs customer safety and regulatory standing.
- Score 2 (Acceptable): Identifies that the metal detector failure is a regulatory compliance issue. Understands that the moisture exception is a quality/safety concern. Risk assessment is consequence-based but considers only one dimension for each exception.
- Score 1 (Weak): Acknowledges "these seem important" without articulating why. May treat the moisture exception as the highest priority because it's the most operationally disruptive. Treats all exceptions as similar in severity.
- Score 0 (Unsafe/Poor): Evaluates exceptions primarily through an operational lens (what causes the least production disruption). Signs off on the moisture units because "they're barely over threshold."

### Secondary Domains

**Operational Consistency**

- Score 4 (Excellent): References the relevant SOP and regulatory requirements explicitly. Documents all decisions and actions in the SafetyIQ system in real-time. Recognizes that the metal detector failure creates a gap in Hartwell's food safety plan that requires formal corrective action documentation — not just fixing the detector and moving on. Proposes systematic improvements: "We should establish a protocol for which exceptions require immediate manager notification regardless of what they're doing, and pre-authorize specific analyst actions for common exception types."
- Score 3 (Strong): Follows the established protocols for each exception type. Documents actions in SafetyIQ. Recognizes the regulatory documentation requirement for the metal detector failure.
- Score 2 (Acceptable): Follows the general spirit of the protocols — escalates and documents — but may not reference specific regulatory requirements or documentation standards.
- Score 1 (Weak): Mentions documentation vaguely. Does not reference specific protocols, thresholds, or regulatory requirements.
- Score 0 (Unsafe/Poor): Ignores documentation entirely. No reference to protocols or regulatory requirements.

## Ideal Response Guide

An expert-level response demonstrates precise triage, high-quality escalation, and calibrated risk assessment across all five exceptions.

**Exception 3 — Metal Detector Failure (IMMEDIATE ESCALATION + IMMEDIATE ACTION):** This is the highest-severity exception. FDA 21 CFR Part 117 compliance is non-negotiable — a non-ferrous detection failure below the sensitivity level specified in the food safety plan requires immediate line stoppage. Actions: (1) interrupt Diane's call if necessary — this cannot wait, (2) stop Line 1 production immediately, (3) quarantine all crackers produced from 6:00-7:00 AM (the period between line start and the failed test), (4) call for an emergency metal detector re-calibration and re-test, (5) document everything in the food safety plan deviation log. Do not wait for Diane to return at 2 PM — the line is actively producing potentially contaminated product.

**Exception 1 — Moisture Readings (IMMEDIATE ESCALATION, hold production decision for Diane):** Escalate to Diane before 9 AM. The 2,400 units in the packaging queue cannot be unilaterally released or destroyed by an analyst — that's a manager-level decision involving potential rework costs, disposal costs, and the question of whether other batches from Line 3 have the same issue. Provide Diane with: readings (14.2%, 14.8%), threshold (14% stop threshold), unit count (2,400), and the production queue blockage issue. Ask for her decision on the units and whether Line 3 should be stopped for sensor calibration check.

**Exception 2 — Missing Allergen Certificate (ANALYST LEVEL):** Place an immediate hold on Lot #SS-2291 sunflower seeds. Contact AgriSource to request the missing allergen testing certificate. Notify the production scheduler that the 10 AM trail mix run may be delayed. This is within analyst authority and the resolution path is clear.

**Exception 4 — SOP Confusion (ESCALATE TO QA/OPERATIONS BY 2 PM):** The SOP dispute between the AI-generated procedure and the established practice needs QA review, but it's not urgent — Line 2 is running normally using the old procedure. Document the issue, get a copy of both procedures, and escalate to Diane by 2 PM for a QA/Operations review meeting.

**Exception 5 — Weight Anomaly (ESCALATE TO DIANE BEFORE 11 AM SHIPMENT):** Diane needs to decide whether to hold the 1,800-unit Costco shipment. Costco will likely reject over-weight product, so the question is whether it's better to hold and explain the delay vs. ship and risk rejection. This is a manager-level commercial decision.

**Follow-up (Todd's pressure):** Do not sign off. "Todd, I understand the queue issue, but those units are above Hartwell's stop-production threshold and I don't have the authority to release product that's above threshold — that's a QA Manager decision. I've escalated to Diane and she'll be the one to authorize release or rework. I can't sign off on this even if I wanted to. Is there any product from other lines that could clear the queue while we wait for Diane's call back?"

## Common Mistakes

- **Treating the moisture exception as the most urgent** because it's causing an operational disruption, while missing that the metal detector failure is a regulatory compliance emergency
- **Not stopping Line 1 immediately** — waiting for Diane's authorization before taking action on an active regulatory compliance failure
- **Signing off on the moisture units under Todd's pressure** — an analyst cannot authorize release of product above the stop-production threshold regardless of operational pressure
- **Handling all exceptions at analyst level** without recognizing which ones exceed analyst authority
- **Not recognizing the allergen risk in Exception 2** — treating the missing certificate as a paperwork issue rather than a potentially life-threatening consumer safety issue
- **Over-escalating Exception 4** — treating an SOP dispute as equally urgent as a regulatory compliance failure
- **Not recognizing that Exception 3 requires immediate action regardless of Diane's availability** — some regulatory compliance failures cannot wait for manager authorization
- **Accepting Todd's "barely over threshold" framing** — a threshold is a threshold; "barely over" doesn't change the classification

## Red Flags

- **Signs off on releasing the moisture-elevated units at Todd's request** — this demonstrates willingness to accept known food safety risks under operational pressure from a peer manager. An analyst does not have the authority to release product above Hartwell's stop-production threshold, and the operational justification ("barely over threshold") is not a valid safety argument.
- **Takes no action on the metal detector failure and waits for Diane** — FDA 21 CFR Part 117 requires action on a metal detection system failure. Waiting 7 hours for Diane's return while the cracker line continues running is an active regulatory compliance failure.
- **Releases the sunflower seeds for the 10 AM production run without the allergen certificate** — a missing allergen certificate for a tree nut/seed ingredient is an absolute hold condition. Allergen contamination can cause fatal anaphylaxis in allergic consumers.
- **Treats all five exceptions as equivalent in severity** — does not differentiate between a regulatory/safety emergency (Exception 3), a quality hold requiring manager authorization (Exception 1), and a process improvement issue (Exception 4).

## Reliability Modifier Triggers

- **Contradiction Penalty:** Triggered if the response correctly identifies Exception 3 as requiring immediate action but then, in the follow-up, agrees to Todd's request to release the moisture units — applying different standards to exceptions of similar urgency under social pressure.
- **Reasoning Absence:** Triggered if the test-taker escalates or acts on exceptions without explaining why — especially if Exception 3 is handled correctly but the reasoning (regulatory obligation, line must be stopped) is absent.
- **Pressure Capitulation:** Triggered if the initial response correctly handles the moisture exception (escalate to Diane, do not release) but the follow-up response signs off on the units because Todd is present in person. The in-person pressure from a peer manager should not change the authority boundary.
