// IAdapatdorClima.c
// Implementación ligera que intenta usar cliente HTTP en ESP32/ESP8266,
// y devuelve valores de prueba en entornos de compilación de escritorio.

#include "IAdapatdorClima.h"
#include <string.h>

#if defined(ESP32) || defined(ESP8266)
#include <Arduino.h>
#if defined(ESP8266)
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#else
#include <HTTPClient.h>
#include <WiFi.h>
#endif

// Helper mínimo para parsear valores JSON simples sin dependencia. Busca claves y extrae número.
static float parse_json_float(const char* json, const char* key, float fallback){
  const char* p = strstr(json, key);
  if(!p) return fallback;
  p = strchr(p, ':');
  if(!p) return fallback;
  return atof(p+1);
}

DatosClima IAdapatdorClima_obtenerDatosClima(const char* apiKey, const char* ciudad) {
  DatosClima res;
  res.temperatura = 0.0f;
  res.humedad = 0.0f;
  res.velocidadViento = 0.0f;
  res.codigoEstado = -1;

  if (WiFi.status() != WL_CONNECTED) {
    res.codigoEstado = -2; // WiFi no conectado
    return res;
  }

  HTTPClient http;
  char url[256];
  snprintf(url, sizeof(url), "http://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric&lang=es", ciudad, apiKey);

  http.begin(url);
  int httpCode = http.GET();
  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      // parseo ligero: buscar main.temp, main.humidity, wind.speed
      res.temperatura = parse_json_float(payload.c_str(), "\"temp\"", res.temperatura);
      res.humedad = parse_json_float(payload.c_str(), "\"humidity\"", res.humedad);
      res.velocidadViento = parse_json_float(payload.c_str(), "\"speed\"", res.velocidadViento);
      res.codigoEstado = 0;
    } else {
      res.codigoEstado = httpCode;
    }
  } else {
    res.codigoEstado = -3; // error conexión HTTP
  }

  http.end();
  return res;
}

#else
// Entorno de desarrollo en PC: devolver valores simulados
#include <stdio.h>
DatosClima IAdapatdorClima_obtenerDatosClima(const char* apiKey, const char* ciudad) {
  (void)apiKey; (void)ciudad;
  DatosClima res;
  res.temperatura = 22.5f;
  res.humedad = 56.0f;
  res.velocidadViento = 1.2f;
  res.codigoEstado = 0;
  return res;
}

#endif
