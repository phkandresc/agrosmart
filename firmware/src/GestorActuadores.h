#ifndef GESTOR_ACTUADORES_H
#define GESTOR_ACTUADORES_H

#include "IAdapatdorClima.h"

class GestorActuadores {
public:
  void setup();
  void activar(int pin);
  void desactivar(int pin);
  // Devuelve datos de clima obtenidos via adaptador (API OpenWeather o sensores).
  DatosClima obtenerDatosClima(const char* apiKey, const char* ciudad);
};

#endif
