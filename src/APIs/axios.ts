import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://eduai.vitaparapharma.com",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const isAuthRoute = config.url?.includes('/login') ?? config.url?.includes('/signup');
    
    if (!isAuthRoute) {
      const token = Cookies?.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: Error) => {
    return Promise.reject(new Error(error?.message));
  },
);

export default axiosInstance;