import { notFound, redirect } from "next/navigation";
import { createServerSupabaseClient as createServerClient } from "@/lib/supabase/server";
import IntakeForm from "@/components/assessment/intake-form";

interface IntakePageProps {
  searchParams: Promise<{ slug?: string }>;
}

export default async function IntakePage({ searchParams }: IntakePageProps) {
  const { slug } = await searchParams;

  // Require a link slug in the URL
  if (!slug) {
    notFound();
  }

  const supabase = await createServerClient();

  // Validate the assessment link
  const { data: link, error } = await supabase
    .from("assessment_links")
    .select("id, company_id, expires_at, used_at, companies(name, departments)")
    .eq("slug", slug)
    .single();

  if (error || !link) {
    notFound();
  }

  // Check expiry
  if (link.expires_at && new Date(link.expires_at) < new Date()) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-2">Link Expired</h1>
          <p className="text-muted-foreground">
            This assessment link has expired. Please contact your manager or HR
            for a new link.
          </p>
        </div>
      </main>
    );
  }

  // Check if already used (one-time use links)
  if (link.used_at) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-2">Already Completed</h1>
          <p className="text-muted-foreground">
            This assessment link has already been used.
          </p>
        </div>
      </main>
    );
  }

  const departments: string[] = (link.companies as any)?.departments ?? [];

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            AI Workforce Readiness Assessment
          </h1>
          <p className="text-muted-foreground">
            {(link.companies as any)?.name
              ? `${(link.companies as any).name} · `
              : ""}
            This takes approximately 30–45 minutes.
          </p>
        </div>
        <IntakeForm
          linkSlug={slug}
          companyId={link.company_id}
          departments={departments}
        />
      </div>
    </main>
  );
}
