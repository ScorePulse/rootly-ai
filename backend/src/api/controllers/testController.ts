import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { createDummyStudents } from "../../utils/dummyData";
import { db } from "../../config/admin";

// @desc    Create new students
// @route   POST /api/test/create-students
// @access  Public
const createStudents = asyncHandler(async (req: Request, res: Response) => {
  const students = await createDummyStudents(30);

  const studentsCollection = db.collection("students");
  const batch = db.batch();

  students.forEach((student) => {
    const docRef = studentsCollection.doc(student.studentId);
    batch.set(docRef, student);
  });

  await batch.commit();

  res.status(201).json({
    message: "30 dummy students created and saved to Firestore successfully",
    students,
  });
});

// @desc    Test route
// @route   GET /api/test
// @access  Public
const testRouteHandler = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: "Test route is working" });
});

export { createStudents, testRouteHandler as testRoute };
