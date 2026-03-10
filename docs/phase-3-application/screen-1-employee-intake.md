# Phase 3 — Screen 1: Employee Intake

**Notion URL:** https://www.notion.so/31ed807b9111811ab145cd8135865e83

---

## Overview
The intake screen is the entry point for employees. It is reached via a unique assessment link (containing a `code` URL parameter) sent by HR or a manager. The screen collects demographic and self-assessment data before launching the scenario-based assessment.
**Route:** `/intake?code=`
**Auth model:** No Supabase Auth session required — access is gated by the link code only.
---
## File Structure
```javascript
src/
  app/
    (employee)/
      intake/
        page.tsx          ← Server component
  components/
    assessment/
      intake-form.tsx     ← Client component
  app/
    api/
      assessment/
        start/
          route.ts        ← POST handler
  lib/
    schemas/
      intake.ts           ← Zod schemas
```
---
## 1. Zod Schemas (`src/lib/schemas/intake.ts`)
```typescript
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

export type IntakeFormData = z.infer;

// API request schema — includes the link code
export const StartAssessmentRequestSchema = IntakeFormSchema.extend({
  linkCode: z.string().min(1, "Assessment link code is required"),
});

export type StartAssessmentRequest = z.infer;
```
---
## 2. Page Component (`src/app/(employee)/intake/page.tsx`)
```typescript
import { notFound, redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import IntakeForm from "@/components/assessment/intake-form";

interface IntakePageProps {
  searchParams: Promise;
}

export default async function IntakePage({ searchParams }: IntakePageProps) {
  const { code } = await searchParams;

  // Require a link code in the URL
  if (!code) {
    notFound();
  }

  const supabase = await createServerClient();

  // Validate the assessment link
  const { data: link, error } = await supabase
    .from("assessment_links")
    .select("id, company_id, expires_at, used_at, companies(name, departments)")
    .eq("code", code)
    .single();

  if (error || !link) {
    notFound();
  }

  // Check expiry
  if (link.expires_at && new Date(link.expires_at) 
        
          Link Expired
          
            This assessment link has expired. Please contact your manager or HR
            for a new link.
          
        
      
    );
  }

  // Check if already used (one-time use links)
  if (link.used_at) {
    return (
      
        
          Already Completed
          
            This assessment link has already been used.
          
        
      
    );
  }

  const departments: string[] = link.companies?.departments ?? [];

  return (
    
      
        
          
            AI Workforce Readiness Assessment
          
          
            {link.companies?.name
              ? `${link.companies.name} · `
              : ""}
            This takes approximately 30–45 minutes.
          
        
        
      
    
  );
}
```
---
## 3. Intake Form Component (`src/components/assessment/intake-form.tsx`)
```typescript
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  IntakeFormSchema, IntakeFormData, TOOL_OPTIONS, AI_EXPOSURE_OPTIONS,
} from "@/lib/schemas/intake";

interface IntakeFormProps {
  linkCode: string;
  companyId: string;
  departments: string[];
}

export default function IntakeForm({ linkCode, companyId, departments }: IntakeFormProps) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(IntakeFormSchema),
    defaultValues: {
      name: "",
      title: "",
      department: "",
      yearsExperience: 0,
      isManager: false,
      toolUsage: [],
      priorAiExposure: "None",
      confidenceWithAmbiguity: 3,
      comfortReviewingWork: 3,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: IntakeFormData) {
    try {
      const res = await fetch("/api/assessment/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, linkCode }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to start assessment");
      }
      const { assessmentId } = await res.json();
      router.push(`/assessment?id=${assessmentId}`);
    } catch (err) {
      form.setError("root", {
        message: err instanceof Error ? err.message : "An error occurred",
      });
    }
  }

  return (
    
      
        {/* Section: About You */}
        
          
            About You

             (
              
                Full Name
                
                
              
            )} />

             (
              
                Job Title
                
                
              
            )} />

             (
              
                Department
                
                  
                    
                  
                  
                    {departments.map((dept) => (
                      {dept}
                    ))}
                  
                
                
              
            )} />

             (
              
                Years of Professional Experience
                
                   field.onChange(parseInt(e.target.value, 10))} />
                
                
              
            )} />

             (
              
                
                  I manage direct reports
                  Toggle on if you are a people manager
                
                
                  
                
              
            )} />
          
        

        {/* Section: Tool Usage */}
        
          
            Current Tool Usage
            Select all tools you use regularly in your role.
             (
              
                
                  {TOOL_OPTIONS.map((tool) => (
                     (
                        
                          
                             {
                                const current = field.value ?? [];
                                field.onChange(checked
                                  ? [...current, tool]
                                  : current.filter((v) => v !== tool));
                              }}
                            />
                          
                          {tool}
                        
                      )}
                    />
                  ))}
                
                
              
            )} />
          
        

        {/* Section: AI Familiarity */}
        
          
            AI Familiarity

             (
              
                How would you describe your prior experience with AI tools?
                
                  
                    {AI_EXPOSURE_OPTIONS.map((option) => (
                      
                        
                        {option}
                      
                    ))}
                  
                
                
              
            )} />

             (
              
                Confidence working with ambiguous or incomplete information
                1 = Very uncomfortable · 5 = Very confident
                
                  
                    1
                     field.onChange(v)} className="flex-1" />
                    5
                    {field.value}
                  
                
                
              
            )} />

             (
              
                Comfort reviewing and critiquing AI-generated work
                1 = Very uncomfortable · 5 = Very comfortable
                
                  
                    1
                     field.onChange(v)} className="flex-1" />
                    5
                    {field.value}
                  
                
                
              
            )} />
          
        

        {form.formState.errors.root && (
          
            {form.formState.errors.root.message}
          
        )}

        
          {isSubmitting ? (
            <>Starting assessment...
          ) : "Begin Assessment"}
        
      
    
  );
}
```
---
## 4. API Route (`src/app/api/assessment/start/route.ts`)
```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
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

    const { linkCode, name, title, department, yearsExperience,
      isManager, toolUsage, priorAiExposure,
      confidenceWithAmbiguity, comfortReviewingWork } = parsed.data;

    const supabase = await createServerClient();

    // 2. Validate and consume the link
    const { data: link, error: linkError } = await supabase
      .from("assessment_links")
      .select("id, company_id, expires_at, used_at")
      .eq("code", linkCode)
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

    // 3. Upsert company_user record
    const { data: companyUser, error: userError } = await supabase
      .from("company_users")
      .upsert(
        {
          company_id: link.company_id,
          name, title, department,
          years_experience: yearsExperience,
          is_manager: isManager,
          tool_usage: toolUsage,
          prior_ai_exposure: priorAiExposure,
          confidence_with_ambiguity: confidenceWithAmbiguity,
          comfort_reviewing_work: comfortReviewingWork,
        },
        { onConflict: "company_id,name" }
      )
      .select("id")
      .single();

    if (userError || !companyUser) {
      console.error("company_users upsert error:", userError);
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
```
---
## 5. Mobile Responsiveness Notes
- Form uses `max-w-2xl mx-auto` — comfortable on all screen sizes
- Tool usage grid: `grid-cols-2 sm:grid-cols-3` — 2 columns on mobile, 3 on tablet+
- Sliders are touch-friendly via shadcn/ui Slider (Radix under the hood)
- Manager toggle uses a card-style layout that stacks cleanly on small screens
- All inputs are `w-full` by default — no horizontal overflow
---
## 6. Error Handling Strategy
| Scenario | Handling |
|---|---|
| Invalid / missing link code | `notFound()` → 404 page |
| Expired link | Server renders "Link Expired" message |
| Already-used link | Server renders "Already Completed" message |
| Form validation errors | Inline via react-hook-form + zod resolver |
| API failure on submit | `form.setError("root", ...)` shown above submit button |
| Supabase upsert failure | 500 response → root error displayed in form |
| Orchestrator timeout | Wrapped in try/catch; falls back to default scenario set |