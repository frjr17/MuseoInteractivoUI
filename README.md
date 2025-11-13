# Museo Interactivo UI

Aplicación frontend del Museo Interactivo construida con Vite + React + TypeScript. Implementa autenticación con token, gestión de salas y pistas, escaneo de QR para acceder a encuestas externas y un flujo de envío/validación de respuestas.

## Tecnologías
- React 19 + TypeScript
- Vite 7
- React Router 7
- Zustand (estado global con persistencia)
- Axios (cliente HTTP)
- Tailwind CSS 4 + Radix UI (componentes UI)
- Sonner (toasts)
- html5-qrcode (escáner de QR)

## Estructura principal
```
src/
  App.tsx                 # Rutas principales
  main.tsx                # Bootstrap de React + Router
  index.css               # Estilos globales (Tailwind)
  lib/
    api.ts               # Axios configurado + interceptor de Authorization
    utils.ts             # Utilidades (cn, getRoomHintId, apiBaseUrl)
  store/
    auth.ts              # Autenticación (login, register, logout, reset)
    user.ts              # Perfil de usuario (GET /auth/me)
    room.ts              # Salas, pistas, envío de encuestas y verificación
  components/
    QRScanner.tsx        # Modal de escáner QR y entrada manual de código
    ...                  # Header, listas, UI
  pages/
    MuseumHomePage.tsx
    RoomViewPage.tsx     # Vista de sala, progreso y código final
    FirstRoomPage.tsx    # Flujo de verificación del código final de Sala 1
    SignPage.tsx         # Login/Registro
    ForgotPasswordPage.tsx / Reset flows
    SurveySubmitPage.tsx # Recibe params y completa encuesta en backend
```

## Funcionalidades clave
- Autenticación por token:
  - `login`/`register` guardan `sessionToken` en el store `auth` (persistido por Zustand).
  - Un interceptor en `src/lib/api.ts` agrega `Authorization: Bearer <token>` a cada request si existe token.
  - `logout` limpia estado de usuario y auth.
- Gestión de usuario: `src/store/user.ts` obtiene el perfil con `/auth/me` y maneja estados de no autorizado.
- Salas y pistas: `src/store/room.ts`
  - `getRooms`, `getRoomById`
  - `submitSurvey` POST `/rooms/complete` y refresca la sala
  - `verify1stRoomCode` (sala 1) valida el código final y muestra feedback
- Escaneo de QR: `src/components/QRScanner.tsx`
  - Solicita permiso de cámara, abre el escáner y/o permite ingreso manual de código
  - Construye la URL a la encuesta externa agregando parámetros esperados
- Envío de encuesta: `src/pages/SurveySubmitPage.tsx`
  - Lee query params `survey` y `email`
  - Valida formato `S{room}P{hint}` (p.ej. `S1P2`)
  - Calcula `hint_id` y hace `POST /rooms/complete`; luego redirige a `/rooms/{room_id}`

## Variables de entorno
Copia `env.example` a `.env` y define:

```
VITE_API_URL=http://localhost:5000
```

- `VITE_API_URL`: URL base de la API backend. El cliente Axios usa este valor para todas las solicitudes.

## Ejecutar en local
Requisitos: Node.js 18+ y npm.

```
# 1) Instalar dependencias
npm install

# 2) Configurar variables de entorno
cp env.example .env
# editar .env y asignar VITE_API_URL

# 3) Ejecutar el servidor de desarrollo
npm run dev
# abre el puerto que indique Vite (p. ej. http://localhost:5173)
```

## Build de producción
```
npm run build
npm run preview  # sirve el build localmente
```

## Decisiones de diseño
- Estado global con Zustand + persist: se persiste bajo la clave `auth-storage` en `localStorage`.
- Autenticación por token (Bearer): el interceptor en `api.ts` lee el token desde el estado persistido y lo añade al header `Authorization` de todas las peticiones.
- React Router para el enrutamiento de páginas y protección básica (redirección a `/sign` cuando no hay sesión válida).
- Tailwind CSS + Radix UI para estilos y componentes accesibles.

## Endpoints esperados (frontend)
- `POST /auth/login`, `POST /auth/register`, `POST /auth/logout`, `GET /auth/me`
- `GET /rooms`, `GET /rooms/:id`, `POST /rooms/complete`, `POST /rooms/1/verify_final_code`

Nota: El backend debe emitir `sessionToken` en las respuestas de login/registro y aceptar `Authorization: Bearer` en los endpoints protegidos.

## Contribución
¡Gracias por tu interés en contribuir! Sugerido:
- Crear rama desde `dev`, realizar cambios y abrir PR.
- Alinear formato con ESLint/TypeScript.
- Mantener nombres y estilos consistentes.

### Contribuyentes
- Agrega tu nombre aquí:
  - Hernán Valencia ([Me!🙌](https://github.com/frjr17)): Fullstack Dev
  - Luis Ellis ([@luisellisc](https://github.com/luisellisc)): Generación de Encuestas
  - Aywad Al Chami ([@Shuli01](https://github.com/Shuli01)): Diseño

## Troubleshooting
- 401/"unauthorized": verifica que el backend devuelva `sessionToken` y que `VITE_API_URL` apunte al backend correcto.
- El QR no enciende cámara: revisa permisos del navegador y soporte de `getUserMedia`.
- Variables `.env`: recuerda reiniciar `npm run dev` si cambias `VITE_API_URL`.