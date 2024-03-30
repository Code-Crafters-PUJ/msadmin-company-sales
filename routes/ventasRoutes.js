const express = require('express');
const router = express.Router();
const ventaController = require('../controller/ventaController');

router.post('/', ventaController.registrarVenta);

router.get('/all', ventaController.obtenerTodasLasVentas);

router.get('/:idNegocio', ventaController.obtenerVentasPorNegocio);

router.get('/ventas-hoy', ventaController.obtenerCantidadVentasHoy);
router.get('/ventas-ultimo-mes', ventaController.obtenerCantidadVentasUltimoMes);
router.get('/ventas-ultimo-anio', ventaController.obtenerCantidadVentasUltimoAnio);

module.exports = router;
