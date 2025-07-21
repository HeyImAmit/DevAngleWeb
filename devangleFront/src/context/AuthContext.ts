import { createContext } from "react";

export interface AuthUser {
  email: string;
  password?: string;
  name?: string; // optional
  avatar?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  loginWithToken: (token: string) => Promise<boolean>;
  loading: boolean; // Add this!
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
