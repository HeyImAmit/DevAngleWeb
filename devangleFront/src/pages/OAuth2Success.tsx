import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OAuth2Success() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Save token to localStorage and context
      localStorage.setItem("token", token);

      // Optionally fetch user data here or decode from token
      // For simplicity, you can call your API /user/me now

      // Redirect to dashboard
      navigate("/dashboard");
    } else {
      // No token found, redirect to login or error page
      navigate("/login");
    }
  }, [location.search, navigate]);

  return <div>Logging you in...</div>;
}
