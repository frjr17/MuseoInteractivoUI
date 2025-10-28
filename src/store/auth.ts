import { create } from "zustand";

export interface AuthState {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  setFormField: (field: NonFunctionKeys<AuthState>, value: string) => void;
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
  resetPassword: (newPassword: string, confirmPassword: string) => Promise<void>;
  logout: () => Promise<void>;
}

 
export type NonFunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
// type StringKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T];

export const useAuthStore = create<AuthState>((set) => ({
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isLoading: false,
  setFormField: (field: NonFunctionKeys<AuthState>, value: string) =>
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
    return true;
  },
  logout: async () => {
    // Implement logout logic here
  },
}));
