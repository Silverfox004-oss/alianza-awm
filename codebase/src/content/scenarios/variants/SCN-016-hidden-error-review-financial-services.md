---
id: "SCN-016"
title: "The Wellness Program Summary"
slug: "hidden-error-review-financial-services"
version: "1.0.0"

archetype: "hidden-error-review"
module: 3
difficulty: 3
industry: "financial-services"

primary_domains:
  - "verification-instinct"
  - "exception-handling"
secondary_domains:
  - "risk-judgment"
  - "process-thinking"
target_roles:
  - "ai-approver"
  - "qa-risk-reviewer"

status: "published"
created_at: 2026-03-09
updated_at: 2026-03-09
variant_of: "SCN-004"
---

## Situation

You are a Client Communications Associate at Pinnacle Advisory Group, a registered investment advisory (RIA) firm in Philadelphia with approximately \$1.8 billion in assets under management and 2,100 client households. Pinnacle recently deployed ClientBrief AI, a communication platform that generates personalized client updates — quarterly portfolio summaries, rebalancing notifications, year-end tax summaries, and market commentary letters — based on account data from the firm's portfolio management system.

Your supervisor, Christine Park (Director of Client Communications), has asked you to review a year-end tax planning summary that ClientBrief AI generated for a client. The message is scheduled to go out to 480 clients who have taxable brokerage accounts. Each message is personalized with the client's name and account-specific tax data, but they all follow the same template structure. Christine has pulled one sample for your review before the batch is released.

The client in the sample is Robert Harmon, age 58, with a taxable brokerage account valued at \$1.24 million. Here is the AI-generated message:

---

> **Subject: Your Year-End Tax Planning Summary — Pinnacle Advisory Group**
>
> Dear Robert,
>
> As we approach year-end, we wanted to provide you with a summary of key tax considerations for your Pinnacle brokerage account to help you plan effectively.
>
> **Tax Position Summary:**
>
> Your account has the following estimated tax-relevant activity for 2025:
>
> - Realized short-term capital gains: \$12,340 — taxed at your ordinary income rate
> - Realized long-term capital gains: \$28,750 — taxed at the favorable long-term rate of 15%
> - Qualified dividend income: \$8,920 — taxed at the favorable qualified dividend rate of 15%
> - Unrealized losses available for harvesting: \$14,200 across 3 positions
>
> **Key Recommendations:**
>
> 1. Consider harvesting the \$14,200 in unrealized losses before December 31 to offset your short-term gains, potentially saving approximately \$3,550 in taxes
> 2. Your total investment income of \$49,010 is below the threshold for the Net Investment Income Tax (NIIT), so no additional 3.8% surtax applies
> 3. If you are making charitable contributions this year, consider donating appreciated shares instead of cash to avoid capital gains while receiving a deduction for the full market value
>
> **Planning Tip:**
>
> Investors who engage in proactive year-end tax planning save an average of 1.2% of portfolio value annually in unnecessary taxes. A well-executed tax strategy is one of the most reliable sources of excess return.
>
> Please contact your advisor, Jessica Millard, if you'd like to discuss any of these strategies. We recommend scheduling a year-end planning call before December 15.
>
> Best regards,
> Pinnacle Advisory Group Client Communications Team
>
> *This summary is generated based on your account data and is for informational purposes only. Please consult with a qualified tax professional regarding your specific tax situation.*

---

Christine tells you: "The batch goes out Friday morning. I need you to review this sample and tell me if it's good to go. If you spot anything that needs fixing, let me know and we'll hold the batch."

## The Challenge

This message appears professional, personalized, and genuinely useful at first glance. However, it contains three distinct errors of varying severity that you need to identify:

1. **A factual error in the tax rate assumptions:** The message states Robert's long-term capital gains and qualified dividends will be taxed at 15%. However, this rate depends entirely on his taxable income bracket. For single filers in 2025, the 15% rate applies to taxable income between approximately \$48,351 and \$533,400 — but the message doesn't know Robert's total income, filing status, or other deductions. If Robert has a high income from employment or other sources, his long-term gains rate could be 20%, not 15%. More critically, the NIIT assessment states his total investment income of \$49,010 is "below the threshold" — but the NIIT threshold is \$200,000 for single filers and \$250,000 for married filing jointly, and it applies to the *lesser* of net investment income or the amount by which MAGI exceeds the threshold. Without knowing Robert's total MAGI, this statement is unsupported.

2. **A fabricated planning statistic:** The "Planning Tip" claims that "investors who engage in proactive year-end tax planning save an average of 1.2% of portfolio value annually." This is an unsourced, likely hallucinated statistic presented as established financial fact. An RIA making specific claims about tax savings percentages without a source creates regulatory risk — the SEC views such claims as potentially misleading performance expectations.

3. **A missing regulatory disclaimer:** The message provides specific tax recommendations (harvest losses, donate appreciated shares, characterizes income by tax category) but carries only a generic informational disclaimer. For an RIA, communications that include specific investment or tax recommendations are subject to SEC Rule 206(4)-1 (Investment Adviser Marketing Rule). The disclaimer does not address that the tax analysis is based on incomplete information (no filing status, no total income), does not mention that the recommendations may not be suitable for the client's complete financial picture, and does not reference that the firm is not a tax advisor and this does not constitute tax advice in the formal sense.

## Your Task

1. **Review the AI-generated message** and identify every issue you can find — errors, risks, misleading content, missing elements, or anything else that should be flagged before the batch goes out.
2. **For each issue you identify**, classify it by severity (critical, moderate, or minor) and explain the potential consequence if the message goes out uncorrected.
3. **Make a recommendation**: Should Christine release the batch as-is, hold the batch for corrections, or take some other action? Justify your recommendation.

## Follow-Up Pressure Prompt

Christine reviews your findings and says:

> "Good catch on the tax rate issue — I'll have compliance review the rate assumptions. But the statistic and the disclaimer stuff — I think you're overthinking it. The planning tip is just motivation, not a performance guarantee. And we have standard disclosures on all our client emails through the compliance footer. The compliance team is swamped with year-end reviews and I don't want to delay the batch for minor issues. Can you sign off on releasing once we fix the rate assumptions?"

Do you sign off? If not, how do you communicate to Christine why the remaining issues matter without being dismissive of her perspective?

## Scoring Rubric

### Primary Domains

**Verification Instinct**

- Score 4 (Excellent): Identifies all three embedded errors — the tax rate assumptions dependent on unknown MAGI/filing status, the fabricated 1.2% planning statistic, and the inadequate regulatory disclaimer. For the tax rate issue, specifies both dimensions: the long-term gains rate assumption AND the NIIT assessment being unsupported without total MAGI data. Identifies the planning statistic as likely hallucinated and notes that RIA communications cannot cite unsourced performance-related statistics. Identifies the disclaimer deficiency and specifies what's missing (filing status caveat, incomplete-information acknowledgment, explicit non-tax-advisor language, potential SEC Marketing Rule implications). Additionally, raises a systemic concern: "If this sample has structural errors in its assumptions and template language, the other 479 messages in the batch likely have the same template-level issues — this requires fixing the template, not just this sample."
- Score 3 (Strong): Identifies at least 2 of the 3 errors, including the tax rate assumptions issue. Triages by severity correctly (tax rate issue is most critical). Proposes verification steps for the remaining messages in the batch. May miss the fabricated statistic or the disclaimer issue, but catches the most dangerous error.
- Score 2 (Acceptable): Identifies the tax rate assumptions issue (the most critical error) and at least one other concern. Recommends holding the batch. May not fully articulate the regulatory or legal implications.
- Score 1 (Weak): Catches that "something seems off" with the tax rates but cannot specify which assumptions are unsupported or why. Misses the fabricated statistic and the disclaimer issue. May approve the message with a vague suggestion to "double-check the numbers."
- Score 0 (Unsafe/Poor): Approves the message without identifying any errors. States that it "looks professional" or "seems helpful." Would allow 480 clients to receive messages with unsupported tax rate assumptions.

**Exception Handling**

- Score 4 (Excellent): Recommends holding the entire batch, not just fixing the sample. Proposes a structured response: (1) immediately hold the batch, (2) have compliance validate the tax rate assumption logic in ClientBrief AI's template, (3) remove or source the 1.2% planning statistic, (4) update the disclaimer to address incomplete-information limitations and SEC Marketing Rule requirements, (5) re-run a corrected sample for compliance sign-off before releasing the batch. Documents the issue for the compliance and legal teams. In the follow-up, explains to Christine why the "moderate" issues matter in an RIA context — specifically, that unsourced performance-related statistics and inadequate disclaimers can trigger SEC examination findings, making them potentially as consequential as the tax rate error.
- Score 3 (Strong): Holds the batch and proposes correcting all three issues before release. Has a plan for validating the fix across the full batch. In the follow-up, pushes back on Christine with at least one concrete regulatory risk statement.
- Score 2 (Acceptable): Holds the batch for the tax rate issue. May sign off on the other issues with Christine's rationale. Proposes fixing the sample but may not address the full batch systematically.
- Score 1 (Weak): Flags the tax rate issue but suggests fixing just the sample, not the batch. Defers to Christine on the other issues without assessment.
- Score 0 (Unsafe/Poor): Signs off on releasing the batch after only the tax rate fix. Does not flag the remaining issues as requiring attention.

### Secondary Domains

**Risk Judgment**

- Score 4 (Excellent): Articulates that sending messages with unsupported tax rate assumptions to 480 clients creates multiple risk dimensions: (1) client harm — a client who acts on the NIIT assessment without knowing their actual MAGI could make a tax planning error, (2) regulatory risk — unsourced performance-related statistics in RIA client communications can trigger SEC examination findings under the Marketing Rule, (3) liability risk — if a client makes a tax decision based on the message and incurs additional tax liability, the firm's disclaimer may be insufficient to prevent a complaint or arbitration. Notes that the batch of 480 messages likely has identical template-level issues, so the risk is amplified across the entire client population with taxable accounts.
- Score 3 (Strong): Identifies at least 2 risk categories (client harm, regulatory, liability). Articulates specific consequences for the tax rate error. Connects to real-world SEC regulatory standards.
- Score 2 (Acceptable): Identifies that the tax rate error is a client harm concern. May not fully articulate regulatory or liability dimensions.
- Score 1 (Weak): Recognizes the error but treats it as a minor quality issue rather than a regulatory risk.
- Score 0 (Unsafe/Poor): No risk assessment. Treats the message as a routine communication with no compliance implications.

**Process Thinking**

- Score 4 (Excellent): Identifies that the errors are likely systematic (the AI's template assumptions, not a one-off) and proposes investigating the root cause in the ClientBrief AI configuration. Recommends changes to the workflow: add compliance review as a mandatory step before any batch involving tax recommendations, implement a check for incomplete-information-dependent claims, and establish a review cadence for the AI's template language. Notes that the template structure — making specific tax rate claims without knowing filing status or MAGI — is a structural design flaw that will recur in every future batch until the template is corrected.
- Score 3 (Strong): Recognizes this is a systematic template issue and proposes checking the full batch. Suggests a process change (compliance review before release for batches with tax content).
- Score 2 (Acceptable): Addresses the immediate issue but treats it as potentially isolated. Suggests fixing and re-running.
- Score 1 (Weak): Treats it as a one-off error in the sample.
- Score 0 (Unsafe/Poor): No process thinking — addresses only the sample message.

## Ideal Response Guide

An expert-level response identifies all three errors, triages them by severity, and proposes a structured corrective action.

**Error 1 — Unsupported Tax Rate Assumptions (CRITICAL):** The response flags that both the 15% long-term capital gains rate and the NIIT assessment are contingent on Robert's total MAGI and filing status — neither of which ClientBrief AI has access to. The 15% rate could be 20% or 23.8% (with NIIT) for a high-income client. The NIIT statement is particularly dangerous: telling a client they are "below the threshold" without knowing their W-2 income, business income, or other sources could cause them to skip a tax planning step they actually need. This is a systematic template flaw — all 480 messages contain the same assumption gap.

**Error 2 — Fabricated Planning Statistic (MODERATE):** The "1.2% of portfolio value" claim appears to be a hallucinated or unsourced statistic. An RIA citing specific performance-related statistics in client communications without attribution creates regulatory exposure under SEC Rule 206(4)-1. The claim should either be removed or replaced with a sourced, defensible statement.

**Error 3 — Inadequate Regulatory Disclaimer (MODERATE):** The generic disclaimer at the bottom is insufficient for a communication that includes specific tax recommendations. The message needs additional language clarifying: (a) that the tax analysis is based solely on account data and does not account for the client's complete tax picture, (b) that the recommendations may not be suitable for the client's specific circumstances, and (c) that Pinnacle is not a tax advisor and this is not formal tax advice. The SEC Marketing Rule requires that communications not be misleading — a communication presenting tax rate assumptions as definitive when they are income-dependent may be misleading without adequate qualification.

**Systemic concern:** The expert response notes that all 480 messages have the same template structure, which means the structural issues (assumption gaps, fabricated statistic, disclaimer language) exist in every message in the batch — not just this sample.

In the follow-up, the expert response does not sign off after only the tax rate fix. It explains to Christine: "The statistic issue isn't about motivation — it's about the SEC Marketing Rule. An RIA citing specific savings percentages without a source is the kind of thing that comes up in examinations. And the disclaimer issue isn't covered by our standard footer — it needs specific language clarifying that we don't have Robert's full tax picture. These aren't minor in a regulated advisory context — they're the kinds of issues that generate deficiency letters."

## Common Mistakes

- **Catching only the tax rate error and missing the other two** — the tax rate issue is the most obvious; the fabricated statistic and disclaimer gap require deeper analysis
- **Signing off on the batch after Christine fixes the tax rates** — agreeing in the follow-up without addressing the remaining issues because Christine minimized them
- **Not recognizing the systematic nature of the error** — treating the template flaws as a one-off rather than a pattern affecting all 480 messages
- **Vague severity assessments** — saying "this is a problem" without explaining the specific consequence (client harm, SEC examination risk, liability)
- **Not questioning the "1.2% planning statistic"** — accepting it as a reasonable claim rather than identifying it as an unsourced/fabricated statistic
- **Not considering the batch implications** — focusing only on Robert Harmon's message without addressing the other 479 messages
- **Treating the compliance footer as sufficient** — not recognizing that the generic footer text is inadequate for communications containing specific tax recommendations with incomplete-information-dependent assumptions
- **Not proposing a process change** — fixing the immediate issue without recommending changes to prevent recurrence

## Red Flags

- **Approves the message without identifying any errors** — the message contains at least two categories of unsupported claims and an inadequate disclaimer. Approval indicates the person would pass potentially misleading financial information to clients.
- **Identifies errors but signs off anyway** — "The tax rate issue is a little technical — most clients won't check the specific thresholds." This indicates willingness to accept known compliance issues in client communications.
- **Fabricates their own verification** — claims to have "confirmed the tax rates are standard" when the scenario explicitly establishes they are income-dependent. Creating false assurance is worse than missing the error.
- **Recommends sending the batch with a plan to 'fix it next time'** — prioritizes the Friday deadline over regulatory compliance by sending a batch with known structural issues.
- **States "the AI is trained on financial data so it probably knows the correct tax rates"** — defers to AI authority on regulatory classifications rather than verifying against the actual tax code.

## Reliability Modifier Triggers

- **Contradiction Penalty:** Triggered if the test-taker advocates for compliance standards in other scenarios but signs off on this batch after Christine's reassurance — directly contradicting stated principles about regulatory accuracy in client communications.
- **Reasoning Absence:** Triggered if the test-taker flags issues but cannot articulate why the "moderate" issues matter in an RIA context. "The statistic seems iffy" without connecting it to SEC Marketing Rule implications is insufficient.
- **Pressure Capitulation:** Triggered if the quality of reasoning visibly degrades between the initial response and the follow-up. A response that maintains its position on all three issues while acknowledging Christine's constraints scores higher than one that simply signs off because the compliance team is busy.
