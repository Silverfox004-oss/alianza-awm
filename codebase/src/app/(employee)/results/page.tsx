import { redirect } from 'next/navigation'
import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'
import { ResultsDashboard } from '@/components/assessment/results-dashboard'
import { GradingInProgress } from '@/components/assessment/grading-skeleton'
import type { RoleFitResult, Evaluation } from '@/types'

interface ResultsPageProps {
  searchParams: { evaluation_id?: string }
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const supabase = await createServerClient()
  const evaluationId = searchParams.evaluation_id

  if (!evaluationId) redirect('/assess')

  // Load evaluation with role fit results
  const { data: evaluation, error: evalError } = await supabase
    .from('evaluations')
    .select(`
      *,
      role_fit_results (*)
    `)
    .eq('id', evaluationId)
    .single()

  if (evalError || !evaluation) redirect('/assess')

  // If grading is still running, show polling page
  if (evaluation.status === 'grading') {
    return <GradingInProgress evaluationId={evaluationId} />
  }

  // Sort role fit results by score desc
  const roleFitResults: RoleFitResult[] = ((evaluation as any).role_fit_results ?? [])
    .sort((a: any, b: any) => b.score - a.score)

  return (
    <ResultsDashboard
      evaluation={evaluation as any}
      roleFitResults={roleFitResults}
    />
  )
}
