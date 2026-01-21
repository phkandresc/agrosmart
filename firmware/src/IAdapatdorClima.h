#ifndef IADAPTADOR_CLIMA_H
#define IADAPTADOR_CLIMA_H

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
  float temperatura; // °C
  float humedad;     // %
  float velocidadViento; // m/s
  int codigoEstado;  // 0 = ok, negativo = error
} DatosClima;

// Función C expuesta para obtener datos del clima. Implementación en IAdapatdorClima.c
DatosClima IAdapatdorClima_obtenerDatosClima(const char* apiKey, const char* ciudad);

#ifdef __cplusplus
}
#endif

#endif
