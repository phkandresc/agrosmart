#ifndef GESTOR_SENSORES_H
#define GESTOR_SENSORES_H

class GestorSensores {
public:
  void setup();
  void loop();
  float leerSensor(int canal);
};

#endif
