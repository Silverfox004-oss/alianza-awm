import { NextResponse } from "next/server";
import { createServerSupabaseClient as createServerClient } from "@/lib/supabase/server";
import { StartAssessmentRequestSchema } from "@/lib/schemas/intake";
import { selectScenarios } from "@/lib/llm/orchestrator";
import type { AssessmentStatus } from "@/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate request body
    const parsed = StartAssessmentRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid intake data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { linkSlug, name, title, department, yearsExperience,
      isManager, toolUsage, priorAiExposure,
      confidenceWithAmbiguity, comfortReviewingWork } = parsed.data;

    const supabase = await createServerClient();

    // 2. Validate and consume the link
    const { data: link, error: linkError } = await supabase
      .from("assessment_links")
      .select("id, company_id, expires_at, used_at")
      .eq("slug", linkSlug)
      .single();

    if (linkError || !link) {
      return NextResponse.json({ error: "Invalid link" }, { status: 404 });
    }
    if (link.used_at) {
      return NextResponse.json({ error: "Link already used" }, { status: 409 });
    }
    if (link.expires_at && new Date(link.expires_at) < new Date()) {
      return NextResponse.json({ error: "Link expired" }, { status: 410 });
    }

    // 3. Insert company_user record (anonymous — user_id is null)
    const { data: companyUser, error: userError } = await supabase
      .from("company_users")
      .insert(
        {
          company_id: link.company_id,
          name, title, department,
          years_experience: yearsExperience,
          is_manager: isManager,
          current_tools: toolUsage,
          ai_exposure: priorAiExposure.toLowerCase() as any,
          ambiguity_confidence: confidenceWithAmbiguity,
          review_comfort: comfortReviewingWork,
          user_id: null, // anonymous employee — no auth account needed
          role: 'employee',
        },
      )
      .select("id")
      .single();

    if (userError || !companyUser) {
      console.error("company_users insert error:", userError);
      return NextResponse.json({ error: "Failed to create user record" }, { status: 500 });
    }

    // 4. Call Orchestrator to select scenarios
    const scenarioSelection = await selectScenarios({
      companyId: link.company_id,
      userId: companyUser.id,
      intakeData: { department, yearsExperience, isManager, priorAiExposure, toolUsage },
    });

    // 5. Create the assessment record
    const { data: assessment, error: assessmentError } = await supabase
      .from("assessments")
      .insert({
        company_user_id: companyUser.id,
        company_id: link.company_id,
        link_id: link.id,
        status: "in_progress" as AssessmentStatus,
        selected_scenario_ids: scenarioSelection.scenarioIds,
        current_scenario_index: 0,
        started_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (assessmentError || !assessment) {
      console.error("assessment insert error:", assessmentError);
      return NextResponse.json({ error: "Failed to create assessment" }, { status: 500 });
    }

    // 6. Mark link as used
    await supabase
      .from("assessment_links")
      .update({ used_at: new Date().toISOString(), assessment_id: assessment.id })
      .eq("id", link.id);

    return NextResponse.json({ assessmentId: assessment.id }, { status: 201 });
  } catch (err) {
    console.error("POST /api/assessment/start error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
