import { Lock } from "lucide-react";
import { Route, Routes } from "react-router";
import ResetPasswordRequest from "@/components/ResetPasswordRequest";
import VerifyEmail from "@/components/VerifyEmail";
import ResetPassword from "@/components/ResetPassword";
import PasswordResetSuccess from "@/components/PasswordResetSuccess";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";

export function ForgotPassword() {
  const authStore = useAuthStore();
  useEffect(()=>{
    return ()=>{
      authStore.reset();
    }
  },[])

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
          <p className="text-purple-700">Recupera tu contraseña</p>
        </div>
        <Routes>
          <Route index element={<ResetPasswordRequest />} />
          <Route path="verify" element={<VerifyEmail />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route path="success" element={<PasswordResetSuccess />} />
        </Routes>
      </div>
    </div>
  );
}
