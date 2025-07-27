import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../../config/admin";
import { v4 as uuidv4 } from "uuid";

// @desc    Get all students
// @route   GET /api/students
// @access  Private
const getAllStudents = asyncHandler(async (req: Request, res: Response) => {
  const studentsSnapshot = await db.collection("students").get();
  const students = studentsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.status(200).json(students);
});

// @desc    Create a new student
// @route   POST /api/students
// @access  Private
const createStudent = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, grade, age, dateOfBirth } = req.body;

  if (!firstName || !lastName || !grade || !age) {
    res.status(400).json({ message: "Please provide all required fields" });
    return;
  }

  const studentId = uuidv4();
  const newStudent = {
    id: studentId,
    firstName,
    lastName,
    grade,
    age,
    dateOfBirth,
    // Add default values for other fields
    preferredLearningStyle: "Not specified",
    specialNeedsOrAccommodations: "None",
    additionalNotes: "",
    summary: "No summary generated yet.",
  };

  await db.collection("students").doc(studentId).set(newStudent);

  res.status(201).json(newStudent);
});

export { getAllStudents, createStudent };
