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
    <ChartContainer config={chartConfig} className={`h-[${height}px] w-full`}>
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="domain"
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="hsl(var(--chart-1))"
            fill="hsl(var(--chart-1))"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
