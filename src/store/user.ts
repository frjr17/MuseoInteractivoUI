import api from "@/lib/api";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
interface UserState {
  id: string;
  name: string;
  lastName: string;
  email: string;
  globalPosition: number;
  role: string;
  totalPoints?: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  isLoading: boolean;
  getUser: () => Promise<boolean>;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: "",
  name: "",
  lastName: "",
  email: "",
  globalPosition: 0,
  totalPoints: 0,
  role: "",
  createdAt: null,
  updatedAt: null,
  isLoading: false,

  getUser: async () => {
    set({ isLoading: true });

    try {
      const response = await api.get("/auth/me", { withCredentials: true });
      const userData = response.data;

      set({
        name: userData.nombre,
        lastName: userData.apellido,
        email: userData.email,
        globalPosition: userData.globalPosition,
        role: userData.role,
        totalPoints: userData.totalPoints,
        createdAt: new Date(userData.createdAt),
        updatedAt: new Date(userData.updatedAt),
      });

      // toast.success("Datos de usuario cargados correctamente");
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;

      if (axiosError.response) {
        const { data } = axiosError.response!;
        const { location } = window;
        const isSignPages = location.pathname.startsWith("/sign") || location.pathname.startsWith("/forgot-password");

        if (data.error === "unauthorized" && axiosError.response.status === 401 && !isSignPages) {
          toast.error("Se debe iniciar sesión para continuar.");
        }
      } else {
        toast.error("Error al cargar los datos de usuario");
      }

      set({ isLoading: false });
      return false;
    }

    set({ isLoading: false });
    return true;
  },

  resetUser: () => {
    set({
      id: "",
      name: "",
      lastName: "",
      email: "",
      globalPosition: 0,
      totalPoints: 0,
      role: "",
      createdAt: null,
      updatedAt: null,
    });
  },
}));
