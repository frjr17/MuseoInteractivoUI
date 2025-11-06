import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { QRScanner } from "@/components/QRScanner";
import { Eye } from "lucide-react";
import { useRoomStore } from "@/store/room";
import { useNavigate, useParams } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import Header from "@/components/Header";
import HintsList from "@/components/HintsList";

export default function RoomViewPage() {
  const { id } = useParams();
  const roomId = Number(id);
  const roomStore = useRoomStore();
  const navigate = useNavigate(); 
  const { room } = roomStore;
  const totalHints = room?.hints.length as number;
  const roomTitle = room?.name;
  const roomDescription = "Reto de la Sala " + roomId;

  useEffect(() => {
    (async () => {
      const rooms = await roomStore.getRooms();
      await roomStore.getRoomById(roomId);
      
      if (roomId !== 1) {
        const previousRoom = rooms.find((r) => r.id === roomId - 1);
        if (!previousRoom?.completed) {
          toast.error("Debes completar la sala anterior antes de acceder a esta.");
          navigate("/")
        }
      }
    })();
  }, []);

  const [showScanner, setShowScanner] = useState(false);
  const [currentHintId, setCurrentHintId] = useState<number | null>(null);
  const [showFinalCode, setShowFinalCode] = useState(false);

  const completedCount = room?.hints.filter((c) => c.completed).length as number;
  const finalCode = `${room?.final_code}`;

  const handleQRScan = (qrData: string) => {
    // El QR debe contener una URL a la página externa de preguntas
    setShowScanner(false);

    toast.success("QR escaneado", {
      description: "Redirigiendo a la pregunta...",
      duration: 2000,
    });

    // Redirigir a la URL del QR después de un breve delay
    setTimeout(() => {
      window.location.href = qrData;
    }, 1500);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
    setCurrentHintId(null);
  };

  const handleRevealFinalCode = () => {
    if (completedCount === totalHints) {
      setShowFinalCode(true);
      const pointsEarned = roomId * 50 + 50;

      toast.success("¡Reto completado!", {
        description: `Has ganado ${pointsEarned} puntos`,
        duration: 4000,
      });
    }
  };

  if (roomStore.isLoading || !room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <Spinner className="size-8 text-purple-600" />
        <p className="text-purple-600">Cargando sala...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-blue-50">
      <Header />
      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 py-8">
        {/* Room Title - Centered and styled like the image */}
        <div className="text-center mb-8">
          <p className="text-purple-600 uppercase tracking-wide mb-1">{roomTitle}</p>
          <h1 className="text-purple-700 uppercase tracking-wide">{roomDescription}</h1>
        </div>

        {/* Main Card */}
        <Card className="border-purple-200 shadow-lg bg-white mb-6">
          <CardContent className="pt-6 pb-6 px-4">
            <HintsList setShowScanner={setShowScanner} setCurrentHintId={setCurrentHintId} />

            {/* Progress Section */}
            <div className="border-t border-purple-100 pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-purple-700 text-sm">Progreso:</span>
                <span className="text-purple-900 text-sm">
                  {completedCount} / {totalHints} pistas completadas
                </span>
              </div>

              <div className="w-full bg-purple-100 rounded-full h-2 overflow-hidden mb-4">
                <div
                  className="bg-gradient-to-r from-purple-600 to-violet-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(completedCount / totalHints) * 100}%` }}
                ></div>
              </div>

              {/* Botón morado para revelar código final */}
              {!showFinalCode && (
                <Button
                  onClick={handleRevealFinalCode}
                  disabled={completedCount !== totalHints}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {completedCount === totalHints
                    ? "Ver código final"
                    : `Completa las ${totalHints - completedCount} pistas restantes`}
                </Button>
              )}

              {/* Código final revelado */}
              {showFinalCode && (
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-300 rounded-xl p-6 text-center">
                  <p className="text-purple-700 mb-3">¡Código final del reto!</p>
                  <p className="text-purple-900 tracking-widest bg-white py-3 px-4 rounded-lg border-2 border-purple-300 inline-block">
                    {finalCode}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* QR Scanner Modal */}
      {showScanner && currentHintId && (
        <QRScanner hintNumber={currentHintId} roomId={roomId} onScan={handleQRScan} onClose={handleCloseScanner} />
      )}
    </div>
  );
}
