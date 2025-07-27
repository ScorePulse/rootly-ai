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
  const {
    firstName,
    lastName,
    grade,
    age,
    dateOfBirth,
    preferredLearningStyle,
    specialNeedsOrAccommodations,
    additionalNotes,
    overallScore,
    dreamScore,
    attendance,
    progress,
    lastAssessed,
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !grade || !age) {
    res.status(400).json({
      message:
        "Please provide all required fields: firstName, lastName, grade, and age",
    });
    return;
  }

  // Validate grade format (assuming grades like "K", "1", "2", etc.)
  if (typeof grade !== "string" || grade.trim() === "") {
    res.status(400).json({
      message: "Grade must be a valid string (e.g., 'K', '1', '2', etc.)",
    });
    return;
  }

  // Validate age
  if (typeof age !== "number" || age < 3 || age > 22) {
    res.status(400).json({
      message: "Age must be a number between 3 and 22",
    });
    return;
  }

  // Validate optional numeric fields if provided
  if (
    overallScore !== undefined &&
    (typeof overallScore !== "number" || overallScore < 0 || overallScore > 100)
  ) {
    res.status(400).json({
      message: "Overall score must be a number between 0 and 100",
    });
    return;
  }

  if (
    dreamScore !== undefined &&
    (typeof dreamScore !== "number" || dreamScore < 0 || dreamScore > 100)
  ) {
    res.status(400).json({
      message: "Dream score must be a number between 0 and 100",
    });
    return;
  }

  if (
    attendance !== undefined &&
    (typeof attendance !== "number" || attendance < 0 || attendance > 100)
  ) {
    res.status(400).json({
      message: "Attendance must be a number between 0 and 100",
    });
    return;
  }

  // Validate progress field if provided
  const validProgressValues = ["Improving", "Stable", "Declining"];
  if (progress !== undefined && !validProgressValues.includes(progress)) {
    res.status(400).json({
      message: "Progress must be one of: 'Improving', 'Stable', 'Declining'",
    });
    return;
  }

  try {
    const studentId = uuidv4();

    // Create student object with all fields
    const newStudent = {
      id: studentId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      grade: grade.trim(),
      age,
      dateOfBirth: dateOfBirth || "",
      preferredLearningStyle: preferredLearningStyle || "Not specified",
      specialNeedsOrAccommodations: specialNeedsOrAccommodations || "None",
      additionalNotes: additionalNotes || "",
      summary: "No summary generated yet.",
      // Performance metrics with defaults
      overallScore: overallScore || 0,
      dreamScore: dreamScore || 0,
      attendance: attendance || 0,
      progress: progress || "Stable",
      lastAssessed: lastAssessed || new Date().toISOString().split("T")[0], // Default to today
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to Firestore
    await db.collection("students").doc(studentId).set(newStudent);

    res.status(201).json({
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (error: any) {
    console.error("Error creating student:", error);
    res.status(500).json({
      message: "Internal server error while creating student",
      error: error.message,
    });
  }
});

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
const getStudentById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Student ID is required" });
    return;
  }

  try {
    const studentDoc = await db.collection("students").doc(id).get();

    if (!studentDoc.exists) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    const student = {
      id: studentDoc.id,
      ...studentDoc.data(),
    };

    res.status(200).json(student);
  } catch (error: any) {
    console.error("Error fetching student:", error);
    res.status(500).json({
      message: "Internal server error while fetching student",
      error: error.message,
    });
  }
});

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private
const updateStudent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    res.status(400).json({ message: "Student ID is required" });
    return;
  }

  // Remove id from updateData to prevent overwriting
  delete updateData.id;
  delete updateData.createdAt; // Preserve original creation date

  // Add updatedAt timestamp
  updateData.updatedAt = new Date();

  // Validate updated fields if they exist
  if (
    updateData.age !== undefined &&
    (typeof updateData.age !== "number" ||
      updateData.age < 3 ||
      updateData.age > 22)
  ) {
    res.status(400).json({ message: "Age must be a number between 3 and 22" });
    return;
  }

  if (
    updateData.overallScore !== undefined &&
    (typeof updateData.overallScore !== "number" ||
      updateData.overallScore < 0 ||
      updateData.overallScore > 100)
  ) {
    res
      .status(400)
      .json({ message: "Overall score must be a number between 0 and 100" });
    return;
  }

  if (
    updateData.dreamScore !== undefined &&
    (typeof updateData.dreamScore !== "number" ||
      updateData.dreamScore < 0 ||
      updateData.dreamScore > 100)
  ) {
    res
      .status(400)
      .json({ message: "Dream score must be a number between 0 and 100" });
    return;
  }

  if (
    updateData.attendance !== undefined &&
    (typeof updateData.attendance !== "number" ||
      updateData.attendance < 0 ||
      updateData.attendance > 100)
  ) {
    res
      .status(400)
      .json({ message: "Attendance must be a number between 0 and 100" });
    return;
  }

  const validProgressValues = ["Improving", "Stable", "Declining"];
  if (
    updateData.progress !== undefined &&
    !validProgressValues.includes(updateData.progress)
  ) {
    res
      .status(400)
      .json({
        message: "Progress must be one of: 'Improving', 'Stable', 'Declining'",
      });
    return;
  }

  try {
    const studentRef = db.collection("students").doc(id);
    const studentDoc = await studentRef.get();

    if (!studentDoc.exists) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    await studentRef.update(updateData);

    // Fetch updated student
    const updatedStudentDoc = await studentRef.get();
    const updatedStudent = {
      id: updatedStudentDoc.id,
      ...updatedStudentDoc.data(),
    };

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error: any) {
    console.error("Error updating student:", error);
    res.status(500).json({
      message: "Internal server error while updating student",
      error: error.message,
    });
  }
});

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private
const deleteStudent = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Student ID is required" });
    return;
  }

  try {
    const studentRef = db.collection("students").doc(id);
    const studentDoc = await studentRef.get();

    if (!studentDoc.exists) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    await studentRef.delete();

    res.status(200).json({
      message: "Student deleted successfully",
      deletedStudentId: id,
    });
  } catch (error: any) {
    console.error("Error deleting student:", error);
    res.status(500).json({
      message: "Internal server error while deleting student",
      error: error.message,
    });
  }
});

export {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
