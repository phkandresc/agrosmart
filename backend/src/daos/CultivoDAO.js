class CultivoDAO {
  async save(datos) {
    // Stub: reemplazar por persistencia real (DB, ORM, etc.)
    console.log('CultivoDAO.save ->', datos);
    return { id: Date.now(), ...datos };
  }
}

module.exports = CultivoDAO;
