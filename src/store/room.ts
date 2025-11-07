import api from "@/lib/api";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";

export interface RoomState {
  rooms: Array<Room>;
  room?: Room;
  getRooms: () => Promise<Array<Room>>;
  getRoomById: (id: number) => Promise<boolean>;
  verify1stRoomCode: (code: string) => Promise<void>;
  submitSurvey: (payload: { room_id: number; hint_id: number; email?: string }) => Promise<boolean>;
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
  accessCode: string;
  completed: boolean;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  isLoading: false,
  getRooms: async () => {
    set({ isLoading: true });
    let rooms: Array<Room> = [];
    try {
      const response = await api.get("/rooms");
       rooms = response.data as Array<Room>;
      set({ rooms});
    } catch {
      set({ rooms });
    }

    set({ isLoading: false });
    
    return rooms
  },

  getRoomById: async (id: number) => {
    set({ isLoading: true });

    try {
      const response = await api.get(`/rooms/${id}`);
      set({ room: response.data });
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;

      if (axiosError.response) {
        const { data } = axiosError.response!;

        if (data.error === "room not found" && axiosError.response.status === 404) {
          toast.error("Sala no encontrada");
        }
      } else {
        toast.error("Error al obtener la sala");
      }

      set({ isLoading: false, rooms: [] });
      return false;
    }

    set({ isLoading: false });
    return true;
  },
  submitSurvey: async (payload: { room_id: number; hint_id: number; email?: string }) => {
    const backendPayload = {
      room_id: payload.room_id,
      hint_id: payload.hint_id,
      ...(payload.email ? { email: payload.email } : {}),
    };
    try {
      const res = await api.post(`/rooms/complete`, backendPayload);

      if (res?.data && payload.room_id) {
        toast.success("Encuesta enviada", { description: "Gracias por tu participación" });
        try {
          const updated = await api.get(`/rooms/${payload.room_id}`);
          set({ room: updated.data });
        } catch {
          toast.error("Error al obtener la sala actualizada");
          set({ isLoading: false });
          return false;
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;

      if (axiosError.response) {
        const { data } = axiosError.response!;

        if (data.error === "hint not found for room" && axiosError.response.status === 404) {
          toast.error("Pista no encontrada para la sala");
        }
      } else {
        toast.error("Error al completar la encuesta");
      }

      set({ isLoading: false });
      return false;
    }

    set({ isLoading: false });
    return true;
  },

  verify1stRoomCode: async (code: string) => {
    set({ isLoading: true });

    try {
      const response = await api.post(`/rooms/1/verify_final_code`, { final_code: code });
      if (response.data.correct) {
        toast.success("Código verificado correctamente");
      } else {
        toast.error("Código incorrecto, intenta de nuevo");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;

      if (axiosError.response) {
        const { data } = axiosError.response!;

        if (data.error === "room not found" && axiosError.response.status === 404) {
          toast.error("Sala no encontrada");
        }

        if (data.error === "final_code required in request body" && axiosError.response.status === 400) {
          toast.error("Código final requerido en la solicitud");
        }

        if (data.error === "room already completed" && axiosError.response.status === 400) {
          toast.error("Sala ya completada");
        }
      } else {
        toast.error("Error al completar la encuesta");
      }

      set({ isLoading: false });
    }

    set({ isLoading: false });
  },
}));
