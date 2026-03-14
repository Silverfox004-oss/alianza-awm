import { notFound } from "next/navigation";
import { createServerSupabaseClient as createServerClient } from "@/lib/supabase/server";
import AssessmentContainer from "@/components/assessment/assessment-container";
import type { Scenario } from "@/types";

interface AssessmentPageProps {
  searchParams: Promise<{ id?: string }>;
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

  const { loadScenarioFiles } = await import("@/lib/utils/scenario-loader");
  const scenarioFiles = await loadScenarioFiles(assessment.selected_scenario_ids);

  const { data: responses } = await supabase
    .from("assessment_responses")
    .select("scenario_id, response_text, followup_exchanges, submitted_at")
    .eq("assessment_id", id);

  const orderedScenarios = assessment.selected_scenario_ids
    .map((sid: string) => scenarioFiles.find((s) => s.id === sid))
    .filter(Boolean)
    .map((s) => ({
      id: s!.id,
      title: s!.title,
      module_label: s!.moduleLabel,
      context: s!.context,
      task: s!.task,
      time_limit_seconds: s!.timeLimitSeconds,
    })) as Scenario[];

  return (
    <AssessmentContainer
      assessment={assessment}
      scenarios={orderedScenarios}
      existingResponses={responses ?? []}
    />
  );
}
