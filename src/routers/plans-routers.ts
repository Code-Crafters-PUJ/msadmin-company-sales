import express from 'express'
import { createPlan, getAllplans } from '../controllers'
import { validateSalesOrAdminRole, validateSalesRole } from '../middlewares'

const router = express.Router()

router.post('/', [validateSalesRole], createPlan)

router.get('/all', [validateSalesOrAdminRole], getAllplans)

export default router
