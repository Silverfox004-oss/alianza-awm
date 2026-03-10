import { z } from "zod";

export const TOOL_OPTIONS = [
  "Excel",
  "Google Sheets",
  "Slack",
  "Notion",
  "Salesforce",
  "HubSpot",
  "ChatGPT",
  "Copilot",
  "Other",
] as const;

export const AI_EXPOSURE_OPTIONS = ["None", "Basic", "Moderate", "Advanced"] as const;

export const IntakeFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  title: z.string().min(1, "Job title is required").max(100),
  department: z.string().min(1, "Department is required"),
  yearsExperience: z
    .number({ invalid_type_error: "Must be a number" })
    .int()
    .min(0)
    .max(50),
  isManager: z.boolean().default(false),
  toolUsage: z
    .array(z.enum(TOOL_OPTIONS))
    .min(0)
    .default([]),
  priorAiExposure: z.enum(AI_EXPOSURE_OPTIONS),
  confidenceWithAmbiguity: z.number().int().min(1).max(5),
  comfortReviewingWork: z.number().int().min(1).max(5),
});

export type IntakeFormData = z.infer<typeof IntakeFormSchema>;

// API request schema — includes the link code
export const StartAssessmentRequestSchema = IntakeFormSchema.extend({
  linkCode: z.string().min(1, "Assessment link code is required"),
});

export type StartAssessmentRequest = z.infer<typeof StartAssessmentRequestSchema>;
