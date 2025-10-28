import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  User, 
  LogOut, 
  Trophy, 
  Camera,
  Sparkles,
  Star,
  Award
} from "lucide-react";
import { useUserStore } from "@/store/user";
import { useAuthStore } from "@/store/auth";



interface Challenge {
  id: number;
  title: string;
  room: string;
  progress: number;
  total: number;
  completed: boolean;
  points: number;
}

export function MuseumHome() {
    const userStore = useUserStore();
    const authStore = useAuthStore();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    setChallenges(
        [
    {
      id: 1,
      title: "El Secreto del Canal",
      room: "Sala 1",
      progress: 3,
      total: 5,
      completed: false,
      points: 100,
    },
    {
      id: 2,
      title: "Leyendas panameñas",
      room: "Sala 2",
      progress: 0,
      total: 10,
      completed: false,
      points: 150,
    },
    {
      id: 3,
      title: "El tesoro verde de Panamá",
      room: "Sala 3",
      progress: 7,
      total: 15,
      completed: false,
      points: 200,
    },
    {
      id: 4,
      title: "Sabores y colores de Panamá",
      room: "Sala 4",
      progress: 3,
      total: 5,
      completed: false,
      points: 120,
    },
    {
      id: 5,
      title: "Las llaves de la ciudad",
      room: "Sala 5",
      progress: 3,
      total: 5,
      completed: false,
      points: 180,
    },
  ]
    )
  }, []);

  const getInitials = () => {
    return `${userStore.name.charAt(0)}${userStore.lastName.charAt(0)}`.toUpperCase();
  };

  const totalChallenges = challenges.length;

  const isChallengeUnlocked = (challengeId: number) => {
    if (challengeId === 1) return true; // Primera sala siempre desbloqueada
    const previousChallenge = challenges.find(c => c.id === challengeId - 1);
    return previousChallenge?.completed || false;
  };

  const handleStartChallenge = (challengeId: number) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
    //   onStartChallenge(challengeId, challenge.title, challenge.room);
    }
  };

  const handleLockedChallenge = (challengeId: number) => {
    const previousChallenge = challenges.find(c => c.id === challengeId - 1);
    if (previousChallenge) {
      toast.error(`Esta sala está bloqueada`, {
        description: `Debes completar "${previousChallenge.title}" (${previousChallenge.room}) para desbloquear esta sala.`,
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-purple-900">Museo Interactivo</h2>
                <p className="text-sm text-purple-600">Explora y aprende</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="gap-2 text-purple-700 hover:bg-purple-50 hover:text-purple-900"
                onClick={()=>{}}
              >
                <User className="w-4 h-4" />
                Mi Perfil
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                onClick={authStore.logout}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
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
                  <p className="text-purple-600">
                    Continúa explorando las maravillas del museo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Puntos y Posición Card */}
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

                {/* Posición */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm mb-0.5">Posición</p>
                    <p className="text-white text-3xl">{userStore.globalPosition}</p>
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
                    {0}/{totalChallenges}
                  </Badge>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2.5">
                  <div 
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${(0 / totalChallenges) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Challenges Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-purple-700" />
            <h3 className="text-purple-700">Retos del Museo</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => {
              const isUnlocked = isChallengeUnlocked(challenge.id);
              
              return (
                <Card
                  key={challenge.id}
                  className="border-purple-100 shadow-lg bg-white"
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100 mb-4">
                      <Camera className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-purple-900">
                      {challenge.title}
                    </CardTitle>
                    <CardDescription className="text-purple-600">
                      {challenge.room}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className={`w-full ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700'
                          : 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
                      }`}
                      onClick={() => isUnlocked ? handleStartChallenge(challenge.id) : handleLockedChallenge(challenge.id)}
                    >
                      Empezar reto
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}