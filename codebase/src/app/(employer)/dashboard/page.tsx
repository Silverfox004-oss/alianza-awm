import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { OverviewKPIs } from '@/components/dashboard/overview-kpis'
import { ReadinessDistributionChart } from '@/components/charts/readiness-distribution-chart'
import { ExportCSVButton } from '@/components/dashboard/export-csv-button'

export default async function DashboardPage() {
  const supabase = await createServerClient()

  // Get current admin's company
  const { data: { user } } = await supabase.auth.getUser()
  const { data: companyUser } = await supabase
    .from('company_users')
    .select('company_id, companies(name)')
    .eq('user_id', user!.id)
    .single()

  const companyId = companyUser?.company_id ?? ''

  // Aggregate stats from assessments table (not evaluations)
  const { data: assessments } = await supabase
    .from('assessments')
    .select('id, readiness_band, overall_score, risk_flags')
    .eq('company_id', companyId)
    .eq('status', 'complete')

  const total     = assessments?.length ?? 0
  const avgScore  = total ? Math.round((assessments!.reduce((s, e) => s + (e.overall_score ?? 0), 0)) / total) : 0
  const highLev   = assessments?.filter(e => e.readiness_band === 'high_leverage').length ?? 0
  const riskCount = assessments?.reduce((sum, e) => sum + ((e.risk_flags as any[])?.filter(f => f.severity === 'high').length ?? 0), 0) ?? 0

  // Band distribution
  const bandCounts = ['not_ready','emerging','capable','strong','high_leverage'].map(band => ({
    band: band.replace('_', ' '),
    count: assessments?.filter(e => e.readiness_band === band).length ?? 0,
  }))

  return (
    <DashboardLayout companyName={(companyUser?.companies as any)?.name}>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <div className="flex items-center gap-3">
            <ExportCSVButton data={assessments ?? []} filename="workforce-readiness" />
          </div>
        </div>

        <OverviewKPIs
          total={total}
          avgScore={avgScore}
          highLeverage={highLev}
          riskFlags={riskCount}
        />

        <div className="grid grid-cols-2 gap-6">
          <ReadinessDistributionChart data={bandCounts} />
        </div>
      </div>
    </DashboardLayout>
  )
}
