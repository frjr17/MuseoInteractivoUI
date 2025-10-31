import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import { ForgotPassword } from "./pages/ForgotPasswordPage";
import { MuseumHome } from "./pages/MuseumHome";
import { UserProfile } from "./pages/UserProfilePage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MuseumHome />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/sign" element={<LoginPage />} />
      <Route path="/forgot-password/*" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
