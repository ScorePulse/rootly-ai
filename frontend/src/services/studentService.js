import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

const getAllStudents = () => {
  return axios.get(API_URL);
};

const getStudentById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const createStudent = (data) => {
  return axios.post(API_URL, data);
};

const updateStudent = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

const deleteStudent = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
