import express from 'express'
import {
  createPlan,
  deletePlan,
  getAllplans,
  getPlanByType,
  updatePlan,
} from '../controllers'
import {
  validateDto,
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares'
import { CreatePlanDto, UpdatePlanDto } from '../dtos'

const router = express.Router()

router.post('/', [validateSalesRole, validateDto(CreatePlanDto)], createPlan)

router.get('/all', [validateSalesOrAdminRole], getAllplans)

router.get('/:type', [validateSalesOrAdminRole], getPlanByType)

router.put(
  '/:type',
  [validateSalesRole, validateDto(UpdatePlanDto)],
  updatePlan,
)

router.delete('/:type', [validateSalesRole], deletePlan)

export default router
