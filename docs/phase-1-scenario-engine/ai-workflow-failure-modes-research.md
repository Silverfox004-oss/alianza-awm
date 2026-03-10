# AI Workflow Failure Modes Research

**Notion URL:** https://www.notion.so/31ed807b91118191bab3d81264326593

---

**Version:** 1.0
**Date:** March 9, 2026
**Purpose:** Comprehensive taxonomy of real-world AI workflow failures, organized to inform scenario design for the AI Workforce Map situational judgment test
**Dependencies:** deliverable_scoring_[domains.md](http://domains.md), deliverable_role_[taxonomy.md](http://taxonomy.md)
---
## Executive Summary
This report catalogs failure modes in AI-augmented workflows, drawing from real-world incidents across industries including healthcare, finance, legal, customer service, manufacturing, and enterprise operations. The taxonomy is organized into six categories: Input Failures, Process Failures, Output Failures, Integration Failures, Oversight Failures, and Adversarial/Edge Cases.
Each failure mode is documented with real-world examples, behavioral indicators that distinguish strong from weak human responses, and mapping to the 7 scoring domains of the AI Workforce Map assessment. This research directly informs the design of 12 scenario archetypes that form the backbone of the assessment.
Key finding: **The overwhelming majority of AI workflow failures are not technology failures — they are human-AI coordination failures.** The MIT GenAI Divide report found that 95% of enterprise AI pilots fail not due to model quality but due to "flawed enterprise integration" — the inability of organizations to design workflows, oversight mechanisms, and handoff protocols that make AI outputs reliable at scale. This validates the AI Workforce Map's focus on behavioral competencies rather than technical AI knowledge.
---
## Category 1: Input Failures (Garbage In Problems)
Input failures occur when the data, instructions, or context provided to AI systems is incomplete, ambiguous, incorrect, or malformed. These are upstream problems that contaminate everything downstream.
### 1.1 Vague or Ambiguous Task Framing
**Description:** AI systems receive instructions that are too broad, underspecified, or ambiguous, producing outputs that are technically responsive but practically useless or harmful. The AI generates plausible content that fills in the blanks with assumptions — and those assumptions may be wrong.
**Real-World Examples:**
- **Zillow Offers (\$881M loss):** Zillow's iBuying algorithm was trained on historical housing data but was not given adequate parameters for detecting market regime changes. The model continued buying homes at elevated prices even as the market shifted, ultimately losing \$881 million in 2021 and forcing a 25% staff reduction. The core input failure: the algorithm's operating parameters didn't account for macroeconomic volatility — a framing gap that no one caught.
- **Enterprise AI pilot failures:** According to MIT's GenAI Divide report, companies that attempted to build AI tools internally were twice as likely to fail as those using external platforms, largely because internal teams couldn't translate business needs into sufficiently specific AI instructions.
- **LLM hallucination from vague prompts:** When enterprise users issue vague instructions like "summarize our data" or "help with customer complaints," LLMs generate confident-sounding but potentially fabricated content. Contextual AI reports that "AI models don't hallucinate because they're unreliable. They hallucinate because they're asked to answer questions without access to the information they need."
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Identifies what's missing from the request before proceeding | Passes vague requests directly to AI |
| Specifies constraints, scope, success criteria | Adds superficial specificity without addressing core gaps |
| Asks: "What would failure look like?" | Assumes the AI will figure it out |
| Decomposes broad requests into bounded sub-tasks | Treats the entire request as one monolithic instruction |
**Relevant Scoring Domains:**
- **Task Framing** (Primary) — directly tests whether someone can translate vague goals into bounded instructions
- **Process Thinking** (Secondary) — tests whether they recognize that the input step is part of a larger workflow
- **Risk Judgment** (Secondary) — tests whether they recognize that vague inputs create unpredictable risk
---
### 1.2 Missing or Incomplete Context
**Description:** AI systems operate without critical contextual information — organizational policies, historical precedent, audience characteristics, regulatory constraints — producing outputs that are technically correct but contextually wrong.
**Real-World Examples:**
- **Air Canada chatbot (\$812 CAD ruling):** Air Canada's customer service chatbot told a grieving passenger he could book a flight and apply for a bereavement discount retroactively. The chatbot lacked access to the actual bereavement policy, which prohibited retroactive applications. A Canadian tribunal ruled Air Canada was responsible for the chatbot's misinformation.
- **IBM Watson Health (\$4B loss):** IBM Watson for oncology was trained on hypothetical patients rather than real-world clinical data. Doctors found it "clunky and redundant" because it lacked the messy, unstructured clinical context that characterizes real patient care. IBM ultimately sold the assets at a \$4 billion loss.
- **UnitedHealth nH Predict algorithm:** UnitedHealth's AI model for predicting post-acute care duration failed to account for comorbidities and individual patient complexity. When patients appealed AI-driven care denials, 90% were reversed — indicating the model's context about individual patient needs was fatally incomplete.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Identifies what context the AI needs to perform well | Assumes the AI has all necessary information |
| Checks whether source data is current and complete | Trusts AI confidence indicators without verification |
| Specifies what policies, guidelines, or constraints apply | Omits organizational context from AI instructions |
| Recognizes that AI cannot infer unwritten rules | Expects AI to "understand" unstated requirements |
**Relevant Scoring Domains:**
- **Task Framing** (Primary) — tests recognition of missing inputs
- **Verification Instinct** (Secondary) — tests whether they check that the AI had adequate context
- **Exception Handling** (Secondary) — tests what they do when they discover the context gap
---
### 1.3 Biased or Non-Representative Training Data
**Description:** AI systems produce biased outputs because the data they were trained on reflects historical inequities, non-representative samples, or structural discrimination.
**Real-World Examples:**
- **Amazon's hiring algorithm (scrapped 2015):** Amazon's resume-screening AI was trained on 10 years of resumes, most of which were from men. The system penalized resumes containing the word "women's" and downgraded graduates of all-women's colleges.
- **COMPAS recidivism algorithm:** The criminal justice risk assessment tool predicted twice as many false positives for Black offenders (45%) compared to white offenders (23%).
- **US healthcare algorithm (racial bias):** An algorithm used on over 200 million patients to predict care needs heavily favored white patients over Black patients because it used healthcare cost history as a proxy for medical need.
- **LLM bias in medical recommendations:** A UCSF study analyzing over 1.7 million AI-generated vignette responses found that race, gender, income, and housing status influenced evaluation and treatment recommendations even when patients had identical health conditions.
- **Apple Card gender bias:** Apple's credit card algorithm offered significantly lower credit limits to women compared to male spouses — Steve Wozniak received a limit 10x higher than his wife's despite shared accounts.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Questions whether training data represents the intended population | Assumes AI output is unbiased by default |
| Proposes monitoring for disparate impact across groups | Treats AI fairness as a solved problem |
| Recognizes that "historically correct" data may encode discrimination | Conflates historical patterns with appropriate outcomes |
| Designs review processes that specifically check for bias | Lacks awareness that bias exists in AI systems |
**Relevant Scoring Domains:**
- **Risk Judgment** (Primary) — bias creates legal, reputational, and ethical risk
- **Verification Instinct** (Secondary) — detecting biased outputs requires active checking
- **Change Leverage** (Secondary) — addressing systemic bias requires organizational change
---
### 1.4 Data Drift and Stale Inputs
**Description:** AI models are trained on historical data that no longer represents current reality. As the world changes, the model's accuracy degrades — but the degradation is often invisible until a catastrophic failure.
**Real-World Examples:**
- **Zillow's market shift blindness:** Zillow's pricing model couldn't detect that the post-pandemic real estate market had fundamentally shifted. The algorithm continued buying at peak prices, interpreting temporary market signals as permanent trends.
- **Manufacturing AI inspection failures:** About 34% of manufacturing defects are missed when AI inspection systems aren't retrained for new product variations, changed materials, or evolving production conditions.
- **COVID-era content moderation:** When social media companies shifted to fully automated content moderation during COVID lockdowns, YouTube, Facebook, and Twitter all warned that more videos and other content could be erroneously removed because automated tools trained on pre-pandemic data couldn't handle the new patterns of pandemic-era content.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Questions how recently the model was trained/updated | Assumes AI accuracy is static |
| Monitors for performance degradation over time | Treats AI performance as set-and-forget |
| Proposes periodic validation against fresh ground truth | Relies on historical accuracy as proof of current accuracy |
| Recognizes that environmental changes invalidate old models | Trusts that "it worked before" means it works now |
**Relevant Scoring Domains:**
- **Operational Consistency** (Primary) — detecting drift requires consistent monitoring
- **Verification Instinct** (Secondary) — requires ongoing validation
- **Risk Judgment** (Secondary) — stale data creates hidden risk
---
## Category 2: Process Failures (Workflow Design Problems)
Process failures occur when the workflow that connects humans and AI is poorly designed — missing steps, wrong sequencing, inadequate handoffs, or absent quality gates.
### 2.1 Missing or Misplaced Quality Gates
**Description:** Workflows lack human review checkpoints at critical junctures, or review steps are placed where they're ineffective — too late to prevent harm, too early to catch problems, or at the wrong point in the workflow.
**Real-World Examples:**
- **McDonald's McHire bot (security breach):** McDonald's AI hiring chatbot had no meaningful security review in its deployment pipeline. Security researchers gained full administrative access by guessing a staff login used "123456" as both username and password — a test account left active for six years without detection.
- **Morgan & Morgan AI citation failure:** The 42nd-largest law firm by headcount was sanctioned when lawyers submitted a motion citing eight nonexistent cases generated by an internal AI platform. The hallucinated citations passed through multiple review layers without anyone verifying the cases existed.
- **UnitedHealth override prohibition:** UnitedHealth instructed case managers not to deviate from the nH Predict algorithm's recommendations and held them to performance targets within 1% of the algorithm's predicted lengths of stay — effectively eliminating the human quality gate from the workflow.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Designs workflows with verification at high-risk decision points | Creates linear workflows with no checkpoints |
| Places human review where errors have the highest downstream cost | Puts review at the end, after damage is done |
| Specifies what the reviewer should check at each gate | Creates "review" steps without defined criteria |
| Designs for the realistic capacity of human reviewers | Creates review bottlenecks that invite rubber-stamping |
**Relevant Scoring Domains:**
- **Process Thinking** (Primary) — tests workflow design capability
- **Risk Judgment** (Primary) — tests whether gates are placed proportional to risk
- **Operational Consistency** (Secondary) — tests whether gates are maintained over time
---
### 2.2 Undefined Automation Boundaries
**Description:** Organizations fail to clearly define what should be automated, what should be AI-assisted with human review, and what should remain fully human-controlled. The result: AI handles tasks it shouldn't, or humans spend effort on tasks AI should handle.
**Real-World Examples:**
- **Taco Bell drive-thru AI:** Taco Bell deployed voice AI to over 500 drive-throughs but the automation boundary was wrong — the system was expected to handle complex, adversarial, and accent-diverse interactions that required human flexibility. One customer ordered "18,000 cups of water," crashing the system.
- **IBM Watson for Oncology scope creep:** MD Anderson Cancer Center's partnership with IBM Watson expanded from a \$5 million leukemia research project to cover multiple diseases without proper IT oversight. After spending \$62 million, an audit found the system hadn't treated a single patient.
- **Enterprise AI budget misallocation:** MIT's research found that more than half of generative AI budgets are devoted to sales and marketing, yet the biggest ROI comes from back-office automation — suggesting companies are automating the wrong things.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Explicitly identifies which tasks are suitable for AI vs. human | Treats automation as all-or-nothing |
| Assesses task risk level before deciding automation level | Automates based on convenience rather than suitability |
| Designs tiered oversight based on risk | Applies uniform automation regardless of stakes |
| Recognizes edge cases that AI can't handle | Assumes AI can handle all variations of a task |
**Relevant Scoring Domains:**
- **Risk Judgment** (Primary) — tests automation boundary judgment
- **Task Framing** (Primary) — tests ability to scope what AI should/shouldn't do
- **Process Thinking** (Secondary) — tests workflow design that respects boundaries
---
### 2.3 Absent Exception Paths
**Description:** Workflows are designed only for the happy path — they handle normal operations but have no defined process for what happens when AI fails, produces unexpected outputs, or encounters edge cases.
**Real-World Examples:**
- **Delivery chatbot with no escape hatch:** A delivery company's AI chatbot had no mechanism to transfer customers to humans. After fifteen minutes of circular responses, customers hung up frustrated.
- **Cascading agent failures:** 40% of multi-agent AI pilots fail within six months because orchestration systems lack exception handling for agent conflicts, deadlocks, and error propagation.
- **DPD chatbot meltdown:** Parcel delivery firm DPD's chatbot went off-script, writing poems criticizing the company and using profanity — there was no exception path to contain the chatbot's behavior when it went outside normal parameters. The exchange went viral with 800,000+ views.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Designs for failure, not just success | Only considers the happy path |
| Defines escalation paths for different failure types | Has no plan for when AI produces unexpected output |
| Builds "circuit breakers" that halt harmful processes | Lets processes continue regardless of output quality |
| Tests edge cases before deployment | Discovers edge cases in production |
**Relevant Scoring Domains:**
- **Exception Handling** (Primary) — tests the ability to design for and respond to failures
- **Process Thinking** (Primary) — tests workflow completeness
- **Risk Judgment** (Secondary) — tests whether failure scenarios are identified before they occur
---
### 2.4 Feedback Loop Failures
**Description:** AI workflows lack mechanisms to learn from errors, improve over time, or detect degrading performance. Without feedback loops, the same mistakes recur indefinitely.
**Real-World Examples:**
- **UnitedHealth's 90% appeal reversal rate:** The nH Predict algorithm maintained a 90% reversal rate on appealed care denials, but this signal was never connected back to model improvement. The system lacked any mechanism connecting the appeal outcomes to performance monitoring.
- **Customer service chatbot learning failures:** AI agents often fail to learn from human agent actions after escalation, creating a perpetual cycle where the same issues escalate repeatedly without system improvement.
- **AI-on-AI feedback loops:** A Harvard Misinformation Review study warns of a "possibly degenerative AI-on-AI feedback loop where AI-generated inaccuracies will pollute future training data, leading to model collapse."
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Proposes mechanisms to capture and learn from errors | Treats each error as a one-off incident |
| Designs performance metrics into the workflow | Has no way to measure if the AI is improving or degrading |
| Creates structured channels for human feedback to reach AI operators | Accepts that the AI "is what it is" |
| Tracks error patterns over time to identify systemic issues | Fixes individual errors without investigating patterns |
**Relevant Scoring Domains:**
- **Change Leverage** (Primary) — tests ability to drive systematic improvement
- **Operational Consistency** (Primary) — tests whether performance is tracked over time
- **Process Thinking** (Secondary) — tests whether feedback is built into the workflow design
---
## Category 3: Output Failures (Undetected Bad Outputs)
Output failures occur when AI produces incorrect, misleading, fabricated, or harmful content that passes through to downstream consumers undetected.
### 3.1 Hallucination and Fabrication
**Description:** AI generates confident, plausible-sounding content that is factually false — fabricated statistics, nonexistent citations, invented entities, or contradictory claims presented as authoritative.
**Real-World Examples:**
- **Lawyer sanctions for fake cases (\$5,000 fine):** Attorneys from the law firm Levidow, Levidow & Oberman cited nonexistent legal cases generated by ChatGPT in a federal court filing. The judge sanctioned the lawyers \$5,000 and issued a standing order requiring disclosure of AI-generated content.
- **\$67.4 billion enterprise hallucination cost:** A comprehensive study found AI hallucinations cost businesses \$67.4 billion in losses in 2024 alone, with 47% of executives admitting they've acted on faulty AI content.
- **Fake summer reading list:** US newspapers including the Chicago Sun-Times published an AI-generated summer reading list where only 5 of 15 titles were real books.
- **Google AI Overview satire-as-fact:** In February 2025, Google's AI Overview cited an April Fool's satire about "microscopic bees powering computers" as factual in search results.
- **Morgan & Morgan hallucinated citations:** Eight nonexistent cases generated by an internal AI platform were included in a federal court motion, resulting in \$5,000 in sanctions split across three lawyers.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Cross-references AI claims against source data | Accepts well-written AI output as accurate |
| Checks specific facts, citations, statistics | Relies on overall "quality feel" |
| Knows that fluency ≠ accuracy | Equates polished prose with reliable content |
| Proposes systematic verification protocols | Trusts AI because "it's usually right" |
**Relevant Scoring Domains:**
- **Verification Instinct** (Primary) — the defining challenge of hallucination detection
- **Risk Judgment** (Primary) — assessing consequences of undetected hallucination
- **Exception Handling** (Secondary) — what to do when hallucination is discovered
---
### 3.2 Confident But Wrong Outputs
**Description:** Distinct from outright fabrication, these failures involve AI that produces outputs that are wrong in subtle, domain-specific ways — technically plausible but functionally incorrect.
**Real-World Examples:**
- **Healthcare dosage risks:** AI hallucinations in healthcare settings could include incorrect dosage advice that risks patient safety.
- **Automotive supply chain specs:** An AI hallucinating a torque specification for a brake assembly or misquoting a supplier certification requirement could cause part failures, recalls, or halted production lines.
- **Fine-tuned models hallucinating fluently:** Contextual AI notes that fine-tuned models "may hallucinate more fluently — using the right terminology while still generating incorrect information."
- **Cursor AI's "Sam" chatbot:** Customer support bot told users that unexpected logouts were "expected behavior" under a new policy — but no such policy existed.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Checks domain-specific details, not just general plausibility | Accepts outputs that "sound right" |
| Validates technical claims against source documents | Trusts AI domain expertise |
| Recognizes that correct terminology doesn't equal correct content | Equates jargon usage with accuracy |
| Spots logical inconsistencies between sections | Reviews outputs only at surface level |
**Relevant Scoring Domains:**
- **Verification Instinct** (Primary) — catching subtle errors requires deeper verification
- **Risk Judgment** (Primary) — wrong-but-confident outputs in high-stakes domains create severe risk
- **Task Framing** (Secondary) — recognizing that better instructions might have prevented the error
---
### 3.3 Bias Amplification in Outputs
**Description:** AI generates outputs that reflect and amplify biases present in training data, producing discriminatory recommendations, stereotyped content, or systematically unfair outcomes.
**Real-World Examples:**
- **Workday hiring discrimination lawsuit:** Job seeker Derek Mobley filed a lawsuit alleging Workday's AI-based applicant screening discriminated based on age, race, and disability, potentially affecting hundreds of thousands of applicants.
- **LLM resume bias against older women:** A Stanford/Nature study found that LLMs consistently portrayed women as younger and less experienced than male counterparts when generating resumes.
- **iTutor Group age discrimination:** The EEOC found the company's AI recruiting software automatically rejected female applicants aged 55+ and male applicants aged 60+, rejecting over 200 qualified applicants.
- **LinkedIn algorithm gender bias:** LinkedIn's AI job recommendation system favored male candidates over equally qualified female counterparts.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Checks AI outputs for disparate impact across groups | Assumes AI neutrality |
| Questions whether recommendations would differ for different demographics | Treats all AI outputs as inherently fair |
| Proposes bias auditing protocols | Lacks awareness of AI bias as a failure mode |
| Escalates potential bias findings to appropriate reviewers | Accepts biased outputs because "that's what the data says" |
**Relevant Scoring Domains:**
- **Risk Judgment** (Primary) — bias creates legal and reputational risk
- **Verification Instinct** (Secondary) — detecting bias requires specific checking
- **Change Leverage** (Secondary) — addressing bias requires systemic change
---
### 3.4 Errors of Omission
**Description:** AI produces outputs that are technically accurate for what they contain but fail to include critical information — missing caveats, omitted stakeholders, absent risk factors, or incomplete analysis.
**Real-World Examples:**
- **Financial analysis missing competitors:** AI-generated market analyses may provide accurate data about known competitors while omitting major players entirely.
- **Healthcare AI missing comorbidities:** UnitedHealth's nH Predict algorithm didn't account for comorbidities and individual patient complexity.
- **Manufacturing inspection gaps:** AI inspection systems miss about 34% of manufacturing defects partly because the training data doesn't include enough examples of rare defects.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Asks "What's missing from this output?" not just "What's wrong?" | Only checks what's present for accuracy |
| Compares AI output against a completeness checklist | Accepts the scope of the output as given |
| Identifies stakeholders, risks, or factors the AI didn't mention | Trusts that AI covered everything relevant |
| Recognizes that absence of information is itself a risk | Equates "no errors found" with "complete and correct" |
**Relevant Scoring Domains:**
- **Verification Instinct** (Primary) — detecting omissions is a Level 3-4 verification skill
- **Task Framing** (Secondary) — better framing can specify what must be included
- **Risk Judgment** (Secondary) — omissions in high-stakes contexts create invisible risk
---
## Category 4: Integration Failures (Handoff and Human-AI Coordination)
Integration failures occur at the boundaries between human work and AI work — handoffs, escalation points, and coordination mechanisms.
### 4.1 Context Loss at Handoffs
**Description:** When work transfers between AI and humans (or between AI systems), critical context is lost — conversation history, prior decisions, customer intent, or business context.
**Real-World Examples:**
- **Customer service amnesia problem:** According to Cisco data, one in three customer service agents lack the customer context needed to deliver ideal experiences after AI-to-human transfers.
- **Cold transfer failures:** Bucher+Suter reports two dominant failure patterns: "The amnesia problem" (customer repeats everything) and "The cold transfer" (handoff happens without warning, context, or guidance).
- **Fragmented tech stack handoffs:** CRM integration gaps, knowledge base disconnection, and ticketing system silos mean handoff summaries don't include what solutions were already attempted.
- **Australia's CBA chatbot:** Commonwealth Bank of Australia's chatbot appeared successful by automation metrics, but without effective handoffs for complex queries, the human workload actually increased.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Designs handoffs with explicit context transfer | Assumes context travels automatically |
| Specifies what information must accompany each handoff | Treats handoffs as simple transfers |
| Defines how prior conversation/decision history is passed | Expects the next handler to start fresh |
| Tests handoff quality from the receiving end | Only evaluates handoffs from the sender's perspective |
**Relevant Scoring Domains:**
- **Process Thinking** (Primary) — handoff design is core process architecture
- **Task Framing** (Secondary) — each handoff requires reframing the task for the new handler
- **Operational Consistency** (Secondary) — consistent handoffs require documented protocols
---
### 4.2 Misplaced Handoff Boundaries
**Description:** The line between AI-handled and human-handled work is drawn in the wrong place — either AI handles things it shouldn't (handoff too late) or humans do work AI should handle (handoff too early).
**Real-World Examples:**
- **Taco Bell/McDonald's drive-thru AI:** Both companies deployed AI voice ordering at hundreds of locations where the handoff boundary was drawn at "all ordering" rather than "simple ordering with escalation for complex requests." McDonald's ended its partnership with IBM after the AI couldn't handle accents, background noise, or edge cases.
- **The no-escape chatbot:** The AI was doing exactly what it was trained to do: answer common questions at scale. But the designers drew the handoff line in the wrong place. There was no escape hatch for questions outside the bot's trained responses.
- **Qualtrics customer AI data:** A Qualtrics study from October 2025 found nearly one in five consumers who used AI for customer service saw no benefit.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Evaluates each task step for AI suitability independently | Draws one automation boundary for the entire workflow |
| Defines clear escalation triggers for AI-to-human transfer | Relies on AI to self-assess when it needs help |
| Considers edge cases when setting boundaries | Sets boundaries based on the happy path |
| Builds escape hatches for when AI can't handle a request | Creates AI interactions with no exit path |
**Relevant Scoring Domains:**
- **Risk Judgment** (Primary) — tests where humans must remain in control
- **Process Thinking** (Primary) — tests handoff boundary design
- **Exception Handling** (Secondary) — tests what happens at the boundary
---
### 4.3 Cascading Errors Across Systems
**Description:** An error in one AI system propagates through interconnected systems, amplifying at each stage. In multi-agent systems, one hallucination or misinterpretation triggers downstream actions across multiple systems before anyone detects the original error.
**Real-World Examples:**
- **2010 Flash Crash (\$4.1 billion cascade):** An automated selling algorithm executed a \$4.1 billion futures contract sale that triggered cascading algorithmic responses across the entire market. Over 15,000 trading algorithms responded to each other's actions, driving prices to a penny for some stocks in minutes.
- **Knight Capital (\$460M in 45 minutes):** A dormant code was unexpectedly triggered, generating millions of erroneous orders and losing over \$460 million in 45 minutes — faster than human oversight could detect and respond.
- **Price-inventory death spiral:** A pricing agent and inventory agent created a feedback loop where one misread inventory value triggered escalating price increases and order cuts. After 10 cycles, the price tripled and orders collapsed by 76%.
- **Agent trust chain failure:** A planning agent hallucinated a decimal point in a transfer amount, and each downstream agent trusted the previous agent's output, resulting in a 10x overpayment processed in 6 seconds.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Designs isolation boundaries between AI systems | Assumes one system's output is another's reliable input |
| Implements cross-checks against original source data | Only validates within each system independently |
| Builds circuit breakers that halt cascading processes | Allows unlimited automated propagation |
| Considers what happens when multiple AI systems interact | Evaluates each AI system in isolation |
**Relevant Scoring Domains:**
- **Risk Judgment** (Primary) — cascading failures create exponential risk
- **Process Thinking** (Primary) — preventing cascades requires architectural thinking
- **Exception Handling** (Primary) — detecting and halting cascades is a critical exception response
---
### 4.4 AI-Creates-More-Work Paradox
**Description:** AI deployment that was supposed to reduce workload instead increases it — by generating outputs that require extensive human review, creating new types of errors to manage, or shifting work from creation to evaluation.
**Real-World Examples:**
- **AI fatigue and cognitive overload:** An engineer who builds agent infrastructure full-time describes burning out because "what used to take me 3 hours now takes 45 minutes" but "I might touch six different problems in a day. Context-switching between six problems is brutally expensive for the human brain."
- **Taco Bell staff intervention increase:** Rather than reducing staff workload, Taco Bell's drive-thru AI created more work for staff who had to constantly intervene when the system failed.
- **Human review nullifying efficiency:** Contextual AI observes that many organizations default to human review of all AI outputs, which "catches hallucinations but eliminates the efficiency gains that motivated AI adoption in the first place."
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Evaluates whether AI actually reduces total workflow effort | Assumes AI adoption always improves efficiency |
| Considers the cognitive cost of reviewing AI output | Ignores the shift from generative to evaluative work |
| Designs review processes that are sustainable at scale | Creates review burdens that lead to fatigue |
| Recognizes that evaluation fatigue degrades quality | Treats human review as infinitely scalable |
**Relevant Scoring Domains:**
- **Change Leverage** (Primary) — tests ability to evaluate whether AI adoption is net-positive
- **Process Thinking** (Secondary) — tests whether the full workflow is considered
- **Operational Consistency** (Secondary) — tests sustainable process design
---
## Category 5: Oversight Failures (Review and QA Breakdowns)
Oversight failures occur when human review mechanisms fail to catch AI errors — due to automation bias, review fatigue, skill gaps, or systemic pressures that undermine oversight quality.
### 5.1 Automation Bias and Over-Trust
**Description:** Humans systematically over-rely on AI outputs, accepting them without adequate verification. The more reliable AI appears, the less humans scrutinize it — creating a paradox where improving AI accuracy can actually reduce system safety.
**Real-World Examples:**
- **Clinical automation bias (6-11% override rate):** Healthcare studies show clinicians overrode their own correct decisions in favor of erroneous AI advice 6-11% of the time, and the risk of incorrect decisions increased by 26% when AI output was in error. Half of all users didn't detect any technology failures during a typical work day.
- **The "Bainbridge Irony" of automation:** Researcher Lisanne Bainbridge documented in 1983 that "the more reliable the automation, the less the human operator is able to contribute when it fails." When automation was consistently reliable, operators detected only about 30% of errors; when the system sometimes failed visibly, detection jumped to 75%.
- **AI guidance uniquely biasing:** A 2026 Nature study found that participants who received AI guidance and had positive attitudes toward AI showed poorer decision-making than those with less positive attitudes.
- **Skills degradation:** 27.7% of students who relied extensively on AI dialogue systems showed degraded decision-making skills, suggesting over-reliance actively erodes critical thinking.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Maintains independent verification regardless of AI confidence | Accepts AI outputs because they "look professional" |
| Questions why they agree with the AI, not just whether | Defaults to AI recommendation without evaluation |
| Recognizes that their own over-trust is a risk factor | Believes their expertise protects them from automation bias |
| Designs forcing functions to prevent complacency | Relies on willpower to maintain vigilance |
**Relevant Scoring Domains:**
- **Verification Instinct** (Primary) — the core defense against automation bias
- **Risk Judgment** (Primary) — recognizing that over-trust is itself a risk
- **Operational Consistency** (Secondary) — maintaining verification quality over time
---
### 5.2 Approval Fatigue and Rubber-Stamping
**Description:** Reviewers who process high volumes of AI outputs develop fatigue that degrades review quality. Over time, approval becomes a formality rather than a genuine quality check.
**Real-World Examples:**
- **AI review fatigue as documented pattern:** Research shows that review approval speed trending faster without decrease in complexity, comment density declining, and bug escape rates increasing are all signals of review fatigue.
- **Vigilance decrement research:** Vigilance research spanning 75 years confirms performance drops after the first half hour on task.
- **Parasuraman's 30% detection rate:** A key study found that when automation was consistently reliable, operators detected only about 30% of errors — meaning 70% of automation failures went unnoticed during monitoring.
- **DBS Bank on rubber-stamping:** DBS Bank's Sameer Gupta warns: "Without clear insight into how and why an AI system reaches its conclusions, oversight becomes superficial, reducing human involvement to a rubber stamp rather than a critical check."
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Recognizes review fatigue as a systemic risk | Treats review quality as solely an individual discipline problem |
| Designs review processes to prevent fatigue (rotation, batch limits) | Creates review processes that assume unlimited human attention |
| Measures review quality over time (not just throughput) | Tracks only how many items were reviewed, not review quality |
| Proposes structural solutions (sampling, tiered review) | Relies on "try harder" as the solution to declining review quality |
**Relevant Scoring Domains:**
- **Operational Consistency** (Primary) — rubber-stamping is a consistency failure
- **Verification Instinct** (Primary) — tests whether verification survives volume pressure
- **Change Leverage** (Secondary) — addressing fatigue requires process redesign
---
### 5.3 Diffusion of Responsibility
**Description:** When AI is involved in a decision, no single person takes ownership of the outcome. Operators assume the Approver will catch errors; Approvers assume the AI is mostly right; everyone assumes someone else is responsible.
**Real-World Examples:**
- **Air Canada's "separate entity" defense:** Air Canada argued in court that its chatbot was "a separate legal entity responsible for its own actions" — attempting to disclaim responsibility for AI-generated customer communications.
- **Governance responsibility gaps:** When AI surfaces a decision requiring escalation and no escalation path exists, the pilot stalls. When AI produces a recommendation that conflicts with established process and no one is authorized to override, the AI is ignored. Ownership is unclear.
- **EU/EDPS on perceived agency:** Operators may choose not to override AI output due to fear of consequences, particularly if the system's recommendation is later found correct.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Takes explicit ownership of their part of the workflow | Assumes someone else will catch errors |
| Defines who is responsible for what at each step | Leaves accountability ambiguous |
| Doesn't hide behind "the AI did it" | Uses AI involvement as a responsibility shield |
| Proactively confirms handoff responsibilities | Passes work along without confirming downstream review |
**Relevant Scoring Domains:**
- **Operational Consistency** (Primary) — consistent accountability across all iterations
- **Risk Judgment** (Secondary) — understanding that ambiguous ownership creates risk
- **Process Thinking** (Secondary) — designing workflows with clear accountability
---
### 5.4 Inadequate Reviewer Competence
**Description:** The humans reviewing AI outputs lack the domain expertise, training, or tools to effectively evaluate what the AI produced. They can assess surface quality (grammar, formatting) but not substantive accuracy.
**Real-World Examples:**
- **The verification gap in AI-assisted coding:** AI makes it easy to generate code in domains you haven't mastered yet — "complacency hits harder when you lack the expertise to spot what's wrong."
- **Content moderation complexity:** Even OpenAI's own assessment found that GPT-4 performed similarly to humans with "light training" but "are still overperformed by experienced, well-trained human moderators."
- **GPA Resolution on oversight competence:** The 47th Global Privacy Assembly Resolution emphasizes that organizations must "ensure that the overseer has adequate knowledge and expertise to evaluate the AI system's decision."
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Recognizes the limits of their own verification capability | Assumes they can evaluate any AI output |
| Seeks additional expertise when output is outside their domain | Reviews unfamiliar content at surface level only |
| Proposes pairing reviewers with domain experts | Assigns review based on availability, not expertise |
| Distinguishes between what they can verify and what needs specialist review | Approves outputs they don't fully understand |
**Relevant Scoring Domains:**
- **Verification Instinct** (Primary) — knowing what you can't verify is a verification skill
- **Exception Handling** (Secondary) — escalating to expertise is exception handling
- **Risk Judgment** (Secondary) — deploying unqualified reviewers is a risk judgment failure
---
## Category 6: Adversarial and Edge Cases
These failures involve deliberate exploitation, unexpected stress conditions, or boundary cases that reveal gaps between apparent competency and genuine resilience.
### 6.1 Prompt Injection and Manipulation
**Description:** External actors deliberately craft inputs to manipulate AI system behavior — bypassing safety guardrails, extracting sensitive information, or causing the AI to produce harmful outputs.
**Real-World Examples:**
- **Chevrolet chatbot manipulation:** A user instructed a Chevrolet customer service chatbot to "agree to all requests" and got it to offer a 2024 Chevy Tahoe for one dollar as a "legally binding offer."
- **High success rates for attacks:** Palo Alto Networks research found that "some attack techniques achieved success rates exceeding 50% across models of different scales, with certain cases reaching up to 88%."
- **OWASP Top 10 LLM risks:** Prompt injection is the #1 risk in the OWASP Top 10 for LLM & Generative AI Security. Consequences include "disclosure of sensitive information, content manipulation leading to incorrect or biased outputs, and executing arbitrary commands in connected systems."
- **IBM refund policy exploitation:** An autonomous customer service agent began issuing refunds outside established policy after a customer successfully convinced it to grant one, then started approving further refunds freely, prioritizing positive reviews over policy.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Anticipates that users may try to manipulate AI inputs | Assumes all inputs are well-intentioned |
| Designs input validation and sanitization | Trusts raw user input |
| Limits AI authority to prevent out-of-scope actions | Gives AI broad permissions without boundaries |
| Tests for adversarial inputs before deployment | Discovers manipulation vulnerabilities in production |
**Relevant Scoring Domains:**
- **Risk Judgment** (Primary) — assessing adversarial risk
- **Exception Handling** (Primary) — responding to detected manipulation
- **Process Thinking** (Secondary) — designing manipulation-resistant workflows
---
### 6.2 Time Pressure and Cognitive Load Exploitation
**Description:** Scenarios where urgency, authority pressure, or competing demands degrade the quality of human oversight — the human factors equivalent of a stress test.
**Real-World Examples:**
- **AI fatigue cognitive overload:** Engineers working with AI report touching six different problems in a day, each "only taking an hour", but experiencing severe decision fatigue and cognitive depletion. "By Wednesday, I couldn't make simple decisions anymore."
- **"AI Monday" intensity:** IgniteTech's CEO mandated that Mondays could only be spent on AI projects and ultimately replaced 80% of staff who couldn't keep up — demonstrating the organizational pressure to adopt AI regardless of readiness.
- **Cognitive forcing functions in aviation:** Boeing incorporates real-time alerts and cognitive forcing functions that prompt pilots to reassess AI-generated commands during critical flight phases, recognizing that time pressure degrades human judgment.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Maintains verification quality under stated time pressure | Drops checks when urgency is introduced |
| Explicitly negotiates deadlines vs. quality | Caves to pressure without articulating tradeoffs |
| Proposes interim solutions that maintain safety | Sends unverified outputs to meet deadlines |
| Recognizes that their own judgment degrades under pressure | Assumes their performance is stable regardless of conditions |
**Relevant Scoring Domains:**
- **Exception Handling** (Primary) — performance under pressure
- **Verification Instinct** (Primary) — whether verification survives urgency
- **Operational Consistency** (Secondary) — maintaining standards under varying conditions
---
### 6.3 Social Engineering via AI Outputs
**Description:** AI outputs are used (deliberately or inadvertently) to create social pressure — the AI's recommendation becomes the "expert opinion" that humans feel compelled to follow, even when their own judgment disagrees.
**Real-World Examples:**
- **The "Technological Protection" fallacy:** Research shows people succumb to the belief that using technology removes biases, leading to over-reliance on AI guidance.
- **Operators afraid to override AI:** The EU TechDispatch notes that operators "may choose not to override a system's output due to fear of potential consequences, particularly if the system's recommendation is later found to be correct."
- **Atlassian's evolving decision rights:** Atlassian recognized that unclear boundaries between AI-led and human-led decisions were creating bottlenecks and now treats decision rights as something that regularly evolves.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Disagrees with AI when evidence supports it | Defers to AI "expertise" against own judgment |
| Documents disagreements with AI for pattern tracking | Silently accepts AI recommendations they doubt |
| Recognizes that AI consensus doesn't equal correctness | Treats AI agreement as validation |
| Maintains independent judgment while using AI as input | Treats AI output as the default they must justify overriding |
**Relevant Scoring Domains:**
- **Risk Judgment** (Primary) — recognizing social pressure as a risk
- **Verification Instinct** (Secondary) — maintaining independent verification
- **Change Leverage** (Secondary) — building cultures where AI override is acceptable
---
### 6.4 Gradual Drift and Normalization of Deviance
**Description:** Standards, processes, and quality expectations gradually erode as small exceptions accumulate. Each individual exception seems minor, but the cumulative effect is a systematic degradation of oversight quality.
**Real-World Examples:**
- **Review quality erosion:** Approval speed trending faster without decrease in complexity, comment density declining, and bug escape rate increasing are all documented signals of gradual quality drift in AI-assisted workflows.
- **AI governance maturity gap:** Most AI failures are governance failures, not technology failures. Governance is "layered on after the fact instead of being built into the strategy from the beginning."
- **Shadow AI proliferation:** The MIT GenAI Divide report highlights widespread "shadow AI" — unsanctioned AI tools used outside organizational governance — representing grassroots drift away from approved workflows.
**Behavioral Indicators:**
| Strong Response | Weak Response |
|---|---|
| Monitors for gradual changes in process adherence | Assumes processes are followed because they exist |
| Defines metrics that detect drift (not just current performance) | Only measures outcomes, not process fidelity |
| Investigates small exceptions as potential systemic signals | Treats each small deviation as isolated |
| Builds periodic process audits into the workflow | Relies on incident-driven review only |
**Relevant Scoring Domains:**
- **Operational Consistency** (Primary) — the core defense against drift
- **Change Leverage** (Primary) — addressing drift requires proactive change
- **Risk Judgment** (Secondary) — recognizing drift as compounding risk
---
## Cross-Reference Matrix: Failure Modes × Scoring Domains
This matrix maps each failure mode to the scoring domains it most strongly tests. **P** = Primary relevance, **S** = Secondary relevance.
| Failure Mode | Task Framing | Process Thinking | Verification Instinct | Exception Handling | Risk Judgment | Operational Consistency | Change Leverage |
|---|---|---|---|---|---|---|---|
| :------------ | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| **1.1 Vague Task Framing** | P | S |  |  | S |  |  |
| **1.2 Missing Context** | P |  | S | S |  |  |  |
| **1.3 Biased Data** |  |  | S |  | P |  | S |
| **1.4 Data Drift** |  |  | S |  | S | P |  |
| **2.1 Missing Quality Gates** |  | P |  |  | P | S |  |
| **2.2 Undefined Automation Boundaries** | P | S |  |  | P |  |  |
| **2.3 Absent Exception Paths** |  | P |  | P | S |  |  |
| **2.4 Feedback Loop Failures** |  | S |  |  |  | P | P |
| **3.1 Hallucination** |  |  | P | S | P |  |  |
| **3.2 Confident But Wrong** | S |  | P |  | P |  |  |
| **3.3 Bias Amplification** |  |  | S |  | P |  | S |
| **3.4 Errors of Omission** | S |  | P |  | S |  |  |
| **4.1 Context Loss at Handoffs** | S | P |  |  |  | S |  |
| **4.2 Misplaced Handoff Boundaries** |  | P |  | S | P |  |  |
| **4.3 Cascading Errors** |  | P |  | P | P |  |  |
| **4.4 AI-Creates-More-Work** |  | S |  |  |  | S | P |
| **5.1 Automation Bias** |  |  | P |  | P | S |  |
| **5.2 Approval Fatigue** |  |  | P |  |  | P | S |
| **5.3 Diffusion of Responsibility** |  | S |  |  | S | P |  |
| **5.4 Reviewer Competence** |  |  | P | S | S |  |  |
| **6.1 Prompt Injection** |  | S |  | P | P |  |  |
| **6.2 Time Pressure** |  |  | P | P |  | S |  |
| **6.3 Social Engineering via AI** |  |  | S |  | P |  | S |
| **6.4 Gradual Drift** |  |  |  |  | S | P | P |
---
## Cross-Reference Matrix: Failure Modes × Roles
This matrix identifies which failure modes are most discriminating for each role. **H** = High discrimination, **M** = Moderate discrimination.
| Failure Mode | Operator | Approver | Translator | QA/Risk | Champion |
|---|---|---|---|---|---|
| :------------ | :--: | :--: | :--: | :--: | :--: |
| **1.1 Vague Task Framing** | M |  | H |  | M |
| **1.2 Missing Context** | M | M | H |  |  |
| **1.3 Biased Data** |  |  |  | H | M |
| **1.4 Data Drift** | M |  |  | H |  |
| **2.1 Missing Quality Gates** |  | M | H | H |  |
| **2.2 Undefined Automation Boundaries** |  |  | H | M | M |
| **2.3 Absent Exception Paths** |  | M | H | M |  |
| **2.4 Feedback Loop Failures** |  |  | M | H | H |
| **3.1 Hallucination** | M | H |  | H |  |
| **3.2 Confident But Wrong** |  | H |  | H |  |
| **3.3 Bias Amplification** |  |  |  | H | M |
| **3.4 Errors of Omission** |  | H |  | H |  |
| **4.1 Context Loss at Handoffs** | H | M | H |  |  |
| **4.2 Misplaced Handoff Boundaries** |  |  | H | M |  |
| **4.3 Cascading Errors** |  |  | H | H |  |
| **4.4 AI-Creates-More-Work** | M |  | M |  | H |
| **5.1 Automation Bias** | H | H |  | H |  |
| **5.2 Approval Fatigue** | M | H |  | H |  |
| **5.3 Diffusion of Responsibility** | H | M |  |  | M |
| **5.4 Reviewer Competence** |  | H |  | H |  |
| **6.1 Prompt Injection** |  |  | M | H |  |
| **6.2 Time Pressure** | H | H |  | M |  |
| **6.3 Social Engineering via AI** |  | H |  | M | M |
| **6.4 Gradual Drift** | M |  |  | H | H |
---
## Key Behavioral Themes Across All Failure Modes
### Theme 1: The Verification-Trust Paradox
The most dangerous human behavior in AI workflows is not ignorance of AI limitations — it's the progressive erosion of skepticism as AI proves reliable most of the time. Research consistently shows that the more reliable automation becomes, the less humans can detect its failures. The assessment must test whether people maintain verification instinct when AI appears trustworthy.
### Theme 2: Structural vs. Individual Solutions
Every industry that has studied monitoring fatigue — aviation, medicine, nuclear power — has concluded the same thing: the solution is structural, not individual. You cannot train, motivate, or discipline your way past biological limits. The assessment should reward responses that propose systemic solutions over individual vigilance.
### Theme 3: The Handoff as Critical Failure Point
AI doesn't fail at the automation — it fails at the handoff. The transition from AI-handled to human-handled work (and vice versa) is where context drops, accountability blurs, and errors propagate. The assessment should heavily test handoff judgment.
### Theme 4: Governance Trumps Technology
95% of enterprise AI failures are governance failures, not technology failures. The models work; the organizations don't. Assessment scenarios should test whether people think about accountability, decision rights, and escalation paths — not just AI technical capabilities.
### Theme 5: Evaluative Work is More Draining Than Generative Work
AI shifts human work from creating to evaluating, from doing to reviewing. This shift is cognitively more expensive than it appears and leads to decision fatigue, rubber-stamping, and quality drift. The assessment should include scenarios that test sustainability of human oversight, not just capability.
---
## Implications for Scenario Design
Based on this failure modes research, the 12 scenario archetypes should:
1. **Include at least 2 scenarios that present polished-but-wrong AI outputs** — testing whether respondents verify substance or trust surface quality (Failure Modes 3.1, 3.2, 5.1)
2. **Include scenarios with explicit time pressure** — testing whether verification and judgment survive urgency (Failure Modes 6.2, 5.2)
3. **Test handoff judgment** — where should AI stop and humans start? (Failure Modes 4.1, 4.2)
4. **Include at least 1 adversarial/trick scenario** — where the "obvious" answer is wrong or where the AI has been manipulated (Failure Modes 6.1, 6.3)
5. **Test escalation quality, not just escalation presence** — how well someone escalates matters more than whether they escalate (Failure Modes 2.3, 5.3)
6. **Include gradual drift detection** — testing whether someone notices patterns of declining quality (Failure Modes 6.4, 5.2)
7. **Test process design, not just process following** — can they design a workflow, not just execute one? (Failure Modes 2.1, 2.2, 2.4)
8. **Include scenarios where the right answer is to stop, push back, or redesign** — not every scenario should have a "proceed with caution" answer (Failure Modes 1.1, 2.2, 6.4)
9. **Present bias-related scenarios** — testing awareness of AI bias and discriminatory outputs (Failure Modes 1.3, 3.3)
10. **Test organizational change thinking** — can they drive improvement, not just manage individual incidents? (Failure Modes 2.4, 6.4)
---
## Citation Index
All real-world examples in this report are sourced from the following references:
| Source | URL | Failure Modes Referenced |
|---|---|---|
| Fortune (MIT GenAI Divide) | [https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/) | 1.1, 2.2, 6.2, 6.4 |
| Korra (Enterprise Hallucinations) | [https://korra.ai/the-67-billion-warning-how-ai-hallucinations-hurt-enterprises-and-how-to-stop-them/](https://korra.ai/the-67-billion-warning-how-ai-hallucinations-hurt-enterprises-and-how-to-stop-them/) | 3.1, 3.2, 3.4 |
| Contextual AI (Why AI Hallucinations) | [https://contextual.ai/blog/why-does-enterprise-ai-hallucinate](https://contextual.ai/blog/why-does-enterprise-ai-hallucinate) | 1.1, 3.2, 4.4 |
| BarnRaisers (AI Initiative Failures) | [https://barnraisersllc.com/2026/02/19/8-ai-initiatives-that-failed-and-mistakes-to-avoid-case-studies/](https://barnraisersllc.com/2026/02/19/8-ai-initiatives-that-failed-and-mistakes-to-avoid-case-studies/) | 1.2, 1.4, 2.2 |
| Wall Street Journal (Zillow) | [https://www.wsj.com/business/earnings/zillows-shuttered-home-flipping-business-lost-881-million-in-2021-11644529656](https://www.wsj.com/business/earnings/zillows-shuttered-home-flipping-business-lost-881-million-in-2021-11644529656) | 1.1 |
| CBS News (Air Canada) | [https://www.cbsnews.com/news/aircanada-chatbot-discount-customer/](https://www.cbsnews.com/news/aircanada-chatbot-discount-customer/) | 1.2 |
| Forbes (Air Canada) | [https://www.forbes.com/sites/marisagarcia/2024/02/19/what-air-canada-lost-in-remarkable-lying-ai-chatbot-case/](https://www.forbes.com/sites/marisagarcia/2024/02/19/what-air-canada-lost-in-remarkable-lying-ai-chatbot-case/) | 5.3 |
| Monte Carlo Data (Famous AI Fails) | [https://www.montecarlodata.com/blog-famous-ai-fails](https://www.montecarlodata.com/blog-famous-ai-fails) | 1.2, 2.1, 2.4, 3.4 |
| Reuters (Lawyer Sanctions) | [https://www.reuters.com/legal/new-york-lawyers-sanctioned-using-fake-chatgpt-cases-legal-brief-2023-06-22/](https://www.reuters.com/legal/new-york-lawyers-sanctioned-using-fake-chatgpt-cases-legal-brief-2023-06-22/) | 3.1 |
| ABA Journal (Morgan & Morgan) | [https://www.abajournal.com/news/article/no-42-law-firm-by-headcount-could-face-sanctions-over-fake-case-citations-generated-by-chatgpt](https://www.abajournal.com/news/article/no-42-law-firm-by-headcount-could-face-sanctions-over-fake-case-citations-generated-by-chatgpt) | 2.1, 3.1 |
| Datatron (AI Bias Examples) | [https://datatron.com/real-life-examples-of-discriminating-artificial-intelligence/](https://datatron.com/real-life-examples-of-discriminating-artificial-intelligence/) | 1.3 |
| [Crescendo.ai](http://Crescendo.ai) (AI Bias Guide) | [https://www.crescendo.ai/blog/ai-bias-examples-mitigation-guide](https://www.crescendo.ai/blog/ai-bias-examples-mitigation-guide) | 1.3, 3.3 |
| UCSF Codex (Medical AI Bias) | [https://codex.ucsf.edu/news/editors-pick-study-finds-ai-medical-tools-show-bias-potential-misdiagnosis-and-patient-harm](https://codex.ucsf.edu/news/editors-pick-study-finds-ai-medical-tools-show-bias-potential-misdiagnosis-and-patient-harm) | 1.3 |
| CIO (Famous AI Disasters) | [https://www.cio.com/article/190888/5-famous-analytics-and-ai-disasters.html](https://www.cio.com/article/190888/5-famous-analytics-and-ai-disasters.html) | 3.3 |
| 923 Studio (AI Fails 2025) | [https://www.ninetwothree.co/blog/ai-fails](https://www.ninetwothree.co/blog/ai-fails) | 2.2, 4.4 |
| TechTarget (AI Deployments) | [https://www.techtarget.com/searchenterpriseai/feature/AI-deployments-gone-wrong-The-fallout-and-lessons-learned](https://www.techtarget.com/searchenterpriseai/feature/AI-deployments-gone-wrong-The-fallout-and-lessons-learned) | 4.2 |
| Bucher+Suter (Handoff Problem) | [https://www.bucher-suter.com/escalation-design-why-ai-fails-at-the-handoff-not-the-automation/](https://www.bucher-suter.com/escalation-design-why-ai-fails-at-the-handoff-not-the-automation/) | 4.1, 4.2 |
| LinkedIn (Dagenhart Handoff) | [https://www.linkedin.com/pulse/handoff-problem-why-every-ai-business-experiment-fails-toby-dagenhart-igrac](https://www.linkedin.com/pulse/handoff-problem-why-every-ai-business-experiment-fails-toby-dagenhart-igrac) | 2.3, 4.2 |
| Porto Theme (Human Handoff) | [https://www.portotheme.com/the-human-handoff-problem-why-ai-chatbots-are-failing-at-seamless-escalation/](https://www.portotheme.com/the-human-handoff-problem-why-ai-chatbots-are-failing-at-seamless-escalation/) | 2.4 |
| Evidently AI (AI Failures) | [https://www.evidentlyai.com/blog/ai-failures-examples](https://www.evidentlyai.com/blog/ai-failures-examples) | 3.1, 6.1 |
| Edge AI and Vision Alliance | [https://www.edge-ai-vision.com/2026/02/what-happens-when-the-inspection-ai-fails-learning-from-production-line-mistakes/](https://www.edge-ai-vision.com/2026/02/what-happens-when-the-inspection-ai-fails-learning-from-production-line-mistakes/) | 1.4, 3.4 |
| World Economic Forum (Content Moderation) | [https://www.weforum.org/stories/2020/03/social-media-giants-ai-moderation-errors-coronavirus/](https://www.weforum.org/stories/2020/03/social-media-giants-ai-moderation-errors-coronavirus/) | 1.4 |
| PMC/Social Studies of Science (Trading) | [https://pmc.ncbi.nlm.nih.gov/articles/PMC8978471/](https://pmc.ncbi.nlm.nih.gov/articles/PMC8978471/) | 4.3 |
| OWASP/[Adversa.ai](http://Adversa.ai) (Cascading Failures) | [https://adversa.ai/blog/cascading-failures-in-agentic-ai-complete-owasp-asi08-security-guide-2026/](https://adversa.ai/blog/cascading-failures-in-agentic-ai-complete-owasp-asi08-security-guide-2026/) | 4.3 |
| OWASP (Prompt Injection) | [https://genai.owasp.org/llmrisk/llm01-prompt-injection/](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) | 6.1 |
| Palo Alto Networks (Prompt Injection) | [https://www.paloaltonetworks.com/cyberpedia/what-is-a-prompt-injection-attack](https://www.paloaltonetworks.com/cyberpedia/what-is-a-prompt-injection-attack) | 6.1 |
| CNBC (AI Risks) | [https://www.cnbc.com/2026/03/01/ai-artificial-intelligence-economy-business-risks.html](https://www.cnbc.com/2026/03/01/ai-artificial-intelligence-economy-business-risks.html) | 6.1 |
| Nature (Human-AI Decision Making) | [https://www.nature.com/articles/s41598-026-34983-y](https://www.nature.com/articles/s41598-026-34983-y) | 5.1, 6.3 |
| PMC/Pharmacy & Therapeutics (Over-Reliance) | [https://pmc.ncbi.nlm.nih.gov/articles/PMC6534180/](https://pmc.ncbi.nlm.nih.gov/articles/PMC6534180/) | 5.1 |
| Lumenova AI (Automation Bias) | [https://www.lumenova.ai/blog/overreliance-on-ai-adressing-automation-bias-today/](https://www.lumenova.ai/blog/overreliance-on-ai-adressing-automation-bias-today/) | 5.1, 6.2 |
| Atomic Robot (AI Review Fatigue) | [https://atomicrobot.com/blog/ai-review-fatigue/](https://atomicrobot.com/blog/ai-review-fatigue/) | 5.1, 5.2, 5.4 |
| MIT Sloan (Rubber-Stamping) | [https://sloanreview.mit.edu/article/ai-explainability-how-to-avoid-rubber-stamping-recommendations/](https://sloanreview.mit.edu/article/ai-explainability-how-to-avoid-rubber-stamping-recommendations/) | 5.2 |
| EDPS (Human Oversight TechDispatch) | [https://www.edps.europa.eu/data-protection/our-work/publications/techdispatch/2025-09-23-techdispatch-22025-human-oversight-automated-making](https://www.edps.europa.eu/data-protection/our-work/publications/techdispatch/2025-09-23-techdispatch-22025-human-oversight-automated-making) | 5.2, 5.3, 6.3 |
| Siddhant Khare (AI Fatigue) | [https://siddhantkhare.com/writing/ai-fatigue-is-real](https://siddhantkhare.com/writing/ai-fatigue-is-real) | 4.4, 6.2 |
| [Teneo.ai](http://Teneo.ai) (Chatbot Failures) | [https://www.teneo.ai/blog/chatbot-examples-gone-wrong-lessons-and-insights](https://www.teneo.ai/blog/chatbot-examples-gone-wrong-lessons-and-insights) | 2.3 |
| AnswerConnect (AI Disasters) | [https://www.answerconnect.com/blog/business-tips/ai-customer-service-disasters/](https://www.answerconnect.com/blog/business-tips/ai-customer-service-disasters/) | 3.2 |
| TechAhead (Multi-Agent Failures) | [https://www.techaheadcorp.com/blog/ways-multi-agent-ai-fails-in-production/](https://www.techaheadcorp.com/blog/ways-multi-agent-ai-fails-in-production/) | 2.3 |
| Jade Global (AI Governance) | [https://www.jadeglobal.com/blog/ai-governance-maturity-vs-risk](https://www.jadeglobal.com/blog/ai-governance-maturity-vs-risk) | 6.4 |
| LinkedIn (Governance Drift) | [https://www.linkedin.com/posts/tds21_drift-report-007-ninety-five-percent-is-activity-7432135987297918977-VVdT](https://www.linkedin.com/posts/tds21_drift-report-007-ninety-five-percent-is-activity-7432135987297918977-VVdT) | 5.3, 6.4 |
| Deloitte (AI Decision Making) | [https://www.deloitte.com/us/en/insights/topics/talent/human-capital-trends/2026/decision-making-with-ai.html](https://www.deloitte.com/us/en/insights/topics/talent/human-capital-trends/2026/decision-making-with-ai.html) | 6.3 |
| Harvard Misinformation Review | [https://misinforeview.hks.harvard.edu/article/new-sources-of-inaccuracy-a-conceptual-framework-for-studying-ai-hallucinations/](https://misinforeview.hks.harvard.edu/article/new-sources-of-inaccuracy-a-conceptual-framework-for-studying-ai-hallucinations/) | 2.4, 3.1 |
| Just Security (Content Moderation) | [https://www.justsecurity.org/94118/is-generative-ai-the-answer-for-the-failures-of-content-moderation/](https://www.justsecurity.org/94118/is-generative-ai-the-answer-for-the-failures-of-content-moderation/) | 5.4 |
| GPA Resolution (Human Oversight) | [https://globalprivacyassembly.com/wp-content/uploads/2025/10/GPA-Resolution-Human-Oversight-of-Automated-Decisions.pdf](https://globalprivacyassembly.com/wp-content/uploads/2025/10/GPA-Resolution-Human-Oversight-of-Automated-Decisions.pdf) | 5.4 |
| Galileo AI (Agent Failure Modes) | [https://galileo.ai/blog/agent-failure-modes-guide](https://galileo.ai/blog/agent-failure-modes-guide) | 4.3 |
---
*This research report is a Phase 1 deliverable for the AI Workforce Map project. It directly informs the design of 12 scenario archetypes documented in deliverable_12_*[*archetypes.md*](http://archetypes.md)*.*