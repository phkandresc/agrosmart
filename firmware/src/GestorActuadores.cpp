#include "GestorActuadores.h"
#include <Arduino.h>

void GestorActuadores::setup() {
  // Inicializar pines como salida si se requiere
}

void GestorActuadores::activar(int pin) {
  digitalWrite(pin, HIGH);
}

void GestorActuadores::desactivar(int pin) {
  digitalWrite(pin, LOW);
}
