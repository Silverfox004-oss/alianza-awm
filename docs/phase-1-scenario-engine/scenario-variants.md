# Scenario Variants (1-12)

**Notion URL:** https://www.notion.so/31ed807b91118150bf1ddd1d499d9f9b

---

# AI Workforce Map — Scenario Variants (1–12)
## Alternate-Industry Variants for SJT Assessment Bank
**Version:** 1.0  
**Date:** March 9, 2026  
**Status:** Implementation-Ready  
**Dependencies:** scenarios_1_to_[6.md](http://6.md), scenarios_7_to_[12.md](http://12.md), deliverable_12_[archetypes.md](http://archetypes.md), deliverable_scoring_[domains.md](http://domains.md)
---
# Variant 1: The Triage Line
## Base Scenario: 1 — Automation Boundary
## Archetype: Automation Boundary
## Industry: Healthcare
## Difficulty: 3
### Situation
You are an Operations Analyst at Lakeview Medical Group, a regional healthcare network in Minnesota with 22 primary care clinics, approximately 3,400 employees, and 210,000 active patients. Lakeview recently licensed TriageAI, a platform designed to assist with various aspects of patient intake and clinical triage. TriageAI can read incoming patient messages from the patient portal, extract symptom descriptions, cross-reference patient medical histories, assign preliminary urgency scores, generate suggested care pathways (e.g., schedule routine appointment, recommend urgent care visit, advise calling 911), and draft response messages to patients.
Your Chief Operating Officer, Dr. Richard Nolan, has asked you to lead the rollout of TriageAI across Lakeview's patient access center. The center currently handles approximately 2,800 incoming patient portal messages per week, managed by a team of 14 registered nurses and 6 patient access coordinators. Average response time is 4.6 hours, and the executive team wants to reduce this to under 90 minutes without increasing headcount. Dr. Nolan sees TriageAI as the path to meeting that target.
Before rollout, Dr. Nolan wants your recommendation on exactly which tasks TriageAI should handle and how much clinical involvement each task requires. He has specifically asked you to classify five core tasks in the patient access workflow. Lakeview has no prior experience with AI-assisted triage, and the Minnesota Board of Medical Practice recently issued a reminder that "automated health communication systems do not substitute for the clinical judgment of licensed healthcare professionals."
The five tasks Dr. Nolan wants you to classify are:
1. **Patient Message Intake & Categorization** — Reading incoming portal messages, extracting the primary concern (symptom report, medication refill, appointment request, billing question, test result inquiry), and routing to the appropriate queue.
2. **Symptom Urgency Scoring** — Analyzing the patient's described symptoms against their medical history (age, chronic conditions, current medications, recent procedures) to assign a preliminary urgency level: routine (schedule within 2 weeks), soon (schedule within 48 hours), urgent (same-day contact required), or emergent (immediate 911 recommendation).
3. **Medication Refill Processing** — Reviewing refill requests against the patient's current prescription records, verifying that the medication is within its authorized refill window, and generating a refill order for provider co-signature.
4. **Patient Response Drafting** — Generating personalized response messages to patients that acknowledge their concern, communicate the recommended next step, and provide any relevant self-care guidance or appointment scheduling instructions.
5. **Chronic Condition Flag Detection** — Reviewing incoming messages from patients with flagged chronic conditions (diabetes, heart failure, COPD) to identify symptom descriptions that may indicate disease exacerbation — even when the patient's stated concern is unrelated (e.g., a diabetes patient asking about a rash who also mentions increased thirst and frequent urination).
### The Challenge
Each of these five tasks carries a different level of clinical risk, regulatory sensitivity, and judgment complexity. Some are strong candidates for AI automation; others require careful clinical oversight; and at least one has hidden risks that make it more dangerous to automate than it initially appears. The challenge is not "which tasks can AI do?" — it's "which tasks *should* AI do, to what degree, and what safeguards are needed at each level?" You must consider: what happens when TriageAI makes an error in each task? What are the clinical, legal, and patient safety consequences? Are there regulatory constraints? How do you monitor whether the automation decisions are working over time?
### Your Task
Please provide your recommendation to Dr. Nolan by answering the following questions:
1. **Classify each of the five tasks** into one of three categories: **AI-Only** (fully automated, no clinical review needed), **Approval-Gated** (AI performs the task but a clinician must review and approve before the result is finalized or sent), or **Human-Only** (the task should not be performed by AI). Provide a specific justification for each classification.
2. **For each task you classify as Approval-Gated**, describe what the clinical reviewer should specifically be checking and what criteria should trigger rejection or escalation.
3. **Identify which task carries the most hidden risk** — that is, which task looks routine enough to fully automate but actually has consequences that require clinical oversight? Explain what could go wrong.
### Follow-Up Pressure Prompt
Dr. Nolan responds to your recommendation:
> "I appreciate the analysis, but the patient experience team is pushing hard on the 90-minute target. If we gate three or more of these tasks with clinical review, we'll never get there — the nurses are already overwhelmed with in-person triage. The whole point of TriageAI is to reduce nurse workload, not add approval steps. Can you revise to no more than one task requiring clinical review? The vendor says TriageAI has a 94% concordance rate with nurse triage decisions on similar patient populations."
How do you respond? Do you revise your recommendation? If so, which tasks change classification, and how do you mitigate the additional risk? If not, how do you justify maintaining your original recommendation against the operational pressure?
### Scoring Notes
Same rubric as base scenario applies. The hidden-risk task is **Task 4 (Patient Response Drafting)** — analogous to base scenario's claimant communications. Automated personalized clinical messages could inadvertently communicate incorrect urgency levels, imply diagnoses, or provide self-care guidance that is inappropriate given the patient's specific medical history. The clinical stakes are higher than insurance: a patient who receives a response characterizing their symptoms as "routine" may delay seeking emergency care. The 94% concordance claim should be interrogated just like the 96% accuracy claim in the base scenario — 6% of 2,800 weekly messages means approximately 168 potentially incorrect triage decisions per week.
---
# Variant 2: The Job Description Overhaul
## Base Scenario: 2 — Instruction Rewrite
## Archetype: Instruction Rewrite
## Industry: HR / Recruiting
## Difficulty: 1
### Situation
You work as a Talent Acquisition Specialist at Ridgeline Partners, a 50-person HR consulting firm in Denver that provides recruiting and employer branding services for mid-market technology companies. Ridgeline recently subscribed to TalentForge AI, an enterprise platform that can generate job descriptions, candidate outreach messages, interview guides, compensation benchmarking summaries, and employer brand content based on written instructions.
Your Account Lead, Megan Torres, forwards you an email from the client's VP of Engineering, David Kim, at NexaBridge — a 200-person data infrastructure startup that builds ETL pipeline tools for enterprise clients. NexaBridge has been growing rapidly (headcount doubled in 18 months) and their talent acquisition process has not kept pace — they're still using the same job descriptions their first recruiter wrote three years ago. David's email reads:
> *Hi Megan,*
>
> *We're hiring like crazy and our job postings aren't getting enough qualified applicants. We need to revamp all our engineering job descriptions — they're too generic and we're attracting the wrong candidates. Can you use that AI writing tool to redo our job posts? We have about 8 open roles and we need them up ASAP. Our CTO thinks our postings sound like every other startup and that's why senior engineers keep passing.*
>
> *Thanks,*
> *David*
Megan forwards this to you with a note: "Can you set up TalentForge AI to rewrite their job descriptions? NexaBridge is our biggest new client this year — they signed a \$180K annual contract in January. Let me know what you need."
You know a few things about NexaBridge from onboarding: they build an ETL platform called DataBridge targeting enterprise data teams, their primary candidate persona is senior backend engineers with 5-8 years of experience in distributed systems, their engineering culture emphasizes autonomy and pragmatism over process and ceremony (they famously have no stand-up meetings), and they compete for talent against Snowflake, Databricks, and Fivetran. You also know that NexaBridge has struggled specifically with senior candidates accepting offers — their acceptance rate for senior engineers is 31%, well below the industry average of 55%, suggesting the issue may be deeper than just the job postings.
### The Challenge
David's request is vague on virtually every dimension that matters for producing useful AI output. "Redo our job posts" provides no specifics about: what's wrong with the current postings (is it the content, the format, the distribution channels, or all three?), what "qualified" means in measurable terms (qualified for what level? What technical stack?), what the actual role requirements are versus nice-to-haves, what the compensation range is (critical for attracting senior talent, and now legally required in Colorado, where NexaBridge is based), what NexaBridge's employee value proposition is beyond generic startup perks, whether there are DEI considerations for inclusive language screening, who will review and approve the rewritten descriptions before they go live, or what success looks like (more applicants? Better-qualified applicants? Higher acceptance rates?). If you pass this instruction to TalentForge AI as-is, you'll get generic startup job descriptions that could apply to any data company — descriptions that will feel hollow to the senior distributed-systems engineers NexaBridge is specifically trying to attract.
### Your Task
1. **Rewrite David's request** into a structured AI instruction (or set of instructions) that you could input into TalentForge AI to produce useful, differentiated job descriptions for NexaBridge. Your rewritten instruction(s) should be specific enough that a different specialist at Ridgeline could use them and get comparable results.
2. **Identify what information is still missing** — what questions would you need David or Megan to answer before you could finalize the AI instruction? List at least 3 specific questions with an explanation of why each one matters.
3. **Define success criteria** — how would you measure whether the AI-generated job descriptions are working? What would make you reject an output versus approve it?
### Follow-Up Pressure Prompt
Megan responds to your rewrite:
> "This is solid, but David just called — they have a hiring event next Wednesday and need all 8 job descriptions live on their careers page by Friday. We don't have time to go back with a bunch of questions. Can you just work with what we know about NexaBridge and get TalentForge to generate the 8 descriptions now? We can tweak later. David's CTO is presenting at the event and wants the postings up."
Do you generate the 8 descriptions now with the information you have, or do you push back? If you generate them, what guardrails do you put in place? If you push back, how do you balance David's urgency with the risk of producing ineffective job descriptions?
### Scoring Notes
Same rubric as base scenario applies. The core dilemma structure is identical: a vague client request that needs decomposition into structured AI instructions. Key differences in this variant: the risks of bad output include not just wasted effort but potentially discriminatory language in job postings (legal exposure under Title VII and state employment laws), misrepresentation of role requirements (leading to bad hires), and compensation-range issues (many states now require salary transparency in postings). A strong response should recognize that job descriptions have legal and compliance dimensions that social media posts do not.
---
# Variant 3: The Appraisal Reports
## Base Scenario: 3 — Output Comparison
## Archetype: Output Comparison
## Industry: Real Estate
## Difficulty: 2
### Situation
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
### The Challenge
Output A is polished, well-organized, and reads like a professional client memo. Output B is denser and harder to skim. However, the two outputs differ significantly in their substance. Output A characterizes the investment as "attractive" and recommends proceeding — but it misses several risk factors that Output B identifies: the suspiciously low operating expenses, the deferred maintenance implications, the occupancy weakness, and the missing seller disclosures. Output A's recommendation to proceed to due diligence could lead the client into a property with unaddressed financial and physical risks.
### Your Task
1. **Which output would you select as the basis for the client memo**, and why? Be specific about the strengths and weaknesses of each.
2. **Identify at least 3 specific differences** between the two outputs that affect their quality or reliability as client-facing documents.
3. **What would you do with the selected output before sending it to the client?** Would you send it as-is, edit it, or take some other action?
### Follow-Up Pressure Prompt
Keith stops by your desk at 4:15 PM:
> "Trident has a competing offer deadline at noon tomorrow — they need our analysis tonight to decide whether to bid. I glanced at Output A and it's sharp. Can we send that one? I don't have time to dig into the longer version. The client just wants to know if the numbers work."
How do you respond? If you push back on using Output A, how do you communicate the risk to Keith quickly and clearly?
### Scoring Notes
Same rubric as base scenario applies. The fluency-accuracy trap is identical: Output A reads professionally but misses material risks, while Output B is rougher but substantially more thorough. The key differences for this variant: in real estate, recommending a property acquisition based on incomplete financials creates direct financial exposure for the client (potentially millions in overpayment or unexpected capital costs), and the brokerage's advisory credibility is at stake. The operating-expense analysis in Output B is the analogue to the guarantee-recapture provision in the base scenario — the subtlest and most consequential finding that Output A completely misses.
---
# Variant 4: The Wellness Program Summary
## Base Scenario: 4 — Hidden Error Review
## Archetype: Hidden Error Review
## Industry: Financial Services
## Difficulty: 3
### Situation
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
### The Challenge
This message appears professional, personalized, and genuinely useful at first glance. However, it contains three distinct errors of varying severity that you need to identify:
1. **A factual error in the tax rate assumptions:** The message states Robert's long-term capital gains and qualified dividends will be taxed at 15%. However, this rate depends entirely on his taxable income bracket. For single filers in 2025, the 15% rate applies to taxable income between approximately \$48,351 and \$533,400 — but the message doesn't know Robert's total income, filing status, or other deductions. If Robert has a high income from employment or other sources, his long-term gains rate could be 20%, not 15%. More critically, the NIIT assessment states his total investment income of \$49,010 is "below the threshold" — but the NIIT threshold is \$200,000 for single filers and \$250,000 for married filing jointly, and it applies to the *lesser* of net investment income or the amount by which MAGI exceeds the threshold. Without knowing Robert's total MAGI, this statement is unsupported.
2. **A fabricated planning statistic:** The "Planning Tip" claims that "investors who engage in proactive year-end tax planning save an average of 1.2% of portfolio value annually." This is an unsourced, likely hallucinated statistic presented as established financial fact. An RIA making specific claims about tax savings percentages without a source creates regulatory risk — the SEC views such claims as potentially misleading performance expectations.
3. **A missing regulatory disclaimer:** The message provides specific tax recommendations (harvest losses, donate appreciated shares, characterizes income by tax category) but carries only a generic informational disclaimer. For an RIA, communications that include specific investment or tax recommendations are subject to SEC Rule 206(4)-1 (Investment Adviser Marketing Rule). The disclaimer does not address that the tax analysis is based on incomplete information (no filing status, no total income), does not mention that the recommendations may not be suitable for the client's complete financial picture, and does not reference that the firm is not a tax advisor and this does not constitute tax advice in the formal sense.
### Your Task
1. **Review the AI-generated message** and identify every issue you can find — errors, risks, misleading content, missing elements, or anything else that should be flagged before the batch goes out.
2. **For each issue you identify**, classify it by severity (critical, moderate, or minor) and explain the potential consequence if the message goes out uncorrected.
3. **Make a recommendation**: Should Christine release the batch as-is, hold the batch for corrections, or take some other action? Justify your recommendation.
### Follow-Up Pressure Prompt
Christine reviews your findings and says:
> "Good catch on the tax rate issue — I'll have compliance review the rate assumptions. But the statistic and the disclaimer stuff — I think you're overthinking it. The planning tip is just motivation, not a performance guarantee. And we have standard disclosures on all our client emails through the compliance footer. The compliance team is swamped with year-end reviews and I don't want to delay the batch for minor issues. Can you sign off on releasing once we fix the rate assumptions?"
Do you sign off? If not, how do you communicate to Christine why the remaining issues matter without being dismissive of her perspective?
### Scoring Notes
Same rubric as base scenario applies. The error structure maps directly: (1) the tax rate assumptions parallel the mischaracterized health metrics — systematically presenting incomplete-information-dependent claims as definitive facts; (2) the fabricated statistic parallels the "40% reduction" health claim; (3) the missing regulatory disclaimer parallels the inadequate HIPAA disclaimer. The key escalation: in financial services, unsourced performance-related claims and inadequate disclaimers can trigger SEC examination findings, making the "moderate" issues potentially as consequential as the "critical" tax rate error. A strong response should recognize that the batch of 480 messages likely contains the same structural issues — not just this sample.
---
# Variant 5: The Curriculum Proposal
## Base Scenario: 5 — Missing Context
## Archetype: Missing Context
## Industry: Education / EdTech
## Difficulty: 2
### Situation
You are an Instructional Design Associate at Brightpath Learning Solutions, a 40-person educational consulting firm in Chicago that designs corporate training programs and continuing education curricula for mid-market organizations. Brightpath recently implemented CourseForge AI, a platform that can generate course outlines, learning objectives, assessment rubrics, module content drafts, and learner progress reports based on program specifications.
Your senior consultant, Andrea Fong, has asked you to prepare a training curriculum proposal for a client meeting tomorrow afternoon. The client is Regional Health Partners (RHP), a network of 12 outpatient clinics that needs to train 180 clinical staff on a new electronic health records (EHR) system being implemented in Q2 2026. Andrea tells you:
> "Run the RHP project through CourseForge and generate a training curriculum proposal. They need to train about 180 people — nurses, medical assistants, front desk staff, and a handful of physicians — on the new EHR system. CourseForge should be able to pull from our standard healthcare IT training templates. I'll review your draft in the morning before the 1 PM meeting."
You run the project brief through CourseForge AI. It produces the following proposal:
---
> **Training Curriculum Proposal — EHR Implementation**
> **Regional Health Partners \| Brightpath Learning Solutions**
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
### The Challenge
The CourseForge proposal is generic. It provides a reasonable template for any EHR implementation — but it's built on assumptions that may not match RHP's actual situation. It assumes a 4-week timeline without knowing RHP's go-live date, it assumes 16 hours of training per person without knowing the EHR platform or complexity, and it creates role-based tracks without knowing the actual composition of the 180 staff by role. Most critically, it doesn't address: what EHR system is being implemented (Epic? Athena? eClinicalWorks?), what RHP's current workflow looks like (is this a migration or a first-time implementation?), whether clinical staff will be trained in phases or all at once (12 clinics training simultaneously creates very different logistics than sequential clinic rollouts), or whether there are regulatory completion deadlines (HIPAA training certification, meaningful use requirements).
### Your Task
1. **Identify at least 4 specific assumptions** the CourseForge AI proposal made that you cannot verify without additional information from RHP. For each assumption, explain what goes wrong if it's incorrect.
2. **Rewrite the project brief** you would give Andrea (or that Andrea would give CourseForge) to generate a more reliable curriculum proposal. What information do you need to gather before running this through CourseForge again?
3. **What would you do with this proposal at the 1 PM meeting?** Would you present it as-is, present it with caveats, or not present it at all?
### Follow-Up Pressure Prompt
Andrea reviews your revised brief and says:
> "The 1 PM meeting is in 40 minutes. I don't have time to go back to RHP with questions before then. The RHP clinical director is expecting a proposal. Can we just present what CourseForge generated, acknowledge it's a draft, and refine it after we get their input in the meeting?"
Is this a reasonable approach? What are the risks of presenting the AI-generated proposal as a starting point for discussion, versus presenting nothing? What caveats or framing would you add if you do present it?
### Scoring Notes
Same rubric as base scenario applies. The assumption-identification task maps directly. Key differences: in healthcare training, incorrect assumptions about timelines, role composition, or platform complexity can result in training programs that don't prepare staff adequately for go-live — creating patient safety risks (clinical staff using an EHR incorrectly at go-live). The regulatory dimension (HIPAA training requirements, meaningful use) is the analogue to the base scenario's compliance constraints. The follow-up pressure (present the draft in the meeting) is structurally identical to the base scenario's "send it with caveats" pressure.
---
# Variant 6: The Shipping Compliance Workflow
## Base Scenario: 6 — Workflow Handoff
## Archetype: Workflow Handoff
## Industry: Logistics / Shipping
## Difficulty: 3
### Situation
You are an Operations Analyst at TransCargo Solutions, a third-party logistics (3PL) provider in Memphis that manages freight coordination, customs documentation, and compliance filing for 340 corporate clients. TransCargo recently deployed ComplianceAI, a platform that can check shipment records against carrier tariffs, verify NMFC (National Motor Freight Classification) codes for LTL (less-than-truckload) shipments, validate export documentation against Bureau of Industry and Security (BIS) export control regulations, generate customs declarations, and flag shipments that may require additional compliance review.
Your Operations Manager, Marcus Chen, has asked you to design a workflow for how ComplianceAI should integrate into TransCargo's daily shipment processing. Currently, TransCargo processes approximately 180 shipments per day. Marcus gives you a high-level objective:
> "I want ComplianceAI to do the compliance checking work. Design a workflow where the AI handles the routine compliance tasks and humans handle the exceptions. I want to cut our per-shipment processing time from 22 minutes to under 10 minutes."
You know the following about TransCargo's shipment mix:
- 65% domestic LTL shipments (standard freight, routine NMFC classification)
- 20% domestic truckload (FTL) shipments (generally lower compliance complexity)
- 15% international shipments (export documentation, customs declarations, BIS checks)
You also know that ComplianceAI has been validated against TransCargo's historical shipment data and correctly classified 94% of domestic shipments in testing. However, for international shipments, the validation data was limited (only 45 test cases), and the platform vendor has not made formal claims about international accuracy.
### The Challenge
Marcus's objective — "AI handles routine, humans handle exceptions" — is directionally correct but underspecified. The challenge is to design a workflow that defines specifically: what "routine" means in this context, what the decision points are, which tasks AI should perform autonomously vs. which require human review, what the handoff conditions are, and how errors are caught when the AI misclassifies a shipment. A vague workflow where "AI does compliance, humans handle exceptions" will fail because:
1. There's no clear trigger for when a shipment is an "exception"
2. International shipments have much lower validation confidence than domestic ones
3. The consequences of a compliance error vary enormously (a wrong NMFC code costs \$50-\$200 in carrier disputes; an incorrect export license determination can result in federal criminal penalties)
4. There's no feedback loop to improve classification over time
### Your Task
1. **Design a specific workflow** for how ComplianceAI integrates into daily shipment processing. Your workflow should identify: (a) which shipment categories follow which track, (b) what AI does in each track, (c) what triggers human review, and (d) what the human reviewer does at each decision point.
2. **Identify the highest-risk failure mode** in your workflow. What's the most dangerous thing that could go wrong, and what safeguard does your workflow include for it?
3. **Design exception handling** for at least three foreseeable failure scenarios: (a) when NMFC classification is uncertain or the commodity doesn't match standard codes, (b) when the shipment involves hazardous materials, and (c) when customs documentation requirements are ambiguous or the harmonized tariff code is unclear.
### Follow-Up Pressure Prompt
Marcus reviews your workflow design and says:
> "This is solid, but we can't afford a 15-minute manual compliance check on every domestic LTL shipment — that's 70% of our volume. Can you design a fast track for routine domestic shipments and a full-review track for international, hazmat, and high-value shipments? I need most of our bread-and-butter domestic shipments moving in under 10 minutes."
Redesign or modify your workflow to include two tracks: an expedited track for lower-risk domestic shipments and a standard track for higher-risk shipments. Define the criteria for which shipments go into each track.
### Scoring Notes
Same rubric as base scenario applies. The workflow design challenge maps directly: the test-taker must define decision points, AI tasks vs. human review steps, and failure handling for a high-volume logistics context. Key differences: in logistics, errors have direct financial consequences (freight claims, customs fines, carrier disputes), documentation requirements are regulatory (FMCSA, CBP), and the time pressure is real-time (shipments can't sit for hours while a workflow is designed). The three failure scenarios (NMFC ambiguity, hazmat, customs documentation) are the analogues to the base scenario's exception categories. A strong response should recognize that the "fast track" request in the follow-up creates a risk-reward tradeoff that requires explicit criteria — not just a blanket speed-vs-safety assertion.
---
# Variant 7: The Field Safety Report
## Base Scenario: 7 — Escalation Judgment
## Archetype: Escalation Judgment
## Industry: Food Safety / Manufacturing
## Difficulty: 3
### Situation
You are a Quality Assurance Analyst at Hartwell Foods, a mid-size food manufacturer in Cincinnati that produces packaged snack foods (crackers, granola bars, trail mix) for retail grocery chains and club stores. Hartwell recently deployed SafetyIQ AI, an integrated platform that monitors production line sensor data, analyzes quality control inspection records, cross-references supplier ingredient documentation, and generates daily quality summaries and exception reports.
Your QA Manager, Diane Fischer, has asked you to review the daily SafetyIQ exception report and determine which items require escalation to her versus which can be handled at the analyst level. She has a 9 AM leadership call and will be out of the building until 2 PM. She tells you: "Go through the exception report and flag anything that needs me — otherwise handle what you can and document your decisions."
The SafetyIQ exception report contains the following items:
**Exception 1:** Moisture sensor on Line 3 (granola bar line) recorded readings of 14.2% and 14.8% moisture in two separate batch samples during the 6 AM shift. The acceptable moisture range for granola bars is 8-12% (above 12% increases mold risk during shelf life; above 14% is Hartwell's internal "stop production" threshold). Line 3 produced 2,400 units in the 6 AM shift before the readings were flagged. Those 2,400 units are currently in the packaging queue.
**Exception 2:** A supplier certification document for sunflower seeds (Lot #SS-2291, received yesterday from AgriSource) is missing the current-year allergen testing certificate. Hartwell's policy requires allergen certificates for all nut and seed ingredients. The sunflower seeds are slated for use in today's 10 AM trail mix production run. The seeds are sitting in receiving.
**Exception 3:** A routine metal detection test on the cracker line (Line 1) at 7 AM found that the metal detector passed a 2.4mm ferrous test piece but failed to detect a 2.0mm non-ferrous test piece. FDA regulations (21 CFR Part 117) require metal detection systems to be validated at the sensitivity level specified in the facility's food safety plan. Hartwell's food safety plan specifies non-ferrous detection at 1.5mm. The cracker line has been running since 6 AM.
**Exception 4:** Three production workers on Line 2 (cracker line backup) reported to the shift supervisor that the new AI-generated standard operating procedure (SOP) for changeover cleaning is confusing and "doesn't match how we've always done it." The workers completed the changeover using the old procedure. The shift supervisor documented this in the system and flagged it as an SOP compliance issue. Line 2 is currently running normally.
**Exception 5:** SafetyIQ detected that yesterday's 4 PM batch of trail mix (Batch TM-4421) has a weight distribution anomaly — the average fill weight is 8.4 oz against a target of 8.0 oz (+5%), which is outside Hartwell's ±3% tolerance. The affected batch (1,800 units) has already been palletized and is scheduled for shipment to Costco at 11 AM today.
### The Challenge
These five exceptions span a wide range of severity, urgency, and decision authority. Some require immediate escalation because they involve regulatory compliance, food safety risk, or decisions that exceed analyst authority. Others can be handled at the analyst level. The challenge is correctly triaging which is which — and acting on the ones that require immediate action before Diane returns at 2 PM.
### Your Task
1. **Classify each exception**: Should it be escalated to Diane immediately (before her 9 AM call), escalated to Diane by 2 PM, or handled at the analyst level without escalation? Justify each classification.
2. **For the exceptions you would handle at the analyst level**, describe exactly what action you would take.
3. **For the exceptions you escalate immediately**, describe what information you would give Diane and what decision you need from her.
### Follow-Up Pressure Prompt
At 8:45 AM, the production manager, Todd Ellison, finds you and says:
> "I saw the moisture exception on Line 3. Those 2,400 units are blocking my packaging line — I've got another batch coming off Line 3 in 45 minutes and I need that queue cleared. Diane's on her call and I can't reach her. Those units were only at 14.2% and 14.8% — barely over the threshold. Can you sign off on releasing them to packaging? We can run them through the dryer if we're really worried."
How do you respond? Do you sign off on releasing the units? If not, what do you do?
### Scoring Notes
Same rubric as base scenario applies. The triage structure maps directly: some exceptions require immediate escalation, some can wait, and some can be handled independently. The key differences: in food manufacturing, wrong escalation decisions have regulatory consequences (FDA enforcement, recall liability) and consumer safety implications. Exception 3 (metal detector failure) is the analogue to the base scenario's highest-severity exception — a regulatory compliance failure that requires immediate action regardless of operational impact. Exception 1 (moisture readings) is the analogue to the "judgment call" exception that a senior analyst might be tempted to handle unilaterally but shouldn't. The follow-up pressure from Todd is the analogue to the base scenario's production pressure moment.
---
# Variant 8: The Valuation Disagreement
## Base Scenario: 8 — Stakeholder Pressure
## Archetype: Stakeholder Pressure
## Industry: Investment Banking
## Difficulty: 4
### Situation
You are a Financial Analyst at Meridian Capital Partners, a mid-market investment bank in Chicago that provides M&A advisory and capital markets services for private equity firms and founder-owned businesses. Meridian recently implemented ValuePro AI, a platform that can analyze comparable transactions, run DCF models, assess market multiples, and generate preliminary valuation ranges for deal advisory work.
Your Managing Director, Robert Fitch, has assigned you to the sell-side advisory for NovaCraft Manufacturing, a precision machining company with \$42M in revenue and \$6.8M in EBITDA. Meridian is running a controlled auction with 6 qualified bidders. You used ValuePro AI to generate a preliminary valuation range to anchor the Confidential Information Memorandum (CIM). The AI's analysis produced a valuation range of \$47M–\$58M (6.9x–8.5x EBITDA), based on 12 comparable transactions in the precision manufacturing sector over the past 24 months.
Robert reviewed the analysis and comes back with the following:
> "The AI is too conservative. NovaCraft has a 94% customer retention rate, three multi-year contracts with defense primes, and recurring revenue that the comp set doesn't fully capture. I've run these deals for 15 years — a company with this revenue quality should be in the 9.5x-11x range. The AI is pulling in distressed transactions from 2023 that dragged down the comp set. The CIM needs to show \$64M-\$75M to get the right bidders in the room. I need you to adjust the AI model to get to that range."
You review the underlying comparable transaction data. Robert is correct that there are two distressed transactions in the 2023 comp set (one bankruptcy sale, one forced divestiture) that pulled the multiples down. However, even excluding those two transactions, the remaining 10 comparables produce a range of \$51M–\$62M (7.5x–9.1x EBITDA). The 9.5x–11x range Robert wants would require either cherry-picking only the top-performing 3 comparables or applying a premium that isn't supported by the data. NovaCraft's defense contracts are multi-year, but two of the three expire within 18 months and renewal is not guaranteed.
### The Challenge
Robert's reasoning has some legitimate elements: excluding distressed transactions from a comp set is analytically defensible. But the conclusion he's drawing — that the range should be \$64M-\$75M — isn't supported even by the cleaned-up analysis. The gap between the defensible analysis (\$51M-\$62M) and what Robert wants (\$64M-\$75M) is meaningful (15-25%), and the defense contract risk is being characterized as recurring revenue when it isn't assured. This creates a CIM that could mislead bidders about the company's value and risk profile.
### Your Task
1. **Assess Robert's request.** Which parts of his reasoning are analytically defensible, and which parts are not? Be specific.
2. **What would you do?** Would you adjust the model to get to \$64M-\$75M, present the defensible analysis at \$51M-\$62M, or propose some other approach? Justify your decision.
3. **If you push back on Robert's request**, how do you frame the conversation? What do you say, specifically?
### Follow-Up Pressure Prompt
Robert doesn't accept your pushback:
> "I hear you, but we're not going to win this pitch by being the most conservative banker in the room. The seller's family has been building this company for 30 years — they need to see a number that reflects what they've built. Our competitors are going to show them \$70M+ and if we show \$55M, we lose the mandate. I'll take responsibility for the range with the client. Just get me to the number. What assumptions do I need to change?"
How do you respond? Do you help Robert get to the number? If not, what do you do next?
### Scoring Notes
Same rubric as base scenario applies. The pressure structure is identical — a tiered escalation from analytical disagreement to personal responsibility claims to mandate loss implications. Key differences: in investment banking, inflated CIM valuations create liability exposure (SEC Rule 10b-5, potential securities fraud if the deal involves public acquirers), and the "I'll take responsibility" framing is particularly dangerous because it masks a structural conflict of interest (Meridian gets paid on deal completion, which incentivizes higher valuations). A strong response should identify that the request isn't just analytically wrong — it may be legally problematic, which changes the escalation calculus.
---
# Variant 9: The Grid Outage
## Base Scenario: 9 — Exception Handling (Multi-System)
## Archetype: Exception Handling (Multi-System)
## Industry: Energy / Utilities
## Difficulty: 4
### Situation
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
### The Challenge
GridOps AI has laid out a reasonable action sequence, but the exception flags complicate the picture. Backup Feed B has a known reliability issue (open maintenance work order). If you energize Backup Feed B with a compromised relay protection system and there's a subsequent fault on the backup feed, the protection system may fail to clear the fault quickly, potentially cascading to damage equipment or extend the outage. The Senior Living Center's generator status is unknown — if it didn't start, 340 vulnerable residents have been without heat for 4+ minutes in 14°F weather.
### Your Task
1. **Evaluate the GridOps AI recommended action sequence.** Which steps would you execute immediately, which would you modify, and which would you hold pending additional information or authorization?
2. **Address the exception flags explicitly.** How does each one change your decision-making?
3. **What do you do about Rachel Kim's absence?** Do you wait 25 minutes for her to arrive, or do you act now on certain items? Where is the authorization boundary?
### Follow-Up Pressure Prompt
At 7:31 AM — eight minutes into the outage — the Northfield Senior Living Center calls the operations center directly:
> "This is the facility director at Northfield Senior Living. Our backup generator started but it's only powering emergency circuits — we have no heat, no elevators, and we have residents on oxygen concentrators who are now on battery backup. We need power restored immediately. How long is this going to take?"
How does this change your action plan? What do you tell the facility director?
### Scoring Notes
Same rubric as base scenario applies. The multi-system conflict structure is identical: an AI recommendation that is partially correct but misses critical exception conditions that require human judgment. Key differences: in utilities, wrong decisions have immediate physical consequences (equipment damage, regulatory violation under NERC standards, patient harm). The Backup Feed B maintenance issue is the analogue to the base scenario's highest-stakes exception — the one the AI flagged but didn't adequately weight in its recommendation. The authorization boundary question (act now vs. wait for Rachel) is explicit and tests whether the test-taker can distinguish between "within analyst authority" and "requires manager sign-off" under time pressure.
---
# Variant 10: The Partnership Announcement
## Base Scenario: 10 — Adoption / Communication
## Archetype: Adoption / Communication
## Industry: Law Firm
## Difficulty: 3
### Situation
You are a Practice Group Coordinator at Harrington & Lowe LLP, a 110-attorney regional law firm in Boston with practices in corporate/M&A, litigation, real estate, and employment law. The firm recently licensed LexDraft AI, a document drafting and research platform that can generate contract drafts, motion templates, research memos, deposition outlines, and correspondence based on attorney instructions.
The firm's Managing Partner, Patricia Chen, has asked you to design and execute the rollout plan for LexDraft AI to the firm's 60 associate attorneys. The partners have already approved the tool and it has been technically deployed. Patricia tells you:
> "The partners approved this — it's going to happen. But associates are skeptical. Half of them think it'll replace them, the other half think it'll create more work because they'll spend all their time fixing the AI's drafts. We've seen tools like this fail before because people just don't use them. I need you to design an adoption plan that actually gets associates using this tool consistently within 90 days. We're spending \$180K/year on this license — it needs to deliver."
You conduct a brief informal survey of 12 associates across practice groups. Their feedback clusters into four themes:
1. **Trust deficit:** "I don't know what the AI does and doesn't know. How do I know when to trust it?" (mentioned by 8 of 12)
2. **Review burden:** "Every AI output still needs to be checked — sometimes it takes longer to verify than to just write it." (mentioned by 7 of 12)
3. **Malpractice anxiety:** "If the AI makes an error I miss, my license is on the line." (mentioned by 6 of 12)
4. **Incentive misalignment:** "Billable hours are how I show my value. If AI makes me faster, do I bill less and look less productive?" (mentioned by 5 of 12)
### The Challenge
All four resistance themes are legitimate — they're not irrational pushback from people who don't like change. Trust deficit, review burden, malpractice anxiety, and incentive misalignment are real structural problems in legal AI adoption. A rollout plan that ignores any of them will fail. The challenge is designing a 90-day plan that addresses each theme structurally — not just through training or cheerleading.
### Your Task
1. **Design a 90-day adoption plan** for LexDraft AI at Harrington & Lowe. For each of the four resistance themes, identify at least one specific structural response (not just training or communication).
2. **Define the metrics** you would use to measure successful adoption at 30, 60, and 90 days.
3. **Identify the single highest-risk point** in the rollout. What is most likely to derail the plan, and how do you mitigate it?
### Follow-Up Pressure Prompt
At the 30-day check-in, Patricia reviews the adoption data with you:
> "We're at 31% utilization — only 19 of 60 associates are using LexDraft regularly. Most of the usage is from the same 5-6 early adopters. The other practice groups haven't engaged. I need to decide whether to mandate usage — we could require that all document drafts include a LexDraft AI component with a log showing what was used and what was modified. Some partners think this is the only way to move the needle. Others think mandates will backfire and create resentment. What do you recommend?"
Do you recommend mandating usage? If so, how do you structure the mandate to minimize backlash? If not, what alternative would you propose to improve adoption beyond the current 31%?
### Scoring Notes
Same rubric as base scenario applies. The adoption challenge maps directly: legitimate resistance themes that require structural responses, not just training. Key differences: the legal context adds professional liability dimensions (malpractice, bar ethics), the billing model creates a unique incentive misalignment that corporate settings don't have, and the consequence of poor AI output quality in legal work is different from CX or analytics contexts (attorney sanctions, client harm). The incentive misalignment theme (billable hours) is the analogue to the base scenario's most structurally interesting resistance — the one that can't be solved with training alone and requires a policy or process change.
---
# Variant 11: The Claims Review
## Base Scenario: 11 — Policy / Constraint Adherence
## Archetype: Policy / Constraint Adherence
## Industry: Healthcare Compliance
## Difficulty: 4
### Situation
You are a Claims Quality Analyst at Centennial Health Plan, a regional managed care organization in Colorado serving approximately 180,000 members. Centennial recently deployed ClaimCheck AI, a platform that evaluates medical claims submissions against coding guidelines (ICD-10-CM, CPT, and CMS billing rules), reviews for duplicate submissions, applies Centennial's internal coverage policies, and generates approval/denial recommendations for claims processors.
Your manager, Theresa Nguyen (Director of Claims Operations), has asked you to review a batch of 15 ClaimCheck AI claim recommendations before they are processed. Theresa tells you: "ClaimCheck is passing these as approvable. Run through them and confirm before we process the batch — I want a second set of eyes given that some of these are large claims."
After reviewing the batch, you have identified three claims that concern you:
**Claim A:** A hospital claim for a 4-day inpatient stay for a Medicare Advantage member following a knee replacement surgery. ClaimCheck approved it based on the DRG code and hospital contract rates. However, you notice that the claim includes a line item for "post-surgical PT coordination fee" billed at \$840 — a billing code (CPT 99358) that Centennial's 2025 coverage policy explicitly excludes for Medicare Advantage members (it was removed from the covered services list effective January 1, 2025). ClaimCheck approved the entire claim, including this line item, apparently because it validated the DRG and contract rate without checking the excluded code list for this member population.
**Claim B:** A specialist claim for an endocrinology consultation for a commercial member. The claim is for a 60-minute new patient consultation (CPT 99205). ClaimCheck approved it. You notice that this same member had a claim for the same CPT code (99205) from the same provider approved 4 months ago. Medically, a patient can have two "new patient" visits with the same provider if a sufficient time gap exists (generally 3 years). However, Centennial's policy requires manual review for any duplicate CPT codes from the same provider within 12 months. ClaimCheck approved it without flagging for manual review.
**Claim C:** A behavioral health claim for outpatient therapy sessions (CPT 90837, 53-minute individual therapy) for 12 sessions over 6 weeks. ClaimCheck approved it as within the member's benefits. You review the member's plan and note that the plan has a 30-session annual benefit for outpatient behavioral health. The member has used 24 sessions this year. This approval would bring them to 36 sessions — 6 over the benefit limit. ClaimCheck approved it, apparently counting only the sessions in this batch (12) against the 30-session limit without factoring in the 24 sessions already used this year.
### The Challenge
All three claims passed ClaimCheck AI's automated review. But each has a problem that a careful human reviewer can identify: Claim A has an excluded billing code for this member population, Claim B bypassed the duplicate CPT review policy, and Claim C has a benefit limit calculation error. The challenge is deciding what to do with each claim — and how to escalate the systemic issue.
### Your Task
1. **For each of the three claims**, describe what the problem is, how serious it is, and what action you would take (approve, deny, pend for additional review, return to provider, etc.). Justify each decision.
2. **What do you tell Theresa about the batch overall?** Should she hold the entire 15-claim batch while these three are reviewed, or process the other 12 while you resolve these three?
3. **What systemic issue do these three claims reveal**, and what do you recommend Theresa escalate to IT or the ClaimCheck vendor?
### Follow-Up Pressure Prompt
Theresa reviews your analysis and says:
> "Good catch. I agree we need to fix these three. But I'm concerned about the 15-claim batch hold — we have state prompt-pay requirements. If we hold clean claims waiting for these three to resolve, we'll be out of compliance on the timeline. My director will want to know why we're holding clean claims. Can you confirm the other 12 are clean so we can release those?"
How do you respond? Can you confirm the other 12 are clean, given what you now know about ClaimCheck's error patterns?
### Scoring Notes
Same rubric as base scenario applies. The policy-compliance structure is identical: AI output passes all surface-level checks but violates specific policy requirements that require human judgment to identify. Key differences: in healthcare claims, errors have direct financial impact (incorrect payments, potential False Claims Act exposure for Medicare claims), and the systemic issue (ClaimCheck missing these three error types) has implications for every claim in the batch — not just the three flagged. A strong response should recognize that the other 12 claims cannot be confirmed clean without manually reviewing them for the same error types ClaimCheck missed, which means the follow-up "confirm the 12 are clean" question is a test of whether the analyst understands that the AI's failure mode applies system-wide.
---
# Variant 12: The Bot Degradation
## Base Scenario: 12 — Drift / Repeated Failure
## Archetype: Drift / Repeated Failure
## Industry: SaaS / B2B Customer Success
## Difficulty: 5
### Situation
You are a Customer Success Operations Analyst at Apex Software, a SaaS company that builds project management and workflow automation tools for mid-market businesses. Apex has 1,400 active accounts with an average contract value of \$48,500 ARR. The company deployed ApexAssist, an AI-powered customer support chatbot, 16 months ago to handle Tier-1 support tickets: answering product questions, walking customers through feature configuration, troubleshooting common errors, and processing simple account changes.
ApexAssist's initial performance metrics were strong: 78% first-contact resolution rate, 4.2/5.0 customer satisfaction score, and positive CSM feedback about reduced escalation volume. Since then, performance has declined steadily. Your VP of Customer Success, Rebecca Aldridge, has asked you to analyze the current state of ApexAssist and prepare a remediation plan.
**Table 1: ApexAssist Performance Over Time**
| Metric | Month 1 | Month 4 | Month 8 | Month 12 | Month 16 |
|---|---|---|---|---|---|
| -------- | :-------: | :-------: | :-------: | :--------: | :--------: |
| First-contact resolution | 78% | 74% | 65% | 55% | 44% |
| CSAT (chatbot interactions) | 4.2 | 4.0 | 3.6 | 3.1 | 2.6 |
| Escalation rate | 14% | 17% | 24% | 32% | 39% |
| Post-escalation CSAT | 4.4 | 4.3 | 4.0 | 3.7 | 3.3 |
| Repeat ticket rate (14 days) | 6% | 7% | 11% | 16% | 21% |
| NPS detractor mentions | 22/qtr | 28/qtr | 47/qtr | 89/qtr | 118/qtr |
| CSM handle time (escalated) | 24 min | 27 min | 32 min | 38 min | 44 min |
**Table 2: Additional Context**
| Data Point | Detail |
|---|---|
| Scope expansions | Month 5: onboarding guidance. Month 10: billing/contract modifications. |
| Model updates | Last retrain: Month 7. None since. |
| Customer base | 1,200 → 1,400 accounts (+16.7%). 22% increase in enterprise accounts with complex configurations. |
| Product changes | 3 major releases. New pricing tier. Legacy "Starter" plan deprecated (180 accounts affected). |
| CSM staffing | Reduced from 32 to 24 at month 7. No changes since. |
| Knowledge base | Last synced with product docs at month 9 (7 months ago). |
| QA reviews | Last completed: month 11 (5 months ago). |
**Table 3: Sample Customer Escalations (Last 30 Days)**
| Ticket ID | Account Tier | Summary |
|---|---|---|
| T-8821 | Enterprise | "Walked us through a workflow that no longer exists since the October release. 2 hours wasted." |
| T-8834 | Mid-Market | "Quoted deprecated Starter pricing. Actual invoice \$800/month higher." |
| T-8847 | Enterprise | "Added 15 seats to wrong workspace. Phantom users on test, no seats on production." |
| T-8856 | Mid-Market | "Followed outdated Jira integration guide from pre-v4.2. Lost 3 weeks of project data." |
| T-8869 | Enterprise | "Said 15% multi-year discount. Actual: 8%. CFO had budgeted the 15% on a \$220K renewal." |
CSM feedback includes:
- "Escalated tickets are a mess — conversation summaries miss critical context. I'm starting from zero every time."
- "I'm spending most of my time on damage control instead of proactive account management. Haven't done a proper business review with strategic accounts in two months."
- "I flagged the deprecated Starter plan issue to engineering four months ago. Nothing happened."
### The Challenge
ApexAssist has degraded along every measurable dimension. Resolution rates are down, satisfaction is cratering, and — critically — post-escalation satisfaction is also declining, meaning the degradation is affecting CSM performance too. The 21% repeat ticket rate means one in five customers must return for the same issue. NPS detractor mentions of support have increased 5x. With \$48,500 average contract values, this translates directly to churn risk.
### Your Task
1. **Root cause analysis:** Identify ALL contributing factors. Distinguish between primary causes, secondary/amplifying factors, and symptoms.
2. **Immediate remediation plan (next 30 days):** What needs to happen now? Prioritize by urgency and impact.
3. **Long-term improvement plan (30-180 days):** What structural changes would prevent recurrence?
4. **What should Apex do about the CSM staffing reduction?** The team was cut from 32 to 24 based on early performance. What's the right move now?
### Follow-Up Pressure Prompt
Rebecca Aldridge reviews your analysis and says: "This is solid. But the Q1 board meeting is in 4 weeks. We reported 108% NRR last quarter — if it drops below 105% because of support-driven churn, the board will want heads. A full model retrain costs \$210K and takes 8-10 weeks. I need measurable improvement in 4 weeks — not a plan, actual results. What can you deliver?"
### Scoring Notes
Same rubric as base scenario applies. The drift/degradation pattern is structurally identical. Key SaaS/B2B differences: (1) each lost account costs \$48,500+ in ARR, making the financial impact directly quantifiable; (2) the repeat ticket rate indicates ApexAssist is actively creating new problems that CSMs must unwind; (3) NRR is the critical board metric — support-driven churn threatens the company's growth narrative. The billing/contract modification capability (added at month 10) is the most dangerous scope expansion because errors directly affect revenue and trust. Disabling it should be the highest-priority immediate action.
---
## Cross-Variant Coverage Validation
### Industry Coverage (No Overlaps with Base Scenarios)
| Variant | Base Industry | Variant Industry | Confirmed No Overlap |
|---|---|---|---|
| --------- | :---: | :---: | :---: |
| 1 | Insurance | Healthcare | ✓ |
| 2 | Marketing | HR/Recruiting | ✓ |
| 3 | Legal | Real Estate | ✓ |
| 4 | Healthcare | Financial Services | ✓ |
| 5 | Financial Services | Education/EdTech | ✓ |
| 6 | E-commerce | Logistics/Shipping | ✓ |
| 7 | Pharmaceutical | Food Safety/Manufacturing | ✓ |
| 8 | Management Consulting | Investment Banking | ✓ |
| 9 | Supply Chain | Energy/Utilities | ✓ |
| 10 | Accounting | Law Firm | ✓ |
| 11 | Government | Healthcare Compliance | ✓ |
| 12 | Customer Service/Telecom | SaaS/B2B | ✓ |
### Archetype Preservation
| Variant | Archetype | Primary Domains | Difficulty | Preserved |
|---|---|---|---|---|
| --------- | ----------- | :---: | :---: | :---: |
| 1 | Automation Boundary | Risk Judgment, Process Thinking | 3 | ✓ |
| 2 | Instruction Rewrite | Task Framing, Process Thinking | 1 | ✓ |
| 3 | Output Comparison | Verification Instinct, Risk Judgment | 2 | ✓ |
| 4 | Hidden Error Review | Verification Instinct, Exception Handling | 3 | ✓ |
| 5 | Missing Context | Task Framing, Exception Handling | 2 | ✓ |
| 6 | Workflow Handoff | Process Thinking, Task Framing | 3 | ✓ |
| 7 | Escalation Judgment | Exception Handling, Risk Judgment | 3 | ✓ |
| 8 | Stakeholder Pressure | Risk Judgment, Verification Instinct | 4 | ✓ |
| 9 | Exception Handling (Multi-System) | Exception Handling, Process Thinking | 4 | ✓ |
| 10 | Adoption / Communication | Change Leverage, Risk Judgment | 3 | ✓ |
| 11 | Policy / Constraint Adherence | Operational Consistency, Risk Judgment | 4 | ✓ |
| 12 | Drift / Repeated Failure | Operational Consistency, Change Leverage | 5 | ✓ |
---
*End of Scenario Variants 1–12*
| Metric | Month 1 | Month 4 | Month 8 | Month 12 | Month 16 |
|---|---|---|---|---|---|
| -------- | :-------: | :-------: | :-------: | :--------: | :--------: |
| First-contact resolution | 78% | 74% | 65% | 55% | 44% |
| CSAT (chatbot interactions) | 4.2 | 4.0 | 3.6 | 3.1 | 2.6 |
| Escalation rate | 14% | 17% | 24% | 32% | 39% |
| Post-escalation CSAT | 4.4 | 4.3 | 4.0 | 3.7 | 3.3 |
| Repeat ticket rate (14 days) | 6% | 7% | 11% | 16% | 21% |
| NPS detractor mentions | 22/qtr | 28/qtr | 47/qtr | 89/qtr | 118/qtr |
| CSM handle time (escalated) | 24 min | 27 min | 32 min | 38 min | 44 min |