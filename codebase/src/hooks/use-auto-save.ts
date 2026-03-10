import { useEffect, useRef, useCallback } from "react";

interface UseAutoSaveOptions {
  assessmentId: string;
  scenarioId: string;
  responseText: string;
  intervalMs?: number;
  onSave?: () => void;
  onError?: (err: Error) => void;
}

/**
 * Saves the current response to Supabase every intervalMs ms.
 * Uses a ref to always capture the latest text without re-registering the interval.
 */
export function useAutoSave({
  assessmentId, scenarioId, responseText,
  intervalMs = 30_000, onSave, onError,
}: UseAutoSaveOptions) {
  const latestText = useRef(responseText);
  const lastSavedText = useRef("");
  const saving = useRef(false);

  useEffect(() => { latestText.current = responseText; }, [responseText]);

  const save = useCallback(async () => {
    if (saving.current || latestText.current === lastSavedText.current) return;
    saving.current = true;
    try {
      const res = await fetch("/api/assessment/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId, scenarioId,
          responseText: latestText.current,
          isDraft: true,
        }),
      });
      if (!res.ok) throw new Error("Auto-save failed");
      lastSavedText.current = latestText.current;
      onSave?.();
    } catch (err) {
      onError?.(err instanceof Error ? err : new Error("Unknown save error"));
    } finally {
      saving.current = false;
    }
  }, [assessmentId, scenarioId, onSave, onError]);

  // Register interval
  useEffect(() => {
    const id = setInterval(save, intervalMs);
    return () => clearInterval(id);
  }, [save, intervalMs]);

  // Save on unmount (scenario change)
  useEffect(() => { return () => { save(); }; }, [save]);

  return { save };
}
