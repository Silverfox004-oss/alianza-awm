# Phase 3 Research — Tech Stack Recommendation

**Notion URL:** https://www.notion.so/31ed807b9111817e939df34d1843c71d

---

# Recommended V1 Tech Stack
Researched 2026-03-09. This document recommends the optimal tech stack for the AI Workforce Map V1 assessment SaaS, with rationale and cost estimates for each layer.
---
## Summary: Recommended Stack
| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | Industry standard for SaaS, SSR + client hybrid, excellent Vercel AI SDK integration |
| **UI Library** | shadcn/ui + Tailwind CSS | Copy-paste components, fully customizable, no vendor lock-in |
| **Charts** | Recharts (via shadcn/ui charts) | Built-in radar charts for domain scores, bar/area charts for dashboard, native shadcn integration |
| **Heatmap** | Nivo (@nivo/heatmap) | Best React heatmap component for role-fit matrix (Screen 6) |
| **Database** | Supabase (PostgreSQL) | Already deployed with schema + seed data, RLS for multi-tenancy |
| **Auth** | Supabase Auth | Already included with Supabase, 50K free MAUs, native RLS integration, cost-effective at scale |
| **Backend/API** | Next.js API Routes + Supabase Edge Functions | API routes for LLM orchestration, Edge Functions for lightweight DB operations |
| **LLM Integration** | Vercel AI SDK (@ai-sdk) | Unified streaming interface for OpenAI/Anthropic/Google, built-in retry/error handling |
| **Background Jobs** | Inngest | Event-driven grading pipeline, step-based retries, free tier covers MVP, real-time progress updates |
| **Hosting** | Vercel (Pro plan) | Native Next.js deployment, edge network, preview deployments, \$20/mo base |
| **State Management** | React Context + Zustand | Lightweight, no boilerplate, perfect for assessment session state |
| **PDF Generation** | @react-pdf/renderer | Generate employee result PDFs from React components |
---
## Detailed Analysis
### Frontend Framework: Next.js 15 (App Router)
**Why Next.js over alternatives:**
- App Router provides React Server Components — reduces client bundle size for dashboard views
- Server Actions simplify form handling (intake screen, admin setup)
- Built-in API routes eliminate need for separate backend server
- Middleware for auth checks at edge (sub-50ms)
- Largest ecosystem of SaaS boilerplates and component libraries
- Developer's existing Supabase project integrates natively via @supabase/ssr
**Rejected alternatives:**
- Plain React (CRA/Vite): No SSR, no API routes, would need separate backend
- Remix: Smaller ecosystem, fewer SaaS templates, less LLM tooling
- SvelteKit: Excellent but smaller hiring pool, fewer component libraries
### UI: shadcn/ui + Tailwind CSS
**Why shadcn/ui:**
- Not a dependency — components are copied into your project (no version lock)
- Pre-built form components (Input, Select, Slider, Checkbox, RadioGroup) map directly to intake screen
- Table component with sorting/filtering for employee ranking (Screen 5)
- Card component for KPI cards (Screen 4)
- Dialog/Sheet for drill-down views
- Dark/light mode built in
- shadcn/ui Charts wraps Recharts with consistent theming
### Charts: Recharts + Nivo
**Recharts (via shadcn/ui):**
- RadarChart component maps directly to 7-domain spider chart on employee results (Screen 3)
- BarChart for readiness distribution (Screen 4)
- AreaChart for trends
- Native shadcn/ui integration with ChartTooltip, ChartLegend components
- Copy-paste examples at [ui.shadcn.com/charts/radar](http://ui.shadcn.com/charts/radar)
**Nivo (@nivo/heatmap):**
- Purpose-built heatmap for role-fit matrix (Screen 6: employees x 5 roles)
- Color intensity = fit score
- Interactive hover/click for drill-down
- Note: Nivo may require --legacy-peer-deps flag for latest React
### Database: Supabase (PostgreSQL)
**Already deployed** — 7 tables, 24 scenarios, 7 rubrics, 5 roles seeded.
**Multi-tenancy approach: Column-based tenancy**
- Add `company_id` column to employee-facing tables (assessments, responses, evaluations, role_fit_results)
- RLS policies use `auth.uid()` to restrict data to user's company
- Helper functions: `get_user_company_id()`, `is_company_admin(company_id)`
- This is the most common pattern for SaaS on Supabase and works well up to thousands of tenants
**Additional tables needed for V1:**
- `companies` — company profiles (name, departments, risk_sensitivity, goals)
- `company_users` — maps auth users to companies with roles (admin, employee)
- `assessment_links` — shareable links for employee intake
### Auth: Supabase Auth
**Why Supabase Auth over Clerk:**
- Already bundled with our Supabase project (no additional service)
- 50,000 free MAUs vs Clerk's 10,000
- Native RLS integration — auth.uid() works directly in policies
- Cost at scale: \$0.00325/MAU after 100K vs Clerk's \$0.02/MAU
- Email/password + magic link sufficient for V1
- No additional vendor dependency
**Trade-offs accepted:**
- No pre-built UI components (we build sign-in/sign-up forms with shadcn/ui)
- No built-in organization management (we build lightweight company switching)
- These are acceptable since our auth flow is simple: admin creates company → generates assessment links → employees authenticate via link
**Auth flow for V1:**
1. Company Admin: Email + password signup → creates company → gets dashboard
2. Employee: Clicks assessment link → enters email → magic link auth → starts assessment
3. RLS ensures employees see only their own data, admins see company-wide data
### Backend: Next.js API Routes + Supabase Edge Functions
**Next.js API Routes (primary):**
- `/api/assessment/start` — Orchestrator creates session, selects scenarios
- `/api/assessment/respond` — Processes employee response, triggers Examiner for follow-ups
- `/api/assessment/grade` — Triggers grading pipeline via Inngest
- `/api/dashboard/*` — Dashboard data queries
- `/api/admin/*` — Company setup, user management
**Supabase Edge Functions (auxiliary):**
- Lightweight operations that benefit from being close to DB
- Webhook receivers, scheduled cleanup
**Why not a separate backend (Express/FastAPI):**
- Additional deployment target to manage
- Next.js API routes handle everything V1 needs
- Vercel handles scaling automatically
- Can extract to standalone backend later if needed
### LLM Integration: Vercel AI SDK
**Why Vercel AI SDK:**
- Unified interface: switch between OpenAI, Anthropic, Google with one line
- Built-in streaming for Examiner responses (follow-up questions feel real-time)
- `streamText()` and `generateObject()` for structured JSON output (graders)
- Automatic retries and error handling
- `useChat()` React hook for assessment conversation UI
- Provider-agnostic — can test GPT-4o vs Claude 3.5 Sonnet without code changes
**LLM cost per assessment (\~\$0.42 estimated):**
- Orchestrator (GPT-4o-mini): \~\$0.01 per session
- Examiner (GPT-4o-mini): \~\$0.05 (6-8 scenarios with follow-ups)
- Primary Grader (GPT-4o): \~\$0.15 (6-8 evaluations)
- Skeptic Grader (GPT-4o): \~\$0.12 (6-8 audits)
- Synthesizer (GPT-4o): \~\$0.09 (final report)
### Background Jobs: Inngest
**Why Inngest for the grading pipeline:**
- Event-driven: `assessment.completed` event triggers grading workflow
- Step functions with automatic retries per step (critical for LLM API reliability)
- Built-in logging and observability for debugging grading issues
- Real-time updates to UI ("Grading in progress... Step 3 of 5")
- Free tier: 1,000 function runs/month (covers \~125 assessments)
- Paid: \$20/month for 10,000 runs
**Grading pipeline as Inngest function:**
```javascript
assessment.completed → 
  Step 1: Load all responses
  Step 2: For each response → Primary Grader (parallel)
  Step 3: For each graded response → Skeptic Grader (parallel)
  Step 4: Reconcile scores
  Step 5: Synthesizer → final report
  Step 6: Update assessment status → notify dashboard
```
**Rejected alternatives:**
- [Trigger.dev](http://Trigger.dev): Similar capability but Inngest's step-based retry is better for LLM chains
- Vercel Cron: No event-driven capability, no step retries, 800s execution limit
- BullMQ/Redis: Requires managing Redis infrastructure
### Hosting: Vercel (Pro Plan)
**Why Vercel:**
- Native Next.js deployment (zero config)
- Edge network for global performance
- Preview deployments for every PR
- Built-in analytics and speed insights
- \$20/mo Pro plan includes 1 TB bandwidth, 10M edge requests
**Cost concern — LLM streaming:**
- Vercel bills by execution time; 30-second LLM streams cost 30x a 1-second API call
- Mitigation: Grading pipeline runs via Inngest (off Vercel), not API routes
- Only Examiner streaming runs through Vercel API routes (short responses)
- Monitor GB-hours; consider Railway (\$5/mo) if Vercel costs exceed \$100/mo
**Rejected alternatives:**
- Railway: Cheaper for compute-heavy workloads, but loses Vercel's native Next.js optimizations, preview deploys, and edge network
- Render: Similar to Railway, less mature Next.js support
- Self-hosted: Too much ops overhead for V1
---
## Cost Estimate: V1 at Scale
### 100 Assessments/Month
| Service | Cost |
|---|---|
| Vercel Pro | \$20/mo |
| Supabase Pro | \$25/mo |
| Inngest (free tier) | \$0/mo |
| OpenAI API (\~\$0.42/assessment) | \~\$42/mo |
| Domain | \~\$12/yr |
| **Total** | **\~\$87/mo** |
### 500 Assessments/Month
| Service | Cost |
|---|---|
| Vercel Pro | \$20-40/mo (may need overage) |
| Supabase Pro | \$25-35/mo |
| Inngest Paid | \$20/mo |
| OpenAI API | \~\$210/mo |
| **Total** | **\~\$275-305/mo** |
### 1,000 Assessments/Month
| Service | Cost |
|---|---|
| Vercel Pro | \$40-80/mo |
| Supabase Pro | \$35-50/mo |
| Inngest Paid | \$20-40/mo |
| OpenAI API | \~\$420/mo |
| **Total** | **\~\$515-590/mo** |
---
## Dev Setup Instructions
### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm
- Supabase CLI (optional, for local dev)
- Vercel CLI
### Quick Start
```bash
pnpm create next-app@latest ai-workforce-map --typescript --tailwind --eslint --app --src-dir
cd ai-workforce-map

# Core dependencies
pnpm add @supabase/supabase-js @supabase/ssr
pnpm add ai @ai-sdk/openai @ai-sdk/anthropic
pnpm add inngest
pnpm add recharts
pnpm add @nivo/heatmap @nivo/core
pnpm add @react-pdf/renderer
pnpm add zustand

# shadcn/ui setup
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input select table form dialog sheet tabs badge separator chart

# Dev dependencies
pnpm add -D @types/node
```
### Environment Variables
```javascript
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://rpqxsvqxwhzymnujmyun.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# LLM APIs
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
### Project Structure
```javascript
src/
  app/
    (auth)/
      login/page.tsx
      signup/page.tsx
    (employee)/
      intake/page.tsx
      assessment/page.tsx
      results/page.tsx
    (employer)/
      dashboard/page.tsx
      ranking/page.tsx
      matrix/page.tsx
      risk/page.tsx
      training/page.tsx
    (admin)/
      setup/page.tsx
      invite/page.tsx
    api/
      assessment/
        start/route.ts
        respond/route.ts
        grade/route.ts
      dashboard/
        overview/route.ts
        ranking/route.ts
      admin/
        setup/route.ts
        invite/route.ts
      inngest/route.ts
  components/
    ui/           # shadcn/ui components
    charts/       # Radar, heatmap, bar chart wrappers
    assessment/   # Assessment-specific components
    dashboard/    # Dashboard-specific components
    layout/       # Navigation, sidebar, header
  lib/
    supabase/
      client.ts   # Browser client
      server.ts   # Server client
      middleware.ts
    llm/
      orchestrator.ts
      examiner.ts
      primary-grader.ts
      skeptic-grader.ts
      synthesizer.ts
    inngest/
      client.ts
      functions/
        grade-assessment.ts
    utils/
      scoring.ts
      scenario-loader.ts
  content/
    scenarios/
    rubrics/
    roles/
  types/
    index.ts      # All TypeScript interfaces
middleware.ts     # Supabase auth middleware
```
---
## Key Architecture Decisions for Developer
1. **Server Components by default** — Dashboard views are Server Components (fast initial load, data fetched server-side). Assessment UI is Client Component (interactive, needs useChat hook).
2. **Streaming only for Examiner** — Follow-up questions stream to the user. Grading runs in background (no streaming needed).
3. **Inngest handles all grading** — Never run grading in Vercel API routes. Always dispatch to Inngest to avoid timeout limits and reduce Vercel compute costs.
4. **Supabase RLS enforces multi-tenancy** — Application code does NOT filter by company_id manually. RLS policies handle isolation. This prevents accidental data leaks.
5. **Content files in /content directory** — Markdown scenario files live in the repo alongside code. The scenario_loader reads them and cross-references with Supabase metadata index.
6. **Type-safe throughout** — All LLM input/output schemas defined as TypeScript interfaces. Supabase types auto-generated via `supabase gen types typescript`.
---
## Sources
- shadcn/ui Charts (Recharts radar): [https://ui.shadcn.com/charts/radar](https://ui.shadcn.com/charts/radar)
- Supabase multi-tenancy patterns: [https://freeacademy.ai/lessons/multi-tenancy-patterns](https://freeacademy.ai/lessons/multi-tenancy-patterns)
- Clerk vs Supabase Auth comparison: [https://www.getmonetizely.com/articles/clerk-vs-supabase-auth](https://www.getmonetizely.com/articles/clerk-vs-supabase-auth)
- Auth provider comparison 2026: [https://designrevision.com/blog/auth-providers-compared](https://designrevision.com/blog/auth-providers-compared)
- Inngest vs [Trigger.dev](http://Trigger.dev) vs Vercel Cron: [https://www.hashbuilds.com/articles/next-js-background-jobs-inngest-vs-trigger-dev-vs-vercel-cron](https://www.hashbuilds.com/articles/next-js-background-jobs-inngest-vs-trigger-dev-vs-vercel-cron)
- Vercel AI SDK streaming guide: [https://blog.logrocket.com/nextjs-vercel-ai-sdk-streaming/](https://blog.logrocket.com/nextjs-vercel-ai-sdk-streaming/)
- Railway vs Vercel comparison: [https://docs.railway.com/platform/compare-to-vercel](https://docs.railway.com/platform/compare-to-vercel)
- Vercel Pro pricing: [https://vercel.com/docs/plans/pro-plan](https://vercel.com/docs/plans/pro-plan)
- Supabase pricing 2026: [https://supabase.com/pricing](https://supabase.com/pricing)
- Vercel AI pricing analysis: [https://www.truefoundry.com/blog/understanding-vercel-ai-gateway-pricing](https://www.truefoundry.com/blog/understanding-vercel-ai-gateway-pricing)