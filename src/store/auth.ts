import { create } from "zustand";

export interface AuthState {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  setFormField: (field: NonFunctionKeys<AuthState>, value: string) => void;
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
  login: (email: string, password: string) => {
    // Implement login logic here
    set({ isLoading: true });
    console.log(email, password);
    set({ isLoading: false });
  },
  register: (
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
  sendPasswordResetEmail: (email: string) => {
    // Implement password reset email logic here
    set({ isLoading: true });
    console.log(email);
    set({ isLoading: false });
  },
  verifyPasswordResetCode: (code: string) => {
    // Implement code verification logic here
    set({ isLoading: true });
    console.log(code);
    set({ isLoading: false });
    return true;
  },
  resetPassword: (newPassword: string, confirmPassword: string) => {
    // Implement password reset logic here
    set({ isLoading: true });
    console.log(newPassword, confirmPassword);
    set({ isLoading: false });  
    return true;
  },
  logout: () => {
    // Implement logout logic here
  },
}));
