import React, { useState, useEffect } from 'react';
import studentService from '../services/studentService';

const StudentPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await studentService.getAllStudents();
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Students</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <div key={student._id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-gray-600">Grade: {student.grade}</p>
            <p className="text-gray-600">Teacher: {student.teacher.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentPage;
