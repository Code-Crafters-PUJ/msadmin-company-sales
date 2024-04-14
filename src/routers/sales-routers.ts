import express from 'express'

import {
  createBilling,
  getAllBillings,
  getAllBillingsByClient,
  pruebaEmail,
} from '../controllers/sales-controller'
import { validateSalesOrAdminRole, validateSalesRole } from '../middlewares'

const router = express.Router()

router.post('/', [validateSalesRole], createBilling)

router.get('/all', [validateSalesOrAdminRole], getAllBillings)

router.get('/:clientId', [validateSalesOrAdminRole], getAllBillingsByClient)

router.post('/plan', [validateSalesRole])

router.get('/plan/:id', [validateSalesRole])

router.post('/email', pruebaEmail)

export default router
