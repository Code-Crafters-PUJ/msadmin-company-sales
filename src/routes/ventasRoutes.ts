import express from 'express'

import {
  obtenerTodasLasVentas,
  obtenerVentasPorNegocio,
  registrarVenta,
} from '../controller/ventaController'

const router = express.Router()

router.post('/', registrarVenta)

router.get('/all', obtenerTodasLasVentas)

router.get('/:idNegocio', obtenerVentasPorNegocio)

export default router
