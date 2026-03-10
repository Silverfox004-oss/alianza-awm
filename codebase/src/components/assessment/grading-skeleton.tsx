'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'

interface Props { evaluationId: string }

export function GradingInProgress({ evaluationId }: Props) {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [progress, setProgress] = useState(10)

  // Animate progress bar
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => Math.min(p + 5, 90))
    }, 1200)
    return () => clearInterval(timer)
  }, [])

  // Poll Supabase Realtime for status change
  useEffect(() => {
    const channel = supabase
      .channel(`evaluation-${evaluationId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'evaluations', filter: `id=eq.${evaluationId}` },
        (payload) => {
          if ((payload.new as any).status === 'complete') {
            router.push(`/results?evaluation_id=${evaluationId}`)
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [evaluationId, router, supabase])

  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Analyzing Your Responses</h1>
        <p className="text-gray-500">Our AI is evaluating your answers across 7 domains. This takes about 30 seconds.</p>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="space-y-3 text-left">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-16 w-3/4 rounded-xl" />
      </div>
      <p className="text-xs text-gray-400">Do not close this tab.</p>
    </div>
  )
}
