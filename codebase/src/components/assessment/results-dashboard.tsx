'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Star, TrendingUp } from 'lucide-react'
import { DomainRadarChart } from '@/components/charts/domain-radar-chart'
import { ResultsPDFDownload } from '@/components/assessment/results-pdf'
import type { Assessment, RoleFitResult, ReadinessBand } from '@/types'

// ── Readiness band config ──────────────────────────────────────────────────
const BAND_CONFIG: Record<ReadinessBand, { label: string; color: string; bg: string }> = {
  not_ready:     { label: 'Not Ready',     color: 'text-red-700',    bg: 'bg-red-100' },
  emerging:      { label: 'Emerging',      color: 'text-orange-700', bg: 'bg-orange-100' },
  capable:       { label: 'Capable',       color: 'text-yellow-700', bg: 'bg-yellow-100' },
  strong:        { label: 'Strong',        color: 'text-green-700',  bg: 'bg-green-100' },
  high_leverage: { label: 'High Leverage', color: 'text-blue-700',   bg: 'bg-blue-100' },
}

// ── Role display names ─────────────────────────────────────────────────────
const ROLE_LABELS: Record<string, string> = {
  ai_operator:        'AI Operator',
  ai_approver:        'AI Approver',
  workflow_translator: 'Workflow Translator',
  ai_qa_reviewer:     'AI QA Reviewer',
  change_champion:    'Change Champion',
}

// ── Training track config ──────────────────────────────────────────────────
const TRACK_CONFIG = {
  A: {
    label: 'Track A — Ready Now',
    description: 'You are ready to take on AI-enabled roles immediately.',
    nextSteps: ['Shadow a current AI operator', 'Complete onboarding module', 'Request pilot project assignment'],
    timeline: 'Immediate',
    badgeColor: 'bg-green-100 text-green-800',
  },
  B: {
    label: 'Track B — 30 Days',
    description: 'You have the foundation. Targeted upskilling will get you deployment-ready.',
    nextSteps: ['Complete Process Thinking module (2 hrs)', 'Practice with AI output review exercises', 'Check in with manager at Day 30'],
    timeline: '~30 days',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  C: {
    label: 'Track C — 60–90 Days',
    description: 'Structured learning program recommended before role assignment.',
    nextSteps: ['Enroll in AI Foundations course', 'Complete all 7 domain training modules', 'Reassess at Day 60'],
    timeline: '60–90 days',
    badgeColor: 'bg-yellow-100 text-yellow-800',
  },
  D: {
    label: 'Track D — Developmental',
    description: 'Not yet suitable for AI-enabled roles. Core skill development needed.',
    nextSteps: ['Meet with manager to review development plan', 'Focus on foundational digital literacy', 'Reassess in 90+ days'],
    timeline: '90+ days',
    badgeColor: 'bg-red-100 text-red-800',
  },
}

interface Props {
  assessment: Assessment
  roleFitResults: RoleFitResult[]
}

export function ResultsDashboard({ assessment, roleFitResults }: Props) {
  const band = assessment.readiness_band as ReadinessBand
  const bandConfig = BAND_CONFIG[band]
  const track = assessment.training_track as 'A' | 'B' | 'C' | 'D'
  const trackConfig = TRACK_CONFIG[track]
  const top3Roles = roleFitResults.slice(0, 3)

  // Build domain scores array for radar chart
  const domainScores = [
    { domain: 'Task Framing',           score: (assessment.domain_scores as any)?.task_framing ?? 0 },
    { domain: 'Process Thinking',       score: (assessment.domain_scores as any)?.process_thinking ?? 0 },
    { domain: 'Verification Instinct',  score: (assessment.domain_scores as any)?.verification_instinct ?? 0 },
    { domain: 'Exception Handling',     score: (assessment.domain_scores as any)?.exception_handling ?? 0 },
    { domain: 'Risk Judgment',          score: (assessment.domain_scores as any)?.risk_judgment ?? 0 },
    { domain: 'Operational Consistency',score: (assessment.domain_scores as any)?.operational_consistency ?? 0 },
    { domain: 'Change Leverage',        score: (assessment.domain_scores as any)?.change_leverage ?? 0 },
  ]

  const riskFlags: Array<{ flag: string; severity: 'low' | 'medium' | 'high' }> =
    (assessment.risk_flags as any) ?? []

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your AI Readiness Results</h1>
          <p className="text-gray-500 mt-1">Assessment completed — here's what we found.</p>
        </div>
        <ResultsPDFDownload assessment={assessment} roleFitResults={roleFitResults} domainScores={domainScores} />
      </div>

      {/* Readiness Band Badge */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <span className={`text-4xl font-extrabold px-6 py-3 rounded-xl ${bandConfig.bg} ${bandConfig.color}`}>
              {bandConfig.label}
            </span>
            <div>
              <p className="text-sm text-gray-500">Overall Readiness Score</p>
              <p className="text-5xl font-bold text-gray-900">{assessment.overall_score}<span className="text-xl text-gray-400">/100</span></p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Fit Ranking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Star className="w-5 h-5" /> Top Role Fits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {top3Roles.map((r, i) => (
            <div key={r.role_key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-400">#{i + 1}</span>
                <span className="font-semibold text-gray-800">{ROLE_LABELS[r.role_key] ?? r.role_key}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${r.fit_score}%` }} />
                </div>
                <span className="text-sm font-medium text-gray-600 w-10 text-right">{r.fit_score}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Domain Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <DomainRadarChart data={domainScores} />
        </CardContent>
      </Card>

      {/* Risk Flags */}
      {riskFlags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="w-5 h-5" /> Risk Flags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {riskFlags.map((flag, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${
                flag.severity === 'high' ? 'bg-red-50 border-red-200' :
                flag.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                'bg-gray-50 border-gray-200'
              }`}>
                <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  flag.severity === 'high' ? 'text-red-500' :
                  flag.severity === 'medium' ? 'text-yellow-500' :
                  'text-gray-400'
                }`} />
                <div>
                  <p className="text-sm font-medium text-gray-800">{flag.flag}</p>
                  <Badge variant="outline" className="text-xs mt-1">{flag.severity} severity</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Training Track */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Training Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-3 ${trackConfig.badgeColor}`}>
            {trackConfig.label}
          </div>
          <p className="text-gray-700 mb-4">{trackConfig.description}</p>
          <p className="text-sm font-semibold text-gray-600 mb-2">Recommended Next Steps:</p>
          <ul className="space-y-1">
            {trackConfig.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-500 mt-1">→</span> {step}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-4">Estimated timeline: {trackConfig.timeline}</p>
        </CardContent>
      </Card>

      {/* Upskill Recommendations */}
      {assessment.upskill_recommendations && (assessment.upskill_recommendations as any[]).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upskill Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {(assessment.upskill_recommendations as string[]).map((rec, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 p-2 rounded bg-blue-50">
                  <span className="text-blue-500 font-bold">{i + 1}.</span> {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
