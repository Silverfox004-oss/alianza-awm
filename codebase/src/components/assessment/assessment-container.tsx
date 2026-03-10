"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, PauseCircle } from "lucide-react";
import { ScenarioDisplay } from "./scenario-display";
import { FollowupChat } from "./followup-chat";
import { ProgressIndicator } from "./progress-indicator";
import { Timer } from "./timer";
import { useAutoSave } from "@/hooks/use-auto-save";
import type { Scenario } from "@/types";

type AssessmentPhase = "responding" | "followup" | "transitioning";

export default function AssessmentContainer({ assessment, scenarios, existingResponses }: {
  assessment: any;
  scenarios: Scenario[];
  existingResponses: any[];
}) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(assessment.current_scenario_index);
  const [phase, setPhase] = useState<AssessmentPhase>("responding");
  const [responseText, setResponseText] = useState(
    existingResponses.find(
      (r) => r.scenario_id === scenarios[assessment.current_scenario_index]?.id
    )?.response_text ?? ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved" | "saving">("saved");

  const currentScenario = scenarios[currentIndex];
  const isLastScenario = currentIndex === scenarios.length - 1;

  const progressSteps = scenarios.map((s, idx) => ({
    id: s.id,
    label: s.module_label ?? `Scenario ${idx + 1}`,
    status: idx < currentIndex ? "completed" : idx === currentIndex ? "current" : "upcoming",
  })) as Array<{ id: string; label: string; status: "completed" | "current" | "upcoming" }>;

  useAutoSave({
    assessmentId: assessment.id,
    scenarioId: currentScenario.id,
    responseText,
    intervalMs: 30_000,
    onSave: () => setSaveStatus("saved"),
    onError: () => setSaveStatus("unsaved"),
  });

  const handleSubmitResponse = useCallback(async () => {
    if (!responseText.trim()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/assessment/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId: assessment.id,
          scenarioId: currentScenario.id,
          responseText, isDraft: false,
        }),
      });
      if (!res.ok) throw new Error("Failed to save response");
      setPhase("followup");
    } catch (err) {
      setSubmitError("Failed to save your response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [assessment.id, currentScenario.id, responseText]);

  const handleNextScenario = useCallback(async () => {
    setPhase("transitioning");
    const nextIndex = currentIndex + 1;
    if (nextIndex >= scenarios.length) {
      await fetch("/api/assessment/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId: assessment.id,
          scenarioId: currentScenario.id,
          isFinal: true,
        }),
      });
      router.push(`/complete?id=${assessment.id}`);
      return;
    }
    await fetch("/api/assessment/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assessmentId: assessment.id, currentScenarioIndex: nextIndex }),
    });
    setCurrentIndex(nextIndex);
    setResponseText(
      existingResponses.find((r) => r.scenario_id === scenarios[nextIndex]?.id)?.response_text ?? ""
    );
    setPhase("responding");
    setSaveStatus("saved");
  }, [currentIndex, scenarios, assessment.id, currentScenario.id, router, existingResponses]);

  const handlePause = useCallback(async () => {
    await fetch("/api/assessment/pause", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assessmentId: assessment.id }),
    });
    router.push(`/paused?id=${assessment.id}`);
  }, [assessment.id, router]);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 border-r flex-col p-4 shrink-0">
        <div className="mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Assessment Progress</p>
          <p className="text-sm font-medium">{currentIndex + 1} / {scenarios.length} scenarios</p>
        </div>
        <ProgressIndicator steps={progressSteps} />
        <div className="mt-auto pt-4 border-t">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full">
                <PauseCircle className="mr-2 h-4 w-4" />Pause
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Pause Assessment?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your progress will be saved. You can resume using the same link.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Continue</AlertDialogCancel>
                <AlertDialogAction onClick={handlePause}>Pause</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-4 py-8 max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <Badge variant="secondary">Module {currentIndex + 1} of {scenarios.length}</Badge>
          {currentScenario.time_limit_seconds && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>Time remaining:</span>
              <Timer limitSeconds={currentScenario.time_limit_seconds} onExpire={handleSubmitResponse} />
            </div>
          )}
          <span className="text-xs text-muted-foreground">
            {saveStatus === "saved" ? "Auto-saved" : "Unsaved changes"}
          </span>
        </div>

        <ScenarioDisplay scenario={currentScenario} index={currentIndex} total={scenarios.length} />
        <Separator className="my-6" />

        {phase === "responding" && (
          <div className="space-y-4">
            <div>
              <label htmlFor="response" className="text-sm font-medium block mb-2">Your Response</label>
              <Textarea id="response" value={responseText}
                onChange={(e) => { setResponseText(e.target.value); setSaveStatus("unsaved"); }}
                placeholder="Type your response here..."
                className="min-h-[200px] resize-y" />
              <p className="text-xs text-muted-foreground mt-1">Cmd+Enter to submit · Auto-saves every 30 seconds</p>
            </div>
            {submitError && <p className="text-sm text-destructive">{submitError}</p>}
            <Button onClick={handleSubmitResponse} disabled={isSubmitting || !responseText.trim()}
              className="w-full sm:w-auto">
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Submit Response"}
            </Button>
          </div>
        )}

        {phase === "followup" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Follow-up Questions</h3>
            <p className="text-sm text-muted-foreground">
              The AI examiner has reviewed your response and has a follow-up question.
            </p>
            <FollowupChat
              assessmentId={assessment.id}
              scenarioId={currentScenario.id}
              initialUserResponse={responseText}
            />
            <Separator />
            <Button onClick={handleNextScenario} className="w-full sm:w-auto">
              {isLastScenario ? "Finish Assessment" : "Next Scenario →"}
            </Button>
          </div>
        )}

        {phase === "transitioning" && (
          <div className="py-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Loading next scenario...</p>
          </div>
        )}
      </main>
    </div>
  );
}
