import { Route, Routes, useLocation, useNavigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import { ForgotPassword } from "./pages/ForgotPasswordPage";
import { MuseumHome } from "./pages/MuseumHome";
import { UserProfile } from "./pages/UserProfilePage";
import RoomView from "./pages/RoomView";
import SurveySubmit from "./pages/SurveySubmit";
import { useEffect } from "react";
import { useUserStore } from "./store/user";
import { useAuthStore } from "./store/auth";

function App() {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      let isUser = false;

      try {
        isUser = await userStore.getUser();
      } catch {
        /* empty */
      }

      const isSignPages = location.pathname.startsWith("/sign") || location.pathname.startsWith("/forgot-password");
      if (!isUser && !isSignPages) {
        authStore.reset();
        navigate("/sign");
      }
    })();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MuseumHome />} />
      <Route path="/survey" element={<SurveySubmit />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/sign" element={<LoginPage />} />
      <Route path="/forgot-password/*" element={<ForgotPassword />} />
      <Route path="/rooms/:id" element={<RoomView />} />
    </Routes>
  );
}

export default App;
