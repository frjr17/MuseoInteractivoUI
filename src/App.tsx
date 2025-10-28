import { Route, Routes } from "react-router"
import LoginPage from "./pages/LoginPage"
import { ForgotPassword } from "./pages/ForgotPasswordPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  )
}

export default App
