import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { trackCost } from "./cost-tracker";
import type { PrimaryGraderOutput } from "./primary-grader";
import { DOMAIN_KEYS, DOMAIN_LABELS, type DomainKey } from "@/lib/utils/scoring";

// ─── Zod Schema: 7-Domain Skeptic Scoring ────────────────────────────────────

const SkepticDomainSchema = z.object({
  score: z.number().int().min(0).max(4),
  verdict: z.enum(["AGREE", "ADJUST_DOWN", "FLAG_FOR_REVIEW"])
    .describe("AGREE if within 1 point of Primary. ADJUST_DOWN if Primary was too generous. FLAG_FOR_REVIEW if grading seems unreliable or evidence is contradictory."),
  disagreement: z.string().optional()
    .describe("Required if verdict is ADJUST_DOWN or FLAG_FOR_REVIEW — explain what the Primary Grader missed or misjudged"),
});

export const SkepticGraderOutputSchema = z.object({
  task_framing: SkepticDomainSchema,
  process_thinking: SkepticDomainSchema,
  verification_instinct: SkepticDomainSchema,
  exception_handling: SkepticDomainSchema,
  risk_judgment: SkepticDomainSchema,
  operational_consistency: SkepticDomainSchema,
  change_leverage: SkepticDomainSchema,
  missedPenalty: z.boolean()
    .describe("True if you believe the employee critically missed the scenario's core dilemma but the Primary Grader didn't flag it"),
  additionalPenaltyFlags: z.array(z.object({
    type: z.enum([
      "contradiction",
      "overconfidence",
      "unsafe_automation_bias",
      "failure_to_verify",
      "inconsistency_under_pressure",
      "unclear_reasoning",
    ]),
    description: z.string(),
    severity: z.enum(["minor", "moderate", "major"]),
  })).describe("Penalty flags the Primary Grader missed"),
  overallCritique: z.string()
    .describe("2-3 sentences on what the Primary Grader may have missed, been too generous about, or incorrectly interpreted"),
});

export type SkepticGraderOutput = z.infer<typeof SkepticGraderOutputSchema>;

interface SkepticGraderInput {
  scenarioTitle: string;
  scenarioContext: string;
  scenarioTask: string;
  scenarioRubric: string;
  scenarioRedFlags: string;
  userResponse: string;
  followupExchanges: { role: string; content: string }[];
  primaryGrade: PrimaryGraderOutput;
}

export async function runSkepticGrader(input: SkepticGraderInput): Promise<SkepticGraderOutput> {
  const fullResponse = [
    `INITIAL RESPONSE:\n${input.userResponse}`,
    ...input.followupExchanges.map(
      (m) => `${m.role === "assistant" ? "EXAMINER" : "EMPLOYEE"}: ${m.content}`
    ),
  ].join("\n\n");

  // Format Primary Grader's scores for the Skeptic to review
  const primaryScoreSummary = DOMAIN_KEYS.map((domain) => {
    const d = input.primaryGrade[domain];
    return `- ${DOMAIN_LABELS[domain]}: ${d.score}/4 — Evidence: "${d.evidence}" — Reasoning: "${d.reasoning}"`;
  }).join("\n");

  const primaryPenalties = input.primaryGrade.penalty_flags.length > 0
    ? input.primaryGrade.penalty_flags.map((f) => `- [${f.severity.toUpperCase()}] ${f.type}: ${f.description}`).join("\n")
    : "None flagged";

  const { object, usage } = await generateObject({
    model: openai("gpt-4o"),
    schema: SkepticGraderOutputSchema,
    system: `You are a Skeptic Grader for the AI Workforce Map assessment platform. Your job is to challenge the Primary Grader's scores and catch inflated, charitable, or surface-level grading.

YOUR ROLE:
- You are the quality control layer. Primary Graders tend to be generous — they give credit for mentioning concepts even when the response lacks depth.
- Look for: scores that don't match the evidence cited, important rubric elements the Primary missed, penalty flags that should have been raised, and evidence of the employee gaming or giving surface-level answers.

SCORING GUIDELINES:
- If you agree with a score (within 1 point), verdict = AGREE and return the same score.
- If the Primary was too generous, verdict = ADJUST_DOWN and return a lower score with explanation.
- If the grading seems unreliable (contradictory evidence, unclear basis), verdict = FLAG_FOR_REVIEW.
- You may also RAISE a score if the Primary missed strong evidence, but this should be rare.
- Check the RED FLAGS list — if the employee exhibited any red flag behavior and the Primary didn't score 0-1 for the relevant domain, that's a miss.

THE 7 DOMAINS:
1. Task Framing — translating goals into structured instructions
2. Process Thinking — breaking work into steps, dependencies, approvals
3. Verification Instinct — checking, comparing, validating outputs
4. Exception Handling — catching, triaging, escalating when things go wrong
5. Risk Judgment — distinguishing safe vs. risky automation
6. Operational Consistency — following rules, documenting, operating repeatably
7. Change Leverage — helping others adopt, communicating clearly`,

    prompt: `SCENARIO: "${input.scenarioTitle}"

CONTEXT:
${input.scenarioContext}

TASK GIVEN TO EMPLOYEE:
${input.scenarioTask}

SCORING RUBRIC:
${input.scenarioRubric}

RED FLAGS (behaviors warranting Score 0-1):
${input.scenarioRedFlags}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EMPLOYEE'S FULL RESPONSE:
${fullResponse}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIMARY GRADER'S SCORES:
${primaryScoreSummary}

PRIMARY GRADER'S PENALTY FLAGS:
${primaryPenalties}

PRIMARY GRADER'S MISSED PENALTY: ${input.primaryGrade.missedPenalty}
PRIMARY GRADER'S OVERALL IMPRESSION: "${input.primaryGrade.overallImpression}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Review each domain score. Challenge any score that seems inflated relative to the evidence. Flag any penalty triggers the Primary missed.`,
  });

  trackCost("skeptic-grader", usage);
  return object;
}
