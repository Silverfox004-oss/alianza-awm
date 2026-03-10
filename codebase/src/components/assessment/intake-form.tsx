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

  const form = useForm<IntakeFormData>({
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Section: About You */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            <h2 className="text-lg font-semibold">About You</h2>

            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="Jane Smith" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl><Input placeholder="Senior Account Manager" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="department" render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select your department" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="yearsExperience" render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Professional Experience</FormLabel>
                <FormControl>
                  <Input type="number" min={0} max={50} {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value, 10))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="isManager" render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel className="text-base">I manage direct reports</FormLabel>
                  <p className="text-sm text-muted-foreground">Toggle on if you are a people manager</p>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )} />
          </CardContent>
        </Card>

        {/* Section: Tool Usage */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="text-lg font-semibold">Current Tool Usage</h2>
            <p className="text-sm text-muted-foreground">Select all tools you use regularly in your role.</p>
            <FormField control={form.control} name="toolUsage" render={() => (
              <FormItem>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TOOL_OPTIONS.map((tool) => (
                    <FormField key={tool} control={form.control} name="toolUsage"
                      render={({ field }) => (
                        <FormItem key={tool} className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(tool)}
                              onCheckedChange={(checked) => {
                                const current = field.value ?? [];
                                field.onChange(checked
                                  ? [...current, tool]
                                  : current.filter((v) => v !== tool));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{tool}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        {/* Section: AI Familiarity */}
        <Card>
          <CardContent className="pt-6 space-y-6">
            <h2 className="text-lg font-semibold">AI Familiarity</h2>

            <FormField control={form.control} name="priorAiExposure" render={({ field }) => (
              <FormItem>
                <FormLabel>How would you describe your prior experience with AI tools?</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value}
                    className="flex flex-col space-y-2 mt-2">
                    {AI_EXPOSURE_OPTIONS.map((option) => (
                      <FormItem key={option} className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value={option} /></FormControl>
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="confidenceWithAmbiguity" render={({ field }) => (
              <FormItem>
                <FormLabel>Confidence working with ambiguous or incomplete information</FormLabel>
                <p className="text-sm text-muted-foreground mb-3">1 = Very uncomfortable · 5 = Very confident</p>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-4 text-center">1</span>
                    <Slider min={1} max={5} step={1} value={[field.value]}
                      onValueChange={([v]) => field.onChange(v)} className="flex-1" />
                    <span className="text-sm w-4 text-center">5</span>
                    <span className="text-sm font-medium w-6 text-center">{field.value}</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="comfortReviewingWork" render={({ field }) => (
              <FormItem>
                <FormLabel>Comfort reviewing and critiquing AI-generated work</FormLabel>
                <p className="text-sm text-muted-foreground mb-3">1 = Very uncomfortable · 5 = Very comfortable</p>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-4 text-center">1</span>
                    <Slider min={1} max={5} step={1} value={[field.value]}
                      onValueChange={([v]) => field.onChange(v)} className="flex-1" />
                    <span className="text-sm w-4 text-center">5</span>
                    <span className="text-sm font-medium w-6 text-center">{field.value}</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        {form.formState.errors.root && (
          <p className="text-sm text-destructive text-center">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Starting assessment...</>
          ) : "Begin Assessment"}
        </Button>
      </form>
    </Form>
  );
}
