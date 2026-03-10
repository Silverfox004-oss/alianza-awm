import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStep {
  id: string;
  label: string;
  status: "completed" | "current" | "upcoming";
}

export function ProgressIndicator({ steps }: { steps: ProgressStep[] }) {
  return (
    <nav aria-label="Assessment progress">
      <ol className="space-y-2">
        {steps.map((step) => (
          <li key={step.id} className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
            step.status === "current" && "bg-primary/10 font-medium text-primary",
            step.status === "completed" && "text-muted-foreground",
            step.status === "upcoming" && "text-muted-foreground/60"
          )}>
            {step.status === "completed" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
            ) : step.status === "current" ? (
              <Clock className="h-4 w-4 shrink-0 text-primary" />
            ) : (
              <Circle className="h-4 w-4 shrink-0" />
            )}
            <span className="truncate">{step.label}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
