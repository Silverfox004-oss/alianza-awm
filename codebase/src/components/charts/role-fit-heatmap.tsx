'use client'

import { ResponsiveHeatMap } from '@nivo/heatmap'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'

export function RoleFitHeatmap({ data }: { data: any[] }) {
  const router = useRouter()

  return (
    <Card>
      <CardContent className="pt-4">
        <div style={{ height: Math.max(300, data.length * 40 + 80) }}>
          <ResponsiveHeatMap
            data={data}
            margin={{ top: 60, right: 80, bottom: 20, left: 120 }}
            valueFormat=">-.0f"
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
              <div className="bg-white shadow-lg rounded p-2 text-sm">
                <strong>{cell.serieId}</strong> — {cell.data.x}<br />
                Score: <strong>{cell.value}</strong>
              </div>
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
        </div>
      </CardContent>
    </Card>
  )
}
