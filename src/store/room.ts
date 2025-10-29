import { create } from "zustand";

export interface RoomState {
  rooms: Array<Room>;
  getRooms: () => void;
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
  id: string;
  roomId: string;
  title: string;
  description: string;
  imageUrl?: string;
  completed: boolean;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  getRooms: () => {
    // Implement get rooms logic here
    set({
      rooms: [
      {
        id: 1,
        name: "El Secreto del Canal",
        description: "Sala 1",
        hints: [],
        completed: true,
        isUnlocked: true,
      },
      {
        id: 2,
        name: "Leyendas panameñas",
        description: "Sala 2",
        hints: [],
        completed: true,
        isUnlocked: true,
      },
      {
        id: 3,
        name: "El tesoro verde de Panamá",
        description: "Sala 3",
        hints: [],
        completed: false,
        isUnlocked: true,
      },
      {
        id: 4,
        name: "Sabores y colores de Panamá",
        description: "Sala 4",
        hints: [],
        completed: false,
        isUnlocked: false,
      },
      {
        id: 5,
        name: "Las llaves de la ciudad",
        description: "Sala 5",
        hints: [],
        completed: false,
        isUnlocked: false,
      },
      ],
    });
  },
}));
