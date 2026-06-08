import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import HomePage from "@/pages/HomePage";
import EventDetailPage from "@/pages/EventDetailPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import MyTicketsPage from "@/pages/MyTicketsPage";
import CheckoutPage from "@/pages/CheckoutPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes — full-screen, no Navbar/Footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Routes dùng MainLayout (Navbar + Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/my-tickets" element={<MyTicketsPage />} />
            <Route path="/checkout/:orderId" element={<CheckoutPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
