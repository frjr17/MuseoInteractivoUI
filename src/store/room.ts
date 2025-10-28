import { create } from "zustand";

export interface RoomState {
  rooms: Array<Room>;
  getRooms: () => void;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  hints: Array<Hint>;
  completed: boolean;
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
          id: "3f9b8c1a-4e2a-4d3b-9a5b-1e2f3a4b5c6d",
          name: "El Secreto del Canal",
          description: "Sala 1",
          hints: [],
          completed: false,
        },
        {
          id: "a1b2c3d4-e5f6-4789-abcd-0123456789ab",
          name: "Leyendas panameñas",
          description: "Sala 2",
          hints: [],
          completed: false,
        },
        {
          id: "b3c2d1e4-9f6a-4b8c-8f7e-234567890abc",
          name: "El tesoro verde de Panamá",
          description: "Sala 3",
          hints: [],
          completed: false,
        },
        {
          id: "d4e5f6a7-1b2c-4d3e-9f8a-34567890abcd",
          name: "Sabores y colores de Panamá",
          description: "Sala 4",
          hints: [],
          completed: false,
        },
        {
          id: "e5f6a7b8-2c3d-4e5f-8a9b-4567890abcde",
          name: "Las llaves de la ciudad",
          description: "Sala 5",
          hints: [],
          completed: false,
        },
      ],
    });
  },
}));
