import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../../config/admin";

// @desc    Get all schedules for a user
// @route   GET /api/schedules
// @access  Private
const getSchedules = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.query;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const schedulesSnapshot = await db
    .collection("schedules")
    .where("userId", "==", userId)
    .get();
  const schedules = schedulesSnapshot.docs.map((doc) => doc.data());
  res.status(200).json(schedules);
});

export { getSchedules };
