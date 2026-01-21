#ifndef GESTOR_ACTUADORES_H
#define GESTOR_ACTUADORES_H

class GestorActuadores {
public:
  void setup();
  void activar(int pin);
  void desactivar(int pin);
};

#endif
