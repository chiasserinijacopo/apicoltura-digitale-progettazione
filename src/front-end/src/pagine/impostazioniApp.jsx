import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ImpostazioniApp() {
  const navigate = useNavigate();
  const [notifiche, setNotifiche] = useState(true);

  return (
    <div className="page">
      <div className="phone">
        <header className="appHeader">
          <button className="backBtn" type="button" onClick={() => navigate(-1)} aria-label="Indietro">←</button>
          <div className="appTitle">Impostazioni</div>
        </header>

        <section className="appSettings">
          <div className="sectionLabel">GESTIONE ACCOUNT</div>
          <div className="cardX">
            <button className="rowBtn" type="button" onClick={() => alert("Mockup: Profilo utente")}>
              <span>Profilo Utente</span>
              <span className="chev">›</span>
            </button>
          </div>

          <div className="sectionLabel">PREFERENZE DI SISTEMA</div>
          <div className="cardX">
            <div className="rowSplit"><span>Temperatura</span><span className="chip">&lt; C &gt;</span></div>
            <div className="rowSplit"><span>Peso</span><span className="chip">&lt; g &gt;</span></div>
            <div className="rowSplit"><span>Lingua</span><span className="chip">ITA</span></div>
          </div>

          <div className="sectionLabel">SISTEMI E INFORMAZIONI</div>
          <div className="cardX">
            <div className="rowSplit">
              <span>Notifiche</span>
              <button
                className={"switch" + (notifiche ? " on" : "")}
                type="button"
                onClick={() => setNotifiche((s) => !s)}
                aria-label="Toggle notifiche"
              >
                <span className="knob" />
              </button>
            </div>
            <div className="rowSplit"><span>Versione Software</span><span className="mutedSmall">v. 1.0.2</span></div>
          </div>

          <button className="btnDisconnect" type="button" onClick={() => navigate("/login")}>
            DISCONNETTI
          </button>
        </section>
      </div>
    </div>
  );
}
