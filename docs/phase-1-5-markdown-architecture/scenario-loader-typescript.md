# Scenario Loader (TypeScript)

**Notion URL:** https://www.notion.so/31ed807b911181c7b821fc60ae73078c

---

Typed TypeScript module for reading structured markdown scenario files with YAML frontmatter. Provides filtering by archetype, difficulty, domains, and roles, and returns scenario content for injection into assessment prompts.
**Dependencies:** `gray-matter` (`npm install gray-matter`)
**Version:** 1.0.0 \| **Date:** 2026-03-09
---
```typescript
/**
 * AI Workforce Map — Scenario Loader
 *
 * Reads structured markdown scenario files with YAML frontmatter,
 * provides typed filtering by archetype, difficulty, domains, and roles,
 * and returns scenario content for injection into assessment prompts.
 *
 * Dependencies: gray-matter (npm install gray-matter)
 *
 * @version 1.0.0
 * @date 2026-03-09
 */

import matter from "gray-matter";
import * as fs from "fs";
import * as path from "path";

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/** The 12 scenario archetypes */
export type ScenarioArchetype =
  | "automation-boundary"
  | "instruction-rewrite"
  | "output-comparison"
  | "hidden-error-review"
  | "missing-context"
  | "workflow-handoff"
  | "escalation-judgment"
  | "stakeholder-pressure"
  | "exception-handling"
  | "adoption-communication"
  | "policy-adherence"
  | "drift-detection";

/** The 7 scoring domains */
export type DomainSlug =
  | "task-framing"
  | "process-thinking"
  | "verification-instinct"
  | "exception-handling"
  | "risk-judgment"
  | "operational-consistency"
  | "change-leverage";

/** The 5 AI-adjacent roles */
export type RoleSlug =
  | "ai-operator"
  | "ai-approver"
  | "workflow-translator"
  | "qa-risk-reviewer"
  | "change-champion";

/** Lifecycle status for content items */
export type ContentStatus = "draft" | "review" | "published" | "archived";

/** YAML frontmatter schema for scenario files */
export interface ScenarioFrontmatter {
  id: string;
  title: string;
  slug: string;
  version: string;

  // Classification
  archetype: ScenarioArchetype;
  module: number;
  difficulty: number;
  industry: string;

  // Assessment Targeting
  primary_domains: DomainSlug[];
  secondary_domains: DomainSlug[];
  target_roles: RoleSlug[];

  // Lifecycle
  status: ContentStatus;
  created_at: string;
  updated_at: string;
  variant_of: string | null;
}

/** Parsed body sections of a scenario */
export interface ScenarioBody {
  situation: string;
  challenge: string;
  task: string;
  followUpPressurePrompt: string;
  scoringRubric: string;
  idealResponseGuide: string;
  commonMistakes: string;
  redFlags: string;
  reliabilityModifierTriggers: string;
}

/** Full parsed scenario with frontmatter and body */
export interface Scenario {
  frontmatter: ScenarioFrontmatter;
  body: ScenarioBody;
  rawContent: string;
  filePath: string;
}

/** Filter options for querying scenarios */
export interface ScenarioFilter {
  archetypes?: ScenarioArchetype[];
  minDifficulty?: number;
  maxDifficulty?: number;
  difficulty?: number;
  module?: number;
  domains?: DomainSlug[];
  primaryDomains?: DomainSlug[];
  targetRoles?: RoleSlug[];
  status?: ContentStatus;
  industry?: string;
  baseOnly?: boolean;
  variantsOnly?: boolean;
  variantOf?: string;
}

/** Assessment prompt payload — the subset of scenario data sent to the LLM */
export interface AssessmentPrompt {
  scenarioId: string;
  title: string;
  situation: string;
  challenge: string;
  task: string;
  followUpPressurePrompt: string;
}

/** Grading context payload — the subset used by the grading pipeline */
export interface GradingContext {
  scenarioId: string;
  title: string;
  primaryDomains: DomainSlug[];
  secondaryDomains: DomainSlug[];
  scoringRubric: string;
  idealResponseGuide: string;
  commonMistakes: string;
  redFlags: string;
  reliabilityModifierTriggers: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const VALID_ARCHETYPES: Set = new Set([
  "automation-boundary", "instruction-rewrite", "output-comparison",
  "hidden-error-review", "missing-context", "workflow-handoff",
  "escalation-judgment", "stakeholder-pressure", "exception-handling",
  "adoption-communication", "policy-adherence", "drift-detection",
]);

const VALID_DOMAINS: Set = new Set([
  "task-framing", "process-thinking", "verification-instinct",
  "exception-handling", "risk-judgment", "operational-consistency",
  "change-leverage",
]);

const VALID_ROLES: Set = new Set([
  "ai-operator", "ai-approver", "workflow-translator",
  "qa-risk-reviewer", "change-champion",
]);

const SCN_ID_PATTERN = /^SCN-\d{3}$/;

// =============================================================================
// SECTION PARSER
// =============================================================================

function parseSections(markdown: string): Map {
  const sections = new Map();
  const lines = markdown.split("\n");
  let currentSection = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^## (.+)$/);
    if (headingMatch) {
      if (currentSection) {
        sections.set(currentSection, currentContent.join("\n").trim());
      }
      currentSection = headingMatch[1].trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  if (currentSection) {
    sections.set(currentSection, currentContent.join("\n").trim());
  }

  return sections;
}

function parseBody(markdown: string): ScenarioBody {
  const sections = parseSections(markdown);

  return {
    situation: sections.get("Situation") ?? "",
    challenge: sections.get("The Challenge") ?? "",
    task: sections.get("Your Task") ?? "",
    followUpPressurePrompt: sections.get("Follow-Up Pressure Prompt") ?? "",
    scoringRubric: sections.get("Scoring Rubric") ?? "",
    idealResponseGuide: sections.get("Ideal Response Guide") ?? "",
    commonMistakes: sections.get("Common Mistakes") ?? "",
    redFlags: sections.get("Red Flags") ?? "",
    reliabilityModifierTriggers: sections.get("Reliability Modifier Triggers") ?? "",
  };
}

// =============================================================================
// VALIDATION
// =============================================================================

export interface ValidationError {
  field: string;
  message: string;
  level: "error" | "warning";
}

export function validateFrontmatter(fm: ScenarioFrontmatter): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!SCN_ID_PATTERN.test(fm.id)) {
    errors.push({ field: "id", message: `Invalid ID format: ${fm.id}`, level: "error" });
  }
  if (!fm.title || fm.title.length === 0) {
    errors.push({ field: "title", message: "Title is required", level: "error" });
  }
  if (!fm.slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.slug)) {
    errors.push({ field: "slug", message: `Invalid slug format: ${fm.slug}`, level: "error" });
  }
  if (!VALID_ARCHETYPES.has(fm.archetype)) {
    errors.push({ field: "archetype", message: `Invalid archetype: ${fm.archetype}`, level: "error" });
  }
  if (fm.module  6) {
    errors.push({ field: "module", message: `Module must be 1-6, got ${fm.module}`, level: "error" });
  }
  if (fm.difficulty  5) {
    errors.push({ field: "difficulty", message: `Difficulty must be 1-5, got ${fm.difficulty}`, level: "error" });
  }
  if (!fm.primary_domains || fm.primary_domains.length === 0) {
    errors.push({ field: "primary_domains", message: "At least 1 primary domain required", level: "error" });
  }
  for (const d of fm.primary_domains ?? []) {
    if (!VALID_DOMAINS.has(d)) {
      errors.push({ field: "primary_domains", message: `Invalid domain: ${d}`, level: "error" });
    }
  }
  for (const d of fm.secondary_domains ?? []) {
    if (!VALID_DOMAINS.has(d)) {
      errors.push({ field: "secondary_domains", message: `Invalid domain: ${d}`, level: "error" });
    }
  }
  const primarySet = new Set(fm.primary_domains ?? []);
  for (const d of fm.secondary_domains ?? []) {
    if (primarySet.has(d)) {
      errors.push({ field: "secondary_domains", message: `Domain "${d}" appears in both primary and secondary`, level: "error" });
    }
  }
  for (const r of fm.target_roles ?? []) {
    if (!VALID_ROLES.has(r)) {
      errors.push({ field: "target_roles", message: `Invalid role: ${r}`, level: "error" });
    }
  }
  if (fm.variant_of !== null && fm.variant_of !== undefined && !SCN_ID_PATTERN.test(fm.variant_of)) {
    errors.push({ field: "variant_of", message: `Invalid variant_of format: ${fm.variant_of}`, level: "error" });
  }

  return errors;
}

// =============================================================================
// SCENARIO LOADER CLASS
// =============================================================================

export class ScenarioLoader {
  private contentDir: string;
  private scenarios: Map = new Map();
  private loaded = false;

  constructor(contentDir: string) {
    this.contentDir = contentDir;
  }

  async load(): Promise {
    this.scenarios.clear();

    const dirs = [
      path.join(this.contentDir, "scenarios", "base"),
      path.join(this.contentDir, "scenarios", "variants"),
    ];

    for (const dir of dirs) {
      if (!fs.existsSync(dir)) continue;

      const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

      for (const file of files) {
        const filePath = path.join(dir, file);
        const raw = fs.readFileSync(filePath, "utf-8");

        try {
          const { data, content } = matter(raw);
          const frontmatter = data as ScenarioFrontmatter;
          const body = parseBody(content);

          const scenario: Scenario = {
            frontmatter,
            body,
            rawContent: content,
            filePath,
          };

          this.scenarios.set(frontmatter.id, scenario);
        } catch (err) {
          console.error(`Failed to parse ${filePath}:`, err);
        }
      }
    }

    this.loaded = true;
    console.log(`Loaded ${this.scenarios.size} scenarios`);
  }

  private ensureLoaded(): void {
    if (!this.loaded) {
      throw new Error("ScenarioLoader.load() must be called before querying");
    }
  }

  getById(id: string): Scenario | undefined {
    this.ensureLoaded();
    return this.scenarios.get(id);
  }

  getAll(): Scenario[] {
    this.ensureLoaded();
    return Array.from(this.scenarios.values());
  }

  filter(options: ScenarioFilter): Scenario[] {
    this.ensureLoaded();

    let results = Array.from(this.scenarios.values());

    const statusFilter = options.status ?? "published";
    results = results.filter((s) => s.frontmatter.status === statusFilter);

    if (options.archetypes && options.archetypes.length > 0) {
      const archetypeSet = new Set(options.archetypes);
      results = results.filter((s) => archetypeSet.has(s.frontmatter.archetype));
    }

    if (options.difficulty !== undefined) {
      results = results.filter((s) => s.frontmatter.difficulty === options.difficulty);
    }
    if (options.minDifficulty !== undefined) {
      results = results.filter((s) => s.frontmatter.difficulty >= options.minDifficulty!);
    }
    if (options.maxDifficulty !== undefined) {
      results = results.filter((s) => s.frontmatter.difficulty  s.frontmatter.module === options.module);
    }

    if (options.domains && options.domains.length > 0) {
      const domainSet = new Set(options.domains);
      results = results.filter((s) => {
        const allDomains = [
          ...s.frontmatter.primary_domains,
          ...s.frontmatter.secondary_domains,
        ];
        return allDomains.some((d) => domainSet.has(d));
      });
    }

    if (options.primaryDomains && options.primaryDomains.length > 0) {
      const domainSet = new Set(options.primaryDomains);
      results = results.filter((s) =>
        s.frontmatter.primary_domains.some((d) => domainSet.has(d))
      );
    }

    if (options.targetRoles && options.targetRoles.length > 0) {
      const roleSet = new Set(options.targetRoles);
      results = results.filter((s) =>
        s.frontmatter.target_roles.some((r) => roleSet.has(r))
      );
    }

    if (options.industry) {
      const industryLower = options.industry.toLowerCase();
      results = results.filter(
        (s) => s.frontmatter.industry.toLowerCase() === industryLower
      );
    }

    if (options.baseOnly) {
      results = results.filter((s) => s.frontmatter.variant_of === null);
    }
    if (options.variantsOnly) {
      results = results.filter((s) => s.frontmatter.variant_of !== null);
    }
    if (options.variantOf) {
      results = results.filter((s) => s.frontmatter.variant_of === options.variantOf);
    }

    return results;
  }

  getAssessmentPrompt(scenarioId: string): AssessmentPrompt | null {
    const scenario = this.getById(scenarioId);
    if (!scenario) return null;

    return {
      scenarioId: scenario.frontmatter.id,
      title: scenario.frontmatter.title,
      situation: scenario.body.situation,
      challenge: scenario.body.challenge,
      task: scenario.body.task,
      followUpPressurePrompt: scenario.body.followUpPressurePrompt,
    };
  }

  getGradingContext(scenarioId: string): GradingContext | null {
    const scenario = this.getById(scenarioId);
    if (!scenario) return null;

    return {
      scenarioId: scenario.frontmatter.id,
      title: scenario.frontmatter.title,
      primaryDomains: scenario.frontmatter.primary_domains,
      secondaryDomains: scenario.frontmatter.secondary_domains,
      scoringRubric: scenario.body.scoringRubric,
      idealResponseGuide: scenario.body.idealResponseGuide,
      commonMistakes: scenario.body.commonMistakes,
      redFlags: scenario.body.redFlags,
      reliabilityModifierTriggers: scenario.body.reliabilityModifierTriggers,
    };
  }

  validateAll(): Map {
    this.ensureLoaded();
    const results = new Map();

    for (const [id, scenario] of this.scenarios) {
      const errors = validateFrontmatter(scenario.frontmatter);
      if (errors.length > 0) {
        results.set(id, errors);
      }
    }

    return results;
  }

  getCoverageStats(): {
    byArchetype: Record;
    byDomain: Record;
    byRole: Record;
    byModule: Record;
    byDifficulty: Record;
  } {
    this.ensureLoaded();

    const byArchetype: Record = {};
    const byDomain: Record = {};
    const byRole: Record = {};
    const byModule: Record = {};
    const byDifficulty: Record = {};

    for (const d of VALID_DOMAINS) {
      byDomain[d] = { primary: 0, secondary: 0, total: 0 };
    }

    for (const scenario of this.scenarios.values()) {
      const fm = scenario.frontmatter;

      byArchetype[fm.archetype] = (byArchetype[fm.archetype] || 0) + 1;

      for (const d of fm.primary_domains) {
        byDomain[d].primary++;
        byDomain[d].total++;
      }
      for (const d of fm.secondary_domains) {
        byDomain[d].secondary++;
        byDomain[d].total++;
      }

      for (const r of fm.target_roles) {
        byRole[r] = (byRole[r] || 0) + 1;
      }

      byModule[fm.module] = (byModule[fm.module] || 0) + 1;
      byDifficulty[fm.difficulty] = (byDifficulty[fm.difficulty] || 0) + 1;
    }

    return { byArchetype, byDomain, byRole, byModule, byDifficulty };
  }
}

// =============================================================================
// FACTORY / CONVENIENCE EXPORT
// =============================================================================

export async function createScenarioLoader(
  contentDir?: string
): Promise {
  const dir = contentDir ?? path.join(process.cwd(), "content");
  const loader = new ScenarioLoader(dir);
  await loader.load();
  return loader;
}

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

/*
async function main() {
  const loader = await createScenarioLoader("./content");

  // Get all published scenarios
  const all = loader.getAll();
  console.log(`Total scenarios: ${all.length}`);

  // Filter by archetype and difficulty
  const hardPressure = loader.filter({
    archetypes: ["stakeholder-pressure"],
    minDifficulty: 4,
  });
  console.log(`Hard stakeholder pressure scenarios: ${hardPressure.length}`);

  // Get scenarios that test risk-judgment for QA reviewers
  const qaRiskScenarios = loader.filter({
    primaryDomains: ["risk-judgment"],
    targetRoles: ["qa-risk-reviewer"],
  });
  console.log(`QA risk-judgment scenarios: ${qaRiskScenarios.length}`);

  // Get assessment prompt for a specific scenario
  const prompt = loader.getAssessmentPrompt("SCN-001");
  console.log(`Prompt for SCN-001:`, prompt?.title);

  // Get grading context
  const grading = loader.getGradingContext("SCN-001");
  console.log(`Grading domains:`, grading?.primaryDomains);

  // Validate all scenarios
  const errors = loader.validateAll();
  if (errors.size === 0) {
    console.log("All scenarios valid!");
  } else {
    for (const [id, errs] of errors) {
      console.log(`${id}: ${errs.length} errors`);
    }
  }

  // Coverage stats
  const stats = loader.getCoverageStats();
  console.log("Coverage by archetype:", stats.byArchetype);
  console.log("Coverage by domain:", stats.byDomain);
}

main().catch(console.error);
*/
```