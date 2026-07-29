// ────────────────────────────────────────────────────────────
// Auth types — map từ ResLoginDTO, RegisterDTO, LoginDTO
// ────────────────────────────────────────────────────────────

export interface UserLogin {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  userLogin: UserLogin;
  access_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullname: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}
