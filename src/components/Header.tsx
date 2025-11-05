import { LogOut, Sparkles, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/auth";

export default function Header() {
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isRoomView = location.pathname.startsWith("/rooms/");

  const logout = async () => {
    await authStore.logout();
    navigate("/sign");
  };

  const goToMuseumHome = () => {
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-purple-900">Museo Interactivo</h2>
                <p className="text-sm text-purple-600">Explora y aprende</p>
              </div>
            </div>
          </Link>
          {isRoomView ? (
            <Button
              onClick={goToMuseumHome}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
            >
              Volver al Museo
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/profile">
                <Button
                  variant="ghost"
                  className="gap-2 text-purple-700 hover:bg-purple-50 hover:text-purple-900"
                  onClick={() => {}}
                >
                  <User className="w-4 h-4" />
                  Mi Perfil
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                onClick={logout}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
