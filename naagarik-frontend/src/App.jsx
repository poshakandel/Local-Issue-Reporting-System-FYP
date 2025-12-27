import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import WardAdminDashboard from "./pages/WardAdminDashboard";
import CitizenDashboard from "./pages/CitizenDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/super-admin" element={<SuperAdminDashboard />} />
        <Route path="/ward-admin" element={<WardAdminDashboard />} />
        <Route path="/citizen" element={<CitizenDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
