// Supabase database types — hand-maintained to match post-migration-v2 schema.
// Regenerate with: npx supabase gen types typescript --project-id rpqxsvqxwhzymnujmyun > src/types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          slug: string
          departments: string[]
          ai_adoption_goals: string[]
          risk_sensitivity: 'low' | 'medium' | 'high'
          target_functions: string[]
          expected_employee_count: number | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Relationships: []
        Insert: {
          name: string
          slug: string
          departments: string[]
          ai_adoption_goals: string[]
          risk_sensitivity: 'low' | 'medium' | 'high'
          target_functions: string[]
          expected_employee_count?: number | null
          created_by?: string | null
        }
        Update: {
          name?: string
          slug?: string
          departments?: string[]
          ai_adoption_goals?: string[]
          risk_sensitivity?: 'low' | 'medium' | 'high'
          target_functions?: string[]
          expected_employee_count?: number | null
          created_by?: string | null
        }
      }
      company_users: {
        Row: {
          id: string
          company_id: string
          user_id: string | null
          role: 'admin' | 'member' | 'employee'
          name: string | null
          title: string | null
          department: string | null
          years_experience: number | null
          is_manager: boolean
          ai_exposure: 'none' | 'basic' | 'moderate' | 'advanced'
          ambiguity_confidence: number | null
          review_comfort: number | null
          current_tools: string[]
          created_at: string
          updated_at: string
        }
        Relationships: []
        Insert: {
          company_id: string
          user_id?: string | null
          role: 'admin' | 'member' | 'employee'
          name?: string | null
          title?: string | null
          department?: string | null
          years_experience?: number | null
          is_manager?: boolean
          ai_exposure?: 'none' | 'basic' | 'moderate' | 'advanced'
          ambiguity_confidence?: number | null
          review_comfort?: number | null
          current_tools?: string[]
        }
        Update: {
          company_id?: string
          user_id?: string | null
          role?: 'admin' | 'member' | 'employee'
          name?: string | null
          title?: string | null
          department?: string | null
          years_experience?: number | null
          is_manager?: boolean
          ai_exposure?: 'none' | 'basic' | 'moderate' | 'advanced'
          ambiguity_confidence?: number | null
          review_comfort?: number | null
          current_tools?: string[]
        }
      }
      assessment_links: {
        Row: {
          id: string
          company_id: string
          slug: string
          department: string | null
          max_uses: number | null
          use_count: number
          expires_at: string | null
          is_active: boolean
          created_by: string | null
          created_at: string
          used_at: string | null
          assessment_id: string | null
        }
        Relationships: []
        Insert: {
          company_id: string
          slug: string
          department?: string | null
          max_uses?: number | null
          use_count?: number
          expires_at?: string | null
          is_active?: boolean
          created_by?: string | null
          used_at?: string | null
          assessment_id?: string | null
        }
        Update: {
          company_id?: string
          slug?: string
          department?: string | null
          max_uses?: number | null
          use_count?: number
          expires_at?: string | null
          is_active?: boolean
          created_by?: string | null
          used_at?: string | null
          assessment_id?: string | null
        }
      }
      assessments: {
        Row: {
          id: string
          company_id: string | null
          company_user_id: string | null
          link_id: string | null
          status: string
          selected_scenario_ids: string[]
          current_scenario_index: number
          started_at: string | null
          completed_at: string | null
          paused_at: string | null
          elapsed_seconds: number | null
          overall_score: number | null
          readiness_band: string | null
          domain_scores: Json | null
          role_scores: Json | null
          recommended_role: string | null
          role_ranking: string[] | null
          risk_flags: Json | null
          training_track: string | null
          deployment_recommendation: string | null
          upskill_recommendations: string[] | null
          executive_summary: string | null
          graded_at: string | null
          created_at: string
          updated_at: string
        }
        Relationships: []
        Insert: {
          company_id?: string | null
          company_user_id?: string | null
          link_id?: string | null
          status?: string
          selected_scenario_ids?: string[]
          current_scenario_index?: number
          started_at?: string | null
          completed_at?: string | null
          paused_at?: string | null
          elapsed_seconds?: number | null
          overall_score?: number | null
          readiness_band?: string | null
          domain_scores?: Json | null
          role_scores?: Json | null
          recommended_role?: string | null
          role_ranking?: string[] | null
          risk_flags?: Json | null
          training_track?: string | null
          deployment_recommendation?: string | null
          upskill_recommendations?: string[] | null
          executive_summary?: string | null
          graded_at?: string | null
        }
        Update: {
          company_id?: string | null
          company_user_id?: string | null
          link_id?: string | null
          status?: string
          selected_scenario_ids?: string[]
          current_scenario_index?: number
          started_at?: string | null
          completed_at?: string | null
          paused_at?: string | null
          elapsed_seconds?: number | null
          overall_score?: number | null
          readiness_band?: string | null
          domain_scores?: Json | null
          role_scores?: Json | null
          recommended_role?: string | null
          role_ranking?: string[] | null
          risk_flags?: Json | null
          training_track?: string | null
          deployment_recommendation?: string | null
          upskill_recommendations?: string[] | null
          executive_summary?: string | null
          graded_at?: string | null
        }
      }
      assessment_responses: {
        Row: {
          id: string
          assessment_id: string
          scenario_id: string
          response_text: string | null
          followup_exchanges: Json | null
          submitted_at: string | null
          updated_at: string
          created_at: string
        }
        Relationships: []
        Insert: {
          assessment_id: string
          scenario_id: string
          response_text?: string | null
          followup_exchanges?: Json | null
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          assessment_id?: string
          scenario_id?: string
          response_text?: string | null
          followup_exchanges?: Json | null
          submitted_at?: string | null
          updated_at?: string
        }
      }
      assessment_evaluations: {
        Row: {
          id: string
          assessment_id: string
          scenario_id: string
          task_framing: number | null
          process_thinking: number | null
          verification_instinct: number | null
          exception_handling: number | null
          risk_judgment: number | null
          operational_consistency: number | null
          change_leverage: number | null
          missed_penalty_applied: boolean
          primary_grade: Json | null
          skeptic_grade: Json | null
          created_at: string
        }
        Relationships: []
        Insert: {
          assessment_id: string
          scenario_id: string
          task_framing?: number | null
          process_thinking?: number | null
          verification_instinct?: number | null
          exception_handling?: number | null
          risk_judgment?: number | null
          operational_consistency?: number | null
          change_leverage?: number | null
          missed_penalty_applied?: boolean
          primary_grade?: Json | null
          skeptic_grade?: Json | null
        }
        Update: {
          assessment_id?: string
          scenario_id?: string
          task_framing?: number | null
          process_thinking?: number | null
          verification_instinct?: number | null
          exception_handling?: number | null
          risk_judgment?: number | null
          operational_consistency?: number | null
          change_leverage?: number | null
          missed_penalty_applied?: boolean
          primary_grade?: Json | null
          skeptic_grade?: Json | null
        }
      }
      role_fit_results: {
        Row: {
          id: string
          assessment_id: string
          role_key: string
          fit_score: number
          rank: number
          is_recommended: boolean
          created_at: string
        }
        Relationships: []
        Insert: {
          assessment_id: string
          role_key: string
          fit_score: number
          rank: number
          is_recommended?: boolean
        }
        Update: {
          assessment_id?: string
          role_key?: string
          fit_score?: number
          rank?: number
          is_recommended?: boolean
        }
      }
      scenarios: {
        Row: {
          id: string
          slug: string
          title: string
          archetype: string
          module: string
          difficulty: 'obvious' | 'mixed' | 'deceptive'
          primary_domains: string[]
          secondary_domains: string[]
          target_roles: string[]
          industry: string | null
          scenario_text: string
          status: 'draft' | 'published' | 'archived'
          created_at: string
          updated_at: string
        }
        Relationships: []
        Insert: {
          slug: string
          title: string
          archetype: string
          module: string
          difficulty: 'obvious' | 'mixed' | 'deceptive'
          primary_domains: string[]
          secondary_domains: string[]
          target_roles: string[]
          industry?: string | null
          scenario_text: string
          status?: 'draft' | 'published' | 'archived'
        }
        Update: {
          slug?: string
          title?: string
          archetype?: string
          module?: string
          difficulty?: 'obvious' | 'mixed' | 'deceptive'
          primary_domains?: string[]
          secondary_domains?: string[]
          target_roles?: string[]
          industry?: string | null
          scenario_text?: string
          status?: 'draft' | 'published' | 'archived'
        }
      }
      roles: {
        Row: {
          id: string
          name: string
          label: string
          description: string | null
          domain_weights: Json
          created_at: string
        }
        Relationships: []
        Insert: {
          name: string
          label: string
          description?: string | null
          domain_weights: Json
        }
        Update: {
          name?: string
          label?: string
          description?: string | null
          domain_weights?: Json
        }
      }
      rubrics: {
        Row: {
          id: string
          scenario_id: string
          domain: string
          rubric_text: string
          created_at: string
        }
        Relationships: []
        Insert: {
          scenario_id: string
          domain: string
          rubric_text: string
        }
        Update: {
          scenario_id?: string
          domain?: string
          rubric_text?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: {
      get_user_company_id: {
        Args: Record<string, never>
        Returns: string
      }
      is_company_admin: {
        Args: { target_company_id: string }
        Returns: boolean
      }
    }
    Enums: {
      assessment_status: 'not_started' | 'in_progress' | 'paused' | 'grading' | 'complete' | 'failed'
    }
  }
}
