import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/store/auth";


export default function VerifyEmail() {
  const authStore = useAuthStore();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending code to:", authStore.email);
    // Aquí iría la lógica para enviar el código
  };
  const handleValidateCode = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Validating code:", authStore.resetCode);
    // Aquí iría la lógica para validar el código
  };

  
  return (
     <Card className="border-purple-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-900">Verificar Código</CardTitle>
              <CardDescription className="text-purple-600">
                Ingresa el código de 6 dígitos enviado a {authStore.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleValidateCode}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code" className="text-purple-900">Código de Verificación</Label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={authStore.resetCode}
                        onChange={(value) => authStore.setFormField("resetCode", value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="border-purple-200 focus:border-purple-400" />
                          <InputOTPSlot index={1} className="border-purple-200 focus:border-purple-400" />
                          <InputOTPSlot index={2} className="border-purple-200 focus:border-purple-400" />
                          <InputOTPSlot index={3} className="border-purple-200 focus:border-purple-400" />
                          <InputOTPSlot index={4} className="border-purple-200 focus:border-purple-400" />
                          <InputOTPSlot index={5} className="border-purple-200 focus:border-purple-400" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                    disabled={authStore.resetCode.length !== 6}
                  >
                    Validar Código
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                    // onClick={() => setStep("email")}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver atrás
                  </Button>

                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm text-purple-600 hover:text-purple-800"
                      onClick={handleSendCode}
                    >
                      ¿No recibiste el código? Reenviar
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
  )
}