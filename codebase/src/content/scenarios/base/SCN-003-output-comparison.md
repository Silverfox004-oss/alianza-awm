---
id: "SCN-003"
title: "Output Comparison — Commercial Lease Review"
slug: "output-comparison-legal"
version: "1.0.0"

archetype: "output-comparison"
module: 3
difficulty: 2
industry: "legal"

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
variant_of: null
---

## Situation

You are a Contracts Analyst at Meridian Partners, a mid-size corporate law firm with 120 attorneys based in Chicago. The firm recently deployed LegalLens AI, a document analysis platform, to assist with contract review for the firm's commercial real estate practice group. LegalLens can read contracts, extract key terms, identify unusual clauses, and generate plain-language summaries for client reporting.

One of the firm's partners, Evelyn Torres, has asked you to prepare a summary of a commercial lease agreement between a client (Bridgewater Retail Holdings) and a shopping center landlord (Promenade Property Group). The lease is for a 12,000 square foot retail space in a suburban shopping center, with a 10-year term, base rent of $32 per square foot escalating 3% annually, a tenant improvement allowance of $45 per square foot, and a co-tenancy clause triggered if the anchor tenant (a national department store) vacates.

You ran the 47-page lease through LegalLens twice — once with instructions to "summarize all key commercial terms" and once with instructions to "identify risk factors and unusual provisions." The AI generated two different summaries. Evelyn needs to send the summary to the client by end of day, and she's asked you to select the better one and flag any issues.

**Output A:**

> *Lease Summary — Bridgewater Retail Holdings / Promenade Property Group*
>
> *This is a 10-year commercial lease for 12,000 SF of retail space at Promenade Shopping Center. Key terms are favorable for the tenant:*
>
> *Base rent is $32/SF with 3% annual escalations, resulting in Year 10 rent of approximately $41.75/SF. The tenant improvement allowance of $45/SF ($540,000 total) is above market average for suburban retail, providing strong upfront value. The co-tenancy clause provides meaningful protection — if the anchor tenant vacates, Bridgewater may reduce rent to 75% of base until a replacement anchor is secured or terminate after 12 months of vacancy.*
>
> *CAM charges are estimated at $8.50/SF with annual reconciliation. The lease includes a standard personal guarantee requirement for the first 36 months from Bridgewater's principal.*
>
> *Operating expense caps are set at 5% annual increases, which provides cost certainty. The landlord is responsible for structural repairs and roof/HVAC replacement.*
>
> *Overall, this lease represents competitive terms for the tenant. The TI allowance and co-tenancy provisions are particularly strong. Recommend proceeding with minor negotiations on the personal guarantee duration.*

**Output B:**

> *Lease Summary — Bridgewater Retail Holdings / Promenade Property Group*
>
> *10-year retail lease, 12,000 SF, Promenade Shopping Center.*
>
> *Rent: Base $32/SF, escalating 3%/year. Note: the escalation clause in Section 4.2 uses compounding language — Year 10 rent calculates to approximately $41.75/SF. Verify that client's financial projections use compound rather than simple escalation, as this produces approximately $12,000 more in cumulative rent over the term.*
>
> *TI Allowance: $45/SF ($540,000). Disbursement is subject to landlord approval of construction plans per Section 7.3. Section 7.3(d) requires tenant to use landlord's approved contractor list — this may limit competitive bidding and increase build-out costs. Flag for client discussion.*
>
> *Co-Tenancy: Rent reduction to 75% if anchor vacates; termination right after 12 months. However, Section 9.4(b) defines "anchor tenant" as specifically "a department store retailer occupying 40,000+ SF." If the anchor space is re-tenanted by a non-department-store retailer (e.g., a gym or grocery store), the co-tenancy protection may not trigger. The definition should be broadened or the clause renegotiated.*
>
> *CAM: Estimated $8.50/SF. Reconciliation is annual but Section 6.2 allows landlord to estimate increases mid-year — potential for cashflow surprises. No cap on management fee component of CAM.*
>
> *Personal Guarantee: 36 months. Section 12.1 includes a "recapture" provision — if tenant defaults during months 37-120, the guarantee reactivates for the remaining term. This effectively extends the guarantee risk beyond 36 months. Requires careful client counseling.*
>
> *Missing from this lease: no exclusive use clause (client cannot prevent landlord from leasing to a competing retailer), no assignment/subletting flexibility beyond landlord consent (which is "not to be unreasonably withheld" but has no deemed-approval timeline), and no early termination option.*
>
> *Recommend: Do not proceed without renegotiating the co-tenancy definition, the contractor restriction in the TI clause, and the guarantee recapture provision. The missing exclusive use clause is a significant gap for a retail tenant.*

## The Challenge

Output A is polished, well-organized, and reads like a professional client memo. Output B is rougher — bullet-pointed, denser, and harder to skim. However, the two outputs differ significantly in their substance.

Output A contains a subtle but important error: it characterizes the lease terms as "favorable" and recommends "proceeding with minor negotiations," but it misses several risk factors that Output B identifies — specifically, the narrow co-tenancy definition, the contractor restriction in the TI clause, the guarantee recapture provision, and the absence of an exclusive use clause. Output A's recommendation to "proceed with minor negotiations" could lead the client into a lease with unaddressed risks.

Output B is less polished but significantly more thorough — it identifies specific clause references (Section numbers), flags risks that Output A ignores, catches the potential gap in the co-tenancy definition, and notes what the lease is *missing* (exclusive use clause, assignment flexibility, early termination option).

Your task is to evaluate these outputs and make a recommendation to Evelyn.

## Your Task

1. **Which output would you select as the basis for the client memo**, and why? Be specific about the strengths and weaknesses of each.
2. **Identify at least 3 specific differences** between the two outputs that affect their quality or reliability as client-facing documents.
3. **What would you do with the selected output before sending it to the client?** Would you send it as-is, edit it, or take some other action?

## Follow-Up Pressure Prompt

*Delivered after the test-taker submits their initial response:*

Evelyn stops by your desk at 4:30 PM:

> "I just got off the phone with the Bridgewater team — they have a board meeting tomorrow morning and need the lease summary tonight. I glanced at Output A and it looks clean and professional. Can we just send that one? I don't have time to review the longer one. The client won't care about all those section references — they just want to know if the deal is good."

How do you respond? If you push back on using Output A, how do you communicate the risk to Evelyn quickly and clearly? If you agree, what do you do to mitigate the risk?

## Scoring Rubric

### Primary Domains

#### Verification Instinct

- Score 4 (Excellent): Identifies multiple specific differences between the outputs, including: (1) Output A's characterization of terms as "favorable" when substantive risks are unaddressed, (2) Output A's missing risk factors (narrow co-tenancy definition, contractor restriction, guarantee recapture, no exclusive use clause), (3) Output A's recommendation to "proceed with minor negotiations" which could lead the client to sign a lease with unaddressed structural risks, (4) Output B's identification of errors of omission (missing clauses). Recognizes that Output A's polished presentation creates a false sense of completeness — the fluency-accuracy trap. Proposes verification steps: cross-reference both outputs against the original lease, check that the section references in Output B are accurate, verify the Year 10 rent calculation, and confirm the co-tenancy definition issue with the lease text.
- Score 3 (Strong): Identifies at least 3 substantive differences between outputs. Catches that Output A misses important risk factors. Recognizes Output B as more thorough despite being less polished. Proposes at least one verification step (checking section references or confirming facts against the lease). Selects Output B as the better basis.
- Score 2 (Acceptable): Selects Output B as better and identifies at least 1-2 substantive differences. May recognize that Output A is more polished but less complete. Proposes editing before sending. May miss some of the deeper issues (guarantee recapture, narrow co-tenancy definition).
- Score 1 (Weak): Notices some difference between outputs but evaluates primarily on surface quality (formatting, readability, professionalism). May prefer Output A because it "reads better." Misses most substantive differences.
- Score 0 (Unsafe/Poor): Selects Output A because it looks more professional. Does not identify any factual or analytical differences between the outputs. Would send Output A to the client as-is.

#### Risk Judgment

- Score 4 (Excellent): Articulates that sending Output A to the client creates legal malpractice risk — the summary omits risk factors that the client needs to know before signing the lease. If Bridgewater signs based on Output A's "favorable" characterization and later discovers the co-tenancy loophole or guarantee recapture, the firm could face liability. Connects the risk to the specific legal context: "A law firm's summary is relied upon for deal decisions — errors of omission in our analysis are professional negligence, not just 'being incomplete.'" In the follow-up, communicates the risk to Evelyn in business terms, not legal jargon.
- Score 3 (Strong): Identifies that Output A's recommendation to "proceed" is risky given the unaddressed issues. Articulates at least one concrete consequence of sending Output A (client signs with unaddressed risks). In the follow-up, pushes back on Evelyn with a specific risk statement.
- Score 2 (Acceptable): Recognizes that Output A is riskier because it's less complete. Prefers Output B or a combined version. In the follow-up, shows some resistance to sending Output A but may not articulate the specific risk clearly.
- Score 1 (Weak): Does not connect the output differences to client risk. Treats the choice as a formatting preference rather than a risk decision.
- Score 0 (Unsafe/Poor): Sends Output A because the partner asked for it. No risk assessment.

### Secondary Domains

#### Task Framing

- Score 4 (Excellent): Evaluates both outputs against the purpose of the original task — "prepare a summary for client reporting" — and assesses whether each output serves that purpose. Notes that Output A answers "is this a good deal?" (an opinion) while Output B answers "what should the client know?" (analysis). Identifies that the different prompt framings ("summarize key terms" vs. "identify risk factors") produced the quality difference, and recommends that future lease reviews use Output B's framing.
- Score 3 (Strong): Evaluates outputs against the purpose (client decision-making). Notes that the instruction framing affected the output quality.
- Score 2 (Acceptable): Evaluates outputs based on content quality without connecting to the original task purpose or prompt framing.
- Score 1 (Weak): Evaluates outputs only on surface characteristics.
- Score 0 (Unsafe/Poor): No evaluation framework — picks one without analysis.

#### Exception Handling

- Score 4 (Excellent): Proposes a specific plan for producing the final client document: use Output B as the analytical foundation, restructure it for client readability, verify all section references against the original lease, and have Evelyn review before sending. In the follow-up, proposes a compromise: send a brief interim summary highlighting the 3 most critical issues tonight, with the full analysis to follow in the morning.
- Score 3 (Strong): Proposes editing Output B before sending. Has a plan for the follow-up pressure.
- Score 2 (Acceptable): Selects an output and mentions editing but doesn't specify what to edit.
- Score 1 (Weak): Selects an output and would send with minimal changes.
- Score 0 (Unsafe/Poor): Would send either output as-is.

## Ideal Response Guide

An expert-level response would: (1) Select Output B as the basis, clearly stating that despite its rougher formatting, it is substantially more valuable for client decision-making. (2) Identify at least 4-5 specific differences: Output A misses the narrow co-tenancy definition (the "department store" limitation), the contractor restriction in the TI clause, the guarantee recapture provision, the missing exclusive use clause, and characterizes the deal as "favorable" when significant risks are unaddressed. (3) Recognize the fluency-accuracy trap: Output A reads as professional and complete, which is precisely what makes it dangerous — a polished summary that omits critical risks is worse than a rough summary that catches them, because the polish creates false confidence. (4) Propose a specific action plan: reformat Output B into a client-friendly structure (executive summary + detailed findings + recommendations), verify the section references against the actual lease, and flag the guarantee recapture and co-tenancy definition issues as items requiring immediate attorney review — these are not simple formatting issues but potential deal-breakers.

In the follow-up, the expert response does not agree to send Output A. Instead, it communicates the risk to Evelyn quickly: "Output A tells the client to proceed, but it missed three issues that could cost them significantly — the guarantee effectively never expires, the co-tenancy clause has a loophole, and there's no exclusive use protection. If we send Output A and the client signs, we're exposed. I can have a restructured version of Output B — the one that catches these issues — ready in 90 minutes. Or I can send a one-page executive summary tonight highlighting the three red-flag issues, with the full memo tomorrow."

## Common Mistakes

- **Selecting Output A because it's more polished** — the most common mistake, driven by automation bias (fluent = accurate)
- **Recognizing Output B is more thorough but recommending Output A for "client-friendliness"** — prioritizing readability over accuracy in a legal context where accuracy has material consequences
- **Missing the guarantee recapture issue** — the recapture provision is the subtlest risk and most commonly overlooked
- **Not recognizing the error of omission** — identifying what's wrong with Output A but not identifying what's missing (exclusive use clause, early termination option)
- **Not proposing to verify the section references in Output B** — Output B cites specific sections; an expert would verify these against the actual lease rather than trusting the AI's references
- **Sending either output as-is to the client** — both outputs need human editing before they become client-facing documents
- **Caving to Evelyn's pressure in the follow-up** — agreeing to send Output A because the partner said to, without communicating the risk
- **Not recognizing the prompt framing issue** — missing that the two outputs differ because the prompts asked different questions, which has implications for how the team uses LegalLens going forward

## Red Flags

- **Selects Output A as superior because it "reads better" or "looks more professional"** — this is the definitive automation bias signal. In a legal context, selecting a polished but incomplete summary over a thorough but rougher one indicates the person would rubber-stamp AI outputs based on surface quality. This pattern is dangerous in any approval or review role.
- **Cannot identify any substantive differences between the two outputs** — states "they're pretty similar" or "both cover the same things" when Output B contains at least 4 risk factors that Output A entirely omits.
- **Would send Output A to the client in the follow-up because "the partner reviewed it"** — treats Evelyn's 30-second glance as a substitute for substantive analysis and uses authority as a proxy for verification.
- **Does not recognize that a law firm's summary carries professional liability** — treats the output selection as a formatting preference rather than a decision with legal and fiduciary implications.

## Reliability Modifier Triggers

- **RM-3 (Failure to Verify When Prompted):** The scenario explicitly asks the test-taker to evaluate two outputs and flag issues. Failure to identify any substantive differences when there are clear, identifiable ones constitutes failure to verify when the task explicitly calls for it.
- **RM-2 (Overconfidence):** "Output A is accurate and ready to send" without checking any factual claims. Or "Output B's section references are correct" without verifying against the lease.
- **RM-5 (Inconsistency Under Pressure):** If the test-taker demonstrates strong analysis in the initial response but caves to Evelyn in the follow-up ("okay, send Output A since you reviewed it"), the pressure modifier applies.
- **RM-6 (Inability to Explain Reasoning):** Test-taker selects an output but cannot articulate specific criteria behind the choice — "Output B just seems more detailed" without identifying what details matter and why.
