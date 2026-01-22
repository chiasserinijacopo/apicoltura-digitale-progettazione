import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState("");
  const [mostra, setMostra] = useState(false);
  const [errore, setErrore] = useState("");

  const placeholder = useMemo(() => "RIGON-ARNIA-1-9F2A", []);

  function onLogin() {
    const v = (apiKey || "").trim();

    if (!v) return setErrore("Inserisci una API key.");
    if (!v.startsWith("RIGON-ARNIA-")) return setErrore("API key non valida.");

    setErrore("");
    navigate("/dashboard");
  }

  return (
    <div className="page page-center">
      <div className="phone">
        <div className="loginBrand">
          <div className="brandTop">
            <div className="logoDot" aria-hidden="true" />
            <div className="brandText">APICOLTURA DIGITALE</div>
          </div>
          <div className="brandSub">Accesso</div>
        </div>

        <div className="cardX">
          <div className="cardTitle">API Key</div>

          <div className="inputRow">
            <input
              className="inputX"
              type={mostra ? "text" : "password"}
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setErrore("");
              }}
              placeholder={placeholder}
              autoComplete="off"
            />

            <button
              className="iconX"
              type="button"
              aria-label="Mostra / Nascondi"
              onClick={() => setMostra((s) => !s)}
              title="Mostra/Nascondi"
            >
              👁
            </button>
          </div>

          <button className="btnPrimary" type="button" onClick={onLogin}>
            LOGIN
          </button>

          <div className={"statusX" + (errore ? " show err" : "")}>{errore}</div>

          <div className="hintX">
            Esempio: <code>{placeholder}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
