import axios from "axios";
import { User, LoginCredentials, RegisterPayload } from "./../types/user";

const API_URL = "http://localhost:5000/api/users";

const register = (payload: RegisterPayload) => {
  return axios.post<User>(`${API_URL}/register`, payload);
};

const login = (credentials: LoginCredentials) => {
  console.log("Logging in with credentials:", credentials);
  return axios.post<User>(`${API_URL}/login`, credentials);
};

export default {
  register,
  login,
};
