import { TriggerCloudRun } from "../utils/cloudRunUtils";

export async function PlannerAgent(): Promise<void> {
  const serviceUrl = process.env.PLANNER_AGENT_URL;

  if (!serviceUrl) {
    console.error("PLANNER_AGENT_URL environment variable is not set.");
    return;
  }

  const cloudRun = new TriggerCloudRun(serviceUrl);
  const payload = { message: "Hello from Node.js!" };

  try {
    await cloudRun.triggerService(payload);
  } catch (error) {
    console.error("Error in triggerPlannerAgent:", error);
  }
}
