# Phase 3 — Screens 4-8: Employer Dashboard

**Notion URL:** https://www.notion.so/31ed807b91118146b279c573323ab1cb

---

# Overview
This page is the **developer handoff spec** for all 5 employer dashboard views (Screens 4–8). Employer admins log in and access these views via a shared sidebar layout. All views are server-rendered Next.js pages with client-side interactivity via shadcn/ui, Recharts, and Nivo.
---
## File Map
| File | Screen | Purpose |
|---|---|---|
| `src/components/layout/dashboard-layout.tsx` | Shared | Sidebar + shell for all employer views |
| `src/app/(employer)/dashboard/page.tsx` | Screen 4 | Overview KPIs + readiness map |
| `src/app/(employer)/ranking/page.tsx` | Screen 5 | Employee sortable ranking table |
| `src/app/(employer)/matrix/page.tsx` | Screen 6 | Role-fit heatmap |
| `src/app/(employer)/risk/page.tsx` | Screen 7 | Risk concentration dashboard |
| `src/app/(employer)/training/page.tsx` | Screen 8 | Training track assignments |
| `src/app/api/dashboard/overview/route.ts` | API | Overview aggregates |
| `src/app/api/dashboard/ranking/route.ts` | API | Employee ranking data |
---
## Shared: Dashboard Layout
`src/components/layout/dashboard-layout.tsx`
```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, Grid3x3, AlertTriangle, BookOpen, LogOut,
} from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview',    icon: LayoutDashboard },
  { href: '/ranking',   label: 'Rankings',    icon: Users },
  { href: '/matrix',    label: 'Role Matrix', icon: Grid3x3 },
  { href: '/risk',      label: 'Risk',        icon: AlertTriangle },
  { href: '/training',  label: 'Training',    icon: BookOpen },
]

export function DashboardLayout({ children, companyName }: { children: React.ReactNode; companyName?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createBrowserClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    
      {/* Sidebar */}
      
        
          AI Workforce Map
          {companyName && {companyName}}
        
        
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            
              
              {label}
            
          ))}
        
        
          
             Sign Out
          
        
      

      {/* Main */}
      
        {children}
      
    
  )
}
```
---
## Screen 4 — Overview Dashboard
`src/app/(employer)/dashboard/page.tsx`
```typescript
import { createServerClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { OverviewKPIs } from '@/components/dashboard/overview-kpis'
import { ReadinessDistributionChart } from '@/components/charts/readiness-distribution-chart'
import { TeamReadinessMap } from '@/components/dashboard/team-readiness-map'
import { DashboardFilters } from '@/components/dashboard/dashboard-filters'
import { ExportCSVButton } from '@/components/dashboard/export-csv-button'

export default async function DashboardPage() {
  const supabase = createServerClient()

  // Get current admin's company
  const { data: { user } } = await supabase.auth.getUser()
  const { data: companyUser } = await supabase
    .from('company_users')
    .select('company_id, companies(name)')
    .eq('user_id', user!.id)
    .single()

  const companyId = companyUser?.company_id

  // Aggregate stats
  const { data: evaluations } = await supabase
    .from('evaluations')
    .select('id, readiness_band, readiness_score, risk_flags, department')
    .eq('company_id', companyId)
    .eq('status', 'complete')

  const total     = evaluations?.length ?? 0
  const avgScore  = total ? Math.round((evaluations!.reduce((s, e) => s + (e.readiness_score ?? 0), 0)) / total) : 0
  const highLev   = evaluations?.filter(e => e.readiness_band === 'high_leverage').length ?? 0
  const riskCount = evaluations?.reduce((sum, e) => sum + ((e.risk_flags as any[])?.filter(f => f.severity === 'high').length ?? 0), 0) ?? 0

  // Band distribution
  const bandCounts = ['not_ready','emerging','capable','strong','high_leverage'].map(band => ({
    band: band.replace('_', ' '),
    count: evaluations?.filter(e => e.readiness_band === band).length ?? 0,
  }))

  // Department x role coverage map
  const { data: roleFits } = await supabase
    .from('role_fit_results')
    .select('role, score, evaluations!inner(department, company_id)')
    .eq('evaluations.company_id', companyId)

  return (
    
      
        
          Overview
          
            
            
          
        

        

        
          
          
        
      
    
  )
}
```
### KPI Cards Component
`src/components/dashboard/overview-kpis.tsx`
```typescript
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Users, TrendingUp, Star, AlertTriangle } from 'lucide-react'

interface Props {
  total: number
  avgScore: number
  highLeverage: number
  riskFlags: number
}

const KPI_CONFIG = [
  { key: 'total',       label: 'Employees Assessed',  icon: Users,         color: 'text-blue-600',   bg: 'bg-blue-50' },
  { key: 'avgScore',    label: 'Avg Readiness Score', icon: TrendingUp,    color: 'text-green-600',  bg: 'bg-green-50' },
  { key: 'highLeverage',label: 'High-Leverage',       icon: Star,          color: 'text-purple-600', bg: 'bg-purple-50' },
  { key: 'riskFlags',   label: 'High Risk Flags',     icon: AlertTriangle, color: 'text-red-600',    bg: 'bg-red-50' },
]

export function OverviewKPIs({ total, avgScore, highLeverage, riskFlags }: Props) {
  const values = { total, avgScore, highLeverage, riskFlags }
  return (
    
      {KPI_CONFIG.map(({ key, label, icon: Icon, color, bg }) => (
        
          
            
              
                {label}
                {(values as any)[key]}
              
              
                
              
            
          
        
      ))}
    
  )
}
```
### Readiness Distribution Bar Chart
`src/components/charts/readiness-distribution-chart.tsx`
```typescript
'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const BAND_COLORS: Record = {
  'not ready':     '#ef4444',
  'emerging':      '#f97316',
  'capable':       '#eab308',
  'strong':        '#22c55e',
  'high leverage': '#3b82f6',
}

export function ReadinessDistributionChart({ data }: { data: Array }) {
  return (
    
      Readiness Distribution
      
        
          
            
            
            
            
              {data.map((entry) => (
                
              ))}
            
          
        
      
    
  )
}
```
---
## Screen 5 — Employee Ranking
`src/app/(employer)/ranking/page.tsx`
```typescript
import { createServerClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RankingTable } from '@/components/dashboard/ranking-table'

export default async function RankingPage() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: companyUser } = await supabase
    .from('company_users').select('company_id').eq('user_id', user!.id).single()

  const { data: evaluations } = await supabase
    .from('evaluations')
    .select(`
      id, created_at, readiness_band, readiness_score, training_track,
      department, risk_flags,
      role_fit_results ( role, score )
    `)
    .eq('company_id', companyUser?.company_id)
    .eq('status', 'complete')
    .order('readiness_score', { ascending: false })

  // Flatten: add best-fit role and risk level
  const rows = (evaluations ?? []).map(e => {
    const sorted = (e.role_fit_results as any[])?.sort((a: any, b: any) => b.score - a.score) ?? []
    const highRiskCount = (e.risk_flags as any[])?.filter((f: any) => f.severity === 'high').length ?? 0
    return {
      ...e,
      best_fit_role: sorted[0]?.role ?? 'N/A',
      risk_level: highRiskCount >= 2 ? 'High' : highRiskCount === 1 ? 'Medium' : 'Low',
    }
  })

  return (
    
      
        Employee Rankings
        
      
    
  )
}
```
### Ranking Table Component
`src/components/dashboard/ranking-table.tsx`
```typescript
'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 10

const BAND_COLORS: Record = {
  not_ready:     'bg-red-100 text-red-700',
  emerging:      'bg-orange-100 text-orange-700',
  capable:       'bg-yellow-100 text-yellow-700',
  strong:        'bg-green-100 text-green-700',
  high_leverage: 'bg-blue-100 text-blue-700',
}

const ROLE_LABELS: Record = {
  ai_operator: 'AI Operator',
  ai_approver: 'AI Approver',
  workflow_translator: 'Workflow Translator',
  ai_qa_reviewer: 'AI QA Reviewer',
  change_champion: 'Change Champion',
}

export function RankingTable({ rows }: { rows: any[] }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')
  const [bandFilter, setBandFilter] = useState('all')
  const [page, setPage] = useState(1)

  const departments = useMemo(() =>
    ['all', ...Array.from(new Set(rows.map(r => r.department).filter(Boolean)))],
    [rows]
  )

  const bands = ['all', 'not_ready', 'emerging', 'capable', 'strong', 'high_leverage']

  const filtered = useMemo(() => rows.filter(r => {
    const matchSearch = !search ||
      (r.employee_name ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (r.department ?? '').toLowerCase().includes(search.toLowerCase())
    const matchDept  = deptFilter === 'all' || r.department === deptFilter
    const matchBand  = bandFilter === 'all' || r.readiness_band === bandFilter
    return matchSearch && matchDept && matchBand
  }), [rows, search, deptFilter, bandFilter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    
      {/* Filters */}
      
         { setSearch(e.target.value); setPage(1) }}
          className="w-60"
        />
         { setDeptFilter(v); setPage(1) }}>
          
          
            {departments.map(d => {d === 'all' ? 'All Departments' : d})}
          
        
         { setBandFilter(v); setPage(1) }}>
          
          
            {bands.map(b => {b === 'all' ? 'All Bands' : b.replace('_', ' ')})}
          
        
      

      {/* Table */}
      
        
          
            
              Name / ID
              Department
              Readiness
              Best Fit Role
              Risk Level
              Track
            
          
          
            {paged.length === 0 ? (
              No results
            ) : paged.map(row => (
               router.push(`/employee/${row.id}`)}
              >
                {row.employee_name ?? row.id.slice(0, 8)}
                {row.department ?? '—'}
                
                  
                    {row.readiness_band?.replace('_', ' ')}
                  
                
                {ROLE_LABELS[row.best_fit_role] ?? row.best_fit_role}
                
                  
                    {row.risk_level}
                  
                
                {row.training_track}
              
            ))}
          
        
      

      {/* Pagination */}
      
        {filtered.length} total results
        
           setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            
          
          Page {page} of {totalPages || 1}
           setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
            
          
        
      
    
  )
}
```
---
## Screen 6 — Role-Fit Matrix (Heatmap)
`src/app/(employer)/matrix/page.tsx`
```typescript
import { createServerClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RoleFitHeatmap } from '@/components/charts/role-fit-heatmap'

export default async function MatrixPage() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: companyUser } = await supabase
    .from('company_users').select('company_id').eq('user_id', user!.id).single()

  // Get all employees with all 5 role scores
  const { data: roleFits } = await supabase
    .from('role_fit_results')
    .select('role, score, evaluation_id, evaluations!inner(id, employee_name, company_id)')
    .eq('evaluations.company_id', companyUser?.company_id)

  // Build Nivo heatmap data: array of { id: employeeId, data: [{ x: role, y: score }] }
  const grouped: Record = {}
  for (const rf of roleFits ?? []) {
    const evalData = rf.evaluations as any
    const empId = evalData.id
    const name  = evalData.employee_name ?? empId.slice(0, 8)
    if (!grouped[empId]) grouped[empId] = { id: name, data: [] }
    grouped[empId].data.push({ x: rf.role.replace('_', ' '), y: rf.score })
  }
  const heatmapData = Object.values(grouped)

  return (
    
      
        Role-Fit Matrix
        Color intensity = fit score (0–100). Click a cell to view employee detail.
        
      
    
  )
}
```
### Nivo Heatmap Component
`src/components/charts/role-fit-heatmap.tsx`
```typescript
'use client'

import { ResponsiveHeatMap } from '@nivo/heatmap'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'

export function RoleFitHeatmap({ data }: { data: any[] }) {
  const router = useRouter()

  return (
    
      
        
          -.0f"
            colors={{
              type: 'sequential',
              scheme: 'blues',
              minValue: 0,
              maxValue: 100,
            }}
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -30,
              legend: 'Role',
              legendPosition: 'middle',
              legendOffset: -46,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Employee',
              legendPosition: 'middle',
              legendOffset: -100,
            }}
            onClick={(cell) => {
              // Navigate to employee detail (cell.serieId is the employee name/id)
              // In production, map name back to evaluationId
              console.log('Clicked cell:', cell)
            }}
            tooltip={({ cell }) => (
              
                {cell.serieId} — {cell.data.x}
                Score: {cell.value}
              
            )}
            legends={[{
              anchor: 'right',
              translateX: 30,
              length: 200,
              thickness: 14,
              direction: 'column',
              title: 'Score →',
              titleAlign: 'start',
              titleOffset: 4,
            }]}
          />
        
      
    
  )
}
```
---
## Screen 7 — Risk Dashboard
`src/app/(employer)/risk/page.tsx`
```typescript
import { createServerClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RiskConcentrationChart } from '@/components/charts/risk-concentration-chart'
import { RiskFlagsTable } from '@/components/dashboard/risk-flags-table'
import { HighRiskEmployeeList } from '@/components/dashboard/high-risk-employee-list'

export default async function RiskPage() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: companyUser } = await supabase
    .from('company_users').select('company_id').eq('user_id', user!.id).single()

  const { data: evaluations } = await supabase
    .from('evaluations')
    .select('id, employee_name, department, risk_flags')
    .eq('company_id', companyUser?.company_id)
    .eq('status', 'complete')

  // Build department x severity stacked bar data
  const deptMap: Record = {}
  const flagFrequency: Record = {}
  const highRiskEmployees: any[] = []

  for (const e of evaluations ?? []) {
    const dept = e.department ?? 'Unknown'
    if (!deptMap[dept]) deptMap[dept] = { dept, low: 0, medium: 0, high: 0 }
    const flags = (e.risk_flags as any[]) ?? []
    for (const f of flags) {
      deptMap[dept][f.severity as 'low' | 'medium' | 'high']++
      flagFrequency[f.flag] = (flagFrequency[f.flag] ?? 0) + 1
    }
    const highCount = flags.filter(f => f.severity === 'high').length
    if (highCount >= 2) {
      highRiskEmployees.push({ ...e, highFlagCount: highCount })
    }
  }

  const deptChartData = Object.values(deptMap)
  const topFlags = Object.entries(flagFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([flag, count]) => ({ flag, count }))

  return (
    
      
        Risk Dashboard

        

        
          
          
        
      
    
  )
}
```
### Risk Concentration Chart (Stacked Bar)
`src/components/charts/risk-concentration-chart.tsx`
```typescript
'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function RiskConcentrationChart({ data }: { data: Array }) {
  return (
    
      Risk Concentration by Department
      
        
          
            
            
            
            
            
            
            
          
        
      
    
  )
}
```
---
## Screen 8 — Training Recommendations
`src/app/(employer)/training/page.tsx`
```typescript
import { createServerClient } from '@/lib/supabase/server'
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
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: companyUser } = await supabase
    .from('company_users').select('company_id').eq('user_id', user!.id).single()

  const { data: evaluations } = await supabase
    .from('evaluations')
    .select('id, employee_name, department, training_track, readiness_score')
    .eq('company_id', companyUser?.company_id)
    .eq('status', 'complete')

  const byTrack: Record = { A: [], B: [], C: [], D: [] }
  for (const e of evaluations ?? []) {
    const t = e.training_track as string
    if (byTrack[t]) byTrack[t].push(e)
  }

  return (
    
      
        Training Recommendations

        
          {(Object.entries(TRACK_META) as [string, typeof TRACK_META.A][]).map(([track, meta]) => (
            
              
                
                  {meta.label}
                  {byTrack[track].length} employees
                
                {meta.timeline}
              
              
                {/* Modules */}
                
                  Recommended Modules:
                  
                    {meta.modules.map((m, i) => (
                      
                        → {m}
                      
                    ))}
                  
                

                {/* Expandable employee list */}
                {byTrack[track].length > 0 && (
                  
                    
                      
                        View {byTrack[track].length} employee{byTrack[track].length !== 1 ? 's' : ''}
                      
                      
                        
                          {byTrack[track].map(e => (
                            
                              {e.employee_name ?? e.id.slice(0, 8)}
                              {e.department ?? '—'}
                            
                          ))}
                        
                      
                    
                  
                )}
              
            
          ))}
        
      
    
  )
}
```
---
## API Routes
### Overview API
`src/app/api/dashboard/overview/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: companyUser } = await supabase
    .from('company_users').select('company_id').eq('user_id', user.id).single()
  if (!companyUser) return NextResponse.json({ error: 'No company' }, { status: 404 })

  const { data: evaluations, error } = await supabase
    .from('evaluations')
    .select('id, readiness_band, readiness_score, training_track, department, risk_flags')
    .eq('company_id', companyUser.company_id)
    .eq('status', 'complete')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const total    = evaluations.length
  const avgScore = total ? Math.round(evaluations.reduce((s, e) => s + (e.readiness_score ?? 0), 0) / total) : 0
  const highLev  = evaluations.filter(e => e.readiness_band === 'high_leverage').length
  const riskCount = evaluations.reduce((sum, e) =>
    sum + ((e.risk_flags as any[])?.filter((f: any) => f.severity === 'high').length ?? 0), 0)

  const bandDist = ['not_ready','emerging','capable','strong','high_leverage'].map(b => ({
    band: b,
    count: evaluations.filter(e => e.readiness_band === b).length,
  }))

  return NextResponse.json({ total, avgScore, highLev, riskCount, bandDist })
}
```
### Ranking API
`src/app/api/dashboard/ranking/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = createServerClient()
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
```
---
## Export CSV Button
`src/components/dashboard/export-csv-button.tsx`
```typescript
'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export function ExportCSVButton({ data, filename }: { data: any[]; filename: string }) {
  function exportCSV() {
    if (!data.length) return
    const headers = Object.keys(data[0])
    const rows = data.map(row =>
      headers.map(h => JSON.stringify(row[h] ?? '')).join(',')
    )
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    
       Export CSV
    
  )
}
```
---
## Supabase Queries Summary
| Screen | Primary Query | Notes |
|---|---|---|
| Overview | `evaluations` SELECT band/score/dept/flags | Aggregate client-side |
| Ranking | `evaluations` JOIN `role_fit_results` | Order by score desc, paginated |
| Matrix | `role_fit_results` JOIN `evaluations` | All 5 roles per employee |
| Risk | `evaluations` | Flatten risk_flags jsonb |
| Training | `evaluations` | Group by training_track |
## Auth Guard
All `(employer)` routes need middleware protection. Add to `middleware.ts`:
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/middleware'

export async function middleware(req: NextRequest) {
  const res  = NextResponse.next()
  const supabase = createMiddlewareClient(req, res)
  const { data: { session } } = await supabase.auth.getSession()

  const isEmployerRoute = req.nextUrl.pathname.startsWith('/dashboard') ||
    req.nextUrl.pathname.startsWith('/ranking') ||
    req.nextUrl.pathname.startsWith('/matrix') ||
    req.nextUrl.pathname.startsWith('/risk') ||
    req.nextUrl.pathname.startsWith('/training')

  if (isEmployerRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return res
}

export const config = { matcher: ['/dashboard/:path*', '/ranking/:path*', '/matrix/:path*', '/risk/:path*', '/training/:path*'] }
```
---
## Package Dependencies
```bash
# Install Nivo heatmap
npm install @nivo/heatmap @nivo/core

# Recharts is already in the stack
# @react-pdf/renderer for Screen 3 PDF
npm install @react-pdf/renderer
```