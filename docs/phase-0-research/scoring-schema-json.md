# Scoring Schema (JSON)

**Notion URL:** https://www.notion.so/31ed807b911181ca9cfbdbc79152dab1

---

## Introduction
This page contains the machine-readable data model for the AI Workforce Map scoring pipeline. The JSON schema below defines all data structures used by the scoring engine, including scenario evaluation objects, domain score aggregation, role-fit calculation, readiness bands, training track assignment, risk flags, and final employee/company reports.
**Version:** 1.0.0  
**Date:** 2026-03-09  
**Schema standard:** JSON Schema Draft-07  
This schema is the authoritative source for:
- **Developers** implementing the scoring pipeline (defines all required fields, types, and constraints)
- **Data engineers** designing the database schema or API contracts
- **QA teams** writing integration tests (the worked example in `deliverable_scoring_rubric.md` validates against this schema)
Key type definitions in this schema:
- `DomainEnum` — the 7 scoring domains
- `RoleEnum` — the 5 AI-adjacent roles
- `ScenarioArchetypeEnum` — the 12 scenario archetypes
- `ScenarioDefinition` — structure of a scenario in the assessment library
- `ScenarioEvaluation` — complete grading output for a single scenario response
- `ReliabilityModifierResult` — output of cross-scenario reliability analysis
- `DomainScoreAggregation` — aggregated domain score from per-scenario scores
- `RoleFitResult` — role-fit calculation result for a single role
- `EmployeeReport` — complete assessment output for one employee
- `CompanyReport` — aggregate report across all assessed employees
---
## Full JSON Schema
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AI Workforce Map Scoring Model",
  "description": "Complete data schema for the AI Workforce Map scoring pipeline. Covers individual scenario evaluation, domain score aggregation, role-fit calculation, and final employee reports.",
  "version": "1.0.0",
  "date": "2026-03-09",

  "definitions": {

    "DomainEnum": {
      "type": "string",
      "enum": [
        "task_framing",
        "process_thinking",
        "verification_instinct",
        "exception_handling",
        "risk_judgment",
        "operational_consistency",
        "change_leverage"
      ],
      "description": "The 7 scoring domains used in the AI Workforce Map assessment."
    },

    "RoleEnum": {
      "type": "string",
      "enum": [
        "ai_operator",
        "ai_approver",
        "ai_workflow_translator",
        "ai_qa_risk_reviewer",
        "ai_change_champion"
      ],
      "description": "The 5 AI-adjacent roles assessed by the AI Workforce Map."
    },

    "ScenarioArchetypeEnum": {
      "type": "string",
      "enum": [
        "automation_boundary",
        "instruction_rewrite",
        "output_comparison",
        "hidden_error_review",
        "missing_context",
        "workflow_handoff",
        "escalation_judgment",
        "stakeholder_pressure",
        "exception_handling",
        "adoption_communication",
        "policy_constraint_adherence",
        "drift_repeated_failure"
      ],
      "description": "The 12 scenario archetypes from the V1 spec."
    },

    "TargetLevelEnum": {
      "type": "string",
      "enum": ["primary", "secondary", "tertiary"],
      "description": "How important this domain is as a target for this specific scenario. Determines weighting in aggregation: primary=1.0, secondary=0.6, tertiary=0.3."
    },

    "ReadinessBandEnum": {
      "type": "integer",
      "minimum": 1,
      "maximum": 5,
      "description": "1=Not Ready, 2=Emerging, 3=Capable, 4=Strong, 5=High-Leverage"
    },

    "TrainingTrackEnum": {
      "type": "string",
      "enum": ["A", "B", "C", "D"],
      "description": "A=Ready Now, B=Trainable in 30 Days, C=Trainable in 60-90 Days, D=Not Suitable Yet"
    },

    "RoleFitStatusEnum": {
      "type": "string",
      "enum": ["qualified", "partially_qualified", "below_threshold"],
      "description": "Whether the employee meets the role's gating and minimum requirements."
    },

    "ConfidenceLevelEnum": {
      "type": "string",
      "enum": ["high", "low"],
      "description": "High if the domain has >=2 primary-target scenarios in the assessment; Low otherwise. Low confidence scores receive a 15% penalty."
    },

    "ReliabilityModifierTypeEnum": {
      "type": "string",
      "enum": [
        "contradiction_across_answers",
        "overconfidence",
        "failure_to_verify_when_prompted",
        "unsafe_automation_bias",
        "inconsistency_under_pressure",
        "inability_to_explain_reasoning"
      ],
      "description": "The 6 reliability modifier types (RM-1 through RM-6)."
    },

    "RiskFlagIdEnum": {
      "type": "string",
      "enum": ["RF-1", "RF-2", "RF-3", "RF-4", "RF-5", "RF-6", "RF-7"],
      "description": "The 7 risk flag identifiers."
    },

    "RiskSeverityEnum": {
      "type": "string",
      "enum": ["low", "medium", "high", "critical"],
      "description": "Severity level of a detected risk flag."
    },
    "ScenarioDefinition": {
      "type": "object",
      "description": "Defines a single scenario in the assessment library.",
      "required": ["scenario_id", "archetype", "prompt_text", "domain_targets", "difficulty"],
      "properties": {
        "scenario_id": {
          "type": "string",
          "description": "Unique identifier for the scenario, e.g., 'SC-001'."
        },
        "archetype": { "$ref": "#/definitions/ScenarioArchetypeEnum" },
        "title": {
          "type": "string",
          "description": "Short human-readable title for the scenario."
        },
        "prompt_text": {
          "type": "string",
          "description": "The full scenario prompt text shown to the employee."
        },
        "context_document": {
          "type": ["string", "null"],
          "description": "Optional attached document or data that the employee is asked to review. May contain planted errors."
        },
        "domain_targets": {
          "type": "object",
          "description": "Domains targeted by this scenario and their target levels.",
          "additionalProperties": { "$ref": "#/definitions/TargetLevelEnum" }
        },
        "role_relevance": {
          "type": "array",
          "description": "Which roles this scenario is most relevant for.",
          "items": { "$ref": "#/definitions/RoleEnum" }
        },
        "difficulty": {
          "type": "string",
          "enum": ["obvious", "mixed", "deceptive"],
          "description": "Difficulty tier: obvious (clear right answer), mixed (tradeoffs), deceptive (plausible but flawed)."
        },
        "time_target_seconds": {
          "type": "integer",
          "minimum": 60,
          "maximum": 600,
          "description": "Expected response time in seconds (180-300 typical)."
        },
        "ideal_markers": {
          "type": "object",
          "description": "Rubric markers for grading, organized by domain.",
          "additionalProperties": {
            "type": "object",
            "properties": {
              "strong_indicators": {
                "type": "array",
                "items": { "type": "string" },
                "description": "Behaviors indicating score 3-4 on this domain."
              },
              "partial_indicators": {
                "type": "array",
                "items": { "type": "string" },
                "description": "Behaviors indicating score 2 on this domain."
              },
              "red_flags": {
                "type": "array",
                "items": { "type": "string" },
                "description": "Behaviors indicating score 0-1 or triggering reliability modifiers."
              }
            }
          }
        },
        "follow_up_questions": {
          "type": "array",
          "description": "Adaptive follow-up questions for this scenario.",
          "items": {
            "type": "object",
            "required": ["trigger_condition", "question_text", "question_type"],
            "properties": {
              "trigger_condition": {
                "type": "string",
                "enum": ["strong_initial", "weak_initial", "generic_initial"],
                "description": "When to deploy this follow-up."
              },
              "question_text": {
                "type": "string",
                "description": "The follow-up question text."
              },
              "question_type": {
                "type": "string",
                "enum": ["parameter_shift", "failure_mode", "stakeholder_challenge", "ethical_complication", "specificity_probe"],
                "description": "The type of follow-up question."
              }
            }
          }
        }
      }
    },
    "ScenarioEvaluation": {
      "type": "object",
      "description": "The complete grading output for a single scenario response.",
      "required": ["evaluation_id", "employee_id", "scenario_id", "timestamp", "primary_grading", "domain_scores"],
      "properties": {
        "evaluation_id": { "type": "string", "description": "Unique identifier for this evaluation." },
        "employee_id": { "type": "string", "description": "Reference to the employee being assessed." },
        "scenario_id": { "type": "string", "description": "Reference to the scenario definition." },
        "timestamp": { "type": "string", "format": "date-time", "description": "When the evaluation was completed." },
        "raw_response": { "type": "string", "description": "The employee's full text response to the scenario." },
        "follow_up_response": { "type": ["string", "null"], "description": "The employee's response to the follow-up question, if deployed." },
        "follow_up_question_used": { "type": ["string", "null"], "description": "Which follow-up question was deployed." },
        "response_time_seconds": { "type": "integer", "description": "How long the employee spent on this scenario." },
        "primary_grading": {
          "type": "object",
          "description": "Output from the primary LLM grader (Stage 1).",
          "required": ["marker_identification", "domain_scores", "rationale"],
          "properties": {
            "marker_identification": {
              "type": "object",
              "description": "Per-domain identification of which rubric markers are present.",
              "additionalProperties": {
                "type": "object",
                "properties": {
                  "strong_indicators_found": { "type": "array", "items": { "type": "object", "properties": { "marker": { "type": "string" }, "evidence": { "type": "string" } } } },
                  "partial_indicators_found": { "type": "array", "items": { "type": "object", "properties": { "marker": { "type": "string" }, "evidence": { "type": "string" } } } },
                  "red_flags_found": { "type": "array", "items": { "type": "object", "properties": { "marker": { "type": "string" }, "evidence": { "type": "string" } } } }
                }
              }
            },
            "domain_scores": { "type": "object", "description": "Per-domain scores (0-4 integer) from the primary grader.", "additionalProperties": { "type": "integer", "minimum": 0, "maximum": 4 } },
            "rationale": { "type": "object", "description": "Per-domain explanation of the assigned score.", "additionalProperties": { "type": "string" } }
          }
        },
        "follow_up_modifiers": { "type": "object", "description": "Score adjustments (\u00b11 per domain) based on follow-up response.", "additionalProperties": { "type": "integer", "minimum": -1, "maximum": 1 } },
        "skeptic_review": {
          "type": "object",
          "description": "Output from the skeptic grader (Stage 2).",
          "properties": {
            "adjustments": { "type": "object", "description": "Per-domain score adjustments from skeptic review (\u00b11 max).", "additionalProperties": { "type": "object", "properties": { "adjustment": { "type": "integer", "minimum": -1, "maximum": 1 }, "reason": { "type": "string" } } } },
            "flags": { "type": "array", "items": { "type": "object", "properties": { "flag_type": { "type": "string", "enum": ["verbosity_bias", "persuasion_bias", "generic_response", "gaming_detected", "inflation_suspected"] }, "evidence": { "type": "string" }, "domain_affected": { "$ref": "#/definitions/DomainEnum" } } } },
            "human_review_required": { "type": "boolean", "description": "True if primary and skeptic scores diverge by >1 on any domain." }
          }
        },
        "domain_scores": { "type": "object", "description": "Final validated per-domain scores for this scenario (0-4, may include decimals after modifier application).", "additionalProperties": { "type": "number", "minimum": 0, "maximum": 4 } }
      }
    },
    "ReliabilityModifierResult": {
      "type": "object",
      "description": "A single reliability modifier detection result from cross-scenario analysis.",
      "required": ["modifier_type", "detected", "impact"],
      "properties": {
        "modifier_type": { "$ref": "#/definitions/ReliabilityModifierTypeEnum" },
        "modifier_code": { "type": "string", "enum": ["RM-1", "RM-2", "RM-3", "RM-4", "RM-5", "RM-6"], "description": "Short code for the modifier type." },
        "detected": { "type": "boolean", "description": "Whether this modifier was triggered." },
        "evidence": { "type": "array", "description": "Specific evidence from scenarios supporting the detection.", "items": { "type": "object", "properties": { "scenario_id": { "type": "string" }, "behavior_observed": { "type": "string" } } } },
        "impact": { "type": "array", "description": "Score reductions applied.", "items": { "type": "object", "properties": { "domain": { "$ref": "#/definitions/DomainEnum" }, "scenario_id": { "type": "string", "description": "Specific scenario the reduction applies to, or 'all' for global modifiers." }, "reduction": { "type": "number", "minimum": 0, "maximum": 2, "description": "Points to subtract from domain score." } } } },
        "risk_flag_generated": { "type": ["string", "null"], "description": "If this modifier generates a risk flag, the flag ID (e.g., 'RF-5')." }
      }
    },
    "DomainScoreAggregation": {
      "type": "object",
      "description": "Aggregated domain score from per-scenario scores.",
      "required": ["domain", "raw_score", "normalized_score", "confidence"],
      "properties": {
        "domain": { "$ref": "#/definitions/DomainEnum" },
        "contributing_scenarios": { "type": "array", "description": "Scenarios contributing to this domain score.", "items": { "type": "object", "required": ["scenario_id", "score", "target_level", "weight"], "properties": { "scenario_id": { "type": "string" }, "score": { "type": "number", "minimum": 0, "maximum": 4, "description": "Final validated score for this domain in this scenario (after all modifiers)." }, "target_level": { "$ref": "#/definitions/TargetLevelEnum" }, "weight": { "type": "number", "description": "Numeric weight: 1.0 (primary), 0.6 (secondary), 0.3 (tertiary)." } } } },
        "raw_score": { "type": "number", "minimum": 0, "maximum": 4, "description": "Weighted average of contributing scenario scores on the 0-4 scale." },
        "normalized_score": { "type": "number", "minimum": 0, "maximum": 100, "description": "Score normalized to 0-100 scale. Includes confidence penalty if applicable." },
        "pre_confidence_penalty_score": { "type": "number", "minimum": 0, "maximum": 100, "description": "Normalized score before confidence penalty applied (same as normalized_score if confidence is High)." },
        "confidence": { "$ref": "#/definitions/ConfidenceLevelEnum" },
        "primary_scenario_count": { "type": "integer", "minimum": 0, "description": "Number of scenarios where this domain was a primary target." }
      }
    },
    "RoleFitResult": {
      "type": "object",
      "description": "Role-fit calculation result for a single role.",
      "required": ["role", "weighted_score", "final_score", "status", "rank"],
      "properties": {
        "role": { "$ref": "#/definitions/RoleEnum" },
        "weighted_score": { "type": "number", "minimum": 0, "maximum": 100, "description": "Uncapped weighted score from the role-fit formula." },
        "final_score": { "type": "number", "minimum": 0, "maximum": 100, "description": "Final score after gating/minimum caps applied." },
        "status": { "$ref": "#/definitions/RoleFitStatusEnum" },
        "rank": { "type": "integer", "minimum": 1, "maximum": 5, "description": "Rank among the 5 roles (1=best fit)." },
        "gating_check": { "type": "object", "description": "Results of gating requirement checks.", "properties": { "passed": { "type": "boolean" }, "gates": { "type": "array", "items": { "type": "object", "properties": { "domain": { "$ref": "#/definitions/DomainEnum" }, "required_minimum": { "type": "number" }, "actual_score": { "type": "number" }, "passed": { "type": "boolean" } } } } } },
        "hard_minimum_check": { "type": "object", "description": "Results of hard minimum requirement checks.", "properties": { "passed": { "type": "boolean" }, "minimums": { "type": "array", "items": { "type": "object", "properties": { "domain": { "$ref": "#/definitions/DomainEnum" }, "required_minimum": { "type": "number" }, "actual_score": { "type": "number" }, "passed": { "type": "boolean" } } } } } },
        "domain_weights": { "type": "object", "description": "The weight each domain contributes to this role's score.", "additionalProperties": { "type": "number", "minimum": 0, "maximum": 1 } },
        "flags": { "type": "array", "items": { "type": "string" }, "description": "Human-readable flags for this role-fit result." },
        "gap_to_qualify": { "type": ["object", "null"], "description": "If not qualified, what domain improvements are needed.", "additionalProperties": { "type": "object", "properties": { "domain": { "$ref": "#/definitions/DomainEnum" }, "current_score": { "type": "number" }, "required_score": { "type": "number" }, "gap": { "type": "number" } } } }
      }
    },
    "RiskFlag": {
      "type": "object",
      "description": "A behavioral risk flag detected during assessment.",
      "required": ["flag_id", "flag_name", "severity", "evidence", "impact"],
      "properties": {
        "flag_id": { "$ref": "#/definitions/RiskFlagIdEnum" },
        "flag_name": { "type": "string" },
        "severity": { "$ref": "#/definitions/RiskSeverityEnum" },
        "evidence": { "type": "string", "description": "Specific behavioral evidence from the assessment supporting this flag." },
        "scenarios_involved": { "type": "array", "items": { "type": "string" }, "description": "Scenario IDs where the flagged behavior was observed." },
        "impact": { "type": "string", "description": "Deployment impact statement." },
        "training_recommendation": { "type": "string", "description": "Specific training recommendation to address this flag." }
      }
    },
    "EmployeeReport": {
      "type": "object",
      "description": "The complete final output for a single employee assessment.",
      "required": ["report_id", "employee", "assessment_metadata", "domain_scores", "role_fit_results", "readiness_band", "training_track", "risk_flags", "reliability_modifiers", "strengths", "development_priorities", "recommendation"],
      "properties": {
        "report_id": { "type": "string", "description": "Unique identifier for this report." },
        "employee": {
          "type": "object",
          "required": ["employee_id", "name", "department"],
          "properties": {
            "employee_id": { "type": "string" },
            "name": { "type": "string" },
            "title": { "type": "string" },
            "department": { "type": "string" },
            "seniority": { "type": "string", "enum": ["ic", "manager", "senior_manager", "director", "vp", "c_level"] },
            "ai_exposure": { "type": "string", "enum": ["none", "minimal", "moderate", "significant", "extensive"] },
            "company_id": { "type": "string" }
          }
        },
        "assessment_metadata": {
          "type": "object",
          "required": ["assessment_id", "date_completed", "scenarios_completed", "total_time_seconds"],
          "properties": {
            "assessment_id": { "type": "string" },
            "date_completed": { "type": "string", "format": "date-time" },
            "scenarios_completed": { "type": "integer", "minimum": 1 },
            "total_time_seconds": { "type": "integer" },
            "scenarios_with_followups": { "type": "integer" },
            "scenario_ids": { "type": "array", "items": { "type": "string" } }
          }
        },
        "scenario_evaluations": { "type": "array", "description": "Full evaluation details for each scenario (may be omitted in summary reports).", "items": { "$ref": "#/definitions/ScenarioEvaluation" } },
        "reliability_modifiers": { "type": "array", "description": "Results of all 6 reliability modifier checks.", "items": { "$ref": "#/definitions/ReliabilityModifierResult" } },
        "domain_scores": { "type": "array", "description": "Aggregated scores for all 7 domains.", "items": { "$ref": "#/definitions/DomainScoreAggregation" }, "minItems": 7, "maxItems": 7 },
        "role_fit_results": { "type": "array", "description": "Role-fit calculation results for all 5 roles, sorted by rank.", "items": { "$ref": "#/definitions/RoleFitResult" }, "minItems": 5, "maxItems": 5 },
        "readiness_band": { "type": "object", "required": ["band", "label"], "properties": { "band": { "$ref": "#/definitions/ReadinessBandEnum" }, "label": { "type": "string", "enum": ["Not Ready", "Emerging", "Capable", "Strong", "High-Leverage"] }, "reasoning": { "type": "string" } } },
        "training_track": { "type": "object", "required": ["track", "label", "timeline"], "properties": { "track": { "$ref": "#/definitions/TrainingTrackEnum" }, "label": { "type": "string", "enum": ["Ready Now", "Trainable in 30 Days", "Trainable in 60-90 Days", "Not Suitable Yet"] }, "timeline": { "type": "string" }, "training_focus": { "type": "array", "items": { "type": "object", "properties": { "domain": { "$ref": "#/definitions/DomainEnum" }, "current_score": { "type": "number" }, "target_score": { "type": "number" }, "recommendation": { "type": "string" } } } } } },
        "risk_flags": { "type": "array", "description": "All detected risk flags.", "items": { "$ref": "#/definitions/RiskFlag" } },
        "strengths": { "type": "array", "description": "Top 3 domain strengths identified.", "items": { "type": "object", "properties": { "domain": { "$ref": "#/definitions/DomainEnum" }, "score": { "type": "number" }, "description": { "type": "string" } } }, "maxItems": 3 },
        "development_priorities": { "type": "array", "description": "Top 3 domains needing development, ordered by priority.", "items": { "type": "object", "properties": { "domain": { "$ref": "#/definitions/DomainEnum" }, "score": { "type": "number" }, "gap_description": { "type": "string" }, "training_recommendation": { "type": "string" } } }, "maxItems": 3 },
        "recommendation": { "type": "object", "required": ["summary", "deployment_guidance"], "properties": { "summary": { "type": "string", "description": "2-4 sentence narrative summary of the employee's assessment results." }, "deployment_guidance": { "type": "string" }, "closest_qualifying_role": { "type": "object", "properties": { "role": { "$ref": "#/definitions/RoleEnum" }, "gap": { "type": "number" }, "gating_domain": { "$ref": "#/definitions/DomainEnum" } } }, "confidence_notes": { "type": "array", "items": { "type": "string" } } } }
      }
    },
    "CompanyReport": {
      "type": "object",
      "description": "Aggregated company-level report from all employee assessments.",
      "required": ["company_id", "report_date", "employee_count", "team_distribution", "readiness_summary"],
      "properties": {
        "company_id": { "type": "string" },
        "report_date": { "type": "string", "format": "date" },
        "employee_count": { "type": "integer" },
        "team_distribution": { "type": "object", "description": "How many employees qualify for each role.", "properties": { "ai_operator": { "type": "object", "properties": { "qualified": { "type": "integer" }, "partially_qualified": { "type": "integer" }, "below_threshold": { "type": "integer" } } }, "ai_approver": { "type": "object", "properties": { "qualified": { "type": "integer" }, "partially_qualified": { "type": "integer" }, "below_threshold": { "type": "integer" } } }, "ai_workflow_translator": { "type": "object", "properties": { "qualified": { "type": "integer" }, "partially_qualified": { "type": "integer" }, "below_threshold": { "type": "integer" } } }, "ai_qa_risk_reviewer": { "type": "object", "properties": { "qualified": { "type": "integer" }, "partially_qualified": { "type": "integer" }, "below_threshold": { "type": "integer" } } }, "ai_change_champion": { "type": "object", "properties": { "qualified": { "type": "integer" }, "partially_qualified": { "type": "integer" }, "below_threshold": { "type": "integer" } } } } },
        "readiness_summary": { "type": "object", "description": "Distribution of employees across readiness bands.", "properties": { "high_leverage": { "type": "integer" }, "strong": { "type": "integer" }, "capable": { "type": "integer" }, "emerging": { "type": "integer" }, "not_ready": { "type": "integer" } } },
        "training_track_distribution": { "type": "object", "properties": { "track_a_ready_now": { "type": "integer" }, "track_b_30_days": { "type": "integer" }, "track_c_60_90_days": { "type": "integer" }, "track_d_not_suitable": { "type": "integer" } } },
        "strength_clusters": { "type": "array", "description": "Domains where the company is collectively strong (avg score >=65).", "items": { "type": "object", "properties": { "domain": { "$ref": "#/definitions/DomainEnum" }, "average_score": { "type": "number" }, "employee_count_above_threshold": { "type": "integer" } } } },
        "risk_clusters": { "type": "array", "description": "Domains where the company is collectively weak (avg score <50).", "items": { "type": "object", "properties": { "domain": { "$ref": "#/definitions/DomainEnum" }, "average_score": { "type": "number" }, "employee_count_below_threshold": { "type": "integer" } } } },
        "top_risk_flags": { "type": "array", "description": "Most common risk flags across the employee base.", "items": { "type": "object", "properties": { "flag_id": { "$ref": "#/definitions/RiskFlagIdEnum" }, "flag_name": { "type": "string" }, "count": { "type": "integer" }, "percentage": { "type": "number" } } } },
        "department_breakdown": { "type": "array", "description": "Per-department readiness summary.", "items": { "type": "object", "properties": { "department": { "type": "string" }, "employee_count": { "type": "integer" }, "average_readiness_band": { "type": "number" }, "role_coverage": { "type": "object", "additionalProperties": { "type": "object", "properties": { "qualified_count": { "type": "integer" }, "needed": { "type": "boolean" }, "gap": { "type": "boolean" } } } } } } },
        "hire_recommendations": { "type": "array", "description": "Roles that lack sufficient internal candidates and may require external hiring.", "items": { "type": "object", "properties": { "role": { "$ref": "#/definitions/RoleEnum" }, "current_qualified": { "type": "integer" }, "estimated_needed": { "type": "integer" }, "gap": { "type": "integer" }, "recommendation": { "type": "string" } } } }
      }
    },
    "RoleWeightConfig": {
      "type": "object",
      "description": "Configuration for a single role's scoring weights and thresholds.",
      "required": ["role", "domain_weights", "gating_requirements", "hard_minimums"],
      "properties": {
        "role": { "$ref": "#/definitions/RoleEnum" },
        "domain_weights": { "type": "object", "description": "Weight of each domain in the role-fit formula. Must sum to 1.0.", "properties": { "task_framing": { "type": "number" }, "process_thinking": { "type": "number" }, "verification_instinct": { "type": "number" }, "exception_handling": { "type": "number" }, "risk_judgment": { "type": "number" }, "operational_consistency": { "type": "number" }, "change_leverage": { "type": "number" } } },
        "gating_requirements": { "type": "array", "description": "Domains that must meet minimum thresholds. Failure caps score at 40.", "items": { "type": "object", "properties": { "domain": { "$ref": "#/definitions/DomainEnum" }, "minimum_score": { "type": "number", "minimum": 0, "maximum": 100 } } } },
        "hard_minimums": { "type": "array", "description": "Secondary domain minimums. Failure applies a -15 penalty.", "items": { "type": "object", "properties": { "domain": { "$ref": "#/definitions/DomainEnum" }, "minimum_score": { "type": "number", "minimum": 0, "maximum": 100 } } } }
      }
    }
  },
  "type": "object",
  "description": "Top-level wrapper containing system configuration and assessment data.",
  "properties": {
    "system_config": {
      "type": "object",
      "description": "System-level configuration for the scoring pipeline.",
      "properties": {
        "version": { "type": "string" },
        "scoring_scale": { "type": "object", "properties": { "min": { "type": "integer", "const": 0 }, "max": { "type": "integer", "const": 4 }, "labels": { "type": "object", "properties": { "0": { "type": "string", "const": "Unsafe/Poor" }, "1": { "type": "string", "const": "Weak" }, "2": { "type": "string", "const": "Acceptable" }, "3": { "type": "string", "const": "Strong" }, "4": { "type": "string", "const": "Excellent" } } } } },
        "normalization_factor": { "type": "number", "const": 4.0, "description": "Divide raw score by this to get 0-1, then multiply by 100 for normalized." },
        "confidence_penalty": { "type": "number", "const": 0.85, "description": "Multiplier applied to domain scores with <2 primary scenarios." },
        "confidence_threshold_primary_scenarios": { "type": "integer", "const": 2, "description": "Minimum primary-target scenarios needed for High confidence." },
        "gating_cap": { "type": "number", "const": 40, "description": "Maximum role-fit score when gating requirements are not met." },
        "hard_minimum_penalty": { "type": "number", "const": 15, "description": "Points subtracted from role-fit score when hard minimums are not met." },
        "hard_minimum_floor": { "type": "number", "const": 30, "description": "Minimum role-fit score after hard minimum penalty." },
        "reliability_modifier_cap_per_domain": { "type": "number", "const": 2.0, "description": "Maximum total reliability modifier reduction per domain." },
        "scenario_weights": { "type": "object", "properties": { "primary": { "type": "number", "const": 1.0 }, "secondary": { "type": "number", "const": 0.6 }, "tertiary": { "type": "number", "const": 0.3 } } },
        "role_configs": { "type": "array", "description": "Weight and threshold configurations for all 5 roles.", "items": { "$ref": "#/definitions/RoleWeightConfig" } }
      }
    },
    "scenario_library": { "type": "array", "description": "All available scenarios in the assessment library.", "items": { "$ref": "#/definitions/ScenarioDefinition" } },
    "employee_report": { "$ref": "#/definitions/EmployeeReport" },
    "company_report": { "$ref": "#/definitions/CompanyReport" }
  }
}
```