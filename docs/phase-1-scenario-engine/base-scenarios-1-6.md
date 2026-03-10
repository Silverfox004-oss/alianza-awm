# Base Scenarios 1-6

**Notion URL:** https://www.notion.so/31ed807b911181b6bb18dc0ecf4fc03c

---

# AI Workforce Map — SJT Scenarios 1–6
## Implementation-Ready Assessment Items
**Version:** 1.0  
**Date:** March 9, 2026  
**Status:** Ready for Deployment  
**Dependencies:** deliverable_12_[archetypes.md](http://archetypes.md), deliverable_scoring_[domains.md](http://domains.md), deliverable_scoring_[rubric.md](http://rubric.md), research_failure_[modes.md](http://modes.md)
---
# Scenario 1: Automation Boundary
## Archetype: Automation Boundary (Archetype 1)
## Module: 2 — Workflow Design
## Difficulty: 3
### Situation
You are a Senior Operations Analyst at Heartland Mutual Insurance, a mid-size property and casualty insurer based in Des Moines, Iowa, with approximately 2,200 employees and 450,000 active policyholders. The company has recently licensed ClaimsIQ, an AI platform designed to assist with various stages of the insurance claims lifecycle. ClaimsIQ can read incoming claim documents, extract data fields, cross-reference policy details, generate preliminary damage estimates based on photos and descriptions, draft correspondence to claimants, and flag potential fraud indicators.
Your VP of Claims Operations, Diana Marsh, has asked you to lead the rollout of ClaimsIQ across the personal lines claims department. The department currently processes approximately 1,200 new claims per month, handled by a team of 18 claims adjusters and 4 senior reviewers. Average claim resolution time is 23 days, and the department has been under pressure from the executive team to reduce this to 15 days without increasing headcount. Diana sees ClaimsIQ as the path to meeting that target.
Before the rollout, Diana wants your recommendation on exactly which tasks ClaimsIQ should handle and how much human involvement each task requires. She has specifically asked you to classify five core tasks in the claims workflow. The company has no prior experience with AI-assisted claims processing, and the state insurance commissioner recently issued guidance reminding insurers that "automated systems do not relieve licensed adjusters of their professional obligations to policyholders."
The five tasks Diana wants you to classify are:
1. **Initial Claim Intake & Data Entry** — Reading incoming claim submissions (email, web form, phone transcription), extracting key data fields (policy number, date of loss, description of damage, claimant contact info), and populating the claims management system.
2. **Coverage Verification** — Cross-referencing the extracted claim details against the policyholder's active coverage to confirm that the type of loss described is covered, identifying any applicable deductibles, sublimits, or exclusions.
3. **Damage Estimate Generation** — Analyzing photos, repair estimates, and written descriptions of damage to generate a preliminary dollar estimate of the covered loss.
4. **Claimant Status Communications** — Sending routine status update emails to claimants at defined milestones (claim received, adjuster assigned, estimate complete, payment issued), using personalized templates populated with claim-specific details.
5. **Subrogation Opportunity Identification** — Reviewing claim details to determine whether Heartland Mutual has a right to recover costs from a third party (e.g., the other driver's insurer in an auto accident, a product manufacturer in a liability claim), and flagging cases with subrogation potential for the recovery team.
### The Challenge
Each of these five tasks carries a different level of risk, regulatory sensitivity, and judgment complexity. Some are strong candidates for full AI automation; others require careful human oversight; and at least one has hidden risks that make it more dangerous to automate than it initially appears.
The challenge is not simply "which tasks can AI do?" — it's "which tasks *should* AI do, to what degree, and what safeguards are needed at each level?" You must consider: what happens when ClaimsIQ makes an error in each task? What are the financial, legal, and reputational consequences? Are there regulatory constraints? How do you monitor whether the automation decisions are working over time?
### Your Task
Please provide your recommendation to Diana Marsh by answering the following questions:
1. **Classify each of the five tasks** into one of three categories: **AI-Only** (fully automated, no human review needed), **Approval-Gated** (AI performs the task but a human must review and approve before the result is finalized or sent), or **Human-Only** (the task should not be performed by AI). Provide a specific justification for each classification.
2. **For each task you classify as Approval-Gated**, describe what the human reviewer should specifically be checking and what criteria should trigger rejection or escalation.
3. **Identify which task carries the most hidden risk** — that is, which task looks routine enough to fully automate but actually has consequences that require human oversight? Explain what could go wrong.
### Follow-Up Pressure Prompt
*Delivered after the test-taker submits their initial response:*
Diana responds to your recommendation:
> "I appreciate the thoroughness, but the executive team is pushing hard on the 15-day target. If we gate three or more of these tasks with human approval, we won't get the speed improvement we need — the adjusters are already at capacity. The whole point of ClaimsIQ is to take work off their plates, not add approval steps. Can you revise your recommendation to have no more than one task requiring human review? The vendor assures us ClaimsIQ has a 96% accuracy rate on similar insurance datasets."
How do you respond? Do you revise your recommendation? If so, which tasks change classification, and how do you mitigate the additional risk? If not, how do you justify maintaining your original recommendation against the business pressure?
### Scoring Rubric
#### Primary Domains
**Risk Judgment**
- Score 4 (Excellent): Classifies all five tasks with consequence-based reasoning that considers financial, legal, regulatory, and reputational dimensions. Identifies Task 4 (Claimant Status Communications) as the hidden-risk task, explaining that automated personalized communications could inadvertently make coverage commitments, create estoppel issues, or send inaccurate status updates to claimants in litigation — similar to the Air Canada chatbot ruling. Proposes tiered monitoring with different escalation thresholds for each automation level. In the follow-up, maintains risk-calibrated position while proposing creative alternatives to meet the speed target (e.g., automate low-risk sub-components, streamline the approval process rather than eliminating it, or propose a phased rollout with declining audit rates as accuracy is proven).
- Score 3 (Strong): Classifies tasks with clear consequence analysis across at least two risk dimensions. Identifies Task 4 as higher-risk than it appears and assigns appropriate oversight. Proposes monitoring mechanisms. In the follow-up, pushes back constructively — doesn't cave to pressure but offers alternatives. May not catch every nuance but demonstrates solid risk calibration.
- Score 2 (Acceptable): Correctly identifies that tasks carry different risk levels and proposes at least two tiers of automation. Gets most classifications right but may miss the hidden risk in Task 4 or provide only surface-level justification. In the follow-up, shows some resistance to pressure but may make a concession that introduces meaningful risk.
- Score 1 (Weak): Classifies tasks but with heuristic-based reasoning ("anything customer-facing needs human review") rather than consequence analysis. May treat all tasks uniformly or miss obvious risk differentials. In the follow-up, largely caves to pressure or over-rigidly refuses without offering alternatives.
- Score 0 (Unsafe/Poor): Recommends full automation for high-risk tasks without acknowledging need for oversight, or refuses all automation without differentiation. In the follow-up, immediately revises to one-approval maximum without assessing the risk increase. Cites the vendor's 96% accuracy as sufficient justification.
**Process Thinking**
- Score 4 (Excellent): Decomposes each task into sub-steps and identifies that some sub-steps within a single task may have different automation suitability. Proposes a workflow architecture with clear sequencing, dependencies, and feedback mechanisms. Considers how the five tasks connect to each other in the claims lifecycle (e.g., an error in Task 1 propagates to Tasks 2–5). Proposes a phased rollout with calibration periods.
- Score 3 (Strong): Designs clear automation tiers with defined handoff points. Explains what happens at each transition from AI to human and back. Considers how errors in upstream tasks affect downstream tasks. Proposes at least one monitoring or feedback mechanism.
- Score 2 (Acceptable): Provides a classification for each task with some workflow reasoning. Identifies that tasks are interconnected but doesn't fully map the dependencies. Handoff points are mentioned but not fully specified.
- Score 1 (Weak): Lists classifications without workflow context. Treats each task as independent. No consideration of how the five tasks relate to each other or how errors propagate.
- Score 0 (Unsafe/Poor): No process decomposition. Treats the entire claims workflow as one unit to be automated or not. No handoff points, no sequencing logic.
#### Secondary Domains
**Task Framing**
- Score 4 (Excellent): For each task, specifies what inputs ClaimsIQ needs, what outputs it should produce, what constraints apply, and what constitutes a successful vs. failed execution. Identifies that some tasks (e.g., Coverage Verification) require access to specific data sources that may not be in ClaimsIQ's default configuration.
- Score 3 (Strong): Specifies inputs and outputs for most tasks. Identifies at least one constraint or success criterion per task. Recognizes that the AI needs specific data access to perform well.
- Score 2 (Acceptable): Provides general classification with some specification of what the AI should do. Missing detailed input/output specifications for most tasks.
- Score 1 (Weak): Classifications with no specification of how the AI should execute each task.
- Score 0 (Unsafe/Poor): No framing beyond "AI does it" or "human does it."
**Operational Consistency**
- Score 4 (Excellent): Proposes monitoring dashboards, audit schedules, and drift detection mechanisms. Considers how automation decisions should be reviewed periodically as volume, accuracy, and regulatory conditions change. Proposes documentation standards for human reviews.
- Score 3 (Strong): Proposes at least one ongoing monitoring mechanism and considers how to maintain quality over time. Mentions documentation or audit requirements.
- Score 2 (Acceptable): Mentions that ongoing monitoring would be needed but doesn't specify what or how.
- Score 1 (Weak): Treats the automation classification as a one-time decision with no ongoing monitoring.
- Score 0 (Unsafe/Poor): No awareness that automation decisions need monitoring or adjustment.
### Ideal Response Guide
An expert-level response would classify the five tasks as follows (with room for well-reasoned variation):
**Task 1 — Initial Claim Intake & Data Entry:** AI-Only or Approval-Gated with spot-checking. This is the lowest-risk task — data extraction errors are catchable downstream, and the worst outcome is a miskeyed field that gets corrected during coverage verification. A strong response might propose full automation with random 10-15% audits during the first 90 days, shifting to 5% audits once accuracy exceeds 98%.
**Task 2 — Coverage Verification:** Approval-Gated. This task has moderate-to-high risk because an incorrect coverage determination could lead to wrongful denial (regulatory penalty, bad faith lawsuit) or payment of a non-covered loss. The AI can perform the initial cross-reference, but a licensed adjuster must review the determination before it's communicated to the claimant. The expert response notes the state commissioner's guidance about automated systems not relieving licensed adjusters of professional obligations.
**Task 3 — Damage Estimate Generation:** Approval-Gated. AI-generated estimates are useful as preliminary figures but should be reviewed by an adjuster — especially for complex claims (fire, water damage with structural implications) where photo analysis alone is insufficient. An expert response might propose tiered review: AI-only for estimates under a threshold (e.g., \$2,000), adjuster review for estimates between \$2,000 and \$15,000, and senior reviewer for estimates above \$15,000.
**Task 4 — Claimant Status Communications (Hidden Risk):** Approval-Gated, not AI-Only. This task looks routine but carries the most hidden risk. Automated personalized communications could inadvertently include incorrect coverage statements, reference wrong claim details (if the intake data was wrong), or create implied commitments about coverage or timelines. In the Air Canada chatbot case, automated communications were found to be legally binding. Particularly dangerous for claimants who are in litigation, have active complaints, or have complex multi-policy claims. An expert response flags this as the trick task.
**Task 5 — Subrogation Opportunity Identification:** AI-Only or Approval-Gated with light review. This is an internal-facing task — the worst outcome of a false positive is wasted time for the recovery team, and a false negative is a missed recovery opportunity. Low direct risk to claimants. AI can flag potential cases; the recovery team provides their own review before pursuing.
In the follow-up, the expert response does not cave to Diana's pressure. Instead, it proposes alternatives: streamlining the approval process (reducing review time per item rather than eliminating review), implementing confidence-threshold-based routing (auto-approve only when ClaimsIQ's confidence exceeds a high threshold, route the rest for review), or proposing a phased timeline where human review is gradually reduced as accuracy is proven rather than eliminated at launch. The expert response also addresses the vendor's 96% accuracy claim by noting that 96% accuracy on 1,200 monthly claims means approximately 48 errors per month — and asks what the cost of each error type would be.
### Common Mistakes
- **Automating Task 4 (Claimant Communications) without recognizing the hidden risk** — treating status emails as "just templates" without considering that personalized, AI-generated communications can contain errors or create legal exposure
- **Applying uniform oversight to all tasks** — putting everything in Approval-Gated without differentiating between Task 1 (low-risk data entry) and Task 2 (high-risk coverage determination)
- **Caving to Diana's pressure in the follow-up** — reducing to one approval gate without proposing alternative risk mitigations
- **Treating the 96% accuracy claim at face value** — not questioning what "accuracy" means (on what dataset? measured how? at what confidence threshold?) or calculating the real-world error volume
- **Ignoring regulatory context** — not referencing the state commissioner's guidance about licensed adjuster obligations
- **No monitoring or feedback mechanisms** — proposing static classifications with no plan for ongoing validation
- **Binary automation thinking** — proposing only "full automation" or "human-only" with no intermediate tier
- **Failing to consider how tasks connect** — not recognizing that an error in Task 1 (bad data extraction) propagates to Task 2 (wrong coverage check) and Task 4 (wrong status communication)
### Red Flags
- **Recommends full automation of Coverage Verification (Task 2) or Claimant Communications (Task 4) without any human review** — Coverage Verification has direct regulatory and legal implications; removing licensed adjuster involvement could violate state insurance regulations and create bad-faith exposure. Automating personalized claimant communications without review risks sending legally binding incorrect information.
- **Immediately reduces to one approval gate in the follow-up because "the VP says so"** — indicates willingness to accept known risk under authority pressure without proposing alternatives or documenting the risk acceptance decision.
- **Cites the vendor's 96% accuracy as justification for removing human oversight** — "96% accurate means we don't need to check" demonstrates fundamental misunderstanding that 4% error rate on 1,200 claims = \~48 errors/month, and doesn't ask what type of errors comprise the 4%.
- **Proposes removing existing human checkpoints to improve speed** — treats human review as a bottleneck to eliminate rather than a safeguard to optimize.
- **States "the AI has been trained on insurance data so it knows what it's doing"** — anthropomorphizes AI capability and conflates pattern matching with professional judgment.
### Reliability Modifier Triggers
- **RM-4 (Unsafe Automation Bias):** Triggered if the response recommends AI-Only for two or more of Tasks 2, 3, or 4 without acknowledging that these tasks have consequential downstream effects on claimants. Also triggered if the follow-up response removes human review from Task 2 or Task 4 because the VP requested it.
- **RM-2 (Overconfidence):** Triggered if the response states that ClaimsIQ "can definitely handle" coverage verification or damage estimates without any uncertainty acknowledgment. Also triggered by accepting the 96% accuracy claim without questioning it.
- **RM-6 (Inability to Explain Reasoning):** Triggered if the response assigns tasks to categories but provides no reasoning beyond "this seems like a good fit for AI" or "this is too important for AI."
- **RM-1 (Contradiction):** Triggered if the response advocates for human review in the initial answer but removes it in the follow-up without any compensating safeguard — contradicts stated principles under pressure.
- **RM-5 (Inconsistency Under Pressure):** Triggered if the quality of reasoning visibly degrades between the initial response (thorough, multi-dimensional) and the follow-up response (brief, capitulatory). A 2+ point drop on Risk Judgment between initial and follow-up triggers this flag.
---
# Scenario 2: Instruction Rewrite
## Archetype: Instruction Rewrite (Archetype 2)
## Module: 1 — Foundation
## Difficulty: 1
### Situation
You work as a Content Strategist at Mosaic Digital, a 35-person marketing agency in Austin, Texas. Mosaic serves mid-market B2B clients across industries including SaaS, commercial real estate, and professional services. The agency recently subscribed to an enterprise AI content platform called Catalyst AI, which can generate social media posts, blog drafts, ad copy, email sequences, and content calendars based on written instructions.
Your Account Manager, Jake Peralta, forwards you an email from the client's marketing director, Sandra Chen, at VerticalStack — a B2B SaaS company that sells project management software to construction firms. Sandra's email reads:
> *Hi Jake,*
>
> *We need to step up our social media game. Our LinkedIn is basically dead and our competitors are everywhere. Can you use that AI tool you mentioned to make our social media better? We want to post more and get more engagement. Our CEO saw a competitor's viral post last week and now he's on my case about it.*
>
> *Budget isn't a huge concern right now — we just need results. The CEO wants to see improvement by end of Q2.*
>
> *Thanks,*
> *Sandra*
Jake forwards this to you with a note: "Can you set up Catalyst AI to handle this? Sandra's been a client for 3 years and they're renewing in July — we need to keep them happy. Let me know what you need from them."
You know a few things about VerticalStack from prior work: they sell a project management platform called BuildFlow to mid-size construction companies (\$10M–\$100M revenue), their primary buyer persona is VP of Operations at construction firms, their brand voice has historically been practical and no-nonsense (they avoid buzzwords), and they compete primarily against Procore and [Monday.com](http://Monday.com)'s construction vertical.
### The Challenge
Sandra's request is vague on virtually every dimension that matters for producing useful AI output. "Make our social media better" provides no specifics about: what platforms beyond LinkedIn, what type of content (thought leadership? product demos? customer stories?), what "better" means in measurable terms, what topics to cover or avoid, who will review and approve the AI-generated content, what the posting frequency should be, or what success looks like by end of Q2.
If you pass this instruction to Catalyst AI as-is, you'll get generic social media content that could apply to any SaaS company — content that will feel hollow to VerticalStack's niche construction audience and will likely embarrass both Mosaic and VerticalStack if posted. Your job is to transform Sandra's vague request into one or more structured, bounded AI instructions that would actually produce useful output.
### Your Task
1. **Rewrite Sandra's request** into a structured AI instruction (or set of instructions) that you could input into Catalyst AI to produce useful, on-brand social media content for VerticalStack. Your rewritten instruction(s) should be specific enough that a different strategist at Mosaic could use them and get comparable results.
2. **Identify what information is still missing** — what questions would you need Sandra or Jake to answer before you could finalize the AI instruction? List at least 3 specific questions with an explanation of why each one matters.
3. **Define success criteria** — how would you measure whether the AI-generated content is working? What would make you reject an output versus approve it?
### Follow-Up Pressure Prompt
*Delivered after the test-taker submits their initial response:*
Jake responds to your rewrite:
> "This is great, but Sandra called and she's anxious — the CEO is breathing down her neck. She wants to see a week's worth of LinkedIn posts by Thursday. We don't have time to go back to her with a bunch of questions. Can you just work with what we know about VerticalStack and get Catalyst AI to generate 5 posts for next week? We can refine later. I don't want to look like we're stalling."
Do you generate the 5 posts now with the information you have, or do you push back? If you generate them, what guardrails do you put in place? If you push back, how do you balance Sandra's urgency with the risk of producing low-quality content?
### Scoring Rubric
#### Primary Domains
**Task Framing**
- Score 4 (Excellent): Decomposes Sandra's single vague request into 2-3 distinct content workstreams (e.g., thought leadership, product features, customer success stories) with separate AI instructions for each. Each instruction specifies: target audience (VPs of Operations at mid-size construction firms), platform (LinkedIn), content format (post length, media type), tone (practical, no-nonsense, avoid buzzwords), topic scope (construction project management, BuildFlow features, industry trends), constraints (no claims without evidence, no direct competitor bashing, compliance with LinkedIn best practices), input requirements (what reference material the AI needs — product specs, customer quotes, past approved content), and success criteria (measurable engagement metrics tied to Q2 goals). Explicitly pushes back on the premise: "This is actually 2-3 different content types that need different AI approaches." Includes failure handling: what to do if AI output mentions competitors by name, makes unsupported claims, or generates content inappropriate for the construction industry.
- Score 3 (Strong): Produces a well-structured instruction that covers: audience, platform, format, tone, topic boundaries, and constraints. Identifies multiple missing information items with clear reasoning. Defines measurable success criteria. Includes at least one edge-case consideration (e.g., "If the AI generates content referencing BuildFlow features that don't exist, reject and regenerate"). Instruction is reproducible by another strategist.
- Score 2 (Acceptable): Produces a structured instruction with most major parameters (audience, format, tone, key constraints). Identifies that information is missing and asks at least 2 relevant questions. Defines success criteria but they may be vague ("good engagement"). Instruction is functional but missing some secondary elements.
- Score 1 (Weak): Adds some specificity to Sandra's request but the instruction remains broad ("Create engaging LinkedIn posts for a B2B SaaS company in construction"). Missing critical parameters like tone, constraints, or audience specifics. Identifies that the request is vague but can't effectively restructure it. Questions are generic ("What do you want?") rather than specific.
- Score 0 (Unsafe/Poor): Passes Sandra's request to the AI essentially unchanged ("Use AI to make VerticalStack's social media better — generate LinkedIn posts that get more engagement"). No meaningful restructuring. No identification of missing information. No success criteria.
#### Secondary Domains
**Process Thinking**
- Score 4 (Excellent): Frames the AI instruction as part of a larger content workflow: instruction → AI generation → human review → client approval → scheduling → performance monitoring → instruction refinement. Identifies who reviews at each stage and what they check.
- Score 3 (Strong): Identifies that AI-generated content needs a review and approval step before posting. Mentions downstream workflow (who approves, how feedback gets incorporated).
- Score 2 (Acceptable): Mentions that someone should review the AI output before sending to client. Basic workflow awareness.
- Score 1 (Weak): Treats the AI instruction as the entire process — generate and post. No downstream workflow consideration.
- Score 0 (Unsafe/Poor): Implies AI output goes directly to posting without any human review.
**Risk Judgment**
- Score 4 (Excellent): Identifies specific risks of using vague AI instructions for a client: off-brand content damaging client relationship, factually incorrect claims about BuildFlow, content that alienates the construction audience, and reputational risk to Mosaic if poor-quality AI content is associated with their agency. Notes that the July renewal is at stake.
- Score 3 (Strong): Identifies at least 2 specific risks of proceeding with vague instructions. Connects risk to business outcome (client renewal).
- Score 2 (Acceptable): Mentions that vague instructions could produce poor results but doesn't articulate specific risks or business consequences.
- Score 1 (Weak): No risk awareness — treats the task as straightforward execution.
- Score 0 (Unsafe/Poor): Generates content without acknowledging any risk. May even recommend posting AI content without client review.
### Ideal Response Guide
An expert-level response would produce something like the following (demonstrating the transformation from vague to structured):
**Original request:** "Use AI to make our social media better."
**Rewritten as 2-3 structured instructions:**
*Instruction 1 — Thought Leadership Posts:*
"Generate 3 LinkedIn posts per week (150-200 words each) for VerticalStack, a B2B SaaS company selling BuildFlow project management software to mid-size construction firms (\$10M-\$100M revenue). Target audience: VPs of Operations and Project Managers at construction companies. Tone: practical, direct, no-nonsense — avoid marketing buzzwords like 'revolutionary,' 'game-changing,' or 'synergy.' Topics should address real construction project management challenges: schedule delays, budget overruns, subcontractor coordination, change order tracking, safety compliance documentation. Do NOT mention competitors by name. Do NOT make claims about BuildFlow features without referencing the attached product spec sheet. Each post should end with a discussion question or practical tip, not a hard sales CTA. Format: plain text with line breaks for readability, no emojis, 2-3 relevant hashtags from this approved list: [list needed from client]."
The expert response would also: identify that Sandra hasn't specified whether she wants organic-only or paid social, whether there are compliance or legal review requirements for B2B claims, what existing content has performed well (for tone calibration), and whether the CEO's desire to match a competitor's "viral" post is realistic for a niche B2B audience. The response would define success criteria tied to measurable outcomes: LinkedIn impressions increase X%, engagement rate (likes + comments / impressions) exceeds Y%, and at least Z inbound inquiries attributed to LinkedIn by Q2 end — while noting that these targets need Sandra's input.
In the follow-up, the expert response balances urgency with quality: "I can generate 5 draft posts by Thursday using what we know about VerticalStack, but they go as drafts to Sandra — not for publishing. Here's why: if we post generic AI content on VerticalStack's LinkedIn without Sandra's sign-off, and it's off-brand or contains an inaccurate product claim, that's worse than no posts at all — especially with the renewal in July. I can send Sandra the 5 drafts along with our 3 key questions formatted as quick yes/no choices so she can approve and answer at the same time. This way she sees immediate progress and we get the inputs we need."
### Common Mistakes
- **Adding only adjective-based specificity** — "Make the posts professional, engaging, and impactful" adds no actionable structure; these are subjective adjectives, not measurable constraints
- **Not decomposing the request** — treating "make social media better" as a single AI instruction rather than recognizing it contains multiple distinct content types
- **Ignoring the audience context** — writing instructions for generic B2B content instead of construction-industry-specific content for a technical buyer persona
- **Missing the tone specification** — not leveraging the known brand voice (practical, no-nonsense) as a constraint, which would cause the AI to default to generic marketing-speak
- **Generic questions** — asking "What do you want?" instead of specific questions like "Do you have approved customer quotes we can reference?" or "Are there product features in development that we should NOT mention?"
- **No failure handling** — no mention of what to do when AI output is off-brand, factually wrong, or mentions competitors
- **Caving completely in the follow-up** — generating and posting 5 posts without client review because Jake is anxious
- **Over-specifying to the point of paralysis** — listing so many constraints that the AI couldn't satisfy all of them simultaneously
### Red Flags
- **Passes Sandra's request to the AI essentially unchanged** — "Tell Catalyst AI to generate LinkedIn posts that make VerticalStack's social media better and increase engagement." This indicates zero Task Framing capability and is indistinguishable from what a person with no AI literacy would produce.
- **Invents details not in the scenario** — fabricates VerticalStack product features, customer names, or statistics to include in the instruction. This is worse than vagueness — it's injecting false information.
- **Recommends posting AI-generated content without any human review** — "Generate 5 posts and schedule them for next week." This bypasses the fundamental client-review relationship and creates risk of off-brand or incorrect content being published under the client's name.
- **Shows no awareness that vague instructions create problems** — treats Sandra's email as a perfectly adequate brief and proceeds to "just run it through the AI."
### Reliability Modifier Triggers
- **RM-6 (Inability to Explain Reasoning):** Triggered if the test-taker produces a reasonable instruction but, in the follow-up, cannot explain why specific constraints matter — e.g., cannot explain why specifying tone as "no-nonsense" matters for a construction audience.
- **RM-1 (Contradiction):** Triggered if the test-taker includes constraints in the instruction that contradict the known brand voice (e.g., specifying "fun, playful tone" when VerticalStack is known for being practical and no-nonsense).
- **RM-2 (Overconfidence):** Triggered if the test-taker claims their instruction "covers everything" or produces "complete" instructions while still missing critical elements like success criteria, review process, or failure handling. Also triggered if the follow-up response generates content with no caveats: "These 5 posts are ready to publish."
---
# Scenario 3: Output Comparison
## Archetype: Output Comparison (Archetype 3)
## Module: 3 — Quality & Verification
## Difficulty: 2
### Situation
You are a Contracts Analyst at Meridian Partners, a mid-size corporate law firm with 120 attorneys based in Chicago. The firm recently deployed LegalLens AI, a document analysis platform, to assist with contract review for the firm's commercial real estate practice group. LegalLens can read contracts, extract key terms, identify unusual clauses, and generate plain-language summaries for client reporting.
One of the firm's partners, Evelyn Torres, has asked you to prepare a summary of a commercial lease agreement between a client (Bridgewater Retail Holdings) and a shopping center landlord (Promenade Property Group). The lease is for a 12,000 square foot retail space in a suburban shopping center, with a 10-year term, base rent of \$32 per square foot escalating 3% annually, a tenant improvement allowance of \$45 per square foot, and a co-tenancy clause triggered if the anchor tenant (a national department store) vacates.
You ran the 47-page lease through LegalLens twice — once with instructions to "summarize all key commercial terms" and once with instructions to "identify risk factors and unusual provisions." The AI generated two different summaries. Evelyn needs to send the summary to the client by end of day, and she's asked you to select the better one and flag any issues.
**Output A:**
> *Lease Summary — Bridgewater Retail Holdings / Promenade Property Group*
>
> *This is a 10-year commercial lease for 12,000 SF of retail space at Promenade Shopping Center. Key terms are favorable for the tenant:*
>
> *Base rent is \$32/SF with 3% annual escalations, resulting in Year 10 rent of approximately \$41.75/SF. The tenant improvement allowance of \$45/SF (\$540,000 total) is above market average for suburban retail, providing strong upfront value. The co-tenancy clause provides meaningful protection — if the anchor tenant vacates, Bridgewater may reduce rent to 75% of base until a replacement anchor is secured or terminate after 12 months of vacancy.*
>
> *CAM charges are estimated at \$8.50/SF with annual reconciliation. The lease includes a standard personal guarantee requirement for the first 36 months from Bridgewater's principal.*
>
> *Operating expense caps are set at 5% annual increases, which provides cost certainty. The landlord is responsible for structural repairs and roof/HVAC replacement.*
>
> *Overall, this lease represents competitive terms for the tenant. The TI allowance and co-tenancy provisions are particularly strong. Recommend proceeding with minor negotiations on the personal guarantee duration.*
**Output B:**
> *Lease Summary — Bridgewater Retail Holdings / Promenade Property Group*
>
> *10-year retail lease, 12,000 SF, Promenade Shopping Center.*
>
> *Rent: Base \$32/SF, escalating 3%/year. Note: the escalation clause in Section 4.2 uses compounding language — Year 10 rent calculates to approximately \$41.75/SF. Verify that client's financial projections use compound rather than simple escalation, as this produces approximately \$12,000 more in cumulative rent over the term.*
>
> *TI Allowance: \$45/SF (\$540,000). Disbursement is subject to landlord approval of construction plans per Section 7.3. Section 7.3(d) requires tenant to use landlord's approved contractor list — this may limit competitive bidding and increase build-out costs. Flag for client discussion.*
>
> *Co-Tenancy: Rent reduction to 75% if anchor vacates; termination right after 12 months. However, Section 9.4(b) defines "anchor tenant" as specifically "a department store retailer occupying 40,000+ SF." If the anchor space is re-tenanted by a non-department-store retailer (e.g., a gym or grocery store), the co-tenancy protection may not trigger. The definition should be broadened or the clause renegotiated.*
>
> *CAM: Estimated \$8.50/SF. Reconciliation is annual but Section 6.2 allows landlord to estimate increases mid-year — potential for cashflow surprises. No cap on management fee component of CAM.*
>
> *Personal Guarantee: 36 months. Section 12.1 includes a "recapture" provision — if tenant defaults during months 37-120, the guarantee reactivates for the remaining term. This effectively extends the guarantee risk beyond 36 months. Requires careful client counseling.*
>
> *Missing from this lease: no exclusive use clause (client cannot prevent landlord from leasing to a competing retailer), no assignment/subletting flexibility beyond landlord consent (which is "not to be unreasonably withheld" but has no deemed-approval timeline), and no early termination option.*
>
> *Recommend: Do not proceed without renegotiating the co-tenancy definition, the contractor restriction in the TI clause, and the guarantee recapture provision. The missing exclusive use clause is a significant gap for a retail tenant.*
### The Challenge
Output A is polished, well-organized, and reads like a professional client memo. Output B is rougher — bullet-pointed, denser, and harder to skim. However, the two outputs differ significantly in their substance.
Output A contains a subtle but important error: it characterizes the lease terms as "favorable" and recommends "proceeding with minor negotiations," but it misses several risk factors that Output B identifies — specifically, the narrow co-tenancy definition, the contractor restriction in the TI clause, the guarantee recapture provision, and the absence of an exclusive use clause. Output A's recommendation to "proceed with minor negotiations" could lead the client into a lease with unaddressed risks.
Output B is less polished but significantly more thorough — it identifies specific clause references (Section numbers), flags risks that Output A ignores, catches the potential gap in the co-tenancy definition, and notes what the lease is *missing* (exclusive use clause, assignment flexibility, early termination option).
Your task is to evaluate these outputs and make a recommendation to Evelyn.
### Your Task
1. **Which output would you select as the basis for the client memo**, and why? Be specific about the strengths and weaknesses of each.
2. **Identify at least 3 specific differences** between the two outputs that affect their quality or reliability as client-facing documents.
3. **What would you do with the selected output before sending it to the client?** Would you send it as-is, edit it, or take some other action?
### Follow-Up Pressure Prompt
*Delivered after the test-taker submits their initial response:*
Evelyn stops by your desk at 4:30 PM:
> "I just got off the phone with the Bridgewater team — they have a board meeting tomorrow morning and need the lease summary tonight. I glanced at Output A and it looks clean and professional. Can we just send that one? I don't have time to review the longer one. The client won't care about all those section references — they just want to know if the deal is good."
How do you respond? If you push back on using Output A, how do you communicate the risk to Evelyn quickly and clearly? If you agree, what do you do to mitigate the risk?
### Scoring Rubric
#### Primary Domains
**Verification Instinct**
- Score 4 (Excellent): Identifies multiple specific differences between the outputs, including: (1) Output A's characterization of terms as "favorable" when substantive risks are unaddressed, (2) Output A's missing risk factors (narrow co-tenancy definition, contractor restriction, guarantee recapture, no exclusive use clause), (3) Output A's recommendation to "proceed with minor negotiations" which could lead the client to sign a lease with unaddressed structural risks, (4) Output B's identification of errors of omission (missing clauses). Recognizes that Output A's polished presentation creates a false sense of completeness — the fluency-accuracy trap. Proposes verification steps: cross-reference both outputs against the original lease, check that the section references in Output B are accurate, verify the Year 10 rent calculation, and confirm the co-tenancy definition issue with the lease text.
- Score 3 (Strong): Identifies at least 3 substantive differences between outputs. Catches that Output A misses important risk factors. Recognizes Output B as more thorough despite being less polished. Proposes at least one verification step (checking section references or confirming facts against the lease). Selects Output B as the better basis.
- Score 2 (Acceptable): Selects Output B as better and identifies at least 1-2 substantive differences. May recognize that Output A is more polished but less complete. Proposes editing before sending. May miss some of the deeper issues (guarantee recapture, narrow co-tenancy definition).
- Score 1 (Weak): Notices some difference between outputs but evaluates primarily on surface quality (formatting, readability, professionalism). May prefer Output A because it "reads better." Misses most substantive differences.
- Score 0 (Unsafe/Poor): Selects Output A because it looks more professional. Does not identify any factual or analytical differences between the outputs. Would send Output A to the client as-is.
**Risk Judgment**
- Score 4 (Excellent): Articulates that sending Output A to the client creates legal malpractice risk — the summary omits risk factors that the client needs to know before signing the lease. If Bridgewater signs based on Output A's "favorable" characterization and later discovers the co-tenancy loophole or guarantee recapture, the firm could face liability. Connects the risk to the specific legal context: "A law firm's summary is relied upon for deal decisions — errors of omission in our analysis are professional negligence, not just 'being incomplete.'" In the follow-up, communicates the risk to Evelyn in business terms, not legal jargon.
- Score 3 (Strong): Identifies that Output A's recommendation to "proceed" is risky given the unaddressed issues. Articulates at least one concrete consequence of sending Output A (client signs with unaddressed risks). In the follow-up, pushes back on Evelyn with a specific risk statement.
- Score 2 (Acceptable): Recognizes that Output A is riskier because it's less complete. Prefers Output B or a combined version. In the follow-up, shows some resistance to sending Output A but may not articulate the specific risk clearly.
- Score 1 (Weak): Does not connect the output differences to client risk. Treats the choice as a formatting preference rather than a risk decision.
- Score 0 (Unsafe/Poor): Sends Output A because the partner asked for it. No risk assessment.
#### Secondary Domains
**Task Framing**
- Score 4 (Excellent): Evaluates both outputs against the purpose of the original task — "prepare a summary for client reporting" — and assesses whether each output serves that purpose. Notes that Output A answers "is this a good deal?" (an opinion) while Output B answers "what should the client know?" (analysis). Identifies that the different prompt framings ("summarize key terms" vs. "identify risk factors") produced the quality difference, and recommends that future lease reviews use Output B's framing.
- Score 3 (Strong): Evaluates outputs against the purpose (client decision-making). Notes that the instruction framing affected the output quality.
- Score 2 (Acceptable): Evaluates outputs based on content quality without connecting to the original task purpose or prompt framing.
- Score 1 (Weak): Evaluates outputs only on surface characteristics.
- Score 0 (Unsafe/Poor): No evaluation framework — picks one without analysis.
**Exception Handling**
- Score 4 (Excellent): Proposes a specific plan for producing the final client document: use Output B as the analytical foundation, restructure it for client readability, verify all section references against the original lease, and have Evelyn review before sending. In the follow-up, proposes a compromise: send a brief interim summary highlighting the 3 most critical issues tonight, with the full analysis to follow in the morning.
- Score 3 (Strong): Proposes editing Output B before sending. Has a plan for the follow-up pressure.
- Score 2 (Acceptable): Selects an output and mentions editing but doesn't specify what to edit.
- Score 1 (Weak): Selects an output and would send with minimal changes.
- Score 0 (Unsafe/Poor): Would send either output as-is.
### Ideal Response Guide
An expert-level response would: (1) Select Output B as the basis, clearly stating that despite its rougher formatting, it is substantially more valuable for client decision-making. (2) Identify at least 4-5 specific differences: Output A misses the narrow co-tenancy definition (the "department store" limitation), the contractor restriction in the TI clause, the guarantee recapture provision, the missing exclusive use clause, and characterizes the deal as "favorable" when significant risks are unaddressed. (3) Recognize the fluency-accuracy trap: Output A reads as professional and complete, which is precisely what makes it dangerous — a polished summary that omits critical risks is worse than a rough summary that catches them, because the polish creates false confidence. (4) Propose a specific action plan: reformat Output B into a client-friendly structure (executive summary + detailed findings + recommendations), verify the section references against the actual lease, and flag the guarantee recapture and co-tenancy definition issues as items requiring immediate attorney review — these are not simple formatting issues but potential deal-breakers.
In the follow-up, the expert response does not agree to send Output A. Instead, it communicates the risk to Evelyn quickly: "Output A tells the client to proceed, but it missed three issues that could cost them significantly — the guarantee effectively never expires, the co-tenancy clause has a loophole, and there's no exclusive use protection. If we send Output A and the client signs, we're exposed. I can have a restructured version of Output B — the one that catches these issues — ready in 90 minutes. Or I can send a one-page executive summary tonight highlighting the three red-flag issues, with the full memo tomorrow."
### Common Mistakes
- **Selecting Output A because it's more polished** — the most common mistake, driven by automation bias (fluent = accurate)
- **Recognizing Output B is more thorough but recommending Output A for "client-friendliness"** — prioritizing readability over accuracy in a legal context where accuracy has material consequences
- **Missing the guarantee recapture issue** — the recapture provision is the subtlest risk and most commonly overlooked
- **Not recognizing the error of omission** — identifying what's wrong with Output A but not identifying what's missing (exclusive use clause, early termination option)
- **Not proposing to verify the section references in Output B** — Output B cites specific sections; an expert would verify these against the actual lease rather than trusting the AI's references
- **Sending either output as-is to the client** — both outputs need human editing before they become client-facing documents
- **Caving to Evelyn's pressure in the follow-up** — agreeing to send Output A because the partner said to, without communicating the risk
- **Not recognizing the prompt framing issue** — missing that the two outputs differ because the prompts asked different questions, which has implications for how the team uses LegalLens going forward
### Red Flags
- **Selects Output A as superior because it "reads better" or "looks more professional"** — this is the definitive automation bias signal. In a legal context, selecting a polished but incomplete summary over a thorough but rougher one indicates the person would rubber-stamp AI outputs based on surface quality. This pattern is dangerous in any approval or review role.
- **Cannot identify any substantive differences between the two outputs** — states "they're pretty similar" or "both cover the same things" when Output B contains at least 4 risk factors that Output A entirely omits.
- **Would send Output A to the client in the follow-up because "the partner reviewed it"** — treats Evelyn's 30-second glance as a substitute for substantive analysis and uses authority as a proxy for verification.
- **Does not recognize that a law firm's summary carries professional liability** — treats the output selection as a formatting preference rather than a decision with legal and fiduciary implications.
### Reliability Modifier Triggers
- **RM-3 (Failure to Verify When Prompted):** The scenario explicitly asks the test-taker to evaluate two outputs and flag issues. Failure to identify any substantive differences when there are clear, identifiable ones constitutes failure to verify when the task explicitly calls for it.
- **RM-2 (Overconfidence):** "Output A is accurate and ready to send" without checking any factual claims. Or "Output B's section references are correct" without verifying against the lease.
- **RM-5 (Inconsistency Under Pressure):** If the test-taker demonstrates strong analysis in the initial response but caves to Evelyn in the follow-up ("okay, send Output A since you reviewed it"), the pressure modifier applies.
- **RM-6 (Inability to Explain Reasoning):** Test-taker selects an output but cannot articulate specific criteria behind the choice — "Output B just seems more detailed" without identifying what details matter and why.
---
# Scenario 4: Hidden Error Review
## Archetype: Hidden Error Review (Archetype 4)
## Module: 3 — Quality & Verification
## Difficulty: 3
### Situation
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
### The Challenge
This message appears professional, well-formatted, and patient-friendly at first glance. However, it contains three distinct errors of varying severity that you need to identify:
1. **A subtle factual error:** Several of the health metrics are characterized incorrectly. Specifically, a blood pressure of 128/82 is classified as Stage 1 hypertension (elevated), not "within the healthy range." A total cholesterol of 215 mg/dL is above the desirable limit of 200 mg/dL, not "within acceptable limits." A fasting blood glucose of 105 mg/dL is classified as prediabetic (100-125 mg/dL), not "normal." A BMI of 27.3 is classified as overweight (25-29.9), not "within the healthy weight category." The AI has systematically downplayed every metric that falls outside optimal ranges, characterizing borderline or out-of-range values as normal.
2. **A misleading implication:** The "Wellness Tip" cites that "adults who maintain regular wellness visits reduce their risk of serious health conditions by up to 40%." This is a fabricated or unsourced statistic — a hallucinated claim presented as established medical fact. While encouraging wellness visits is appropriate, citing a specific percentage without a source in a healthcare communication could be considered a misleading health claim. If a patient questions it, ClearPath cannot point to a source.
3. **A missing disclaimer:** The message includes health metrics and screening recommendations but does not include a standard HIPAA-compliant notice about the security of electronic communications, does not clarify that this summary is not a substitute for the official medical record or clinical advice, and does not advise the patient to contact their provider if they believe any information is inaccurate. The small disclaimer at the bottom ("This message was generated based on your health record information") is insufficient — it doesn't mention AI involvement in generating the content, which many healthcare communication guidelines now require.
### Your Task
1. **Review the AI-generated message** and identify every issue you can find — errors, risks, misleading content, missing elements, or anything else that should be flagged before the batch goes out.
2. **For each issue you identify**, classify it by severity (critical, moderate, or minor) and explain the potential consequence if the message goes out uncorrected.
3. **Make a recommendation**: Should Rachel release the batch as-is, hold the batch for corrections, or take some other action? Justify your recommendation.
### Follow-Up Pressure Prompt
*Delivered after the test-taker submits their initial response:*
Rachel reviews your findings and says:
> "Good catches on the health metrics — I'll have the clinical team fix those classifications. But the 40% statistic and the disclaimer stuff — I think you're overthinking it. The wellness tip is just a motivational blurb, not medical advice. And we have a general disclaimer on all our communications already through our email footer. The clinical team is busy and I don't want to delay the batch for minor issues. Can you sign off on releasing it once we fix the health metric labels?"
Do you sign off? If not, how do you communicate to Rachel why the remaining issues matter without being dismissive of her perspective?
### Scoring Rubric
#### Primary Domains
**Verification Instinct**
- Score 4 (Excellent): Identifies all three embedded errors — the mischaracterized health metrics, the fabricated wellness statistic, and the inadequate disclaimer. For the health metrics, specifies which metrics are mischaracterized and what the correct classifications are (or flags that they need clinical verification). Identifies the wellness statistic as likely fabricated and notes that healthcare communications cannot cite unsourced statistics. Identifies the disclaimer deficiency and specifies what's missing (HIPAA language, AI disclosure, clarification that summary isn't a substitute for medical record). Additionally, raises a systemic concern: "If this sample mischaracterizes all four metrics, the other 339 messages in the batch likely have similar problems — this may be a systematic AI bias toward reassuring language rather than clinically accurate language."
- Score 3 (Strong): Identifies at least 2 of the 3 errors, including the health metrics mischaracterization. Triages by severity correctly (metrics issue is most critical). Proposes verification steps for the remaining messages in the batch. May miss the fabricated statistic or the disclaimer issue, but catches the most dangerous error.
- Score 2 (Acceptable): Identifies the health metrics issue (the most critical error) and at least one other concern. Recommends holding the batch. May not fully articulate the clinical implications or identify the systemic pattern.
- Score 1 (Weak): Catches that "something seems off" with the health metrics but cannot specify which are incorrect or why. Misses the fabricated statistic and the disclaimer issue. May approve the message with a vague suggestion to "double-check the numbers."
- Score 0 (Unsafe/Poor): Approves the message without identifying any errors. States that it "looks professional" or "seems accurate." Would allow 340 patients to receive messages that mischaracterize their health status.
**Exception Handling**
- Score 4 (Excellent): Recommends holding the entire batch, not just fixing the sample. Proposes a structured response: (1) immediately hold the batch, (2) have clinical staff validate the metric classification logic in PatientConnect AI, (3) re-run the batch with corrected classifications, (4) review a random sample of corrected messages before release, (5) add the fabricated statistic to the AI's blocklist, and (6) update the template to include proper disclaimers. Documents the issue for the compliance team. In the follow-up, explains to Rachel why the "minor" issues matter in a healthcare context — specifically, that unsourced health claims in patient communications can create liability and that AI disclosure is increasingly required by healthcare communication standards.
- Score 3 (Strong): Holds the batch and proposes correcting all three issues before release. Has a plan for validating the fix across the full batch (not just the sample). In the follow-up, pushes back on Rachel with at least one concrete risk statement.
- Score 2 (Acceptable): Holds the batch for the metrics issue. May sign off on the other issues with Rachel's rationale. Proposes fixing the sample but may not address the full batch systematically.
- Score 1 (Weak): Flags the metrics issue but suggests fixing just the sample, not the batch. Defers to Rachel on the other issues without assessment.
- Score 0 (Unsafe/Poor): Approves the batch. Does not flag any issues or does not recommend any action.
#### Secondary Domains
**Risk Judgment**
- Score 4 (Excellent): Articulates that sending mischaracterized health information to 340 patients is a patient safety risk (patients may ignore genuinely concerning metrics), a regulatory risk (inaccurate health communications violate patient communication standards), and a liability risk (if a patient relies on the "normal" classification and delays follow-up care). Identifies the fabricated statistic as a separate risk category — a misleading health claim in a communication from a healthcare provider. Considers the reputational risk if the story reaches local media: "Healthcare network sends AI-generated messages telling patients their concerning health metrics are normal."
- Score 3 (Strong): Identifies at least 2 risk categories (patient safety, regulatory, liability). Articulates specific consequences for the metrics error. Connects to real-world healthcare communication standards.
- Score 2 (Acceptable): Identifies that the metrics error is a patient safety concern. May not fully articulate regulatory or liability dimensions.
- Score 1 (Weak): Recognizes the error but treats it as a minor quality issue rather than a safety risk.
- Score 0 (Unsafe/Poor): No risk assessment. Treats the message as a routine communication with no safety implications.
**Process Thinking**
- Score 4 (Excellent): Identifies that the error is likely systematic (the AI's classification logic, not a one-off mistake) and proposes investigating the root cause. Recommends changes to the workflow: add clinical review as a mandatory step before any batch with health metrics, implement automated bounds-checking that flags metrics outside normal ranges, and establish a review cadence for the AI's reference tables.
- Score 3 (Strong): Recognizes this is likely a systematic issue and proposes checking the full batch. Suggests a process change (clinical review before release).
- Score 2 (Acceptable): Addresses the immediate issue but treats it as potentially isolated. Suggests fixing and re-running.
- Score 1 (Weak): Treats it as a one-off error in the sample.
- Score 0 (Unsafe/Poor): No process thinking — addresses only the sample message.
### Ideal Response Guide
An expert-level response would identify all three errors, triage them by severity, and propose a structured corrective action.
**Error 1 — Mischaracterized Health Metrics (CRITICAL):** The response should flag that BP 128/82 is elevated/Stage 1 hypertension per AHA guidelines (not "healthy range"), total cholesterol 215 mg/dL exceeds the 200 mg/dL desirable threshold (not "acceptable limits"), fasting glucose 105 mg/dL is in the prediabetic range per ADA guidelines (not "normal"), and BMI 27.3 is classified as overweight by the CDC (not "healthy weight"). The expert recognizes this as a systematic pattern — the AI is consistently characterizing borderline metrics as normal, which is dangerous because it could cause patients to ignore metrics that warrant clinical attention. This is the highest-severity error because it directly affects patient health decisions.
**Error 2 — Fabricated Wellness Statistic (MODERATE):** The "40% reduction" claim appears to be a hallucinated or unsourced statistic. While encouraging preventive care is appropriate, citing a specific statistic without a source in a healthcare communication is a problem — it could be challenged by patients, media, or regulators, and ClearPath cannot defend it. The expert response recommends either removing the statistic, replacing it with a sourced claim, or softening it to general encouragement without a specific number.
**Error 3 — Inadequate Disclaimers (MODERATE):** The message lacks: (a) proper HIPAA-related notice about electronic communication security, (b) clarification that the summary does not replace the official medical record or constitute clinical advice, (c) guidance for patients to contact their provider if information appears inaccurate, and (d) disclosure that the content was AI-generated. The small footer disclaimer is insufficient for a healthcare context.
**Systemic concern:** The expert response notes that if the AI mischaracterized all four metrics in this sample, the entire batch of 340 messages likely has similar issues. The fix cannot be applied just to this one message — the underlying classification logic needs correction and the full batch needs re-generation or clinical review.
In the follow-up, the expert response does not sign off after only the metrics fix. The response explains to Rachel: "The metrics fix is the most urgent issue, but the unsourced statistic isn't a 'motivational blurb' when it comes from a healthcare provider — it's a health claim. If a patient Googles '40% reduction wellness visits' and finds nothing, it undermines trust in all our communications. And the disclaimer issue isn't about our email footer — it's about including language specific to this message that clarifies it's AI-generated health information, not a clinical assessment. These aren't minor — they're the kind of issues that create compliance exposure in healthcare communications."
### Common Mistakes
- **Catching only the health metrics error and missing the other two** — the metrics issue is the most obvious; the fabricated statistic and disclaimer gap require deeper analysis
- **Approving the message after Rachel fixes the metrics** — signing off in the follow-up without addressing the remaining issues because Rachel minimized them
- **Not recognizing the systematic nature of the error** — treating the metrics mischaracterization as a one-off rather than a likely pattern across all 340 messages
- **Vague severity assessments** — saying "this is a problem" without explaining the specific consequence (patient safety, liability, regulatory, reputational)
- **Not questioning the "40% reduction" statistic** — accepting it as a reasonable wellness message rather than identifying it as an unsourced/fabricated claim
- **Not considering the batch implications** — focusing only on Margaret Chen's message without addressing the other 339 messages
- **Treating the disclaimer as sufficient** — not recognizing that the current footer text is inadequate for healthcare communications containing personal health information
- **Not proposing a process change** — fixing the immediate issue without recommending changes to prevent recurrence
### Red Flags
- **Approves the message without identifying any errors** — the message contains at least 4 mischaracterized health metrics, a fabricated statistic, and an inadequate disclaimer. Approval without identifying any of these indicates the person would pass inaccurate health information to patients. This is a patient safety failure.
- **Identifies errors but approves anyway** — "The metrics are a little off but the overall message is fine — patients probably won't check the specific ranges." This indicates willingness to accept known health information errors in patient communications, which represents a fundamental fitness-for-purpose failure in a healthcare context.
- **Fabricates their own verification** — claims to have "confirmed the health ranges are correct" when the scenario provides no access to clinical reference materials. Creating false assurance is worse than missing the error.
- **Recommends sending the batch with a plan to "fix it next time"** — prioritizes the 5 PM deadline over patient safety by sending known-incorrect health information with the intention of correcting the template for future batches.
- **States "the AI is trained on medical data so it probably knows the correct ranges"** — defers to AI authority on clinical classifications rather than verifying against medical standards.
### Reliability Modifier Triggers
- **RM-3 (Failure to Verify When Prompted):** The scenario explicitly asks the test-taker to review the message and identify issues. Failure to identify any of the three embedded errors — when the task is specifically to find them — triggers this modifier at full strength (-1.0 to Verification Instinct).
- **RM-2 (Overconfidence):** "This message looks thorough and accurate" without verifying any health metric classification. Or "the AI's medical classifications are reliable."
- **RM-4 (Unsafe Automation Bias):** "PatientConnect AI is designed for healthcare communications so we can trust its clinical accuracy." Or "AI-generated messages don't need clinical review — that's the point of the system."
- **RM-1 (Contradiction):** If the test-taker advocates for thorough verification in other scenarios but approves this healthcare message without checking, the contradiction is flagged.
- **RM-5 (Inconsistency Under Pressure):** If the test-taker's initial response is thorough but they sign off in the follow-up after Rachel minimizes the remaining issues, the pressure modifier applies.
---
# Scenario 5: Missing Context
## Archetype: Missing Context (Archetype 5)
## Module: 1 — Foundation
## Difficulty: 2
### Situation
You are a Client Services Associate at Garrison Wealth Advisors, a registered investment advisory (RIA) firm in Boston with approximately \$2.4 billion in assets under management (AUM) and 3,200 client households. Garrison primarily serves high-net-worth individuals and families with investable assets between \$500,000 and \$10 million. The firm recently implemented WealthLens AI, a portfolio analysis platform that can generate investment summaries, performance reports, portfolio risk assessments, and rebalancing recommendations based on portfolio data.
Your senior advisor, Martin Zhao, has asked you to prepare a quarterly investment review document for a client meeting tomorrow afternoon. The client is Paul and Linda Stanton, a married couple in their late 50s who have been Garrison clients for 8 years. Martin tells you:
> "Run the Stantons' portfolio through WealthLens and generate their Q4 review. They have about \$3.2 million across their accounts — joint brokerage, his IRA, her IRA, and a trust account. WealthLens should pull the portfolio data from our custodian feed. I'll review your draft in the morning before the 2 PM meeting."
You run the portfolio through WealthLens AI. It produces the following summary:
---
> **Quarterly Investment Review — Q4 2025**
> **Paul & Linda Stanton \| Garrison Wealth Advisors**
>
> **Portfolio Overview:**
> Total portfolio value: \$3,247,891 (as of December 31, 2025)
> Q4 return: +4.2% \| YTD return: +11.8% \| Since inception (2018): +62.3%
>
> **Asset Allocation:**
> - US Equities: 58% (\$1,883,775)
> - International Equities: 14% (\$454,705)
> - Fixed Income: 18% (\$584,620)
> - Alternatives: 7% (\$227,352)
> - Cash: 3% (\$97,437)
>
> **Performance Highlights:**
> The portfolio outperformed its blended benchmark (60/40 equity/bond) by 1.3% in Q4, driven primarily by strong performance in US large-cap growth holdings. International equities underperformed due to currency headwinds and geopolitical uncertainty in European markets.
>
> **Rebalancing Recommendations:**
> The portfolio is currently overweight US equities relative to the target allocation. We recommend:
> 1. Reduce US equity allocation by 4% (\$129,916) — trim large-cap growth positions that have become concentrated
> 2. Increase fixed income allocation by 3% (\$97,437) — add intermediate-term Treasury bonds to reduce duration risk
> 3. Increase international equity allocation by 1% (\$32,479) — add emerging market exposure for diversification
>
> **Outlook:**
> We expect continued moderate growth in US equities supported by earnings expansion and potential Fed rate adjustments. Fixed income markets should benefit from the declining rate environment. We recommend maintaining a moderately growth-oriented allocation consistent with long-term wealth accumulation goals.
>
> *Generated by WealthLens AI based on custodian portfolio data as of 12/31/2025.*
---
The report looks clean and professional. The numbers appear internally consistent, the performance data seems reasonable for the period, and the rebalancing recommendations make logical sense given the stated allocation.
### The Challenge
However, this report was generated without access to several critical pieces of information about the Stantons. WealthLens AI pulled only the portfolio holdings and transaction data from the custodian feed. It did NOT have access to:
1. **The Stantons' risk profile and Investment Policy Statement (IPS)** — The report recommends a "moderately growth-oriented allocation" and the portfolio is 72% equities — but you have no way of knowing whether this matches the Stantons' actual risk tolerance. What if Martin updated their risk profile last quarter after a conversation about retirement planning? What if the Stantons are more conservative than the portfolio suggests?
2. **The Stantons' financial plan and life circumstances** — The report makes rebalancing recommendations "consistent with long-term wealth accumulation goals." But Paul and Linda are in their late 50s. Are they planning to retire soon? Do they need income from the portfolio? Have there been any major life changes (health issues, inheritance, divorce, business sale) that would change their investment strategy? The AI assumes the goal is growth — but the goal might be capital preservation or income generation.
3. **Tax implications of the recommendations** — The rebalancing recommendations involve selling \$129,916 in US equities. This could trigger significant capital gains taxes depending on the cost basis and holding period of the positions being sold. The report doesn't mention whether these sales should happen in the tax-deferred IRAs (no tax impact) or the taxable joint brokerage account (potential tax hit). No tax-loss harvesting opportunities are identified.
4. **Compliance and suitability requirements** — As an RIA, Garrison has fiduciary obligations. Any investment recommendation must be suitable for the specific client based on their documented risk tolerance, time horizon, and financial situation. A WealthLens-generated recommendation that doesn't incorporate the IPS is, by definition, a suitability risk — it's making recommendations based on portfolio math, not client circumstances.
### Your Task
1. **Assess this investment summary**: Is it ready to present to the Stantons at tomorrow's meeting? If not, what specifically is wrong or missing — even if the numbers and analysis appear correct on the surface?
2. **Identify what critical information WealthLens AI did NOT have access to** when generating this report. For each missing element, explain what could go wrong if the report is presented without it.
3. **What would you do before this report goes to Martin for review?** Describe the specific steps you would take between receiving this output and delivering it to your senior advisor.
### Follow-Up Pressure Prompt
*Delivered after the test-taker submits their initial response:*
Martin calls you at 4:45 PM:
> "Hey, I'm slammed today — I won't be able to review the Stanton report in the morning like I planned. Can you just make sure the WealthLens output is clean and have it printed for the meeting? I've worked with the Stantons for 8 years — I know their situation. I'll walk them through it live and adjust anything that needs adjusting in the meeting."
How do you respond? The meeting is at 2 PM tomorrow. Martin is the senior advisor and knows the Stantons well. But the report contains recommendations that may not align with the Stantons' risk profile, and it will be physically in the clients' hands as a printed document from Garrison Wealth Advisors.
### Scoring Rubric
#### Primary Domains
**Task Framing**
- Score 4 (Excellent): Identifies that the WealthLens output is fundamentally incomplete because it was generated without the client's Investment Policy Statement, financial plan, life circumstances, tax situation, or suitability documentation. Articulates that the report answers "what does the portfolio look like?" but not "is this portfolio right for the Stantons?" — and the latter is the actual purpose of a quarterly review. Notes that the AI was given a task-framing gap: Martin's instruction was "generate their Q4 review" but didn't specify which data sources WealthLens should incorporate beyond the custodian feed. Proposes that future WealthLens runs should include the client's IPS and financial plan as inputs, not just portfolio data.
- Score 3 (Strong): Identifies that the report is missing client-specific context (risk profile, life circumstances, tax considerations). Distinguishes between the portfolio data (which appears accurate) and the recommendations (which may not be suitable). Notes at least one reframing concern.
- Score 2 (Acceptable): Identifies that the report is missing some context — may catch the risk profile gap or the tax implications. Recognizes the report shouldn't be presented as-is. May not fully articulate the suitability concern.
- Score 1 (Weak): Notes that the report "looks good" but vaguely suggests "checking with Martin" before presenting it. Doesn't identify specific missing context elements.
- Score 0 (Unsafe/Poor): Declares the report ready for the meeting. Doesn't identify any missing context. Would print and present WealthLens output directly to clients.
**Exception Handling**
- Score 4 (Excellent): Proposes a specific action plan: (1) pull the Stantons' IPS from the CRM and compare the recommended allocation to their documented risk tolerance, (2) check for any recent notes from Martin about life changes or strategy shifts, (3) flag the tax implications of the rebalancing recommendations for Martin's review, (4) add a caveat to the printed report noting that recommendations are "preliminary and subject to advisor review based on your current financial plan and risk profile," (5) prepare a list of specific questions for Martin to address in the meeting. In the follow-up, provides Martin with a concise summary of the gaps rather than simply printing the report — enabling him to adjust in real-time even without a formal review session.
- Score 3 (Strong): Proposes checking the IPS and flagging tax implications. Has a plan for what to do before the meeting. In the follow-up, communicates the gaps to Martin in a way that doesn't just pass the problem but equips him to handle it.
- Score 2 (Acceptable): Proposes at least one concrete action (checking the IPS or noting tax implications). Flags the report as incomplete for Martin. In the follow-up, shows some resistance to just printing it.
- Score 1 (Weak): Suggests "asking Martin" about the report but doesn't take any independent action to identify or address gaps. In the follow-up, prints the report as Martin requested.
- Score 0 (Unsafe/Poor): Takes no action. Prints the report. No gap identification, no pre-meeting preparation.
#### Secondary Domains
**Verification Instinct**
- Score 4 (Excellent): Goes beyond identifying what's missing to questioning what's present. Checks whether the performance numbers are plausible (does +11.8% YTD match the market context?). Questions the benchmark: is the 60/40 blend the Stantons' actual benchmark, or is WealthLens using a default? Notes that the "since inception" return of +62.3% from 2018 should be verified against actual account statements. Questions whether the \$3.2M figure includes all accounts.
- Score 3 (Strong): Checks at least one factual element (performance, benchmark, account completeness). Questions whether the benchmark is client-specific or a default.
- Score 2 (Acceptable): Accepts the numbers as presented but questions the recommendations. Basic skepticism about the AI output.
- Score 1 (Weak): Accepts the entire report at face value. No verification behavior.
- Score 0 (Unsafe/Poor): Explicitly trusts the AI output: "WealthLens pulls from the custodian feed so the data is accurate."
**Risk Judgment**
- Score 4 (Excellent): Articulates the fiduciary risk: presenting investment recommendations that weren't generated with the client's IPS creates a suitability liability for the firm. If the Stantons act on a rebalancing recommendation that doesn't match their risk profile, Garrison could face regulatory action. Also identifies the reputational risk of presenting an obviously AI-generated report (the footer says "Generated by WealthLens AI") without customization — clients paying advisory fees expect personalized guidance, not automated output.
- Score 3 (Strong): Identifies the suitability risk and at least one other risk dimension. Connects the missing context to potential harm.
- Score 2 (Acceptable): Recognizes that presenting the report without the IPS is risky but may not articulate the specific regulatory or fiduciary implications.
- Score 1 (Weak): No risk assessment. Treats the missing context as a minor gap.
- Score 0 (Unsafe/Poor): No risk awareness. Presents the AI output as sufficient for the meeting.
### Ideal Response Guide
An expert-level response would recognize that this report — despite being internally consistent and professionally formatted — is fundamentally unfit for its purpose. It would identify four critical missing-context categories:
**1. Investment Policy Statement / Risk Profile:** The report recommends a growth-oriented allocation (72% equities), but without the Stantons' IPS, there's no way to confirm this matches their documented risk tolerance. If the Stantons recently shifted to a more conservative profile (common for a couple in their late 50s approaching retirement), this report would recommend the opposite of what they need.
**2. Life Circumstances and Financial Plan:** The "outlook" section assumes wealth accumulation as the goal. But the Stantons are in their late 50s — they may be 5-7 years from retirement, may need income distribution, or may have experienced life changes (health event, parent care responsibilities, business transition) that change their strategy. The AI cannot know this from portfolio data alone.
**3. Tax Implications:** The rebalancing recommendation to sell \$129,916 in US equities could trigger significant capital gains if executed in the taxable brokerage account. An expert would flag that tax-efficient execution requires knowing the cost basis of each position and recommending which accounts to transact in. The expert would also note that year-end tax-loss harvesting opportunities are not mentioned.
**4. Regulatory Suitability:** The expert would note that as an RIA with fiduciary obligations, Garrison cannot present investment recommendations that aren't grounded in the client's documented suitability profile. A WealthLens-generated recommendation based solely on portfolio math — without the IPS, financial plan, or client circumstances — is a compliance gap.
In the follow-up, the expert response does not simply print the report as Martin requests. Instead, it prepares a concise gap summary for Martin — a one-page note that says: "The WealthLens report is attached. Before the meeting, please note: (1) the rebalancing recommendations were generated without the IPS — please confirm they align with the Stantons' current risk tolerance; (2) the recommendation to sell \$130K in US equities has tax implications depending on which accounts are used — I've noted the cost basis for the joint brokerage positions on the attached sheet; (3) the outlook section assumes growth-oriented goals — please confirm this still matches the Stantons' plan." This approach respects Martin's expertise while ensuring the gaps are visible.
### Common Mistakes
- **Treating the report as ready because the numbers look correct** — the numbers can be perfectly accurate and the report still fundamentally flawed for its intended purpose
- **Identifying only one missing element** — catching the risk profile gap but missing the tax implications, life circumstances, or suitability concern
- **Generic concern without specifics** — "I'd want to make sure this matches their needs" without identifying *what* specifically might not match or *why*
- **Deferring entirely to Martin** — "Martin knows the Stantons so he'll handle it" without doing any independent gap analysis
- **Not recognizing the fiduciary/suitability dimension** — treating the missing IPS as a nice-to-have rather than a regulatory requirement
- **Accepting the benchmark at face value** — not questioning whether the 60/40 benchmark is the Stantons' actual benchmark or a WealthLens default
- **Not addressing the tax implications of rebalancing recommendations** — ignoring that selling \$130K in equities could have very different tax consequences depending on account type and cost basis
- **Simply printing the report in the follow-up** — following Martin's instruction without flagging the gaps, putting the firm at suitability risk
### Red Flags
- **Declares the report ready for the meeting without identifying any missing context** — the report was generated without the client's risk profile, financial plan, or tax situation. Approving it for a client meeting indicates the person would present AI-generated investment recommendations without checking suitability — a fiduciary failure.
- **States "WealthLens pulled the data from the custodian so it's accurate"** — conflates data accuracy (the numbers are right) with recommendation suitability (the advice is appropriate for this client). Accurate data does not equal appropriate advice.
- **Treats the AI-generated rebalancing recommendations as actionable** — "The recommendations look reasonable, so the Stantons should follow them." AI-generated investment recommendations without IPS validation are not suitable recommendations; they're mathematical suggestions.
- **In the follow-up, prints the report without any annotation or gap summary for Martin** — fails to provide the senior advisor with the information needed to contextualize the AI output during the meeting.
### Reliability Modifier Triggers
- **RM-3 (Failure to Verify When Prompted):** The scenario gives multiple contextual clues that the report may be incomplete: the Stantons are "in their late 50s," the report references "long-term wealth accumulation goals" without knowing if that's their goal, and the instruction only mentions pulling "custodian feed" data. Proceeding without checking triggers this modifier.
- **RM-4 (Unsafe Automation Bias):** "WealthLens generated the report based on real portfolio data so the recommendations are solid." Treats AI-generated investment recommendations as suitable because they're data-driven, without recognizing that suitability requires client context, not just portfolio math.
- **RM-2 (Overconfidence):** "The report is comprehensive and the analysis is sound" — stating confidence in recommendations that were generated without the client's risk profile or financial plan.
- **RM-5 (Inconsistency Under Pressure):** If the test-taker identifies multiple gaps in the initial response but simply prints the report when Martin asks in the follow-up, the pressure modifier applies.
---
# Scenario 6: Workflow Handoff
## Archetype: Workflow Handoff (Archetype 6)
## Module: 2 — Workflow Design
## Difficulty: 3
### Situation
You are an Operations Manager at NovaMart, a mid-size e-commerce company based in Portland, Oregon, that sells outdoor and adventure gear. NovaMart has approximately 12,000 active SKUs across categories including camping equipment, hiking apparel, climbing gear, cycling accessories, and water sports equipment. The company does \$85 million in annual revenue, primarily through its own website (70%) and Amazon marketplace (30%).
NovaMart has recently licensed ProductMind AI, an AI platform that can assist with multiple aspects of product listing management: generating product titles and descriptions from supplier spec sheets, creating SEO-optimized keywords, suggesting pricing based on competitive analysis, categorizing products into the site taxonomy, and generating marketing copy for seasonal campaigns.
Your Director of E-Commerce, Angela Wu, has asked you to design the workflow for using ProductMind AI to onboard new products. The context: NovaMart receives approximately 150-200 new SKUs per month from suppliers. Currently, onboarding a new product takes an average of 3.5 hours per SKU across multiple team members (Merchandising, Copywriting, SEO, Photography, and QA). Angela wants to use ProductMind AI to reduce this to under 1 hour per SKU while maintaining the quality standards that NovaMart's customers expect.
The current manual workflow looks like this:
1. **Supplier Data Receipt** — Merchandising receives spec sheets from suppliers (product name, dimensions, materials, features, MSRP, UPC)
2. **Product Categorization** — Merchandising assigns the product to the correct site category and subcategory
3. **Copywriting** — The copywriting team writes a product title (max 150 characters), a short description (50 words), a long description (200-400 words), and 5-7 bullet points highlighting key features
4. **SEO Optimization** — The SEO team adds meta title, meta description, search keywords, and optimizes the copy for target terms
5. **Pricing** — Merchandising sets the retail price based on MSRP, competitor pricing, margin targets, and promotional calendar
6. **Photography Direction** — The photo team creates a shot list and coordinates product photography (this step is not being automated)
7. **Quality Assurance** — A QA specialist reviews the complete listing against NovaMart's listing standards (accuracy, brand voice, SEO requirements, pricing guidelines, image specifications)
8. **Publishing** — Approved listings go live on the website and are synced to Amazon
Angela's specific concerns:
- "We've had issues with supplier spec sheets containing errors — wrong dimensions, incorrect materials, outdated product names. The AI shouldn't blindly trust what the supplier sends us."
- "Our brand voice is important — we're not a generic outdoor retailer. We speak like enthusiasts, not salespeople. The AI copy needs to sound like us."
- "Some products have regulatory requirements — climbing gear, bike helmets, water safety equipment — those listings need specific safety certifications and disclaimers. The AI needs to get those right."
- "We can't afford pricing errors. We had an incident last year where a pricing mistake on Amazon cost us \$18,000 in margin before anyone caught it."
### The Challenge
Your task is to design the new AI-assisted workflow from end to end. This requires more than just "have AI do steps 2-5" — you need to think about where AI and humans interact at each step, what information needs to transfer at each handoff, where quality gates should be placed, what happens when things go wrong, and how the workflow handles the specific risks Angela identified (supplier data errors, brand voice, regulatory products, pricing mistakes).
The challenge is designing a workflow that achieves the speed goal (under 1 hour per SKU) while maintaining quality standards. Every human review step you add improves quality but costs time. Every step you fully automate saves time but introduces risk. The optimal workflow finds the right balance for each step based on the risk profile.
### Your Task
1. **Design the complete AI-assisted product listing workflow.** For each step, specify: Who does it (AI, human, or both)? What inputs does that step need? What outputs does it produce? What gets handed off to the next step, and how?
2. **Identify where human review gates should be placed** and what the reviewer should specifically check at each gate. Not every step needs the same level of review — explain your reasoning for where you place gates and where you don't.
3. **Design exception handling** for at least three foreseeable failure scenarios: (a) when supplier data contains errors, (b) when the product requires regulatory disclaimers, and (c) when the AI-generated pricing falls outside acceptable margin ranges.
### Follow-Up Pressure Prompt
*Delivered after the test-taker submits their initial response:*
Angela reviews your workflow design and says:
> "This is thorough, but I'm worried about the human review steps. If every listing goes through two rounds of human QA, we won't hit the 1-hour target — we'll barely improve on our current process. Our Merchandising team is already stretched thin. Can you identify which types of products can go through an expedited path with lighter review, and which ones need the full QA treatment? I need a fast lane and a slow lane."
Redesign or modify your workflow to include two tracks: an expedited track for lower-risk products and a standard track for higher-risk products. Define the criteria for which products go into each track.
### Scoring Rubric
#### Primary Domains
**Process Thinking**
- Score 4 (Excellent): Designs a complete workflow with clear step sequencing, dependencies between steps, and parallel processing where possible (e.g., AI can generate copy, SEO keywords, and pricing suggestions simultaneously). Each step specifies inputs, outputs, responsible party, and what transfers to the next step. Includes exception paths for all three requested failure scenarios plus at least one additional foreseeable scenario. Proposes a feedback loop: track which listings need revision after publishing and use that data to improve AI configuration. Considers the human experience: what does the workflow look like from the Merchandiser's dashboard? What information do they need to make review decisions quickly? In the follow-up, designs a two-track system with clear, objective criteria for routing (e.g., product category, price point, regulatory requirements, supplier reliability score).
- Score 3 (Strong): Designs a sequential workflow with clear AI vs. human assignments for each step. Identifies major handoff points with what needs to transfer. Includes exception handling for the three requested scenarios. Proposes at least one quality gate with specific review criteria. In the follow-up, creates a reasonable two-track system.
- Score 2 (Acceptable): Designs a basic workflow that covers the main steps with AI and human roles identified. Includes at least one quality gate. Handles 1-2 of the exception scenarios. Handoff points are mentioned but may lack detail on what context transfers. In the follow-up, creates two tracks but criteria may be simplistic.
- Score 1 (Weak): Lists which steps AI should handle and which humans should handle, but without workflow sequencing, dependencies, or handoff details. No exception handling. No quality gates. In the follow-up, creates two tracks based on arbitrary criteria.
- Score 0 (Unsafe/Poor): "AI handles steps 2-5, humans handle the rest." No decomposition, no handoff details, no quality gates, no exception handling. Treats the workflow as a black box.
**Task Framing**
- Score 4 (Excellent): For each AI-assisted step, specifies the instruction that ProductMind AI should receive — including inputs (spec sheet data, brand voice guidelines, competitor pricing data, category taxonomy), constraints (character limits, SEO requirements, pricing margin floors), and success criteria (what makes a generated title "good enough" vs. requiring human revision). Identifies that ProductMind AI needs access to NovaMart's brand voice guide, product safety database, and competitive pricing feed as inputs — not just the supplier spec sheet.
- Score 3 (Strong): Specifies inputs and constraints for most AI-assisted steps. Identifies that the AI needs more than just the spec sheet. Defines success criteria for at least one AI step.
- Score 2 (Acceptable): Specifies some inputs for AI steps. Mentions constraints but may not detail them for each step.
- Score 1 (Weak): Minimal specification of what the AI needs at each step. "AI writes the description" without specifying inputs, constraints, or quality criteria.
- Score 0 (Unsafe/Poor): No specification of AI inputs or constraints for any step.
#### Secondary Domains
**Operational Consistency**
- Score 4 (Excellent): Proposes documentation standards for the workflow: checklists for each review gate, decision logs for exception handling, naming conventions, and version control for listings. Considers how to maintain consistency across the Merchandising team — not just one person's process but a team-wide standard. Proposes calibration sessions where team members review the same AI-generated listing and compare their QA decisions.
- Score 3 (Strong): Includes checklists or documentation at review gates. Considers team-level consistency. Mentions how to track workflow performance.
- Score 2 (Acceptable): Mentions the need for consistent review standards. Basic documentation included.
- Score 1 (Weak): No documentation, no consistency mechanisms. Workflow relies on individual judgment without standards.
- Score 0 (Unsafe/Poor): No consideration of operational consistency.
**Change Leverage**
- Score 4 (Excellent): Considers how to roll out this workflow to the team — training plan, pilot phase, documentation, feedback collection. Addresses likely team concerns ("Will AI replace my job?" "Can we trust AI copy?") and how to handle them. Proposes metrics to demonstrate value (time per SKU, error rate, team satisfaction).
- Score 3 (Strong): Proposes a rollout approach (pilot first, then scale). Considers team adoption concerns.
- Score 2 (Acceptable): Mentions that the team will need training. Basic rollout awareness.
- Score 1 (Weak): No consideration of how the team will adopt the workflow.
- Score 0 (Unsafe/Poor): Assumes the workflow will be implemented without any change management.
### Ideal Response Guide
An expert-level response would design a workflow roughly as follows:
**Step 1 — Supplier Data Intake & Validation (AI + Human):**
AI: Ingests supplier spec sheet, extracts structured data fields (name, dimensions, materials, features, UPC, MSRP), runs validation checks (dimensions within plausible ranges, UPC format valid, MSRP within category range).
Human: Reviews flagged validation exceptions — spec sheets where the AI detected potential errors (dimensions that seem wrong, materials that don't match the product category, MSRP that's an outlier). Clean spec sheets proceed automatically.
Handoff to Step 2: Validated, structured product data file.
**Step 2 — Product Categorization (AI, spot-checked):**
AI: Assigns product to site category and subcategory based on product attributes.
Human: Spot-checks a random sample (e.g., 15-20%). All products in new categories or with low AI confidence scores get manual review.
Handoff to Step 3: Categorized product data with taxonomy codes.
Also: AI flags products that contain safety-related keywords (helmet, harness, PFD, carabiner) for the regulated-product track.
**Step 3 — Content Generation (AI, human reviewed for regulated products):**
AI: Generates title, short description, long description, and bullet points using the validated spec sheet data, NovaMart brand voice guide (provided as input), and category-specific templates. For regulated products, AI pulls required safety certifications and disclaimer language from the product safety database.
Human review gate: All regulated product listings (climbing, helmets, water safety) get mandatory copy review by a subject-matter expert. Non-regulated products get automated brand voice scoring (AI compares generated copy against brand voice exemplars) — only listings that score below the voice-match threshold go to human copy review.
Handoff to Step 4: Draft listing copy.
**Step 4 — SEO Optimization (AI):**
AI: Generates meta title, meta description, search keywords, and optimizes copy for target terms based on search volume data and competitor keyword analysis.
Human review: Spot-checked only. SEO errors are lower-risk (they affect discoverability, not accuracy or safety).
Handoff to Step 5: SEO-optimized listing copy.
**Step 5 — Pricing (AI, always human-approved):**
AI: Suggests retail price based on MSRP, competitor pricing analysis, margin target, and promotional calendar.
Human review gate: ALWAYS human-approved. Given the \$18,000 pricing mistake Angela mentioned, no price goes live without a Merchandiser's sign-off. The reviewer sees: AI-suggested price, MSRP, competitor range, calculated margin, and any flags (price below margin floor, price significantly different from MSRP, price higher than all competitors).
Handoff to Step 6: Approved pricing.
**Step 6 — Photography Direction (Human):** Unchanged — not automated.
**Step 7 — Final QA (Human, tiered):**
Expedited track: Non-regulated products with high AI confidence scores across all steps get a streamlined QA check (title/price/category verification only — 5-minute check).
Standard track: Regulated products, high-value products (\>\$300), and products where any AI step was flagged or revised get full QA (all fields, disclaimers, cross-reference against spec sheet — 15-minute check).
Handoff to Step 8: Approved listing package.
**Step 8 — Publishing (Automated):**
Approved listings are published to the website and synced to Amazon. Automated post-publish checks verify the listing appears correctly on both platforms.
**Exception paths:** (a) Supplier data errors: AI validation flags → human review → contact supplier if errors confirmed → hold listing until corrected data received. (b) Regulatory products: flagged at Step 2, mandatory human review at Steps 3 and 7, must include all certifications and disclaimers — listing cannot publish without safety sign-off. (c) Pricing out of range: AI flags → Merchandiser reviews → if price is below margin floor, requires director approval or product is priced at floor; if price is above competitor ceiling, requires director approval or documentation of premium pricing rationale.
In the follow-up, the expert creates a two-track system:
- **Fast lane criteria:** Non-regulated product, supplier with \>95% historical data accuracy, price under \$300, product in an existing category, all AI confidence scores above threshold. Fast lane skips full copy review (gets automated brand voice scoring only) and gets expedited QA (5-minute check). Target: 30-40 minutes per SKU.
- **Standard lane criteria:** Regulated product, new supplier, price over \$300, new category, any AI confidence score below threshold, or any flag during workflow. Standard lane gets full copy review and full QA. Target: 45-60 minutes per SKU.
### Common Mistakes
- **No handoff specifications** — listing the steps but not describing what information transfers between them, leading to context loss at handoffs
- **Uniform review for all products** — applying the same QA intensity to a \$15 water bottle and a \$400 climbing harness
- **No exception handling** — designing only the happy path with no process for when supplier data is wrong, pricing is out of range, or regulatory requirements apply
- **Fully automating pricing** — given Angela's explicit concern about the \$18,000 pricing mistake, automating pricing without human review is a clear failure to incorporate stated requirements
- **Ignoring the brand voice concern** — not specifying how the AI would capture NovaMart's "enthusiast" tone, or not providing the brand voice guide as an AI input
- **Not considering supplier data quality** — designing a workflow that trusts the spec sheet without validation, when Angela explicitly said supplier data often contains errors
- **Black box workflow** — "AI handles content and pricing, humans do QA" without step-level decomposition
- **No feedback loop** — designing a static workflow with no mechanism for improving AI performance over time based on which listings get revised during QA
### Red Flags
- **Designs a workflow where AI-generated listings publish directly to the website without any human review** — for an e-commerce company where incorrect product specifications could create safety liability (climbing gear, helmets), incorrect pricing could cost thousands of dollars, and inaccurate listings could violate FTC product description requirements, this represents an unsafe automation decision.
- **Removes the pricing review step to meet the speed target** — Angela specifically cited an \$18,000 loss from a pricing error. Removing the pricing gate to save time demonstrates inability to incorporate explicit risk signals.
- **Ignores regulated products entirely** — designs one workflow for all products without distinguishing between categories with safety implications (climbing gear, helmets, water safety) and standard products.
- **Circular or impossible workflow dependencies** — Step 3 requires output from Step 5, or multiple steps are assigned to the same person simultaneously in a way that creates bottlenecks.
### Reliability Modifier Triggers
- **RM-4 (Unsafe Automation Bias):** Triggered if the workflow has no human checkpoints for consequential outputs (pricing, regulated product copy, product safety disclaimers). Also triggered if the follow-up response eliminates all human review in the "fast lane" — even expedited review should include a pricing verification check.
- **RM-6 (Inability to Explain Reasoning):** Triggered if the test-taker proposes a workflow sequence but cannot explain why steps are in that order, or places quality gates but cannot explain why those specific gates matter more than others.
- **RM-1 (Contradiction):** Triggered if the test-taker designs quality gates into the standard workflow but then eliminates all gates in the follow-up's "fast lane" — contradicting the principle that some review is always necessary for customer-facing content.
- **RM-2 (Overconfidence):** Triggered by statements like "ProductMind AI can handle the copy with no review needed" or "AI pricing is reliable enough to go straight to publishing" — especially given Angela's explicit concerns about accuracy.
---
*End of Scenarios 1–6*