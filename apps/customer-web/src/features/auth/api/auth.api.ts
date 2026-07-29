import axiosInstance from "@/lib/apiClient";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/features/auth/types/auth.types";

export const authApi = {
  login: (data: LoginRequest) =>
    axiosInstance.post<LoginResponse>("/auth/login", data),

  register: (data: RegisterRequest) =>
    axiosInstance.post("/auth/register", data),

  changePassword: (data: ChangePasswordRequest) =>
    axiosInstance.post("/auth/password/change", data),

  forgotPassword: (data: ForgotPasswordRequest) =>
    axiosInstance.post("/auth/password/forgot-password", data),

  resetPassword: (data: ResetPasswordRequest) =>
    axiosInstance.post("/auth/password/reset-password", data),
};
