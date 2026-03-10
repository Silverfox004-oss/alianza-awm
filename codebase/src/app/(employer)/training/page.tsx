import { createServerSupabaseClient as createServerClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const TRACK_META = {
  A: {
    label: 'Track A — Ready Now',
    timeline: 'Immediate deployment',
    color: 'bg-green-50 border-green-200',
    badgeColor: 'bg-green-100 text-green-800',
    modules: ['AI Tool Orientation (1 hr)', 'Role-Specific SOP Review (2 hrs)', 'Pilot Project Assignment'],
  },
  B: {
    label: 'Track B — 30 Days',
    timeline: '~30 days to deployment',
    color: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-800',
    modules: ['Process Thinking Workshop (2 hrs)', 'AI Output Evaluation (1.5 hrs)', 'Verification Instinct Exercises (1 hr)'],
  },
  C: {
    label: 'Track C — 60-90 Days',
    timeline: '60–90 days to deployment',
    color: 'bg-yellow-50 border-yellow-200',
    badgeColor: 'bg-yellow-100 text-yellow-800',
    modules: ['AI Foundations Course (6 hrs)', 'All 7 Domain Training Modules (8 hrs total)', 'Scenario-Based Practice Labs (4 hrs)', 'Reassessment at Day 60'],
  },
  D: {
    label: 'Track D — Developmental',
    timeline: '90+ days',
    color: 'bg-red-50 border-red-200',
    badgeColor: 'bg-red-100 text-red-800',
    modules: ['Digital Literacy Foundations (4 hrs)', 'Change Readiness Workshop (2 hrs)', 'Manager-Guided Development Plan', 'Reassessment in 90+ days'],
  },
}

export default async function TrainingPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: companyUser } = await supabase
    .from('company_users').select('company_id').eq('user_id', user!.id).single()

  const { data: assessments } = await supabase
    .from('assessments')
    .select('id, training_track, overall_score, company_users!company_user_id(name, department)')
    .eq('company_id', companyUser?.company_id)
    .eq('status', 'complete')

  const byTrack: Record<string, any[]> = { A: [], B: [], C: [], D: [] }
  for (const e of assessments ?? []) {
    const cu = e.company_users as any
    const t = e.training_track as string
    if (byTrack[t]) byTrack[t].push({ ...e, employee_name: cu?.name ?? null, department: cu?.department ?? null })
  }

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Training Recommendations</h1>

        <div className="grid grid-cols-2 gap-6">
          {(Object.entries(TRACK_META) as [string, typeof TRACK_META.A][]).map(([track, meta]) => (
            <Card key={track} className={`border ${meta.color}`}>
              <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                  {meta.label}
                  <Badge className={meta.badgeColor}>{byTrack[track].length} employees</Badge>
                </CardTitle>
                <p className="text-xs text-gray-500">{meta.timeline}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Modules */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-2">Recommended Modules:</p>
                  <ul className="space-y-1">
                    {meta.modules.map((m, i) => (
                      <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                        <span className="text-blue-400">→</span> {m}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expandable employee list */}
                {byTrack[track].length > 0 && (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="employees">
                      <AccordionTrigger className="text-xs py-2">
                        View {byTrack[track].length} employee{byTrack[track].length !== 1 ? 's' : ''}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                          {byTrack[track].map(e => (
                            <div key={e.id} className="flex justify-between text-xs py-1 border-b border-gray-100">
                              <span className="text-gray-700">{e.employee_name ?? e.id.slice(0, 8)}</span>
                              <span className="text-gray-400">{e.department ?? '—'}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
