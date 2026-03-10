import { NextResponse } from "next/server";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createServerSupabaseClient as createServerClient } from "@/lib/supabase/server";
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
