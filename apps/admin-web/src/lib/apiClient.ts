import axios from "axios";
import { apiUrl, env } from "./env";
import { authStore } from "../stores/auth.store";

export const API_BASE_URL = env.apiBaseUrl;
export const API_PREFIX = env.apiPrefix;

export const apiClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = authStore.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
