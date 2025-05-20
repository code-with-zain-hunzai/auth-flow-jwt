// src/api/api.ts

import axios from "axios";
import { API_BASE_URL } from "./constant";
// import { toast } from "sonner";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message = error?.response?.data?.message || error.message || "Something went wrong";
//     if (error?.response?.status !== 401) {
//       toast.error(message);
//     }
//     return Promise.reject(error);
//   }
// );

// Specific API methods


export const submitForm = async (data: FormValues): Promise<any> => {
  const response = await api.post('/api/form/submit', data);
  return response.data;
};