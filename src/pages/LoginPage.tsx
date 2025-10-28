import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { LogIn, UserPlus, Mail, Lock, User } from "lucide-react";
import { ForgotPassword } from "@/pages/ForgotPasswordPage";
import { useAuthStore, type authFormKeys } from "@/store/auth";
import type { CheckedState } from "@radix-ui/react-checkbox";

export default function LoginPage() {
  const authStore = useAuthStore();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | CheckedState
  ) => {
    let event;
    if (Object.hasOwn(e as React.ChangeEvent<HTMLInputElement>, "target")) {
      event = e as React.ChangeEvent<HTMLInputElement>;
      authStore.setFormField(
        event.target.name as authFormKeys,
        event.target.value
      );
    } else {
      event = e as CheckedState;
      authStore.setFormField("rememberMe", event as boolean);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simular login exitoso
    await authStore.login(authStore.email, authStore.password);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simular registro exitoso
    await authStore.register(
      authStore.name,
      authStore.lastName,
      authStore.email,
      authStore.password,
      authStore.confirmPassword
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-violet-50 to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-2xl mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-purple-900 mb-2">
            ¡Bienvenido al museo interactivo!
          </h1>
          <p className="text-purple-700">
            Inicia sesión en tu cuenta o crea una nueva
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="gap-2">
              <LogIn className="w-4 h-4" />
              Iniciar Sesión
            </TabsTrigger>
            <TabsTrigger value="register" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Registrarse
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-purple-900">
                  Inicia sesión en tu cuenta
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Ingresa tus credenciales para acceder a tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-purple-900">
                        Correo Electrónico
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                        <Input
                          id="login-email"
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

                    <div className="space-y-2">
                      <Label
                        htmlFor="login-password"
                        className="text-purple-900"
                      >
                        Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                        <Input
                          id="login-password"
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

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={authStore.rememberMe}
                          onCheckedChange={handleChange}
                        />
                        <label
                          htmlFor="remember"
                          className="text-sm text-purple-700 cursor-pointer"
                        >
                          Recuérdame
                        </label>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm text-purple-600 hover:text-purple-800"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        ¿Olvidaste tu contraseña?
                      </Button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                    >
                      Iniciar Sesión
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="text-purple-900">
                  Crea una cuenta
                </CardTitle>
                <CardDescription className="text-purple-600">
                  Ingresa tu información para comenzar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="register-firstname"
                          className="text-purple-900"
                        >
                          Nombre
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                          <Input
                            id="register-firstname"
                            type="text"
                            placeholder="Juan"
                            className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                            name="name"
                            value={authStore.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="register-lastname"
                          className="text-purple-900"
                        >
                          Apellido
                        </Label>
                        <Input
                          id="register-lastname"
                          type="text"
                          placeholder="Pérez"
                          className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                          name="lastName"
                          value={authStore.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="register-email"
                        className="text-purple-900"
                      >
                        Correo Electrónico
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                        <Input
                          id="register-email"
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

                    <div className="space-y-2">
                      <Label
                        htmlFor="register-password"
                        className="text-purple-900"
                      >
                        Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                        <Input
                          id="register-password"
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
                      <Label
                        htmlFor="register-confirm-password"
                        className="text-purple-900"
                      >
                        Confirmar Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                        <Input
                          id="register-confirm-password"
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
                      Crear Cuenta
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
