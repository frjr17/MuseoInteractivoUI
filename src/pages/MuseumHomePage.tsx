import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Award } from "lucide-react";
import { useUserStore } from "@/store/user";
import { useRoomStore } from "@/store/room";
import Header from "@/components/Header";
import MuseumRooms from "@/components/MuseumRooms";

export default function MuseumHomePage() {
  const userStore = useUserStore();
  const roomStore = useRoomStore();

  const completedRooms = roomStore.rooms.filter((room) => room.completed).length;
  const totalChallenges = roomStore.rooms.length;

  useEffect(() => {
    roomStore.getRooms();
  }, []);

  const getInitials = () => {
    return `${userStore.name.charAt(0)}${userStore.lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-blue-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Card className="border-purple-100 shadow-lg bg-white">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-purple-200">
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-violet-700 text-white text-xl">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-purple-900 mb-1">
                    ¡Bienvenido, {userStore.name} {userStore.lastName}!
                  </h2>
                  <p className="text-purple-600">Continúa explorando las maravillas del museo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-600 to-violet-700 overflow-hidden">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Puntos Acumulados */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm mb-0.5">Puntos Acumulados</p>
                    <p className="text-white text-3xl">{userStore.totalPoints}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progreso en el Museo Card */}
          <Card className="border-purple-100 shadow-lg bg-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Award className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-purple-800">Progreso en el Museo</h3>
                  <p className="text-purple-600 text-sm">Tu avance en los retos</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-purple-600 text-sm">Retos Completados</span>
                  <Badge className="bg-purple-600 text-white hover:bg-purple-700 flex-shrink-0">
                    {completedRooms}/{totalChallenges}
                  </Badge>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${(completedRooms / totalChallenges) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Challenges Section */}
        <MuseumRooms />
      </main>
    </div>
  );
}
