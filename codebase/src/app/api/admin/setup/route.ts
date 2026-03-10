import { NextResponse } from 'next/server'
import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const {
    company_name,
    departments,
    ai_adoption_goals,
    risk_sensitivity,
    target_functions,
    expected_employee_count,
  } = body

  if (!company_name?.trim()) {
    return NextResponse.json({ error: 'company_name is required' }, { status: 400 })
  }
  if (!departments?.length) {
    return NextResponse.json({ error: 'At least one department required' }, { status: 400 })
  }

  // Check if user already has a company
  const { data: existingLink } = await supabase
    .from('company_users').select('company_id').eq('user_id', user.id).single()
  if (existingLink?.company_id) {
    return NextResponse.json({ error: 'Company already configured' }, { status: 409 })
  }

  // Insert company
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .insert({
      name: company_name.trim(),
      departments,
      ai_adoption_goals,
      risk_sensitivity,
      target_functions,
      expected_employee_count,
      created_by: user.id,
    })
    .select('id')
    .single()

  if (companyError) {
    return NextResponse.json({ error: companyError.message }, { status: 500 })
  }

  // Link user to company as admin
  const { error: userError } = await supabase
    .from('company_users')
    .insert({ user_id: user.id, company_id: company.id, role: 'admin' })

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 })
  }

  return NextResponse.json({ company_id: company.id }, { status: 201 })
}
