const express = require('express');
const router = express.Router();
const ServicioGestionCultivo = require('../services/ServicioGestionCultivo');

const servicio = new ServicioGestionCultivo();

router.get('/', async (req, res) => {
  res.json({ status: 'ok', subsystem: 'M.C.S.' });
});

router.post('/datos', async (req, res) => {
  const datos = req.body;
  try {
    const resultado = await servicio.procesarDatos(datos);
    res.status(201).json({ ok: true, resultado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
