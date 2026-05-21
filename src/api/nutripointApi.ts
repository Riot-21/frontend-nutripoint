// import { useAuthStore } from "@/modules/auth/store/auth.store";
// import axios from "axios";

// const backendApi = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// backendApi.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export { backendApi };
