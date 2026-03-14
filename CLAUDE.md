# CLAUDE.md — AI Workforce Map (AWM)

## What This Is

SaaS platform for assessing employee AI readiness. Employees complete scenario-based situational judgment tests (SJTs), a multi-LLM grading pipeline scores them across 7 domains, and employers view results through an analytics dashboard.

## Project Structure

```
alianza-awm/
├── codebase/              # Next.js 15 application
│   ├── src/
│   │   ├── app/           # App Router pages & API routes
│   │   ├── components/    # React components (assessment, dashboard, charts)
│   │   ├── lib/           # Core logic (LLM agents, scoring, Supabase, Inngest)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript types & Supabase database types
│   │   └── content/       # 24 scenario markdown files (base + variants)
│   ├── supabase/          # SQL migrations
│   └── package.json
├── docs/                  # Research & design documentation (40 files)
└── DEV-HANDOFF.md         # Production hardening notes
```

## Commands

All commands run from `codebase/` directory:

```bash
cd codebase
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript type checking (tsc --noEmit)
npm test             # Run tests (vitest)
```

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript, React 18)
- **Styling:** Tailwind CSS 3.4
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **Background Jobs:** Inngest (async grading pipeline)
- **LLM:** Vercel AI SDK → OpenAI GPT-4o / GPT-4o-mini
- **Charts:** Recharts + Nivo
- **Validation:** Zod
- **State:** Zustand

## Architecture

### Assessment Flow
1. Employee opens link → `/intake` → fills profile form
2. `POST /api/assessment/start` → Orchestrator LLM selects 6-8 scenarios
3. Employee answers scenarios → `POST /api/assessment/respond` (draft auto-save, follow-up chat via Examiner LLM)
4. Final scenario → triggers Inngest grading pipeline
5. `GET /api/assessment/progress?id=<uuid>` → poll for results

### Grading Pipeline (Inngest, async, ~2-5 min)
1. Load responses + scenario markdown files
2. **Primary Grader** (GPT-4o) × N scenarios in parallel → 7-domain scores (0-4)
3. **Skeptic Grader** (GPT-4o) × N scenarios in parallel → challenges inflation
4. **Reconcile** (deterministic) → gap 0-1 use primary, gap 2+ use min
5. **Synthesizer** (GPT-4o) → risk flags, training track, narrative
6. Persist to DB, assessment status → "complete"

### 5 LLM Agents
| Agent | Model | File |
|-------|-------|------|
| Orchestrator | gpt-4o-mini | `src/lib/llm/orchestrator.ts` |
| Examiner | gpt-4o-mini | `src/lib/llm/examiner.ts` |
| Primary Grader | gpt-4o | `src/lib/llm/primary-grader.ts` |
| Skeptic Grader | gpt-4o | `src/lib/llm/skeptic-grader.ts` |
| Synthesizer | gpt-4o | `src/lib/llm/synthesizer.ts` |

### 7 Scoring Domains
`task_framing`, `process_thinking`, `verification_instinct`, `exception_handling`, `risk_judgment`, `operational_consistency`, `change_leverage`

### 5 Workforce Roles
`ai_operator`, `ai_approver`, `workflow_translator`, `ai_qa_reviewer`, `change_champion`

## Key Design Decisions

- **Scenarios are files, not DB records.** The 24 `.md` files in `src/content/scenarios/` are the source of truth. `scenario-loader.ts` parses them at runtime.
- **Domain keys are underscored in code, hyphenated in frontmatter.** `scenario-loader.ts` normalizes on load.
- **Grading uses admin client (service role).** Inngest functions run outside HTTP request lifecycle — `createAdminClient()` bypasses RLS.
- **Score computation is deterministic.** `scoring.ts` computes numeric scores. The LLM only produces qualitative output (risk flags, training track, narrative).
- **Scores use 0-4 raw scale internally, 0-100 normalized for display.** Reconciliation works on raw 0-4 scores.

## Database

Tables: `companies`, `company_users`, `assessment_links`, `assessments`, `assessment_responses`, `assessment_evaluations`, `role_fit_results`, `scenarios`, `rubrics`, `roles`

All tables have RLS enabled. Helper functions: `get_user_company_id()`, `is_company_admin()`.

Migrations: Run `supabase/migration.sql` first, then `supabase/migration-v2.sql`.

## Environment Variables

Required in `.env.local` (see `.env.local.example`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `INNGEST_EVENT_KEY`
- `INNGEST_SIGNING_KEY`
- `NEXT_PUBLIC_APP_URL`

## Code Conventions

- Server Supabase client: `createServerSupabaseClient` (async, uses cookies)
- Admin Supabase client: `createAdminClient` (service role, bypasses RLS)
- Browser Supabase client: `createClient` from `@/lib/supabase/client`
- API routes return `NextResponse.json()` with appropriate status codes
- Types defined in `src/types/index.ts`, database types in `src/types/database.ts`
- Scoring types/constants in `src/lib/utils/scoring.ts`
