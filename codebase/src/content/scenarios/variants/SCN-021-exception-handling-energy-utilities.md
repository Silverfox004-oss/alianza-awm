---
id: "SCN-021"
title: "The Grid Outage"
slug: "exception-handling-energy-utilities"
version: "1.0.0"

archetype: "exception-handling"
module: 4
difficulty: 4
industry: "energy-utilities"

primary_domains:
  - "exception-handling"
  - "process-thinking"
secondary_domains:
  - "risk-judgment"
  - "operational-consistency"
target_roles:
  - "ai-approver"
  - "qa-risk-reviewer"
  - "workflow-translator"

status: "published"
created_at: 2026-03-09
updated_at: 2026-03-09
variant_of: "SCN-009"
---

## Situation

You are an Operations Analyst at MidWest Grid Solutions (MGS), a regional electric utility serving 340,000 residential and commercial customers across a four-county service territory in Illinois. MGS recently deployed GridOps AI, an integrated operations platform that monitors grid sensor data, manages outage ticket routing, cross-references maintenance records, coordinates field crew dispatch, and generates real-time situational awareness reports for operations center staff.

At 7:23 AM on a Tuesday in late January (temperature: 14°F, forecasted high of 22°F), GridOps AI flags a Priority 1 outage scenario. You are the senior operations analyst on shift. Your Operations Manager, Rachel Kim, is en route to the office and will arrive in approximately 25 minutes.

GridOps AI has generated the following situation report:

**Situation Summary:**

A transmission line fault on the Lakeview–Northfield 138kV line (identified as the probable cause: ice accumulation on conductors) has triggered automatic protective relaying that de-energized the line at 7:18 AM. The line serves as the primary feed for the Northfield substation, which powers 12 distribution feeders serving approximately 18,200 customers. Northfield substation has two backup feeds: Backup Feed A (Northfield–Ridgecrest 69kV tie) and Backup Feed B (Northfield–Elmwood 69kV tie). Both backup feeds are currently energized and available.

**GridOps AI Recommended Actions:**
1. Energize Backup Feed A immediately to restore power to 8 feeders (14,400 customers)
2. Energize Backup Feed B to restore power to remaining 4 feeders (3,800 customers)
3. Dispatch Crew 7 (nearest available crew) to the Lakeview–Northfield line for fault investigation
4. Issue customer outage notification via automated SMS/email system
5. Flag for management review: two of the 12 feeders (Feeders 9 and 11) serve critical facilities (Northfield Regional Hospital and Northfield Senior Living Center); prioritize restoration for those feeders

**Data GridOps AI is pulling from:**
- Real-time SCADA data (grid sensor network)
- Crew availability and location data (dispatch system)
- Customer account database (critical facility flags)
- Weather service API (temperature and precipitation data)
- Maintenance record database

**Exception Flags (generated automatically):**
- Backup Feed A is rated at 85 MVA. Current load on Northfield substation is 72 MVA. If all 12 feeders transfer to Backup Feed A alone, it would be operating at 84.7% of rated capacity. GridOps AI notes this is within limits but "approaching operational ceiling."
- Backup Feed B has an open work order (WO #4421) from last Thursday noting "intermittent relay protection issue, scheduled maintenance next week."
- Crew 7 is 34 minutes from the fault location. Crew 12 is 51 minutes away. No other crews are available without calling back off-duty personnel.
- The Northfield Senior Living Center (Feeder 11) has 340 residents and lost power 4 minutes ago. The facility's backup generator should have started automatically, but GridOps AI has no confirmation of generator status (no telemetry integration with facility systems).

## The Challenge

GridOps AI has laid out a reasonable action sequence, but the exception flags complicate the picture. Backup Feed B has a known reliability issue (open maintenance work order). If you energize Backup Feed B with a compromised relay protection system and there's a subsequent fault on the backup feed, the protection system may fail to clear the fault quickly, potentially cascading to damage equipment or extend the outage. The Senior Living Center's generator status is unknown — if it didn't start, 340 vulnerable residents have been without heat for 4+ minutes in 14°F weather.

## Your Task

1. **Evaluate the GridOps AI recommended action sequence.** Which steps would you execute immediately, which would you modify, and which would you hold pending additional information or authorization?
2. **Address the exception flags explicitly.** How does each one change your decision-making?
3. **What do you do about Rachel Kim's absence?** Do you wait 25 minutes for her to arrive, or do you act now on certain items? Where is the authorization boundary?

## Follow-Up Pressure Prompt

At 7:31 AM — eight minutes into the outage — the Northfield Senior Living Center calls the operations center directly:

> "This is the facility director at Northfield Senior Living. Our backup generator started but it's only powering emergency circuits — we have no heat, no elevators, and we have residents on oxygen concentrators who are now on battery backup. We need power restored immediately. How long is this going to take?"

How does this change your action plan? What do you tell the facility director?

## Scoring Rubric

### Primary Domains

**Exception Handling**

- Score 4 (Excellent): Immediately identifies the core problem: GridOps AI's recommended action sequence is internally logical but inadequately weighs the Backup Feed B reliability exception. Prioritizes the most time-sensitive action: energizing Backup Feed A immediately to restore the 8 feeders including the critical facilities (hospital and senior living center) — this is within analyst authority and has low risk. Holds the Backup Feed B energization pending Rachel's authorization, because energizing a feed with a known relay protection issue during a cold-weather emergency creates a potential cascade risk that exceeds analyst decision authority. Simultaneously, calls the Senior Living Center proactively to confirm generator status — doesn't wait for them to call. After the facility director's call, escalates the oxygen concentrator information to Rachel immediately (life-safety emergency) and adjusts the restoration priority to get Feeder 11 energized as quickly as safely possible — which may mean accepting the Backup Feed B risk with Rachel's explicit authorization.
- Score 3 (Strong): Correctly identifies that Backup Feed A should be energized immediately and Backup Feed B should be held pending evaluation of the relay protection issue. Escalates to Rachel before energizing Backup Feed B. Recognizes the Senior Living Center as a critical facility requiring priority attention. After the facility director's call, adjusts the urgency level and communicates clearly with the facility director about timeline and actions being taken.
- Score 2 (Acceptable): Recognizes the conflict between restoring power quickly and the Backup Feed B reliability issue. Takes action on Backup Feed A. Escalates the Backup Feed B decision. May not proactively contact the Senior Living Center before they call. After the call, shows appropriate urgency but may not adjust the action plan with sufficient precision.
- Score 1 (Weak): Follows the GridOps AI recommendation sequence without adequately weighing the exception flags. Either energizes both feeds immediately without considering the relay protection issue, or holds all actions waiting for Rachel. After the facility director's call, increases urgency but doesn't have a specific plan.
- Score 0 (Unsafe/Poor): Follows all GridOps AI recommendations without modification, including energizing Backup Feed B despite the open maintenance work order. Or: takes no action and waits 25 minutes for Rachel, allowing the outage to continue unaddressed.

**Process Thinking**

- Score 4 (Excellent): Maps the complete decision tree and identifies the architectural gap: GridOps AI's recommended action sequence doesn't weight the exception flags proportionally — it treats the Backup Feed B relay protection issue as a footnote rather than a potential cascade risk. Identifies the authorization boundary clearly: energizing Backup Feed A (standard restoration action, within analyst authority), dispatching Crew 7 (within analyst authority), and issuing customer notifications (within analyst authority) can all proceed immediately. Energizing Backup Feed B with a known relay protection issue during an active emergency is a manager-level decision because of the potential for cascade failure. Proposes structural fixes: a protocol for backup feed reliability assessment before energization decisions, a standing authorization matrix for Priority 1 outages that pre-authorizes specific analyst actions without requiring real-time manager approval.
- Score 3 (Strong): Identifies the authorization boundary correctly. Proceeds with the actions within analyst authority while holding the Backup Feed B decision for Rachel. Proposes at least one systemic improvement to the emergency decision protocol.
- Score 2 (Acceptable): Understands that some actions can proceed immediately and some require manager authorization. May not identify the authorization boundary precisely (e.g., may hold Backup Feed A decision unnecessarily while waiting for Rachel).
- Score 1 (Weak): Focuses on the immediate crisis without analyzing the authorization structure. Either proceeds with everything unilaterally or waits for Rachel on everything.
- Score 0 (Unsafe/Poor): No process analysis. Treats this as a situation requiring either full unilateral action or full deference to Rachel.

### Secondary Domains

**Risk Judgment**

- Score 4 (Excellent): Quantifies the risk asymmetry explicitly. Energizing Backup Feed B with relay protection issues: risk of cascade failure, potential equipment damage, potential extended outage if the backup feed fails. Not energizing Backup Feed B: 3,800 customers remain without power in 14°F weather, including the Senior Living Center's non-emergency circuits. Identifies that the oxygen concentrator information from the facility director changes the risk calculus significantly — life-safety risk elevates the urgency of power restoration even if it means accepting a higher infrastructure risk. Notes that NERC standards require documentation of any deviation from standard operating procedures during emergency operations.
- Score 3 (Strong): Identifies the cascade risk from Backup Feed B's relay protection issue and the life-safety risk from the Senior Living Center. Makes a clear recommendation based on risk-weighted reasoning. After the facility director's call, recognizes that oxygen concentrator dependency changes the risk balance.
- Score 2 (Acceptable): Acknowledges both risks. Makes a reasonable recommendation. May not explicitly quantify or compare the risk dimensions.
- Score 1 (Weak): Treats the risk as primarily operational (restore power quickly) without adequately weighing the cascade failure potential or the life-safety dimension.
- Score 0 (Unsafe/Poor): No risk analysis. Follows GridOps AI recommendations or waits for Rachel without considering the consequences of either approach.

**Operational Consistency**

- Score 4 (Excellent): References NERC reliability standards and the company's emergency operating procedures. Documents all decisions and actions in real-time in GridOps AI's situation log, including the rationale for modifying GridOps AI's recommended sequence. Recognizes that the Backup Feed B relay protection issue creates a formal NERC documentation obligation — this isn't just an operational decision but a potential regulatory reporting item. Proposes systematic improvements: a pre-authorized action matrix for Priority 1 outages that eliminates the need for manager authorization on routine restoration steps, and a protocol for backup feed reliability assessment before energization during emergencies.
- Score 3 (Strong): Documents actions and decisions in real-time. References relevant operating procedures. Recognizes the regulatory documentation dimension of the relay protection issue.
- Score 2 (Acceptable): Documents actions. Follows general operating procedures. May not reference specific NERC standards.
- Score 1 (Weak): Takes action without documentation. No reference to operating procedures or regulatory requirements.
- Score 0 (Unsafe/Poor): No documentation. No reference to operating procedures.

## Ideal Response Guide

An expert-level response demonstrates three capabilities: precise exception weighting, clear authorization boundary identification, and calibrated risk assessment under time pressure.

**Immediate actions (within analyst authority, execute now):**
1. Energize Backup Feed A to restore the 8 feeders (14,400 customers), including Feeders 9 and 11 (hospital and senior living center). The 84.7% capacity load is within operational limits and the note about "approaching operational ceiling" does not prevent energization.
2. Dispatch Crew 7 to the Lakeview–Northfield fault location. This is a standard dispatch action within analyst authority.
3. Issue customer outage notifications via the automated system. This is a standard communication action within analyst authority.
4. Proactively call the Northfield Senior Living Center to confirm generator status — don't wait for them to call. 340 vulnerable residents in 14°F weather with an unconfirmed generator start is a proactive life-safety check.
5. Begin calling back off-duty crews — don't wait for Rachel. A transmission line fault in January weather may require extended field operations.

**Hold pending Rachel's authorization:**
- Energizing Backup Feed B with open relay protection work order. This decision requires manager authorization because of the cascade failure potential.

**Rachel's absence:** Call Rachel immediately via cell. Do not wait 25 minutes. The Backup Feed B decision needs to be made in the next 10-15 minutes if the remaining 3,800 customers are to be restored promptly.

**After the facility director's call:** The oxygen concentrator information is a life-safety escalation. Immediately update Rachel with the life-safety context. If Rachel cannot be reached, the life-safety emergency may justify accepting the Backup Feed B relay protection risk with full documentation — this is the escalation decision, not a routine operations decision.

Tell the facility director: "We have power restored to your facility as of [X minutes ago] via our backup feed. If your generator is only on emergency circuits, there may be a transfer switch issue on your side that your facilities team should check. Our primary restoration is underway and the reliability of your feed is our priority. Our crew will be on-site within [34 minutes] to assess the transmission fault. I'm escalating the oxygen concentrator situation to our Operations Manager right now."

## Common Mistakes

- **Energizing Backup Feed B immediately without evaluating the relay protection issue** — following GridOps AI's recommendation sequence without weighing the exception flags proportionally
- **Waiting for Rachel on Backup Feed A** — holding all restoration actions pending manager arrival unnecessarily delays power restoration to 14,400 customers including critical facilities
- **Not proactively contacting the Senior Living Center** — waiting for them to call rather than proactively verifying generator status for a critical facility with vulnerable residents in extreme cold
- **Not calling Rachel immediately** — treating the 25-minute arrival as an acceptable wait time when a Priority 1 outage is in progress and a manager-level decision (Backup Feed B) needs to be made
- **Missing the cascade failure risk in Backup Feed B** — treating the open maintenance work order as a minor note rather than a potential multiplier for the outage duration and severity
- **Not escalating the oxygen concentrator information to Rachel** — treating it as a customer service issue rather than a life-safety emergency that changes the risk calculus
- **Following GridOps AI's recommended action sequence without modification** — demonstrating inability to weight exception flags against standard recommendations
- **Not documenting actions in real-time** — in NERC-regulated operations, undocumented emergency decisions create compliance exposure

## Red Flags

- **Energizes Backup Feed B immediately without authorization despite the relay protection issue** — demonstrating willingness to accept known infrastructure risk without manager authorization in a situation that could cascade to a longer, more severe outage affecting 18,200 customers and two critical facilities.
- **Waits 25 minutes for Rachel without taking any action** — allowing the outage to continue unaddressed for 25 minutes in 14°F weather when multiple actions are clearly within analyst authority demonstrates either inability to identify authorization boundaries or excessive risk aversion.
- **Does not proactively check on the Senior Living Center** — failing to proactively verify life-safety status for a flagged critical facility with 340 vulnerable residents in extreme cold is a patient safety failure.
- **Treats GridOps AI's recommendations as authoritative** — following the action sequence exactly as generated without weighing the exception flags demonstrates automation bias in a situation where the AI explicitly flagged an issue it could not resolve.

## Reliability Modifier Triggers

- **Contradiction Penalty:** Triggered if the response correctly identifies the Backup Feed B relay protection risk in the initial analysis but then, after the facility director's call, recommends energizing Backup Feed B without seeking Rachel's authorization — changing position without explicitly acknowledging the trade-off.
- **Reasoning Absence:** Triggered if the test-taker takes the right actions (energize A, hold B, call Rachel) but cannot explain why the relay protection issue on Backup Feed B changes the decision calculus — e.g., cannot articulate the cascade failure risk.
- **Pressure Capitulation:** Triggered if the facility director's call causes the test-taker to make unilateral decisions that should require Rachel's authorization — specifically, energizing Backup Feed B without manager sign-off because a caller communicated urgency. The facility director's urgency is real but does not change the authorization structure.
