import axios, { type InternalAxiosRequestConfig } from "axios";

// In development use a relative base URL so Vite dev server proxy can forward requests
// to the backend and cookies will be same-origin. In production use the configured
// VITE_API_URL.
const baseURL = import.meta.env.VITE_API_URL as string;

const api = axios.create({
  baseURL,
  headers:{
    "Allow-Access-Control-Origin":"*"
  }
});

// Attach Authorization header (Bearer token) on every request when a token exists.
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      // Try to read the session token from zustand's persisted storage first.
      // The auth store uses `persist` with the key `auth-storage`, so the token
      // will usually be available as JSON under that key. Fall back to a
      // top-level `sessionToken` localStorage key if present.
      let token: string | null = null;
      try {
        const raw = localStorage.getItem("auth-storage");
        if (raw) {
          const parsed = JSON.parse(raw) as unknown;
          // zustand persist may store the state object directly, or sometimes
          // under a `state` property depending on versions/wrappers — check both.
          if (parsed && typeof parsed === "object") {
            const obj = parsed as Record<string, unknown>;
            const direct = obj["sessionToken"];
            if (typeof direct === "string") {
              token = direct;
            } else {
              const nested = obj["state"];
              if (nested && typeof nested === "object") {
                const stateObj = nested as Record<string, unknown>;
                const nestedToken = stateObj["sessionToken"];
                if (typeof nestedToken === "string") token = nestedToken;
              }
            }
          }
        }
      } catch {
        // ignore parse errors and fall through
        token = null;
      }
      if (!token) {
        token = localStorage.getItem("sessionToken");
      }
      if (token) {
        if (!config.headers) config.headers = {} as unknown as InternalAxiosRequestConfig["headers"];
        // Only set Authorization if not already present
        const headers = config.headers as Record<string, unknown>;

        if (!headers["Authorization"]) {
          headers["Authorization"] = `Bearer ${token}`;
        }
      }
    } catch {
      // ignore localStorage errors
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

export default api;
