import express from 'express'
import { createPlan, getAllplans } from '../controllers'
import {
  validateDto,
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares'
import { CreatePlanDto } from '../dtos'

const router = express.Router()

router.post('/', [validateSalesRole, validateDto(CreatePlanDto)], createPlan)

router.get('/all', [validateSalesOrAdminRole], getAllplans)

export default router
