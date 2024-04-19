import express from 'express'

import { createCoupon, getAllCoupons } from '../controllers/coupon-controller'

const router = express.Router()

router.post('/', createCoupon)

router.get('/all', getAllCoupons)

export default router
