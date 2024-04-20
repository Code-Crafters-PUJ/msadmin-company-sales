import express from 'express'

import { createCoupon, getAllCoupons } from '../controllers'
import {
  validateDto,
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares'
import { CreateCouponDto } from '../dtos'

const router = express.Router()

router.post(
  '/',
  [validateSalesRole, validateDto(CreateCouponDto)],
  createCoupon,
)

router.get('/all', [validateSalesOrAdminRole], getAllCoupons)

export default router
