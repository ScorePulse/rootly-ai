import React, { useState, useEffect } from "react";
import { getAllTeachers } from "../api";

interface Teacher {
  _id: string;
  name: string;
  email: string;
}

const TeacherPage: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getAllTeachers();
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Teachers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map((teacher) => (
          <div key={teacher._id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">{teacher.name}</h2>
            <p className="text-gray-600">{teacher.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherPage;
