import axios from "axios";
import { create } from "zustand";

export interface RoomState {
  rooms: Array<Room>;
  room?: Room;
  getRooms: () => void;
  getRoomById: (id: number) => void;
  isLoading: boolean;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  hints: Array<Hint>;
  completed: boolean;
  isUnlocked?: boolean;
}

export interface Hint {
  id: number;
  roomId: string;
  title: string;
  description: string;
  imageUrl?: string;
  completed: boolean;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  isLoading: false,
  getRooms: async () => {
    set({ isLoading: true });
    // Implement get rooms logic here
    try {
      const response = await axios.get("/api/rooms", { withCredentials: true });
      set({ rooms: response.data });
      console.log("Rooms fetched:", response.data);
    } catch {
      set({ rooms: [] });
    }
    set({
      isLoading: false,
    });
  },

  getRoomById: async (id: number) => {
    set({ isLoading: true });

    try {
      const response = await axios.get(`/api/rooms/${id}`, { withCredentials: true });
      set({ room: response.data });
    } catch {
      set({ room: undefined });
    }

    set({ isLoading: false });
  },
}));
