import api from "./axios";

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem("refresh");

      const res = await api.post("/auth/refresh/", { refresh });
      localStorage.setItem("access", res.data.access);

      original.headers.Authorization = `Bearer ${res.data.access}`;
      return api(original);
    }

    return Promise.reject(error);
  }
);
