import express from 'express'

import {
  obtenerTodasLasVentas,
  obtenerVentasPorNegocio,
  registrarVenta,
} from '../controller/ventaController'
import { validateSalesRole } from '../middlewares/validate-role'

const router = express.Router()

router.post('/', [validateSalesRole], registrarVenta)

router.get('/all', [validateSalesRole], obtenerTodasLasVentas)

router.get('/:idNegocio', [validateSalesRole], obtenerVentasPorNegocio)

export default router
