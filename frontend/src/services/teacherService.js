import axios from 'axios';

const API_URL = 'http://localhost:5000/api/teachers';

const getAllTeachers = () => {
  return axios.get(API_URL);
};

const getTeacherById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const createTeacher = (data) => {
  return axios.post(API_URL, data);
};

const updateTeacher = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

const deleteTeacher = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
