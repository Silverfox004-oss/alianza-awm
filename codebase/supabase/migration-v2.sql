-- ============================================================
-- AI Workforce Map — V2 Incremental Migration
-- Idempotent: safe to run against existing DB (uses IF NOT EXISTS, DROP IF EXISTS)
-- Run AFTER migration.sql has already been applied.
-- ============================================================

-- ============================================================
-- 1a. Create assessment_responses table
-- Code writes to assessment_responses (respond/route.ts, grade-assessment.ts)
-- but migration.sql only has a "responses" table with different schema.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.assessment_responses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id   UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  scenario_id     TEXT NOT NULL,  -- SCN-001 style ID, not UUID (scenarios are file-based)
  response_text   TEXT,
  followup_exchanges JSONB DEFAULT '[]',
  submitted_at    TIMESTAMPTZ,    -- null = draft, non-null = submitted
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(assessment_id, scenario_id)  -- one response per scenario per assessment
);

-- ============================================================
-- 1b. Create assessment_evaluations table with 7-domain columns
-- Replaces the old 5-domain structure used by the evaluations table.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.assessment_evaluations (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id           UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  scenario_id             TEXT NOT NULL,
  task_framing            INTEGER CHECK (task_framing BETWEEN 0 AND 4),
  process_thinking        INTEGER CHECK (process_thinking BETWEEN 0 AND 4),
  verification_instinct   INTEGER CHECK (verification_instinct BETWEEN 0 AND 4),
  exception_handling      INTEGER CHECK (exception_handling BETWEEN 0 AND 4),
  risk_judgment           INTEGER CHECK (risk_judgment BETWEEN 0 AND 4),
  operational_consistency INTEGER CHECK (operational_consistency BETWEEN 0 AND 4),
  change_leverage         INTEGER CHECK (change_leverage BETWEEN 0 AND 4),
  missed_penalty_applied  BOOLEAN DEFAULT false,
  primary_grade           JSONB,
  skeptic_grade           JSONB,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 1c. Add new columns to assessments table
-- Used by grade-assessment.ts, start/route.ts, pause route
-- ============================================================
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS company_user_id UUID REFERENCES public.company_users(id);
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS link_id UUID REFERENCES public.assessment_links(id);
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS selected_scenario_ids TEXT[] DEFAULT '{}';
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS paused_at TIMESTAMPTZ;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS elapsed_seconds INTEGER DEFAULT 0;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS overall_score INTEGER;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS readiness_band TEXT;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS domain_scores JSONB;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS role_scores JSONB;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS recommended_role TEXT;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS role_ranking TEXT[];
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS risk_flags JSONB;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS training_track TEXT;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS deployment_recommendation TEXT;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS upskill_recommendations TEXT[];
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS executive_summary TEXT;
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS graded_at TIMESTAMPTZ;

-- ============================================================
-- 1d. Add new columns to assessment_links table
-- start/route.ts updates used_at and assessment_id on link consumption
-- ============================================================
ALTER TABLE public.assessment_links ADD COLUMN IF NOT EXISTS used_at TIMESTAMPTZ;
ALTER TABLE public.assessment_links ADD COLUMN IF NOT EXISTS assessment_id UUID REFERENCES public.assessments(id);

-- ============================================================
-- 1e. Recreate role_fit_results with correct structure
-- grade-assessment.ts inserts: assessment_id, role_key, fit_score, rank, is_recommended
-- Old table had: evaluation_id, role, score — fundamentally different
-- ============================================================
DROP TABLE IF EXISTS public.role_fit_results;
CREATE TABLE public.role_fit_results (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id   UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  role_key        TEXT NOT NULL,
  fit_score       INTEGER NOT NULL CHECK (fit_score BETWEEN 0 AND 100),
  rank            INTEGER NOT NULL,
  is_recommended  BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 1f. Update role seed data — old 5-domain keys → new 7-domain keys
-- ============================================================
UPDATE public.roles SET domain_weights = '{"task_framing": 0.20, "process_thinking": 0.15, "verification_instinct": 0.20, "exception_handling": 0.10, "risk_judgment": 0.10, "operational_consistency": 0.20, "change_leverage": 0.05}'::jsonb WHERE name = 'ai_operator';
UPDATE public.roles SET domain_weights = '{"task_framing": 0.10, "process_thinking": 0.10, "verification_instinct": 0.30, "exception_handling": 0.15, "risk_judgment": 0.25, "operational_consistency": 0.05, "change_leverage": 0.05}'::jsonb WHERE name = 'ai_approver';
UPDATE public.roles SET domain_weights = '{"task_framing": 0.25, "process_thinking": 0.25, "verification_instinct": 0.10, "exception_handling": 0.10, "risk_judgment": 0.10, "operational_consistency": 0.10, "change_leverage": 0.10}'::jsonb WHERE name = 'workflow_translator';
UPDATE public.roles SET domain_weights = '{"task_framing": 0.05, "process_thinking": 0.10, "verification_instinct": 0.30, "exception_handling": 0.20, "risk_judgment": 0.25, "operational_consistency": 0.05, "change_leverage": 0.05}'::jsonb WHERE name = 'ai_qa_reviewer';
UPDATE public.roles SET domain_weights = '{"task_framing": 0.10, "process_thinking": 0.10, "verification_instinct": 0.05, "exception_handling": 0.05, "risk_judgment": 0.10, "operational_consistency": 0.10, "change_leverage": 0.50}'::jsonb WHERE name = 'change_champion';

-- ============================================================
-- 2b. Fix company_users for anonymous (link-based) assessments
-- user_id has FK to auth.users(id), so random UUIDs will fail.
-- Make user_id nullable and drop the unique constraint that requires it.
-- ============================================================
ALTER TABLE public.company_users ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.company_users DROP CONSTRAINT IF EXISTS company_users_company_id_user_id_key;

-- ============================================================
-- 2c. Fix company_users role check — add 'employee' role
-- Code inserts role: 'employee' but DB only allows ('admin', 'member')
-- ============================================================
ALTER TABLE public.company_users DROP CONSTRAINT IF EXISTS company_users_role_check;
ALTER TABLE public.company_users ADD CONSTRAINT company_users_role_check CHECK (role IN ('admin', 'member', 'employee'));

-- ============================================================
-- ISSUE 10: Standardize assessments.status enum
-- DB had: 'in_progress', 'grading', 'complete', 'failed'
-- Code uses: 'not_started', 'in_progress', 'paused', 'grading', 'complete', 'failed'
-- ============================================================
ALTER TABLE public.assessments DROP CONSTRAINT IF EXISTS assessments_status_check;
ALTER TABLE public.assessments ADD CONSTRAINT assessments_status_check CHECK (status IN ('not_started', 'in_progress', 'paused', 'grading', 'complete', 'failed'));

-- ============================================================
-- 1g. RLS policies for new tables + service role bypass
-- ============================================================
ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_evaluations ENABLE ROW LEVEL SECURITY;

-- assessment_responses: employees can read/write own
CREATE POLICY "Users can manage own responses" ON public.assessment_responses FOR ALL
  USING (assessment_id IN (SELECT id FROM public.assessments WHERE employee_id = auth.uid() OR company_user_id IN (SELECT id FROM public.company_users WHERE user_id = auth.uid())));

-- assessment_evaluations: read only via assessment access
CREATE POLICY "Users can read own evaluations v2" ON public.assessment_evaluations FOR SELECT
  USING (assessment_id IN (SELECT id FROM public.assessments WHERE employee_id = auth.uid() OR company_id = public.get_user_company_id()));

-- role_fit_results: read via assessment access (new table structure)
ALTER TABLE public.role_fit_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read role fit results v2" ON public.role_fit_results FOR SELECT
  USING (assessment_id IN (SELECT id FROM public.assessments WHERE employee_id = auth.uid() OR company_id = public.get_user_company_id()));

-- ============================================================
-- 1h. Indexes for new tables
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_assessment_responses_assessment ON public.assessment_responses(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_evaluations_assessment ON public.assessment_evaluations(assessment_id);
CREATE INDEX IF NOT EXISTS idx_role_fit_results_assessment ON public.role_fit_results(assessment_id);
