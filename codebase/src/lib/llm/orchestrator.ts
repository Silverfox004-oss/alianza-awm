import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { trackCost } from "./cost-tracker";
import { listAvailableScenarios } from "@/lib/utils/scenario-loader";

const OrchestratorOutputSchema = z.object({
  scenarioIds: z.array(z.string()).min(4).max(8)
    .describe("Ordered list of scenario IDs (e.g. SCN-001, SCN-013) to present to the employee"),
  rationale: z.string().describe("Why these scenarios were chosen — domain coverage, difficulty progression, role relevance"),
});

export type OrchestratorOutput = z.infer<typeof OrchestratorOutputSchema>;

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

export async function selectScenarios(input: OrchestratorInput): Promise<OrchestratorOutput> {
  // Load the actual scenario registry so the model selects from real IDs
  const availableScenarios = await listAvailableScenarios();

  const scenarioRegistry = availableScenarios.map((s) =>
    `${s.id} | "${s.title}" | Archetype: ${s.archetype} | Module: ${s.module} | Difficulty: ${s.difficulty} | Industry: ${s.industry} | Domains: ${s.primaryDomains.join(", ")} | Roles: ${s.targetRoles.join(", ")}`
  ).join("\n");

  const { object, usage } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: OrchestratorOutputSchema,
    system: `You are the Orchestrator for the AI Workforce Map assessment. Your job is to select 6-8 scenarios from the available registry that will best assess this employee's readiness for AI-adjacent roles.

SELECTION CRITERIA (in priority order):
1. DOMAIN COVERAGE — The selected set should cover all 7 scoring domains at least once as a primary domain. Gaps in coverage mean gaps in the assessment.
2. DIFFICULTY PROGRESSION — Start with difficulty 1-2 scenarios, build to 3-4, end with 4-5. Don't front-load hard scenarios.
3. ROLE RELEVANCE — Weight toward scenarios that discriminate for roles relevant to this employee's department and seniority.
4. ARCHETYPE DIVERSITY — Avoid selecting multiple scenarios from the same archetype (e.g., don't pick two automation-boundary scenarios).
5. INDUSTRY FIT — Prefer scenarios from industries close to the employee's department when available, but diversity matters more than perfect industry match.

IMPORTANT: You MUST only select IDs from the registry below. Do NOT invent IDs.`,

    prompt: `EMPLOYEE PROFILE:
- Department: ${input.intakeData.department}
- Years of Experience: ${input.intakeData.yearsExperience}
- People Manager: ${input.intakeData.isManager}
- AI Exposure: ${input.intakeData.priorAiExposure}
- Tools Used: ${input.intakeData.toolUsage.join(", ") || "None specified"}

AVAILABLE SCENARIO REGISTRY (${availableScenarios.length} scenarios):
${scenarioRegistry}

Select 6-8 scenarios that provide comprehensive domain coverage, appropriate difficulty progression, and role relevance for this employee profile. Return ONLY IDs from the registry above.`,
  });

  trackCost("orchestrator", usage);
  return object;
}
