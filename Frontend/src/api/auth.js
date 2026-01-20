// src/api/auth.js
import api from "./axios";

export const login = async (credentials) => {
  const response = await api.post("/auth/login/", credentials);
  return response.data;
};

export const register = async (data) => {
  const response = await api.post("/auth/register/", data);
  return response.data;
};

export const refreshToken = async (refresh) => {
  const response = await api.post("/auth/refresh/", { refresh });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
