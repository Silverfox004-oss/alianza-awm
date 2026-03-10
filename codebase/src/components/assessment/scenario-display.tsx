import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Scenario } from "@/types";

export function ScenarioDisplay({ scenario, index, total }: {
  scenario: Scenario; index: number; total: number;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="outline">{scenario.module_label}</Badge>
        <span className="text-sm text-muted-foreground">
          Scenario {index + 1} of {total}
        </span>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{scenario.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scenario.context && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">Context</h3>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{scenario.context}</p>
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">Your Task</h3>
            <p className="leading-relaxed whitespace-pre-wrap">{scenario.task}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
