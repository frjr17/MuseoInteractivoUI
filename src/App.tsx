import { Route, Routes, useNavigate } from "react-router";
import LoginPage from "./pages/LoginPage";
import { ForgotPassword } from "./pages/ForgotPasswordPage";
import { MuseumHome } from "./pages/MuseumHome";
import { useEffect } from "react";
import { useUserStore } from "./store/user";
import { AxiosError } from "axios";

function App() {
  const userStore = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const isUser = await userStore.getUser();
        if (!isUser) {
          navigate("/sign");
        }
      } catch (e) {
        const error = e as AxiosError;
        if(error.response && error.response.status === 401) {
          navigate("/sign");
        }
      }
    }
    fetchUser();
  }, [userStore.id]);

  return (
    <Routes>
      <Route path="/" element={<MuseumHome />} />
      <Route path="/sign" element={<LoginPage />} />
      <Route path="/forgot-password/*" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
