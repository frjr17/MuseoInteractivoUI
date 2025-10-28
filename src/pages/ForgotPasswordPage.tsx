import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp";
import { Mail, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuthStore, type authFormKeys } from "@/store/auth";


export function ForgotPassword() {
  const authStore = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    authStore.setFormField(name as authFormKeys, value);
  }

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

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (authStore.password !== authStore.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Resetting password");
    // Aquí iría la lógica para cambiar la contraseña
  };

  const handleReturnToLogin = () => {
    // Lógica para redirigir a la página de inicio de sesión
    console.log("Returning to login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-violet-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-purple-900 mb-2">¡Bienvenido al museo interactivo!</h1>
          <p className="text-purple-700">Recupera tu contraseña</p>
        </div>

         
          <Card className="border-purple-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-900">Recuperar Contraseña</CardTitle>
              <CardDescription className="text-purple-600">
                Ingresa tu correo electrónico para recibir un código de verificación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendCode}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-purple-900">Correo Electrónico</Label>
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

                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
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


       
          <Card className="border-purple-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-purple-900">Nueva Contraseña</CardTitle>
              <CardDescription className="text-purple-600">
                Crea una nueva contraseña segura para tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleResetPassword}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-purple-900">Nueva Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                        name="password" 
                        value={authStore.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-purple-900">Confirmar Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                        value={authStore.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                    Continuar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>


     
     
          <Card className="border-purple-100 shadow-lg">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-purple-900 text-center">¡Contraseña Actualizada!</CardTitle>
              <CardDescription className="text-purple-600 text-center">
                Tu contraseña ha sido cambiada exitosamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleReturnToLogin}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
              >
                Volver al Inicio de Sesión
              </Button>
            </CardContent>
          </Card>

      </div>
    </div>
  );
}
