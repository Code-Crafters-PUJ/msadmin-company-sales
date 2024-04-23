import express from 'express'

import { createService, getAllServices } from '../controllers'
import {
  validateDto,
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares'
import { CreateServiceDto } from '../dtos'

const router = express.Router()

router.post(
  '/',
  [validateSalesRole, validateDto(CreateServiceDto)],
  createService,
)

router.get('/all', [validateSalesOrAdminRole], getAllServices)

export default router
