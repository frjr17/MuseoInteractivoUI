import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore, type authFormKeys } from "@/store/auth";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router";

export default function ResetPasswordRequest() {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending code to:", authStore.email);
    // Aquí iría la lógica para enviar el código
   navigate("/forgot-password/verify");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    authStore.setFormField(name as authFormKeys, value);
  }

  const handleReturnToLogin = () => {
    // Lógica para redirigir a la página de inicio de sesión
    console.log("Returning to login");
    navigate("/sign");
  };
  return (
    <Card className="border-purple-100 shadow-lg">
      <CardHeader>
        <CardTitle  className="text-purple-900">Recuperar Contraseña</CardTitle>
        <CardDescription className="text-purple-600">
          Ingresa tu correo electrónico para recibir un código de verificación
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSendCode}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-900">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  name="email"
                  value={authStore.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              Enviar Código
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full text-purple-600 hover:text-purple-800 hover:bg-purple-50"
              onClick={handleReturnToLogin}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio de sesión
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
