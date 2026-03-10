-- ============================================================
-- AI Workforce Map — RLS Patch: Fix employee_id References
-- Run this in Supabase SQL Editor against the LIVE database.
--
-- Problem: V1 and V2 RLS policies reference assessments.employee_id,
-- but that column does NOT EXIST in the live DB. The correct path
-- is through company_user_id → company_users.user_id.
--
-- This patch drops the broken policies and recreates them correctly.
-- Safe to run multiple times (DROP IF EXISTS pattern).
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. Drop broken V1 policies on assessments
-- ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can read own assessments" ON public.assessments;
DROP POLICY IF EXISTS "Users can update own assessments" ON public.assessments;

-- ────────────────────────────────────────────────────────────
-- 2. Drop broken V1 policies on responses (legacy table)
-- ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can read own responses" ON public.responses;
DROP POLICY IF EXISTS "Users can insert responses" ON public.responses;

-- ────────────────────────────────────────────────────────────
-- 3. Drop broken V1 policies on evaluations (legacy table)
-- ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can read own evaluations" ON public.evaluations;

-- ────────────────────────────────────────────────────────────
-- 4. Drop broken V1 policies on role_fit_results
--    (V1 version was dropped when table was recreated in V2,
--     but drop just in case)
-- ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can read role fit results" ON public.role_fit_results;

-- ────────────────────────────────────────────────────────────
-- 5. Drop broken V2 policies (these reference employee_id too)
-- ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can manage own responses" ON public.assessment_responses;
DROP POLICY IF EXISTS "Users can read own evaluations v2" ON public.assessment_evaluations;
DROP POLICY IF EXISTS "Users can read role fit results v2" ON public.role_fit_results;

-- ────────────────────────────────────────────────────────────
-- 6. Recreate all policies using company_user_id path
-- ────────────────────────────────────────────────────────────

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

-- Legacy responses: read own
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

-- Legacy responses: insert own
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

-- Legacy evaluations: read own + admin
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
