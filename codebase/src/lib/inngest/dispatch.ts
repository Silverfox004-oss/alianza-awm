import { inngest } from "./client";

export async function dispatchGrading(assessmentId: string) {
  await inngest.send({
    name: "assessment/grade.requested",
    data: { assessmentId },
  });
}
