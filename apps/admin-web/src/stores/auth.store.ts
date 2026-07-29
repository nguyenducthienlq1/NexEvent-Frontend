import type { UserLogin } from "../features/auth/types";

const AUTH_KEY = "nexevent_admin_access_token";
const USER_KEY = "nexevent_admin_user";

export const authStore = {
  getToken: () => localStorage.getItem(AUTH_KEY),
  setAuth: (token: string, user?: UserLogin) => {
    localStorage.setItem(AUTH_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
  },
  getUser: (): UserLogin | null => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as UserLogin) : null;
  },
};
