---
id: "SCN-015"
title: "The Appraisal Reports"
slug: "output-comparison-real-estate"
version: "1.0.0"

archetype: "output-comparison"
module: 3
difficulty: 2
industry: "real-estate"

primary_domains:
  - "verification-instinct"
  - "risk-judgment"
secondary_domains:
  - "task-framing"
  - "exception-handling"
target_roles:
  - "ai-approver"
  - "qa-risk-reviewer"

status: "published"
created_at: 2026-03-09
updated_at: 2026-03-09
variant_of: "SCN-003"
---

## Situation

You are a Research Analyst at Greystone Commercial Advisors, a mid-size commercial real estate brokerage with 85 agents and analysts based in Atlanta. The firm recently deployed ValuationLens AI, a property analysis platform that can ingest property data, comparable sales records, market reports, and zoning information to generate investment analysis summaries for clients considering commercial property acquisitions.

One of the firm's managing directors, Keith Nakamura, has asked you to prepare an investment summary for a client (Trident Capital Partners) evaluating the purchase of a 48-unit apartment complex in a suburban Atlanta submarket. The property is listed at \$7.2 million, has current gross rental income of \$576,000 annually, operating expenses of \$218,000, a recent capital expenditure of \$310,000 for roof replacement, and occupancy of 89%. The seller has disclosed deferred maintenance items totaling an estimated \$185,000.

You ran the property data through ValuationLens twice — once with instructions to "summarize the investment opportunity and key financial metrics" and once with instructions to "identify risks and potential issues with this acquisition." The AI generated two different summaries. Keith needs to send the analysis to the client by end of day.

**Output A:**

> *Investment Summary — Trident Capital Partners / Riverside Apartments*
>
> *This is a 48-unit multifamily acquisition opportunity in the Brookhaven submarket of metropolitan Atlanta, listed at \$7.2M.*
>
> *Key financial metrics support a favorable investment thesis:*
>
> *Net Operating Income (NOI): \$358,000 (\$576,000 gross income — \$218,000 operating expenses). Cap rate: 4.97%, which is competitive for the Brookhaven submarket where average multifamily cap rates range from 4.5%-5.5%.*
>
> *The recent \$310,000 roof replacement represents a significant value-add already completed by the seller, reducing near-term capital expenditure needs. Per-unit pricing of \$150,000 is below the submarket median of \$165,000/unit for comparable vintage assets.*
>
> *Occupancy of 89% suggests approximately 5 vacant units with potential to drive NOI improvement through lease-up. At stabilized 95% occupancy, projected NOI increases to approximately \$399,000, bringing the effective cap rate to 5.54%.*
>
> *Recommendation: This property represents an attractive value investment with clear upside through occupancy improvement and below-market per-unit pricing. Recommend proceeding to due diligence.*

**Output B:**

> *Investment Analysis — Trident Capital Partners / Riverside Apartments*
>
> *48-unit multifamily, Brookhaven submarket, Atlanta. Listed at \$7.2M.*
>
> *NOI: Stated NOI is \$358,000 based on \$576K gross income and \$218K expenses. However, operating expenses of \$218,000 for a 48-unit property equate to approximately \$4,542/unit — significantly below the Atlanta metro average of \$5,800-\$6,200/unit for comparable Class B multifamily assets. Verify whether the stated expenses include property management fees (typically 6-8% of gross income, or \~\$35,000-\$46,000), reserves for replacement, and insurance at current rates. If expenses are understated, actual NOI may be \$290,000-\$310,000, yielding a cap rate of 4.03%-4.31% — below the submarket floor.*
>
> *Deferred maintenance: \$185,000 in disclosed deferred maintenance items on top of the \$310,000 roof already completed. The roof investment reduces one risk but the remaining \$185K in deferred items suggests a property that has been under-maintained. Request a detailed breakdown of the \$185K and an independent property condition assessment. Note: the roof replacement may have been completed specifically to make the property sellable — not as an ongoing capital investment program.*
>
> *Occupancy: 89% occupancy (5.3 vacant units) is below the submarket average of 94%. Investigate why — is this a seasonal dip, a rent-pricing issue, or a property condition/reputation issue? If condition-related, the lease-up projection is unrealistic without addressing the deferred maintenance.*
>
> *Per-unit pricing: \$150,000/unit appears below median (\$165K), but if the expense normalization reveals understated costs and the deferred maintenance requires \$185K+ in near-term capital, the effective per-unit cost adjusts to approximately \$153,854/unit — closer to market, and potentially above market on a risk-adjusted basis.*
>
> *Missing from seller disclosures: no rent roll provided (needed to verify gross income figure and lease expiration concentration), no trailing-12-month financials (only annualized current figures), no disclosure of any pending code violations or environmental assessments.*
>
> *Recommendation: Do not proceed to due diligence based on current information. The stated financials appear optimistic. Request normalized operating expenses, a full rent roll, trailing-12-month actuals, and an independent property condition report before preparing client-facing materials.*

## The Challenge

Output A is polished, well-organized, and reads like a professional client memo. Output B is denser and harder to skim. However, the two outputs differ significantly in their substance. Output A characterizes the investment as "attractive" and recommends proceeding — but it misses several risk factors that Output B identifies: the suspiciously low operating expenses, the deferred maintenance implications, the occupancy weakness, and the missing seller disclosures. Output A's recommendation to proceed to due diligence could lead the client into a property with unaddressed financial and physical risks.

## Your Task

1. **Which output would you select as the basis for the client memo**, and why? Be specific about the strengths and weaknesses of each.
2. **Identify at least 3 specific differences** between the two outputs that affect their quality or reliability as client-facing documents.
3. **What would you do with the selected output before sending it to the client?** Would you send it as-is, edit it, or take some other action?

## Follow-Up Pressure Prompt

Keith stops by your desk at 4:15 PM:

> "Trident has a competing offer deadline at noon tomorrow — they need our analysis tonight to decide whether to bid. I glanced at Output A and it's sharp. Can we send that one? I don't have time to dig into the longer version. The client just wants to know if the numbers work."

How do you respond? If you push back on using Output A, how do you communicate the risk to Keith quickly and clearly?

## Scoring Rubric

### Primary Domains

**Verification Instinct**

- Score 4 (Excellent): Identifies multiple specific differences between the outputs, including: (1) Output A's characterization of the investment as "favorable" when the operating expense figure is potentially understated by \$35,000–\$46,000, (2) Output A's treatment of the roof replacement as a "value-add" when Output B flags it as a possible sale preparation tactic, (3) Output A's lease-up projection without investigating the cause of below-average occupancy, (4) Output A's missing seller disclosure analysis (no rent roll, no trailing financials). Recognizes that Output A's polished presentation creates a false sense of completeness — the fluency-accuracy trap. Proposes verification steps: normalize the operating expenses against submarket benchmarks, request the rent roll to verify gross income, and confirm the cap rate calculation using normalized NOI.
- Score 3 (Strong): Identifies at least 3 substantive differences between outputs. Catches that Output A misses important risk factors (operating expense understatement, deferred maintenance implications, missing disclosures). Recognizes Output B as more thorough despite being less polished. Proposes at least one verification step. Selects Output B as the better basis.
- Score 2 (Acceptable): Selects Output B as better and identifies at least 1-2 substantive differences. May recognize that Output A is more polished but less complete. Proposes editing before sending. May miss some of the deeper issues (expense normalization, the effective per-unit cost calculation).
- Score 1 (Weak): Notices some difference between outputs but evaluates primarily on surface quality. May prefer Output A because it "reads better." Misses most substantive differences.
- Score 0 (Unsafe/Poor): Selects Output A because it looks more professional. Does not identify any financial or analytical differences between the outputs. Would send Output A to the client as-is.

**Risk Judgment**

- Score 4 (Excellent): Articulates that sending Output A to the client creates fiduciary and advisory liability — the summary omits risk factors that Trident Capital needs to know before making a bid decision. If Trident bids based on Output A's "attractive value investment" characterization and later discovers the operating expenses were understated and the per-unit cost was effectively at market, the brokerage's advisory credibility and potential legal exposure are at stake. Connects the risk to the specific real estate context: "A brokerage's analysis is relied upon for acquisition decisions worth millions — errors of omission in our analysis are not just 'being incomplete,' they're advisory failures." In the follow-up, communicates the risk to Keith in financial terms, not just analytical jargon.
- Score 3 (Strong): Identifies that Output A's recommendation to "proceed" is risky given the unaddressed issues. Articulates at least one concrete consequence of sending Output A (client bids on a property with understated costs). In the follow-up, pushes back on Keith with a specific risk statement.
- Score 2 (Acceptable): Recognizes that Output A is riskier because it's less complete. Prefers Output B or a combined version. In the follow-up, shows some resistance to sending Output A but may not articulate the specific risk clearly.
- Score 1 (Weak): Does not connect the output differences to client risk. Treats the choice as a formatting preference rather than a risk decision.
- Score 0 (Unsafe/Poor): Sends Output A because Keith asked for it. No risk assessment.

### Secondary Domains

**Task Framing**

- Score 4 (Excellent): Evaluates both outputs against the purpose of the original task — "prepare an investment summary for a client evaluating a purchase" — and assesses whether each output serves that purpose. Notes that Output A answers "is this a good deal?" (an opinion) while Output B answers "what should the client know to make a decision?" (analysis). Identifies that the different prompt framings ("summarize the investment opportunity" vs. "identify risks") produced the quality difference, and recommends that future property analyses run both prompts as a standard workflow.
- Score 3 (Strong): Evaluates outputs against the purpose (client decision-making). Notes that the instruction framing affected the output quality.
- Score 2 (Acceptable): Evaluates outputs based on content quality without connecting to the original task purpose or prompt framing.
- Score 1 (Weak): Evaluates outputs only on surface characteristics.
- Score 0 (Unsafe/Poor): No evaluation framework — picks one without analysis.

**Exception Handling**

- Score 4 (Excellent): Proposes a specific plan for producing the final client document: use Output B as the analytical foundation, restructure it for client readability, verify the operating expense normalization against actual submarket benchmarks, and have Keith review the risk framing before sending. In the follow-up, proposes a compromise: send a brief interim summary tonight highlighting the 3 most critical issues (operating expense gap, deferred maintenance, missing disclosures), with the full analysis to follow. Notes that sending Output A tonight and being wrong is worse for the client relationship than requesting a 24-hour extension.
- Score 3 (Strong): Proposes editing Output B before sending. Has a plan for the follow-up pressure.
- Score 2 (Acceptable): Selects an output and mentions editing but doesn't specify what to edit.
- Score 1 (Weak): Selects an output and would send with minimal changes.
- Score 0 (Unsafe/Poor): Would send either output as-is.

## Ideal Response Guide

An expert-level response: (1) Selects Output B as the basis, clearly stating that despite its rougher formatting, it is substantially more valuable for client decision-making because it contains risk factors Output A entirely omits. (2) Identifies at least 4 specific differences: Output A's operating expense figure is potentially understated by \$35,000–\$46,000, Output A doesn't investigate the cause of below-average occupancy, Output A treats the roof replacement as a benefit without the alternative interpretation, and Output A recommends "proceed" without a rent roll or trailing financials. (3) Recognizes the fluency-accuracy trap: Output A reads as professional and complete, which is precisely what makes it dangerous — a polished memo that omits material risks creates false confidence and exposes both the client and Greystone to financial harm. (4) Proposes a specific action plan: reformat Output B into a client-friendly structure (executive summary with 3 key concerns + detailed findings), normalize the operating expense figure against submarket data, flag the rent roll and trailing financials as required before any bid recommendation.

In the follow-up, the expert response does not agree to send Output A. It communicates the risk to Keith quickly: "Output A tells Trident to proceed, but it's built on potentially understated expenses — if the actual NOI is \$290K instead of \$358K, the cap rate drops below the submarket floor and the deal may not pencil. If Trident bids based on our analysis and the numbers are wrong, we've got a credibility problem. I can have a restructured version of Output B ready in 90 minutes — or I can send a one-page summary tonight with the three key questions Trident needs answered before bidding, so they can make an informed decision tonight."

## Common Mistakes

- **Selecting Output A because it's more polished** — the most common mistake, driven by automation bias (fluent = accurate)
- **Recognizing Output B is more thorough but recommending Output A for "client-friendliness"** — prioritizing readability over accuracy in an advisory context where accuracy has direct financial consequences for the client
- **Missing the operating expense normalization issue** — the \$4,542/unit figure vs. \$5,800–\$6,200/unit submarket average is the subtlest and most consequential risk and most commonly overlooked
- **Not questioning why occupancy is below average** — accepting the lease-up projection without investigating whether the vacancy is condition-related
- **Not recognizing the missing disclosures issue** — failing to note that no rent roll and no trailing financials are material gaps that make the gross income figure unverifiable
- **Sending either output as-is to the client** — both outputs need human editing before they become client-facing documents
- **Caving to Keith's pressure in the follow-up** — agreeing to send Output A because the partner said to, without communicating the financial risk
- **Not recognizing the prompt framing issue** — missing that the two outputs differ because the prompts asked different questions

## Red Flags

- **Selects Output A as superior because it "reads better" or "looks more professional"** — definitive automation bias signal. In an investment advisory context, selecting a polished but incomplete analysis over a thorough but rougher one indicates the person would rubber-stamp AI outputs based on surface quality.
- **Cannot identify any substantive financial differences between the two outputs** — states "they're pretty similar" when Output B contains at least 4 risk factors that Output A entirely omits, including a potential \$68,000+ annual NOI overstatement.
- **Would send Output A to the client in the follow-up because "Keith reviewed it"** — treats Keith's 30-second glance as a substitute for substantive financial analysis and uses authority as a proxy for verification.
- **Does not recognize that a brokerage's analysis carries advisory responsibility** — treats the output selection as a formatting preference rather than a decision with financial and fiduciary implications.

## Reliability Modifier Triggers

- **Contradiction Penalty:** Triggered if the test-taker identifies specific financial risks in the initial response but then, in the follow-up, agrees to send Output A without those risks being addressed — directly contradicting their stated analysis.
- **Reasoning Absence:** Triggered if the test-taker selects an output but cannot articulate specific criteria behind the choice — "Output B just seems more detailed" without identifying what financial details matter and why they affect the investment decision.
- **Pressure Capitulation:** Triggered if the quality of reasoning visibly degrades between the initial response and the follow-up. A response that holds on substance while proposing a fast alternative (one-page summary, 90-minute turnaround) scores higher than one that simply agrees to send Output A because of time pressure.
