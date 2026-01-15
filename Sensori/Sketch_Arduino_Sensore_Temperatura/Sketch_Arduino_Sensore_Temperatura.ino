#include <OneWire.h>
#include <DallasTemperature.h>
#include "SensorValidation.h"  // ← IMPORTIAMO LA LIBRERIA COMUNE

// --- Configurazione Pin e Tempi ---
#define ONE_WIRE_BUS 2
const unsigned long ATTESA_6_MINUTI = 360000; 

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
DeviceAddress insideThermometer;

// Variabili globali
float sogliaMax; 
float sogliaMin;
int cont = 0;

// ============================================================================
// CONFIGURAZIONE VALIDAZIONE TEMPERATURA
// ============================================================================
ConfigValidazioneSensore configTemp = {
  .rangeMin = -40.0f,          // DS18B20 supporta -55°C, ma usiamo -40°C come limite pratico
  .rangeMax = 85.0f,           // DS18B20 max +125°C, ma usiamo 85°C come limite arnia
  .permettiNegativi = true,    // Temperature negative sono ammesse
  .richiedeTimestamp = true,   // Vogliamo sempre il timestamp
  .valoreDefault = 25.0f,      // Valore di fallback (temperatura ambiente)
  .nomeSensore = "TEMP"
};

// ============================================================================
// SETUP
// ============================================================================
void setup(void) {
  Serial.begin(115200);
  Serial.println("\n╔═══════════════════════════════════════╗");
  Serial.println("║   SENSORE TEMPERATURA - Avvio        ║");
  Serial.println("╚═══════════════════════════════════════╝\n");
  
  sensors.begin();
  sensors.setResolution(insideThermometer, 9);
  
  inizializzaCiclo();
}

// ============================================================================
// FUNZIONI AUSILIARIE
// ============================================================================

void inizializzaCiclo() {
  cont = 0;
  sogliaMin = leggiSogliaMinDBSimulato();
  sogliaMax = leggiSogliaMaxDBSimulato();
  
  Serial.println("--- Nuove soglie caricate ---");
  Serial.print("  Soglia MIN: "); Serial.print(sogliaMin); Serial.println("°C");
  Serial.print("  Soglia MAX: "); Serial.print(sogliaMax); Serial.println("°C");
  Serial.print("  Contatore resettato: "); Serial.println(cont);
  Serial.println();
}

float leggiSogliaMinDBSimulato() { 
  return 18.0;  // Temperatura minima arnia (esempio)
}

float leggiSogliaMaxDBSimulato() { 
  return 36.0;  // Temperatura massima arnia (esempio)
}

void inviaDatiAlDatabase(float temp, String stato, ErroreComune codiceErrore) {
  Serial.println("\n→ Invio al Database:");
  Serial.print("  Stato: "); Serial.println(stato);
  
  if (codiceErrore != ERR_COMMON_NONE) {
    Serial.print("  Codice Errore: "); Serial.println(codiceErrore);
  }
  
  if (temp != -999) {
    Serial.print("  Temperatura: "); Serial.print(temp); Serial.println("°C");
  }
  
  // TODO: Implementare invio JSON reale
  // Esempio payload: {"sensor": "TEMP", "value": 25.5, "status": "OK", "error_code": 0, "timestamp": 1234567890}
  
  Serial.println();
}

// ============================================================================
// ACQUISIZIONE E VALIDAZIONE TEMPERATURA
// ============================================================================

RisultatoValidazione acquisisciTemperatura() {
  // Richiesta lettura al sensore
  sensors.requestTemperatures();
  float tempC = sensors.getTempC(insideThermometer);
  
  // Verifica disponibilità sensore (caso specifico DS18B20)
  bool sensoreReady = (tempC != DEVICE_DISCONNECTED_C);
  
  // Timestamp attuale
  unsigned long timestamp = millis();
  
  // ✅ VALIDAZIONE COMUNE
  RisultatoValidazione risultato = validaDatoSensore(
    tempC,
    timestamp,
    sensoreReady,
    configTemp
  );
  
  return risultato;
}

// ============================================================================
// FUNZIONE PRINCIPALE TEMPERATURA (da chiamare nel Main)
// ============================================================================

void funzioneTemperatura() {
  Serial.println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  Serial.println("  CICLO TEMPERATURA");
  Serial.println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  // 1) ACQUISIZIONE E VALIDAZIONE
  RisultatoValidazione risultato = acquisisciTemperatura();
  
  // 2) GESTIONE ERRORI COMUNI
  gestisciRisultatoValidazione(risultato);
  
  if (! risultato.valido) {
    // ❌ DATO NON VALIDO:  invia errore e termina ciclo
    inviaDatiAlDatabase(-999, "ERRORE", risultato.codiceErrore);
    return; // Esci senza incrementare contatore
  }
  
  // ✅ DATO VALIDO: procedi con controllo soglie
  float tempValida = risultato.valorePulito;
  
  // 3) VERIFICA SOGLIE (genera alert ma non invalida il dato)
  ErroreComune alertSoglia = verificaSoglie(tempValida, sogliaMin, sogliaMax, "TEMP");
  
  String statoFinale;
  if (alertSoglia == ALERT_THRESHOLD_HIGH) {
    statoFinale = "ALERT_SOGLIA_ALTA";
  } else if (alertSoglia == ALERT_THRESHOLD_LOW) {
    statoFinale = "ALERT_SOGLIA_BASSA";
  } else {
    statoFinale = "OK";
  }
  
  // 4) INVIO DATI
  inviaDatiAlDatabase(tempValida, statoFinale, alertSoglia);
  
  // 5) GESTIONE CONTATORE (ciclo di 5)
  cont++;
  Serial.print("Ciclo: "); Serial.print(cont); Serial.println("/5\n");
  
  if (cont >= 5) {
    Serial.println("✓ Ciclo di 5 completato → Ricaricamento soglie\n");
    inizializzaCiclo();
  }
}

// ============================================================================
// LOOP
// ============================================================================

void loop(void) {
  funzioneTemperatura();
  
  // Attesa 6 minuti
  Serial.print("⏳ Attesa ");
  Serial.print(ATTESA_6_MINUTI / 1000);
  Serial.println(" secondi...\n");
  
  delay(ATTESA_6_MINUTI);
}
