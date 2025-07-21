// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import { Spinner } from "@/components/ui/spinner";

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      (async () => {
        const success = await loginWithToken(token);
        navigate(success ? "/dashboard" : "/login", { replace: true });
      })();
    } else {
      navigate("/login", { replace: true });
    }
  }, [location.search, loginWithToken, navigate]);

  return <Spinner size="sm" className="bg-black dark:bg-white" />;
}
