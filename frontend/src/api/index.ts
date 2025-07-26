import axios from "axios";
import { auth } from "../firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createUserDocument = (userData: {
  uid: string;
  name: string;
  email: string;
}) => {
  return api.post("/users/create", userData);
};

// Student API
export const getAllStudents = () => api.get("/students");
export const getStudentById = (id: string) => api.get(`/students/${id}`);
export const createStudent = (data: any) => api.post("/students", data);
export const updateStudent = (id: string, data: any) =>
  api.put(`/students/${id}`, data);
export const deleteStudent = (id: string) => api.delete(`/students/${id}`);

// Teacher API
export const getAllTeachers = () => api.get("/teachers");
export const getTeacherById = (id: string) => api.get(`/teachers/${id}`);
export const createTeacher = (data: any) => api.post("/teachers", data);
export const updateTeacher = (id: string, data: any) =>
  api.put(`/teachers/${id}`, data);
export const deleteTeacher = (id: string) => api.delete(`/teachers/${id}`);

const API_URL = "http://localhost:5000/api";

export const sendMessage = async (message: string): Promise<string> => {
  const response = await fetch(`${API_URL}/chat/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  const data = await response.json();
  return data.reply;
};

export default api;
