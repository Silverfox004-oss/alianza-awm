import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RoleFitHeatmap } from '@/components/charts/role-fit-heatmap'

export default async function MatrixPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: companyUser } = await supabase
    .from('company_users').select('company_id').eq('user_id', user!.id).single()

  // Get all employees with all 5 role scores
  const { data: roleFits } = await supabase
    .from('role_fit_results')
    .select('role, score, evaluation_id, evaluations!inner(id, employee_name, company_id)')
    .eq('evaluations.company_id', companyUser?.company_id)

  // Build Nivo heatmap data: array of { id: employeeId, data: [{ x: role, y: score }] }
  const grouped: Record<string, any> = {}
  for (const rf of roleFits ?? []) {
    const evalData = rf.evaluations as any
    const empId = evalData.id
    const name  = evalData.employee_name ?? empId.slice(0, 8)
    if (!grouped[empId]) grouped[empId] = { id: name, data: [] }
    grouped[empId].data.push({ x: (rf.role as string).replace('_', ' '), y: rf.score })
  }
  const heatmapData = Object.values(grouped)

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Role-Fit Matrix</h1>
        <p className="text-sm text-gray-500 mb-6">Color intensity = fit score (0–100). Click a cell to view employee detail.</p>
        <RoleFitHeatmap data={heatmapData} />
      </div>
    </DashboardLayout>
  )
}
