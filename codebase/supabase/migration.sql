-- ============================================================
-- AI Workforce Map — Full Database Migration
-- Run this SQL in Supabase SQL Editor (Dashboard > SQL Editor)
-- Supabase Project: rpqxsvqxwhzymnujmyun
-- ============================================================

-- ============================================================
-- PART 1: Core Assessment Tables
-- ============================================================

-- Updated_at helper function (needed by triggers)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Scenarios table
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

-- Rubrics table
CREATE TABLE IF NOT EXISTS public.rubrics (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id UUID NOT NULL REFERENCES public.scenarios(id) ON DELETE CASCADE,
  domain      TEXT NOT NULL,
  rubric_text TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Role definitions table
CREATE TABLE IF NOT EXISTS public.roles (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT UNIQUE NOT NULL,
  label          TEXT NOT NULL,
  description    TEXT,
  domain_weights JSONB NOT NULL DEFAULT '{}',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assessments table
CREATE TABLE IF NOT EXISTS public.assessments (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id             UUID,  -- set after companies table exists; FK added below
  employee_id            UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status                 TEXT NOT NULL DEFAULT 'in_progress'
    CHECK (status IN ('in_progress', 'grading', 'complete', 'failed')),
  scenario_ids           TEXT[] NOT NULL DEFAULT '{}',
  current_scenario_index INTEGER NOT NULL DEFAULT 0,
  started_at             TIMESTAMPTZ DEFAULT now(),
  completed_at           TIMESTAMPTZ,
  total_time_seconds     INTEGER,
  link_slug              TEXT,  -- references assessment_links.slug
  created_at             TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Responses table
CREATE TABLE IF NOT EXISTS public.responses (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id       UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  scenario_id         UUID NOT NULL REFERENCES public.scenarios(id),
  raw_response        TEXT NOT NULL,
  followup_questions  JSONB NOT NULL DEFAULT '[]',
  time_spent_seconds  INTEGER DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Evaluations (grading output per assessment)
CREATE TABLE IF NOT EXISTS public.evaluations (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id             UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  company_id                UUID,  -- denormalized for easy filtering
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

-- Role fit results (one row per role per evaluation)
CREATE TABLE IF NOT EXISTS public.role_fit_results (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evaluation_id UUID NOT NULL REFERENCES public.evaluations(id) ON DELETE CASCADE,
  role          TEXT NOT NULL,
  score         INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- PART 2: Multi-Tenancy & Admin Tables
-- ============================================================

-- Companies table
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
CREATE TABLE IF NOT EXISTS public.company_users (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id          UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role                TEXT NOT NULL DEFAULT 'member'
    CHECK (role IN ('admin', 'member')),
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
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(company_id, user_id)
);

-- Assessment links (shareable URLs for employees)
CREATE TABLE IF NOT EXISTS public.assessment_links (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id  UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  slug        TEXT UNIQUE NOT NULL,
  department  TEXT,
  max_uses    INTEGER,
  use_count   INTEGER DEFAULT 0,
  expires_at  TIMESTAMPTZ,
  is_active   BOOLEAN DEFAULT true,
  created_by  UUID REFERENCES auth.users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- PART 3: Foreign Key Additions (after tables exist)
-- ============================================================

-- Add company_id FK to assessments
ALTER TABLE public.assessments
  ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.companies(id);

-- Add company_id FK to evaluations
ALTER TABLE public.evaluations
  ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.companies(id);

-- ============================================================
-- PART 4: Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_assessments_company    ON public.assessments(company_id);
CREATE INDEX IF NOT EXISTS idx_assessments_employee   ON public.assessments(employee_id);
CREATE INDEX IF NOT EXISTS idx_assessments_status     ON public.assessments(status);
CREATE INDEX IF NOT EXISTS idx_responses_assessment   ON public.responses(assessment_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_company    ON public.evaluations(company_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_assessment ON public.evaluations(assessment_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_band       ON public.evaluations(readiness_band);
CREATE INDEX IF NOT EXISTS idx_role_fit_evaluation    ON public.role_fit_results(evaluation_id);
CREATE INDEX IF NOT EXISTS idx_company_users_company  ON public.company_users(company_id);
CREATE INDEX IF NOT EXISTS idx_company_users_user     ON public.company_users(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_links_slug  ON public.assessment_links(slug);
CREATE INDEX IF NOT EXISTS idx_assessment_links_co    ON public.assessment_links(company_id);
CREATE INDEX IF NOT EXISTS idx_companies_slug         ON public.companies(slug);

-- ============================================================
-- PART 5: Updated_at Triggers
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
-- PART 6: Row Level Security (RLS)
-- ============================================================

ALTER TABLE public.scenarios         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rubrics           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_fit_results  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_users     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_links  ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PART 7: Helper Functions
-- ============================================================

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
-- PART 8: RLS Policies
-- ============================================================

-- Scenarios: public read (anyone can read published scenarios)
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

-- Assessments: employee can read own; company admin can read all company assessments
CREATE POLICY "Users can read own assessments"
  ON public.assessments FOR SELECT
  USING (
    employee_id = auth.uid()
    OR company_id = public.get_user_company_id()
  );

CREATE POLICY "Authenticated users can insert assessments"
  ON public.assessments FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own assessments"
  ON public.assessments FOR UPDATE
  USING (employee_id = auth.uid());

-- Responses: employee can read/write own responses
CREATE POLICY "Users can read own responses"
  ON public.responses FOR SELECT
  USING (
    assessment_id IN (
      SELECT id FROM public.assessments WHERE employee_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert responses"
  ON public.responses FOR INSERT
  WITH CHECK (
    assessment_id IN (
      SELECT id FROM public.assessments WHERE employee_id = auth.uid()
    )
  );

-- Evaluations: employee can read own; admin can read company evaluations
CREATE POLICY "Users can read own evaluations"
  ON public.evaluations FOR SELECT
  USING (
    assessment_id IN (
      SELECT id FROM public.assessments WHERE employee_id = auth.uid()
    )
    OR company_id = public.get_user_company_id()
  );

-- Role fit results: follow evaluation access
CREATE POLICY "Users can read role fit results"
  ON public.role_fit_results FOR SELECT
  USING (
    evaluation_id IN (
      SELECT e.id FROM public.evaluations e
      JOIN public.assessments a ON a.id = e.assessment_id
      WHERE a.employee_id = auth.uid()
         OR e.company_id = public.get_user_company_id()
    )
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

-- Assessment links: admins can manage; anyone can read active links (for intake)
CREATE POLICY "Admins can manage assessment links"
  ON public.assessment_links FOR ALL
  USING (public.is_company_admin(company_id));

CREATE POLICY "Anyone can read active links"
  ON public.assessment_links FOR SELECT
  USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

-- ============================================================
-- PART 9: Seed Data — Role Definitions
-- ============================================================

INSERT INTO public.roles (name, label, description, domain_weights) VALUES
  (
    'ai_operator',
    'AI Operator',
    'Day-to-day user of AI tools; executes tasks using AI assistance.',
    '{"promptComprehension": 0.30, "aiCollaboration": 0.30, "criticalEvaluation": 0.15, "ethicsAndBias": 0.10, "practicalApplication": 0.15}'::jsonb
  ),
  (
    'ai_approver',
    'AI Approver',
    'Reviews and approves AI-generated outputs before action.',
    '{"promptComprehension": 0.15, "aiCollaboration": 0.15, "criticalEvaluation": 0.35, "ethicsAndBias": 0.20, "practicalApplication": 0.15}'::jsonb
  ),
  (
    'workflow_translator',
    'Workflow Translator',
    'Redesigns processes to incorporate AI capabilities.',
    '{"promptComprehension": 0.20, "aiCollaboration": 0.25, "criticalEvaluation": 0.20, "ethicsAndBias": 0.10, "practicalApplication": 0.25}'::jsonb
  ),
  (
    'ai_qa_reviewer',
    'AI QA Reviewer',
    'Audits AI outputs for quality, accuracy, and bias.',
    '{"promptComprehension": 0.15, "aiCollaboration": 0.10, "criticalEvaluation": 0.35, "ethicsAndBias": 0.30, "practicalApplication": 0.10}'::jsonb
  ),
  (
    'change_champion',
    'Change Champion',
    'Drives AI adoption and change management within teams.',
    '{"promptComprehension": 0.15, "aiCollaboration": 0.20, "criticalEvaluation": 0.15, "ethicsAndBias": 0.15, "practicalApplication": 0.35}'::jsonb
  )
ON CONFLICT (name) DO NOTHING;
