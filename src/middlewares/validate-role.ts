import { NextFunction, Request, Response } from 'express'

import { hasSalesRole } from '../helpers/jwt'

export const validateSalesRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401).json({ error: 'No autorizado' })
    return
  }

  if (!hasSalesRole(authorization as string)) {
    res.status(403).json({ error: 'No tienes permisos para acceder' })
    return
  }

  next()
}
