import express from 'express'

import {
  createBill,
  getAllBills,
  getAllBillsByClient,
  getBillStatsByPeriod,
  sendBillingEmail,
} from '../controllers'
import {
  validateDto,
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares'
import { CreateBillDto, SendBillingEmailDto } from '../dtos'

const router = express.Router()

router.post('/', [validateSalesRole, validateDto(CreateBillDto)], createBill)

router.get('/all', [validateSalesOrAdminRole], getAllBills)

router.get('/stats', [validateSalesOrAdminRole], getBillStatsByPeriod)

router.get('/:clientId', [validateSalesOrAdminRole], getAllBillsByClient)

router.post(
  '/billing/email',
  [validateSalesOrAdminRole, validateDto(SendBillingEmailDto)],
  sendBillingEmail,
)

export default router
