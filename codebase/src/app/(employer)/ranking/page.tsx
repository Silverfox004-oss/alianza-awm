import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RankingTable } from '@/components/dashboard/ranking-table'

export default async function RankingPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: companyUser } = await supabase
    .from('company_users').select('company_id').eq('user_id', user!.id).single()

  const { data: assessments } = await supabase
    .from('assessments')
    .select(`
      id, created_at, readiness_band, overall_score, training_track,
      risk_flags,
      company_users!company_user_id(name, department),
      role_fit_results ( role_key, fit_score )
    `)
    .eq('company_id', companyUser?.company_id)
    .eq('status', 'complete')
    .order('overall_score', { ascending: false })

  // Flatten: add best-fit role and risk level
  const rows = (assessments ?? []).map(e => {
    const sorted = (e.role_fit_results as any[])?.sort((a: any, b: any) => b.fit_score - a.fit_score) ?? []
    const highRiskCount = (e.risk_flags as any[])?.filter((f: any) => f.severity === 'high').length ?? 0
    const cu = e.company_users as any
    return {
      ...e,
      employee_name: cu?.name ?? null,
      department: cu?.department ?? null,
      readiness_score: e.overall_score,
      best_fit_role: sorted[0]?.role_key ?? 'N/A',
      risk_level: highRiskCount >= 2 ? 'High' : highRiskCount === 1 ? 'Medium' : 'Low',
    }
  })

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Employee Rankings</h1>
        <RankingTable rows={rows} />
      </div>
    </DashboardLayout>
  )
}
