import axios from "axios";
import { apiUrl } from "@/lib/env";
import { useAuthStore } from "@/stores/auth.store";

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
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
          `${apiUrl}/auth/refresh`,
          {},
          { withCredentials: true },
        );
        const newToken: string = data.data?.access_token ?? data.access_token;

        useAuthStore
          .getState()
          .setAuth(newToken, data.data?.userLogin ?? data.userLogin);
        pendingRequests.forEach((cb) => cb(newToken));
        pendingRequests = [];

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch {
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
