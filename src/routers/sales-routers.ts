import express from 'express'

import {
  createBill,
  createPlan,
  getAllBills,
  getAllBillsByClient,
  getAllplans,
  sendBillingEmail,
} from '../controllers/sales-controller'
import {
  validateDto,
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares'
import { CreateBillDto, SendBillingEmailDto } from '../dtos'

const router = express.Router()

router.post('/', [validateSalesRole, validateDto(CreateBillDto)], createBill)

router.get('/all', [validateSalesOrAdminRole], getAllBills)

router.get('/:clientId', [validateSalesOrAdminRole], getAllBillsByClient)

router.post('/plan', [validateSalesRole])

router.get('/plan/:id', [validateSalesRole])

router.post(
  '/billing/email',
  [validateSalesOrAdminRole, validateDto(SendBillingEmailDto)],
  sendBillingEmail,
)

router.post('/plan/add', [validateSalesOrAdminRole], createPlan)

router.get('/plan/all', [validateSalesOrAdminRole], getAllplans)

export default router
