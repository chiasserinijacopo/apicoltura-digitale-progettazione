import "./app.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pagine/login.jsx";
import DashboardPrincipale from "./pagine/dashboard.jsx";

import ArniaDashboard from "./pagine/arniaDashboard.jsx";
import ArniaImpostazioni from "./pagine/arniaImpostazioni.jsx";
import ImpostazioniApp from "./pagine/impostazioniApp.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPrincipale />} />

      <Route path="/arnia/:id" element={<ArniaDashboard />} />
      <Route path="/arnia/:id/impostazioni" element={<ArniaImpostazioni />} />

      <Route path="/impostazioni" element={<ImpostazioniApp />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
