# Phase 3 — Project Scaffold

**Notion URL:** https://www.notion.so/31ed807b91118103aef9ed662c0182b7

---

# Project Scaffold — Developer Setup Guide
This page contains everything needed to initialize the AI Workforce Map V1 project. Follow each section in order.
---
## Step 1: Create the Next.js Project
```bash
pnpm create next-app@latest ai-workforce-map --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd ai-workforce-map
```
---
## Step 2: Install Dependencies
```bash
# Supabase
pnpm add @supabase/supabase-js @supabase/ssr

# LLM / AI SDK
pnpm add ai @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/google

# Background Jobs
pnpm add inngest

# Charts
pnpm add recharts
pnpm add @nivo/heatmap @nivo/core

# PDF Generation
pnpm add @react-pdf/renderer

# State Management
pnpm add zustand

# Utilities
pnpm add zod          # Schema validation for LLM outputs
pnpm add gray-matter   # Parse YAML frontmatter from .md files
pnpm add nanoid        # Generate short unique IDs for assessment links
pnpm add date-fns      # Date formatting
```
---
## Step 3: Initialize shadcn/ui
```bash
pnpm dlx shadcn@latest init
```
When prompted:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**
Then install required components:
```bash
pnpm dlx shadcn@latest add button card input label select textarea table form dialog sheet tabs badge separator chart tooltip avatar dropdown-menu progress skeleton alert switch radio-group checkbox slider scroll-area
```
---
## Step 4: Environment Variables
Create `.env.local` in the project root:
```javascript
# === Supabase ===
NEXT_PUBLIC_SUPABASE_URL=https://rpqxsvqxwhzymnujmyun.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# === LLM APIs ===
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# === Inngest ===
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=

# === App ===
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
Get Supabase keys from: Supabase Dashboard \> Project Settings \> API
Get Inngest keys from: [https://app.inngest.com](https://app.inngest.com) (create free account)
---
## Step 5: Directory Structure
Create this folder structure inside `src/`:
```bash
# App routes
mkdir -p src/app/\(auth\)/login
mkdir -p src/app/\(auth\)/signup
mkdir -p src/app/\(employee\)/intake
mkdir -p src/app/\(employee\)/assessment
mkdir -p src/app/\(employee\)/results
mkdir -p src/app/\(employer\)/dashboard
mkdir -p src/app/\(employer\)/ranking
mkdir -p src/app/\(employer\)/matrix
mkdir -p src/app/\(employer\)/risk
mkdir -p src/app/\(employer\)/training
mkdir -p src/app/\(admin\)/setup
mkdir -p src/app/\(admin\)/invite
mkdir -p src/app/api/assessment/start
mkdir -p src/app/api/assessment/respond
mkdir -p src/app/api/assessment/grade
mkdir -p src/app/api/dashboard/overview
mkdir -p src/app/api/dashboard/ranking
mkdir -p src/app/api/admin/setup
mkdir -p src/app/api/admin/invite
mkdir -p src/app/api/inngest

# Shared code
mkdir -p src/components/ui
mkdir -p src/components/charts
mkdir -p src/components/assessment
mkdir -p src/components/dashboard
mkdir -p src/components/layout
mkdir -p src/lib/supabase
mkdir -p src/lib/llm
mkdir -p src/lib/inngest/functions
mkdir -p src/lib/utils
mkdir -p src/types

# Content files (scenarios, rubrics, roles)
mkdir -p src/content/scenarios/base
mkdir -p src/content/scenarios/variants
mkdir -p src/content/rubrics
mkdir -p src/content/roles
```
---
## Step 6: Supabase Client Configuration
### `src/lib/supabase/client.ts` (Browser Client)
```typescript
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```
### `src/lib/supabase/server.ts` (Server Client)
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method is called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  )
}

// Admin client (bypasses RLS) — use only in server-side code
import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
```
### `src/lib/supabase/middleware.ts` (Auth Middleware Helper)
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Redirect unauthenticated users to login
  // Exception: public routes (login, signup, assessment links)
  const publicPaths = ['/login', '/signup', '/assess/']
  const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (!user && !isPublicPath && request.nextUrl.pathname !== '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
```
### `src/middleware.ts` (Root Middleware)
```typescript
import { updateSession } from '@/lib/supabase/middleware'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```
---
## Step 7: Inngest Configuration
### `src/lib/inngest/client.ts`
```typescript
import { Inngest } from 'inngest'

export const inngest = new Inngest({
  id: 'ai-workforce-map',
  eventKey: process.env.INNGEST_EVENT_KEY,
})
```
### `src/lib/inngest/functions/grade-assessment.ts`
```typescript
import { inngest } from '../client'

export const gradeAssessment = inngest.createFunction(
  {
    id: 'grade-assessment',
    retries: 3,
  },
  { event: 'assessment/completed' },
  async ({ event, step }) => {
    const { assessmentId } = event.data

    // Step 1: Load all responses for this assessment
    const responses = await step.run('load-responses', async () => {
      // TODO: Fetch from Supabase
      return []
    })

    // Step 2: Primary Grader — grade each response
    const primaryGrades = await step.run('primary-grading', async () => {
      // TODO: Call Primary Grader LLM for each response
      return []
    })

    // Step 3: Skeptic Grader — audit each grade
    const skepticAudits = await step.run('skeptic-grading', async () => {
      // TODO: Call Skeptic Grader LLM for each primary grade
      return []
    })

    // Step 4: Reconcile scores
    const reconciledScores = await step.run('reconcile-scores', async () => {
      // TODO: Apply reconciliation logic
      return []
    })

    // Step 5: Synthesizer — generate final report
    const report = await step.run('synthesize-report', async () => {
      // TODO: Call Synthesizer LLM
      return {}
    })

    // Step 6: Save results and update status
    await step.run('save-results', async () => {
      // TODO: Write to Supabase evaluations + role_fit_results
      // TODO: Update assessment status to 'graded'
    })

    return { assessmentId, status: 'graded' }
  }
)
```
### `src/app/api/inngest/route.ts` (Inngest API Handler)
```typescript
import { serve } from 'inngest/next'
import { inngest } from '@/lib/inngest/client'
import { gradeAssessment } from '@/lib/inngest/functions/grade-assessment'

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [gradeAssessment],
})
```
---
## Step 8: TypeScript Types
### `src/types/index.ts`
```typescript
// ============================================
// Core Domain Types
// ============================================

export type ReadinessBand = 'not_ready' | 'emerging' | 'capable' | 'strong' | 'high_leverage'

export type RoleName = 'ai_operator' | 'ai_approver' | 'workflow_translator' | 'ai_qa_reviewer' | 'change_champion'

export type DomainName = 
  | 'task_framing'
  | 'process_thinking'
  | 'verification_instinct'
  | 'exception_handling'
  | 'risk_judgment'
  | 'operational_consistency'
  | 'change_leverage'

export type TrainingTrack = 'A' | 'B' | 'C' | 'D'

export type AssessmentStatus = 'not_started' | 'in_progress' | 'completed' | 'grading' | 'graded'

export type Difficulty = 'obvious' | 'mixed' | 'deceptive'

// ============================================
// Employee & Company
// ============================================

export interface Company {
  id: string
  name: string
  departments: string[]
  ai_adoption_goals: string[]
  risk_sensitivity: 'low' | 'medium' | 'high'
  target_functions: string[]
  employee_count: number
  created_at: string
}

export interface CompanyUser {
  id: string
  company_id: string
  user_id: string
  role: 'admin' | 'employee'
  name: string
  title?: string
  department?: string
  years_experience?: number
  is_manager: boolean
  ai_exposure: 'none' | 'basic' | 'moderate' | 'advanced'
  ambiguity_confidence?: number  // 1-5
  review_comfort?: number        // 1-5
  current_tools?: string[]
  created_at: string
}

// ============================================
// Assessment
// ============================================

export interface Assessment {
  id: string
  employee_id: string
  company_id: string
  status: AssessmentStatus
  scenario_ids: string[]
  current_scenario_index: number
  started_at?: string
  completed_at?: string
  total_time_seconds?: number
  created_at: string
}

export interface ScenarioMetadata {
  id: string
  title: string
  slug: string
  archetype: string
  module: string
  difficulty: Difficulty
  primary_domains: DomainName[]
  secondary_domains: DomainName[]
  target_roles: RoleName[]
  industry: string
  status: 'draft' | 'published' | 'archived'
}

export interface Response {
  id: string
  assessment_id: string
  scenario_id: string
  raw_response: string
  followup_questions: FollowUpExchange[]
  time_spent_seconds: number
  created_at: string
}

export interface FollowUpExchange {
  question: string
  answer: string
  strategy: 'probe_depth' | 'introduce_ambiguity' | 'pressure_test' | 'surface_contradiction'
}

// ============================================
// Evaluation (Grading Output)
// ============================================

export interface Evaluation {
  id: string
  response_id: string
  domain: DomainName
  primary_score: number        // 0-4
  skeptic_score: number        // 0-4
  final_score: number          // 0-4 (reconciled)
  primary_reasoning: string
  skeptic_reasoning: string
  evidence_quotes: string[]
  penalty_flags: PenaltyFlag[]
  created_at: string
}

export interface PenaltyFlag {
  type: 'contradiction' | 'overconfidence' | 'unsafe_automation_bias' | 'failure_to_verify' | 'inconsistency_under_pressure' | 'unclear_reasoning'
  description: string
  severity: 'minor' | 'moderate' | 'major'
}

// ============================================
// Role Fit Results
// ============================================

export interface RoleFitResult {
  id: string
  assessment_id: string
  employee_id: string
  readiness_band: ReadinessBand
  readiness_score: number       // 0-100
  domain_scores: Record  // 0-100 each
  role_scores: Record      // 0-100 each
  recommended_role: RoleName
  role_ranking: RoleName[]      // ordered best to worst
  risk_flags: RiskFlag[]
  training_track: TrainingTrack
  deployment_recommendation: string
  upskill_recommendations: string[]
  created_at: string
}

export interface RiskFlag {
  flag: string
  severity: 'low' | 'medium' | 'high'
  evidence: string
}

// ============================================
// LLM Prompt I/O Types
// ============================================

export interface OrchestratorInput {
  employee: Pick
  available_scenarios: ScenarioMetadata[]
  completed_scenario_ids: string[]
}

export interface OrchestratorOutput {
  next_scenario_id: string
  rationale: string
  session_state: 'continue' | 'complete'
}

export interface ExaminerInput {
  scenario_text: string
  employee_response: string
  previous_exchanges: FollowUpExchange[]
  employee_profile: Pick
}

export interface ExaminerOutput {
  follow_up_question: string
  strategy: FollowUpExchange['strategy']
  should_continue: boolean
}

export interface PrimaryGraderInput {
  scenario: ScenarioMetadata
  rubric_text: string
  employee_response: string
  follow_up_exchanges: FollowUpExchange[]
}

export interface PrimaryGraderOutput {
  domain_evaluations: Array
}

export interface SkepticGraderInput {
  primary_evaluation: PrimaryGraderOutput
  scenario: ScenarioMetadata
  employee_response: string
}

export interface SkepticGraderOutput {
  domain_audits: Array
}

export interface SynthesizerInput {
  employee: Pick
  reconciled_evaluations: Evaluation[]
  role_definitions: Array }>
}

export interface SynthesizerOutput {
  readiness_band: ReadinessBand
  readiness_score: number
  domain_scores: Record
  role_scores: Record
  recommended_role: RoleName
  role_ranking: RoleName[]
  risk_flags: RiskFlag[]
  training_track: TrainingTrack
  deployment_recommendation: string
  upskill_recommendations: string[]
  executive_summary: string
}
```
---
## Step 9: Additional Supabase Migration
The existing schema has 7 tables (scenarios, rubrics, roles, assessments, responses, evaluations, role_fit_results). We need 3 more tables for multi-tenancy and admin flow.
Paste this SQL into Supabase SQL Editor and run it:
```sql
-- ============================================
-- Additional Tables for V1 Auth & Multi-Tenancy
-- Run AFTER the original schema + seed SQL
-- ============================================

-- Companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  departments TEXT[] DEFAULT '{}',
  ai_adoption_goals TEXT[] DEFAULT '{}',
  risk_sensitivity TEXT NOT NULL DEFAULT 'medium'
    CHECK (risk_sensitivity IN ('low', 'medium', 'high')),
  target_functions TEXT[] DEFAULT '{}',
  employee_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Company users (maps auth.users to companies with roles)
CREATE TABLE IF NOT EXISTS public.company_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'employee'
    CHECK (role IN ('admin', 'employee')),
  name TEXT NOT NULL,
  title TEXT,
  department TEXT,
  years_experience INTEGER,
  is_manager BOOLEAN DEFAULT false,
  ai_exposure TEXT DEFAULT 'none'
    CHECK (ai_exposure IN ('none', 'basic', 'moderate', 'advanced')),
  ambiguity_confidence INTEGER CHECK (ambiguity_confidence BETWEEN 1 AND 5),
  review_comfort INTEGER CHECK (review_comfort BETWEEN 1 AND 5),
  current_tools TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id, user_id)
);

-- Assessment links (shareable URLs for employees)
CREATE TABLE IF NOT EXISTS public.assessment_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,  -- short unique code (e.g., "abc123")
  department TEXT,            -- optional: restrict to specific department
  max_uses INTEGER,           -- optional: limit number of uses
  uses_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,     -- optional: expiration date
  is_active BOOLEAN DEFAULT true,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_company_users_company ON public.company_users(company_id);
CREATE INDEX IF NOT EXISTS idx_company_users_user ON public.company_users(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_links_code ON public.assessment_links(code);
CREATE INDEX IF NOT EXISTS idx_assessment_links_company ON public.assessment_links(company_id);
CREATE INDEX IF NOT EXISTS idx_companies_slug ON public.companies(slug);

-- Add company_id to assessments table (for multi-tenancy)
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.companies(id);
CREATE INDEX IF NOT EXISTS idx_assessments_company ON public.assessments(company_id);

-- Updated_at triggers
CREATE TRIGGER set_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_company_users_updated_at
  BEFORE UPDATE ON public.company_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- RLS Policies for Multi-Tenancy
-- ============================================

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_links ENABLE ROW LEVEL SECURITY;

-- Helper function: get user's company ID
CREATE OR REPLACE FUNCTION public.get_user_company_id()
RETURNS UUID AS $$
  SELECT company_id FROM public.company_users
  WHERE user_id = auth.uid()
  LIMIT 1
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Helper function: check if user is company admin
CREATE OR REPLACE FUNCTION public.is_company_admin(target_company_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.company_users
    WHERE company_id = target_company_id
    AND user_id = auth.uid()
    AND role = 'admin'
  )
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Companies: admins can read their own company
CREATE POLICY "Users can read own company"
  ON public.companies FOR SELECT
  USING (id = public.get_user_company_id());

CREATE POLICY "Admins can update own company"
  ON public.companies FOR UPDATE
  USING (public.is_company_admin(id));

-- Allow insert for authenticated users (creating new company during signup)
CREATE POLICY "Authenticated users can create companies"
  ON public.companies FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Company users: can see members of own company
CREATE POLICY "Users can read own company members"
  ON public.company_users FOR SELECT
  USING (company_id = public.get_user_company_id());

CREATE POLICY "Users can insert own profile"
  ON public.company_users FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON public.company_users FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Admins can insert company members"
  ON public.company_users FOR INSERT
  WITH CHECK (public.is_company_admin(company_id));

-- Assessment links: admins only
CREATE POLICY "Admins can manage assessment links"
  ON public.assessment_links FOR ALL
  USING (public.is_company_admin(company_id));

-- Allow anyone to read active links (for assessment intake)
CREATE POLICY "Anyone can read active links"
  ON public.assessment_links FOR SELECT
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

-- Update assessments RLS to include company_id
DROP POLICY IF EXISTS "Authenticated users can read assessments" ON public.assessments;
CREATE POLICY "Users can read own assessments"
  ON public.assessments FOR SELECT
  USING (
    employee_id::text = auth.uid()::text
    OR company_id = public.get_user_company_id()
  );
```
---
## Step 10: Generate Supabase Types
After running the migration SQL, generate TypeScript types:
```bash
# Install Supabase CLI if not already
npx supabase login
npx supabase gen types typescript --project-id rpqxsvqxwhzymnujmyun > src/types/database.ts
```
This creates auto-generated types matching your database schema, which the Supabase client uses for type-safe queries.
---
## Step 11: Vercel Deployment
```bash
# Install Vercel CLI
pnpm add -g vercel

# Link to Vercel
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add OPENAI_API_KEY
vercel env add ANTHROPIC_API_KEY
vercel env add INNGEST_EVENT_KEY
vercel env add INNGEST_SIGNING_KEY
vercel env add NEXT_PUBLIC_APP_URL

# Deploy to staging
vercel

# Deploy to production
vercel --prod
```
---
## Step 12: Inngest Setup
1. Go to [https://app.inngest.com](https://app.inngest.com) and create a free account
2. Create a new app called "AI Workforce Map"
3. Copy the Event Key and Signing Key to your `.env.local`
4. For local development, run the Inngest dev server:
```bash
npx inngest-cli@latest dev
```
This opens a local dashboard at [http://localhost:8288](http://localhost:8288) where you can see function executions and debug.
---
## Verification Checklist
After completing all steps, verify:
- [ ] `pnpm dev` starts without errors
- [ ] Visiting [http://localhost:3000](http://localhost:3000) shows the Next.js default page
- [ ] Supabase client connects (check browser console for errors)
- [ ] Auth middleware redirects unauthenticated users to /login
- [ ] Inngest dev server shows your functions registered
- [ ] `npx supabase gen types typescript` succeeds
- [ ] All shadcn/ui components import without errors
---
## What Comes Next
With the scaffold in place, the build order is:
1. Employee Intake Screen (Screen 1) — auth + intake form
2. Assessment Engine (Screen 2) — core experience
3. Grading Pipeline — backend LLM chain
4. Employee Results (Screen 3) — radar chart + results
5. Employer Dashboard (Screen 4) — KPI cards + charts
6. Employer Views (Screens 5-8) — ranking, matrix, risk, training
7. Company Admin Setup — onboarding + invite flow