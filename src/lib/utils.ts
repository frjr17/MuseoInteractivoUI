import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRoomHintId = (roomId: number, hintIndex: number) => {
  return hintIndex <= 5 ? hintIndex : hintIndex - 5 * (roomId - 2);
};

export const apiBaseUrl = import.meta.env.VITE_API_URL;
