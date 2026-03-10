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

const BAND_COLORS: Record<string, string> = {
  not_ready:     'bg-red-100 text-red-700',
  emerging:      'bg-orange-100 text-orange-700',
  capable:       'bg-yellow-100 text-yellow-700',
  strong:        'bg-green-100 text-green-700',
  high_leverage: 'bg-blue-100 text-blue-700',
}

const ROLE_LABELS: Record<string, string> = {
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
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Input
          placeholder="Search name or department..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          className="w-60"
        />
        <Select value={deptFilter} onValueChange={v => { setDeptFilter(v); setPage(1) }}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Department" /></SelectTrigger>
          <SelectContent>
            {departments.map(d => <SelectItem key={d} value={d}>{d === 'all' ? 'All Departments' : d}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={bandFilter} onValueChange={v => { setBandFilter(v); setPage(1) }}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Readiness Band" /></SelectTrigger>
          <SelectContent>
            {bands.map(b => <SelectItem key={b} value={b}>{b === 'all' ? 'All Bands' : b.replace('_', ' ')}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Name / ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Readiness</TableHead>
              <TableHead>Best Fit Role</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Track</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-gray-400 py-8">No results</TableCell></TableRow>
            ) : paged.map(row => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-blue-50 transition-colors"
                onClick={() => router.push(`/employee/${row.id}`)}
              >
                <TableCell className="font-medium">{row.employee_name ?? row.id.slice(0, 8)}</TableCell>
                <TableCell className="text-gray-500">{row.department ?? '—'}</TableCell>
                <TableCell>
                  <Badge className={BAND_COLORS[row.readiness_band] ?? ''}>
                    {row.readiness_band?.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>{ROLE_LABELS[row.best_fit_role] ?? row.best_fit_role}</TableCell>
                <TableCell>
                  <Badge variant={row.risk_level === 'High' ? 'destructive' : 'outline'}>
                    {row.risk_level}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">{row.training_track}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{filtered.length} total results</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span>Page {page} of {totalPages || 1}</span>
          <Button variant="outline" size="icon" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
