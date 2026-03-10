import { redirect } from 'next/navigation'
import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'
import { ResultsDashboard } from '@/components/assessment/results-dashboard'
import { GradingInProgress } from '@/components/assessment/grading-skeleton'
import type { RoleFitResult } from '@/types'

interface ResultsPageProps {
  searchParams: Promise<{ id?: string }>
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const { id } = await searchParams
  const supabase = await createServerClient()

  if (!id) redirect('/assess')

  // Load assessment with role fit results
  const { data: assessment, error } = await supabase
    .from('assessments')
    .select(`
      *,
      role_fit_results (*)
    `)
    .eq('id', id)
    .single()

  if (error || !assessment) redirect('/assess')

  // If grading is still running, show polling page
  if (assessment.status === 'grading') {
    return <GradingInProgress assessmentId={id} />
  }

  // Sort role fit results by fit_score desc
  const roleFitResults: RoleFitResult[] = ((assessment as any).role_fit_results ?? [])
    .sort((a: any, b: any) => b.fit_score - a.fit_score)

  return (
    <ResultsDashboard
      assessment={assessment as any}
      roleFitResults={roleFitResults}
    />
  )
}
