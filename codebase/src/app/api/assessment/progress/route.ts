import { NextResponse } from "next/server";
import { createServerSupabaseClient as createServerClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id query parameter" }, { status: 400 });
  }

  const supabase = await createServerClient();

  const { data: assessment, error } = await supabase
    .from("assessments")
    .select(
      "id, status, overall_score, readiness_band, domain_scores, role_scores, recommended_role, role_ranking, risk_flags, training_track, deployment_recommendation, upskill_recommendations, executive_summary, graded_at, started_at, completed_at, paused_at, elapsed_seconds"
    )
    .eq("id", id)
    .single();

  if (error || !assessment) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
  }

  // If not yet complete, return only status fields
  if (assessment.status !== "complete") {
    return NextResponse.json({
      id: assessment.id,
      status: assessment.status,
      started_at: assessment.started_at,
      paused_at: assessment.paused_at,
      elapsed_seconds: assessment.elapsed_seconds,
    });
  }

  // Complete — return full results
  return NextResponse.json(assessment);
}
