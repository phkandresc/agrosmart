#include "GestorSensores.h"
#include <Arduino.h>

void GestorSensores::setup() {
  // Inicializar pines/ADC
}

void GestorSensores::loop() {
  // Lectura periódica si es necesario
}

float GestorSensores::leerSensor(int canal) {
  // Leer canal analógico (stub)
  return analogRead(canal) * (5.0 / 1023.0);
}
