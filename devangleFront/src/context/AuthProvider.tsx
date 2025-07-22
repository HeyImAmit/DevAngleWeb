import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthUser, AuthContextType } from "./AuthContext";
import { AuthContext } from "./AuthContext";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;

  const setUserWithLog = (user: AuthUser | null) => {
    if (user === null) {
      console.log("setUser called with null");
    } else {
      console.log("setUser called with user", user);
    }
    setUser(user);
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      console.log("Login response:", data);

      const avatarUrl = data.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`;
      setUserWithLog({ email: data.email, name: data.name, avatar: avatarUrl });
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const loginWithToken = async (token: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("/me error response:", res.status, errorText);
        if (res.status === 401 || res.status === 403) {
          logout();
        }
        throw new Error("Failed to fetch user");
      }
      const data = await res.json();
      console.log("/me response data:", data);
      const email = data.email || data.user?.email || "";
      const name = data.name || data.user?.name || "";
      const avatarUrl = data.avatarUrl || data.user?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;
      setUserWithLog({ email, name, avatar: avatarUrl });
      console.log("User set:", { email, name, avatar: avatarUrl });
      return true;
    } catch (error) {
      console.error("Token login error:", error);
      // Only logout if error is 401/403, already handled above
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      const avatarUrl = data.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`;
      setUserWithLog({ email: data.email, name: data.name, avatar: avatarUrl });
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = () => {
    console.log("Logout called");
    setUserWithLog(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    console.log("AuthProvider useEffect running", { user, token: localStorage.getItem("token") });
    const token = localStorage.getItem("token");
    if (token && !user) {
      loginWithToken(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    loginWithToken,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
