import { useAuthStore, type authFormKeys } from "@/store/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Lock } from "lucide-react";
import { Button } from "./ui/button";

export default function ResetPassword() {
  const authStore = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    authStore.setFormField(name as authFormKeys, value);
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

  return (
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
              <Label htmlFor="new-password" className="text-purple-900">
                Nueva Contraseña
              </Label>
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
              <Label htmlFor="confirm-password" className="text-purple-900">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  name="confirmPassword"
                  value={authStore.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              Continuar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
