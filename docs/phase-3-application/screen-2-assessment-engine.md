# Phase 3 — Screen 2: Assessment Engine

**Notion URL:** https://www.notion.so/31ed807b91118158a871fc3187491e4c

---

## Overview
The assessment engine is the most complex screen in the product. It manages a multi-scenario, timed assessment with streaming AI follow-up questions, auto-save, and pause/resume.
**Route:** `/assessment?id=`
**Auth model:** Assessment ID acts as a bearer token — no Supabase Auth session required.
---
## File Structure
```javascript
src/
  app/
    (employee)/
      assessment/
        page.tsx                        ← Server component
  components/
    assessment/
      assessment-container.tsx          ← Main client orchestrator
      scenario-display.tsx              ← Renders scenario content
      followup-chat.tsx                 ← Streaming examiner Q&A
      progress-indicator.tsx            ← Module/step progress
      timer.tsx                         ← Countdown timer
  hooks/
    use-auto-save.ts                    ← Auto-save every 30s
  app/
    api/
      assessment/
        respond/
          route.ts                      ← POST handler
```
---
## 1. Page Component (`src/app/(employee)/assessment/page.tsx`)
```typescript
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import AssessmentContainer from "@/components/assessment/assessment-container";
import type { Assessment, Scenario } from "@/types";

interface AssessmentPageProps {
  searchParams: Promise;
}

export default async function AssessmentPage({ searchParams }: AssessmentPageProps) {
  const { id } = await searchParams;
  if (!id) notFound();

  const supabase = await createServerClient();

  const { data: assessment, error } = await supabase
    .from("assessments")
    .select(`
      id, status, current_scenario_index, selected_scenario_ids,
      started_at, paused_at, elapsed_seconds,
      company_users(name, department, is_manager),
      companies(id, name, time_limit_seconds)
    `)
    .eq("id", id)
    .single();

  if (error || !assessment) notFound();

  const { data: scenarios } = await supabase
    .from("scenarios")
    .select("id, title, module_label, context, task, time_limit_seconds")
    .in("id", assessment.selected_scenario_ids)
    .order("module_label");

  const { data: responses } = await supabase
    .from("assessment_responses")
    .select("scenario_id, response_text, followup_exchanges, submitted_at")
    .eq("assessment_id", id);

  const orderedScenarios = assessment.selected_scenario_ids
    .map((sid: string) => scenarios?.find((s) => s.id === sid))
    .filter(Boolean) as Scenario[];

  return (
    
  );
}
```
---
## 2. useAutoSave Hook (`src/hooks/use-auto-save.ts`)
```typescript
import { useEffect, useRef, useCallback } from "react";

interface UseAutoSaveOptions {
  assessmentId: string;
  scenarioId: string;
  responseText: string;
  intervalMs?: number;
  onSave?: () => void;
  onError?: (err: Error) => void;
}

/**
 * Saves the current response to Supabase every intervalMs ms.
 * Uses a ref to always capture the latest text without re-registering the interval.
 */
export function useAutoSave({
  assessmentId, scenarioId, responseText,
  intervalMs = 30_000, onSave, onError,
}: UseAutoSaveOptions) {
  const latestText = useRef(responseText);
  const lastSavedText = useRef("");
  const saving = useRef(false);

  useEffect(() => { latestText.current = responseText; }, [responseText]);

  const save = useCallback(async () => {
    if (saving.current || latestText.current === lastSavedText.current) return;
    saving.current = true;
    try {
      const res = await fetch("/api/assessment/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId, scenarioId,
          responseText: latestText.current,
          isDraft: true,
        }),
      });
      if (!res.ok) throw new Error("Auto-save failed");
      lastSavedText.current = latestText.current;
      onSave?.();
    } catch (err) {
      onError?.(err instanceof Error ? err : new Error("Unknown save error"));
    } finally {
      saving.current = false;
    }
  }, [assessmentId, scenarioId, onSave, onError]);

  // Register interval
  useEffect(() => {
    const id = setInterval(save, intervalMs);
    return () => clearInterval(id);
  }, [save, intervalMs]);

  // Save on unmount (scenario change)
  useEffect(() => { return () => { save(); }; }, [save]);

  return { save };
}
```
---
## 3. Timer Component (`src/components/assessment/timer.tsx`)
```typescript
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TimerProps {
  limitSeconds: number;
  elapsedSeconds?: number;
  onExpire?: () => void;
  className?: string;
}

export function Timer({ limitSeconds, elapsedSeconds = 0, onExpire, className }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(limitSeconds - elapsedSeconds);

  useEffect(() => {
    if (secondsLeft  {
      setSecondsLeft((s) => {
        if (s  clearInterval(id);
  }, []); // intentionally runs once

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isWarning = secondsLeft 
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    
  );
}
```
---
## 4. Progress Indicator (`src/components/assessment/progress-indicator.tsx`)
```typescript
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStep {
  id: string;
  label: string;
  status: "completed" | "current" | "upcoming";
}

export function ProgressIndicator({ steps }: { steps: ProgressStep[] }) {
  return (
    
      
        {steps.map((step) => (
          
            {step.status === "completed" ? (
              
            ) : step.status === "current" ? (
              
            ) : (
              
            )}
            {step.label}
          
        ))}
      
    
  );
}
```
---
## 5. Scenario Display (`src/components/assessment/scenario-display.tsx`)
```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Scenario } from "@/types";

export function ScenarioDisplay({ scenario, index, total }: {
  scenario: Scenario; index: number; total: number;
}) {
  return (
    
      
        {scenario.module_label}
        
          Scenario {index + 1} of {total}
        
      
      
        
          {scenario.title}
        
        
          {scenario.context && (
            
              Context
              {scenario.context}
            
          )}
          
            Your Task
            {scenario.task}
          
        
      
    
  );
}
```
---
## 6. Follow-up Chat Component (`src/components/assessment/followup-chat.tsx`)
```typescript
"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";

interface FollowupChatProps {
  assessmentId: string;
  scenarioId: string;
  initialUserResponse: string;
  onExchangeComplete?: (exchanges: { role: string; content: string }[]) => void;
}

export function FollowupChat({
  assessmentId, scenarioId, initialUserResponse, onExchangeComplete,
}: FollowupChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/assessment/respond",
      body: { assessmentId, scenarioId },
      initialMessages: [{ id: "initial", role: "user", content: initialUserResponse }],
      onFinish: (message) => {
        const allMessages = [
          { role: "user", content: initialUserResponse },
          ...messages.slice(1).map((m) => ({ role: m.role, content: m.content })),
          { role: message.role, content: message.content },
        ];
        onExchangeComplete?.(allMessages);
      },
    });

  return (
    
      
        {messages.map((m) => (
          
            {m.role === "assistant" && (
              Follow-up Question
            )}
            {m.content}
          
        ))}
        {isLoading && (
          
            Generating follow-up...
          
        )}
      

      {error && (
        
          Failed to load follow-up question. Please continue to next scenario.
        
      )}

      
         {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit(e as any);
          }} />
        
          
        
      
    
  );
}
```
---
## 7. Assessment Container (`src/components/assessment/assessment-container.tsx`)
This is the primary client orchestrator. Key state:
- `currentIndex`: which scenario we're on
- `phase`: `"responding"` \| `"followup"` \| `"transitioning"`
- `responseText`: current text area content
- `saveStatus`: `"saved"` \| `"unsaved"` \| `"saving"`
```typescript
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

export default function AssessmentContainer({ assessment, scenarios, existingResponses }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(assessment.current_scenario_index);
  const [phase, setPhase] = useState("responding");
  const [responseText, setResponseText] = useState(
    existingResponses.find(
      (r) => r.scenario_id === scenarios[assessment.current_scenario_index]?.id
    )?.response_text ?? ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [saveStatus, setSaveStatus] = useState("saved");

  const currentScenario = scenarios[currentIndex];
  const isLastScenario = currentIndex === scenarios.length - 1;

  const progressSteps = scenarios.map((s, idx) => ({
    id: s.id,
    label: s.module_label ?? `Scenario ${idx + 1}`,
    status: idx  setSaveStatus("saved"),
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
    
      {/* Sidebar */}
      
        
          Assessment Progress
          {currentIndex + 1} / {scenarios.length} scenarios
        
        
        
          
            
              
                Pause
              
            
            
              
                Pause Assessment?
                
                  Your progress will be saved. You can resume using the same link.
                
              
              
                Continue
                Pause
              
            
          
        
      

      {/* Main content */}
      
        
          Module {currentIndex + 1} of {scenarios.length}
          {currentScenario.time_limit_seconds && (
            
              Time remaining:
              
            
          )}
          
            {saveStatus === "saved" ? "Auto-saved" : "Unsaved changes"}
          
        

        
        

        {phase === "responding" && (
          
            
              Your Response
               { setResponseText(e.target.value); setSaveStatus("unsaved"); }}
                placeholder="Type your response here..."
                className="min-h-[200px] resize-y" />
              Cmd+Enter to submit · Auto-saves every 30 seconds
            
            {submitError && {submitError}}
            
              {isSubmitting ? <>Saving... : "Submit Response"}
            
          
        )}

        {phase === "followup" && (
          
            Follow-up Questions
            
              The AI examiner has reviewed your response and has a follow-up question.
            
            
            
            
              {isLastScenario ? "Finish Assessment" : "Next Scenario →"}
            
          
        )}

        {phase === "transitioning" && (
          
            
            Loading next scenario...
          
        )}
      
    
  );
}
```
---
## 8. API Route (`src/app/api/assessment/respond/route.ts`)
```typescript
import { NextResponse } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createServerClient } from "@/lib/supabase/server";
import { dispatchGrading } from "@/lib/inngest/dispatch";

export const maxDuration = 60;

export async function POST(req: Request) {
  const body = await req.json();
  const { assessmentId, scenarioId, responseText, isDraft = false, isFinal = false, messages } = body;

  if (!assessmentId || !scenarioId) {
    return NextResponse.json({ error: "Missing assessmentId or scenarioId" }, { status: 400 });
  }

  const supabase = await createServerClient();

  const { data: assessment } = await supabase
    .from("assessments")
    .select("id, status, company_id")
    .eq("id", assessmentId)
    .single();

  if (!assessment || assessment.status !== "in_progress") {
    return NextResponse.json({ error: "Assessment not found or not active" }, { status: 404 });
  }

  // Draft auto-save
  if (isDraft) {
    await supabase.from("assessment_responses").upsert(
      { assessment_id: assessmentId, scenario_id: scenarioId, response_text: responseText, updated_at: new Date().toISOString() },
      { onConflict: "assessment_id,scenario_id" }
    );
    return NextResponse.json({ saved: true });
  }

  // Follow-up chat stream (messages array present)
  if (messages && Array.isArray(messages)) {
    const { data: scenario } = await supabase
      .from("scenarios")
      .select("title, context, task")
      .eq("id", scenarioId)
      .single();

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      system: `You are an AI assessment examiner. The employee is completing a scenario-based AI readiness assessment.
Scenario: "${scenario?.title}"
Context: ${scenario?.context}
Task: ${scenario?.task}

Ask ONE clear, probing follow-up question about their reasoning, edge cases, or failure modes. Be direct and concise.`,
      messages,
    });

    // Persist exchange asynchronously
    result.text.then(async (fullText) => {
      await supabase.from("assessment_responses").upsert(
        {
          assessment_id: assessmentId,
          scenario_id: scenarioId,
          followup_exchanges: messages.concat([{ role: "assistant", content: fullText }]),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "assessment_id,scenario_id" }
      );
    });

    return result.toDataStreamResponse();
  }

  // Full response submit
  await supabase.from("assessment_responses").upsert(
    {
      assessment_id: assessmentId,
      scenario_id: scenarioId,
      response_text: responseText,
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "assessment_id,scenario_id" }
  );

  // Trigger grading on final scenario
  if (isFinal) {
    await supabase
      .from("assessments")
      .update({ status: "grading", completed_at: new Date().toISOString() })
      .eq("id", assessmentId);
    await dispatchGrading(assessmentId);
  }

  return NextResponse.json({ saved: true });
}
```
---
## 9. Session Pause / Resume Logic
**Pause flow:**
1. User clicks Pause in the sidebar
2. `POST /api/assessment/pause` sets `paused_at = now()`, `status = "paused"`, calculates and stores `elapsed_seconds`
3. User is redirected to `/paused?id=`
**Resume flow:**
1. User revisits `/assessment?id=` — page component detects `status = "paused"`, updates to `"in_progress"`, restores `current_scenario_index`
2. `existingResponses` are loaded server-side and hydrated into the form
**Pause API (****`src/app/api/assessment/pause/route.ts`****):**
```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { assessmentId } = await req.json();
  const supabase = await createServerClient();

  const { data: assessment } = await supabase
    .from("assessments")
    .select("started_at, elapsed_seconds")
    .eq("id", assessmentId)
    .single();

  if (!assessment) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const additionalSeconds = Math.floor(
    (Date.now() - new Date(assessment.started_at).getTime()) / 1000
  );
  const totalElapsed = (assessment.elapsed_seconds ?? 0) + additionalSeconds;

  await supabase
    .from("assessments")
    .update({ status: "paused", paused_at: new Date().toISOString(), elapsed_seconds: totalElapsed })
    .eq("id", assessmentId);

  return NextResponse.json({ paused: true });
}
```
---
## 10. Error Handling
| Scenario | Handling |
|---|---|
| LLM unavailable (follow-up) | `useChat` `error` state — show fallback message, allow skip |
| Auto-save fails | `setSaveStatus("unsaved")` — visible indicator; retries on next interval |
| Response submit fails | `setSubmitError(...)` — inline error, user can retry |
| Timer expires | Calls `handleSubmitResponse()` automatically |
| Assessment not found | `notFound()` → 404 page |
| Grading dispatch fails | Logged server-side; admin can re-trigger via `POST /api/assessment/grade` |
**LLM retry with exponential backoff:**
```typescript
async function streamWithRetry(params, maxRetries = 2) {
  for (let attempt = 0; attempt  setTimeout(r, 1000 * Math.pow(2, attempt)));
    }
  }
}
```