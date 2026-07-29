import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

/**
 * Bảo vệ các route yêu cầu đăng nhập.
 * Nếu chưa đăng nhập → redirect về /login.
 */
const ProtectedRoute = () => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
