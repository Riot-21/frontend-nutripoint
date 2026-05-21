import axios from "axios";
import { useAuthStore } from "@/modules/auth/store/auth.store";

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

privateApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response?.status === 401) {
            useAuthStore.getState().logout();
        }

        return Promise.reject(error);
    }
)
