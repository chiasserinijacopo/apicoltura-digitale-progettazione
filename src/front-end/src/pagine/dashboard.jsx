import { useNavigate } from "react-router-dom";
import DashboardUI from "../components/dashboard/DashboardUI.jsx";

export default function DashboardPrincipale() {
  const navigate = useNavigate();

  return (
    <DashboardUI
      onApriArnia={(id) => navigate(`/arnia/${id}`)}
      onApriImpostazioni={() => navigate("/impostazioni")}
      onLogout={() => navigate("/login")}
    />
  );
}
