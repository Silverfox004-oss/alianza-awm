# Phase 3 — Screen 3: Employee Results

**Notion URL:** https://www.notion.so/31ed807b911181669350e07fb32ebc0e

---

This page is the **developer handoff spec** for the Employee Results screen — displayed immediately after the grading pipeline completes. It shows the employee their readiness band, role-fit scores, domain radar chart, risk flags, training track, and a downloadable PDF report.
---
## File Map
| File | Type | Purpose |
|---|---|---|
| `src/app/(employee)/results/page.tsx` | Server Component | Loads RoleFitResult + Evaluation from Supabase |
| `src/components/assessment/results-dashboard.tsx` | Client Component | Full results UI |
| `src/components/charts/domain-radar-chart.tsx` | Client Component | Recharts RadarChart for 7 domains |
| `src/components/assessment/results-pdf.tsx` | Client Component | @react-pdf/renderer PDF generation |
| `src/components/assessment/grading-skeleton.tsx` | Client Component | Loading/in-progress state |
---
## 1. Page Component
`src/app/(employee)/results/page.tsx`
```typescript
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { ResultsDashboard } from '@/components/assessment/results-dashboard'
import type { RoleFitResult, Evaluation } from '@/types'

interface ResultsPageProps {
  searchParams: { evaluation_id?: string }
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const supabase = createServerClient()
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
    return 
  }

  // Sort role fit results by score desc
  const roleFitResults: RoleFitResult[] = (evaluation.role_fit_results ?? [])
    .sort((a: RoleFitResult, b: RoleFitResult) => b.score - a.score)

  return (
    
  )
}
```
---
## 2. Results Dashboard Component
`src/components/assessment/results-dashboard.tsx`
```typescript
'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Download, Star, TrendingUp } from 'lucide-react'
import { DomainRadarChart } from '@/components/charts/domain-radar-chart'
import { ResultsPDFDownload } from '@/components/assessment/results-pdf'
import type { Evaluation, RoleFitResult, ReadinessBand } from '@/types'

// ── Readiness band config ──────────────────────────────────────────────────
const BAND_CONFIG: Record = {
  not_ready:     { label: 'Not Ready',     color: 'text-red-700',    bg: 'bg-red-100' },
  emerging:      { label: 'Emerging',      color: 'text-orange-700', bg: 'bg-orange-100' },
  capable:       { label: 'Capable',       color: 'text-yellow-700', bg: 'bg-yellow-100' },
  strong:        { label: 'Strong',        color: 'text-green-700',  bg: 'bg-green-100' },
  high_leverage: { label: 'High Leverage', color: 'text-blue-700',   bg: 'bg-blue-100' },
}

// ── Role display names ─────────────────────────────────────────────────────
const ROLE_LABELS: Record = {
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
  evaluation: Evaluation
  roleFitResults: RoleFitResult[]
}

export function ResultsDashboard({ evaluation, roleFitResults }: Props) {
  const band = evaluation.readiness_band as ReadinessBand
  const bandConfig = BAND_CONFIG[band]
  const track = evaluation.training_track as 'A' | 'B' | 'C' | 'D'
  const trackConfig = TRACK_CONFIG[track]
  const top3Roles = roleFitResults.slice(0, 3)

  // Build domain scores array for radar chart
  const domainScores = [
    { domain: 'Task Framing',           score: evaluation.domain_scores?.task_framing ?? 0 },
    { domain: 'Process Thinking',       score: evaluation.domain_scores?.process_thinking ?? 0 },
    { domain: 'Verification Instinct',  score: evaluation.domain_scores?.verification_instinct ?? 0 },
    { domain: 'Exception Handling',     score: evaluation.domain_scores?.exception_handling ?? 0 },
    { domain: 'Risk Judgment',          score: evaluation.domain_scores?.risk_judgment ?? 0 },
    { domain: 'Operational Consistency',score: evaluation.domain_scores?.operational_consistency ?? 0 },
    { domain: 'Change Leverage',        score: evaluation.domain_scores?.change_leverage ?? 0 },
  ]

  const riskFlags: Array =
    evaluation.risk_flags ?? []

  return (
    
      {/* Header */}
      
        
          Your AI Readiness Results
          Assessment completed — here's what we found.
        
        
      

      {/* Readiness Band Badge */}
      
        
          
            
              {bandConfig.label}
            
            
              Overall Readiness Score
              {evaluation.readiness_score}/100
            
          
        
      

      {/* Role Fit Ranking */}
      
        
           Top Role Fits
        
        
          {top3Roles.map((r, i) => (
            
              
                #{i + 1}
                {ROLE_LABELS[r.role] ?? r.role}
              
              
                
                  
                
                {r.score}
              
            
          ))}
        
      

      {/* Domain Radar Chart */}
      
        
          Domain Profile
        
        
          
        
      

      {/* Risk Flags */}
      {riskFlags.length > 0 && (
        
          
            
               Risk Flags
            
          
          
            {riskFlags.map((flag, i) => (
              
                
                
                  {flag.flag}
                  {flag.severity} severity
                
              
            ))}
          
        
      )}

      {/* Training Track */}
      
        
           Training Path
        
        
          
            {trackConfig.label}
          
          {trackConfig.description}
          Recommended Next Steps:
          
            {trackConfig.nextSteps.map((step, i) => (
              
                → {step}
              
            ))}
          
          Estimated timeline: {trackConfig.timeline}
        
      

      {/* Upskill Recommendations */}
      {evaluation.upskill_recommendations && evaluation.upskill_recommendations.length > 0 && (
        
          
            Upskill Recommendations
          
          
            
              {evaluation.upskill_recommendations.map((rec: string, i: number) => (
                
                  {i + 1}. {rec}
                
              ))}
            
          
        
      )}
    
  )
}
```
---
## 3. Domain Radar Chart Component
`src/components/charts/domain-radar-chart.tsx`
```typescript
'use client'

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

interface DomainScore {
  domain: string
  score: number
}

interface Props {
  data: DomainScore[]
  height?: number
}

const chartConfig: ChartConfig = {
  score: {
    label: 'Score',
    color: 'hsl(var(--chart-1))',
  },
}

export function DomainRadarChart({ data, height = 380 }: Props) {
  return (
    
      
        
          
          
          
          
          } />
        
      
    
  )
}
```
---
## 4. PDF Download Component
`src/components/assessment/results-pdf.tsx`
```typescript
'use client'

import dynamic from 'next/dynamic'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Document, Page, Text, View, StyleSheet, PDFDownloadLink,
} from '@react-pdf/renderer'
import type { Evaluation, RoleFitResult } from '@/types'

const styles = StyleSheet.create({
  page:         { padding: 40, fontFamily: 'Helvetica', backgroundColor: '#fff' },
  title:        { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  section:      { marginBottom: 20 },
  heading:      { fontSize: 14, fontWeight: 'bold', marginBottom: 6, color: '#1e3a5f' },
  row:          { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label:        { fontSize: 10, color: '#6b7280' },
  value:        { fontSize: 10, color: '#111827', fontWeight: 'bold' },
  badge:        { fontSize: 10, padding: '2 6', borderRadius: 4, backgroundColor: '#dbeafe', color: '#1e40af' },
  domainRow:    { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  bar:          { height: 6, backgroundColor: '#3b82f6', borderRadius: 3, marginLeft: 8 },
  barBg:        { width: 80, height: 6, backgroundColor: '#e5e7eb', borderRadius: 3 },
  flag:         { padding: '4 8', marginBottom: 4, borderRadius: 4, backgroundColor: '#fef9c3', fontSize: 9 },
  footer:       { position: 'absolute', bottom: 20, left: 40, right: 40, fontSize: 8, color: '#9ca3af', textAlign: 'center' },
})

const ROLE_LABELS: Record = {
  ai_operator: 'AI Operator',
  ai_approver: 'AI Approver',
  workflow_translator: 'Workflow Translator',
  ai_qa_reviewer: 'AI QA Reviewer',
  change_champion: 'Change Champion',
}

function ResultsDocument({
  evaluation,
  roleFitResults,
  domainScores,
}: {
  evaluation: Evaluation
  roleFitResults: RoleFitResult[]
  domainScores: Array
}) {
  const riskFlags: Array = evaluation.risk_flags ?? []
  const track = evaluation.training_track as string

  return (
    
      
        AI Readiness Assessment Report
        
          Generated {new Date().toLocaleDateString()}
        

        {/* Readiness Overview */}
        
          Readiness Overview
          
            Readiness Band
            {evaluation.readiness_band?.replace('_', ' ').toUpperCase()}
          
          
            Overall Score
            {evaluation.readiness_score} / 100
          
          
            Training Track
            Track {track}
          
        

        {/* Role Fit */}
        
          Top Role Fits
          {roleFitResults.slice(0, 3).map((r, i) => (
            
              #{i + 1} {ROLE_LABELS[r.role] ?? r.role}
              {r.score}
            
          ))}
        

        {/* Domain Scores */}
        
          Domain Scores
          {domainScores.map((d) => (
            
              {d.domain}
              
                
              
              {d.score}
            
          ))}
        

        {/* Risk Flags */}
        {riskFlags.length > 0 && (
          
            Risk Flags
            {riskFlags.map((f, i) => (
              
                {f.flag} ({f.severity} severity)
              
            ))}
          
        )}

        Confidential — AI Workforce Map Assessment
      
    
  )
}

export function ResultsPDFDownload({
  evaluation,
  roleFitResults,
  domainScores,
}: {
  evaluation: Evaluation
  roleFitResults: RoleFitResult[]
  domainScores: Array
}) {
  return (
    }
      fileName={`ai-readiness-results-${evaluation.id}.pdf`}
    >
      {({ loading }) => (
        
          
          {loading ? 'Preparing PDF...' : 'Download Report'}
        
      )}
    
  )
}
```
---
## 5. Grading In-Progress State
`src/components/assessment/grading-skeleton.tsx`
```typescript
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase/client'
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
          if (payload.new.status === 'complete') {
            router.push(`/results?evaluation_id=${evaluationId}`)
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [evaluationId, router, supabase])

  return (
    
      
        Analyzing Your Responses
        Our AI is evaluating your answers across 7 domains. This takes about 30 seconds.
      
      
      
        
        
        
      
      Do not close this tab.
    
  )
}
```
---
## 6. Print-Friendly CSS
Add to `src/app/globals.css`:
```css
@media print {
  /* Hide interactive elements */
  button,
  nav,
  [data-print-hidden] {
    display: none !important;
  }

  /* Ensure cards print with borders */
  .card {
    border: 1px solid #e5e7eb !important;
    page-break-inside: avoid;
    margin-bottom: 16px;
  }

  /* Domain radar — recharts SVG prints cleanly */
  .recharts-wrapper svg {
    max-width: 100%;
  }

  body {
    font-size: 12px;
    color: #000;
  }

  h1 { font-size: 20px; }
  h2 { font-size: 16px; }
}
```
---
## Supabase Schema References
**`evaluations`**** table columns used:**
- `id` uuid
- `status` text — `'grading' | 'complete' | 'error'`
- `readiness_band` text — ReadinessBand enum
- `readiness_score` integer (0–100)
- `training_track` text — `'A' | 'B' | 'C' | 'D'`
- `domain_scores` jsonb — `{ task_framing: number, process_thinking: number, ... }`
- `risk_flags` jsonb — `Array`
- `upskill_recommendations` jsonb — `string[]`
**`role_fit_results`**** table columns used:**
- `id` uuid
- `evaluation_id` uuid (FK → evaluations)
- `role` text — RoleName enum
- `score` integer (0–100)
- `rationale` text
---
## Notes
- The `GradingInProgress` component uses **Supabase Realtime** channel subscription — no polling loop needed.
- `@react-pdf/renderer` renders server-side too; import it with `dynamic({ ssr: false })` if hydration issues arise.
- The radar chart requires `height` passed explicitly; `h-[380px]` is optimal for 7 axes without label clipping.
- `PDFDownloadLink` renders a native `` tag — wrap in `` to compose with shadcn Button via `asChild`.