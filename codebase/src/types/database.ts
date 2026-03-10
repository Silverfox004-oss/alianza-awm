// Auto-generated Supabase types placeholder
// Run: npx supabase gen types typescript --project-id rpqxsvqxwhzymnujmyun > src/types/database.ts
// after running the migration SQL in supabase/

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
        Insert: Omit<Database['public']['Tables']['companies']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['companies']['Insert']>
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
        Insert: Omit<Database['public']['Tables']['company_users']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['company_users']['Insert']>
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
        Insert: Omit<Database['public']['Tables']['assessment_links']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['assessment_links']['Insert']>
      }
      assessments: {
        Row: {
          id: string
          company_id: string | null
          company_user_id: string | null
          link_id: string | null
          status: string
          selected_scenario_ids: string[]
          scenario_ids: string[]
          current_scenario_index: number
          started_at: string | null
          completed_at: string | null
          paused_at: string | null
          elapsed_seconds: number | null
          total_time_seconds: number | null
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
          link_slug: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['assessments']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['assessments']['Insert']>
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
        Insert: Omit<Database['public']['Tables']['assessment_responses']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['assessment_responses']['Insert']>
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
        Insert: Omit<Database['public']['Tables']['assessment_evaluations']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['assessment_evaluations']['Insert']>
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
        Insert: Omit<Database['public']['Tables']['role_fit_results']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['role_fit_results']['Insert']>
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
        Insert: Omit<Database['public']['Tables']['scenarios']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['scenarios']['Insert']>
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
        Insert: Omit<Database['public']['Tables']['roles']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['roles']['Insert']>
      }
      evaluations: {
        Row: {
          id: string
          assessment_id: string | null
          company_id: string | null
          employee_name: string | null
          department: string | null
          readiness_band: string | null
          readiness_score: number | null
          domain_scores: Json
          risk_flags: Json
          training_track: string | null
          deployment_recommendation: string | null
          upskill_recommendations: string[] | null
          executive_summary: string | null
          status: 'complete' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['evaluations']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['evaluations']['Insert']>
      }
      responses: {
        Row: {
          id: string
          assessment_id: string
          scenario_id: string
          raw_response: string
          followup_questions: Json
          time_spent_seconds: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['responses']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['responses']['Insert']>
      }
      rubrics: {
        Row: {
          id: string
          scenario_id: string
          domain: string
          rubric_text: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['rubrics']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['rubrics']['Insert']>
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
