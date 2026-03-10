# Integration Test — 3 Mock Employee Walkthroughs

**Notion URL:** https://www.notion.so/31ed807b911181faac25e0204ef6f68a

---

**Purpose:** Validate the full prompt chain (Orchestrator \> Examiner \> Primary Grader \> Skeptic Grader \> Synthesizer) with 3 mock employees representing different competency profiles.
---
## Test Design
### Employee 1: "Strong Performer" — Sarah Chen, Operations Manager
**Target Roles:** Workflow Translator, AI Approver
**Expected Outcome:** Strong-fit for Workflow Translator, Moderate-fit for AI Approver
**Profile:** Experienced ops manager, strong process-thinking and task-framing, weaker on change-leverage
**Simulated Response Pattern:**
- Consistently identifies process steps and decision points
- Provides reasoning for all recommendations
- Addresses pressure scenarios by holding position with justification
- Misses some edge cases around organizational change management
- Expected domain scores: task-framing 3.5, process-thinking 3.2, verification-instinct 2.8, exception-handling 2.5, risk-judgment 3.0, operational-consistency 2.7, change-leverage 1.8
### Employee 2: "Developing" — Marcus Rivera, Junior Analyst
**Target Roles:** AI Operator, AI Approver
**Expected Outcome:** Developing for AI Operator, Not-ready for AI Approver
**Profile:** Smart but inexperienced, gives surface-level responses, capitulates under pressure
**Simulated Response Pattern:**
- Identifies the right general direction but lacks depth
- Short responses with minimal reasoning
- Changes position when follow-up introduces pressure
- Shows awareness of risk but doesn't quantify or prioritize
- Expected domain scores: task-framing 2.0, process-thinking 1.5, verification-instinct 1.8, exception-handling 1.2, risk-judgment 1.5, operational-consistency 2.2, change-leverage 1.0
- Should trigger: reasoning_absence (2x), pressure_capitulation (1x)
### Employee 3: "Verbose but Shallow" — Alex Kim, Marketing Coordinator
**Target Roles:** Change Champion, AI Operator
**Expected Outcome:** Moderate-fit for Change Champion, Gated-out for AI Operator (fails operational-consistency threshold)
**Profile:** Great communicator, persuasive writing, but substance doesn't match style
**Simulated Response Pattern:**
- Long, well-written responses that sound impressive
- Uses rhetorical techniques and confidence signaling
- Actually misses key technical details in scenarios
- Strong on change-leverage and communication but weak on verification and consistency
- Expected domain scores: task-framing 2.3, process-thinking 1.8, verification-instinct 1.5, exception-handling 1.7, risk-judgment 2.0, operational-consistency 1.4, change-leverage 3.2
- Should trigger: Skeptic catches verbosity bias in Primary Grader
- Should be gated-out for AI Operator (operational-consistency 35% \< 65% threshold)
---
## Test Trace: Employee 1 (Sarah Chen)
### Step 1: Orchestrator → INIT
**Input Event:**
```json
{
  "event": "ASSESSMENT_STARTED",
  "employee_email": "sarah.chen@testco.com",
  "target_roles": ["workflow-translator", "ai-approver"]
}
```
**Expected Output:** CALL_EXAMINER with 6 selected scenarios covering:
- task-framing, process-thinking (top weights for workflow-translator)
- verification-instinct, risk-judgment (top weights for ai-approver)
- Difficulty progression: 1-2, 2-3, 3, 3-4, 4, 4-5
- No duplicate archetypes
**Suggested Scenarios:** SCN-002 (diff 1), SCN-005 (diff 2), SCN-006 (diff 3), SCN-003 (diff 2), SCN-008 (diff 4), SCN-012 (diff 5)
### Step 2: Examiner → Present SCN-002 (Instruction Rewrite)
**Mode:** initial_presentation
**Validates:** Natural presentation, preserves ambiguity, ends with scenario prompt question
### Step 3: Sarah's Initial Response (simulated)
"I would start by reviewing the current set of instructions to understand what the AI tool is being asked to do. Then I'd identify the specific gaps — where is the output going wrong? Is it the prompt wording, the context provided, or missing constraints? Before rewriting anything, I'd run the current instructions through the tool one more time to establish a baseline, then make targeted changes and compare outputs. I'd also document what I changed and why, so the team can learn from the iteration."
### Step 4: Examiner → Follow-up
**Mode:** follow_up
**Expected Strategy:** EDGE_CASE (response is competent, addressed process)
**Expected Follow-up:** Something like "What would you do if the rewritten instructions improve output for one use case but make it worse for another that wasn't originally flagged?"
### Step 5: Sarah's Follow-up Response (simulated)
"That's a real risk with any prompt changes. I'd want to test against a broader set of use cases before rolling out the rewrite — not just the one that was reported as broken. If I found a tradeoff like that, I'd flag it to the team and propose either A) creating separate instruction sets for different use cases, or B) finding a compromise that works acceptably for both. I wouldn't just optimize for the squeaky wheel."
### Step 6: Primary Grader → Score
**Expected Scores for SCN-002:**
- task-framing (primary): 3 — identified gap analysis, baseline, targeted changes
- process-thinking (secondary): 3 — clear sequential approach, documentation
- risk-judgment (secondary): 3 — recognized tradeoff risk in follow-up, proposed mitigation
### Step 7: Skeptic Grader → Audit
**Expected:** AGREE on all domains (well-reasoned, evidence-backed, scores match rubric)
### Steps 8-25: Repeat for remaining 5 scenarios (similar quality)
### Step 26: Synthesizer → Final Report
**Expected Output:**
- workflow-translator: weighted_score \~3.0, gating_passed = true, readiness_band = strong-fit
- ai-approver: weighted_score \~2.8, gating_passed = true, readiness_band = moderate-fit
- Strongest domains: task-framing, process-thinking
- Growth areas: change-leverage, exception-handling
---
## Test Trace: Employee 2 (Marcus Rivera)
### Key Validation Points:
- Examiner selects DEPTH_PROBE for most follow-ups (short, surface-level responses)
- Primary Grader assigns mostly 1-2 scores with low confidence on some
- Primary Grader flags reasoning_absence on at least 2 scenarios
- Primary Grader flags pressure_capitulation on 1 scenario where Marcus changes his answer
- Skeptic AGREES with low scores (no inflation to catch)
- Synthesizer: AI Operator = developing (weighted \~1.7), AI Approver = not-ready (weighted \~1.4)
### Sample Response (surface-level):
**Scenario prompt:** "How would you handle this situation?"
**Marcus:** "I would escalate this to my manager and let them decide."
**Follow-up (DEPTH_PROBE):** "Walk me through your reasoning for escalating."
**Marcus:** "Well, it seems like a complicated situation and I think someone with more experience should handle it."
**Expected:** reasoning_absence flag on initial response, score of 1 on most domains
### Pressure Capitulation Example:
**Initial response:** "I would hold off on approving this until we get the additional data."
**Follow-up (PRESSURE_INJECTION):** "Your VP just emailed saying the client is threatening to leave if this isn't approved by 5pm today."
**Marcus:** "Okay, if the VP needs it done then I'd go ahead and approve it."
**Expected:** pressure_capitulation flag, risk-judgment score drops to 1
---
## Test Trace: Employee 3 (Alex Kim)
### Key Validation Points:
- Examiner selects EDGE_CASE for most follow-ups (responses SOUND competent)
- Primary Grader may over-score due to verbosity bias — this is the key test
- Skeptic Grader catches the inflation: verbose reasoning but misses technical specifics
- Skeptic ADJUST_DOWN on verification-instinct and operational-consistency
- Synthesizer: Change Champion = moderate-fit, AI Operator = gated-out (operational-consistency fails)
### Sample Response (verbose but shallow):
**Scenario prompt about reviewing AI output for errors:**
**Alex:** "This is exactly the kind of challenge that organizations face as they scale AI adoption. I believe the key is establishing a robust review framework that empowers team members to critically engage with AI outputs. I would approach this by first considering the broader organizational context — what are the stakes, who are the stakeholders, and what does success look like? Then I'd think about creating a review process that balances thoroughness with efficiency. The goal should be building a culture of healthy skepticism toward AI outputs while still leveraging the productivity gains."
**Expected Primary Grader:** May score verification-instinct at 2-3 (sounds thoughtful)
**Expected Skeptic Audit:** ADJUST_DOWN to 1. Reasoning: "Response discusses frameworks and culture in the abstract but never identifies a single specific error to check for, describes no concrete verification step, and provides no method for actually reviewing the output. The Primary Grader was influenced by confident language and organizational framing. Per the rubric, a 2 requires 'attempts to apply the domain' and the employee did not apply any verification method."
---
## Pass/Fail Criteria
### The integration test PASSES if:
1. Orchestrator selects valid 6-scenario sets for all 3 employees with correct difficulty progression and domain coverage
2. Examiner presents scenarios naturally and selects appropriate follow-up strategies
3. Primary Grader produces valid JSON for all evaluations with chain-of-thought reasoning
4. Skeptic Grader catches the verbosity bias in Employee 3 (adjusts down at least 2 domains)
5. Penalty flags fire correctly: reasoning_absence for Employee 2, pressure_capitulation for Employee 2
6. Synthesizer produces correct readiness bands: strong-fit, developing/not-ready, moderate-fit/gated-out
7. Gating logic works: Employee 3 is gated-out for AI Operator due to operational-consistency threshold
8. No JSON parsing errors across any pipeline stage
9. All intermediate outputs are loggable and traceable
### The integration test FAILS if:
- Skeptic does NOT catch verbosity bias in Employee 3 (this is the adversarial value-add)
- Penalty flags fail to trigger for Employee 2's pressure capitulation
- Employee 1 (strong performer) gets scored below moderate-fit for workflow-translator
- Any prompt produces malformed JSON that breaks the pipeline
- Synthesizer miscalculates gating (Employee 3 should be gated-out for AI Operator)
---
## Developer Implementation Notes
This test should be implemented as an automated test suite before launch:
1. Create a test harness that simulates the 3 employee profiles
2. Store simulated responses in a test fixtures file
3. Run each through the full pipeline
4. Assert on the pass/fail criteria above
5. Log all intermediate outputs for debugging
6. This test should run on every prompt change to catch regressions