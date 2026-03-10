# Engineering Notes — Dev Handoff

**Notion URL:** https://www.notion.so/31ed807b911181efb456f9eda13997ec  
**Parent:** AI Workforce Map

---

## Purpose
This page serves as the single source of truth for all engineering decisions, technical notes, and implementation guidance for the developer building the AI Workforce Map V1 application.

Every decision made during Phases 0-2 (research, design, prompt architecture) that has implications for the application build is documented here with explicit instructions.

---

## Quick Reference
- **Supabase Project:** superheros (ID: rpqxsvqxwhzymnujmyun)
- **Asana Project:** AI Workforce Map — V1 Build (GID: 1213567705537609)
- **Wireframe:** https://www.perplexity.ai/computer/a/ai-workforce-map-wireframe-pro-Hcd_Zj4qT.6RysgGSm9ybw
- **Notion Parent Page:** AI Workforce Map

---

## Build Log

### 2026-03-09 — Project Kickoff
- Notion pages created: Value Proposition, Go-To-Market Strategy, V1 Product Specification
- Asana project created with 51 tasks across 5 phases (0-4) + Phase 1.5 (Markdown Architecture)
- Interactive wireframe deployed with 8 screens
- Supabase project connected (superheros / rpqxsvqxwhzymnujmyun)
- Structured Markdown Architecture added to V1 spec (scenarios stored as .md files with YAML frontmatter)
- Anthropic thesis integrated into Value Prop (structured workflows > unsupervised agents)

---

## Architecture Decisions

### Decision 1: Structured Markdown Content Architecture (Phase 1.5)
**Decision:** All assessment content (scenarios, rubrics, roles) lives as structured Markdown files with YAML frontmatter. A Supabase database indexes the metadata for machine queries.

**Why:** Anthropic has validated that structured markdown is superior to broad "unsupervised" agent deployments. Markdown files are human-readable, git-diffable, and trivially editable. The database provides fast filtering for the assessment engine.

**Key files for the developer:**
- `content/scenario_template.md` — The schema every scenario file must follow
- `content/validation_rules.md` — All constraints for content files
- `content/scenario_loader.ts` — TypeScript module that reads and filters scenarios
- `supabase_schema.sql` — Paste into Supabase SQL Editor to create all 7 tables
- `supabase_seed.sql` — Paste second to populate scenarios, rubrics, and roles

**Directory structure:**
- `content/scenarios/base/` — 12 base scenarios (SCN-001 to SCN-012)
- `content/scenarios/variants/` — 12 variants (SCN-013 to SCN-024)
- `content/rubrics/` — 7 domain rubric files
- `content/roles/` — 5 role files with domain_weights

**YAML frontmatter fields (scenarios):** id, title, slug, version, archetype, module, difficulty, industry, primary_domains[], secondary_domains[], target_roles[], status, variant_of

**Database tables:** scenarios, rubrics, roles, assessments, responses, evaluations, role_fit_results

---

## Database Schema
**Status: DEPLOYED** — SQL executed in Supabase on 2026-03-09.
- Schema + Seed SQL both executed successfully
- 7 tables created, 24 scenarios + 7 rubrics + 5 roles seeded (all status='published')
- RLS enabled, JWT-based read policies active
- Assessment pipeline tables empty — populated at runtime
- `updated_at` triggers installed on mutable tables

**To set up the database:**
1. Go to the Supabase SQL Editor for project `superheros` (rpqxsvqxwhzymnujmyun)
2. Paste and run `supabase_schema.sql` — creates 7 tables, 6 enum types, indexes, RLS policies
3. Paste and run `supabase_seed.sql` — inserts metadata for all 24 scenarios, 7 rubrics, 5 roles

**Tables:**

| Table | Purpose |
|-------|---------|
| scenarios | Metadata index for 24 scenario .md files |
| rubrics | Metadata index for 7 domain rubric files |
| roles | Metadata index for 5 role files |
| assessments | Employee assessment sessions |
| responses | Individual scenario responses within an assessment |
| evaluations | Per-domain grading results per response |
| role_fit_results | Computed role-fit scores per assessment |

---

## Prompt Specifications
All 5 system prompts are complete. Full specifications with input/output schemas are in Notion under Phase 2 — Prompt Architecture.

| Prompt | Model (update to most capable) | Temp | Purpose | Notion Link |
|--------|-------------------------------|------|---------|-------------|
| Orchestrator | GPT-4o-mini / Gemini Flash | 0.0 | State machine, flow control, scenario selection | https://www.notion.so/31ed807b911181c8bbe1e8fbad1adfb2 |
| Examiner | GPT-4o-mini / Claude Haiku | 0.4 | Scenario presentation, follow-up questions | https://www.notion.so/31ed807b9111817ea0b6db255759a8da |
| Primary Grader | GPT-4o / Claude 3.5 Sonnet | 0.0 | Rubric-based scoring, evidence extraction | https://www.notion.so/31ed807b9111817fa4bac16d8cf1794b |
| Skeptic Grader | GPT-4o / Claude 3.5 Sonnet | 0.1 | Adversarial audit, inflation catching | https://www.notion.so/31ed807b911181fd9d70d5ec5d3d6873 |
| Synthesizer | GPT-4o / Claude 3.5 Sonnet | 0.3 | Report generation, role-fit calculation | https://www.notion.so/31ed807b911181ecb18be9ae769ba264 |

**Key architecture decisions:**
- 0-4 integer scale (validated by 2026 research as optimal for human-LLM alignment)
- Chain-of-thought reasoning required before all scores
- Structured JSON output via provider schema enforcement
- Atomic per-domain evaluation (sequential, not holistic)
- Skeptic audits Primary (does not re-grade)
- Employee responses sanitized via delimiters
- Estimated cost: ~$0.42 per 6-scenario assessment
- Reconciliation logic: within-1-point = use Primary; 2+ gap = use lower; missed penalty = apply Skeptic adjustment

---

## Tech Stack Decision (Phase 3 Research)
**Decision Date:** 2026-03-09  
**Full Analysis:** Phase 3 Research — Tech Stack Recommendation (https://www.notion.so/31ed807b9111817e939df34d1843c71d)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| UI | shadcn/ui + Tailwind CSS |
| Charts | Recharts (radar, bar, area) + Nivo (heatmap) |
| Database | Supabase PostgreSQL (already deployed) |
| Auth | Supabase Auth (50K free MAUs, native RLS) |
| Backend | Next.js API Routes + Supabase Edge Functions |
| LLM SDK | Vercel AI SDK (@ai-sdk) |
| Background Jobs | Inngest (event-driven grading pipeline) |
| Hosting | Vercel Pro ($20/mo) |
| State | React Context + Zustand |
| PDF | @react-pdf/renderer |

**Cost estimate:** ~$87/mo at 100 assessments, ~$275-305/mo at 500, ~$515-590/mo at 1,000.

**Key architecture decisions:**
1. Server Components for dashboard, Client Components for assessment UI
2. Streaming only for Examiner follow-ups (not grading)
3. Inngest handles all grading (never in Vercel API routes)
4. Supabase RLS enforces multi-tenancy (no manual company_id filtering)
5. Content .md files live in /content directory, cross-referenced with Supabase metadata
6. Type-safe throughout with auto-generated Supabase types

---

## API Endpoints

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/assessment/start` | POST | Orchestrator creates session, selects scenarios |
| `/api/assessment/respond` | POST | Processes response, triggers Examiner follow-ups (streaming) |
| `/api/assessment/grade` | POST | Dispatches grading pipeline to Inngest |
| `/api/dashboard/overview` | GET | KPI cards + chart data for employer dashboard |
| `/api/dashboard/ranking` | GET | Employee ranking table data |
| `/api/admin/setup` | POST | Company creation + admin profile |
| `/api/admin/invite` | POST | Generate assessment links |
| `/api/inngest` | GET/POST/PUT | Inngest webhook handler |

---

## Environment Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) | Supabase Dashboard > Settings > API |
| `OPENAI_API_KEY` | OpenAI API key | platform.openai.com |
| `ANTHROPIC_API_KEY` | Anthropic API key | console.anthropic.com |
| `INNGEST_EVENT_KEY` | Inngest event key | app.inngest.com |
| `INNGEST_SIGNING_KEY` | Inngest signing key | app.inngest.com |
| `NEXT_PUBLIC_APP_URL` | App base URL | Set manually |

---

## Phase 3 Implementation Specs
All screens have detailed Notion pages with production-ready code:

| Screen | Notion Page |
|--------|------------|
| Tech Stack Research | https://www.notion.so/31ed807b9111817e939df34d1843c71d |
| Project Scaffold | https://www.notion.so/31ed807b91118103aef9ed662c0182b7 |
| Screen 1: Employee Intake | https://www.notion.so/31ed807b9111811ab145cd8135865e83 |
| Screen 2: Assessment Engine | https://www.notion.so/31ed807b91118158a871fc3187491e4c |
| Grading Pipeline | https://www.notion.so/31ed807b91118100b2b3d01041f208af |
| Screen 3: Employee Results | https://www.notion.so/31ed807b911181669350e07fb32ebc0e |
| Screens 4-8: Employer Dashboard | https://www.notion.so/31ed807b91118146b279c573323ab1cb |
| Company Admin Setup | https://www.notion.so/31ed807b91118194939dd583e5015245 |

---

## Dev Instructions
Full setup guide with all code: Phase 3 — Project Scaffold (https://www.notion.so/31ed807b91118103aef9ed662c0182b7)

**Quick start:**
1. Clone repo, run `pnpm install`
2. Copy `.env.local.example` to `.env.local` and fill in keys
3. Run migration SQL in Supabase SQL Editor (multi-tenancy tables)
4. Generate types: `npx supabase gen types typescript --project-id rpqxsvqxwhzymnujmyun > src/types/database.ts`
5. Start dev server: `pnpm dev`
6. Start Inngest dev: `npx inngest-cli@latest dev`
7. Deploy: `vercel --prod`
