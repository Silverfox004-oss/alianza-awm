# Assessment Science & SJT Design

**Notion URL:** https://www.notion.so/31ed807b911181d28f65da7300b0ff87

---

**Prepared for:** Alianza Connects — AI Workforce Map Product Team
**Date:** March 9, 2026
**Purpose:** Evidence-based guide for designing SJT-based scenario assessments with AI-graded rubrics
---
## Assessment Design Checklist
### SCENARIO DESIGN
**Before Writing**
- [ ] **Define the target construct(s)**: What specific competency does this scenario assess? (e.g., AI output validation, human-AI collaboration, data-informed decision-making)
- [ ] **Confirm job-relatedness**: Is this scenario based on a real situation that someone in the target role would encounter? Document the job analysis evidence.
- [ ] **Identify the SME panel**: Have 3+ subject matter experts from diverse backgrounds available to review and validate the scenario
**Writing the Scenario Stem**
- [ ] **Include sufficient context**: Role, setting, constraints, stakeholders, and timeline
- [ ] **Embed a genuine dilemma**: The scenario should present competing priorities or ambiguous information — no "obvious" correct answer
- [ ] **Target moderate difficulty**: Aim for items where 30–70% of the target population would produce a strong response
- [ ] **Avoid cultural assumptions**: Review for language, references, or social norms that may disadvantage certain groups
- [ ] **Keep it concise**: Scenario description should be readable in 60–90 seconds (150–250 words)
- [ ] **Use knowledge-based framing**: "What is the best course of action?" or "What should you do?"
**Response Format**
- [ ] **Primary response**: Open-text field (3–8 sentence minimum guidance)
- [ ] **Optional calibration**: Multiple-choice pre-question if needed for anchoring
- [ ] **Response time guidance**: Indicate expected time (3–5 minutes per scenario)
- [ ] **Prepare 2–3 follow-up questions** (see Follow-Up section below)
**Quality Checks**
- [ ] **Test for a single "correct" answer**: If \>90% of pilots choose the same response, the scenario is too easy — revise
- [ ] **Test for guessability**: Can someone with no domain knowledge produce a strong response? If yes, the scenario lacks domain specificity
- [ ] **Test for ambiguity**: Have 3 people read the scenario independently — do they understand the situation consistently?
- [ ] **Test for length**: Does the scenario + response take 3–5 minutes? Adjust complexity if too short or too long
---
### RUBRIC DESIGN
**Structure (Per Scenario)**
- [ ] **3–5 scoring dimensions** (e.g., Problem Recognition, Reasoning Quality, Stakeholder Awareness, Proposed Action, Risk Identification)
- [ ] **0–5 scale per dimension** (strongest human-LLM alignment)
- [ ] **Clear anchors for each score level** (what does a 1 look like vs. a 3 vs. a 5?)
**Marker-Based Scoring**
For each rubric dimension, define:
**Strong Indicators (score 4–5)**
- [ ] 3–5 specific behaviors/elements that signal strong performance
- [ ] Each marker must be **observable in text** (the LLM can verify presence)
- [ ] Each marker must be **specific to this scenario** (not generic quality markers)
*Examples:*
- Identifies the core tension between speed and accuracy in the AI output review
- Proposes a verification step before sharing AI-generated analysis with the client
- Considers how the decision affects both the immediate team and downstream users
**Partial Indicators (score 2–3)**
- [ ] 3–5 behaviors that show partial understanding
- [ ] Distinguish from strong indicators by specificity and depth
*Examples:*
- Mentions the need for verification but doesn't specify how
- Acknowledges stakeholder concerns without proposing resolution
- Provides a reasonable action without articulating the reasoning
**Red Flags (score 0–1, or automatic penalties)**
- [ ] 3–5 behaviors that signal poor judgment or gaming
*Examples:*
- Recommends using AI output without any verification
- Response is generic — could apply to any scenario without modification
- Ignores critical constraint explicitly stated in the scenario
- Response contradicts professional/ethical norms
**Rubric Validation**
- [ ] **SME consensus**: Have 3+ SMEs score 5 sample responses independently. Target \>80% agreement on dimension scores (within 1 point)
- [ ] **Anchor responses**: Create 1 example response at each score level (1, 3, 5) per dimension for LLM calibration
- [ ] **Edge cases**: Document how the rubric handles unexpected but legitimate approaches
- [ ] **LLM calibration test**: Run 10 sample responses through the LLM grader and compare to SME scores. If ICC \1 point on any dimension
- [ ] **Human calibration sample**: Send 10% of responses to human reviewers; compare distributions
- [ ] **Adverse impact monitoring**: Track score distributions by available demographic data; run four-fifths analysis quarterly
- [ ] **Drift detection**: Include 2–3 "anchor" responses with known scores in each grading batch; alert if anchor scores shift
---
### LEGAL & COMPLIANCE
**Pre-Launch Requirements**
- [ ] **Job analysis documentation**: Written evidence linking each assessed competency to actual role requirements
- [ ] **Privacy notice**: Provided to all participants before assessment begins
- [ ] **AI disclosure**: Clear statement that responses are evaluated by AI
- [ ] **Consent mechanism**: Active opt-in (not pre-checked); ability to withdraw
- [ ] **Accommodation process**: Documented process for requesting and providing accommodations (extended time, alternative formats, assistive technology)
- [ ] **Human review option**: Participants can request human review of any score
**Ongoing Requirements**
- [ ] **Four-fifths analysis**: Run after each assessment cycle for all available demographic groups
- [ ] **Data retention**: Delete or anonymize assessment data per defined schedule
- [ ] **Scenario rotation**: No employee should see the same scenario twice within 12 months
- [ ] **Annual rubric review**: SME panel reviews all rubrics annually for continued relevance
- [ ] **Audit trail**: Maintain records of all prompts, responses, scores, and grading rationale
---
### QUICK REFERENCE: SCORING SCALE ANCHORS
| Score | Label | Description |
|---|---|---|
| **5** | Exceptional | Addresses all key dimensions; demonstrates sophisticated reasoning; considers second-order consequences; proposes specific, actionable solution with risk mitigation |
| **4** | Strong | Addresses most key dimensions with clear reasoning; proposes a sound solution; may miss nuance or second-order effects |
| **3** | Adequate | Addresses the core issue; reasoning is present but may lack depth; solution is reasonable but generic |
| **2** | Developing | Shows partial understanding; may miss key dimensions or provide incomplete reasoning; solution is vague or partially appropriate |
| **1** | Weak | Minimal engagement with the scenario; significant gaps in reasoning; solution is inappropriate or unsupported |
| **0** | Inadequate | No meaningful response; completely misunderstands the scenario; or response contains red flags (ethical violations, gaming) |
---
## 1. SJT Design Methodology
### 1.1 What SJTs Are and Why They Work
Situational Judgment Tests (SJTs) present examinees with work-related scenarios and ask them to evaluate or select responses. They have a 40+ year research history and are used across personnel selection, medical education, and professional credentialing.
SJTs are favored because they:
- Assess **how candidates think and behave** in context, not just what they know
- Are cost-effective and scalable — can be computer-delivered and machine-marked
- Show **smaller subgroup differences** than cognitive ability tests
- Have strong face validity — examinees perceive them as relevant and fair
### 1.2 Meta-Analytic Evidence on Validity
| Study | Key Findings |
|---|---|
| McDaniel, Hartman, Whetzel & Grubb (2007) | SJTs show criterion-related validity of rho = .20–.26. Knowledge-based instructions correlate higher with cognitive ability; behavioral tendency instructions correlate higher with personality. SJTs have incremental validity over cognitive ability, Big 5, and their composite. |
| Christian, Edwards & Bradley (2010) | Developed content-based typology of SJT constructs. SJTs correlate with cognitive ability (M-rho = .33–.46), Agreeableness (M-rho = .27–.31), Conscientiousness (M-rho = .25–.31). |
| Webster et al. (2020) | Systematic review for medical selection: moderate pooled validity estimate of 0.32 (p \90% choose correctly have poor discrimination.
5. **Target moderate difficulty**: Items should be in the p = 30-70 difficulty range for optimal discrimination
**Response Formats:**
| Format | Pros | Cons |
|---|---|---|
| Single best answer | Simple, easy to score | Limited discrimination between levels |
| Ranking | Forces discrimination among all options, richer signal | More complex, longer time per item |
| Rating | Captures granular judgments per option | Risk of leniency bias, ceiling effects |
| Most/Least effective | Good discrimination with moderate complexity | Doesn't capture middle-ground reasoning |
| Open/Constructed response | Richest signal, harder to fake, assesses depth of reasoning | Requires rubric-based scoring, more time |
**Recommendation for AI Workforce Map:** Use **constructed/open response** format as the primary assessment mode. Since you have AI-based grading, the traditional limitation (expensive human scoring) is eliminated. Open responses are significantly harder to fake, provide richer signal, and show smaller subgroup differences.
**Fidelity Levels:**
| Fidelity | Format | Trade-off |
|---|---|---|
| Low | Text-based written scenarios | Cheapest to develop, most scalable |
| Medium | Animated videos, interactive simulations | Better engagement, somewhat higher validity |
| High | Full video with actors, branching paths | Highest ecological validity, most expensive |
Webster et al.'s 2020 meta-analysis found **no significant association between test medium (video vs text) and validity**. **Recommendation:** Start with text-based scenarios for scalability and speed of iteration.
### 1.5 Optimal Number of Scenarios and Assessment Length
| Parameter | Recommendation | Rationale |
|---|---|---|
| Scenarios per assessment | 8–12 | Enough for reliability, not so many as to cause fatigue |
| Time per scenario | 3–5 minutes | Allows reading, reflection, and a substantive free-text response |
| Total assessment time | 25–40 minutes | Sweet spot for engagement vs. reliability |
| Constructs per assessment | 3–5 | Each scenario targets a specific construct; 2–3 scenarios per construct |
---
## 2. Rubric Design Frameworks
### 2.1 Analytic vs. Holistic Rubrics
| Dimension | Analytic Rubric | Holistic Rubric |
|---|---|---|
| Structure | Separate criteria evaluated independently on a grid | Single overall score based on integrated judgment |
| Feedback granularity | High — shows strengths/weaknesses per dimension | Low — overall quality level only |
| Inter-rater reliability | Higher when criteria are well-defined | Can be higher with trained raters for simple tasks |
| Best for | Multi-dimensional work, developmental feedback, complex tasks | Quick screening, creative tasks, large-scale rapid scoring |
**For AI-graded assessments:** Analytic rubrics are strongly preferred for LLM-based grading because:
1. **Decomposability**: LLMs perform better when grading criteria are broken into discrete, verifiable dimensions
2. **Transparency**: Each sub-score can be traced to a specific criterion, making grading auditable
3. **Calibration**: Each criterion can be independently validated against human judgments
4. **Targeted improvement**: When the AI grader disagrees with humans, the specific dimension of disagreement is identifiable
For **final aggregation**, research from GoDaddy (2025) found that **implicit aggregation** (holistic LLM judgment informed by analytic dimensions) outperforms explicit aggregation (rigid point addition). Use analytic rubric for individual criteria, with LLM-generated holistic final score.
**Recommendation:** Analytic rubrics with 3–5 scoring dimensions per scenario. Calculate sub-scores for each dimension, then allow the LLM to produce a final integrated assessment.
### 2.2 Inter-Rater Reliability for LLM Grading
1. **Detailed criteria produce better agreement.** LLMs with detailed evaluation criteria achieved ICC = 0.84–0.89, comparable to human graders. (NPJ Science of Learning, 2024)
2. **Use a 0–5 scale.** The 0–5 grading scale yields the strongest human-LLM alignment (ICC = 0.853), while the 0–10 scale yields the weakest (ICC = 0.805). (arXiv, 2026)
3. **Calibration with example responses.** Few-shot prompting against pre-scored examples significantly improves alignment with human experts. (8Allocate, 2025)
4. **Two-step scoring architecture.** Separating identification from scoring dramatically improves reliability:
	- Step 1: LLM identifies which rubric elements are present
	- Step 2: LLM assigns scores based on identified elements
	- This achieved **96–100% exact match** with Claude 3.5 Sonnet. (MedEdFlamingo, 2025)
### 2.3 Marker-Based Scoring
A marker-based approach evaluates the **presence or absence of specific behaviors** in a response. Highly compatible with LLM grading because it converts subjective assessment into verifiable detection tasks.
**Three-tier structure:**
**Tier 1: Strong Indicators (High positive weight)**
- Explicitly addresses the core tension/dilemma in the scenario
- Identifies stakeholders and their competing interests
- Proposes a course of action with clear reasoning
- Considers second-order consequences
- References relevant frameworks, principles, or best practices
- Demonstrates systems thinking
**Tier 2: Weak/Partial Indicators (Moderate positive weight)**
- Mentions relevant concepts without applying them
- Acknowledges complexity without resolving it
- Provides a reasonable answer without articulating the reasoning
- Addresses only one dimension of a multi-dimensional problem
**Tier 3: Red Flags (Negative weight or disqualifying)**
- Recommends action that violates ethical/professional norms
- Ignores critical information explicitly stated in the scenario
- Provides a generic/templated response applicable to any scenario
- Demonstrates fundamental misunderstanding of the domain
- Proposes action that creates significant unaddressed risk
**Scoring formula:**
`Score = Sum(strong_indicators x weight_strong) + Sum(weak_indicators x weight_weak) - Sum(red_flags x weight_penalty)`
### 2.4 LLM Grading Bias Mitigation
| Bias Type | Description | Mitigation |
|---|---|---|
| Positional bias | LLM favors first or last item in a list | Randomize order of rubric criteria in the prompt |
| Verbosity bias | LLM assigns higher scores to longer responses | Add explicit conciseness criterion; instruct LLM to disregard length |
| Positive skew | Score compression toward high end | Require chain-of-thought rationale before scoring; use concrete anchors |
| Self-preferential bias | LLM rates its own style of writing higher | Use diverse judge models; anonymize responses |
| Persuasion bias | Persuasive language inflates scores by up to 8% | Counter-prompting: instruct grader to penalize manipulative language |
| Prompt sensitivity | Minor phrasing changes alter scores | Normalize against human-labeled gold set |
---
## 3. AI-as-Assessor Patterns
### 3.1 Current State of LLM-Based Grading (2024–2026)
The research consensus as of early 2026: **LLMs can achieve human-comparable grading reliability on structured rubric-based tasks**, but implementation details matter enormously.
| Study | Finding | Score |
|---|---|---|
| NPJ Science of Learning, 2024 | ChatGPT 4.0 with detailed criteria achieved good interrater consistency with human benchmarks | ICC = 0.84, intrarater ICC = 0.89 |
| MedEdFlamingo/Medical Teacher, 2025 | Two-step prompting + external calculation achieved 100% scoring reliability | 100% exact match |
| LLM-as-a-Grader (Emory NLP), 2025 | GPT-4o achieved Pearson correlation up to 0.98 with human graders for quizzes | r = 0.98 |
| EDM 2025 | GPT-4.1-mini achieved 94.47% accuracy with self-consistency grading | 94.47% agreement |
| TestInvite, 2025 | GPT model achieved QWK of 0.68 for essay scoring without prior training | QWK = 0.68 |
**Key nuance:** LLM reliability is task-dependent. LLMs are highly reliable on objective/factual tasks (identifying specific rubric elements in text) but less reliable on subjective/open-ended quality judgments.
### 3.2 Methods to Improve LLM Grading Consistency
**Temperature:** Use low temperature (0.05–0.1) for grading tasks. Produces more deterministic output.
**Structured Output:** Force JSON with:
1. Evidence extraction: Direct quotes/paraphrases relevant to each criterion
2. Per-criterion score: Numeric score on defined scale (0–5)
3. Rationale: Brief explanation for each score
4. Overall assessment: Final integrated score
**Two-Step Prompt Chaining (Most Important Pattern):**
Step 1 (Identification): "Read the following response. For each rubric criterion below, identify whether the behavior/element is present. List the specific text evidence for each criterion found."
Step 2 (Scoring): "Based on your identification of rubric elements above, assign a score of 0-5 for each criterion using the following anchors: [...] Calculate the final score as: [formula]"
With external score calculation, this achieved **100% reliability** across all models tested. (MedEdFlamingo, 2025)
**Self-Consistency (Majority Voting):** Run the same grading prompt multiple times (3–10 completions) and use majority vote or mean score. Improves accuracy by \~1% but consistently.
**Few-Shot Calibration:** Include 2–5 pre-scored example responses in the prompt to calibrate LLM scoring behavior.
### 3.3 Adversarial/Skeptic Grader Pattern
**Primary Grader → Skeptic Grader → Resolution**
1. **Primary Grader**: Applies the rubric normally, produces scores and rationale
2. **Skeptic Grader**: Reviews primary grader's scores with instructions to:
	- Challenge any score that seems generous
	- Check for verbosity bias (did length inflate the score?)
	- Check for persuasion bias (did confident language inflate the score?)
	- Verify that cited evidence actually supports the assigned score
	- Flag responses that appear to "game" the rubric (hitting keywords without substance)
3. **Resolution**: If scores diverge beyond threshold, escalate to human review or take lower/average score
Research shows persuasive language in responses can inflate LLM judge scores by up to 8%, with the "Consistency" persuasion technique causing the most severe distortion. **Increasing model size does not substantially mitigate this vulnerability** — dedicated counter-measures are required. (arXiv, 2025)
### 3.4 Conservative Grading Tendency
LLMs tend to grade conservatively (under-grade relative to humans). GPT-4o assigned lower-than-human scores in 38.8% of cases and higher-than-human in only 6.2%. (Emory NLP, 2025)
**Implication:** If using LLM grading for employee development (not gatekeeping), consider a slight upward calibration or clearly communicate that AI-generated scores may trend conservative.
---
## 4. Legal and Compliance
### 4.1 EEOC Guidelines for Employee Assessments
**Key requirements:**
1. **Job-relatedness**: All assessments must be related to the essential functions of the job
2. **Consistent application**: Tests must be administered the same way to all candidates/employees regardless of protected characteristics
3. **Disparate impact analysis**: If a test disproportionately excludes members of a protected group, the employer must demonstrate job-relatedness and business necessity
4. **Validation requirement**: Under UGESP, tests must be validated when they have adverse impact. Three accepted validation methods:
	- **Criterion-related validity**: Statistical correlation between test scores and job performance
	- **Content validity**: Test content is representative of important aspects of the job
	- **Construct validity**: Test measures a trait important for job success
5. **No validation required if no adverse impact**: If the assessment does not produce disparate impact, formal validation is not legally required (though still recommended)
### 4.2 The Four-Fifths Rule
If the selection rate for any racial, ethnic, or gender group is **less than 80% (four-fifths)** of the rate for the group with the highest rate, there may be evidence of adverse impact.
**Example:** If 90% of Group A passes and only 60% of Group B passes, Group B's rate is 67% of Group A's — below the 80% threshold, suggesting adverse impact.
**Practical implication:** Track pass/fail rates and score distributions by demographic group from the earliest pilots. Run four-fifths analyses regularly.
### 4.3 ADA Compliance
- **Reasonable accommodations**: Changing tests, providing extended time, offering alternative formats, or providing assistive technology
- **Tests must measure actual abilities, not disabilities**: Assessments should reflect the skills they intend to measure, not the employee's impairment
- **Accessibility**: Ensure the platform is WCAG 2.1 compliant; provide untimed/extended-time options; offer text-to-speech; allow alternative input methods
### 4.4 GDPR/CCPA Considerations
**GDPR (EU employees):**
- Employee consent in GDPR is complicated due to employer-employee power imbalance. Consider using **legitimate interests** as the legal basis for development assessments.
- Under GDPR Article 22, employees have the right not to be subject to decisions based solely on automated processing that produce legal or significant effects. **AI-graded assessments that affect employment may trigger Article 22**, requiring meaningful human oversight.
- Employees can request all data held about them, including assessment scores and the logic behind automated decisions.
**CCPA/CPRA (California employees):**
- Since January 2023, the CPRA removes employee data exemptions — California employees have the same privacy rights as consumers.
- Assessment data likely qualifies as "Sensitive Personal Information" under CPRA.
- Must provide clear privacy notice at or before collection.
### 4.5 Required Disclosures and Consent
AI Workforce Map assessments should include:
1. **Purpose disclosure**: Assessment evaluates readiness for AI-adjacent roles for development/planning purposes
2. **AI grading disclosure**: Responses will be evaluated by AI systems (required under EU AI Act — employment AI is classified as high-risk)
3. **Data handling notice**: Where data is stored, who has access, retention period, how it will be used
4. **Accommodation notice**: How to request reasonable accommodations
5. **Voluntary/mandatory status**: Whether the assessment is required or optional
6. **Right to human review**: Option to request human review of AI-generated scores
7. **Non-discrimination statement**: The assessment does not discriminate on any protected basis
8. **Consent mechanism**: Active opt-in (not pre-checked box), with the ability to withdraw
---
## 5. Psychometric Pitfalls
### 5.1 Common Mistakes in Assessment Design
1. **Testing without clear objectives**: Every scenario should target a specific, defined competency
2. **Over-reliance on scores**: Assessment scores should be one data point in a broader evaluation
3. **Using unvalidated instruments**: "Looks right" doesn't mean it measures what it claims. Validate against actual job performance data.
4. **Ignoring context**: Over 70% of employers focus primarily on numerical results without considering context. (Psico-Smart, 2024)
5. **Mismatched validity**: Using a test validated for one purpose/population in a different context without re-validation
6. **Confirmation bias**: Forming an initial impression of an employee and interpreting assessment data to confirm it
7. **Confusing personality with ability**: \~75% of employers mistakenly equate personality traits with job performance. SJTs should measure judgment, not personality.
8. **Cultural bias**: Scenarios should be reviewed for cultural assumptions that may yield different results depending on background
### 5.2 Avoiding "Teaching to the Test"
Strategies to prevent gaming:
1. **Use open-response format**: Free-text responses require the employee to generate reasoning, which is much harder to fake
2. **Scenario rotation**: Maintain a large scenario bank and rotate scenarios across assessment cycles. Never reuse the exact same scenario for the same employee.
3. **Depth probes**: Follow up initial responses with targeted questions probing deeper into the reasoning
4. **Measure reasoning process, not conclusions**: Rubric should heavily weight the quality of reasoning (consideration of tradeoffs, stakeholder awareness, risk identification) over simply reaching the "correct" conclusion
5. **Novel scenarios**: Include scenarios that are plausible but unlikely to have been seen before
### 5.3 Surface-Level vs. Deep Assessment
**Surface-level indicators (test-taking skill):**
- Selecting the "obvious" best option from a multiple-choice list
- Using professional-sounding language without substance
- Repeating back terminology from the question
- Giving socially desirable but uncommitted responses
**Deep assessment indicators (real judgment):**
- Recognizing and articulating tensions that the scenario doesn't explicitly state
- Considering how the decision affects people/systems not mentioned
- Identifying what additional information would change the approach
- Acknowledging uncertainty and proposing how to manage it
- Making specific, committal recommendations with clear reasoning
**Techniques to design for depth:**
| Technique | How It Works |
|---|---|
| Ambiguous scenarios | Present situations with no clear "right" answer; test measures reasoning quality, not answer selection |
| Incomplete information | Withhold key details and see if the employee identifies what's missing |
| Conflicting stakeholders | Create scenarios where different stakeholders have legitimate but competing interests |
| Cascading consequences | Ask what happens next — do they think beyond the immediate situation? |
| Values trade-offs | Present scenarios where efficiency conflicts with fairness, or speed conflicts with quality |
---
## 6. Key Takeaways for AI Workforce Map
### Architecture Decisions
| Decision | Recommendation | Evidence |
|---|---|---|
| Assessment format | Hybrid: Scenario + open-response + adaptive follow-up | Open responses are harder to fake, show smaller subgroup differences, and can be reliably AI-graded with two-step prompting |
| Instruction type | Knowledge-based ("What should you do?") as primary | Better for testing procedural knowledge of AI workflows; clearer scoring |
| Response format | Free-text primary, with optional multiple-choice calibration item | Maximizes signal; LLM grading makes free-text scoring scalable |
| Fidelity | Text-based with contextual screenshots/images | Validity evidence shows text = video for criterion validity; text is far cheaper and faster to iterate |
| Number of scenarios | 8–12 per assessment, 2–3 per construct | Balances reliability with completion time |
| Time | 25–40 minutes total (3–5 min per scenario) | Optimizes engagement vs. reliability |
| Grading scale | 0–5 per criterion | Strongest human-LLM alignment per arXiv 2026 research |
| Rubric type | Analytic with 3–5 dimensions per scenario, implicit final aggregation | Best for LLM grading transparency and calibration |
### Grading Pipeline Design
**Response Received**
→ Step 1: Element Identification (LLM, low temp) — "Which rubric markers are present? Cite evidence."
→ Step 2: Criterion Scoring (LLM or deterministic) — Score each criterion 0-5 based on identified elements
→ Step 3: Skeptic Review (LLM, different prompt) — "Challenge any score that seems inflated. Check for gaming."
→ Step 4: Resolution — If scores agree: finalize. If divergent: flag for human review.
→ Step 5: Aggregate & Report — Per-criterion scores + narrative feedback
### Legal Safeguards Checklist
- [ ] Assessment content validated against actual AI-adjacent job requirements (content validity)
- [ ] Assessment does not include medical/disability inquiries
- [ ] Reasonable accommodation process documented and communicated
- [ ] Privacy notice provided before assessment (GDPR/CCPA compliant)
- [ ] AI grading disclosed to all participants
- [ ] Human review available on request
- [ ] Four-fifths adverse impact analysis planned for each deployment
- [ ] Diverse SME panel used for scenario development and answer key creation
- [ ] Assessment used for development, not sole basis for employment decisions
- [ ] Data retention policy defined and communicated
- [ ] Consent mechanism is active opt-in, with withdrawal option
### What Makes This Different from Generic SJTs
1. **Domain-specific scenarios**: Every scenario depicts a real decision point in an AI-adjacent work context (when to use AI vs. human judgment, how to validate AI outputs, how to communicate AI limitations to stakeholders)
2. **Adaptive follow-ups**: Unlike static SJTs, the AI system can generate contextual follow-up questions based on initial responses, dramatically improving signal quality and making gaming nearly impossible
3. **AI-graded depth assessment**: The two-step identification → scoring pipeline, combined with marker-based rubrics, enables assessment of genuine reasoning quality at scale
4. **Continuous calibration**: Grading system can be continuously improved by comparing LLM scores against periodic human review samples
5. **Development-oriented**: Position results as a development roadmap, not a pass/fail gate, to reduce legal risk and increase employee engagement
### Critical Risks to Mitigate
| Risk | Mitigation |
|---|---|
| LLM grading bias produces unfair scores for some groups | Regular adverse impact audits; human review samples; multiple LLM passes |
| Employees share scenarios and "correct" answers | Large scenario bank; rotation; adaptive follow-ups that make memorization useless |
| Assessment feels punitive rather than developmental | Frame as "readiness mapping"; provide actionable feedback with learning resources |
| Legal challenge on job-relatedness | Maintain thorough documentation of job analysis → assessment design mapping |
| AI-generated scores lack defensibility | Keep full audit trail (prompts, responses, raw scores, rationale); offer human review |
| Assessment data breach | Encrypt at rest and in transit; minimize PII; define retention limits; conduct DPIA for GDPR |
---
## Sources
- **Meta-analyses**: McDaniel et al. (2007) [https://onlinelibrary.wiley.com/doi/10.1111/j.1744-6570.2007.00065.x](https://onlinelibrary.wiley.com/doi/10.1111/j.1744-6570.2007.00065.x) \| Christian et al. (2010) [https://mikechristian.web.unc.edu/wp-content/uploads/sites/13307/2016/11/Christian-et-al-2010-PPsych-SJT.pdf](https://mikechristian.web.unc.edu/wp-content/uploads/sites/13307/2016/11/Christian-et-al-2010-PPsych-SJT.pdf) \| Webster et al. (2020) [https://asmepublications.onlinelibrary.wiley.com/doi/full/10.1111/medu.14201](https://asmepublications.onlinelibrary.wiley.com/doi/full/10.1111/medu.14201) \| Martin-Raugh et al. (2025) [https://onlinelibrary.wiley.com/doi/10.1111/ijsa.70025](https://onlinelibrary.wiley.com/doi/10.1111/ijsa.70025) \| Kepes et al. (2024) [https://journals.sagepub.com/doi/10.1177/01492063241288545](https://journals.sagepub.com/doi/10.1177/01492063241288545)
- **LLM grading research**: NPJ Science of Learning (2024) [https://pmc.ncbi.nlm.nih.gov/articles/PMC11683144/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11683144/) \| MedEdFlamingo (2025) [https://medicaleducationflamingo.substack.com/p/the-end-of-manual-scoring-how-llms-grading-written-text-papers](https://medicaleducationflamingo.substack.com/p/the-end-of-manual-scoring-how-llms-grading-written-text-papers) \| arXiv (2026) [https://arxiv.org/html/2601.03444v1](https://arxiv.org/html/2601.03444v1) \| Emory NLP (2025) [https://arxiv.org/html/2511.10819v2](https://arxiv.org/html/2511.10819v2) \| EDM (2025) [https://educationaldatamining.org/EDM2025/proceedings/2025.EDM.poster-demo-papers.290/index.html](https://educationaldatamining.org/EDM2025/proceedings/2025.EDM.poster-demo-papers.290/index.html)
- **Legal frameworks**: EEOC [https://www.eeoc.gov/laws/guidance/employment-tests-and-selection-procedures](https://www.eeoc.gov/laws/guidance/employment-tests-and-selection-procedures) \| UGESP [https://www.uniformguidelines.com/uniformguidelines.html](https://www.uniformguidelines.com/uniformguidelines.html) \| DOL [https://www.dol.gov/agencies/odep/program-areas/employers/accommodations](https://www.dol.gov/agencies/odep/program-areas/employers/accommodations)
- **Industry best practices**: GoDaddy AI evaluation (2025) [https://www.godaddy.com/resources/news/calibrating-scores-of-llm-as-a-judge](https://www.godaddy.com/resources/news/calibrating-scores-of-llm-as-a-judge) \| 8Allocate (2025) [https://8allocate.com/blog/rubric-based-ai-auto-grading-ensuring-accuracy-mitigating-bias-upholding-integrity/](https://8allocate.com/blog/rubric-based-ai-auto-grading-ensuring-accuracy-mitigating-bias-upholding-integrity/) \| Acuity Insights [https://acuityinsights.com/guide-to-situational-judgment-tests-2/](https://acuityinsights.com/guide-to-situational-judgment-tests-2/) \| AssessFirst [https://www.assessfirst.com/en/blog/situational-judgement-test](https://www.assessfirst.com/en/blog/situational-judgement-test)
- **Assessment design**: Cureus (2024) [https://pmc.ncbi.nlm.nih.gov/articles/PMC11381131/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11381131/) \| AJPE (2020) [https://pmc.ncbi.nlm.nih.gov/articles/PMC7405297/](https://pmc.ncbi.nlm.nih.gov/articles/PMC7405297/) \| Psico-Smart (2024) [https://blogs.psico-smart.com/blog-common-misinterpretations-of-psychometric-test-results-and-how-to-avoid-them-181492](https://blogs.psico-smart.com/blog-common-misinterpretations-of-psychometric-test-results-and-how-to-avoid-them-181492) \| Xobin (2025) [https://xobin.com/blog/psychometric-testing-mistakes-to-avoid/](https://xobin.com/blog/psychometric-testing-mistakes-to-avoid/)
*Last updated: March 9, 2026*