import express from 'express'

import {
  obtenerTodasLasVentas,
  obtenerVentasPorNegocio,
  pruebaEmail,
  registrarVenta,
} from '../controllers/sales-controller'
import {
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares/validate-role'

const router = express.Router()

router.post('/', [validateSalesRole], registrarVenta)

router.get('/all', [validateSalesOrAdminRole], obtenerTodasLasVentas)

router.get('/:idNegocio', [validateSalesOrAdminRole], obtenerVentasPorNegocio)

router.post('/plan', [validateSalesRole], registrarVenta)

router.post('/email', pruebaEmail)

export default router
