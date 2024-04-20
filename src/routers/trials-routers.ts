import express from 'express'
import { createTrial, getAlltrials } from '../controllers/trials-controller'
import { validateSalesOrAdminRole, validateSalesRole } from '../middlewares'
const router = express.Router()

router.post('/', [validateSalesRole], createTrial)

router.get('/all', [validateSalesOrAdminRole], getAlltrials)

export default router
