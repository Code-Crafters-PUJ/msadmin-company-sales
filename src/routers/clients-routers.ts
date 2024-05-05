import express from 'express'

import { validateSalesOrAdminRole } from '../middlewares'
import { getAllClients, getClientById } from '../controllers'

const router = express.Router()

router.get('/all', [validateSalesOrAdminRole], getAllClients)

router.get('/:id', [validateSalesOrAdminRole], getClientById)

export default router
