import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/lib/api";
import type { AxiosError } from "axios";
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
  resetPassword: (newPassword: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  reset: () => void;
}

export type authFormKeys = "name" | "lastName" | "email" | "password" | "confirmPassword" | "rememberMe" | "resetCode";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isLoading: false,
      rememberMe: true,
      resetCode: "",

      setFormField: (field: authFormKeys, value: string | boolean) => set({ [field]: value }),

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        try {
          await api.post("/auth/login", { email, password });

          toast.success("Inicio de sesión exitoso");
        } catch (error) {
          const axiosError = error as AxiosError<{ error: string }>;

          if (axiosError.response) {
            const { data } = axiosError.response!;
            if (data.error === "invalid credentials" && axiosError.response.status === 401) {
              toast.error("Correo o contraseña incorrectos");
            }
          }

          return false;
        }

        set({ isLoading: false });
        return true;
      },

      register: async (name: string, lastName: string, email: string, password: string, confirmPassword: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post("/auth/register", {
            nombre: name,
            apellido: lastName,
            email,
            password,
            confirmPassword,
          });

          if (response.status === 201) {
            toast.success("Registro exitoso");
          }
        } catch (error) {
          const axiosError = error as AxiosError<{ error: string }>;

          if (axiosError.response) {
            const { data } = axiosError.response!;

            if (data.error === "email already registered" && axiosError.response.status === 400) {
              toast.error("Este correo ya está registrado");
            }
          } else {
            toast.error("Error en el registro");
          }
          set({ isLoading: false });
          return false;
        }

        set({ isLoading: false });
        return true;
      },

      sendPasswordResetEmail: async (email: string) => {
        set({ isLoading: true });

        try {
          const response = await api.post("/auth/forgot", { email });

          if (response.data.status === "code_sent") {
            toast.success("Código de restablecimiento enviado");
          }
        } catch (error) {
          const axiosError = error as AxiosError<{ error: string }>;

          if (axiosError.response) {
            const { data } = axiosError.response!;

            if (data.error === "email not found" && axiosError.response.status === 404) {
              toast.error("Este correo no está registrado");
            }
          } else {
            toast.error("Error al enviar el correo de restablecimiento");
          }

          set({ isLoading: false });
          return false;
        }

        set({ isLoading: false });
        return true;
      },

      verifyPasswordResetCode: async (code: string) => {
        set({ isLoading: true });
        const { email } = get();

        try {
          const response = await api.post("/auth/verify-reset", {
            code,
            email,
          });

          if (response.data.status === "code_valid") {
            toast.success("Código verificado");
          }
        } catch (error) {
          const axiosError = error as AxiosError<{ error: string }>;

          if (axiosError.response) {
            const { data } = axiosError.response!;

            if (data.error === "email not found" && axiosError.response.status === 404) {
              toast.error("Este correo no está registrado");
            }
            if (data.error === "invalid or expired code" && axiosError.response.status === 400) {
              toast.error("Código inválido o expirado");
            }
          } else {
            toast.error("Error al verificar el correo de restablecimiento");
          }

          set({ isLoading: false });
          return false;
        }

        set({ isLoading: false });
        return true;
      },

      resetPassword: async (newPassword: string) => {
        // Implement password reset logic here
        set({ isLoading: true });
        try {
          const response = await api.post("/auth/reset", {
            email: get().email,
            new_password: newPassword,
            code: get().resetCode,
          });

          if (response.data.status === "password_changed") {
            toast.success("Contraseña cambiada con éxito");
            useAuthStore.getState().reset();
          }
        } catch (error) {
          const axiosError = error as AxiosError<{ error: string }>;

          if (axiosError.response) {
            const { data } = axiosError.response!;

            if (data.error === "email not found" && axiosError.response.status === 404) {
              toast.error("Este correo no está registrado");
              set({ isLoading: false });
              return false;
            }

            if (data.error === "invalid or expired code" && axiosError.response.status === 400) {
              toast.error("Código inválido o expirado");
              set({ isLoading: false });
              return false;
            }
          } else {
            toast.error("Error al enviar el correo de restablecimiento");
          }

          set({ isLoading: false });
          return false;
        }

        set({ isLoading: false });
        return true;
      },

      logout: async () => {
        // Implement logout logic here
        set({ isLoading: true });

        try {
          const response = await api.post("/auth/logout", {}, { withCredentials: true });
          useUserStore.getState().resetUser();
          useAuthStore.getState().reset();
          
          if(response.status === 200) {
            toast.success("Cierre de sesión exitoso");
          }
        } catch {
          /* empty */
          toast.error("Error al cerrar sesión");
          set({ isLoading: false });
          return false;
        }

        set({ isLoading: false });
        return true;
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
    }),
    {
      name: "auth-storage",
    }
  )
);
