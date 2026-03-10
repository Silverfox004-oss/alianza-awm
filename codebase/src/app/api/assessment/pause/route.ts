import { NextResponse } from "next/server";
import { createServerSupabaseClient as createServerClient } from "@/lib/supabase/server";

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
    (Date.now() - new Date(assessment.started_at!).getTime()) / 1000
  );
  const totalElapsed = (assessment.elapsed_seconds ?? 0) + additionalSeconds;

  await supabase
    .from("assessments")
    .update({ status: "paused", paused_at: new Date().toISOString(), elapsed_seconds: totalElapsed })
    .eq("id", assessmentId);

  return NextResponse.json({ paused: true });
}
