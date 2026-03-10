-- ============================================================
-- AI Workforce Map — RLS Patch: Fix employee_id References
-- Run this in Supabase SQL Editor against the LIVE database.
--
-- This patch is split into blocks. If any block fails, you can
-- run the remaining blocks independently.
--
-- SAFE to run multiple times (DROP IF EXISTS + IF NOT EXISTS).
-- ============================================================


-- ════════════════════════════════════════════════════════════
-- BLOCK 1: Drop all potentially broken policies
-- (These all use DROP IF EXISTS — will silently skip if missing)
-- ════════════════════════════════════════════════════════════

-- V1 policies on assessments
DROP POLICY IF EXISTS "Users can read own assessments" ON public.assessments;
DROP POLICY IF EXISTS "Users can update own assessments" ON public.assessments;

-- V2 policies on new tables
DROP POLICY IF EXISTS "Users can manage own responses" ON public.assessment_responses;
DROP POLICY IF EXISTS "Users can read own evaluations v2" ON public.assessment_evaluations;
DROP POLICY IF EXISTS "Users can read role fit results v2" ON public.role_fit_results;
DROP POLICY IF EXISTS "Users can read role fit results" ON public.role_fit_results;

-- V1 policies on legacy tables (may or may not exist)
DROP POLICY IF EXISTS "Users can read own responses" ON public.responses;
DROP POLICY IF EXISTS "Users can insert responses" ON public.responses;
DROP POLICY IF EXISTS "Users can read own evaluations" ON public.evaluations;


-- ════════════════════════════════════════════════════════════
-- BLOCK 2: Recreate policies for ACTIVE tables (used by runtime)
-- ════════════════════════════════════════════════════════════

-- Assessments: read own + admin reads company
CREATE POLICY "Users can read own assessments"
  ON public.assessments FOR SELECT
  USING (
    company_user_id IN (
      SELECT id FROM public.company_users WHERE user_id = auth.uid()
    )
    OR company_id = public.get_user_company_id()
  );

-- Assessments: update own
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

-- Assessment evaluations: read via assessment access
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


-- ════════════════════════════════════════════════════════════
-- BLOCK 3 (OPTIONAL): Legacy table policies
-- The responses and evaluations tables are V1 legacy — not
-- used by the current runtime code. These policies only matter
-- if those tables have the expected columns. Skip if errors.
-- ════════════════════════════════════════════════════════════

-- Only run these if your evaluations table has assessment_id and company_id columns:
-- CREATE POLICY "Users can read own evaluations"
--   ON public.evaluations FOR SELECT
--   USING (
--     assessment_id IN (
--       SELECT id FROM public.assessments
--       WHERE company_user_id IN (
--         SELECT id FROM public.company_users WHERE user_id = auth.uid()
--       )
--     )
--     OR company_id = public.get_user_company_id()
--   );

-- Only run these if your responses table has assessment_id column:
-- CREATE POLICY "Users can read own responses"
--   ON public.responses FOR SELECT
--   USING (
--     assessment_id IN (
--       SELECT id FROM public.assessments
--       WHERE company_user_id IN (
--         SELECT id FROM public.company_users WHERE user_id = auth.uid()
--       )
--     )
--   );
--
-- CREATE POLICY "Users can insert responses"
--   ON public.responses FOR INSERT
--   WITH CHECK (
--     assessment_id IN (
--       SELECT id FROM public.assessments
--       WHERE company_user_id IN (
--         SELECT id FROM public.company_users WHERE user_id = auth.uid()
--       )
--     )
--   );
