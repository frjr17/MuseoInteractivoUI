import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axiosInstance from "axios"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const apiBaseUrl = import.meta.env.VITE_API_URL

export const axios = axiosInstance.create({
  baseURL: apiBaseUrl,
  headers:{
    'Content-Type': 'application/json',
    "Acccess-Control-Allow-Origin": "*",
  }
})