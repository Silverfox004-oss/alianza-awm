import { NextResponse } from 'next/server'
import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: companyUser } = await supabase
    .from('company_users').select('company_id').eq('user_id', user.id).single()

  const url = new URL(request.url)
  const dept   = url.searchParams.get('dept')
  const band   = url.searchParams.get('band')
  const page   = parseInt(url.searchParams.get('page') ?? '1')
  const limit  = 10
  const offset = (page - 1) * limit

  let query = supabase
    .from('evaluations')
    .select(`id, employee_name, department, readiness_band, readiness_score, training_track, risk_flags,
      role_fit_results ( role, score )`, { count: 'exact' })
    .eq('company_id', companyUser!.company_id)
    .eq('status', 'complete')
    .order('readiness_score', { ascending: false })
    .range(offset, offset + limit - 1)

  if (dept) query = query.eq('department', dept)
  if (band) query = query.eq('readiness_band', band)

  const { data, count, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data, count, page, limit })
}
