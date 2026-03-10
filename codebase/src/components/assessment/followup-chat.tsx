"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";

interface FollowupChatProps {
  assessmentId: string;
  scenarioId: string;
  initialUserResponse: string;
  onExchangeComplete?: (exchanges: { role: string; content: string }[]) => void;
}

export function FollowupChat({
  assessmentId, scenarioId, initialUserResponse, onExchangeComplete,
}: FollowupChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/assessment/respond",
      body: { assessmentId, scenarioId },
      initialMessages: [{ id: "initial", role: "user", content: initialUserResponse }],
      onFinish: (message) => {
        const allMessages = [
          { role: "user", content: initialUserResponse },
          ...messages.slice(1).map((m) => ({ role: m.role, content: m.content })),
          { role: message.role, content: message.content },
        ];
        onExchangeComplete?.(allMessages);
      },
    });

  return (
    <div className="space-y-4">
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {messages.map((m) => (
          <div key={m.id}
            className={m.role === "assistant"
              ? "rounded-lg bg-muted p-3 text-sm"
              : "text-sm text-muted-foreground"}>
            {m.role === "assistant" && (
              <p className="text-xs font-semibold mb-1 text-primary">Follow-up Question</p>
            )}
            <p className="whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {isLoading && (
          <div className="rounded-lg bg-muted p-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-3 w-3 animate-spin" />Generating follow-up...
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-destructive">
          Failed to load follow-up question. Please continue to next scenario.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea value={input} onChange={handleInputChange}
          placeholder="Answer the follow-up question..."
          className="min-h-[80px] resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit(e as any);
          }} />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
