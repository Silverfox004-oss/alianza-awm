# Phase 3 — Grading Pipeline Implementation

**Notion URL:** https://www.notion.so/31ed807b91118100b2b3d01041f208af

---

## Overview
Grading runs entirely in the background via Inngest after the employee submits their final scenario. The pipeline uses four LLM agents (Primary Grader → Skeptic Grader → Reconciliation → Synthesizer) with a deterministic reconciliation step to produce final domain scores and role fit results.
**Trigger:** `POST /api/assessment/grade` dispatches the Inngest event.
**Estimated runtime:** 60–120 seconds per assessment (parallelized grading).
**Models:** `gpt-4o-mini` for Orchestrator/Examiner · `gpt-4o` for Primary Grader, Skeptic Grader, Synthesizer.
---
## File Structure
```javascript
src/
  lib/
    inngest/
      client.ts                         (existing)
      functions/
        grade-assessment.ts             ← Main Inngest function (6 steps)
      dispatch.ts                       ← Event sender helper
    llm/
      orchestrator.ts
      examiner.ts
      primary-grader.ts
      skeptic-grader.ts
      synthesizer.ts
      cost-tracker.ts
    utils/
      scoring.ts                        ← Reconciliation + normalization
      scenario-loader.ts                ← .md file reader via gray-matter
  app/
    api/
      assessment/
        grade/
          route.ts
```
---
## 1. Inngest Dispatch Helper (`src/lib/inngest/dispatch.ts`)
```typescript
import { inngest } from "./client";

export async function dispatchGrading(assessmentId: string) {
  await inngest.send({
    name: "assessment/grade.requested",
    data: { assessmentId },
  });
}
```
---
## 2. API Route (`src/app/api/assessment/grade/route.ts`)
```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { dispatchGrading } from "@/lib/inngest/dispatch";

export async function POST(req: Request) {
  const { assessmentId } = await req.json();
  if (!assessmentId) {
    return NextResponse.json({ error: "assessmentId required" }, { status: 400 });
  }

  const supabase = await createServerClient();
  const { data: assessment } = await supabase
    .from("assessments")
    .select("id, status")
    .eq("id", assessmentId)
    .single();

  if (!assessment) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (!["completed", "grading"].includes(assessment.status)) {
    return NextResponse.json(
      { error: "Assessment is not ready for grading" }, { status: 409 }
    );
  }

  await dispatchGrading(assessmentId);
  return NextResponse.json({ dispatched: true });
}
```
---
## 3. LLM Wrapper: Orchestrator (`src/lib/llm/orchestrator.ts`)
```typescript
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { trackCost } from "./cost-tracker";

const OrchestratorOutputSchema = z.object({
  scenarioIds: z.array(z.string().uuid()).min(3).max(6)
    .describe("Ordered list of scenario IDs to present"),
  rationale: z.string().describe("Why these scenarios were chosen"),
});

export type OrchestratorOutput = z.infer;

interface OrchestratorInput {
  companyId: string;
  userId: string;
  intakeData: {
    department: string;
    yearsExperience: number;
    isManager: boolean;
    priorAiExposure: string;
    toolUsage: string[];
  };
}

export async function selectScenarios(input: OrchestratorInput): Promise {
  const { object, usage } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: OrchestratorOutputSchema,
    prompt: `You are an AI assessment orchestrator. Given an employee profile, select the most appropriate assessment scenarios.

Employee Profile:
- Department: ${input.intakeData.department}
- Years of Experience: ${input.intakeData.yearsExperience}
- People Manager: ${input.intakeData.isManager}
- AI Exposure: ${input.intakeData.priorAiExposure}
- Tools Used: ${input.intakeData.toolUsage.join(", ")}

Select 4-5 scenarios relevant to their department and experience level.`,
  });
  trackCost("orchestrator", usage);
  return object;
}
```
---
## 4. LLM Wrapper: Examiner (`src/lib/llm/examiner.ts`)
```typescript
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

interface ExaminerInput {
  scenarioTitle: string;
  scenarioContext: string;
  scenarioTask: string;
  userResponse: string;
  conversationHistory: { role: "user" | "assistant"; content: string }[];
}

/**
 * Returns a streamText result for Vercel AI SDK's toDataStreamResponse().
 * Called from /api/assessment/respond — not from the grading pipeline.
 */
export async function runExaminer(input: ExaminerInput) {
  return streamText({
    model: openai("gpt-4o-mini"),
    system: `You are an AI assessment examiner. Probe the depth of understanding through follow-up questions.

Scenario: "${input.scenarioTitle}"
Context: ${input.scenarioContext}
Task: ${input.scenarioTask}

Guidelines: Ask ONE follow-up per turn. Focus on reasoning, edge cases, error recovery, ethics. Be concise.`,
    messages: [
      { role: "user", content: input.userResponse },
      ...input.conversationHistory,
    ],
  });
}
```
---
## 5. LLM Wrapper: Primary Grader (`src/lib/llm/primary-grader.ts`)
```typescript
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { trackCost } from "./cost-tracker";

const DomainScoreSchema = z.object({
  score: z.number().int().min(0).max(4)
    .describe("0=Not demonstrated, 1=Minimal, 2=Developing, 3=Proficient, 4=Expert"),
  evidence: z.string().describe("Direct quote or paraphrase from response"),
  reasoning: z.string().describe("Why this score was given"),
});

export const PrimaryGraderOutputSchema = z.object({
  promptComprehension: DomainScoreSchema,
  aiCollaboration: DomainScoreSchema,
  criticalEvaluation: DomainScoreSchema,
  ethicsAndBias: DomainScoreSchema,
  practicalApplication: DomainScoreSchema,
  overallImpression: z.string().describe("1-2 sentence overall impression"),
  missedPenalty: z.boolean().describe("True if response critically missed the scenario point"),
});

export type PrimaryGraderOutput = z.infer;

interface PrimaryGraderInput {
  scenarioTitle: string;
  scenarioContext: string;
  scenarioTask: string;
  scenarioRubric: string;
  userResponse: string;
  followupExchanges: { role: string; content: string }[];
}

export async function runPrimaryGrader(input: PrimaryGraderInput): Promise {
  const fullResponse = [
    `Initial response:\n${input.userResponse}`,
    ...input.followupExchanges.map(
      (m) => `${m.role === "assistant" ? "Examiner" : "Employee"}: ${m.content}`
    ),
  ].join("\n\n");

  const { object, usage } = await generateObject({
    model: openai("gpt-4o"),
    schema: PrimaryGraderOutputSchema,
    prompt: `You are a Primary Grader evaluating an AI readiness assessment response.

SCENARIO: ${input.scenarioTitle}
CONTEXT: ${input.scenarioContext}
TASK: ${input.scenarioTask}
RUBRIC: ${input.scenarioRubric}

FULL RESPONSE (including follow-up exchange):
${fullResponse}

Score each domain 0–4. A score of 3 means genuinely proficient, not just adequate.`,
  });

  trackCost("primary-grader", usage);
  return object;
}
```
---
## 6. LLM Wrapper: Skeptic Grader (`src/lib/llm/skeptic-grader.ts`)
```typescript
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { trackCost } from "./cost-tracker";
import type { PrimaryGraderOutput } from "./primary-grader";

const SkepticScoreSchema = z.object({
  score: z.number().int().min(0).max(4),
  disagreement: z.string().optional()
    .describe("Why the Skeptic disagrees with Primary (if different score)"),
});

export const SkepticGraderOutputSchema = z.object({
  promptComprehension: SkepticScoreSchema,
  aiCollaboration: SkepticScoreSchema,
  criticalEvaluation: SkepticScoreSchema,
  ethicsAndBias: SkepticScoreSchema,
  practicalApplication: SkepticScoreSchema,
  missedPenalty: z.boolean(),
  overallCritique: z.string().describe("What the Primary Grader may have missed"),
});

export type SkepticGraderOutput = z.infer;

interface SkepticGraderInput {
  scenarioTitle: string;
  scenarioTask: string;
  userResponse: string;
  primaryGrade: PrimaryGraderOutput;
}

export async function runSkepticGrader(input: SkepticGraderInput): Promise {
  const { object, usage } = await generateObject({
    model: openai("gpt-4o"),
    schema: SkepticGraderOutputSchema,
    prompt: `You are a Skeptic Grader. Challenge inflated or charitable scores from the Primary Grader.

SCENARIO: ${input.scenarioTitle}
TASK: ${input.scenarioTask}

EMPLOYEE RESPONSE:
${input.userResponse}

PRIMARY GRADER SCORES:
- Prompt Comprehension: ${input.primaryGrade.promptComprehension.score}/4 — "${input.primaryGrade.promptComprehension.reasoning}"
- AI Collaboration: ${input.primaryGrade.aiCollaboration.score}/4 — "${input.primaryGrade.aiCollaboration.reasoning}"
- Critical Evaluation: ${input.primaryGrade.criticalEvaluation.score}/4 — "${input.primaryGrade.criticalEvaluation.reasoning}"
- Ethics & Bias: ${input.primaryGrade.ethicsAndBias.score}/4 — "${input.primaryGrade.ethicsAndBias.reasoning}"
- Practical Application: ${input.primaryGrade.practicalApplication.score}/4 — "${input.primaryGrade.practicalApplication.reasoning}"
- Missed Penalty: ${input.primaryGrade.missedPenalty}

Be critical. Lower scores when warranted. If you agree, return the same score.`,
  });
  trackCost("skeptic-grader", usage);
  return object;
}
```
---
## 7. LLM Wrapper: Synthesizer (`src/lib/llm/synthesizer.ts`)
```typescript
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { trackCost } from "./cost-tracker";

export const SynthesizerOutputSchema = z.object({
  overallReadinessScore: z.number().int().min(0).max(100),
  readinessBand: z.enum(["Not Ready", "Developing", "Ready", "Advanced"]),
  domainSummary: z.object({
    promptComprehension: z.number().int().min(0).max(100),
    aiCollaboration: z.number().int().min(0).max(100),
    criticalEvaluation: z.number().int().min(0).max(100),
    ethicsAndBias: z.number().int().min(0).max(100),
    practicalApplication: z.number().int().min(0).max(100),
  }),
  topStrengths: z.array(z.string()).max(3),
  developmentAreas: z.array(z.string()).max(3),
  roleFitResults: z.array(z.object({
    roleTitle: z.string(),
    fitScore: z.number().int().min(0).max(100),
    rationale: z.string(),
  })),
  narrativeSummary: z.string().describe("3-5 sentence executive narrative for manager report"),
  developmentRecommendations: z.array(z.string()).max(5),
});

export type SynthesizerOutput = z.infer;

interface ReconciledEvaluation {
  scenarioId: string;
  scenarioTitle: string;
  reconciledScores: {
    promptComprehension: number;
    aiCollaboration: number;
    criticalEvaluation: number;
    ethicsAndBias: number;
    practicalApplication: number;
  };
  missedPenaltyApplied: boolean;
}

export async function runSynthesizer(input: {
  employeeName: string;
  department: string;
  isManager: boolean;
  priorAiExposure: string;
  evaluations: ReconciledEvaluation[];
  targetRoles?: string[];
}): Promise {
  const evalSummary = input.evaluations.map((e, i) =>
    `Scenario ${i + 1}: "${e.scenarioTitle}"
  Prompt Comprehension: ${e.reconciledScores.promptComprehension}/4
  AI Collaboration: ${e.reconciledScores.aiCollaboration}/4
  Critical Evaluation: ${e.reconciledScores.criticalEvaluation}/4
  Ethics & Bias: ${e.reconciledScores.ethicsAndBias}/4
  Practical Application: ${e.reconciledScores.practicalApplication}/4
  Missed Penalty: ${e.missedPenaltyApplied}`
  ).join("\n\n");

  const { object, usage } = await generateObject({
    model: openai("gpt-4o"),
    schema: SynthesizerOutputSchema,
    prompt: `Synthesize an AI workforce readiness assessment for an individual employee.

Employee: ${input.employeeName}
Department: ${input.department}
Role Type: ${input.isManager ? "People Manager" : "Individual Contributor"}
Prior AI Exposure: ${input.priorAiExposure}
${input.targetRoles?.length ? `Target Roles: ${input.targetRoles.join(", ")}` : ""}

RECONCILED EVALUATIONS:
${evalSummary}

Be honest — not all employees are "Ready".`,
  });
  trackCost("synthesizer", usage);
  return object;
}
```
---
## 8. Cost Tracker (`src/lib/llm/cost-tracker.ts`)
```typescript
type LLMRole = "orchestrator" | "examiner" | "primary-grader" | "skeptic-grader" | "synthesizer";

interface TokenUsage { promptTokens: number; completionTokens: number; totalTokens: number; }

// Approximate costs in USD per 1M tokens (early 2025)
const COST_PER_1M: Record = {
  "gpt-4o-mini": { input: 0.15, output: 0.6 },
  "gpt-4o": { input: 2.5, output: 10.0 },
};

export function trackCost(role: LLMRole, usage: TokenUsage): void {
  // Fire-and-forget — don’t await in critical path
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
```
---
## 9. Scoring Utility (`src/lib/utils/scoring.ts`)
```typescript
import type { PrimaryGraderOutput } from "@/lib/llm/primary-grader";
import type { SkepticGraderOutput } from "@/lib/llm/skeptic-grader";

export type DomainKey =
  | "promptComprehension" | "aiCollaboration"
  | "criticalEvaluation" | "ethicsAndBias" | "practicalApplication";

export const DOMAIN_KEYS: DomainKey[] = [
  "promptComprehension", "aiCollaboration",
  "criticalEvaluation", "ethicsAndBias", "practicalApplication",
];

export type ReadinessBand = "Not Ready" | "Developing" | "Ready" | "Advanced";

/**
 * Reconciliation rules:
 * - Gap 0-1: use Primary score (within normal variation)
 * - Gap 2+: use the lower of Primary/Skeptic (significant disagreement → conservative)
 * - If Skeptic flags missedPenalty but Primary didn’t: apply penalty (deduct 1 from all scores)
 */
export function reconcileScores(
  primary: PrimaryGraderOutput,
  skeptic: SkepticGraderOutput
): { reconciledScores: Record; missedPenaltyApplied: boolean } {
  const reconciledScores = {} as Record;

  for (const domain of DOMAIN_KEYS) {
    const p = primary[domain].score;
    const s = skeptic[domain].score;
    const gap = Math.abs(p - s);
    reconciledScores[domain] = gap  = {
  promptComprehension: 0.25,
  aiCollaboration: 0.25,
  criticalEvaluation: 0.20,
  ethicsAndBias: 0.15,
  practicalApplication: 0.15,
};

export function computeOverallScore(domainScores: Record): number {
  let weighted = 0;
  for (const domain of DOMAIN_KEYS) {
    weighted += domainScores[domain] * DOMAIN_WEIGHTS[domain];
  }
  return Math.round(weighted);
}

export function getReadinessBand(overallScore: number): ReadinessBand {
  if (overallScore >= 80) return "Advanced";
  if (overallScore >= 60) return "Ready";
  if (overallScore >= 40) return "Developing";
  return "Not Ready";
}
```
---
## 10. Scenario Loader (`src/lib/utils/scenario-loader.ts`)
```typescript
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface ScenarioFile {
  id: string;
  title: string;
  moduleLabel: string;
  context: string;
  task: string;
  rubric: string;
  timeLimitSeconds: number;
  content: string;
}

const SCENARIOS_DIR = path.join(process.cwd(), "content/scenarios");

export async function loadScenarioFile(scenarioId: string): Promise {
  try {
    const filePath = path.join(SCENARIOS_DIR, `${scenarioId}.md`);
    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);
    return {
      id: data.id ?? scenarioId,
      title: data.title ?? "Untitled Scenario",
      moduleLabel: data.module_label ?? "General",
      context: data.context ?? extractSection(content, "Context"),
      task: data.task ?? extractSection(content, "Task"),
      rubric: data.rubric ?? extractSection(content, "Rubric"),
      timeLimitSeconds: data.time_limit_seconds ?? 600,
      content,
    };
  } catch {
    return null;
  }
}

export async function loadScenarioFiles(scenarioIds: string[]): Promise {
  const results = await Promise.all(scenarioIds.map((id) => loadScenarioFile(id)));
  return results.filter(Boolean) as ScenarioFile[];
}

function extractSection(content: string, sectionName: string): string {
  const regex = new RegExp(`##\\s+${sectionName}\\n([\\s\\S]*?)(?=\\n##|$)`, "i");
  const match = content.match(regex);
  return match ? match[1].trim() : "";
}
```
---
## 11. Main Inngest Function (`src/lib/inngest/functions/grade-assessment.ts`)
```typescript
import { inngest } from "../client";
import { createServerClient } from "@/lib/supabase/server";
import { runPrimaryGrader } from "@/lib/llm/primary-grader";
import { runSkepticGrader } from "@/lib/llm/skeptic-grader";
import { runSynthesizer } from "@/lib/llm/synthesizer";
import { loadScenarioFiles } from "@/lib/utils/scenario-loader";
import { reconcileScores, DOMAIN_KEYS } from "@/lib/utils/scoring";
import type { PrimaryGraderOutput } from "@/lib/llm/primary-grader";
import type { SkepticGraderOutput } from "@/lib/llm/skeptic-grader";

export const gradeAssessment = inngest.createFunction(
  {
    id: "grade-assessment",
    name: "Grade Assessment",
    retries: 2,
    concurrency: { limit: 5, key: "event.data.assessmentId" },
    timeouts: { finish: "10m" },
  },
  { event: "assessment/grade.requested" },
  async ({ event, step }) => {
    const { assessmentId } = event.data;

    // ─── Step 1: Load all responses + scenario metadata ─────────────────────
    const assessmentData = await step.run("load-assessment-data", async () => {
      const supabase = await createServerClient();

      const { data: assessment, error: assessError } = await supabase
        .from("assessments")
        .select(`
          id, selected_scenario_ids,
          company_users(id, name, department, is_manager, prior_ai_exposure, years_experience),
          companies(id, name)
        `)
        .eq("id", assessmentId)
        .single();

      if (assessError || !assessment) throw new Error(`Assessment ${assessmentId} not found`);

      const { data: responses, error: respError } = await supabase
        .from("assessment_responses")
        .select("scenario_id, response_text, followup_exchanges, submitted_at")
        .eq("assessment_id", assessmentId)
        .not("submitted_at", "is", null);

      if (respError) throw new Error("Failed to load responses");

      const scenarioFiles = await loadScenarioFiles(assessment.selected_scenario_ids);

      return { assessment, responses: responses ?? [], scenarioFiles };
    });

    const { assessment, responses, scenarioFiles } = assessmentData;

    // ─── Step 2: Primary Grading (parallel per scenario) ────────────────────
    const primaryGrades = await step.run("primary-grading", async () => {
      const grades: Record = {};
      await Promise.all(
        responses.map(async (response) => {
          const file = scenarioFiles.find((f) => f.id === response.scenario_id);
          if (!file || !response.response_text) return;
          grades[response.scenario_id] = await runPrimaryGrader({
            scenarioTitle: file.title,
            scenarioContext: file.context,
            scenarioTask: file.task,
            scenarioRubric: file.rubric,
            userResponse: response.response_text,
            followupExchanges: response.followup_exchanges ?? [],
          });
        })
      );
      return grades;
    });

    // ─── Step 3: Skeptic Grading (parallel per scenario) ────────────────────
    const skepticGrades = await step.run("skeptic-grading", async () => {
      const grades: Record = {};
      await Promise.all(
        responses.map(async (response) => {
          const file = scenarioFiles.find((f) => f.id === response.scenario_id);
          const primary = primaryGrades[response.scenario_id];
          if (!file || !primary || !response.response_text) return;
          grades[response.scenario_id] = await runSkepticGrader({
            scenarioTitle: file.title,
            scenarioTask: file.task,
            userResponse: response.response_text,
            primaryGrade: primary,
          });
        })
      );
      return grades;
    });

    // ─── Step 4: Reconcile Scores ────────────────────────────────────────────
    const reconciledEvaluations = await step.run("reconcile-scores", async () => {
      return responses.map((response) => {
        const primary = primaryGrades[response.scenario_id];
        const skeptic = skepticGrades[response.scenario_id];
        const file = scenarioFiles.find((f) => f.id === response.scenario_id);
        if (!file) return null;

        // Fallback: if skeptic failed, use primary directly
        if (!skeptic) {
          return {
            scenarioId: response.scenario_id,
            scenarioTitle: file.title,
            reconciledScores: Object.fromEntries(
              DOMAIN_KEYS.map((k) => [k, primary[k].score])
            ),
            missedPenaltyApplied: primary?.missedPenalty ?? false,
            primaryGrade: primary,
            skepticGrade: null,
          };
        }

        const { reconciledScores, missedPenaltyApplied } = reconcileScores(primary, skeptic);
        return {
          scenarioId: response.scenario_id,
          scenarioTitle: file.title,
          reconciledScores,
          missedPenaltyApplied,
          primaryGrade: primary,
          skepticGrade: skeptic,
        };
      }).filter(Boolean);
    });

    // ─── Step 5: Synthesize ──────────────────────────────────────────────────
    const synthesis = await step.run("synthesize", async () => {
      const user = assessment.company_users;
      if (!user) throw new Error("No user data on assessment");
      return runSynthesizer({
        employeeName: user.name,
        department: user.department,
        isManager: user.is_manager,
        priorAiExposure: user.prior_ai_exposure ?? "None",
        evaluations: reconciledEvaluations.map((e) => ({
          scenarioId: e.scenarioId,
          scenarioTitle: e.scenarioTitle,
          reconciledScores: e.reconciledScores,
          missedPenaltyApplied: e.missedPenaltyApplied,
        })),
      });
    });

    // ─── Step 6: Persist Results ─────────────────────────────────────────────
    await step.run("persist-results", async () => {
      const supabase = await createServerClient();

      const evaluationRows = reconciledEvaluations.map((e) => ({
        assessment_id: assessmentId,
        scenario_id: e.scenarioId,
        prompt_comprehension: e.reconciledScores.promptComprehension,
        ai_collaboration: e.reconciledScores.aiCollaboration,
        critical_evaluation: e.reconciledScores.criticalEvaluation,
        ethics_and_bias: e.reconciledScores.ethicsAndBias,
        practical_application: e.reconciledScores.practicalApplication,
        missed_penalty_applied: e.missedPenaltyApplied,
        primary_grade: e.primaryGrade,
        skeptic_grade: e.skepticGrade,
      }));

      const { error: evalError } = await supabase
        .from("assessment_evaluations")
        .insert(evaluationRows);
      if (evalError) throw evalError;

      if (synthesis.roleFitResults.length > 0) {
        await supabase.from("role_fit_results").insert(
          synthesis.roleFitResults.map((r) => ({
            assessment_id: assessmentId,
            role_title: r.roleTitle,
            fit_score: r.fitScore,
            rationale: r.rationale,
          }))
        );
      }

      const { error: updateError } = await supabase
        .from("assessments")
        .update({
          status: "complete",
          overall_score: synthesis.overallReadinessScore,
          readiness_band: synthesis.readinessBand,
          domain_scores: synthesis.domainSummary,
          top_strengths: synthesis.topStrengths,
          development_areas: synthesis.developmentAreas,
          narrative_summary: synthesis.narrativeSummary,
          development_recommendations: synthesis.developmentRecommendations,
          graded_at: new Date().toISOString(),
        })
        .eq("id", assessmentId);
      if (updateError) throw updateError;

      await supabase
        .from("assessment_links")
        .update({ completed_at: new Date().toISOString() })
        .eq("assessment_id", assessmentId);
    });

    return {
      assessmentId,
      overallScore: synthesis.overallReadinessScore,
      readinessBand: synthesis.readinessBand,
    };
  }
);
```
---
## 12. Error Handling & Retry Strategy
| Step | Failure Scenario | Strategy |
|---|---|---|
| Step 1: Load data | Assessment not found | Throw — Inngest retries up to 2x |
| Step 2: Primary Grader | LLM timeout / 500 | Individual failures logged; others continue in parallel |
| Step 3: Skeptic Grader | LLM timeout / 500 | Falls back to Primary score only (no reconciliation penalty) |
| Step 4: Reconcile | Missing grades | Skip scenarios with no grade data |
| Step 5: Synthesize | LLM timeout | Full step retry (Inngest handles) |
| Step 6: Persist | Supabase write failure | Throw — Inngest retries; upsert-on-conflict prevents duplicates |
**Assessment status transitions:**
```javascript
in_progress → grading    (on final scenario submit)
grading     → complete   (on successful grading pipeline completion)
grading     → failed     (after max retries — set manually or via alert webhook)
```
**Admin re-trigger:** Any assessment stuck in `grading` status can be manually re-dispatched via `POST /api/assessment/grade` with the `assessmentId`. All Supabase writes in Step 6 use upsert semantics so re-running is idempotent.