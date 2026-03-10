import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RiskConcentrationChart } from '@/components/charts/risk-concentration-chart'

export default async function RiskPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: companyUser } = await supabase
    .from('company_users').select('company_id').eq('user_id', user!.id).single()

  const { data: evaluations } = await supabase
    .from('evaluations')
    .select('id, employee_name, department, risk_flags')
    .eq('company_id', companyUser?.company_id)
    .eq('status', 'complete')

  // Build department x severity stacked bar data
  const deptMap: Record<string, { dept: string; low: number; medium: number; high: number }> = {}
  const flagFrequency: Record<string, number> = {}
  const highRiskEmployees: any[] = []

  for (const e of evaluations ?? []) {
    const dept = e.department ?? 'Unknown'
    if (!deptMap[dept]) deptMap[dept] = { dept, low: 0, medium: 0, high: 0 }
    const flags = (e.risk_flags as any[]) ?? []
    for (const f of flags) {
      deptMap[dept][f.severity as 'low' | 'medium' | 'high']++
      flagFrequency[f.flag] = (flagFrequency[f.flag] ?? 0) + 1
    }
    const highCount = flags.filter(f => f.severity === 'high').length
    if (highCount >= 2) {
      highRiskEmployees.push({ ...e, highFlagCount: highCount })
    }
  }

  const deptChartData = Object.values(deptMap)
  const topFlags = Object.entries(flagFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([flag, count]) => ({ flag, count }))

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">Risk Dashboard</h1>

        <RiskConcentrationChart data={deptChartData} />

        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-lg border p-4">
            <h2 className="text-sm font-semibold mb-4">Top Risk Flags</h2>
            <div className="space-y-2">
              {topFlags.map((f) => (
                <div key={f.flag} className="flex justify-between text-sm">
                  <span className="text-gray-700 truncate">{f.flag}</span>
                  <span className="text-gray-500 ml-2 shrink-0">{f.count}x</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="text-sm font-semibold mb-4">High-Risk Employees ({highRiskEmployees.length})</h2>
            <div className="space-y-2">
              {highRiskEmployees.map((e) => (
                <div key={e.id} className="flex justify-between text-sm py-1 border-b border-gray-100">
                  <span className="text-gray-700">{e.employee_name ?? e.id.slice(0, 8)}</span>
                  <span className="text-red-500">{e.highFlagCount} high flags</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
