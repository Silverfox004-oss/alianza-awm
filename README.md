# Alianza AWM — AI Workforce Map

Human capability assessment layer for AI adoption. Maps employees into 5 AI-adjacent workforce roles across 7 scoring domains using a multi-LLM grading pipeline.

## Repository Structure

```
├── codebase/          # Full Next.js application (src, configs, scenarios, SQL)
│   ├── src/           # Application source code
│   │   ├── app/       # Next.js 15 app router pages & API routes
│   │   ├── lib/       # Core logic (grading pipeline, scoring, Supabase client)
│   │   └── content/   # 24 scenario markdown files (base + variants)
│   ├── supabase/      # Database migrations & seed data
│   ├── package.json
│   └── README.md      # Detailed codebase documentation
│
├── docs/              # Notion documentation export (40 markdown files)
│   ├── 00-value-proposition.md
│   ├── 01-go-to-market-strategy.md
│   ├── 02-v1-product-specification.md
│   ├── phase-0-research/
│   ├── phase-1-scenario-engine/
│   ├── phase-1-5-markdown-architecture/
│   ├── phase-2-prompt-architecture/
│   ├── phase-3-application/
│   └── README.md      # Documentation index
```

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS
- **Backend**: Supabase (Postgres + Auth + RLS), Inngest (async job orchestration)
- **AI Pipeline**: Vercel AI SDK, 5 specialized grading agents
- **Deployment**: Vercel

## Remaining P0 Items (~2 hrs dev work)

1. Rename `responses` table → `assessment_responses` (or update TS references) — 30 min
2. Create `assessment_evaluations` table — 30 min
3. Add `/api/assessment/progress` route — 1 hr
4. Fix `assessment_links.code` vs `slug` column name — 15 min
5. Align `types/index.ts` with `scoring.ts` exports — 1-2 hrs

See `codebase/README.md` for full setup instructions.
