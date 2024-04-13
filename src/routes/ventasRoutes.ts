import express from 'express'

import {
  obtenerTodasLasVentas,
  obtenerVentasPorNegocio,
  pruebaEmail,
  registrarVenta,
} from '../controller/ventaController'
import {
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares/validate-role'

const router = express.Router()

router.post('/', [validateSalesRole], registrarVenta)

router.get('/all', [validateSalesOrAdminRole], obtenerTodasLasVentas)

router.get('/:idNegocio', [validateSalesOrAdminRole], obtenerVentasPorNegocio)

router.post('/email', pruebaEmail)

export default router
