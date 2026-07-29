import { apiClient } from "../../../lib/apiClient";
import { authStore } from "../../../stores/auth.store";
import type { LoginResponse } from "../types";

export const authApi = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    const token =
      data.data?.access_token ||
      data.access_token ||
      data.data?.accessToken ||
      data.accessToken;
    const user = data.data?.userLogin || data.userLogin;

    if (!token) throw new Error("Login response is missing an access token.");

    authStore.setAuth(token, user);
    return { token, user };
  },
};
