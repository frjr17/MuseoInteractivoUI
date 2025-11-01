import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { QRScanner } from "@/components/QRScanner";
import { Sparkles, Lock, ArrowRight, Eye } from "lucide-react";
import { useRoomStore, type Hint } from "@/store/room";
import { useNavigate, useParams } from "react-router";
import { cn } from "@/lib/utils";

export default function RoomView() {
  const { id } = useParams();
  const roomId = Number(id);
  const roomStore = useRoomStore();
  const navigate = useNavigate();
  const { room } = roomStore;
  const totalHints = room?.hints.length as number;
  const roomTitle = room?.name;
  const roomDescription = "Reto de la Sala " + roomId;
  
  const goBack = () => {
    navigate(-1);
  };

  const onComplete = (points: number) => {
    console.log(`Reto completado. Puntos ganados: ${points}`);
  };

  useEffect(() => {
    roomStore.getRoomById(roomId);
  }, []);

  const [showScanner, setShowScanner] = useState(false);
  const [currentHintId, setCurrentHintId] = useState<number | null>(null);
  const [showFinalCode, setShowFinalCode] = useState(false);

  const completedCount = room?.hints.filter((c) => c.completed).length as number;
  const finalCode = `CODIGO-FINAL-SALA-${roomId}`;

  const handleHintClick = (hintId: number) => {
    const hint = room?.hints.find((h) => h.id === hintId) as Hint;
    if (!hint.completed) {
      setCurrentHintId(hintId);
      setShowScanner(true);
    }
  };

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

      setTimeout(() => {
        // Limpiar el estado guardado
        localStorage.removeItem(`challenge-${roomId}-clues`);
        onComplete(pointsEarned);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h2 className="text-purple-900">Museo</h2>
                <h2 className="text-purple-900">Interactivo</h2>
                <p className="text-purple-600 text-sm mt-0.5">Explora y aprende</p>
              </div>
            </div>

            <Button
              onClick={goBack}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
            >
              Volver al Museo
            </Button>
          </div>
        </div>
      </header>

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
            {/* Clues List */}
            <div className="space-y-3 mb-6">
              {room?.hints.map((hint, idx) => (
                <div
                  key={hint.id}
                  className={cn("relative bg-white border-l-4 border-purple-600 rounded-lg shadow-sm overflow-hidden", hint.completed ? "border-green-600" : "border-purple-600")}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 flex-shrink-0"></span>
                        {hint.id === 1 || room.hints[idx - 1].completed ? (
                          <button
                            onClick={() => handleHintClick(hint.id)}
                            className="text-purple-600 hover:text-purple-800 transition-colors text-left flex items-center gap-2"
                          >
                            Pista {hint.id}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : hint.completed ? (
                          <span className="text-purple-600 flex items-center gap-2">Pista {hint.id}</span>
                        ) : (
                          <span className="text-gray-300 flex items-center gap-2">Pista {hint.id}</span>
                        )}
                      </div>

                      <div className="ml-4">
                        <Lock className={`w-4 h-4 ${hint.completed ? "text-gray-300" : "text-purple-300"}`} />
                      </div>
                    </div>

                    {/* Image below each clue */}
                    {hint.completed && (
                      <div className="mt-4 pl-5">
                        <div className="w-full max-w-[180px] aspect-[4/3] rounded-lg overflow-hidden border-2 border-purple-100 shadow-sm">
                          <img
                            src={hint.imageUrl}
                            alt={`Pista ${hint.id} - ${roomDescription}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

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
