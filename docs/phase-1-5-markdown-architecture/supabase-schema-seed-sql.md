# Supabase Schema + Seed SQL

**Notion URL:** https://www.notion.so/31ed807b91118145afb0c046461b8bd4

---

## Schema SQL
```sql
-- =============================================================================
-- AI Workforce Map — Supabase Schema
-- Phase 1.5: Content Index + Assessment Pipeline Tables
-- Version: 1.0.0
-- Date: 2026-03-09
-- =============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- ENUM TYPES
-- =============================================================================

CREATE TYPE scenario_archetype AS ENUM (
  'automation-boundary',
  'instruction-rewrite',
  'output-comparison',
  'hidden-error-review',
  'missing-context',
  'workflow-handoff',
  'escalation-judgment',
  'stakeholder-pressure',
  'exception-handling',
  'adoption-communication',
  'policy-adherence',
  'drift-detection'
);

CREATE TYPE domain_slug AS ENUM (
  'task-framing',
  'process-thinking',
  'verification-instinct',
  'exception-handling',
  'risk-judgment',
  'operational-consistency',
  'change-leverage'
);

CREATE TYPE role_slug AS ENUM (
  'ai-operator',
  'ai-approver',
  'workflow-translator',
  'qa-risk-reviewer',
  'change-champion'
);

CREATE TYPE content_status AS ENUM (
  'draft',
  'review',
  'published',
  'archived'
);

CREATE TYPE assessment_status AS ENUM (
  'not_started',
  'in_progress',
  'completed',
  'expired',
  'cancelled'
);

CREATE TYPE response_status AS ENUM (
  'pending',
  'submitted',
  'graded',
  'review_flagged'
);

-- =============================================================================
-- TABLE 1: scenarios
-- =============================================================================

CREATE TABLE scenarios (
  id              TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  version         TEXT NOT NULL DEFAULT '1.0.0',
  archetype       scenario_archetype NOT NULL,
  module          SMALLINT NOT NULL CHECK (module BETWEEN 1 AND 6),
  difficulty      SMALLINT NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
  industry        TEXT NOT NULL,
  primary_domains   domain_slug[] NOT NULL,
  secondary_domains domain_slug[] NOT NULL,
  target_roles      role_slug[] NOT NULL,
  status          content_status NOT NULL DEFAULT 'draft',
  variant_of      TEXT REFERENCES scenarios(id),
  file_path       TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT scenarios_primary_domains_not_empty CHECK (array_length(primary_domains, 1) >= 1),
  CONSTRAINT scenarios_secondary_domains_not_empty CHECK (array_length(secondary_domains, 1) >= 1),
  CONSTRAINT scenarios_target_roles_not_empty CHECK (array_length(target_roles, 1) >= 1),
  CONSTRAINT scenarios_id_format CHECK (id ~ '^SCN-[0-9]{3}$'),
  CONSTRAINT scenarios_slug_format CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

CREATE INDEX idx_scenarios_archetype ON scenarios(archetype);
CREATE INDEX idx_scenarios_difficulty ON scenarios(difficulty);
CREATE INDEX idx_scenarios_module ON scenarios(module);
CREATE INDEX idx_scenarios_status ON scenarios(status);
CREATE INDEX idx_scenarios_variant_of ON scenarios(variant_of);
CREATE INDEX idx_scenarios_primary_domains ON scenarios USING GIN(primary_domains);
CREATE INDEX idx_scenarios_target_roles ON scenarios USING GIN(target_roles);

-- =============================================================================
-- TABLE 2: rubrics
-- =============================================================================

CREATE TABLE rubrics (
  id              TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            domain_slug NOT NULL UNIQUE,
  version         TEXT NOT NULL DEFAULT '1.0.0',
  status          content_status NOT NULL DEFAULT 'draft',
  file_path       TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT rubrics_id_format CHECK (id ~ '^RUB-[0-9]{3}$')
);

-- =============================================================================
-- TABLE 3: roles
-- =============================================================================

CREATE TABLE roles (
  id              TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            role_slug NOT NULL UNIQUE,
  version         TEXT NOT NULL DEFAULT '1.0.0',
  status          content_status NOT NULL DEFAULT 'draft',
  file_path       TEXT NOT NULL,
  domain_weights  JSONB NOT NULL,
  min_thresholds  JSONB NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT roles_id_format CHECK (id ~ '^ROLE-[0-9]{3}$')
);

-- =============================================================================
-- TABLE 4: assessments
-- =============================================================================

CREATE TABLE assessments (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employee_email  TEXT NOT NULL,
  employee_name   TEXT,
  organization_id TEXT,
  scenario_ids    TEXT[] NOT NULL,
  total_scenarios SMALLINT NOT NULL,
  status          assessment_status NOT NULL DEFAULT 'not_started',
  current_index   SMALLINT NOT NULL DEFAULT 0,
  started_at      TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  expires_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT assessments_scenario_ids_not_empty CHECK (array_length(scenario_ids, 1) >= 1),
  CONSTRAINT assessments_total_matches CHECK (total_scenarios = array_length(scenario_ids, 1)),
  CONSTRAINT assessments_index_valid CHECK (current_index >= 0 AND current_index = 0)
);

CREATE INDEX idx_responses_assessment ON responses(assessment_id);
CREATE INDEX idx_responses_scenario ON responses(scenario_id);
CREATE INDEX idx_responses_status ON responses(status);

-- =============================================================================
-- TABLE 6: evaluations
-- =============================================================================

CREATE TABLE evaluations (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  response_id     UUID NOT NULL REFERENCES responses(id) ON DELETE CASCADE,
  domain          domain_slug NOT NULL,
  domain_level    TEXT NOT NULL CHECK (domain_level IN ('primary', 'secondary', 'tertiary')),
  raw_score       SMALLINT NOT NULL CHECK (raw_score BETWEEN 0 AND 4),
  confidence      REAL CHECK (confidence BETWEEN 0.0 AND 1.0),
  justification   TEXT,
  evidence_quotes TEXT[],
  contradiction_penalty   BOOLEAN NOT NULL DEFAULT FALSE,
  reasoning_absence       BOOLEAN NOT NULL DEFAULT FALSE,
  pressure_capitulation   BOOLEAN NOT NULL DEFAULT FALSE,
  modifier_adjusted_score REAL,
  grader_model    TEXT,
  grader_version  TEXT,
  graded_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT evaluations_unique_per_domain UNIQUE (response_id, domain)
);

CREATE INDEX idx_evaluations_response ON evaluations(response_id);
CREATE INDEX idx_evaluations_domain ON evaluations(domain);

-- =============================================================================
-- TABLE 7: role_fit_results
-- =============================================================================

CREATE TABLE role_fit_results (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id   UUID NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  role            role_slug NOT NULL,
  domain_scores   JSONB NOT NULL,
  weighted_score  REAL NOT NULL,
  gating_passed   BOOLEAN NOT NULL,
  gates_failed    TEXT[],
  final_score     REAL NOT NULL,
  readiness_band  TEXT NOT NULL CHECK (readiness_band IN (
    'strong-fit', 'moderate-fit', 'developing', 'not-ready', 'gated-out'
  )),
  computed_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  pipeline_version TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT role_fit_unique_per_assessment UNIQUE (assessment_id, role)
);

CREATE INDEX idx_role_fit_assessment ON role_fit_results(assessment_id);
CREATE INDEX idx_role_fit_role ON role_fit_results(role);
CREATE INDEX idx_role_fit_band ON role_fit_results(readiness_band);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_fit_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE rubrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "scenarios_read_published" ON scenarios
  FOR SELECT USING (status = 'published');

CREATE POLICY "rubrics_read_published" ON rubrics
  FOR SELECT USING (status = 'published');

CREATE POLICY "roles_read_published" ON roles
  FOR SELECT USING (status = 'published');

CREATE POLICY "assessments_own_read" ON assessments
  FOR SELECT USING (employee_email = current_setting('request.jwt.claims', true)::jsonb->>'email');

CREATE POLICY "responses_own_read" ON responses
  FOR SELECT USING (
    assessment_id IN (
      SELECT id FROM assessments
      WHERE employee_email = current_setting('request.jwt.claims', true)::jsonb->>'email'
    )
  );

CREATE POLICY "evaluations_own_read" ON evaluations
  FOR SELECT USING (
    response_id IN (
      SELECT r.id FROM responses r
      JOIN assessments a ON r.assessment_id = a.id
      WHERE a.employee_email = current_setting('request.jwt.claims', true)::jsonb->>'email'
    )
  );

CREATE POLICY "role_fit_own_read" ON role_fit_results
  FOR SELECT USING (
    assessment_id IN (
      SELECT id FROM assessments
      WHERE employee_email = current_setting('request.jwt.claims', true)::jsonb->>'email'
    )
  );

-- =============================================================================
-- UPDATED_AT TRIGGER
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_scenarios_updated_at
  BEFORE UPDATE ON scenarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_rubrics_updated_at
  BEFORE UPDATE ON rubrics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_roles_updated_at
  BEFORE UPDATE ON roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_assessments_updated_at
  BEFORE UPDATE ON assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_responses_updated_at
  BEFORE UPDATE ON responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```
## Seed SQL
```sql
-- =============================================================================
-- AI Workforce Map — Supabase Seed Data
-- Populates scenarios, rubrics, and roles tables from content files
-- Version: 1.0.0
-- Date: 2026-03-09
-- =============================================================================

-- SEED: rubrics (7 domains)
INSERT INTO rubrics (id, title, slug, version, status, file_path) VALUES
  ('RUB-001', 'Task Framing',             'task-framing',             '1.0.0', 'published', 'content/rubrics/task-framing.md'),
  ('RUB-002', 'Process Thinking',         'process-thinking',         '1.0.0', 'published', 'content/rubrics/process-thinking.md'),
  ('RUB-003', 'Verification Instinct',    'verification-instinct',    '1.0.0', 'published', 'content/rubrics/verification-instinct.md'),
  ('RUB-004', 'Exception Handling',        'exception-handling',       '1.0.0', 'published', 'content/rubrics/exception-handling.md'),
  ('RUB-005', 'Risk Judgment',            'risk-judgment',            '1.0.0', 'published', 'content/rubrics/risk-judgment.md'),
  ('RUB-006', 'Operational Consistency',   'operational-consistency',  '1.0.0', 'published', 'content/rubrics/operational-consistency.md'),
  ('RUB-007', 'Change Leverage',          'change-leverage',          '1.0.0', 'published', 'content/rubrics/change-leverage.md');

-- SEED: roles (5 AI-adjacent roles)
INSERT INTO roles (id, title, slug, version, status, file_path, domain_weights, min_thresholds) VALUES
  ('ROLE-001', 'AI Operator', 'ai-operator', '1.0.0', 'published',
   'content/roles/ai-operator.md',
   '{"task-framing": 0.10, "process-thinking": 0.20, "verification-instinct": 0.20, "exception-handling": 0.12, "risk-judgment": 0.05, "operational-consistency": 0.30, "change-leverage": 0.03}'::jsonb,
   '{"task-framing": 40, "process-thinking": 50, "verification-instinct": 50, "exception-handling": 40, "risk-judgment": 35, "operational-consistency": 65, "change-leverage": 20}'::jsonb),

  ('ROLE-002', 'AI Approver', 'ai-approver', '1.0.0', 'published',
   'content/roles/ai-approver.md',
   '{"task-framing": 0.08, "process-thinking": 0.08, "verification-instinct": 0.25, "exception-handling": 0.18, "risk-judgment": 0.25, "operational-consistency": 0.12, "change-leverage": 0.04}'::jsonb,
   '{"task-framing": 40, "process-thinking": 40, "verification-instinct": 65, "exception-handling": 55, "risk-judgment": 60, "operational-consistency": 50, "change-leverage": 25}'::jsonb),

  ('ROLE-003', 'Workflow Translator', 'workflow-translator', '1.0.0', 'published',
   'content/roles/workflow-translator.md',
   '{"task-framing": 0.25, "process-thinking": 0.25, "verification-instinct": 0.08, "exception-handling": 0.15, "risk-judgment": 0.15, "operational-consistency": 0.05, "change-leverage": 0.07}'::jsonb,
   '{"task-framing": 65, "process-thinking": 70, "verification-instinct": 45, "exception-handling": 55, "risk-judgment": 55, "operational-consistency": 40, "change-leverage": 40}'::jsonb),

  ('ROLE-004', 'QA / Risk Reviewer', 'qa-risk-reviewer', '1.0.0', 'published',
   'content/roles/qa-risk-reviewer.md',
   '{"task-framing": 0.05, "process-thinking": 0.12, "verification-instinct": 0.30, "exception-handling": 0.18, "risk-judgment": 0.22, "operational-consistency": 0.10, "change-leverage": 0.03}'::jsonb,
   '{"task-framing": 40, "process-thinking": 50, "verification-instinct": 75, "exception-handling": 60, "risk-judgment": 65, "operational-consistency": 50, "change-leverage": 25}'::jsonb),

  ('ROLE-005', 'Change Champion', 'change-champion', '1.0.0', 'published',
   'content/roles/change-champion.md',
   '{"task-framing": 0.12, "process-thinking": 0.08, "verification-instinct": 0.08, "exception-handling": 0.08, "risk-judgment": 0.12, "operational-consistency": 0.12, "change-leverage": 0.40}'::jsonb,
   '{"task-framing": 45, "process-thinking": 40, "verification-instinct": 35, "exception-handling": 35, "risk-judgment": 40, "operational-consistency": 40, "change-leverage": 70}'::jsonb);

-- SEED: scenarios — 12 base scenarios
INSERT INTO scenarios (id, title, slug, version, archetype, module, difficulty, industry, primary_domains, secondary_domains, target_roles, status, variant_of, file_path) VALUES
  ('SCN-001', 'Automation Boundary', 'automation-boundary', '1.0.0',
   'automation-boundary', 2, 3, 'insurance',
   ARRAY['risk-judgment', 'process-thinking']::domain_slug[],
   ARRAY['task-framing', 'operational-consistency']::domain_slug[],
   ARRAY['ai-operator', 'workflow-translator', 'ai-approver']::role_slug[],
   'published', NULL,
   'content/scenarios/base/SCN-001-automation-boundary.md'),

  ('SCN-002', 'Instruction Rewrite', 'instruction-rewrite', '1.0.0',
   'instruction-rewrite', 1, 1, 'marketing',
   ARRAY['task-framing']::domain_slug[],
   ARRAY['process-thinking', 'risk-judgment']::domain_slug[],
   ARRAY['ai-operator', 'workflow-translator']::role_slug[],
   'published', NULL,
   'content/scenarios/base/SCN-002-instruction-rewrite.md'),

  ('SCN-003', 'Output Comparison', 'output-comparison', '1.0.0',
   'output-comparison', 3, 2, 'legal',
   ARRAY['verification-instinct', 'risk-judgment']::domain_slug[],
   ARRAY['task-framing', 'exception-handling']::domain_slug[],
   ARRAY['ai-approver', 'qa-risk-reviewer']::role_slug[],
   'published', NULL,
   'content/scenarios/base/SCN-003-output-comparison.md'),

  ('SCN-004', 'Hidden Error Review', 'hidden-error-review', '1.0.0',
   'hidden-error-review', 3, 3, 'healthcare',
   ARRAY['verification-instinct', 'exception-handling']::domain_slug[],
   ARRAY['risk-judgment', 'process-thinking']::domain_slug[],
   ARRAY['ai-approver', 'qa-risk-reviewer']::role_slug[],
   'published', NULL,
   'content/scenarios/base/SCN-004-hidden-error-review.md'),

  ('SCN-005', 'Missing Context', 'missing-context', '1.0.0',
   'missing-context', 1, 2, 'financial-services',
   ARRAY['task-framing', 'exception-handling']::domain_slug[],
   ARRAY['verification-instinct', 'risk-judgment']::domain_slug[],
   ARRAY['ai-operator', 'workflow-translator', 'ai-approver']::role_slug[],
   'published', NULL,
   'content/scenarios/base/SCN-005-missing-context.md'),

  ('SCN-006', 'Workflow Handoff', 'workflow-handoff', '1.0.0',
   'workflow-handoff', 2, 3, 'e-commerce',
   ARRAY['process-thinking', 'task-framing']::domain_slug[],
   ARRAY['operational-consistency', 'change-leverage']::domain_slug[],
   ARRAY['workflow-translator', 'ai-operator']::role_slug[],
   'published', NULL,
   'content/scenarios/base/SCN-006-workflow-handoff.md'),

  ('SCN-007', 'The Ambiguous Drug-Interaction Flag', 'escalation-judgment', '1.0.0',
   'escalation-judgment', 4, 3, 'pharmaceutical',
   ARRAY['exception-handling', 'risk-judgment']::domain_slug[],
   ARRAY['operational-consistency']::domain_slug[],
   ARRAY['ai-approver', 'qa-risk-reviewer']::role_slug[],
   'published', NULL,
   'content/scenarios/base/SCN-007-escalation-judgment.md'),

  ('SCN-008', 'The Partner''s Deadline', 'stakeholder-pressure', '1.0.0',
   'stakeholder-pressure', 5, 4, 'consulting',
   ARRAY['risk-judgment', 'verification-instinct']::domain_slug[],
   ARRAY['exception-handling', 'change-leverage']::domain_slug[],
   ARRAY['ai-approver', 'qa-risk-reviewer', 'change-champion']::role_slug[],
   'published', NULL,
   'content/scenarios/base/SCN-008-stakeholder-pressure.md'),

  ('SCN-009', 'The Inventory Conflict', 'exception-handling', '1.0.0',
   'exception-handling', 4, 4, 'logistics',
   ARRAY['exception-handling', 'process-thinking']::domain_slug[],
   ARRAY['risk-judgment', 'operational-consistency']::domain_slug[],
   ARRAY['workflow-translator', 'qa-risk-reviewer']::role_slug[],
   'published', NULL,
   'content/scenarios/base/SCN-009-exception-handling.md'),

  ('SCN-010', 'The Reluctant Auditors', 'adoption-communication', '1.0.0',
   'adoption-communication', 6, 3, 'accounting',
   ARRAY['change-leverage']::domain_slug[],
   ARRAY['risk-judgment', 'task-framing']::domain_slug[],
   ARRAY['change-champion', 'workflow-translator']::role_slug[],
   'published', NULL,
   'content/scenarios/base/SCN-010-adoption-communication.md'),

  ('SCN-011', 'The Letter and the Spirit', 'policy-adherence', '1.0.0',
   'policy-adherence', 5, 4, 'government',
   ARRAY['operational-consistency', 'risk-judgment']::domain_slug[],
   ARRAY['verification-instinct', 'change-leverage']::domain_slug[],
   ARRAY['ai-operator', 'ai-approver', 'qa-risk-reviewer']::role_slug[],
   'published', NULL,
   'content/scenarios/base/SCN-011-policy-adherence.md'),

  ('SCN-012', 'The Slow Decline', 'drift-detection', '1.0.0',
   'drift-detection', 6, 5, 'telecommunications',
   ARRAY['operational-consistency', 'change-leverage']::domain_slug[],
   ARRAY['verification-instinct', 'exception-handling', 'process-thinking']::domain_slug[],
   ARRAY['qa-risk-reviewer', 'change-champion', 'workflow-translator']::role_slug[],
   'published', NULL,
   'content/scenarios/base/SCN-012-drift-detection.md');

-- SEED: scenarios — 12 variant scenarios
INSERT INTO scenarios (id, title, slug, version, archetype, module, difficulty, industry, primary_domains, secondary_domains, target_roles, status, variant_of, file_path) VALUES
  ('SCN-013', 'The Triage Line', 'automation-boundary-healthcare', '1.0.0',
   'automation-boundary', 2, 3, 'healthcare',
   ARRAY['risk-judgment', 'process-thinking']::domain_slug[],
   ARRAY['task-framing', 'operational-consistency']::domain_slug[],
   ARRAY['ai-operator', 'workflow-translator', 'ai-approver']::role_slug[],
   'published', 'SCN-001',
   'content/scenarios/variants/SCN-013-automation-boundary-healthcare.md'),

  ('SCN-014', 'The Job Description Overhaul', 'instruction-rewrite-hr', '1.0.0',
   'instruction-rewrite', 1, 1, 'hr',
   ARRAY['task-framing']::domain_slug[],
   ARRAY['process-thinking', 'risk-judgment']::domain_slug[],
   ARRAY['ai-operator', 'workflow-translator']::role_slug[],
   'published', 'SCN-002',
   'content/scenarios/variants/SCN-014-instruction-rewrite-hr.md'),

  ('SCN-015', 'The Appraisal Reports', 'output-comparison-real-estate', '1.0.0',
   'output-comparison', 3, 2, 'real-estate',
   ARRAY['verification-instinct', 'risk-judgment']::domain_slug[],
   ARRAY['task-framing', 'exception-handling']::domain_slug[],
   ARRAY['ai-approver', 'qa-risk-reviewer']::role_slug[],
   'published', 'SCN-003',
   'content/scenarios/variants/SCN-015-output-comparison-real-estate.md'),

  ('SCN-016', 'The Wellness Program Summary', 'hidden-error-review-financial', '1.0.0',
   'hidden-error-review', 3, 3, 'financial-services',
   ARRAY['verification-instinct', 'exception-handling']::domain_slug[],
   ARRAY['risk-judgment', 'process-thinking']::domain_slug[],
   ARRAY['ai-approver', 'qa-risk-reviewer']::role_slug[],
   'published', 'SCN-004',
   'content/scenarios/variants/SCN-016-hidden-error-review-financial.md'),

  ('SCN-017', 'The Curriculum Proposal', 'missing-context-education', '1.0.0',
   'missing-context', 1, 2, 'education',
   ARRAY['task-framing', 'exception-handling']::domain_slug[],
   ARRAY['verification-instinct', 'risk-judgment']::domain_slug[],
   ARRAY['ai-operator', 'workflow-translator', 'ai-approver']::role_slug[],
   'published', 'SCN-005',
   'content/scenarios/variants/SCN-017-missing-context-education.md'),

  ('SCN-018', 'The Shipment Processing Pipeline', 'workflow-handoff-logistics', '1.0.0',
   'workflow-handoff', 2, 3, 'logistics',
   ARRAY['process-thinking', 'task-framing']::domain_slug[],
   ARRAY['operational-consistency', 'change-leverage']::domain_slug[],
   ARRAY['workflow-translator', 'ai-operator']::role_slug[],
   'published', 'SCN-006',
   'content/scenarios/variants/SCN-018-workflow-handoff-logistics.md'),

  ('SCN-019', 'The Contamination Alert', 'escalation-judgment-food-safety', '1.0.0',
   'escalation-judgment', 4, 3, 'food-safety',
   ARRAY['exception-handling', 'risk-judgment']::domain_slug[],
   ARRAY['operational-consistency']::domain_slug[],
   ARRAY['ai-approver', 'qa-risk-reviewer']::role_slug[],
   'published', 'SCN-007',
   'content/scenarios/variants/SCN-019-escalation-judgment-food-safety.md'),

  ('SCN-020', 'The Managing Director''s Pitch', 'stakeholder-pressure-investment-banking', '1.0.0',
   'stakeholder-pressure', 5, 4, 'investment-banking',
   ARRAY['risk-judgment', 'verification-instinct']::domain_slug[],
   ARRAY['exception-handling', 'change-leverage']::domain_slug[],
   ARRAY['ai-approver', 'qa-risk-reviewer', 'change-champion']::role_slug[],
   'published', 'SCN-008',
   'content/scenarios/variants/SCN-020-stakeholder-pressure-investment-banking.md'),

  ('SCN-021', 'The Grid Balancing Conflict', 'exception-handling-energy', '1.0.0',
   'exception-handling', 4, 4, 'energy',
   ARRAY['exception-handling', 'process-thinking']::domain_slug[],
   ARRAY['risk-judgment', 'operational-consistency']::domain_slug[],
   ARRAY['workflow-translator', 'qa-risk-reviewer']::role_slug[],
   'published', 'SCN-009',
   'content/scenarios/variants/SCN-021-exception-handling-energy.md'),

  ('SCN-022', 'The Skeptical Litigators', 'adoption-communication-legal', '1.0.0',
   'adoption-communication', 6, 3, 'legal',
   ARRAY['change-leverage']::domain_slug[],
   ARRAY['risk-judgment', 'task-framing']::domain_slug[],
   ARRAY['change-champion', 'workflow-translator']::role_slug[],
   'published', 'SCN-010',
   'content/scenarios/variants/SCN-022-adoption-communication-legal.md'),

  ('SCN-023', 'The Patient Safety Guides', 'policy-adherence-healthcare', '1.0.0',
   'policy-adherence', 5, 4, 'healthcare-compliance',
   ARRAY['operational-consistency', 'risk-judgment']::domain_slug[],
   ARRAY['verification-instinct', 'change-leverage']::domain_slug[],
   ARRAY['ai-operator', 'ai-approver', 'qa-risk-reviewer']::role_slug[],
   'published', 'SCN-011',
   'content/scenarios/variants/SCN-023-policy-adherence-healthcare.md'),

  ('SCN-024', 'The Quiet Underperformer', 'drift-detection-manufacturing', '1.0.0',
   'drift-detection', 6, 5, 'manufacturing',
   ARRAY['operational-consistency', 'change-leverage']::domain_slug[],
   ARRAY['verification-instinct', 'exception-handling', 'process-thinking']::domain_slug[],
   ARRAY['qa-risk-reviewer', 'change-champion', 'workflow-translator']::role_slug[],
   'published', 'SCN-012',
   'content/scenarios/variants/SCN-024-drift-detection-manufacturing.md');
```