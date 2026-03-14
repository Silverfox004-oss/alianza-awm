"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
}

const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

function RadioGroup({ value, onValueChange, defaultValue, className, children, ...props }: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const currentValue = value ?? internalValue
  const handleChange = onValueChange ?? setInternalValue

  return (
    <RadioGroupContext.Provider value={{ value: currentValue, onValueChange: handleChange }}>
      <div role="radiogroup" className={cn("grid gap-2", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

function RadioGroupItem({ className, value, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { value: string }) {
  const ctx = React.useContext(RadioGroupContext)
  return (
    <input
      type="radio"
      role="radio"
      aria-checked={ctx.value === value}
      checked={ctx.value === value}
      onChange={() => ctx.onValueChange?.(value)}
      className={cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className)}
      {...props}
    />
  )
}

export { RadioGroup, RadioGroupItem }
