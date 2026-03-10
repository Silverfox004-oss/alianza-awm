import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { trackCost } from "./cost-tracker";
import { DOMAIN_KEYS, DOMAIN_LABELS, type DomainKey } from "@/lib/utils/scoring";

// ─── Zod Schema: 7-Domain Scoring ────────────────────────────────────────────

const DomainScoreSchema = z.object({
  score: z.number().int().min(0).max(4)
    .describe("0=Unsafe/Not demonstrated, 1=Weak/Minimal, 2=Acceptable/Developing, 3=Strong/Proficient, 4=Excellent/Expert"),
  evidence: z.string().describe("Direct quote or close paraphrase from the employee's response that supports this score"),
  reasoning: z.string().describe("2-3 sentence explanation of why this specific score level was chosen, referencing the rubric anchors"),
});

const PenaltyFlagSchema = z.object({
  type: z.enum([
    "contradiction",
    "overconfidence",
    "unsafe_automation_bias",
    "failure_to_verify",
    "inconsistency_under_pressure",
    "unclear_reasoning",
  ]),
  description: z.string().describe("Specific behavior observed"),
  severity: z.enum(["minor", "moderate", "major"]),
});

export const PrimaryGraderOutputSchema = z.object({
  task_framing: DomainScoreSchema,
  process_thinking: DomainScoreSchema,
  verification_instinct: DomainScoreSchema,
  exception_handling: DomainScoreSchema,
  risk_judgment: DomainScoreSchema,
  operational_consistency: DomainScoreSchema,
  change_leverage: DomainScoreSchema,
  penalty_flags: z.array(PenaltyFlagSchema).describe("Reliability modifier flags triggered by the response"),
  overallImpression: z.string().describe("2-3 sentence overall impression"),
  missedPenalty: z.boolean().describe("True if response critically missed the core scenario dilemma"),
});

export type PrimaryGraderOutput = z.infer<typeof PrimaryGraderOutputSchema>;

interface PrimaryGraderInput {
  scenarioTitle: string;
  scenarioContext: string;
  scenarioTask: string;
  scenarioRubric: string;
  scenarioRedFlags: string;
  scenarioReliabilityTriggers: string;
  userResponse: string;
  followupExchanges: { role: string; content: string }[];
  primaryDomains: string[];
  secondaryDomains: string[];
}

export async function runPrimaryGrader(input: PrimaryGraderInput): Promise<PrimaryGraderOutput> {
  const fullResponse = [
    `INITIAL RESPONSE:\n${input.userResponse}`,
    ...input.followupExchanges.map(
      (m) => `${m.role === "assistant" ? "EXAMINER" : "EMPLOYEE"}: ${m.content}`
    ),
  ].join("\n\n");

  const { object, usage } = await generateObject({
    model: openai("gpt-4o"),
    schema: PrimaryGraderOutputSchema,
    system: `You are a Primary Grader for the AI Workforce Map assessment platform. You evaluate employee responses to scenario-based situational judgment tests (SJTs) that measure readiness for AI-adjacent roles in the workplace.

YOUR SCORING PHILOSOPHY:
- A score of 3 means genuinely strong performance — the person demonstrated real competence, not just surface awareness. Do NOT give 3s for adequate responses.
- A score of 4 is reserved for expert-level responses that show depth, nuance, and insight beyond what was asked. This is rare.
- A score of 2 means acceptable but missing important elements. This is the most common score for average performers.
- A score of 1 means the person showed minimal awareness but significant gaps.
- A score of 0 means the response was unsafe, absent, or demonstrated dangerous judgment.

THE 7 SCORING DOMAINS:
1. TASK FRAMING — Can this person translate vague goals into bounded, structured instructions? Look for: specificity, constraint identification, success criteria definition, input/output specification.
2. PROCESS THINKING — Can they break work into steps, dependencies, approvals, and exceptions? Look for: sequential logic, dependency awareness, handoff design, workflow architecture.
3. VERIFICATION INSTINCT — Do they naturally check, compare, validate, and question outputs? Look for: skepticism toward AI output, comparison to source material, spot-check proposals, accuracy validation.
4. EXCEPTION HANDLING — When things go wrong, can they catch, triage, and escalate correctly? Look for: error recognition, severity assessment, escalation pathways, fallback procedures.
5. RISK JUDGMENT — Can they tell the difference between safe automation and risky automation? Look for: consequence analysis, regulatory awareness, risk-tier classification, safeguard proposals.
6. OPERATIONAL CONSISTENCY — Will they follow rules, document actions, and operate repeatably? Look for: documentation mentions, audit trails, monitoring proposals, standard operating procedures, repeatability.
7. CHANGE LEVERAGE — Can they help others use the system, communicate clearly, and become internal leverage? Look for: stakeholder communication, training awareness, adoption strategy, friction reduction.

RELIABILITY MODIFIER FLAGS:
Flag these specific behaviors when observed:
- "contradiction": Response contradicts itself between initial answer and follow-up (especially caving under pressure)
- "overconfidence": States AI "can definitely handle" something without uncertainty acknowledgment, or accepts vendor accuracy claims uncritically
- "unsafe_automation_bias": Recommends full automation of high-consequence tasks without safeguards
- "failure_to_verify": Approves or accepts AI output without questioning accuracy, sources, or completeness
- "inconsistency_under_pressure": Quality of reasoning visibly degrades between initial response and follow-up pressure prompt
- "unclear_reasoning": Assigns classifications or makes decisions but provides no reasoning beyond surface-level statements

SCORING INSTRUCTIONS:
- Score ALL 7 domains, even if the scenario primarily targets only 2-3. Domains not directly tested should still be scored based on any incidental evidence (or scored 0 if no evidence exists).
- Primary domains for this scenario: ${input.primaryDomains.join(", ")} — these are the main targets; weigh evidence here most heavily.
- Secondary domains for this scenario: ${input.secondaryDomains.join(", ")} — score based on available evidence.
- Use the scenario-specific rubric below as your primary scoring guide. Match the employee's behavior to the rubric anchors.
- Evidence must be actual quotes or close paraphrases from the response, not your own interpretation.`,

    prompt: `SCENARIO: "${input.scenarioTitle}"

CONTEXT:
${input.scenarioContext}

TASK GIVEN TO EMPLOYEE:
${input.scenarioTask}

SCENARIO-SPECIFIC SCORING RUBRIC:
${input.scenarioRubric}

RED FLAGS (behaviors that should trigger Score 0 or 1):
${input.scenarioRedFlags}

RELIABILITY MODIFIER TRIGGERS:
${input.scenarioReliabilityTriggers}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EMPLOYEE'S FULL RESPONSE (including follow-up exchange):

${fullResponse}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Score each of the 7 domains (0-4) with specific evidence from the response. Flag any reliability modifiers triggered. A score of 3 means genuinely proficient — not merely adequate.`,
  });

  trackCost("primary-grader", usage);
  return object;
}
