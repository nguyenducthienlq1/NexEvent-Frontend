import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth.api";
import { useAuthStore } from "@/store/auth.store";
import type {
  LoginRequest,
  RegisterRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/types/auth.types";

// ── Login ─────────────────────────────────────────────────────
// Navigate after success is handled in the page component via onSuccess callback
export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: ({ data }) => {
      setAuth(data.access_token, data.userLogin);
    },
  });
}

// ── Register ──────────────────────────────────────────────────
// Navigate after success is handled in the page component via onSuccess callback
export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
  });
}

// ── Change Password ───────────────────────────────────────────
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authApi.changePassword(data),
  });
}

// ── Forgot Password ───────────────────────────────────────────
export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
  });
}

// ── Reset Password ────────────────────────────────────────────
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authApi.resetPassword(data),
  });
}

// ── Logout ────────────────────────────────────────────────────
export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  return () => {
    clearAuth();
    window.location.href = "/login";
  };
}
