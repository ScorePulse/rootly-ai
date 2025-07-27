import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createDummyStudents } from "../../utils/dummyData";
import { db } from "../../config/admin";

// @desc    Create new students
// @route   POST /api/test/create-students
// @access  Public
const createStudents = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "Missing userId in request body" });
    return;
  }

  const students = await createDummyStudents(30, userId);

  const studentsCollection = db.collection("students");
  const batch = db.batch();

  students.forEach((student) => {
    const docRef = studentsCollection.doc(student.studentId);
    batch.set(docRef, student);
  });

  await batch.commit();

  res
    .status(201)
    .json({
      message: "30 dummy students created and saved to Firestore successfully",
      students,
    });
});

export { createStudents };
