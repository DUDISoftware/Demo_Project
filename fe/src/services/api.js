import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Sửa nếu backend deploy
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const googleLogin = (data) => API.post("/auth/google-login", data); // 👈 Google login API
