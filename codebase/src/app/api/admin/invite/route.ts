import { NextResponse } from 'next/server'
import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'
import { nanoid } from 'nanoid'

export async function GET() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: companyUser } = await supabase
    .from('company_users').select('company_id, companies(departments)').eq('user_id', user.id).single()
  if (!companyUser) return NextResponse.json({ error: 'No company found' }, { status: 404 })

  const { data: links } = await supabase
    .from('assessment_links')
    .select('*')
    .eq('company_id', companyUser.company_id)
    .order('created_at', { ascending: false })

  const departments = (companyUser.companies as any)?.departments ?? []

  return NextResponse.json({ links: links ?? [], departments })
}

export async function POST(req: Request) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: companyUser } = await supabase
    .from('company_users').select('company_id, role').eq('user_id', user.id).single()
  if (!companyUser || companyUser.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
  }

  const body = await req.json()
  const { department, max_uses, expires_in_days } = body

  const slug = nanoid(10)
  const expires_at = expires_in_days
    ? new Date(Date.now() + expires_in_days * 86400_000).toISOString()
    : null

  const { data: link, error } = await supabase
    .from('assessment_links')
    .insert({
      company_id: companyUser.company_id,
      slug,
      department: department ?? null,
      max_uses: max_uses ?? null,
      expires_at,
      use_count: 0,
      is_active: true,
      created_by: user.id,
    })
    .select('*')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ link }, { status: 201 })
}
