#include "GestorActuadores.h"
#include <Arduino.h>
#include "IAdapatdorClima.h"

void GestorActuadores::setup() {
  // Inicializar pines como salida si se requiere
}

void GestorActuadores::activar(int pin) {
  digitalWrite(pin, HIGH);
}

void GestorActuadores::desactivar(int pin) {
  digitalWrite(pin, LOW);
}

DatosClima GestorActuadores::obtenerDatosClima(const char* apiKey, const char* ciudad) {
  // Llama al adaptador C que gestiona la conexión y el fetch de OpenWeather.
  return IAdapatdorClima_obtenerDatosClima(apiKey, ciudad);
}
