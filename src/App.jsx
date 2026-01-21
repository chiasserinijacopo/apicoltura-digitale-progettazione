import { useState } from 'react';

export default function App() {
  const [tempMinima, setTempMinima] = useState(18);
  const [tempMassima, setTempMassima] = useState(25);
  const [batteriaCritica, setBatteriaCritica] = useState(20);
  const [pesoMassimo, setPesoMassimo] = useState(50);
  const [notifichePush, setNotifichePush] = useState(true);

  return (
    <div className="min-h-screen bg-gray-700">
      <header className="bg-gray-800 text-white text-center py-5 rounded-b-3xl">
        <h1 className="text-2xl font-medium">Nome app</h1>
      </header>

      <div className="max-w-md mx-auto p-5">
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Soglia Temperatura</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-2">Minima</label>
              <div className="flex items-center gap-2 bg-orange-500 px-3 py-2 rounded-lg">
                <button 
                  onClick={() => setTempMinima(tempMinima - 1)}
                  className="text-white text-xl font-bold px-2 hover:scale-110 active:scale-95 transition-transform"
                >
                  -
                </button>
                <span className="flex-1 text-center text-white font-medium text-sm">{tempMinima}°C</span>
                <button 
                  onClick={() => setTempMinima(tempMinima + 1)}
                  className="text-white text-xl font-bold px-2 hover:scale-110 active:scale-95 transition-transform"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-2">Massima</label>
              <div className="flex items-center gap-2 bg-orange-500 px-3 py-2 rounded-lg">
                <button 
                  onClick={() => setTempMassima(tempMassima - 1)}
                  className="text-white text-xl font-bold px-2 hover:scale-110 active:scale-95 transition-transform"
                >
                  -
                </button>
                <span className="flex-1 text-center text-white font-medium text-sm">{tempMassima}°C</span>
                <button 
                  onClick={() => setTempMassima(tempMassima + 1)}
                  className="text-white text-xl font-bold px-2 hover:scale-110 active:scale-95 transition-transform"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Soglia critica Batteria</h2>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Batteria critica</label>
            <div className="flex items-center gap-2 bg-orange-500 px-3 py-2 rounded-lg">
              <button 
                onClick={() => setBatteriaCritica(batteriaCritica - 1)}
                className="text-white text-xl font-bold px-2 hover:scale-110 active:scale-95 transition-transform"
              >
                -
              </button>
              <span className="flex-1 text-center text-white font-medium text-sm">{batteriaCritica}%</span>
              <button 
                onClick={() => setBatteriaCritica(batteriaCritica + 1)}
                className="text-white text-xl font-bold px-2 hover:scale-110 active:scale-95 transition-transform"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-1 text-gray-800">Variazioni peso massimo</h2>
          <p className="text-xs text-gray-400 mb-3">Valore assoluto</p>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Peso massimo</label>
            <div className="flex items-center gap-2 bg-orange-500 px-3 py-2 rounded-lg">
              <button 
                onClick={() => setPesoMassimo(pesoMassimo - 1)}
                className="text-white text-xl font-bold px-2 hover:scale-110 active:scale-95 transition-transform"
              >
                -
              </button>
              <span className="flex-1 text-center text-white font-medium text-sm">{pesoMassimo} Kg</span>
              <button 
                onClick={() => setPesoMassimo(pesoMassimo + 1)}
                className="text-white text-xl font-bold px-2 hover:scale-110 active:scale-95 transition-transform"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 mb-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Avvisi push</h2>
          <div className="flex justify-between items-center">
            <label className="text-xs text-gray-400">Notifiche push</label>
            <div className="flex gap-1">
              <button 
                onClick={() => setNotifichePush(true)}
                className={`px-5 py-2 rounded font-bold transition-all ${
                  notifichePush 
                    ? 'bg-orange-600 text-white scale-105' 
                    : 'bg-orange-500 text-white'
                }`}
              >
                ON
              </button>
              <button 
                onClick={() => setNotifichePush(false)}
                className={`px-5 py-2 rounded font-bold transition-all ${
                  !notifichePush 
                    ? 'bg-orange-600 text-white scale-105' 
                    : 'bg-orange-500 text-white'
                }`}
              >
                OFF
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button className="flex-1 py-4 rounded-xl font-bold text-sm border-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white transition-all">
            HOME
          </button>
          <button className="flex-1 py-4 rounded-xl font-bold text-sm bg-blue-500 text-white hover:bg-blue-600 transition-all">
            IMPOSTAZIONI
          </button>
        </div>
      </div>
    </div>
  );
}