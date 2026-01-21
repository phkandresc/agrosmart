#include <Arduino.h>
#include "GestorSensores.h"
#include "GestorActuadores.h"

GestorSensores sensores;
GestorActuadores actuadores;

void setup() {
  sensores.setup();
  actuadores.setup();
}

void loop() {
  // Ejemplo: leer sensor A0 y si valor > umbral activar salida 13
  float v = sensores.leerSensor(A0);
  if (v > 2.5) {
    actuadores.activar(13);
  } else {
    actuadores.desactivar(13);
  }
  delay(1000);
}
