import express from 'express'
import {
  createTrial,
  deleteTrial,
  getAllTrials,
  getTrialByType,
  updateTrial,
} from '../controllers'
import {
  validateDto,
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares'
import { CreateTrialDto, UpdateTrialDto } from '../dtos'

const router = express.Router()

router.post('/', [validateSalesRole, validateDto(CreateTrialDto)], createTrial)

router.get('/all', [validateSalesOrAdminRole], getAllTrials)

router.get('/:id', [validateSalesOrAdminRole], getTrialByType)

router.put(
  '/:id',
  [validateSalesRole, validateDto(UpdateTrialDto)],
  updateTrial,
)

router.delete('/:id', [validateSalesRole], deleteTrial)

export default router
