"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Accordion({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { type?: string; collapsible?: boolean }) {
  return <div className={cn("", className)} {...props}>{children}</div>
}

function AccordionItem({ className, value, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className={cn("border-b", className)} data-state={open ? "open" : "closed"} {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, { open, setOpen })
          : child
      )}
    </div>
  )
}

function AccordionTrigger({ className, children, open, setOpen, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { open?: boolean; setOpen?: (v: boolean) => void }) {
  return (
    <h3 className="flex">
      <button
        className={cn("flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline", className)}
        onClick={() => setOpen?.(!open)}
        {...props}
      >
        {children}
        <span className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")}>&#9662;</span>
      </button>
    </h3>
  )
}

function AccordionContent({ className, children, open, ...props }: React.HTMLAttributes<HTMLDivElement> & { open?: boolean }) {
  if (!open) return null
  return (
    <div className={cn("overflow-hidden text-sm", className)} {...props}>
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
