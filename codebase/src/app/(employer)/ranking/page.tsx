import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RankingTable } from '@/components/dashboard/ranking-table'

export default async function RankingPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: companyUser } = await supabase
    .from('company_users').select('company_id').eq('user_id', user!.id).single()

  const { data: evaluations } = await supabase
    .from('evaluations')
    .select(`
      id, created_at, readiness_band, readiness_score, training_track,
      department, risk_flags,
      role_fit_results ( role, score )
    `)
    .eq('company_id', companyUser?.company_id)
    .eq('status', 'complete')
    .order('readiness_score', { ascending: false })

  // Flatten: add best-fit role and risk level
  const rows = (evaluations ?? []).map(e => {
    const sorted = (e.role_fit_results as any[])?.sort((a: any, b: any) => b.score - a.score) ?? []
    const highRiskCount = (e.risk_flags as any[])?.filter((f: any) => f.severity === 'high').length ?? 0
    return {
      ...e,
      best_fit_role: sorted[0]?.role ?? 'N/A',
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
