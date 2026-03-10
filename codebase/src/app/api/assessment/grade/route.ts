import { NextResponse } from "next/server";
import { createServerSupabaseClient as createServerClient } from "@/lib/supabase/server";
import { dispatchGrading } from "@/lib/inngest/dispatch";

export async function POST(req: Request) {
  const { assessmentId } = await req.json();
  if (!assessmentId) {
    return NextResponse.json({ error: "assessmentId required" }, { status: 400 });
  }

  const supabase = await createServerClient();
  const { data: assessment } = await supabase
    .from("assessments")
    .select("id, status")
    .eq("id", assessmentId)
    .single();

  if (!assessment) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (!["complete", "grading"].includes(assessment.status)) {
    return NextResponse.json(
      { error: "Assessment is not ready for grading" }, { status: 409 }
    );
  }

  await dispatchGrading(assessmentId);
  return NextResponse.json({ dispatched: true });
}
