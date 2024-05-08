import express from 'express'

import { createService, deleteService, getAllServices } from '../controllers'
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

router.delete('/:name', [validateSalesOrAdminRole], deleteService)

export default router
