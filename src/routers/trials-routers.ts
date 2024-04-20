import express from 'express'
import { createTrial, getAlltrials } from '../controllers'
import {
  validateDto,
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares'
import { CreateTrialDto } from '../dtos'

const router = express.Router()

router.post('/', [validateSalesRole, validateDto(CreateTrialDto)], createTrial)

router.get('/all', [validateSalesOrAdminRole], getAlltrials)

export default router
