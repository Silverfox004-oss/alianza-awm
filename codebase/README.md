# AI Workforce Map

A Next.js 15 application for assessing employee AI readiness across an organization. Employees complete scenario-based assessments; a multi-LLM grading pipeline scores them across 7 domains; employers view results through an analytics dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Supabase (PostgreSQL + Auth + RLS) |
| Background Jobs | Inngest |
| LLM | Vercel AI SDK — OpenAI GPT-4o / GPT-4o-mini |
| Charts | Recharts + Nivo |
| PDF | @react-pdf/renderer |
| State | Zustand |
| Validation | Zod |
| Content | gray-matter (YAML frontmatter in .md scenario files) |
| IDs | nanoid |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Admin + employee login (tabbed)
│   │   └── signup/page.tsx         # Admin registration
│   ├── (admin)/
│   │   ├── setup/page.tsx          # Company profile setup
│   │   └── invite/page.tsx         # Assessment link generator
│   ├── (employee)/
│   │   ├── intake/page.tsx         # Employee intake form
│   │   ├── assessment/page.tsx     # Assessment engine
│   │   └── results/page.tsx        # Employee results view
│   ├── (employer)/
│   │   ├── dashboard/page.tsx      # Screen 4: Overview KPIs
│   │   ├── ranking/page.tsx        # Screen 5: Employee ranking table
│   │   ├── matrix/page.tsx         # Screen 6: Role-fit heatmap
│   │   ├── risk/page.tsx           # Screen 7: Risk dashboard
│   │   └── training/page.tsx       # Screen 8: Training track assignments
│   └── api/
│       ├── assessment/
│       │   ├── start/route.ts      # POST: start assessment
│       │   ├── respond/route.ts    # POST: submit scenario response
│       │   ├── grade/route.ts      # POST: trigger grading
│       │   └── pause/route.ts      # POST: pause in-progress assessment
│       ├── dashboard/
│       │   ├── overview/route.ts   # GET: KPI aggregates
│       │   └── ranking/route.ts    # GET: paginated employee ranking
│       ├── admin/
│       │   ├── setup/route.ts      # POST: create company
│       │   └── invite/route.ts     # GET+POST: list/create assessment links
│       └── inngest/route.ts        # Inngest webhook handler
├── components/
│   ├── assessment/                 # Intake form, scenario display, followup chat,
│   │                               #   progress indicator, timer, results dashboard,
│   │                               #   results PDF, grading skeleton
│   ├── auth/
│   │   └── auth-guard.tsx          # Client-side admin route protection HOC
│   ├── charts/
│   │   ├── domain-radar-chart.tsx  # 7-domain radar (Recharts)
│   │   ├── readiness-distribution-chart.tsx  # Band bar chart
│   │   ├── risk-concentration-chart.tsx      # Stacked bar by dept
│   │   └── role-fit-heatmap.tsx    # Nivo heatmap
│   ├── dashboard/
│   │   ├── overview-kpis.tsx       # KPI card row
│   │   ├── ranking-table.tsx       # Filterable/paginated table
│   │   └── export-csv-button.tsx   # Client-side CSV export
│   └── layout/
│       └── dashboard-layout.tsx    # Employer sidebar shell
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser Supabase client
│   │   ├── server.ts               # Server Supabase client + admin client
│   │   └── middleware.ts           # Session refresh middleware helper
│   ├── inngest/
│   │   ├── client.ts               # Inngest client
│   │   ├── dispatch.ts             # dispatchGrading() helper
│   │   └── functions/
│   │       └── grade-assessment.ts # 6-step grading Inngest function
│   ├── llm/
│   │   ├── orchestrator.ts         # Scenario selection (GPT-4o-mini)
│   │   ├── examiner.ts             # Follow-up question generator
│   │   ├── primary-grader.ts       # Domain scoring (GPT-4o)
│   │   ├── skeptic-grader.ts       # Score audit (GPT-4o)
│   │   ├── synthesizer.ts          # Final report synthesis (GPT-4o)
│   │   └── cost-tracker.ts         # Token/cost logging
│   ├── schemas/
│   │   └── intake.ts               # Zod schema for intake form
│   └── utils/
│       ├── scoring.ts              # Score reconciliation + readiness band logic
│       └── scenario-loader.ts      # Load .md scenario files with gray-matter
├── hooks/
│   └── use-auto-save.ts            # Assessment auto-save hook
├── types/
│   ├── index.ts                    # Domain types (Company, Assessment, Evaluation, etc.)
│   └── database.ts                 # Auto-generated Supabase types (run db:types)
└── content/
    ├── scenarios/                  # .md files with YAML frontmatter
    ├── rubrics/                    # Grading rubrics per domain
    └── roles/                      # Role definitions
supabase/
└── migration.sql                   # Full database schema + RLS policies + seed data
```

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd ai-workforce-map
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
# Edit .env.local with your actual keys
```

Required keys:
- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase Dashboard > Project Settings > API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from same page
- `SUPABASE_SERVICE_ROLE_KEY` — from same page (never expose to client)
- `OPENAI_API_KEY` — from platform.openai.com
- `INNGEST_EVENT_KEY` + `INNGEST_SIGNING_KEY` — from app.inngest.com

### 3. Run the database migration

Open the Supabase SQL Editor (Dashboard > SQL Editor) and run the full contents of `supabase/migration.sql`. This creates all tables, indexes, RLS policies, helper functions, and seed data (role definitions).

After running the migration, generate TypeScript types:

```bash
npm run db:types
```

### 4. Initialize shadcn/ui

```bash
npx shadcn@latest init
# Style: Default, Base color: Slate, CSS variables: Yes

npx shadcn@latest add button card input label select textarea table form dialog sheet tabs badge separator chart tooltip avatar dropdown-menu progress skeleton alert switch radio-group checkbox slider scroll-area accordion
```

### 5. Start development

```bash
# Terminal 1: Next.js
npm run dev

# Terminal 2: Inngest dev server (for background job debugging)
npx inngest-cli@latest dev
```

The app runs at http://localhost:3000. The Inngest dashboard runs at http://localhost:8288.

---

## User Flows

### Admin Flow
1. `/signup` → Create Supabase auth account
2. `/setup` → Configure company name, departments, AI goals, risk sensitivity
3. `/invite` → Generate shareable assessment links (nanoid slugs)
4. Share `https://yourdomain.com/assess?link=<slug>` with employees
5. `/login` (Admin tab) → Password login → `/dashboard`

### Employee Flow
1. Click assessment link → `/assess?link=<slug>`
2. Link validated (active, not expired, uses remaining)
3. `/intake` → Fill profile form (name, department, role, AI exposure)
4. `/assessment` → Complete 3–5 scenarios with AI examiner follow-ups
5. Grading triggered via Inngest (`assessment/grade.requested`)
6. `/results?evaluation_id=<id>` → View radar chart, role fit scores, training track

---

## Grading Pipeline

The `grade-assessment` Inngest function (`assessment/grade.requested`) runs 6 steps:

| Step | Description |
|---|---|
| `load-assessment-data` | Fetch responses, scenarios, rubrics from Supabase |
| `primary-grading` | GPT-4o scores each response across 7 domains (0–4 scale) |
| `skeptic-grading` | GPT-4o audits each primary score (AGREE / ADJUST_DOWN / FLAG) |
| `reconcile-scores` | Gap 0–1 → use primary; Gap 2+ → use min(primary, skeptic) |
| `synthesize` | GPT-4o generates readiness band, role fit, training track, summary |
| `persist-results` | Write to `evaluations` + `role_fit_results`; set assessment status = `complete` |

**Domain keys (7):** `task_framing`, `process_thinking`, `verification_instinct`, `exception_handling`, `risk_judgment`, `operational_consistency`, `change_leverage`

**Readiness bands:** `not_ready` → `emerging` → `capable` → `strong` → `high_leverage`

**Training tracks:** A (Ready Now) | B (30 Days) | C (60–90 Days) | D (Developmental)

---

## Employer Dashboard

All employer routes (`/dashboard`, `/ranking`, `/matrix`, `/risk`, `/training`) are protected by middleware that requires an authenticated session. The `AuthGuard` client component provides additional role-level protection.

| Screen | Route | Key Feature |
|---|---|---|
| Overview | `/dashboard` | KPI cards, readiness distribution bar chart |
| Rankings | `/ranking` | Filterable/paginated employee table with CSV export |
| Role Matrix | `/matrix` | Nivo heatmap — employee × role fit score |
| Risk | `/risk` | Stacked bar by department + top risk flags table |
| Training | `/training` | Track A/B/C/D cards with expandable employee lists |

---

## Key Implementation Notes

### Import Aliases

The server Supabase client is exported as `createServerSupabaseClient`. All server files use:
```typescript
import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'
// Note: createServerSupabaseClient is async — always await it:
const supabase = await createServerClient()
```

The browser client is exported as `createClient`:
```typescript
import { createClient as createBrowserClient } from '@/lib/supabase/client'
```

### Assessment Link Validation

The `/assess` page (intake entry point) must validate links on load:
```typescript
const link = await supabase.from('assessment_links')
  .select('*').eq('slug', slug).single()

if (!link.is_active) throw new Error('Link is no longer active')
if (link.expires_at && new Date(link.expires_at) < new Date()) throw new Error('Link expired')
if (link.max_uses && link.use_count >= link.max_uses) throw new Error('Link usage limit reached')
```

### Inngest Event

Grading is triggered by dispatching:
```typescript
import { dispatchGrading } from '@/lib/inngest/dispatch'
await dispatchGrading(assessmentId)
// Dispatches: { name: 'assessment/grade.requested', data: { assessmentId } }
```

### Score Reconciliation Logic

```typescript
// Gap 0-1: use primary score
// Gap 2+: use min(primary, skeptic)
// If skeptic flagged missedPenalty (not primary): deduct 1 from all scores
```

---

## Database Tables

| Table | Purpose |
|---|---|
| `companies` | Company profiles |
| `company_users` | Admin/member membership + employee profile data |
| `assessment_links` | Shareable link slugs with optional dept/expiry/max-uses |
| `assessments` | Active and completed assessments |
| `assessment_responses` | Individual scenario responses with follow-up chat |
| `assessment_evaluations` | Per-scenario 7-domain grading results |
| `role_fit_results` | Per-role scores (5 rows per evaluation) |
| `scenarios` | Scenario content (.md source of truth, but also stored in DB) |
| `rubrics` | Grading rubrics per scenario/domain |
| `roles` | Role definitions with domain weights |

All tables have RLS enabled. Helper functions `get_user_company_id()` and `is_company_admin()` are used in policies.

---

## Deployment (Vercel)

```bash
npm install -g vercel
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add OPENAI_API_KEY
vercel env add ANTHROPIC_API_KEY
vercel env add INNGEST_EVENT_KEY
vercel env add INNGEST_SIGNING_KEY
vercel env add NEXT_PUBLIC_APP_URL
vercel --prod
```

After deploying, configure Inngest:
1. Go to app.inngest.com > your app > Sync App
2. Enter your Vercel URL as the app URL: `https://yourdomain.com/api/inngest`
3. Inngest will sync your registered functions

---

## Pre-launch Checklist

- [ ] `npm run dev` starts without TypeScript errors
- [ ] `supabase/migration.sql` runs cleanly in Supabase SQL Editor
- [ ] `npm run db:types` generates `src/types/database.ts` successfully
- [ ] shadcn/ui components all install without conflict
- [ ] Admin can sign up, complete setup, and generate invite links
- [ ] Employee can take assessment end-to-end (intake → scenarios → results)
- [ ] Grading Inngest function appears in local dev dashboard (http://localhost:8288)
- [ ] All 5 employer dashboard views load with real data
- [ ] CSV export works on ranking/overview pages
- [ ] Middleware redirects unauthenticated users to `/login`
- [ ] Vercel deployment builds without errors
- [ ] Inngest webhook URL is synced in app.inngest.com
- [ ] Environment variables are set in Vercel dashboard
