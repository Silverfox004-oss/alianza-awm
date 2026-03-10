import { serve } from 'inngest/next'
import { inngest } from '@/lib/inngest/client'
import { gradeAssessment } from '@/lib/inngest/functions/grade-assessment'

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [gradeAssessment],
})
