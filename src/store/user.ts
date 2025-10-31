import { create } from "zustand";
import axios from "axios";
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
    // Implement get user logic here
    set({ isLoading: true });
    const response = await axios.get("/api/auth/me", { withCredentials: true });
    const userData = response.data;
    console.log("Fetched user data:", userData);
    if (!userData.id) {
      set({ isLoading: false });
      return false;
    }

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

    // After fetching user data
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
