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

export type AssessmentStatus = 'not_started' | 'in_progress' | 'paused' | 'grading' | 'complete' | 'failed'

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
  user_id: string | null
  role: 'admin' | 'member' | 'employee'
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
  company_id: string
  company_user_id: string | null
  link_id: string | null
  status: AssessmentStatus
  selected_scenario_ids: string[]
  current_scenario_index: number
  started_at?: string
  completed_at?: string
  paused_at?: string
  elapsed_seconds?: number
  overall_score?: number
  readiness_band?: string
  domain_scores?: Record<DomainName, number>
  role_scores?: Record<RoleName, number>
  recommended_role?: RoleName
  role_ranking?: RoleName[]
  risk_flags?: RiskFlag[]
  training_track?: TrainingTrack
  deployment_recommendation?: string
  upskill_recommendations?: string[]
  executive_summary?: string
  graded_at?: string
  created_at: string
}

export interface Scenario {
  id: string
  title: string
  module_label: string
  context: string
  task: string
  time_limit_seconds?: number
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
// Assessment Evaluation (7-domain grading output)
// ============================================

export interface AssessmentEvaluation {
  id: string
  assessment_id: string
  scenario_id: string
  task_framing: number          // 0-4
  process_thinking: number      // 0-4
  verification_instinct: number // 0-4
  exception_handling: number    // 0-4
  risk_judgment: number         // 0-4
  operational_consistency: number // 0-4
  change_leverage: number       // 0-4
  missed_penalty_applied: boolean
  primary_grade: any
  skeptic_grade: any
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
  role_key: string
  fit_score: number           // 0-100
  rank: number
  is_recommended: boolean
  created_at: string
}

export interface RiskFlag {
  flag: string
  severity: 'low' | 'medium' | 'high'
  evidence?: string
}

// ============================================
// LLM Prompt I/O Types
// ============================================

export interface OrchestratorInput {
  employee: Pick<CompanyUser, 'title' | 'department' | 'years_experience' | 'is_manager' | 'ai_exposure' | 'ambiguity_confidence'>
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
  employee_profile: Pick<CompanyUser, 'title' | 'department' | 'is_manager'>
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
  domain_evaluations: Array<{
    domain: DomainName
    reasoning: string
    score: number  // 0-4
    evidence_quotes: string[]
    penalty_flags: PenaltyFlag[]
  }>
}

export interface SkepticGraderInput {
  primary_evaluation: PrimaryGraderOutput
  scenario: ScenarioMetadata
  employee_response: string
}

export interface SkepticGraderOutput {
  domain_audits: Array<{
    domain: DomainName
    verdict: 'AGREE' | 'ADJUST_DOWN' | 'FLAG_FOR_REVIEW'
    adjusted_score?: number
    reasoning: string
  }>
}

export interface SynthesizerInput {
  employee: Pick<CompanyUser, 'name' | 'title' | 'department' | 'is_manager'>
  reconciled_evaluations: AssessmentEvaluation[]
  role_definitions: Array<{ role: RoleName; domain_weights: Record<DomainName, number> }>
}

export interface SynthesizerOutput {
  readiness_band: ReadinessBand
  readiness_score: number
  domain_scores: Record<DomainName, number>
  role_scores: Record<RoleName, number>
  recommended_role: RoleName
  role_ranking: RoleName[]
  risk_flags: RiskFlag[]
  training_track: TrainingTrack
  deployment_recommendation: string
  upskill_recommendations: string[]
  executive_summary: string
}
