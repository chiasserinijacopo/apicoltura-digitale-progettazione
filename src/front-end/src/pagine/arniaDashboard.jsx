import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MiniChart from "../components/ui/MiniChart.jsx";

export default function ArniaDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tab, setTab] = useState("settimana");

  const data = useMemo(() => {
    if (tab === "oggi") {
      return { peso: [18, 22, 21, 24, 23, 26], temp: [30, 33, 32, 34, 33, 35], um: [45, 55, 52, 58, 54, 60] };
    }
    if (tab === "mese") {
      return { peso: [12, 16, 15, 20, 19, 24], temp: [26, 29, 28, 31, 30, 33], um: [40, 48, 46, 55, 52, 62] };
    }
    return { peso: [14, 20, 18, 22, 19, 27], temp: [28, 34, 31, 35, 33, 36], um: [35, 52, 46, 50, 48, 58] };
  }, [tab]);

  return (
    <div className="page">
      <div className="phone">
        <header className="topHeader">
          <div className="topTitle">
            <span className="topA">ARNIA</span>{" "}
            <span className="topB">[Location]</span>{" "}
            <span className="topA">DASHBOARD</span>
          </div>

          <button className="topGear" type="button" onClick={() => navigate("/impostazioni")} aria-label="Impostazioni App">
            ⚙
          </button>
        </header>

        <div className="tabs">
          <button className={"tab" + (tab === "oggi" ? " active" : "")} onClick={() => setTab("oggi")}>OGGI</button>
          <button className={"tab" + (tab === "settimana" ? " active" : "")} onClick={() => setTab("settimana")}>SETTIMANA</button>
          <button className={"tab" + (tab === "mese" ? " active" : "")} onClick={() => setTab("mese")}>MESE</button>
        </div>

        <section className="gridDash">
          <div className="panel">
            <div className="panelHead">Peso (Kg)</div>
            <div className="panelBody">
              <MiniChart points={data.peso} />
              <div className="panelFoot">MAX: N.kg | MIN N.KG</div>
            </div>
          </div>

          <div className="panel">
            <div className="panelHead">Temperatura (°C)</div>
            <div className="panelBody">
              <MiniChart points={data.temp} />
              <div className="panelFoot">MAX: N.kg | MIN N.KG</div>
            </div>
          </div>

          <div className="panel panelWide">
            <div className="panelHead">Umidità (%)</div>
            <div className="panelBody">
              <MiniChart points={data.um} height={95} />
            </div>
          </div>

          <div className="panel panelWide">
            <div className="panelHead">Ultime notifiche</div>
            <div className="list">
              <div className="listRow"><span className="pill">OGGI</span><span className="listText">Allarme: temperatura massima superata</span></div>
              <div className="listRow"><span className="pill">OGGI</span><span className="listText">Avvisi: Calo di peso improvviso</span></div>
              <div className="listRow"><span className="pill">IERI</span><span className="listText">Livello batteria salito</span></div>
            </div>
          </div>
        </section>

        <nav className="bottomNav">
          <button className="navBtn active" type="button" onClick={() => navigate("/dashboard")}>
            HOME
          </button>
          <button className="navBtn" type="button" onClick={() => navigate(`/arnia/${id}/impostazioni`)}>
            IMPOSTAZIONI
          </button>
        </nav>
      </div>
    </div>
  );
}
