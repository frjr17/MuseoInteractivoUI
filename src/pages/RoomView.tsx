import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { QRScanner } from "@/components/QRScanner";
import { Sparkles, Lock, ArrowRight, Eye } from "lucide-react";

interface ChallengeViewProps {
  challengeId: number;
  challengeTitle: string;
  roomName: string;
  onBack: () => void;
  onComplete: (points: number) => void;
}

interface ClueStatus {
  id: number;
  completed: boolean;
  unlocked: boolean;
  secretCode?: string;
}

export default function RoomView() {
  const totalClues = 5;

  const { challengeId, challengeTitle, roomName, onBack, onComplete }: ChallengeViewProps = {
    challengeId: 1,
    challengeTitle: "Reto de la Sala 1",
    roomName: "Sala de la Naturaleza",
    onBack: () => {
      window.history.back();
    },
    onComplete: (points: number) => {
      console.log(`Reto completado. Puntos ganados: ${points}`);
    },
  };

  const [cluesStatus, setCluesStatus] = useState<ClueStatus[]>(() => {
    // Intentar recuperar el estado guardado del localStorage
    const savedState = localStorage.getItem(`challenge-${challengeId}-clues`);
    if (savedState) {
      return JSON.parse(savedState);
    }
    return Array.from({ length: totalClues }, (_, i) => ({
      id: i + 1,
      completed: false,
      unlocked: i === 0,
    }));
  });

  const [showScanner, setShowScanner] = useState(false);
  const [currentClueId, setCurrentClueId] = useState<number | null>(null);
  const [showFinalCode, setShowFinalCode] = useState(false);

  const completedCount = cluesStatus.filter((c) => c.completed).length;
  const finalCode = `CODIGO-FINAL-SALA-${challengeId}`;

  // Imágenes para cada sala/reto
  const clueImages: Record<number, string[]> = {
    1: [
      "https://images.unsplash.com/photo-1645932700624-5075c8d2df58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1645932700624-5075c8d2df58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1645932700624-5075c8d2df58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1645932700624-5075c8d2df58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1645932700624-5075c8d2df58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    ],
    2: [
      "https://images.unsplash.com/photo-1760638261449-7f43db429b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1760638261449-7f43db429b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1760638261449-7f43db429b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1760638261449-7f43db429b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1760638261449-7f43db429b22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    ],
    3: [
      "https://images.unsplash.com/photo-1706859685995-6b71ca300afd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1706859685995-6b71ca300afd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1706859685995-6b71ca300afd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1706859685995-6b71ca300afd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1706859685995-6b71ca300afd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    ],
    4: [
      "https://images.unsplash.com/photo-1746632794962-8034e23cbd31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1746632794962-8034e23cbd31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1746632794962-8034e23cbd31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1746632794962-8034e23cbd31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1746632794962-8034e23cbd31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    ],
    5: [
      "https://images.unsplash.com/photo-1701773067697-73a8d4ace822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1701773067697-73a8d4ace822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1701773067697-73a8d4ace822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1701773067697-73a8d4ace822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      "https://images.unsplash.com/photo-1701773067697-73a8d4ace822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    ],
  };

  const images = clueImages[challengeId] || clueImages[1];

  // Detectar cuando el usuario regresa de la página externa
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const completedClue = urlParams.get("completedClue");
    const secretCode = urlParams.get("secretCode");
    const challenge = urlParams.get("challenge");

    if (completedClue && secretCode && challenge === String(challengeId)) {
      const clueId = parseInt(completedClue);

      // Marcar la pista como completada
      const updatedClues = cluesStatus.map((clue) => {
        if (clue.id === clueId) {
          return { ...clue, completed: true, secretCode };
        }
        if (clue.id === clueId + 1) {
          return { ...clue, unlocked: true };
        }
        return clue;
      });

      setCluesStatus(updatedClues);

      toast.success("¡Pista completada!", {
        description: `Código secreto: ${secretCode}`,
        duration: 4000,
      });

      // Limpiar los parámetros de la URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // Guardar el estado en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem(`challenge-${challengeId}-clues`, JSON.stringify(cluesStatus));
  }, [cluesStatus, challengeId]);

  const handleClueClick = (clueId: number) => {
    const clue = cluesStatus.find((c) => c.id === clueId);
    if (clue?.unlocked && !clue.completed) {
      setCurrentClueId(clueId);
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
    setCurrentClueId(null);
  };

  const handleRevealFinalCode = () => {
    if (completedCount === totalClues) {
      setShowFinalCode(true);
      const pointsEarned = challengeId * 50 + 50;

      toast.success("¡Reto completado!", {
        description: `Has ganado ${pointsEarned} puntos`,
        duration: 4000,
      });

      setTimeout(() => {
        // Limpiar el estado guardado
        localStorage.removeItem(`challenge-${challengeId}-clues`);
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
              onClick={onBack}
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
          <p className="text-purple-600 uppercase tracking-wide mb-1">{roomName}</p>
          <h1 className="text-purple-700 uppercase tracking-wide">{challengeTitle}</h1>
        </div>

        {/* Main Card */}
        <Card className="border-purple-200 shadow-lg bg-white mb-6">
          <CardContent className="pt-6 pb-6 px-4">
            {/* Clues List */}
            <div className="space-y-3 mb-6">
              {cluesStatus.map((clue) => (
                <div
                  key={clue.id}
                  className="relative bg-white border-l-4 border-purple-600 rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 flex-shrink-0"></span>
                        {clue.unlocked && !clue.completed ? (
                          <button
                            onClick={() => handleClueClick(clue.id)}
                            className="text-purple-600 hover:text-purple-800 transition-colors text-left flex items-center gap-2"
                          >
                            Pista {clue.id}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        ) : clue.completed ? (
                          <span className="text-purple-600 flex items-center gap-2">Pista {clue.id}</span>
                        ) : (
                          <span className="text-gray-300 flex items-center gap-2">Pista {clue.id}</span>
                        )}
                      </div>

                      <div className="ml-4">
                        <Lock className={`w-4 h-4 ${clue.completed ? "text-gray-300" : "text-purple-300"}`} />
                      </div>
                    </div>

                    {/* Image below each clue */}
                    {clue.unlocked && (
                      <div className="mt-4 pl-5">
                        <div className="w-full max-w-[180px] aspect-[4/3] rounded-lg overflow-hidden border-2 border-purple-100 shadow-sm">
                          <img
                            src={images[clue.id - 1]}
                            alt={`Pista ${clue.id} - ${challengeTitle}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Secret code below image */}
                        {clue.completed && clue.secretCode && (
                          <div className="mt-3 max-w-[180px] bg-purple-50 border border-purple-200 rounded-lg p-2">
                            <p className="text-xs text-purple-600 mb-1">Código:</p>
                            <p className="text-sm text-purple-800 tracking-wider text-center bg-white py-1 px-2 rounded border border-purple-200">
                              {clue.secretCode}
                            </p>
                          </div>
                        )}
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
                  {completedCount} / {totalClues} pistas completadas
                </span>
              </div>

              <div className="w-full bg-purple-100 rounded-full h-2 overflow-hidden mb-4">
                <div
                  className="bg-gradient-to-r from-purple-600 to-violet-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${(completedCount / totalClues) * 100}%` }}
                ></div>
              </div>

              {/* Botón morado para revelar código final */}
              {!showFinalCode && (
                <Button
                  onClick={handleRevealFinalCode}
                  disabled={completedCount !== totalClues}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {completedCount === totalClues
                    ? "Ver código final"
                    : `Completa las ${totalClues - completedCount} pistas restantes`}
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
      {showScanner && currentClueId && (
        <QRScanner
          clueNumber={currentClueId}
          challengeId={challengeId}
          onScan={handleQRScan}
          onClose={handleCloseScanner}
        />
      )}
    </div>
  );
}
