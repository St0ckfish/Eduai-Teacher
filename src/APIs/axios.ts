import axios from "axios";
import Cookies from "js-cookie";
export const baseUrlStock = `wss://api.eduai.tech/`; //wss://eduai.vitaparapharma.com //wss://195.35.28.106:8091 //wss://api.eduai.tech

const axiosInstance = axios.create({
  baseURL: "https://api.eduai.tech",
  // baseURL: "https://eduai.vitaparapharma.com",
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