import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Mail, User } from "lucide-react";
import { useUserStore } from "@/store/user";
import { useNavigate } from "react-router";

export function UserProfile() {
  const userStore = useUserStore();
  const navigate = useNavigate();

  const getInitials = () => {
    return `${userStore.name.charAt(0)}${userStore.lastName.charAt(
      0
    )}`.toUpperCase();
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
              onClick={goBack}
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-purple-700">Mi Perfil</h1>
              <p className="text-purple-600">Información personal y progreso</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Información Personal Card */}
        <Card className="border-purple-100 shadow-md bg-white">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-purple-800">Información Personal</h2>
              <p className="text-purple-600">
                Tus datos registrados en el museo
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-0 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-violet-700 text-white text-xl sm:text-2xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-5 sm:space-y-6 w-full">
                <div className="flex items-start gap-3 sm:gap-4">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-purple-600">Nombre completo</p>
                    <p className="text-purple-800 break-words">{userStore.name}</p>
                    <p className="text-purple-800 break-words">
                      {userStore.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-purple-600">Correo electrónico</p>
                    <p className="text-purple-800 break-words">{userStore.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
