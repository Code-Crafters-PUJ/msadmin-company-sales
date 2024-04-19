import express from 'express'

import { createService, getAllServices } from '../controllers/services-controller'
import { validateSalesOrAdminRole, validateSalesRole } from '../middlewares'

const router = express.Router()

router.post('/', [validateSalesRole], createService)

router.get('/all', [validateSalesOrAdminRole], getAllServices)

export default router
