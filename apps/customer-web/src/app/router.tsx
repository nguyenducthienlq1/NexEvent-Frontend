import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import EventDetailPage from "@/features/events/pages/EventDetailPage";
import HomePage from "@/features/events/pages/HomePage";
import CheckoutPage from "@/features/orders/pages/CheckoutPage";
import MyTicketsPage from "@/features/tickets/pages/MyTicketsPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/my-tickets" element={<MyTicketsPage />} />
          <Route path="/checkout/:orderId" element={<CheckoutPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
