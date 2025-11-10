import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useRoomStore } from "@/store/room";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function FirstRoomPage() {
  const roomStore = useRoomStore();
  const { room } = roomStore;
  const completed = room?.completed;
  const [secretCodeInput, setSecretCodeInput] = useState("");

  const handleValidateSecretCode = async () => {
    // Enviar el código correcto y desbloquear la sala
    try {
      await roomStore.verify1stRoomCode(secretCodeInput.trim().toUpperCase());
      await roomStore.getRoomById(1);
    } catch {
      // Manejar error si es necesario
    }
  };

  // Función para formatear el código con guiones automáticos
  const formatSecretCode = (value: string) => {
    // Eliminar todo lo que no sea número
    const numbers = value.replace(/\D/g, "");

    // Limitar a 16 dígitos (4 grupos de 4)
    const limitedNumbers = numbers.slice(0, 16);

    // Agregar guiones cada 4 dígitos
    const parts = [];
    for (let i = 0; i < limitedNumbers.length; i += 4) {
      parts.push(limitedNumbers.slice(i, i + 4));
    }

    return parts.join("-");
  };

  // Función para manejar el cambio en el input del código
  const handleSecretCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSecretCode(e.target.value);
    setSecretCodeInput(formatted);
  };

  useEffect(() => {
    (async () => {
      await roomStore.getRoomById(1);
    })();
  }, [completed]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-blue-50">
      <Header />
      {/* Main Content */}
      <main className="max-w-xl mx-auto px-4 py-8">
        {/* Main Card */}
        <Card className="border-purple-200 shadow-lg bg-white mb-6">
          <CardContent className="pt-6 pb-6 px-4">
            <div className="space-y-6">
              {/* Instrucciones */}
              <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-4">
                <p className="text-purple-900 mb-2">Bienvenido a la primera sala</p>
                <p className="text-purple-700 text-sm">
                  Ingresa el código secreto para desbloquear la siguiente sala y comenzar tu aventura en el museo.
                </p>
              </div>

              {/* Campo de código secreto */}
              {room?.completed ? (
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-300 rounded-xl p-6 text-center">
                  <p className="text-purple-700 mb-3">¡Código final del reto!</p>
                  <p className="text-purple-900 tracking-widest bg-white py-3 px-4 rounded-lg border-2 border-purple-300 inline-block">
                    {room.final_code}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-purple-700 text-sm mb-2 block">Código Secreto</label>
                    <Input
                      type="text"
                      value={secretCodeInput}
                      onChange={handleSecretCodeChange}
                      placeholder="Ingresa el código aquí (Ej.: 1234-5678-9012-3456)"
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 uppercase"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleValidateSecretCode();
                        }
                      }}
                    />
                  </div>

                  <Button
                    onClick={handleValidateSecretCode}
                    disabled={!secretCodeInput.trim() || roomStore.isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {roomStore.isLoading ? (
                      <>
                        <Spinner />
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Validar código
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Pista visual opcional */}
              <div className="mt-6 pt-6 border-t border-purple-100">
                <p className="text-purple-600 text-sm text-center">
                  🎯 Objetivo: Descubrir el código secreto que desbloquea el diario perdido del ingeniero jefe del Canal
                  de Panamá, el cual contiene planos ocultos de una ruta alternativa
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
