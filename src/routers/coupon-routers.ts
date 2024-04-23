import express from 'express'

import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  getCouponByCode,
  updateCoupon,
} from '../controllers'
import {
  validateDto,
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares'
import { CreateCouponDto, UpdateCouponDto } from '../dtos'

const router = express.Router()

router.post(
  '/',
  [validateSalesRole, validateDto(CreateCouponDto)],
  createCoupon,
)

router.get('/all', [validateSalesOrAdminRole], getAllCoupons)

router.get('/:code', [validateSalesOrAdminRole], getCouponByCode)

router.put(
  '/:code',
  [validateSalesRole, validateDto(UpdateCouponDto)],
  updateCoupon,
)

router.delete('/:code', [validateSalesRole], deleteCoupon)

export default router
