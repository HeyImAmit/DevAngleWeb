import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import AuthCallback from "@/pages/AuthCallback";
import { useAuth } from "@/context/useAuth";
import type { JSX } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Spinner } from "@/components/ui/spinner";
import Home from "@/pages/Home";
import CreateBlog from "@/pages/CreateBlog";
import PostDetail from "@/pages/PostDetail";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import RouteLoader from "@/components/RouteLoader";

function ProtectedRoute({ children }: Readonly<{ children: JSX.Element }>) {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute user:", user, "loading:", loading);
  if (loading) {
    return <Spinner size="sm" className="bg-black dark:bg-white" />;
  }

  if (!user) {
    console.log("ProtectedRoute redirecting to /login because user is null");
    return <Navigate to="/login" />;
  }

  return children;
}

export default function AppRouter() {
  return (
    <ThemeProvider>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          {/* Main dashboard route with loader */}
          <Route element={<ProtectedRoute><RouteLoader><DashboardLayout /></RouteLoader></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* All other dashboard subroutes remain as before */}
            <Route path="/dashboard/posts" element={<Dashboard />} />
            <Route path="/dashboard/drafts" element={<Dashboard />} />
            <Route path="/dashboard/community" element={<Dashboard />} />
            <Route path="/dashboard/following" element={<Dashboard />} />
            <Route path="/dashboard/bookmarks" element={<Dashboard />} />
            <Route path="/dashboard/trending" element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<Dashboard />} />
            <Route path="/dashboard/analytics/posts" element={<Dashboard />} />
            <Route path="/dashboard/analytics/engagement" element={<Dashboard />} />
            <Route path="/dashboard/analytics/audience" element={<Dashboard />} />
            <Route path="/dashboard/settings" element={<Dashboard />} />
            <Route path="/dashboard/settings/profile" element={<Dashboard />} />
            <Route path="/dashboard/settings/account" element={<Dashboard />} />
            <Route path="/dashboard/settings/preferences" element={<Dashboard />} />
            <Route path="/dashboard/settings/security" element={<Dashboard />} />
            <Route path="/dashboard/recent" element={<Dashboard />} />
            <Route path="/dashboard/tags" element={<Dashboard />} />
            <Route path="/dashboard/notifications" element={<Dashboard />} />
          </Route>
          {/* Standalone create page and others remain as before */}
          <Route path="/dashboard/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
          <Route path="/post/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
