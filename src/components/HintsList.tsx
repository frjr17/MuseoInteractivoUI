import { cn, getRoomHintId } from "@/lib/utils";
import { useRoomStore, type Hint } from "@/store/room";
import { ArrowRight, Lock } from "lucide-react";
import { useParams } from "react-router";

interface HintsListProps {
  setShowScanner: (show: boolean) => void;
  setCurrentHintId: (id: number | null) => void;
}

export default function HintsList(props: HintsListProps) {
  const roomStore = useRoomStore();
  const { id } = useParams();
  const { room } = roomStore;
  const roomId = Number(id);
  const roomDescription = "Reto de la Sala " + roomId;

  const handleHintClick = (hintId: number) => {
    const hint = room?.hints.find((h) => h.id === hintId) as Hint;
    if (!hint.completed) {
      props.setCurrentHintId(hintId);
      props.setShowScanner(true);
    }
  };

  return (
    <div className="space-y-3 mb-6">
      {room?.hints.map((hint, idx) => (
        <div
          key={hint.id}
          className={cn(
            "relative bg-white border-l-4 border-purple-600 rounded-lg shadow-sm overflow-hidden",
            hint.completed ? "border-green-600" : "border-purple-600"
          )}
        >
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 flex-shrink-0"></span>
                {getRoomHintId(roomId, hint.id) === 1 || room?.hints[idx - 1]?.completed ? (
                  <button
                    onClick={() => handleHintClick(hint.id)}
                    className="text-purple-600 hover:text-purple-800 transition-colors text-left flex items-center gap-2"
                  >
                    {hint.title}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : hint.completed ? (
                  <span className="text-purple-600 flex items-center gap-2">
                    {hint.title}
                  </span>
                ) : (
                  <span className="text-gray-300 flex items-center gap-2">{hint.title}</span>
                )}
              </div>
            </div>

            {hint.completed && (
              <div className="mt-4 pl-5">
                <div className="w-full max-w-[180px] aspect-[1/1] rounded-lg overflow-hidden border-2 border-purple-100 shadow-sm">
                  <img
                    src={hint.imageUrl}
                    alt={`${hint.title} - ${roomDescription}`}
                    className="w-full h-full object-cover "
                  />
                </div>
              </div>
            )}
            <div className="ml-4">
              <Lock className={`w-4 h-4 ${hint.completed ? "text-gray-300" : "text-purple-300"}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
