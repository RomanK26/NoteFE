import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const isPublic = [
      "/api/register/",
      "/api/login/",
      "/api/token/",
      "/api/token/refresh/",
    ].some((url) => config.url.includes(url));

    if (!isPublic && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await api.post("/api/token/refresh/", {
          refresh: refreshToken,
        });
        const { access } = response.data;

        localStorage.setItem("accessToken", access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }

    return Promise.reject(error);
  },
);

export default api;
