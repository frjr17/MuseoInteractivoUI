import { create } from "zustand";

interface UserState {
  name: string;
  lastName: string;
  email: string;
  token: string;
  role: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const useUserStore = create<UserState>(() => ({
  name: "",
  lastName: "",
  email: "",
  token: "",
  role: "",
  createdAt: null,
  updatedAt: null,
}));
