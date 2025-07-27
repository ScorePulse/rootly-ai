import { Request, Response } from "express";
import { MasterPlannerAgent } from "../../agents/MasterPlannerAgent";
import { sendMessage } from "../../agents";
import { PlannerAgent } from "../../agents/plannerAgent";

// Instantiate your MasterPlannerAgent outside the controller function
// so it's not re-created on every request, which is more efficient.
const masterPlannerAgent = new MasterPlannerAgent();

// Removed initialMessage and isFirstMessage as they conflict with a streaming endpoint.
// If an initial welcome is needed, it should be sent as the first SSE chunk or handled on the client.

export const chatController = async (req: Request, res: Response) => {
  // Set headers for Server-Sent Events (SSE)
  // This tells the client to expect a stream of events.
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // Disable proxy buffering for Nginx/Apache, etc.

  // Extract the message from the request body
  const { message } = req.body;

  // Basic validation for the message
  if (!message) {
    // Send an error message as an SSE data event and then end the stream
    res
      .status(400)
      .write('data: {"error": "Missing message in request body"}\n\n');
    res.end();
    return;
  }

  try {
    // Call the MasterPlannerAgent's run method, which now returns a JSON object
    const schedule = await masterPlannerAgent.run(message);

    // Send the formatted JSON schedule to the client
    res.status(200).json(schedule);
  } catch (error: any) {
    console.error("Error in chatController:", error);
    res.status(500).json({
      message:
        error.message || "An error occurred while generating the schedule.",
    });
  }
};
