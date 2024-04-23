import express from 'express'
import { createTrial, getAllTrials, getTrialByType } from '../controllers'
import {
  validateDto,
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares'
import { CreateTrialDto, UpdateTrialDto } from '../dtos'

const router = express.Router()

router.post('/', [validateSalesRole, validateDto(CreateTrialDto)], createTrial)

router.get('/all', [validateSalesOrAdminRole], getAllTrials)

router.get('/:type', [validateSalesOrAdminRole], getTrialByType)

router.put(
  '/:type',
  [validateSalesRole, validateDto(UpdateTrialDto)],
  createTrial,
)

router.delete('/:type', [validateSalesRole], createTrial)

export default router
