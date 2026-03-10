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
    <Button variant="outline" size="sm" onClick={exportCSV}>
      <Download className="w-4 h-4 mr-2" /> Export CSV
    </Button>
  )
}
