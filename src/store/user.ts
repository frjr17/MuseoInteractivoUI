import { create } from "zustand";

interface UserState {
  name: string;
  lastName: string;
  email: string;
  sessionToken: string;
  position: string;
  role: string;
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
  position: "",
  role: "",
  createdAt: null,
  updatedAt: null,
  isLoading: false,
  getUser: (token: string) => {
    // Implement get user logic here
    console.log(token);
  }
}));
