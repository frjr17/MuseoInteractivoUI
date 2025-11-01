import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  verifyPasswordResetCode: (code: string) => Promise<boolean>;
  resetPassword: (
    newPassword: string,
  ) => Promise<boolean>;
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

export const useAuthStore = create<AuthState>()(persist(
(set, get) => ({
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

    try {
      const response = await axios.post("/api/auth/forgot", { email });
      if (response.data.status === "code_sent") {
        toast.success("Código de restablecimiento enviado");
      }
    } catch {
      toast.error("Error al enviar el correo de restablecimiento");
      return false;
    }

    set({ isLoading: false });
    return true;
  },

  verifyPasswordResetCode: async (code: string) => {
    // Implement code verification logic here
    set({ isLoading: true });
    const { email } = get();
    const response = await axios.post("/api/auth/verify-reset", {
      code,
      email,
    });
    if (response.data.status !== "code_valid") {
      toast.error("Código inválido");
      set({ isLoading: false });
      return false;
    }
    toast.success("Código verificado");

    set({ isLoading: false });
    return true;
  },

  resetPassword: async (newPassword: string) => {
    // Implement password reset logic here
    set({ isLoading: true });
    try {
      const response = await axios.post("/api/auth/reset",{
        email: get().email,
        new_password: newPassword,
        code: get().resetCode
      })
      if (response.data.status !== "password_changed") {
        toast.error("Error al cambiar la contraseña");
        set({ isLoading: false });
        return false;
      }
    } catch {
      return false
    }

    set({ isLoading: false });
    return true;
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
      rememberMe: true,
      resetCode: "",
    }),
}),{
  name: "auth-storage"
}
));
