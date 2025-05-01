import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import ForgotPassword from "@/pages/auth/forgot-password";
import Verify from "@/pages/auth/verify";
import ResetPassword from "@/pages/auth/reset";
import NotFound from "@/pages/commons/404";
import DashboardHome from "@/pages/app/dashboard";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Loader } from "@/components/ui/loader";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/verify" element={<Verify />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />

      {/* Dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />

      <Route //* Redirect root to dashboard if authenticated, otherwise to login
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/auth/login" replace />
          )
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default function PagesRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
