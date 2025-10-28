import { create } from "zustand";

interface UserState {
  name: string;
  lastName: string;
  email: string;
  sessionToken: string;
  globalPosition: number;
  role: string;
  totalPoints?: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  isLoading: boolean;
  getUser: (token: string) => void;
}

export const useUserStore = create<UserState>(() => ({
  name: "",
  lastName: "",
  email: "",
  sessionToken: "",
  globalPosition: 0,
  totalPoints: 0,
  role: "",
  createdAt: null,
  updatedAt: null,
  isLoading: false,
  getUser: (token: string) => {
    // Implement get user logic here
    console.log(token);
  }
}));
