"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: number[]
  onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => (
    <input
      type="range"
      ref={ref}
      min={min}
      max={max}
      step={step}
      value={value?.[0] ?? 0}
      onChange={(e) => onValueChange?.([Number(e.target.value)])}
      className={cn("w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary", className)}
      {...props}
    />
  )
)
Slider.displayName = "Slider"

export { Slider }
