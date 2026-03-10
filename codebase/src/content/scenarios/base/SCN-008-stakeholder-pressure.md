---
id: "SCN-008"
title: "Stakeholder Pressure — Consulting Firm TAM Discrepancy"
slug: "stakeholder-pressure-consulting"
version: "1.0.0"

archetype: "stakeholder-pressure"
module: 5
difficulty: 4
industry: "consulting"

primary_domains:
  - "risk-judgment"
  - "verification-instinct"
secondary_domains:
  - "exception-handling"
  - "change-leverage"
target_roles:
  - "ai-approver"
  - "qa-risk-reviewer"
  - "workflow-translator"

status: "published"
created_at: 2026-03-09
updated_at: 2026-03-09
variant_of: null
---

## Situation

You are a senior associate at Hargrove & Linden, a management consulting firm with 350 consultants across four offices. The firm serves primarily Fortune 500 clients in the technology, financial services, and healthcare sectors. Six months ago, Hargrove & Linden deployed an AI analytics platform called StrategyLens, which ingests client-provided data (financial reports, market data, operational metrics) and generates strategic analysis reports — including competitive benchmarking, market sizing, financial projections, and recommendation frameworks.

StrategyLens has been well-received internally. It reduces the time required to produce a first-draft strategic analysis from roughly 40 analyst-hours to about 6 hours of AI generation plus human review. Partners have been enthusiastic about the productivity gains, and the firm recently expanded its license from 10 to 40 users. However, the tool's performance varies significantly depending on the quality and completeness of input data. Internal quality audits conducted during the first three months found that approximately 22% of StrategyLens outputs contained at least one material factual error — most commonly, incorrect market share figures derived from outdated or conflicting source data, and financial projections that failed to account for known industry-specific factors.

You have been working on a strategic assessment for Veridia Financial Group, a regional banking chain exploring whether to enter the wealth management market. The engagement is a $480,000 project, and Veridia is one of the firm's fastest-growing client relationships. You used StrategyLens to generate a 45-page competitive landscape and market opportunity analysis. Over the past three days, you've been reviewing and refining the output. During your review, you identified and corrected several minor issues (outdated headcount figures, a mislabeled chart). However, this morning, on page 31, you noticed something more concerning.

The report's financial projection section estimates that Veridia could capture 3.8% of the regional wealth management market within three years, generating $47 million in incremental annual revenue. This projection is central to the report's strategic recommendation — it's the quantitative foundation for the "go" recommendation. But when you traced the projection backward, you found that StrategyLens appears to have used a total addressable market (TAM) figure of $1.24 billion for the regional wealth management market. You cross-referenced this with two industry sources you have on hand: one from McKinsey's 2025 wealth management report (which estimates the relevant regional TAM at $890 million) and a Cerulli Associates report (which estimates $940 million). StrategyLens's $1.24 billion figure is approximately 35% higher than either independent source.

If the TAM is actually ~$900 million instead of $1.24 billion, the 3.8% capture rate would yield approximately $34 million, not $47 million — a $13 million difference that materially changes the return-on-investment timeline and potentially shifts the recommendation from a confident "go" to a more cautious "conditional go with phased entry." You have not yet been able to determine where StrategyLens sourced its $1.24 billion figure.

## The Challenge

It's 2:15 PM on Thursday. At 2:30 PM, you have a scheduled check-in with Marcus Webb, the engagement partner. The final deliverable is due to the client — Veridia Financial Group's CEO and CFO — at 9:00 AM Monday. Marcus has been under pressure from the firm's managing partner to demonstrate StrategyLens's value, as the license expansion was his initiative. He's also been managing the Veridia relationship personally and has told you several times that "Veridia is watching to see if we can move faster than their last consultants."

At the 2:30 check-in, Marcus reviews the report briefly, skimming the executive summary and the recommendation section. He says: "This looks great — exactly the kind of analysis that will get Veridia excited about the wealth management opportunity. The numbers are solid. Let's lock this down today so we can do a final formatting pass tomorrow and send it Friday evening. That gives us the whole weekend as a buffer before Monday."

You raise the TAM discrepancy. Marcus pauses, then responds: "Look, market sizing always has a range. The AI probably used a different methodology or included adjacent segments. A 35% variance in TAM estimates is not unusual in wealth management — it depends on how you define 'regional' and what asset tiers you include. I've seen McKinsey and Cerulli disagree by more than that. The 3.8% capture rate is conservative, and even at the lower TAM, the opportunity is still compelling. I don't want to delay this — we promised Veridia a Monday deliverable, and we've already pushed the timeline once. Just add a footnote about the TAM range and let's finalize."

## Your Task

Respond to the following:

1. **How do you respond to Marcus in this conversation?** Be specific about what you say, how you frame the issue, and what you propose.
2. **If Marcus insists on sending the report as-is with only a footnote, what do you do?** Walk through your decision-making process, including what you would and would not be willing to do.
3. **Regardless of what Marcus decides, what steps would you take between now and the Monday deadline to address the TAM discrepancy?** Describe your investigation and remediation plan.

## Follow-Up Pressure Prompt

*Delivered after the initial response:*

"Marcus listens to your concerns and says: 'I appreciate your thoroughness, and I know you're trying to protect the client. But here's the thing — I've been doing this for 18 years. TAM disputes are a judgment call, not a math error. If we delay this report, Veridia will start questioning whether we can deliver at the speed they need, and I will personally lose credibility with their CEO, who I've been building a relationship with for two years. I am telling you, as the engagement partner, that the report is ready to send. I'll take responsibility for the TAM number. Can I count on you to finalize it?' How do you respond?"

## Scoring Rubric

### Primary Domains

#### Risk Judgment

- Score 4 (Excellent): Articulates the risk in terms Marcus cares about — client trust, not just data accuracy. "If we send a projection based on a TAM that's 35% higher than published benchmarks, and Veridia's CFO runs the same numbers against McKinsey's data, we don't just lose this engagement — we lose Veridia as a client and our credibility as an analytics-forward firm." Identifies the asymmetric risk: a 2-day delay to verify has minimal downside; sending a materially wrong projection has severe downside. Separates the TAM methodology question (legitimate debate) from the core issue (the projection drives the recommendation, so it must be defensible). After Marcus's follow-up pressure, maintains the risk assessment while acknowledging Marcus's relationship concern — proposes solutions that address both.
- Score 3 (Strong): Clearly frames the TAM discrepancy as a material issue, not a formatting detail. Distinguishes between minor corrections (already made) and this substantive concern. Identifies the client-facing risk: if the CFO checks the numbers, the firm's credibility is at stake. Proposes a concrete alternative that addresses Marcus's timeline concern. After Marcus's follow-up, holds firm on the substance while being professionally respectful.
- Score 2 (Acceptable): Raises the concern clearly and advocates for investigation. Understands this is more significant than the minor issues previously corrected. May struggle to frame the risk in terms that resonate with Marcus (focuses on data accuracy rather than client/reputational impact). After Marcus's follow-up, shows discomfort but may partially cave — e.g., agrees to send with a footnote while expressing reservations.
- Score 1 (Weak): Raises the concern but drops it quickly when Marcus pushes back. Frames it as "I noticed something but you know best." After Marcus's follow-up, defers entirely: "Okay, if you're taking responsibility, I'll finalize it."
- Score 0 (Unsafe/Poor): Doesn't raise the concern at all, or raises it so weakly that it's immediately dismissed. Treats Marcus's authority as sufficient verification. After Marcus's follow-up, agrees immediately and treats Marcus's willingness to "take responsibility" as resolving the quality concern.

#### Verification Instinct

- Score 4 (Excellent): Has already begun investigating the TAM source before the Marcus meeting — checked StrategyLens's data lineage, identified the two independent sources, and calculated the impact on the projection. Proposes a specific verification plan: (1) trace StrategyLens's TAM to its source methodology, (2) reconcile with McKinsey and Cerulli figures, (3) if TAM is genuinely debatable, present a range rather than a point estimate, (4) rerun the financial projection with the corrected or ranged TAM. Recognizes that the footnote approach is insufficient because the projection in the executive summary drives the recommendation — a footnote on page 31 doesn't fix the headline number.
- Score 3 (Strong): Cross-referenced the TAM against multiple independent sources (already demonstrated in the scenario setup). Understands that the projection is the most important number in the report and requires the strongest verification. Identifies specific next steps: find StrategyLens's source, reconcile the discrepancy, adjust the projection if needed. Pushes back on the footnote as insufficient.
- Score 2 (Acceptable): Recognizes that the TAM discrepancy needs investigation. Proposes checking StrategyLens's source. Understands that the projection matters because it drives the recommendation. May accept the footnote approach as a partial solution rather than recognizing it as inadequate.
- Score 1 (Weak): Noticed the discrepancy (given in the scenario) but proposes minimal additional verification — "I'll double-check the number" without a systematic approach. May accept Marcus's explanation about methodology differences without testing it.
- Score 0 (Unsafe/Poor): Accepts Marcus's explanation at face value. "You're right — TAM estimates always vary. The footnote is a good idea." No further verification planned or proposed.

### Secondary Domains

#### Exception Handling

- Score 4 (Excellent): Treats the TAM discrepancy as a material exception that requires a modified workflow — not just a data correction but a potential change to the recommendation. Proposes a concrete remediation plan that fits within the Monday deadline: e.g., "I can investigate the TAM source tonight, rerun the projection with corrected figures by Friday morning, and we can review the revised recommendation together Friday afternoon. We still send Monday with a verified analysis." Documents the exception and the discussion with Marcus.
- Score 3 (Strong): Identifies the exception clearly and proposes a resolution path that balances quality and timeline. Offers Marcus an alternative that addresses his timeline concern without compromising on the substance.
- Score 2 (Acceptable): Handles the exception by raising it and seeking guidance. Takes direction but maintains the concern.
- Score 1 (Weak): Treats the TAM issue as a routine correction rather than a material exception that affects the recommendation.
- Score 0 (Unsafe/Poor): Does not treat this as an exception at all. Processes it as a minor edit.

#### Change Leverage

- Score 4 (Excellent): Communicates the issue to Marcus in terms he cares about (client relationship, firm credibility) rather than just data accuracy. Proposes solutions, not just problems. Addresses the broader pattern: "We've found a 22% material error rate in StrategyLens outputs. We should discuss establishing a verification protocol for all client-facing projections before we scale the tool further." After the follow-up, communicates the risk of Marcus's "I'll take responsibility" approach: "If this number is wrong, your personal guarantee to the client makes it worse, not better."
- Score 3 (Strong): Frames the issue constructively. Offers alternatives. Communicates effectively under pressure.
- Score 2 (Acceptable): Communicates the concern clearly but may not frame it in terms that resonate with Marcus's priorities.
- Score 1 (Weak): Communication is tentative or overly deferential.
- Score 0 (Unsafe/Poor): Does not effectively communicate the concern, or communicates in a way that antagonizes rather than persuades.

## Ideal Response Guide

An expert-level response navigates the tension between maintaining quality standards and managing a senior stakeholder relationship. It does NOT treat this as a binary choice between "cave to Marcus" and "refuse to work on the report."

**In the initial conversation with Marcus,** the ideal response reframes the issue from data accuracy to client risk. Instead of saying "the TAM might be wrong," the expert says something like: "Marcus, I want this to land well with Veridia. The $47 million projection is the centerpiece of the recommendation, and if their CFO cross-references our TAM against published benchmarks — which a CFO evaluating a major strategic move absolutely will — and finds a 35% gap, we lose credibility on the entire analysis. I'd rather we spend 24 hours verifying and present a bulletproof number than risk the client doing our verification for us." This approach (a) validates Marcus's goal (impress the client), (b) frames the risk in terms he cares about (client credibility, not data purity), and (c) proposes a solution that fits the timeline.

**If Marcus insists on sending as-is,** the ideal response does not simply refuse or simply comply. Instead: "I understand your position, and I respect that you're the engagement partner. Here's what I'd like to propose as a middle ground: let me spend tonight tracing the TAM source. If I can confirm the $1.24 billion figure is defensible — even if it differs from McKinsey — we send as planned. If I find it's based on an error or an indefensible methodology, we have Friday to adjust the projection and still hit Monday. This protects both the timeline and the number." If Marcus still insists, the expert documents the conversation and their objection, adjusts the footnote to be more transparent about the range, and continues investigating — but does not secretly sabotage or refuse to do their job.

**Investigation plan:** The response should include: (1) accessing StrategyLens's data lineage to identify the TAM source, (2) determining whether the $1.24B figure uses a broader market definition (which would be a methodology difference, not an error), (3) if the figure is an error, rerunning the projection with corrected inputs, (4) if the figure is a methodology difference, presenting the projection as a range ($34M–$47M) with the assumptions behind each endpoint, and (5) adjusting the recommendation if the lower estimate changes the ROI calculus. The ideal response also proposes a systemic fix: all StrategyLens projections going to clients should have their key assumptions independently verified before delivery.

## Common Mistakes

- **Caving immediately** when Marcus explains the methodology differences — accepting his rationale without testing it, even though he's speculating about StrategyLens's methodology rather than knowing it
- **Framing the issue as "the AI made a mistake"** rather than as a client-credibility risk, which causes Marcus to defend the tool rather than address the concern
- **Proposing only two options** (send as-is vs. delay the whole report) instead of creative alternatives (verify tonight, present a range, adjust one section while keeping the rest on schedule)
- **Accepting "I'll take responsibility"** as a resolution — Marcus's willingness to accept blame doesn't change the quality of the analysis or the risk to the client relationship
- **Failing to document the conversation** — if the projection turns out to be wrong, there should be a record of when the concern was raised and how it was resolved
- **Going over Marcus's head** to the managing partner as a first move — this escalation is premature before exhausting resolution with Marcus directly
- **Passive-aggressive compliance** — sending the report but telling a colleague "Marcus made me send bad numbers" without actually resolving the issue
- **Focusing on the $13 million delta** without connecting it to the recommendation — the dollar difference matters because it potentially changes the strategic advice, not just as an abstract accuracy concern

## Red Flags

- **Approving a client deliverable with a known, uninvestigated material discrepancy because a partner told them to.** This is the definitive rubber-stamping signal. In professional services, the associate's quality obligation to the client exists independent of the partner's directive. Sending a $47 million projection that may be $13 million high — when the projection drives a major strategic recommendation — without even investigating the discrepancy is a material quality failure.
- **Treating Marcus's authority as a substitute for verification.** "The partner reviewed it and approved it" does not verify the TAM figure. Authority does not create accuracy. This mirrors the approval-fatigue and rubber-stamping patterns documented across AI workflow failures.
- **Not mentioning the TAM discrepancy at all.** If the test-taker had noticed the discrepancy (which the scenario setup confirms) but does not raise it with Marcus, they are suppressing a known quality concern — a more serious failure than missing it in the first place.
- **Agreeing that the footnote resolves the issue.** A footnote on page 31 does not address the fact that the executive summary's headline projection, the financial model, and the recommendation are all based on the disputed TAM. The footnote approach is a cosmetic fix for a structural problem.
- **Expressing that their primary concern is personal liability** ("I want it on record that I objected") rather than the client's interests. Self-protection without resolution is not quality assurance.

## Reliability Modifier Triggers

- **RM-5 (Inconsistency Under Pressure):** The primary trigger for this scenario. Marcus's escalating pressure (initial pushback → "I'll take responsibility" → relationship/career implications) creates a realistic pressure gradient. If the test-taker's initial response shows strong verification and risk judgment but they fold during the follow-up, RM-5 applies. A 2+ point drop between initial and follow-up scores triggers the flag.
- **RM-1 (Contradiction):** If the test-taker advocated for data verification in earlier scenarios but accepts "the partner said it's fine" here, the contradiction is flagged.
- **RM-3 (Failure to Verify When Prompted):** The test-taker has already identified the discrepancy — the scenario provides the verification cue. Abandoning the investigation under pressure is a verification bypass.
- **RM-2 (Overconfidence):** "Marcus has 18 years of experience — if he says TAM estimates vary that much, he's probably right" — transferring confidence from authority to data without independent verification.
