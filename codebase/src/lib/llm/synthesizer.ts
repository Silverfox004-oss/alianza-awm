import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { trackCost } from "./cost-tracker";
import {
  DOMAIN_KEYS,
  DOMAIN_LABELS,
  type DomainKey,
  type ReadinessBand,
  normalizeTo100,
  computeOverallScore,
  getReadinessBand,
} from "@/lib/utils/scoring";

// ─── Role Definitions with Domain Weights ────────────────────────────────────

export const ROLE_DEFINITIONS = {
  ai_operator: {
    label: "AI Operator",
    description: "Runs defined AI workflows reliably — day-to-day execution",
    weights: {
      task_framing: 0.20,
      process_thinking: 0.15,
      verification_instinct: 0.20,
      exception_handling: 0.10,
      risk_judgment: 0.10,
      operational_consistency: 0.20,
      change_leverage: 0.05,
    },
  },
  ai_approver: {
    label: "AI Approver",
    description: "Reviews outputs, decides approve/edit/reject, handles escalation",
    weights: {
      task_framing: 0.10,
      process_thinking: 0.10,
      verification_instinct: 0.30,
      exception_handling: 0.15,
      risk_judgment: 0.25,
      operational_consistency: 0.05,
      change_leverage: 0.05,
    },
  },
  workflow_translator: {
    label: "Workflow Translator",
    description: "Turns business tasks into structured AI-enabled workflows",
    weights: {
      task_framing: 0.25,
      process_thinking: 0.25,
      verification_instinct: 0.10,
      exception_handling: 0.10,
      risk_judgment: 0.10,
      operational_consistency: 0.10,
      change_leverage: 0.10,
    },
  },
  ai_qa_reviewer: {
    label: "AI QA / Risk Reviewer",
    description: "Finds bad outputs, hidden errors, unsafe logic, compliance issues",
    weights: {
      task_framing: 0.05,
      process_thinking: 0.10,
      verification_instinct: 0.30,
      exception_handling: 0.20,
      risk_judgment: 0.25,
      operational_consistency: 0.05,
      change_leverage: 0.05,
    },
  },
  change_champion: {
    label: "Change Champion",
    description: "Helps teams adopt the system, teaches usage, reduces friction",
    weights: {
      task_framing: 0.10,
      process_thinking: 0.10,
      verification_instinct: 0.05,
      exception_handling: 0.05,
      risk_judgment: 0.10,
      operational_consistency: 0.10,
      change_leverage: 0.50,
    },
  },
} as const;

export type RoleName = keyof typeof ROLE_DEFINITIONS;
export const ROLE_NAMES = Object.keys(ROLE_DEFINITIONS) as RoleName[];

// ─── Deterministic Role-Fit Computation ──────────────────────────────────────

function computeRoleFitScores(
  domainScores: Record<DomainKey, number> // 0-4 raw scores
): Record<RoleName, number> {
  const result = {} as Record<RoleName, number>;
  for (const role of ROLE_NAMES) {
    const weights = ROLE_DEFINITIONS[role].weights;
    let score = 0;
    for (const domain of DOMAIN_KEYS) {
      score += normalizeTo100(domainScores[domain]) * weights[domain];
    }
    result[role] = Math.round(score);
  }
  return result;
}

// ─── Synthesizer Output Schema ───────────────────────────────────────────────

export const SynthesizerOutputSchema = z.object({
  risk_flags: z.array(z.object({
    flag: z.string().describe("Description of the risk behavior"),
    severity: z.enum(["low", "medium", "high"]),
    evidence: z.string().describe("Specific quote or behavior from the assessment"),
  })).describe("Risk flags for this employee based on observed assessment behaviors"),
  training_track: z.enum(["A", "B", "C", "D"])
    .describe("A=Ready Now (can support pilots immediately), B=Trainable in 30 Days (lightweight upskilling), C=Trainable in 60-90 Days (meaningful gaps), D=Not Suitable Yet (keep outside AI-critical functions)"),
  deployment_recommendation: z.string()
    .describe("1-2 sentence recommendation for how/whether to deploy this person in AI workflows. E.g. 'Suitable for approval-gated workflows only' or 'Can support pilot rollout in bounded processes'"),
  upskill_recommendations: z.array(z.string()).max(5)
    .describe("Specific training priorities for this employee"),
  executive_summary: z.string()
    .describe("3-5 sentence narrative for the manager report. Cover strengths, gaps, recommended role, and deployment readiness."),
});

export type SynthesizerOutput = z.infer<typeof SynthesizerOutputSchema> & {
  // These are computed deterministically, not by the LLM
  readiness_band: ReadinessBand;
  readiness_score: number;
  domain_scores: Record<DomainKey, number>;
  role_scores: Record<RoleName, number>;
  recommended_role: RoleName;
  role_ranking: RoleName[];
};

interface ReconciledEvaluation {
  scenarioId: string;
  scenarioTitle: string;
  reconciledScores: Record<DomainKey, number>; // 0-4 per domain
  missedPenaltyApplied: boolean;
}

export async function runSynthesizer(input: {
  employeeName: string;
  department: string;
  isManager: boolean;
  priorAiExposure: string;
  evaluations: ReconciledEvaluation[];
  targetRoles?: string[];
}): Promise<SynthesizerOutput> {
  // ─── Step 1: Deterministic Score Computation ─────────────────────────────
  // Average domain scores across all scenarios
  const avgDomainScores = {} as Record<DomainKey, number>;
  for (const domain of DOMAIN_KEYS) {
    const scores = input.evaluations.map((e) => e.reconciledScores[domain]).filter((s) => s !== undefined);
    avgDomainScores[domain] = scores.length > 0
      ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100
      : 0;
  }

  // Compute overall score and band deterministically
  const readiness_score = computeOverallScore(avgDomainScores);
  const readiness_band = getReadinessBand(readiness_score);

  // Compute role-fit scores deterministically from domain weights
  const role_scores = computeRoleFitScores(avgDomainScores);

  // Rank roles by score
  const role_ranking = ROLE_NAMES.slice().sort((a, b) => role_scores[b] - role_scores[a]);
  const recommended_role = role_ranking[0];

  // Normalize domain scores to 0-100 for output
  const domain_scores = {} as Record<DomainKey, number>;
  for (const domain of DOMAIN_KEYS) {
    domain_scores[domain] = normalizeTo100(avgDomainScores[domain]);
  }

  // ─── Step 2: LLM Synthesis (narrative, risk flags, recommendations) ──────
  const evalSummary = input.evaluations.map((e, i) =>
    `Scenario ${i + 1}: "${e.scenarioTitle}"\n` +
    DOMAIN_KEYS.map((d) => `  ${DOMAIN_LABELS[d]}: ${e.reconciledScores[d]}/4`).join("\n") +
    `\n  Missed Penalty Applied: ${e.missedPenaltyApplied}`
  ).join("\n\n");

  const roleScoreSummary = role_ranking.map((role) =>
    `  ${ROLE_DEFINITIONS[role].label}: ${role_scores[role]}/100`
  ).join("\n");

  const { object, usage } = await generateObject({
    model: openai("gpt-4o"),
    schema: SynthesizerOutputSchema,
    system: `You are a Synthesizer for the AI Workforce Map assessment platform. You produce the qualitative assessment — risk flags, training recommendations, deployment guidance, and executive narrative — for an individual employee.

IMPORTANT: Scores, bands, and role rankings have ALREADY been computed deterministically. You do NOT assign scores or bands. Your job is to:
1. Identify risk flags from the assessment behavior
2. Assign a training track (A/B/C/D)
3. Write a deployment recommendation
4. Write specific upskill priorities
5. Write an executive summary for the manager

TRAINING TRACK CRITERIA:
- Track A (Ready Now): Overall score 70+, no high-severity risk flags, recommended for pilot deployment
- Track B (Trainable in 30 Days): Overall score 55-69, or score 70+ with moderate risk flags that need addressing
- Track C (Trainable in 60-90 Days): Overall score 35-54, potential exists but meaningful gaps
- Track D (Not Suitable Yet): Overall score below 35, or 2+ high-severity risk flags regardless of score

RISK FLAGS:
Look for these specific patterns across the assessment:
- Over-trusts polished AI outputs without verification
- Under-specifies constraints or instructions
- Weak escalation habits (doesn't know when to stop and ask)
- Poor exception handling under pressure
- Contradicts own reasoning under stakeholder pressure
- Unsafe automation bias (recommends automating high-risk tasks)
- Cannot explain reasoning clearly

Be honest — not all employees are ready. A "Not Suitable Yet" recommendation is valuable information, not a failure.`,

    prompt: `EMPLOYEE: ${input.employeeName}
DEPARTMENT: ${input.department}
ROLE TYPE: ${input.isManager ? "People Manager" : "Individual Contributor"}
PRIOR AI EXPOSURE: ${input.priorAiExposure}

COMPUTED SCORES (deterministic — do not override):
  Overall Readiness: ${readiness_score}/100
  Readiness Band: ${readiness_band}
  
DOMAIN SCORES (0-100):
${DOMAIN_KEYS.map((d) => `  ${DOMAIN_LABELS[d]}: ${domain_scores[d]}`).join("\n")}

ROLE-FIT RANKING:
${roleScoreSummary}
  → Recommended Role: ${ROLE_DEFINITIONS[recommended_role].label}

PER-SCENARIO EVALUATIONS:
${evalSummary}

Based on the scores and per-scenario performance above, provide risk flags, training track, deployment recommendation, upskill priorities, and executive summary.`,
  });

  trackCost("synthesizer", usage);

  // Merge deterministic scores with LLM narrative output
  return {
    ...object,
    readiness_band,
    readiness_score,
    domain_scores,
    role_scores,
    recommended_role,
    role_ranking,
  };
}
