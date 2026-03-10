import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export interface ScenarioFile {
  id: string;
  title: string;
  slug: string;
  archetype: string;
  module: number;
  difficulty: number;
  industry: string;
  primaryDomains: string[];
  secondaryDomains: string[];
  targetRoles: string[];
  situation: string;    // "## Situation" section
  challenge: string;    // "## The Challenge" section
  task: string;         // "## Your Task" section
  followUpPressure: string;  // "## Follow-Up Pressure Prompt" section
  rubric: string;       // "## Scoring Rubric" section (full text including sub-sections)
  idealResponse: string; // "## Ideal Response Guide" section
  commonMistakes: string; // "## Common Mistakes" section
  redFlags: string;     // "## Red Flags" section
  reliabilityTriggers: string; // "## Reliability Modifier Triggers" section
  timeLimitSeconds: number;
  content: string;      // Raw markdown body (without frontmatter)

  // Aliases for backward compatibility with grade-assessment.ts
  context: string;      // Alias for situation
  moduleLabel: string;  // Human-readable module label
}

// Scan both base/ and variants/ subdirectories
const SCENARIOS_BASE_DIR = path.join(process.cwd(), "src/content/scenarios/base");
const SCENARIOS_VARIANTS_DIR = path.join(process.cwd(), "src/content/scenarios/variants");

const MODULE_LABELS: Record<number, string> = {
  1: "Foundation",
  2: "Workflow Design",
  3: "Quality & Verification",
  4: "Risk & Judgment",
  5: "Adversarial / Pressure",
  6: "Leadership & Change",
};

/**
 * Normalize domain keys from hyphenated (frontmatter) to underscored (code).
 * e.g. "risk-judgment" → "risk_judgment", "process-thinking" → "process_thinking"
 */
function normalizeDomainKey(key: string): string {
  return key.replace(/-/g, "_");
}

/**
 * Find a scenario .md file by its ID (e.g. "SCN-001").
 * Searches base/ then variants/ directories for any file starting with the ID.
 */
async function findScenarioPath(scenarioId: string): Promise<string | null> {
  for (const dir of [SCENARIOS_BASE_DIR, SCENARIOS_VARIANTS_DIR]) {
    try {
      const files = await fs.readdir(dir);
      const match = files.find((f) => f.startsWith(scenarioId) && f.endsWith(".md"));
      if (match) return path.join(dir, match);
    } catch {
      // Directory may not exist
    }
  }
  return null;
}

export async function loadScenarioFile(scenarioId: string): Promise<ScenarioFile | null> {
  try {
    const filePath = await findScenarioPath(scenarioId);
    if (!filePath) return null;

    const raw = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(raw);

    const moduleNum = data.module ?? 1;

    return {
      id: data.id ?? scenarioId,
      title: data.title ?? "Untitled Scenario",
      slug: data.slug ?? "",
      archetype: data.archetype ?? "",
      module: moduleNum,
      difficulty: data.difficulty ?? 3,
      industry: data.industry ?? "",
      primaryDomains: (data.primary_domains ?? []).map(normalizeDomainKey),
      secondaryDomains: (data.secondary_domains ?? []).map(normalizeDomainKey),
      targetRoles: data.target_roles ?? [],
      situation: extractSection(content, "Situation"),
      challenge: extractSection(content, "The Challenge"),
      task: extractSection(content, "Your Task"),
      followUpPressure: extractSection(content, "Follow-Up Pressure Prompt"),
      rubric: extractSection(content, "Scoring Rubric"),
      idealResponse: extractSection(content, "Ideal Response Guide"),
      commonMistakes: extractSection(content, "Common Mistakes"),
      redFlags: extractSection(content, "Red Flags"),
      reliabilityTriggers: extractSection(content, "Reliability Modifier Triggers"),
      timeLimitSeconds: data.time_limit_seconds ?? 600,
      content,
      // Aliases
      context: extractSection(content, "Situation"),
      moduleLabel: MODULE_LABELS[moduleNum] ?? "General",
    };
  } catch {
    return null;
  }
}

export async function loadScenarioFiles(scenarioIds: string[]): Promise<ScenarioFile[]> {
  const results = await Promise.all(scenarioIds.map((id) => loadScenarioFile(id)));
  return results.filter(Boolean) as ScenarioFile[];
}

/**
 * List all available scenario IDs and metadata (for the Orchestrator).
 */
export async function listAvailableScenarios(): Promise<Array<{
  id: string;
  title: string;
  archetype: string;
  module: number;
  difficulty: number;
  industry: string;
  primaryDomains: string[];
  targetRoles: string[];
}>> {
  const scenarios: Array<any> = [];

  for (const dir of [SCENARIOS_BASE_DIR, SCENARIOS_VARIANTS_DIR]) {
    try {
      const files = await fs.readdir(dir);
      for (const file of files) {
        if (!file.endsWith(".md")) continue;
        const raw = await fs.readFile(path.join(dir, file), "utf-8");
        const { data } = matter(raw);
        if (data.status !== "published") continue;
        scenarios.push({
          id: data.id,
          title: data.title,
          archetype: data.archetype,
          module: data.module,
          difficulty: data.difficulty,
          industry: data.industry,
          primaryDomains: (data.primary_domains ?? []).map(normalizeDomainKey),
          targetRoles: data.target_roles ?? [],
        });
      }
    } catch {
      // Directory may not exist
    }
  }

  return scenarios;
}

/**
 * Extract a markdown section by its heading.
 * Captures everything from "## SectionName" until the next "## " or end of file.
 * For nested sections (like Scoring Rubric with ### subsections), captures all content.
 */
function extractSection(content: string, sectionName: string): string {
  // Escape special regex chars in section name
  const escaped = sectionName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `^##\\s+${escaped}\\s*\\n([\\s\\S]*?)(?=^##\\s+[^#]|$)`,
    "im"
  );
  const match = content.match(regex);
  return match ? match[1].trim() : "";
}
