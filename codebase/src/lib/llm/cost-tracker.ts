type LLMRole = "orchestrator" | "examiner" | "primary-grader" | "skeptic-grader" | "synthesizer";

interface TokenUsage { promptTokens: number; completionTokens: number; totalTokens: number; }

// Approximate costs in USD per 1M tokens (early 2025)
const COST_PER_1M: Record<string, { input: number; output: number }> = {
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
  "gpt-4o": { input: 2.5, output: 10.0 },
};

export function trackCost(role: LLMRole, usage: TokenUsage): void {
  // Fire-and-forget — don't await in critical path
  persistCost(role, usage).catch((err) =>
    console.error(`[cost-tracker] Failed to persist cost for ${role}:`, err)
  );
}

async function persistCost(role: LLMRole, usage: TokenUsage) {
  const model = role === "orchestrator" || role === "examiner" ? "gpt-4o-mini" : "gpt-4o";
  const costs = COST_PER_1M[model];
  const estimatedCostUsd =
    (usage.promptTokens * costs.input + usage.completionTokens * costs.output) / 1_000_000;

  console.log(
    `[llm-cost] role=${role} model=${model} ` +
    `prompt=${usage.promptTokens} completion=${usage.completionTokens} ` +
    `cost=$${estimatedCostUsd.toFixed(6)}`
  );
  // Extend: insert into llm_cost_logs table for dashboarding
}
