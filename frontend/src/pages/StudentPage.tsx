import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllStudents } from "../api";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  age: number;
  dateOfBirth: string;
  preferredLearningStyle: string;
  specialNeedsOrAccommodations: string;
  additionalNotes: string;
  summary: string;
  // New fields for the compact card
  overallScore: number;
  dreamScore: number;
  attendance: number;
  progress: "Improving" | "Stable" | "Declining";
  lastAssessed: string;
}

const StudentPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();
        // Augment data with dummy values for the new fields
        const augmentedStudents = response.data.map((student: any) => ({
          ...student,
          overallScore: Math.floor(Math.random() * 31) + 70, // 70-100
          dreamScore: Math.floor(Math.random() * 21) + 80, // 80-100
          attendance: Math.floor(Math.random() * 11) + 90, // 90-100
          progress: ["Improving", "Stable", "Declining"][
            Math.floor(Math.random() * 3)
          ],
          lastAssessed: `2025-01-${String(
            Math.floor(Math.random() * 20) + 10
          ).padStart(2, "0")}`,
        }));
        setStudents(augmentedStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case "Improving":
        return "bg-green-100 text-green-800";
      case "Stable":
        return "bg-yellow-100 text-yellow-800";
      case "Declining":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end items-center mb-6">
        <Link
          to="/add-student"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Student
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white p-5 rounded-xl shadow-md flex flex-col"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mr-4">
                {student.firstName.charAt(0)}
                {student.lastName.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {student.firstName} {student.lastName}
                </h2>
                <p className="text-sm text-gray-500">
                  Grade: {student.grade} • Age: {student.age}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {student.overallScore}%
                </p>
                <p className="text-xs text-blue-500">Overall Score</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {student.dreamScore}%
                </p>
                <p className="text-xs text-purple-500">Dream Score</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Attendance</p>
                <p className="font-semibold text-green-600">
                  {student.attendance}%
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Progress</p>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${getProgressColor(
                    student.progress
                  )}`}
                >
                  {student.progress}
                </span>
              </div>
            </div>

            <div className="border-t mt-4 pt-2 text-center">
              <p className="text-xs text-gray-400">
                Last assessed: {student.lastAssessed}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentPage;
