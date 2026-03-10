'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function RiskConcentrationChart({ data }: { data: Array<{ dept: string; low: number; medium: number; high: number }> }) {
  return (
    <Card>
      <CardHeader><CardTitle>Risk Concentration by Department</CardTitle></CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="low"    stackId="a" fill="#86efac" name="Low" />
            <Bar dataKey="medium" stackId="a" fill="#fde047" name="Medium" />
            <Bar dataKey="high"   stackId="a" fill="#f87171" name="High" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
