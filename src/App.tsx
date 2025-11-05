import { Route, Routes, useLocation, useNavigate } from "react-router";
import SignPage from "./pages/SignPage";
import ForgotPassword  from "./pages/ForgotPasswordPage";
import MuseumHome  from "./pages/MuseumHomePage";
import { UserProfile } from "./pages/UserProfilePage";
import RoomView from "./pages/RoomViewPage";
import SurveySubmit from "./pages/SurveySubmitPage";
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

      isUser = await userStore.getUser();

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
      <Route path="/sign" element={<SignPage />} />
      <Route path="/forgot-password/*" element={<ForgotPassword />} />
      <Route path="/rooms/:id" element={<RoomView />} />
    </Routes>
  );
}

export default App;
