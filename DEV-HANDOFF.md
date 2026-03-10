# AI Workforce Map — Dev Handoff: Production Hardening

**Date:** March 10, 2026
**Repo:** `Silverfox004-oss/alianza-awm` (private)
**Branch:** `main`

---

## What Just Changed (This Commit)

10 files were modified or created to fix critical mismatches between the DB schema, TypeScript types, and runtime code. The codebase was ~89% complete; this commit fixes the structural issues that would have caused runtime failures.

---

## Step 1: Run the V2 Migration

**File:** `codebase/supabase/migration-v2.sql`

Open the Supabase SQL Editor (Dashboard → SQL Editor) and paste the entire contents of `migration-v2.sql`. It is idempotent — safe to run multiple times.

**What it does:**
1. Creates `assessment_responses` table (the code writes here, not the old `responses` table)
2. Creates `assessment_evaluations` with the correct 7-domain columns (task_framing, process_thinking, verification_instinct, exception_handling, risk_judgment, operational_consistency, change_leverage)
3. Adds 17 new columns to `assessments` (overall_score, readiness_band, domain_scores, role_scores, recommended_role, role_ranking, risk_flags, training_track, deployment_recommendation, upskill_recommendations, executive_summary, graded_at, company_user_id, link_id, selected_scenario_ids, paused_at, elapsed_seconds)
4. Drops and recreates `role_fit_results` with the correct shape (assessment_id, role_key, fit_score, rank, is_recommended)
5. Updates the 5 role seed records from old 5-domain weights to correct 7-domain weights
6. Makes `company_users.user_id` nullable (supports anonymous link-based assessments)
7. Adds 'employee' to the `company_users.role` enum
8. Standardizes `assessments.status` enum to: not_started, in_progress, paused, grading, complete, failed
9. Adds RLS policies and indexes for the new tables

---

## Step 2: Set Environment Variables

The app needs these in `.env.local` (see `.env.local.example`):

```
NEXT_PUBLIC_SUPABASE_URL=https://rpqxsvqxwhzymnujmyun.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
OPENAI_API_KEY=<your-openai-key>
INNGEST_EVENT_KEY=<your-inngest-key>
INNGEST_SIGNING_KEY=<your-inngest-signing-key>
```

---

## Step 3: Run First `npm install` and Type Check

```bash
cd codebase
npm install
npm run typecheck
```

Fix any remaining type errors. The main ones to watch for:
- The `Database` type in `database.ts` is hand-maintained. If you regenerate with `npx supabase gen types`, it will overwrite. The hand-maintained version is correct post-migration-v2.

---

## Architecture Overview (What Runs Where)

### Assessment Flow (Employee Side)
1. **Employee opens link** → `/assess/[slug]` → loads intake form
2. **Submits intake** → `POST /api/assessment/start`
   - Validates link slug, creates company_user record, calls LLM Orchestrator to select 6-8 scenarios, creates assessment record
3. **Answers scenarios** → `POST /api/assessment/respond`
   - Draft auto-saves every 30s (`isDraft: true`)
   - Follow-up chat streams through examiner (`messages` array)
   - Final submit marks response as submitted (`submitted_at` set)
4. **Last scenario submitted** → `isFinal: true` triggers:
   - Assessment status → "grading"
   - Inngest event dispatched → `assessment/grade.requested`
5. **Grading pipeline** (Inngest, async, ~2-5 min):
   - Load responses + scenario markdown files
   - Primary Grader (GPT-4o) × N scenarios in parallel
   - Skeptic Grader (GPT-4o) × N scenarios in parallel
   - Reconcile scores (deterministic)
   - Synthesizer (GPT-4o): risk flags, training track, narrative
   - Persist to DB, update assessment status → "complete"
6. **Poll results** → `GET /api/assessment/progress?id=<uuid>`

### Key Design Decisions
- **Scenarios are files, not DB records.** The 24 `.md` files in `src/content/scenarios/` are the source of truth. `scenario-loader.ts` parses them at runtime. The `scenarios` table in the DB exists for optional metadata but is NOT used by the grading pipeline.
- **Domain keys are underscored in code, hyphenated in frontmatter.** `scenario-loader.ts` normalizes on load (`risk-judgment` → `risk_judgment`).
- **Grading uses admin client (service role).** Inngest functions run outside the HTTP request lifecycle — no cookies, no user session. `grade-assessment.ts` uses `createAdminClient()` which bypasses RLS.
- **Score computation is deterministic.** `scoring.ts` and `synthesizer.ts` compute all numeric scores (domain averages, overall score, readiness band, role-fit scores) deterministically. The LLM only produces qualitative output (risk flags, training track, narrative).

---

## Files Changed in This Commit

| File | Change |
|------|--------|
| `supabase/migration-v2.sql` | **NEW** — Incremental migration (run after migration.sql) |
| `src/app/api/assessment/progress/route.ts` | **NEW** — GET route for polling status/results |
| `src/app/api/assessment/start/route.ts` | Fixed: `.eq("slug", linkSlug)`, `user_id: null`, insert not upsert |
| `src/app/api/assessment/respond/route.ts` | Fixed: uses `loadScenarioFile` + `runExaminer` (not DB query + inline streamText) |
| `src/app/api/assessment/grade/route.ts` | Fixed: status check matches standardized enum |
| `src/lib/inngest/functions/grade-assessment.ts` | Fixed: `createAdminClient()`, FK-hinted joins |
| `src/lib/utils/scenario-loader.ts` | Fixed: `normalizeDomainKey()` converts hyphens → underscores |
| `src/lib/schemas/intake.ts` | Fixed: `linkCode` → `linkSlug` |
| `src/types/database.ts` | Rewritten: matches actual post-v2 schema |
| `src/types/index.ts` | Updated: enums, interfaces, new AssessmentEvaluation type |

---

## Remaining Work to First End-to-End Assessment

### Must Do (Blocking)

1. **Deploy Inngest** — Register the `grade-assessment` function with Inngest Cloud or run `inngest dev` locally. The `/api/inngest` route is already wired up.
2. **Create a test company + assessment link** — No admin UI yet. Insert directly:
   ```sql
   -- Create a test company
   INSERT INTO companies (name, slug, departments) VALUES ('Test Corp', 'test-corp', ARRAY['Engineering','Marketing']);
   
   -- Create an admin user (after signing up via Supabase Auth)
   INSERT INTO company_users (company_id, user_id, role, name) VALUES ('<company-uuid>', '<your-auth-user-id>', 'admin', 'Admin User');
   
   -- Create an assessment link
   INSERT INTO assessment_links (company_id, slug, created_by) VALUES ('<company-uuid>', 'test-link-001', '<your-auth-user-id>');
   ```
3. **Build the assessment UI components** — The page files exist (`src/app/(employee)/assessment/page.tsx`, `intake/page.tsx`, etc.) but their component implementations need to be wired to the API routes. The components in `src/components/assessment/` have the right structure but may need props/state aligned with the actual API response shapes.

### Nice to Have (Non-Blocking)

4. **Cost tracking to DB** — `cost-tracker.ts` currently logs to console. Extend `persistCost()` to insert into an `llm_cost_logs` table if you want LLM spend dashboards.
5. **Generate real Supabase types** — Run `npx supabase gen types typescript --project-id rpqxsvqxwhzymnujmyun > src/types/database.ts` after migration-v2 for auto-generated types. The current hand-maintained version works but may drift.

---

## The 5 LLM Agents

| Agent | Model | Role | File |
|-------|-------|------|------|
| Orchestrator | gpt-4o-mini | Selects 6-8 scenarios for employee | `src/lib/llm/orchestrator.ts` |
| Examiner | gpt-4o-mini | Follow-up probing questions during assessment | `src/lib/llm/examiner.ts` |
| Primary Grader | gpt-4o | Scores all 7 domains (0-4) with evidence | `src/lib/llm/primary-grader.ts` |
| Skeptic Grader | gpt-4o | Challenges Primary's scores, catches inflation | `src/lib/llm/skeptic-grader.ts` |
| Synthesizer | gpt-4o | Risk flags, training track, narrative | `src/lib/llm/synthesizer.ts` |

---

## The 7 Scoring Domains

| Key | Label | What It Measures |
|-----|-------|-----------------|
| `task_framing` | Task Framing | Translating goals into structured instructions |
| `process_thinking` | Process Thinking | Breaking work into steps, dependencies, handoffs |
| `verification_instinct` | Verification Instinct | Checking, comparing, validating outputs |
| `exception_handling` | Exception Handling | Catching, triaging, escalating errors |
| `risk_judgment` | Risk Judgment | Safe vs. risky automation decisions |
| `operational_consistency` | Operational Consistency | Following rules, documenting, repeatable ops |
| `change_leverage` | Change Leverage | Helping others adopt AI, communication |

---

## The 5 Workforce Roles

| Key | Label | Top Weighted Domains |
|-----|-------|---------------------|
| `ai_operator` | AI Operator | task_framing, verification_instinct, operational_consistency |
| `ai_approver` | AI Approver | verification_instinct, risk_judgment |
| `workflow_translator` | Workflow Translator | task_framing, process_thinking |
| `ai_qa_reviewer` | AI QA Reviewer | verification_instinct, risk_judgment, exception_handling |
| `change_champion` | Change Champion | change_leverage (50% weight) |
