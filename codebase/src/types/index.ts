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
  readiness_band?: ReadinessBand
  readiness_score?: number
  training_track?: TrainingTrack
  domain_scores?: Record<DomainName, number>
  risk_flags?: RiskFlag[]
  upskill_recommendations?: string[]
  status?: 'grading' | 'complete' | 'error'
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
  role: RoleName
  score: number              // 0-100
  rationale?: string
  readiness_band: ReadinessBand
  readiness_score: number       // 0-100
  domain_scores: Record<DomainName, number>  // 0-100 each
  role_scores: Record<RoleName, number>      // 0-100 each
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
  reconciled_evaluations: Evaluation[]
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
