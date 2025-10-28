import { create } from "zustand";

interface AuthState {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  register: (
    name: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  sendPasswordResetEmail: (email: string) => void;
  verifyPasswordResetCode: (code: string) => boolean;
  resetPassword: (newPassword: string, confirmPassword: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isLoading: false,
  login: (email: string, password: string) => {
    // Implement login logic here
  },
  register: (
    name: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    // Implement registration logic here
  },
  sendPasswordResetEmail: (email: string) => {
    // Implement password reset email logic here
  },
  verifyPasswordResetCode: (code: string) => {
    // Implement code verification logic here
    return true;
  },
  resetPassword: (newPassword: string, confirmPassword: string) => {
    // Implement password reset logic here
    return true;
  },
  logout: () => {
    // Implement logout logic here
  },
}));
