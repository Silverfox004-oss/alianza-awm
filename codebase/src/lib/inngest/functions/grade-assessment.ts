import { inngest } from "../client";
import { createAdminClient } from "@/lib/supabase/server";
import { runPrimaryGrader } from "@/lib/llm/primary-grader";
import { runSkepticGrader } from "@/lib/llm/skeptic-grader";
import { runSynthesizer } from "@/lib/llm/synthesizer";
import { loadScenarioFiles } from "@/lib/utils/scenario-loader";
import { reconcileScores, DOMAIN_KEYS, normalizeTo100 } from "@/lib/utils/scoring";
import type { PrimaryGraderOutput } from "@/lib/llm/primary-grader";
import type { SkepticGraderOutput } from "@/lib/llm/skeptic-grader";

export const gradeAssessment = inngest.createFunction(
  {
    id: "grade-assessment",
    name: "Grade Assessment",
    retries: 2,
    concurrency: { limit: 5, key: "event.data.assessmentId" },
    timeouts: { finish: "10m" },
  },
  { event: "assessment/grade.requested" },
  async ({ event, step }) => {
    const { assessmentId } = event.data;

    // ─── Step 1: Load all responses + scenario metadata ─────────────────────
    const assessmentData = await step.run("load-assessment-data", async () => {
      const supabase = createAdminClient();

      const { data: assessment, error: assessError } = await supabase
        .from("assessments")
        .select(`
          id, selected_scenario_ids,
          company_users!company_user_id(id, name, department, is_manager, ai_exposure, years_experience),
          companies!company_id(id, name)
        `)
        .eq("id", assessmentId)
        .single();

      if (assessError || !assessment) throw new Error(`Assessment ${assessmentId} not found`);

      const { data: responses, error: respError } = await supabase
        .from("assessment_responses")
        .select("scenario_id, response_text, followup_exchanges, submitted_at")
        .eq("assessment_id", assessmentId)
        .not("submitted_at", "is", null);

      if (respError) throw new Error("Failed to load responses");

      const scenarioFiles = await loadScenarioFiles(assessment.selected_scenario_ids);

      return { assessment, responses: responses ?? [], scenarioFiles };
    });

    const { assessment, responses, scenarioFiles } = assessmentData;

    // ─── Step 2: Primary Grading (parallel per scenario) ────────────────────
    const primaryGrades = await step.run("primary-grading", async () => {
      const grades: Record<string, PrimaryGraderOutput> = {};
      await Promise.all(
        responses.map(async (response: any) => {
          const file = scenarioFiles.find((f) => f.id === response.scenario_id);
          if (!file || !response.response_text) return;
          grades[response.scenario_id] = await runPrimaryGrader({
            scenarioTitle: file.title,
            scenarioContext: file.context,
            scenarioTask: file.task,
            scenarioRubric: file.rubric,
            scenarioRedFlags: file.redFlags,
            scenarioReliabilityTriggers: file.reliabilityTriggers,
            userResponse: response.response_text,
            followupExchanges: response.followup_exchanges ?? [],
            primaryDomains: file.primaryDomains,
            secondaryDomains: file.secondaryDomains,
          });
        })
      );
      return grades;
    });

    // ─── Step 3: Skeptic Grading (parallel per scenario) ────────────────────
    const skepticGrades = await step.run("skeptic-grading", async () => {
      const grades: Record<string, SkepticGraderOutput> = {};
      await Promise.all(
        responses.map(async (response: any) => {
          const file = scenarioFiles.find((f) => f.id === response.scenario_id);
          const primary = primaryGrades[response.scenario_id];
          if (!file || !primary || !response.response_text) return;
          grades[response.scenario_id] = await runSkepticGrader({
            scenarioTitle: file.title,
            scenarioContext: file.context,
            scenarioTask: file.task,
            scenarioRubric: file.rubric,
            scenarioRedFlags: file.redFlags,
            userResponse: response.response_text,
            followupExchanges: response.followup_exchanges ?? [],
            primaryGrade: primary,
          });
        })
      );
      return grades;
    });

    // ─── Step 4: Reconcile Scores ────────────────────────────────────────────
    const reconciledEvaluations = await step.run("reconcile-scores", async () => {
      return responses.map((response: any) => {
        const primary = primaryGrades[response.scenario_id];
        const skeptic = skepticGrades[response.scenario_id];
        const file = scenarioFiles.find((f) => f.id === response.scenario_id);
        if (!file || !primary) return null;

        // Fallback: if skeptic failed, use primary directly
        if (!skeptic) {
          return {
            scenarioId: response.scenario_id,
            scenarioTitle: file.title,
            reconciledScores: Object.fromEntries(
              DOMAIN_KEYS.map((k) => [k, primary[k].score])
            ),
            missedPenaltyApplied: primary?.missedPenalty ?? false,
            primaryGrade: primary,
            skepticGrade: null,
          };
        }

        const { reconciledScores, missedPenaltyApplied } = reconcileScores(primary, skeptic);
        return {
          scenarioId: response.scenario_id,
          scenarioTitle: file.title,
          reconciledScores,
          missedPenaltyApplied,
          primaryGrade: primary,
          skepticGrade: skeptic,
        };
      }).filter(Boolean);
    });

    // ─── Step 5: Synthesize ──────────────────────────────────────────────────
    const synthesis = await step.run("synthesize", async () => {
      const user = assessment.company_users as any;
      if (!user) throw new Error("No user data on assessment");
      return runSynthesizer({
        employeeName: user.name,
        department: user.department,
        isManager: user.is_manager,
        priorAiExposure: user.ai_exposure ?? "None",
        evaluations: reconciledEvaluations.map((e: any) => ({
          scenarioId: e.scenarioId,
          scenarioTitle: e.scenarioTitle,
          reconciledScores: e.reconciledScores,
          missedPenaltyApplied: e.missedPenaltyApplied,
        })),
      });
    });

    // ─── Step 6: Persist Results ─────────────────────────────────────────────
    await step.run("persist-results", async () => {
      const supabase = createAdminClient();

      // Per-scenario evaluation rows (7-domain scores)
      const evaluationRows = reconciledEvaluations.map((e: any) => ({
        assessment_id: assessmentId,
        scenario_id: e.scenarioId,
        task_framing: e.reconciledScores.task_framing,
        process_thinking: e.reconciledScores.process_thinking,
        verification_instinct: e.reconciledScores.verification_instinct,
        exception_handling: e.reconciledScores.exception_handling,
        risk_judgment: e.reconciledScores.risk_judgment,
        operational_consistency: e.reconciledScores.operational_consistency,
        change_leverage: e.reconciledScores.change_leverage,
        missed_penalty_applied: e.missedPenaltyApplied,
        primary_grade: e.primaryGrade,
        skeptic_grade: e.skepticGrade,
      }));

      const { error: evalError } = await supabase
        .from("assessment_evaluations")
        .insert(evaluationRows);
      if (evalError) throw evalError;

      // Role-fit results (deterministic)
      const roleFitRows = synthesis.role_ranking.map((role, index) => ({
        assessment_id: assessmentId,
        role_key: role,
        fit_score: synthesis.role_scores[role],
        rank: index + 1,
        is_recommended: role === synthesis.recommended_role,
      }));

      await supabase.from("role_fit_results").insert(roleFitRows);

      // Update assessment with final scores
      const { error: updateError } = await supabase
        .from("assessments")
        .update({
          status: "complete",
          overall_score: synthesis.readiness_score,
          readiness_band: synthesis.readiness_band,
          domain_scores: synthesis.domain_scores,
          role_scores: synthesis.role_scores,
          recommended_role: synthesis.recommended_role,
          role_ranking: synthesis.role_ranking,
          risk_flags: synthesis.risk_flags,
          training_track: synthesis.training_track,
          deployment_recommendation: synthesis.deployment_recommendation,
          upskill_recommendations: synthesis.upskill_recommendations,
          executive_summary: synthesis.executive_summary,
          graded_at: new Date().toISOString(),
        })
        .eq("id", assessmentId);
      if (updateError) throw updateError;
    });

    return {
      assessmentId,
      overallScore: synthesis.readiness_score,
      readinessBand: synthesis.readiness_band,
      recommendedRole: synthesis.recommended_role,
    };
  }
);
