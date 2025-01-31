import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (authUser?.token) {
      config.headers.Authorization = `Bearer ${authUser.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosInstance };
