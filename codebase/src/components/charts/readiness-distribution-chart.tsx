'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const BAND_COLORS: Record<string, string> = {
  'not ready':     '#ef4444',
  'emerging':      '#f97316',
  'capable':       '#eab308',
  'strong':        '#22c55e',
  'high leverage': '#3b82f6',
}

export function ReadinessDistributionChart({ data }: { data: Array<{ band: string; count: number }> }) {
  return (
    <Card>
      <CardHeader><CardTitle>Readiness Distribution</CardTitle></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <XAxis dataKey="band" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.band} fill={BAND_COLORS[entry.band] ?? '#94a3b8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
