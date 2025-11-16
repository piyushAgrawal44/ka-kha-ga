import { UserRole, UserType } from "./user.type";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  code: number;
  message: string;
  data?: {
    token: string;
    user: UserType;
  } | null;
  error: string | { name: string; message: string } | null;
}

export interface AuthState {
  user: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}