import express from 'express'

import {
  createBill,
  getAllBills,
  getAllBillsByClient,
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
  sendBillingEmail
)

export default router
