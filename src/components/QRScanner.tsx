import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X, QrCode, Camera, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface QRScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
  clueNumber: number;
  challengeId: number;
}

export function QRScanner({ onScan, onClose, clueNumber, challengeId }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannerError, setScannerError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  // Códigos válidos por sala y pista
  const validCodes: Record<number, Record<number, string>> = {
    1: {
      1: "CANAL001",
      2: "CANAL002",
      3: "CANAL003",
      4: "CANAL004",
      5: "CANAL005"
    },
    2: {
      1: "FOLK001",
      2: "FOLK002",
      3: "FOLK003",
      4: "FOLK004",
      5: "FOLK005"
    },
    3: {
      1: "WILD001",
      2: "WILD002",
      3: "WILD003",
      4: "WILD004",
      5: "WILD005"
    },
    4: {
      1: "FOOD001",
      2: "FOOD002",
      3: "FOOD003",
      4: "FOOD004",
      5: "FOOD005"
    },
    5: {
      1: "ARCH001",
      2: "ARCH002",
      3: "ARCH003",
      4: "ARCH004",
      5: "ARCH005"
    }
  };

  useEffect(() => {
    // Limpiar escáner al desmontar
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          // QR escaneado exitosamente - validar código
          validateAndRedirect(decodedText);
          stopScanner();
        },
        () => {
          // Error de escaneo (ignorar - son errores continuos mientras escanea)
        }
      );

      setIsScanning(true);
      setScannerError(null);
      setShowScanner(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error al iniciar el escáner:", err);
      
      // Manejar diferentes tipos de errores
      if (err.name === 'NotAllowedError' || err.message?.includes('Permission denied')) {
        setScannerError("Error al acceder a la cámara. Usa la opción manual.");
        toast.error("Permiso denegado", {
          description: "Tip: Asegúrate de permitir acceso a la cámara cuando el navegador lo solicite."
        });
      } else if (err.name === 'NotFoundError') {
        setScannerError("No se encontró ninguna cámara en tu dispositivo.");
        toast.error("Cámara no disponible");
      } else if (err.name === 'NotReadableError') {
        setScannerError("La cámara está siendo usada por otra aplicación.");
        toast.error("Cámara en uso");
      } else {
        setScannerError("Error al acceder a la cámara. Usa la opción manual.");
        toast.error("Error de cámara");
      }
      
      setShowScanner(false);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current && isScanning) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current?.clear();
          setIsScanning(false);
        })
        .catch((err) => {
          console.error("Error al detener el escáner:", err);
        });
    }
  };

  const handleClose = () => {
    stopScanner();
    onClose();
  };

  const validateAndRedirect = (code: string) => {
    // Verificar si el código es válido para esta sala y pista
    const expectedCode = validCodes[challengeId]?.[clueNumber];
    
    if (code.toUpperCase() === expectedCode) {
      // Código correcto - crear URL de pregunta externa
      const questionUrl = `${window.location.origin}?challenge=${challengeId}&clue=${clueNumber}`;
      onScan(questionUrl);
      toast.success("Código correcto", {
        description: "Redirigiendo a la pregunta..."
      });
    } else {
      toast.error("Código incorrecto", {
        description: "Intenta de nuevo con el código correcto"
      });
    }
  };

  const handleManualSubmit = () => {
    if (!manualCode.trim()) {
      toast.error("Ingresa un código válido");
      return;
    }

    validateAndRedirect(manualCode.trim());
  };

  const handleActivateScanner = () => {
    startScanner();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardContent className="pt-6 pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <QrCode className="w-6 h-6 text-purple-600" />
              <h3 className="text-purple-900">Pista #{clueNumber}</h3>
            </div>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="text-purple-600 hover:text-purple-800"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Error Message */}
          {scannerError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-800 text-sm">{scannerError}</p>
                <p className="text-red-600 text-xs mt-1">
                  Tip: Asegúrate de permitir el acceso a la cámara cuando el navegador lo solicite.
                </p>
              </div>
            </div>
          )}

          {/* Botón para activar escáner QR */}
          <div className="mb-6">
            <Button
              onClick={handleActivateScanner}
              disabled={isScanning}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white disabled:opacity-50"
            >
              <Camera className="w-5 h-5 mr-2" />
              {isScanning ? "Escáner activo..." : "Activar escáner QR"}
            </Button>
          </div>

          {/* Contenedor del escáner (solo visible cuando está activo) */}
          {showScanner && isScanning && (
            <div className="mb-6">
              <div
                id="qr-reader"
                className="w-full rounded-lg overflow-hidden border-2 border-purple-200"
              ></div>
              <p className="text-sm text-purple-600 text-center mt-3">
                Apunta la cámara al código QR
              </p>
            </div>
          )}

          {/* Separador */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-purple-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-purple-600">o ingresa el código manualmente</span>
            </div>
          </div>

          {/* Campo de texto para código manual */}
          <div className="mb-4">
            <Label htmlFor="manual-code" className="text-purple-700 mb-2 block">
              Código de pista:
            </Label>
            <Input
              id="manual-code"
              type="text"
              placeholder="Ej: CANAL001"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value.toUpperCase())}
              className="border-purple-200 focus:border-purple-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleManualSubmit();
                }
              }}
            />
          </div>

          {/* Botón Entrar */}
          <Button
            onClick={handleManualSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white mb-3"
          >
            Entrar
          </Button>

          {/* Botón Cancelar */}
          <Button
            onClick={handleClose}
            variant="ghost"
            className="w-full text-purple-600 hover:bg-purple-50"
          >
            Cancelar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
