import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

interface ExaminerInput {
  scenarioTitle: string;
  scenarioContext: string;
  scenarioTask: string;
  userResponse: string;
  conversationHistory: { role: "user" | "assistant"; content: string }[];
}

/**
 * Returns a streamText result for Vercel AI SDK's toDataStreamResponse().
 * Called from /api/assessment/respond — not from the grading pipeline.
 */
export async function runExaminer(input: ExaminerInput) {
  return streamText({
    model: openai("gpt-4o-mini"),
    system: `You are an AI assessment examiner. Probe the depth of understanding through follow-up questions.

Scenario: "${input.scenarioTitle}"
Context: ${input.scenarioContext}
Task: ${input.scenarioTask}

Guidelines: Ask ONE follow-up per turn. Focus on reasoning, edge cases, error recovery, ethics. Be concise.`,
    messages: [
      { role: "user", content: input.userResponse },
      ...input.conversationHistory,
    ],
  });
}
