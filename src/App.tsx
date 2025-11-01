import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import { ForgotPassword } from "./pages/ForgotPasswordPage";
import { MuseumHome } from "./pages/MuseumHome";
import { UserProfile } from "./pages/UserProfilePage";
import RoomView from "./pages/RoomView";
import SurveySubmit from "./pages/SurveySubmit";

function App() {
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
