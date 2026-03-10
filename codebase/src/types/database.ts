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
          employee_count: number
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
          user_id: string
          role: 'admin' | 'employee'
          name: string
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
          code: string
          slug: string
          department: string | null
          max_uses: number | null
          uses_count: number
          use_count: number
          expires_at: string | null
          is_active: boolean
          created_by: string
          created_at: string
          used_at: string | null
          assessment_id: string | null
          completed_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['assessment_links']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['assessment_links']['Insert']>
      }
      assessments: {
        Row: {
          id: string
          company_user_id: string
          company_id: string | null
          link_id: string | null
          status: string
          selected_scenario_ids: string[]
          current_scenario_index: number
          started_at: string | null
          paused_at: string | null
          completed_at: string | null
          graded_at: string | null
          elapsed_seconds: number | null
          overall_score: number | null
          readiness_band: string | null
          domain_scores: Json | null
          top_strengths: string[] | null
          development_areas: string[] | null
          narrative_summary: string | null
          development_recommendations: string[] | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['assessments']['Row'], 'id' | 'created_at'>
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
        }
        Insert: Omit<Database['public']['Tables']['assessment_responses']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['assessment_responses']['Insert']>
      }
      assessment_evaluations: {
        Row: {
          id: string
          assessment_id: string
          scenario_id: string
          prompt_comprehension: number | null
          ai_collaboration: number | null
          critical_evaluation: number | null
          ethics_and_bias: number | null
          practical_application: number | null
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
          role_title: string
          fit_score: number
          rationale: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['role_fit_results']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['role_fit_results']['Insert']>
      }
      scenarios: {
        Row: {
          id: string
          title: string
          module_label: string | null
          context: string | null
          task: string
          time_limit_seconds: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['scenarios']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['scenarios']['Insert']>
      }
      evaluations: {
        Row: {
          id: string
          assessment_id: string | null
          company_id: string | null
          status: 'grading' | 'complete' | 'error'
          readiness_band: string | null
          readiness_score: number | null
          training_track: string | null
          domain_scores: Json | null
          risk_flags: Json | null
          upskill_recommendations: Json | null
          department: string | null
          employee_name: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['evaluations']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['evaluations']['Insert']>
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
    Enums: Record<string, never>
  }
}
