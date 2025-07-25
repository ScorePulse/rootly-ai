const Student = require('../../models/studentModel');

exports.createStudent = async (studentData) => {
  const student = new Student(studentData);
  return await student.save();
};

exports.getAllStudents = async () => {
  return await Student.find().populate('teacher');
};

exports.getStudentById = async (id) => {
  return await Student.findById(id).populate('teacher');
};

exports.updateStudent = async (id, studentData) => {
  return await Student.findByIdAndUpdate(id, studentData, { new: true });
};

exports.deleteStudent = async (id) => {
  return await Student.findByIdAndDelete(id);
};
