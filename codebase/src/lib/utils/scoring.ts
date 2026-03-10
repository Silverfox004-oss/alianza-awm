import type { PrimaryGraderOutput } from "@/lib/llm/primary-grader";
import type { SkepticGraderOutput } from "@/lib/llm/skeptic-grader";

// ─── 7-Domain Taxonomy (Original V1 Spec) ────────────────────────────────────
// These are the workforce role-mapping domains, NOT generic AI literacy domains.
// Each maps to specific behavioral indicators in the scenario rubrics.

export type DomainKey =
  | "task_framing"
  | "process_thinking"
  | "verification_instinct"
  | "exception_handling"
  | "risk_judgment"
  | "operational_consistency"
  | "change_leverage";

export const DOMAIN_KEYS: DomainKey[] = [
  "task_framing",
  "process_thinking",
  "verification_instinct",
  "exception_handling",
  "risk_judgment",
  "operational_consistency",
  "change_leverage",
];

export const DOMAIN_LABELS: Record<DomainKey, string> = {
  task_framing: "Task Framing",
  process_thinking: "Process Thinking",
  verification_instinct: "Verification Instinct",
  exception_handling: "Exception Handling",
  risk_judgment: "Risk Judgment",
  operational_consistency: "Operational Consistency",
  change_leverage: "Change Leverage",
};

// ─── 5-Band Readiness System (Original V1 Spec) ──────────────────────────────

export type ReadinessBand =
  | "not_ready"
  | "emerging"
  | "capable"
  | "strong"
  | "high_leverage";

export const READINESS_BAND_LABELS: Record<ReadinessBand, string> = {
  not_ready: "Not Ready",
  emerging: "Emerging",
  capable: "Capable",
  strong: "Strong",
  high_leverage: "High-Leverage",
};

// ─── Domain Weights (equal for V1; role-specific weights are in the DB) ──────

const DOMAIN_WEIGHTS: Record<DomainKey, number> = {
  task_framing: 0.15,
  process_thinking: 0.15,
  verification_instinct: 0.15,
  exception_handling: 0.15,
  risk_judgment: 0.15,
  operational_consistency: 0.125,
  change_leverage: 0.125,
};

/**
 * Reconciliation rules:
 * - Gap 0-1: use Primary score (within normal variation)
 * - Gap 2+: use the lower of Primary/Skeptic (significant disagreement → conservative)
 * - If Skeptic flags missedPenalty but Primary didn't: apply penalty (deduct 1 from all scores)
 */
export function reconcileScores(
  primary: PrimaryGraderOutput,
  skeptic: SkepticGraderOutput
): { reconciledScores: Record<DomainKey, number>; missedPenaltyApplied: boolean } {
  const reconciledScores = {} as Record<DomainKey, number>;

  for (const domain of DOMAIN_KEYS) {
    const p = primary[domain].score;
    const s = skeptic[domain].score;
    const gap = Math.abs(p - s);
    reconciledScores[domain] = gap <= 1 ? p : Math.min(p, s);
  }

  const missedPenaltyApplied = !primary.missedPenalty && skeptic.missedPenalty;
  if (missedPenaltyApplied) {
    for (const domain of DOMAIN_KEYS) {
      reconciledScores[domain] = Math.max(0, reconciledScores[domain] - 1);
    }
  }

  return { reconciledScores, missedPenaltyApplied };
}

/** Normalize 0–4 domain score to 0–100. */
export function normalizeTo100(score: number): number {
  return Math.round((score / 4) * 100);
}

/** Weighted composite score from 0-4 domain scores → 0-100 overall. */
export function computeOverallScore(domainScores: Record<DomainKey, number>): number {
  let weighted = 0;
  for (const domain of DOMAIN_KEYS) {
    weighted += normalizeTo100(domainScores[domain]) * DOMAIN_WEIGHTS[domain];
  }
  return Math.round(weighted);
}

/** Map overall score (0-100) to the 5-band readiness system. */
export function getReadinessBand(overallScore: number): ReadinessBand {
  if (overallScore >= 85) return "high_leverage";
  if (overallScore >= 70) return "strong";
  if (overallScore >= 55) return "capable";
  if (overallScore >= 35) return "emerging";
  return "not_ready";
}
