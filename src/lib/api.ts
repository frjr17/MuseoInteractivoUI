import axios from "axios";

const baseURL = (import.meta.env.VITE_API_URL as string) || "";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
  
});

export default api;
