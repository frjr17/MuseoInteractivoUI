import axios from "axios";
import { create } from "zustand";

export interface RoomState {
  rooms: Array<Room>;
  room?: Room;
  getRooms: () => void;
  getRoomById: (id: number) => void;
  submitSurvey: (payload: { room_id: number; hint_id: number; email?: string }) => Promise<void>;
  isLoading: boolean;
}

export interface Room {
  id: number;
  name: string;
  imageUrl?: string;
  hints: Array<Hint>;
  completed: boolean;
  isUnlocked?: boolean;
  final_code: string;
}

export interface Hint {
  id: number;
  roomId: string;
  title: string;
  limeSurveyUrl?: string;
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
  submitSurvey: async (payload: { room_id: number; hint_id: number; email?: string }) => {
    // POST to backend endpoint to mark room/hint complete or submit survey
    const res = await axios.post(`/api/rooms/complete`, payload, { withCredentials: true });
    // Optionally refresh the room data after completion
    if (res?.data && payload.room_id) {
      try {
        const updated = await axios.get(`/api/rooms/${payload.room_id}`, { withCredentials: true });
        set({ room: updated.data });
      } catch {
        // ignore refresh errors
      }
    }
  },
}));
