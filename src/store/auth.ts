import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useUserStore } from "./user";
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
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
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
  rememberMe: true,
  resetCode: "",

  setFormField: (field: authFormKeys, value: string | boolean) =>
    set({ [field]: value }),

  login: async (email: string, password: string) => {
    // Implement login logic here
    set({ isLoading: true });

    try {
      await axios.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success("Inicio de sesión exitoso");
      await useUserStore.getState().getUser();
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 401) {
        toast.error("Correo o contraseña incorrectos");
      }

      return false;
    }

    set({ isLoading: false });
    return true;
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
    try {
      const response = await axios.post("/api/auth/register", {
        nombre: name,
        apellido: lastName,
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        toast.success("Registro exitoso");
        return true;
      }
    } catch {
      toast.error("Error en el registro");
      return false;
    }

    set({ isLoading: false });
    return false;
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
    set({ isLoading: true });
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    useUserStore.setState({
      id: "",
      name: "",
      lastName: "",
      email: "",
      globalPosition: 0,
      role: "",
      totalPoints: 0,
      createdAt: null,
      updatedAt: null,
      isLoading: false,
    });
    set({
      isLoading: false,
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: true,
      resetCode: "",
    });
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
