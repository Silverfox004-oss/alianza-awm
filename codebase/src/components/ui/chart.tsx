"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type ChartConfig = Record<
  string,
  {
    label?: string
    color?: string
    icon?: React.ComponentType
  }
>

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

function ChartContainer({ config, className, children, ...props }: ChartContainerProps) {
  const cssVars = Object.entries(config).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value.color) {
      acc[`--color-${key}`] = value.color
    }
    return acc
  }, {})

  return (
    <div className={cn("flex aspect-video justify-center text-xs", className)} style={cssVars as React.CSSProperties} {...props}>
      {children}
    </div>
  )
}

function ChartTooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-1">
        {label && <p className="text-sm font-medium">{label}</p>}
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltipContent }
