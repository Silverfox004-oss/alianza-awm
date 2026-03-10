---
id: "SCN-004"
title: "Hidden Error Review — Healthcare Patient Communications"
slug: "hidden-error-review-healthcare"
version: "1.0.0"

archetype: "hidden-error-review"
module: 3
difficulty: 3
industry: "healthcare"

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
variant_of: null
---

## Situation

You are a Communications Coordinator at ClearPath Health, a regional healthcare network in North Carolina with 14 clinics, 3 urgent care centers, and a workforce of approximately 1,800 employees including 200+ clinical staff. ClearPath recently deployed PatientConnect AI, a communication platform that generates personalized patient messages — appointment reminders, post-visit follow-ups, wellness campaign emails, and care plan summaries — based on patient data from the electronic health record (EHR) system.

Your supervisor, Rachel Briggs (Director of Patient Communications), has asked you to review a post-visit follow-up message that PatientConnect AI generated for a patient who recently had an annual wellness exam. The message is scheduled to go out to 340 patients who completed wellness visits in the past two weeks. Each message is personalized with the patient's name and visit-specific content, but they all follow the same template structure. Rachel has pulled one sample for your review before the batch is released.

The patient in the sample message is Margaret Chen, age 64, who had her annual wellness exam at ClearPath's Eastside Clinic on February 24, 2026. Here is the AI-generated message:

---

> **Subject: Your Wellness Visit Summary — ClearPath Health**
>
> Dear Margaret,
>
> Thank you for visiting ClearPath Health's Eastside Clinic on February 24, 2026 for your annual wellness examination. We appreciate your commitment to preventive care.
>
> **Your Visit Summary:**
>
> During your visit, Dr. Sarah Patel conducted a comprehensive wellness evaluation. Your key health metrics are within normal ranges:
>
> - Blood pressure: 128/82 mmHg — within the healthy range
> - Cholesterol (total): 215 mg/dL — within acceptable limits
> - Fasting blood glucose: 105 mg/dL — normal
> - BMI: 27.3 — within the healthy weight category
>
> **Recommended Follow-Ups:**
>
> Based on your visit, we recommend:
> 1. Continue your current medications as prescribed
> 2. Schedule a mammogram screening — you are due for this preventive screening based on your age and screening history
> 3. Consider a colorectal cancer screening if you have not had one in the past 5 years
>
> **Wellness Tip:**
>
> Studies show that adults who maintain regular wellness visits reduce their risk of serious health conditions by up to 40%. Keep up the great work!
>
> If you have questions about your visit or results, please call our patient services line at (919) 555-0142 or message your care team through the ClearPath Patient Portal.
>
> Warm regards,
> ClearPath Health Patient Communications Team
>
> *This message was generated based on your health record information. Please review with your healthcare provider if you have concerns.*

---

Rachel tells you: "The batch goes out at 5 PM today. I need you to review this sample and tell me if it's good to go. If you spot anything that needs fixing, let me know and we'll hold the batch."

## The Challenge

This message appears professional, well-formatted, and patient-friendly at first glance. However, it contains three distinct errors of varying severity that you need to identify:

1. **A subtle factual error:** Several of the health metrics are characterized incorrectly. Specifically, a blood pressure of 128/82 is classified as Stage 1 hypertension (elevated), not "within the healthy range." A total cholesterol of 215 mg/dL is above the desirable limit of 200 mg/dL, not "within acceptable limits." A fasting blood glucose of 105 mg/dL is classified as prediabetic (100-125 mg/dL), not "normal." A BMI of 27.3 is classified as overweight (25-29.9), not "within the healthy weight category." The AI has systematically downplayed every metric that falls outside optimal ranges, characterizing borderline or out-of-range values as normal.

2. **A misleading implication:** The "Wellness Tip" cites that "adults who maintain regular wellness visits reduce their risk of serious health conditions by up to 40%." This is a fabricated or unsourced statistic — a hallucinated claim presented as established medical fact. While encouraging wellness visits is appropriate, citing a specific percentage without a source in a healthcare communication could be considered a misleading health claim. If a patient questions it, ClearPath cannot point to a source.

3. **A missing disclaimer:** The message includes health metrics and screening recommendations but does not include a standard HIPAA-compliant notice about the security of electronic communications, does not clarify that this summary is not a substitute for the official medical record or clinical advice, and does not advise the patient to contact their provider if they believe any information is inaccurate. The small disclaimer at the bottom ("This message was generated based on your health record information") is insufficient — it doesn't mention AI involvement in generating the content, which many healthcare communication guidelines now require.

## Your Task

1. **Review the AI-generated message** and identify every issue you can find — errors, risks, misleading content, missing elements, or anything else that should be flagged before the batch goes out.
2. **For each issue you identify**, classify it by severity (critical, moderate, or minor) and explain the potential consequence if the message goes out uncorrected.
3. **Make a recommendation**: Should Rachel release the batch as-is, hold the batch for corrections, or take some other action? Justify your recommendation.

## Follow-Up Pressure Prompt

*Delivered after the test-taker submits their initial response:*

Rachel reviews your findings and says:

> "Good catches on the health metrics — I'll have the clinical team fix those classifications. But the 40% statistic and the disclaimer stuff — I think you're overthinking it. The wellness tip is just a motivational blurb, not medical advice. And we have a general disclaimer on all our communications already through our email footer. The clinical team is busy and I don't want to delay the batch for minor issues. Can you sign off on releasing it once we fix the health metric labels?"

Do you sign off? If not, how do you communicate to Rachel why the remaining issues matter without being dismissive of her perspective?

## Scoring Rubric

### Primary Domains

#### Verification Instinct

- Score 4 (Excellent): Identifies all three embedded errors — the mischaracterized health metrics, the fabricated wellness statistic, and the inadequate disclaimer. For the health metrics, specifies which metrics are mischaracterized and what the correct classifications are (or flags that they need clinical verification). Identifies the wellness statistic as likely fabricated and notes that healthcare communications cannot cite unsourced statistics. Identifies the disclaimer deficiency and specifies what's missing (HIPAA language, AI disclosure, clarification that summary isn't a substitute for medical record). Additionally, raises a systemic concern: "If this sample mischaracterizes all four metrics, the other 339 messages in the batch likely have similar problems — this may be a systematic AI bias toward reassuring language rather than clinically accurate language."
- Score 3 (Strong): Identifies at least 2 of the 3 errors, including the health metrics mischaracterization. Triages by severity correctly (metrics issue is most critical). Proposes verification steps for the remaining messages in the batch. May miss the fabricated statistic or the disclaimer issue, but catches the most dangerous error.
- Score 2 (Acceptable): Identifies the health metrics issue (the most critical error) and at least one other concern. Recommends holding the batch. May not fully articulate the clinical implications or identify the systemic pattern.
- Score 1 (Weak): Catches that "something seems off" with the health metrics but cannot specify which are incorrect or why. Misses the fabricated statistic and the disclaimer issue. May approve the message with a vague suggestion to "double-check the numbers."
- Score 0 (Unsafe/Poor): Approves the message without identifying any errors. States that it "looks professional" or "seems accurate." Would allow 340 patients to receive messages that mischaracterize their health status.

#### Exception Handling

- Score 4 (Excellent): Recommends holding the entire batch, not just fixing the sample. Proposes a structured response: (1) immediately hold the batch, (2) have clinical staff validate the metric classification logic in PatientConnect AI, (3) re-run the batch with corrected classifications, (4) review a random sample of corrected messages before release, (5) add the fabricated statistic to the AI's blocklist, and (6) update the template to include proper disclaimers. Documents the issue for the compliance team. In the follow-up, explains to Rachel why the "minor" issues matter in a healthcare context — specifically, that unsourced health claims in patient communications can create liability and that AI disclosure is increasingly required by healthcare communication standards.
- Score 3 (Strong): Holds the batch and proposes correcting all three issues before release. Has a plan for validating the fix across the full batch (not just the sample). In the follow-up, pushes back on Rachel with at least one concrete risk statement.
- Score 2 (Acceptable): Holds the batch for the metrics issue. May sign off on the other issues with Rachel's rationale. Proposes fixing the sample but may not address the full batch systematically.
- Score 1 (Weak): Flags the metrics issue but suggests fixing just the sample, not the batch. Defers to Rachel on the other issues without assessment.
- Score 0 (Unsafe/Poor): Approves the batch. Does not flag any issues or does not recommend any action.

### Secondary Domains

#### Risk Judgment

- Score 4 (Excellent): Articulates that sending mischaracterized health information to 340 patients is a patient safety risk (patients may ignore genuinely concerning metrics), a regulatory risk (inaccurate health communications violate patient communication standards), and a liability risk (if a patient relies on the "normal" classification and delays follow-up care). Identifies the fabricated statistic as a separate risk category — a misleading health claim in a communication from a healthcare provider. Considers the reputational risk if the story reaches local media: "Healthcare network sends AI-generated messages telling patients their concerning health metrics are normal."
- Score 3 (Strong): Identifies at least 2 risk categories (patient safety, regulatory, liability). Articulates specific consequences for the metrics error. Connects to real-world healthcare communication standards.
- Score 2 (Acceptable): Identifies that the metrics error is a patient safety concern. May not fully articulate regulatory or liability dimensions.
- Score 1 (Weak): Recognizes the error but treats it as a minor quality issue rather than a safety risk.
- Score 0 (Unsafe/Poor): No risk assessment. Treats the message as a routine communication with no safety implications.

#### Process Thinking

- Score 4 (Excellent): Identifies that the error is likely systematic (the AI's classification logic, not a one-off mistake) and proposes investigating the root cause. Recommends changes to the workflow: add clinical review as a mandatory step before any batch with health metrics, implement automated bounds-checking that flags metrics outside normal ranges, and establish a review cadence for the AI's reference tables.
- Score 3 (Strong): Recognizes this is likely a systematic issue and proposes checking the full batch. Suggests a process change (clinical review before release).
- Score 2 (Acceptable): Addresses the immediate issue but treats it as potentially isolated. Suggests fixing and re-running.
- Score 1 (Weak): Treats it as a one-off error in the sample.
- Score 0 (Unsafe/Poor): No process thinking — addresses only the sample message.

## Ideal Response Guide

An expert-level response would identify all three errors, triage them by severity, and propose a structured corrective action.

**Error 1 — Mischaracterized Health Metrics (CRITICAL):** The response should flag that BP 128/82 is elevated/Stage 1 hypertension per AHA guidelines (not "healthy range"), total cholesterol 215 mg/dL exceeds the 200 mg/dL desirable threshold (not "acceptable limits"), fasting glucose 105 mg/dL is in the prediabetic range per ADA guidelines (not "normal"), and BMI 27.3 is classified as overweight by the CDC (not "healthy weight"). The expert recognizes this as a systematic pattern — the AI is consistently characterizing borderline metrics as normal, which is dangerous because it could cause patients to ignore metrics that warrant clinical attention. This is the highest-severity error because it directly affects patient health decisions.

**Error 2 — Fabricated Wellness Statistic (MODERATE):** The "40% reduction" claim appears to be a hallucinated or unsourced statistic. While encouraging preventive care is appropriate, citing a specific statistic without a source in a healthcare communication is a problem — it could be challenged by patients, media, or regulators, and ClearPath cannot defend it. The expert response recommends either removing the statistic, replacing it with a sourced claim, or softening it to general encouragement without a specific number.

**Error 3 — Inadequate Disclaimers (MODERATE):** The message lacks: (a) proper HIPAA-related notice about electronic communication security, (b) clarification that the summary does not replace the official medical record or constitute clinical advice, (c) guidance for patients to contact their provider if information appears inaccurate, and (d) disclosure that the content was AI-generated. The small footer disclaimer is insufficient for a healthcare context.

**Systemic concern:** The expert response notes that if the AI mischaracterized all four metrics in this sample, the entire batch of 340 messages likely has similar issues. The fix cannot be applied just to this one message — the underlying classification logic needs correction and the full batch needs re-generation or clinical review.

In the follow-up, the expert response does not sign off after only the metrics fix. The response explains to Rachel: "The metrics fix is the most urgent issue, but the unsourced statistic isn't a 'motivational blurb' when it comes from a healthcare provider — it's a health claim. If a patient Googles '40% reduction wellness visits' and finds nothing, it undermines trust in all our communications. And the disclaimer issue isn't about our email footer — it's about including language specific to this message that clarifies it's AI-generated health information, not a clinical assessment. These aren't minor — they're the kind of issues that create compliance exposure in healthcare communications."

## Common Mistakes

- **Catching only the health metrics error and missing the other two** — the metrics issue is the most obvious; the fabricated statistic and disclaimer gap require deeper analysis
- **Approving the message after Rachel fixes the metrics** — signing off in the follow-up without addressing the remaining issues because Rachel minimized them
- **Not recognizing the systematic nature of the error** — treating the metrics mischaracterization as a one-off rather than a likely pattern across all 340 messages
- **Vague severity assessments** — saying "this is a problem" without explaining the specific consequence (patient safety, liability, regulatory, reputational)
- **Not questioning the "40% reduction" statistic** — accepting it as a reasonable wellness message rather than identifying it as an unsourced/fabricated claim
- **Not considering the batch implications** — focusing only on Margaret Chen's message without addressing the other 339 messages
- **Treating the disclaimer as sufficient** — not recognizing that the current footer text is inadequate for healthcare communications containing personal health information
- **Not proposing a process change** — fixing the immediate issue without recommending changes to prevent recurrence

## Red Flags

- **Approves the message without identifying any errors** — the message contains at least 4 mischaracterized health metrics, a fabricated statistic, and an inadequate disclaimer. Approval without identifying any of these indicates the person would pass inaccurate health information to patients. This is a patient safety failure.
- **Identifies errors but approves anyway** — "The metrics are a little off but the overall message is fine — patients probably won't check the specific ranges." This indicates willingness to accept known health information errors in patient communications, which represents a fundamental fitness-for-purpose failure in a healthcare context.
- **Fabricates their own verification** — claims to have "confirmed the health ranges are correct" when the scenario provides no access to clinical reference materials. Creating false assurance is worse than missing the error.
- **Recommends sending the batch with a plan to "fix it next time"** — prioritizes the 5 PM deadline over patient safety by sending known-incorrect health information with the intention of correcting the template for future batches.
- **States "the AI is trained on medical data so it probably knows the correct ranges"** — defers to AI authority on clinical classifications rather than verifying against medical standards.

## Reliability Modifier Triggers

- **RM-3 (Failure to Verify When Prompted):** The scenario explicitly asks the test-taker to review the message and identify issues. Failure to identify any of the three embedded errors — when the task is specifically to find them — triggers this modifier at full strength (-1.0 to Verification Instinct).
- **RM-2 (Overconfidence):** "This message looks thorough and accurate" without verifying any health metric classification. Or "the AI's medical classifications are reliable."
- **RM-4 (Unsafe Automation Bias):** "PatientConnect AI is designed for healthcare communications so we can trust its clinical accuracy." Or "AI-generated messages don't need clinical review — that's the point of the system."
- **RM-1 (Contradiction):** If the test-taker advocates for thorough verification in other scenarios but approves this healthcare message without checking, the contradiction is flagged.
- **RM-5 (Inconsistency Under Pressure):** If the test-taker's initial response is thorough but they sign off in the follow-up after Rachel minimizes the remaining issues, the pressure modifier applies.
