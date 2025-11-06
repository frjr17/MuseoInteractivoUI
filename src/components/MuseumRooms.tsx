import { Camera, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { useRoomStore } from "@/store/room";
import { cn } from "@/lib/utils";

export default function MuseumRooms() {
  const roomStore = useRoomStore();

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-purple-700" />
        <h3 className="text-purple-700">Retos del Museo</h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roomStore.rooms.map((room) => {
          return (
            <Card key={room.id} className="border-purple-100 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100 mb-4">
                  <Camera className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-900">{room.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link to={room.isUnlocked ? `/rooms/${room.id}` : "#"}>
                  <Button
                    className={cn(
                      `w-full ${
                        room.isUnlocked
                          ? "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
                          : "bg-gray-300 hover:bg-gray-400 cursor-pointer"
                      }`,
                      room.completed ?
                        "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white":""
                    )}
                    >
                    {
                      room.isUnlocked ? room.completed ? "Sala completada" : "Empezar reto" : "Sala bloqueada"
                    }
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
