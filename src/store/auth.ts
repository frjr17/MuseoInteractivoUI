import { create } from "zustand";

export interface AuthState {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe?: boolean;
  isLoading: boolean;
  resetCode: string;
  setFormField: (field: authFormKeys, value: string | boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  verifyPasswordResetCode: (code: string) => Promise<boolean>;
  resetPassword: (
    newPassword: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  reset: () => void;
}

export type authFormKeys =
  | "name"
  | "lastName"
  | "email"
  | "password"
  | "confirmPassword"
  | "rememberMe"
  | "resetCode";


export const useAuthStore = create<AuthState>((set) => ({
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isLoading: false,
  rememberMe: false,
  resetCode: "",
  setFormField: (field: authFormKeys, value: string | boolean) =>
    set({ [field]: value }),
  login: async (email: string, password: string) => {
    // Implement login logic here
    set({ isLoading: true });
    console.log(email, password);
    set({ isLoading: false });
  },
  register: async (
    name: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    // Implement registration logic here
    set({ isLoading: true });
    console.log(name, lastName, email, password, confirmPassword);
    set({ isLoading: false });
  },
  sendPasswordResetEmail: async (email: string) => {
    // Implement password reset email logic here
    set({ isLoading: true });
    console.log(email);
    set({ isLoading: false });
  },
  verifyPasswordResetCode: async (code: string) => {
    // Implement code verification logic here
    set({ isLoading: true });
    console.log(code);
    set({ isLoading: false });
    return true;
  },
  resetPassword: async (newPassword: string, confirmPassword: string) => {
    // Implement password reset logic here
    set({ isLoading: true });
    console.log(newPassword, confirmPassword);
    set({ isLoading: false });
  },
  logout: async () => {
    // Implement logout logic here
  },
  reset: () =>
    set({
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isLoading: false,
      rememberMe: false,
      resetCode: "",
    }),
}));
