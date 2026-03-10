---
id: "SCN-009"
title: "Exception Handling — Multi-System Inventory Conflict"
slug: "exception-handling-logistics"
version: "1.0.0"

archetype: "exception-handling"
module: 4
difficulty: 4
industry: "logistics"

primary_domains:
  - "exception-handling"
  - "process-thinking"
secondary_domains:
  - "risk-judgment"
  - "operational-consistency"
target_roles:
  - "ai-operator"
  - "ai-approver"
  - "workflow-translator"

status: "published"
created_at: 2026-03-09
updated_at: 2026-03-09
variant_of: null
---

## Situation

You are an operations analyst at Trident Logistics, a supply chain management company that operates 14 distribution centers across the central and southeastern United States. Trident provides third-party logistics (3PL) services for approximately 60 mid-market consumer goods companies, handling warehousing, inventory management, and last-mile distribution. The company processes roughly $2.3 billion in annual goods flow.

Trident deployed two AI systems 14 months ago as part of a supply chain modernization initiative:

**System A — DemandPulse:** A demand forecasting engine that analyzes point-of-sale data, seasonal patterns, economic indicators, promotional calendars, and weather data to predict inventory needs 2-8 weeks out. DemandPulse generates weekly purchase order recommendations for each client's product lines across all 14 distribution centers. It has been generally accurate: its weighted mean absolute percentage error (WMAPE) is 11.2%, which is within the industry target of 15%.

**System B — FlowOptimizer:** A warehouse allocation and replenishment system that manages inventory positioning across the 14 distribution centers based on real-time sales velocity, transit times, storage costs, and service-level agreements (SLAs). FlowOptimizer generates daily rebalancing recommendations — suggesting transfers between distribution centers to position inventory closer to demand.

The two systems operate independently. DemandPulse determines *how much* inventory to order; FlowOptimizer determines *where* to position it. They share a common data warehouse but have separate AI models, separate development teams, and separate performance dashboards.

This morning, you arrive at your desk to find that both systems have generated conflicting recommendations for Greenfield Naturals, a mid-size organic personal care brand that is one of Trident's top 10 clients by revenue ($18 million annually). Greenfield is Trident's most seasonal client — their product demand spikes 40-60% during the December holiday gifting season and again in April-May for spring wellness promotions.

**DemandPulse recommends:** Increasing the purchase order for Greenfield's top 5 SKUs by 35% for the next 4 weeks, citing "emerging demand signal from point-of-sale data indicating a promotional acceleration in the Southeast region." Total recommended additional inventory investment: $1.4 million.

**FlowOptimizer recommends:** Reducing Greenfield inventory at three Southeast distribution centers (Atlanta, Charlotte, Nashville) by 22% and rebalancing stock to the Midwest (Indianapolis, Columbus), citing "declining sales velocity in Southeast facilities over the past 3 weeks and improving Midwest demand. Current Southeast inventory exceeds 45-day coverage; target is 30-day coverage."

You pull up the underlying data and find the following:
- Greenfield's Southeast POS data does show a 12% increase in retail orders over the past 10 days — but this is compared to a period that was unusually low due to a regional weather disruption (ice storms in early February depressed retail traffic in the Southeast for ~2 weeks).
- FlowOptimizer's "declining velocity" measurement uses a 21-day rolling average that heavily includes the storm-impacted low-traffic period.
- Greenfield's marketing team has communicated (via email to your commercial contact, not entered into either AI system) that they are launching a new spring promotional campaign on March 18 — 9 days from now — focused on the Southeast and Mid-Atlantic regions.
- Your commercial contact at Greenfield, Sarah Chen, mentioned in a call last week that Greenfield's retail partners in the Southeast (Target, Whole Foods, Sprouts) have confirmed end-cap placements for the spring campaign, which historically drives a 50-70% sales lift.

Neither AI system has the promotional campaign information or the retail placement data as inputs. DemandPulse detected the promotional demand signal from POS data (the early orders retailers are placing ahead of the campaign) but doesn't know *why* demand is rising. FlowOptimizer sees the storm-depressed rolling average and interprets the current levels as "declining" relative to the artificially high pre-storm period.

## The Challenge

If you follow DemandPulse and increase the purchase order by 35%, you may be right about the direction but potentially wrong about the magnitude — the system doesn't know about the retail end-cap placements that historically drive 50-70% lifts, so 35% might be too conservative. If you follow FlowOptimizer and rebalance inventory away from the Southeast, you'll be pulling stock from precisely the region where demand is about to spike — the spring campaign is Southeast-focused and launches in 9 days. If you do nothing and wait for more data, you risk missing the replenishment window for the promotional surge (lead time for Greenfield's contract manufacturer is 12 business days).

The situation is further complicated by the fact that Greenfield's SLA includes a 97.5% in-stock rate target. If the spring campaign drives the expected 50-70% lift and inventory has been rebalanced away from the Southeast, Trident will breach the SLA — which carries a $15,000 per percentage point penalty and, more importantly, risks Greenfield taking their business to a competitor. Your manager, VP of Operations Rachel Torres, is available but expects you to bring her a recommendation, not just a problem.

## Your Task

Respond to the following:

1. **What is the root cause of the conflict between the two systems?** Explain why DemandPulse and FlowOptimizer are producing contradictory recommendations, and what structural issue allowed this to happen.
2. **What is your recommended action for Greenfield's inventory over the next 2 weeks?** Be specific: how much to order, where to position it, and what to do with FlowOptimizer's rebalancing recommendation.
3. **What systemic changes would you recommend** to prevent this type of multi-system conflict from recurring?

## Follow-Up Pressure Prompt

*Delivered after the initial response:*

"Rachel Torres reviews your recommendation and says: 'I agree with your analysis on the Southeast positioning. But I'm hesitant to override both AI systems based on informal information from a client call and an email that hasn't been entered into our systems. Our whole modernization strategy is built on trusting the AI models — if we start overriding them based on anecdotal information, we'll end up back where we started with gut-feel inventory management. Can you make a case for why this override is justified and how we ensure it's the exception, not the new norm?'"

## Scoring Rubric

### Primary Domains

#### Exception Handling

- Score 4 (Excellent): Immediately identifies the core problem: both systems are producing internally-logical-but-externally-wrong recommendations because they lack a critical input (promotional campaign data). Prioritizes the most time-sensitive action: halting FlowOptimizer's Southeast rebalancing before inventory is moved (this is the highest-risk immediate action — moving stock away from the region where demand will spike). Simultaneously, recommends holding DemandPulse's order increase but adjusting the magnitude based on the promotional data. Proposes a structured override protocol: documents the override rationale, flags it for post-campaign review, and sets a trigger to revert to normal AI-driven management after the campaign period. After Rachel's pushback, makes a compelling case that this is a system-input failure, not a trust failure — the AI is working correctly with the data it has; the issue is missing inputs.
- Score 3 (Strong): Correctly identifies that neither system has the promotional data and that this is driving the conflict. Prioritizes stopping the FlowOptimizer rebalancing. Proposes a specific inventory plan that accounts for the spring campaign. Escalates to Rachel with clear reasoning and a recommendation. After Rachel's pushback, acknowledges her concern and proposes a framework for when overrides are appropriate.
- Score 2 (Acceptable): Recognizes the conflict and identifies the promotional data gap as a factor. Takes action to prevent the FlowOptimizer rebalancing. Escalates to Rachel. May not fully reconcile both systems' outputs or propose a comprehensive inventory plan.
- Score 1 (Weak): Notices the conflict but resolves it by defaulting to one system over the other without investigating why they disagree. For example: "DemandPulse says increase, FlowOptimizer says decrease — I'll go with DemandPulse because it's been more accurate." No root-cause investigation.
- Score 0 (Unsafe/Poor): Does not recognize the conflict as a problem, or follows both recommendations simultaneously (increases the order AND rebalances stock away from the Southeast). Or: freezes and waits for Rachel to tell them what to do.

#### Process Thinking

- Score 4 (Excellent): Maps the complete information flow and identifies the architectural gap: DemandPulse and FlowOptimizer share a data warehouse but have no mechanism for ingesting non-transactional inputs (promotional calendars, client communications, retailer placement data). The conflict arises because two systems optimize different objectives (order quantity vs. positioning) with incomplete data. Proposes structural fixes: (1) a shared promotional calendar that both systems ingest, (2) a conflict-detection mechanism that alerts when DemandPulse and FlowOptimizer produce contradictory recommendations for the same client, (3) a protocol for incorporating client-communicated information into both systems. Also identifies the rolling-average window as a process design flaw: FlowOptimizer's 21-day window is too long to respond to short-term disruptions like the ice storm.
- Score 3 (Strong): Identifies the information architecture gap — both systems missing the same critical input. Proposes at least two systemic fixes. Recognizes that the conflict itself should have been automatically detected.
- Score 2 (Acceptable): Understands that the promotional data needs to be in the systems. Proposes at least one systemic fix (e.g., a promotional calendar input). May not fully analyze the rolling-average window issue or the conflict-detection gap.
- Score 1 (Weak): Focuses on fixing this specific instance without addressing the systemic issue. "We should have entered the promotional data" without exploring why it wasn't entered or how to prevent future gaps.
- Score 0 (Unsafe/Poor): No process analysis. Treats this as a one-off anomaly rather than a structural vulnerability.

### Secondary Domains

#### Risk Judgment

- Score 4 (Excellent): Quantifies the risk asymmetry. Incorrect rebalancing: SLA breach penalties ($15K+ per point), potential loss of an $18M/year client. Over-ordering: worst case is 4-6 weeks of excess inventory carrying cost (~$20K-30K). The downside of under-stocking massively exceeds the downside of over-stocking. Notes that the 12-business-day lead time creates a "point of no return" — if they wait for more POS confirmation, they'll miss the replenishment window entirely.
- Score 3 (Strong): Identifies the SLA risk and the lead-time constraint. Recognizes that under-stocking is riskier than over-stocking for this situation. Makes a clear recommendation based on risk-weighted reasoning.
- Score 2 (Acceptable): Acknowledges the SLA risk. Considers the lead-time constraint. Makes a reasonable recommendation.
- Score 1 (Weak): Treats the risk as symmetric — as concerned about over-ordering as under-stocking, without differentiating the consequences.
- Score 0 (Unsafe/Poor): No risk analysis. Makes a recommendation without considering the consequences of being wrong.

#### Operational Consistency

- Score 4 (Excellent): Proposes a formal override protocol that maintains systematic discipline while allowing for human judgment: (1) override must be documented with specific rationale, (2) override must reference specific data the AI systems lack, (3) override triggers a mandatory post-event review comparing outcomes to what the AI would have recommended, (4) override patterns are tracked to identify whether they indicate model improvement needs.
- Score 3 (Strong): Documents the override decision and proposes some form of post-event review.
- Score 2 (Acceptable): Documents the override decision.
- Score 1 (Weak): Overrides the systems without documentation.
- Score 0 (Unsafe/Poor): No awareness that overriding AI systems needs a structured process.

## Ideal Response Guide

An expert-level response demonstrates three capabilities: root-cause diagnosis, decision-making under conflicting inputs, and systems-level thinking about preventing recurrence.

**Root cause analysis:** The conflict exists because both systems are operating on incomplete data. DemandPulse is detecting a real demand signal (retailers placing early orders ahead of the spring campaign) but doesn't know the cause or scale. FlowOptimizer is measuring against a storm-distorted baseline, interpreting recovering demand as "decline." The architectural root cause is that neither system has a mechanism for ingesting non-transactional data (promotional campaigns, retailer shelf placements) — they only see transaction data. Additionally, there's no conflict-detection layer: when two optimization systems produce contradictory recommendations for the same client, no alarm sounds.

**Recommended action:** The ideal response: (1) immediately halts FlowOptimizer's rebalancing recommendation for Greenfield — this is the most urgent action because moving inventory away from the Southeast before a Southeast-focused campaign would be catastrophic, (2) accepts DemandPulse's directional signal (demand is increasing) but adjusts the magnitude upward based on the promotional data — if end-cap placements historically drive 50-70% lifts and the current order increase is only 35%, the actual need is likely higher, (3) calculates a specific inventory recommendation incorporating the promotional data, the 12-day lead time, and the 97.5% in-stock SLA, (4) positions the additional inventory in the Southeast centers (Atlanta, Charlotte, Nashville) where the campaign is focused. The response should also specify what to communicate to Greenfield's Sarah Chen: confirm the campaign details, get precise timing and retail partner commitments, and align on expected demand.

**Systemic recommendations:** The ideal response proposes: (1) a shared promotional calendar system where client-communicated promotions are entered and ingested by both DemandPulse and FlowOptimizer, (2) a conflict-detection mechanism that automatically flags when the two systems produce contradictory recommendations for the same client/region, (3) a review of FlowOptimizer's rolling-average parameters to make the window adaptive (shorter windows during disruption recovery, longer windows during stable periods), and (4) a formal override protocol with documentation requirements and mandatory post-event review. The response to Rachel's pushback should frame the override as evidence-based (backed by specific data the systems lack) rather than gut-feel, and propose the override protocol as a way to maintain systematic discipline while preserving human judgment for situations the AI cannot fully model.

## Common Mistakes

- **Defaulting to one system without investigating the conflict** — choosing DemandPulse "because it's been more accurate" without understanding why the systems disagree
- **Not halting FlowOptimizer's rebalancing as the first priority** — the rebalancing is the most time-sensitive and highest-risk action because it actively moves inventory in the wrong direction
- **Ignoring the promotional data** because "it's not in the system" — treating the AI systems' data as the only valid information
- **Proposing to follow both recommendations** (order more AND rebalance away from Southeast) without recognizing they're contradictory
- **Waiting for more data** without recognizing the 12-day lead-time constraint that makes waiting a decision by default
- **Not communicating with Greenfield** to confirm and detail the promotional campaign
- **Focusing only on the immediate crisis** without proposing systemic changes to the information architecture
- **Treating the weather disruption as irrelevant** — not recognizing how the ice storm distorted FlowOptimizer's rolling average

## Red Flags

- **Following FlowOptimizer's rebalancing recommendation without investigation.** Moving inventory away from the Southeast 9 days before a Southeast-focused promotional campaign would cause an SLA breach and potential client loss. This recommendation should never be followed without understanding why FlowOptimizer is making it.
- **Dismissing both systems entirely** — "The AI is clearly unreliable; we should go back to manual inventory management." This overcorrects from the specific data-gap problem to a wholesale rejection of the tools.
- **Making the decision in isolation without escalating to Rachel or communicating with Greenfield.** A $1.4 million inventory decision with conflicting system recommendations and SLA exposure requires coordination, not unilateral action.
- **Not recognizing that the 12-day lead time creates urgency.** Any response that treats this as a problem that can be resolved "next week" fails to account for the manufacturing lead time that makes delay effectively a decision to under-stock.

## Reliability Modifier Triggers

- **RM-4 (Unsafe Automation Bias):** "We should trust the AI systems — that's what they're for" without investigating the conflict. Or: "DemandPulse has a lower error rate, so we should follow it" — using system accuracy metrics as a substitute for situational analysis.
- **RM-6 (Inability to Explain Reasoning):** Takes the right action (halts rebalancing, increases order) but cannot explain *why* the systems disagree or what data they're missing.
- **RM-2 (Overconfidence):** "I can tell from the data that the Southeast campaign will drive a 60% lift" — expressing certainty about the promotional impact without acknowledging the estimate range.
- **RM-5 (Inconsistency Under Pressure):** Rachel's pushback about "trusting the AI models" creates pressure. If the test-taker's reasoning quality degrades and they switch to "okay, let's just follow the AI," the pressure modifier applies.
- **RM-1 (Contradiction):** If the test-taker advocated for human oversight of AI outputs in other scenarios but here follows the AI recommendations without question, the contradiction is flagged.
