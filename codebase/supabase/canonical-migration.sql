-- ============================================================
-- AI Workforce Map — Canonical Database Migration
-- Reflects the ACTUAL live state of Supabase project rpqxsvqxwhzymnujmyun
-- as of 2026-03-10 after V1 migration + V2 migration + manual fixes.
--
-- THIS FILE IS THE SINGLE SOURCE OF TRUTH.
-- For a fresh Supabase project, run this file ONCE in SQL Editor.
-- For the existing live DB, DO NOT run this — use patch files instead.
--
-- Key differences from the original migration.sql:
--   - assessment_status is a Postgres ENUM (not TEXT CHECK)
--   - assessments does NOT have employee_id (uses company_user_id)
--   - Includes V2 tables: assessment_responses, assessment_evaluations
--   - role_fit_results uses assessment_id (not evaluation_id)
--   - company_users.user_id is nullable (supports anonymous employees)
--   - company_users.role allows 'employee' in addition to 'admin'/'member'
--   - RLS policies use company_user_id path (not employee_id)
--   - Role seed data uses 7-domain weights (not legacy 5-domain)
-- ============================================================

-- ============================================================
-- PART 0: Custom Types
-- ============================================================

CREATE TYPE assessment_status AS ENUM (
  'not_started',
  'in_progress',
  'paused',
  'grading',
  'complete',
  'failed'
);

-- ============================================================
-- PART 1: Helper Functions
-- ============================================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Get the company_id for the current authenticated user
CREATE OR REPLACE FUNCTION public.get_user_company_id()
RETURNS UUID AS $$
  SELECT company_id FROM public.company_users
  WHERE user_id = auth.uid()
  LIMIT 1
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Check if the current user is an admin of a given company
CREATE OR REPLACE FUNCTION public.is_company_admin(target_company_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.company_users
    WHERE company_id = target_company_id
      AND user_id = auth.uid()
      AND role = 'admin'
  )
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================
-- PART 2: Core Tables
-- ============================================================

-- Scenarios (assessment content — may also be loaded from markdown files)
CREATE TABLE IF NOT EXISTS public.scenarios (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  archetype       TEXT NOT NULL,
  module          TEXT NOT NULL,
  difficulty      TEXT NOT NULL CHECK (difficulty IN ('obvious', 'mixed', 'deceptive')),
  primary_domains TEXT[] NOT NULL DEFAULT '{}',
  secondary_domains TEXT[] DEFAULT '{}',
  target_roles    TEXT[] DEFAULT '{}',
  industry        TEXT,
  scenario_text   TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Rubrics (per-domain grading criteria for each scenario)
CREATE TABLE IF NOT EXISTS public.rubrics (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID NOT NULL REFERENCES public.scenarios(id) ON DELETE CASCADE,
  domain      TEXT NOT NULL,
  rubric_text TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Role definitions (5 AI workforce roles with 7-domain weight vectors)
CREATE TABLE IF NOT EXISTS public.roles (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT UNIQUE NOT NULL,
  label          TEXT NOT NULL,
  description    TEXT,
  domain_weights JSONB NOT NULL DEFAULT '{}',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- PART 3: Multi-Tenancy Tables
-- ============================================================

-- Companies (tenant root)
CREATE TABLE IF NOT EXISTS public.companies (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                    TEXT NOT NULL,
  slug                    TEXT UNIQUE,
  departments             TEXT[] DEFAULT '{}',
  ai_adoption_goals       TEXT[] DEFAULT '{}',
  risk_sensitivity        TEXT NOT NULL DEFAULT 'medium'
    CHECK (risk_sensitivity IN ('low', 'medium', 'high')),
  target_functions        TEXT[] DEFAULT '{}',
  expected_employee_count INTEGER,
  created_by              UUID REFERENCES auth.users(id),
  created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Company users (maps auth.users → companies with roles)
-- user_id is NULLABLE to support anonymous (link-based) assessments
CREATE TABLE IF NOT EXISTS public.company_users (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id          UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id             UUID REFERENCES auth.users(id) ON DELETE CASCADE,  -- nullable for anonymous
  role                TEXT NOT NULL DEFAULT 'member'
    CHECK (role IN ('admin', 'member', 'employee')),
  name                TEXT,
  title               TEXT,
  department          TEXT,
  years_experience    INTEGER,
  is_manager          BOOLEAN DEFAULT false,
  ai_exposure         TEXT DEFAULT 'none'
    CHECK (ai_exposure IN ('none', 'basic', 'moderate', 'advanced')),
  ambiguity_confidence INTEGER CHECK (ambiguity_confidence BETWEEN 1 AND 5),
  review_comfort       INTEGER CHECK (review_comfort BETWEEN 1 AND 5),
  current_tools        TEXT[] DEFAULT '{}',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assessment links (shareable URLs for employees to start assessments)
CREATE TABLE IF NOT EXISTS public.assessment_links (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id    UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  slug          TEXT UNIQUE NOT NULL,
  department    TEXT,
  max_uses      INTEGER,
  use_count     INTEGER DEFAULT 0,
  expires_at    TIMESTAMPTZ,
  is_active     BOOLEAN DEFAULT true,
  created_by    UUID REFERENCES auth.users(id),
  used_at       TIMESTAMPTZ,
  assessment_id UUID,  -- FK added after assessments table exists
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- PART 4: Assessment Tables
-- ============================================================

-- Assessments (core assessment record — one per employee per link)
-- NOTE: Uses assessment_status ENUM, NOT TEXT CHECK
-- NOTE: No employee_id column — uses company_user_id instead
CREATE TABLE IF NOT EXISTS public.assessments (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id               UUID REFERENCES public.companies(id),
  company_user_id          UUID REFERENCES public.company_users(id),
  link_id                  UUID REFERENCES public.assessment_links(id),
  status                   assessment_status NOT NULL DEFAULT 'in_progress',
  selected_scenario_ids    TEXT[] DEFAULT '{}',
  scenario_ids             TEXT[] NOT NULL DEFAULT '{}',
  current_scenario_index   INTEGER NOT NULL DEFAULT 0,
  started_at               TIMESTAMPTZ DEFAULT now(),
  completed_at             TIMESTAMPTZ,
  paused_at                TIMESTAMPTZ,
  elapsed_seconds          INTEGER DEFAULT 0,
  total_time_seconds       INTEGER,
  overall_score            INTEGER,
  readiness_band           TEXT,
  domain_scores            JSONB,
  role_scores              JSONB,
  recommended_role         TEXT,
  role_ranking             TEXT[],
  risk_flags               JSONB,
  training_track           TEXT,
  deployment_recommendation TEXT,
  upskill_recommendations  TEXT[],
  executive_summary        TEXT,
  graded_at                TIMESTAMPTZ,
  link_slug                TEXT,
  created_at               TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add FK from assessment_links back to assessments (circular dep)
ALTER TABLE public.assessment_links
  ADD CONSTRAINT assessment_links_assessment_id_fkey
  FOREIGN KEY (assessment_id) REFERENCES public.assessments(id);

-- Assessment responses (employee answers per scenario)
CREATE TABLE IF NOT EXISTS public.assessment_responses (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id      UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  scenario_id        TEXT NOT NULL,  -- SCN-001 style ID (scenarios are file-based)
  response_text      TEXT,
  followup_exchanges JSONB DEFAULT '[]',
  submitted_at       TIMESTAMPTZ,    -- null = draft, non-null = final
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(assessment_id, scenario_id)
);

-- Assessment evaluations (7-domain grading output per scenario)
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

-- Role fit results (one row per role per assessment)
CREATE TABLE IF NOT EXISTS public.role_fit_results (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id   UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  role_key        TEXT NOT NULL,
  fit_score       INTEGER NOT NULL CHECK (fit_score BETWEEN 0 AND 100),
  rank            INTEGER NOT NULL,
  is_recommended  BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- PART 5: Legacy Tables (kept for backward compatibility)
-- ============================================================

-- Evaluations (V1 grading output — replaced by assessment_evaluations)
CREATE TABLE IF NOT EXISTS public.evaluations (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id             UUID REFERENCES public.assessments(id) ON DELETE CASCADE,
  company_id                UUID REFERENCES public.companies(id),
  employee_name             TEXT,
  department                TEXT,
  readiness_band            TEXT CHECK (readiness_band IN ('not_ready','emerging','capable','strong','high_leverage')),
  readiness_score           INTEGER CHECK (readiness_score BETWEEN 0 AND 100),
  domain_scores             JSONB NOT NULL DEFAULT '{}',
  risk_flags                JSONB NOT NULL DEFAULT '[]',
  training_track            TEXT CHECK (training_track IN ('A','B','C','D')),
  deployment_recommendation TEXT,
  upskill_recommendations   TEXT[],
  executive_summary         TEXT,
  status                    TEXT NOT NULL DEFAULT 'complete'
    CHECK (status IN ('complete', 'failed')),
  created_at                TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Responses (V1 response storage — replaced by assessment_responses)
CREATE TABLE IF NOT EXISTS public.responses (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id       UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  scenario_id         UUID NOT NULL REFERENCES public.scenarios(id),
  raw_response        TEXT NOT NULL,
  followup_questions  JSONB NOT NULL DEFAULT '[]',
  time_spent_seconds  INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- PART 6: Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_assessments_company            ON public.assessments(company_id);
CREATE INDEX IF NOT EXISTS idx_assessments_company_user       ON public.assessments(company_user_id);
CREATE INDEX IF NOT EXISTS idx_assessments_status             ON public.assessments(status);
CREATE INDEX IF NOT EXISTS idx_responses_assessment           ON public.responses(assessment_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_company            ON public.evaluations(company_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_assessment         ON public.evaluations(assessment_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_band               ON public.evaluations(readiness_band);
CREATE INDEX IF NOT EXISTS idx_company_users_company           ON public.company_users(company_id);
CREATE INDEX IF NOT EXISTS idx_company_users_user              ON public.company_users(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_links_slug           ON public.assessment_links(slug);
CREATE INDEX IF NOT EXISTS idx_assessment_links_co             ON public.assessment_links(company_id);
CREATE INDEX IF NOT EXISTS idx_companies_slug                  ON public.companies(slug);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_assessment ON public.assessment_responses(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_evaluations_assessment ON public.assessment_evaluations(assessment_id);
CREATE INDEX IF NOT EXISTS idx_role_fit_results_assessment     ON public.role_fit_results(assessment_id);

-- ============================================================
-- PART 7: Updated_at Triggers
-- ============================================================

CREATE TRIGGER set_scenarios_updated_at
  BEFORE UPDATE ON public.scenarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_assessments_updated_at
  BEFORE UPDATE ON public.assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_evaluations_updated_at
  BEFORE UPDATE ON public.evaluations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_company_users_updated_at
  BEFORE UPDATE ON public.company_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- PART 8: Row Level Security — Enable
-- ============================================================

ALTER TABLE public.scenarios            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rubrics              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_users        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_links     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_fit_results     ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PART 9: RLS Policies
-- All employee-access policies use company_user_id path:
--   company_user_id IN (SELECT id FROM company_users WHERE user_id = auth.uid())
-- This supports both authenticated and anonymous flows.
-- The grading pipeline uses service_role (admin client) which bypasses RLS.
-- ============================================================

-- Scenarios: anyone can read published scenarios
CREATE POLICY "Anyone can read published scenarios"
  ON public.scenarios FOR SELECT
  USING (status = 'published');

-- Rubrics: authenticated users can read
CREATE POLICY "Authenticated users can read rubrics"
  ON public.rubrics FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Roles: authenticated users can read
CREATE POLICY "Authenticated users can read roles"
  ON public.roles FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Assessments: user can read own (via company_user_id); admin can read all company assessments
CREATE POLICY "Users can read own assessments"
  ON public.assessments FOR SELECT
  USING (
    company_user_id IN (
      SELECT id FROM public.company_users WHERE user_id = auth.uid()
    )
    OR company_id = public.get_user_company_id()
  );

CREATE POLICY "Authenticated users can insert assessments"
  ON public.assessments FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own assessments"
  ON public.assessments FOR UPDATE
  USING (
    company_user_id IN (
      SELECT id FROM public.company_users WHERE user_id = auth.uid()
    )
  );

-- Assessment responses: employees can manage own
CREATE POLICY "Users can manage own responses"
  ON public.assessment_responses FOR ALL
  USING (
    assessment_id IN (
      SELECT id FROM public.assessments
      WHERE company_user_id IN (
        SELECT id FROM public.company_users WHERE user_id = auth.uid()
      )
    )
  );

-- Assessment evaluations: read only via assessment access
CREATE POLICY "Users can read own evaluations v2"
  ON public.assessment_evaluations FOR SELECT
  USING (
    assessment_id IN (
      SELECT id FROM public.assessments
      WHERE company_user_id IN (
        SELECT id FROM public.company_users WHERE user_id = auth.uid()
      )
      OR company_id = public.get_user_company_id()
    )
  );

-- Role fit results: read via assessment access
CREATE POLICY "Users can read role fit results v2"
  ON public.role_fit_results FOR SELECT
  USING (
    assessment_id IN (
      SELECT id FROM public.assessments
      WHERE company_user_id IN (
        SELECT id FROM public.company_users WHERE user_id = auth.uid()
      )
      OR company_id = public.get_user_company_id()
    )
  );

-- Legacy responses: follow assessment access
CREATE POLICY "Users can read own responses"
  ON public.responses FOR SELECT
  USING (
    assessment_id IN (
      SELECT id FROM public.assessments
      WHERE company_user_id IN (
        SELECT id FROM public.company_users WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can insert responses"
  ON public.responses FOR INSERT
  WITH CHECK (
    assessment_id IN (
      SELECT id FROM public.assessments
      WHERE company_user_id IN (
        SELECT id FROM public.company_users WHERE user_id = auth.uid()
      )
    )
  );

-- Legacy evaluations: follow assessment access
CREATE POLICY "Users can read own evaluations"
  ON public.evaluations FOR SELECT
  USING (
    assessment_id IN (
      SELECT id FROM public.assessments
      WHERE company_user_id IN (
        SELECT id FROM public.company_users WHERE user_id = auth.uid()
      )
    )
    OR company_id = public.get_user_company_id()
  );

-- Companies: admins can read/update their own company
CREATE POLICY "Users can read own company"
  ON public.companies FOR SELECT
  USING (id = public.get_user_company_id());

CREATE POLICY "Admins can update own company"
  ON public.companies FOR UPDATE
  USING (public.is_company_admin(id));

CREATE POLICY "Authenticated users can create companies"
  ON public.companies FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Company users: members can see own company roster
CREATE POLICY "Users can read own company members"
  ON public.company_users FOR SELECT
  USING (company_id = public.get_user_company_id());

CREATE POLICY "Users can insert own profile"
  ON public.company_users FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON public.company_users FOR UPDATE
  USING (user_id = auth.uid());

-- Assessment links: admins can manage; anyone can read active links
CREATE POLICY "Admins can manage assessment links"
  ON public.assessment_links FOR ALL
  USING (public.is_company_admin(company_id));

CREATE POLICY "Anyone can read active links"
  ON public.assessment_links FOR SELECT
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

-- ============================================================
-- PART 10: Seed Data — Role Definitions (7-domain weights)
-- ============================================================

INSERT INTO public.roles (name, label, description, domain_weights) VALUES
  (
    'ai_operator',
    'AI Operator',
    'Day-to-day user of AI tools; executes tasks using AI assistance.',
    '{"task_framing": 0.20, "process_thinking": 0.15, "verification_instinct": 0.20, "exception_handling": 0.10, "risk_judgment": 0.10, "operational_consistency": 0.20, "change_leverage": 0.05}'::jsonb
  ),
  (
    'ai_approver',
    'AI Approver',
    'Reviews and approves AI-generated outputs before action.',
    '{"task_framing": 0.10, "process_thinking": 0.10, "verification_instinct": 0.30, "exception_handling": 0.15, "risk_judgment": 0.25, "operational_consistency": 0.05, "change_leverage": 0.05}'::jsonb
  ),
  (
    'workflow_translator',
    'Workflow Translator',
    'Redesigns processes to incorporate AI capabilities.',
    '{"task_framing": 0.25, "process_thinking": 0.25, "verification_instinct": 0.10, "exception_handling": 0.10, "risk_judgment": 0.10, "operational_consistency": 0.10, "change_leverage": 0.10}'::jsonb
  ),
  (
    'ai_qa_reviewer',
    'AI QA Reviewer',
    'Audits AI outputs for quality, accuracy, and bias.',
    '{"task_framing": 0.05, "process_thinking": 0.10, "verification_instinct": 0.30, "exception_handling": 0.20, "risk_judgment": 0.25, "operational_consistency": 0.05, "change_leverage": 0.05}'::jsonb
  ),
  (
    'change_champion',
    'Change Champion',
    'Drives AI adoption and change management within teams.',
    '{"task_framing": 0.10, "process_thinking": 0.10, "verification_instinct": 0.05, "exception_handling": 0.05, "risk_judgment": 0.10, "operational_consistency": 0.10, "change_leverage": 0.50}'::jsonb
  )
ON CONFLICT (name) DO NOTHING;
