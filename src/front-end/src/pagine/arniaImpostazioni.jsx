import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Stepper({ value, onChange, min = 0, max = 100, unit = "" }) {
  return (
    <div className="stepper">
      <button className="stepBtn" type="button" onClick={() => onChange(Math.max(min, value - 1))}>–</button>
      <div className="stepValue">{value}{unit}</div>
      <button className="stepBtn" type="button" onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}

export default function ArniaImpostazioni() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [tMin, setTMin] = useState(18);
  const [tMax, setTMax] = useState(25);
  const [bat, setBat] = useState(20);
  const [pesoMax, setPesoMax] = useState(50);
  const [notifiche, setNotifiche] = useState(true);

  return (
    <div className="page">
      <div className="phone">
        <header className="topHeader">
          <div className="topTitle">
            <span className="topA">ARNIA</span> <span className="topB">[IMPOSTAZIONI]</span>
          </div>
          <button className="topGear" type="button" onClick={() => navigate("/impostazioni")} aria-label="Impostazioni App">⚙</button>
        </header>

        <section className="settingsStack">
          <div className="panel">
            <div className="panelHead">SOGLIA TEMPERATURA</div>
            <div className="panelBody">
              <div className="twoCols">
                <div className="miniBlock">
                  <div className="miniLabel">MIN</div>
                  <Stepper value={tMin} onChange={setTMin} min={0} max={tMax - 1} unit="°C" />
                </div>
                <div className="miniBlock">
                  <div className="miniLabel">MAX</div>
                  <Stepper value={tMax} onChange={setTMax} min={tMin + 1} max={60} unit="°C" />
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panelHead">BATTERIA</div>
            <div className="panelBody">
              <div className="miniLabel">SOGLIA CRITICA</div>
              <Stepper value={bat} onChange={setBat} min={0} max={100} unit="%" />
            </div>
          </div>

          <div className="panel">
            <div className="panelHead">PESO MASSIMO</div>
            <div className="panelBody">
              <div className="miniLabel">Valore soglia avviso</div>
              <Stepper value={pesoMax} onChange={setPesoMax} min={0} max={200} unit=" Kg" />
            </div>
          </div>

          <div className="panel">
            <div className="panelHead">NOTIFICHE</div>
            <div className="panelBody">
              <div className="toggleRow">
                <div className="miniLabel">STATO AVVISI</div>
                <div className="toggleWrap">
                  <button className={"toggleBtn" + (notifiche ? " on" : "")} type="button" onClick={() => setNotifiche(true)}>ON</button>
                  <button className={"toggleBtn" + (!notifiche ? " on" : "")} type="button" onClick={() => setNotifiche(false)}>OFF</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <nav className="bottomNav">
          <button className="navBtn" type="button" onClick={() => navigate("/dashboard")}>HOME</button>
          <button className="navBtn active" type="button" onClick={() => navigate(`/arnia/${id}/impostazioni`)}>IMPOSTAZIONI</button>
        </nav>
      </div>
    </div>
  );
}
