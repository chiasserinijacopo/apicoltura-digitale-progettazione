export default function DashboardUI({ onLogout, onApriImpostazioni, onApriArnia }) {
  const arnie = [
    { id: 1, stato: "OK", dot: "ok", salute: "Buono", criticita: "Nessuna" },
    { id: 2, stato: "Attenzione", dot: "warn", salute: "Da controllare", criticita: "Media" },
    { id: 3, stato: "Critica", dot: "crit", salute: "Allarme", criticita: "Alta" },
  ];

  return (
    <div className="page">
      <div className="phone">
        <header className="topHeader">
          <div className="topTitle">
            <span className="topA">ARNIA</span>{" "}
            <span className="topB">[Dashboard]</span>
          </div>

          <button
            className="topGear"
            type="button"
            onClick={() => onApriImpostazioni?.()}
            aria-label="Impostazioni App"
          >
            ⚙
          </button>
        </header>

        <div className="dashMain">
          <div className="dashHint">Seleziona un’arnia per aprire la scheda</div>

          <div className="dashList">
            {arnie.map((a) => (
              <button
                key={a.id}
                type="button"
                className="dashCard"
                onClick={() => onApriArnia?.(a.id)}
              >
                <div className="dashCardTop">
                  <div className="dashName">Arnia {a.id}</div>
                  <div className="dashPill">
                    <span className={`dot ${a.dot}`} />
                    {a.stato}
                  </div>
                </div>

                <div className="dashRow">
                  <span className="muted">Salute</span>
                  <span>{a.salute}</span>
                </div>
                <div className="dashRow">
                  <span className="muted">Criticità</span>
                  <span>{a.criticita}</span>
                </div>

                <div className="dashGo">Apri →</div>
              </button>
            ))}
          </div>

          <button className="logoutBtn" type="button" onClick={() => onLogout?.()}>
            Esci
          </button>
        </div>
      </div>
    </div>
  );
}
