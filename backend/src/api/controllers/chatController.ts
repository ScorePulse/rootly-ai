import { Request, Response } from "express";
import { MasterPlannerAgent } from "../../agents/MasterPlannerAgent";
import { db } from "../../config/admin";

const masterPlannerAgent = new MasterPlannerAgent();

const getWeekId = () => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  return startOfWeek.toISOString().split("T")[0];
};

export const chatController = async (req: Request, res: Response) => {
  // Set headers for Server-Sent Events (SSE)
  // This tells the client to expect a stream of events.
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // Disable proxy buffering for Nginx/Apache, etc.

  // Extract the message from the request body
  const { message, userId } = req.body;

  // Basic validation for the message
  if (!message) {
    // Send an error message as an SSE data event and then end the stream
    res
      .status(400)
      .write('data: {"error": "Missing message in request body"}\n\n');
    res.end();
    return;
  }
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const schedule = await masterPlannerAgent.run(message, userId);

    const weekId = getWeekId();
    const scheduleId = `${userId}_${weekId}`;

    await db.collection("schedules").doc(scheduleId).set({
      userId,
      weekId,
      createdAt: new Date(),
      schedule,
    });

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
