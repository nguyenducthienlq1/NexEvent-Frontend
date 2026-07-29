import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserLogin } from "@/features/auth/types/auth.types";

interface AuthState {
  accessToken: string | null;
  user: UserLogin | null;
  setAuth: (token: string, user: UserLogin) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setAuth: (token, user) => set({ accessToken: token, user }),
      clearAuth: () => set({ accessToken: null, user: null }),
    }),
    {
      name: "nexevent-auth",
      // Chỉ persist user info, không persist token (token được refresh qua cookie)
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
