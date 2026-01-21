#include <Arduino.h>
#include "GestorSensores.h"
#include "GestorActuadores.h"

#ifndef OPENWEATHER_API_KEY
#define OPENWEATHER_API_KEY ""
#endif
#ifndef OPENWEATHER_CITY
#define OPENWEATHER_CITY ""
#endif

GestorSensores sensores;
GestorActuadores actuadores;

void setup() {
  sensores.setup();
  actuadores.setup();
  Serial.begin(115200);
}

void loop() {
  // Ejemplo: leer sensor A0 y si valor > umbral activar salida 13
  float v = sensores.leerSensor(A0);
  if (v > 2.5) {
    actuadores.activar(13);
  } else {
    actuadores.desactivar(13);
  }

  // Ejemplo de uso de obtenerDatosClima
  DatosClima datos = actuadores.obtenerDatosClima(OPENWEATHER_API_KEY, OPENWEATHER_CITY);
  if (datos.codigoEstado == 0) {
    Serial.print("Temp: "); Serial.print(datos.temperatura); Serial.print(" C, ");
    Serial.print("Humedad: "); Serial.print(datos.humedad); Serial.print(" %, ");
    Serial.print("Viento: "); Serial.print(datos.velocidadViento); Serial.println(" m/s");
  } else {
    Serial.print("Error obtenerDatosClima: "); Serial.println(datos.codigoEstado);
  }

  delay(1000);
}
