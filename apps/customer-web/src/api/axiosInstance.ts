import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
const API_PREFIX = import.meta.env.VITE_API_PREFIX as string;

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}${API_PREFIX}`,
  withCredentials: true, // Gửi cookie refresh_token theo mỗi request
});

// ── Request interceptor: gắn access token vào header ──────────
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: tự động refresh khi nhận 401 ────────
let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa thử refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Đợi cho đến khi refresh xong rồi retry
        return new Promise((resolve) => {
          pendingRequests.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${API_PREFIX}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newToken: string = data.data?.access_token ?? data.access_token;
        useAuthStore
          .getState()
          .setAuth(newToken, data.data?.userLogin ?? data.userLogin);

        // Retry các request đang pending
        pendingRequests.forEach((cb) => cb(newToken));
        pendingRequests = [];

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch {
        // Refresh thất bại → logout
        useAuthStore.getState().clearAuth();
        pendingRequests = [];
        window.location.href = "/login";
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
