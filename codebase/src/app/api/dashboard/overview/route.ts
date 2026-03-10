import { NextResponse } from 'next/server'
import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: companyUser } = await supabase
    .from('company_users').select('company_id').eq('user_id', user.id).single()
  if (!companyUser) return NextResponse.json({ error: 'No company' }, { status: 404 })

  const { data: evaluations, error } = await supabase
    .from('evaluations')
    .select('id, readiness_band, readiness_score, training_track, department, risk_flags')
    .eq('company_id', companyUser.company_id)
    .eq('status', 'complete')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const total    = evaluations.length
  const avgScore = total ? Math.round(evaluations.reduce((s, e) => s + (e.readiness_score ?? 0), 0) / total) : 0
  const highLev  = evaluations.filter(e => e.readiness_band === 'high_leverage').length
  const riskCount = evaluations.reduce((sum, e) =>
    sum + ((e.risk_flags as any[])?.filter((f: any) => f.severity === 'high').length ?? 0), 0)

  const bandDist = ['not_ready','emerging','capable','strong','high_leverage'].map(b => ({
    band: b,
    count: evaluations.filter(e => e.readiness_band === b).length,
  }))

  return NextResponse.json({ total, avgScore, highLev, riskCount, bandDist })
}
