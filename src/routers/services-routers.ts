import express from 'express'

import {
  createService,
  deleteService,
  getAllServices,
  updateService,
} from '../controllers'
import {
  validateDto,
  validateSalesOrAdminRole,
  validateSalesRole,
} from '../middlewares'
import { CreateServiceDto, UpdateServiceDto } from '../dtos'

const router = express.Router()

router.post(
  '/',
  [validateSalesRole, validateDto(CreateServiceDto)],
  createService,
)

router.get('/all', [validateSalesOrAdminRole], getAllServices)

router.put(
  '/:name',
  [validateSalesOrAdminRole, validateDto(UpdateServiceDto)],
  updateService,
)

router.delete('/:name', [validateSalesOrAdminRole], deleteService)

export default router
