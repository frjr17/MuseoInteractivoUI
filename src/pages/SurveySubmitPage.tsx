import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useRoomStore } from "@/store/room";

export default function SurveySubmitPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const roomStore = useRoomStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(location.search);
        const survey = params.get("survey");
        const email = params.get("email");

        if (!survey) {
          setError("Parámetro 'survey' faltante");
          setLoading(false);
          return;
        }

        // Expected format: S{room}P{hint} e.g. S1P2
        const match = survey.match(/S(\d+)P(\d+)/i);
        if (!match) {
          setError("Formato de 'survey' inválido. Se esperaba S{room}P{hint} (ej: S1P2)");
          setLoading(false);
          return;
        }

        const room_id = Number(match[1]);
        const hint_id = Number(match[2]) + 5 * (room_id - 1);

        if (Number.isNaN(room_id) || Number.isNaN(hint_id)) {
          setError("IDs inválidos en 'survey'");
          setLoading(false);
          return;
        }

        const payload: { room_id: number; hint_id: number; email?: string } = { room_id, hint_id };
        if (email) payload.email = email;

        await roomStore.submitSurvey(payload);

        navigate(`/rooms/${room_id}`);
      } catch (err: unknown) {
        console.error(err);
        setError((err as Error)?.message ?? "Error al enviar la encuesta");
        toast.error("Error al enviar la encuesta");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-purple-700">Enviando encuesta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl text-center p-6 bg-white rounded shadow">
          <h3 className="text-lg font-semibold text-red-600">Error</h3>
          <p className="mt-2 text-sm text-gray-700">{error}</p>
          <div className="mt-4">
            <button className="px-4 py-2 bg-purple-600 text-white rounded" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
