const Teacher = require('../../models/teacherModel');

exports.createTeacher = async (teacherData) => {
  const teacher = new Teacher(teacherData);
  return await teacher.save();
};

exports.getAllTeachers = async () => {
  return await Teacher.find();
};

exports.getTeacherById = async (id) => {
  return await Teacher.findById(id);
};

exports.updateTeacher = async (id, teacherData) => {
  return await Teacher.findByIdAndUpdate(id, teacherData, { new: true });
};

exports.deleteTeacher = async (id) => {
  return await Teacher.findByIdAndDelete(id);
};
