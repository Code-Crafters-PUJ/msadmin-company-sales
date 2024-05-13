import { NextFunction, Request, Response } from 'express'

import { isValidToken } from '../helpers/jwt'

export const validateSalesRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers

  /*
  if (!authorization) {
    res.status(401).json({ error: 'No autorizado' })
    return
  }
  */

  /*
  if (!isValidToken(authorization as string)) {
    res.status(403).json({ error: 'Token inválido' })
    return
  }

  */
  // if (!hasSalesRole(authorization as string)) {
  //   res
  //     .status(403)
  //     .json({ error: 'No tienes permisos para realizar esta operación' })
  //   return
  // }

  next()
}

export const validateSalesOrAdminRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers
  /*
  if (!authorization) {
    res.status(401).json({ error: 'No autorizado' })
    return
  }
  */

  /*
  if (!isValidToken(authorization as string)) {
    res.status(403).json({ error: 'Token inválido' })
    return
  }
  */

  // if (
  //   !(
  //     hasSalesRole(authorization as string) ||
  //     hasAdminRole(authorization as string)
  //   )
  // ) {
  //   res
  //     .status(403)
  //     .json({ error: 'No tienes permisos para realizar esta operación' })
  //   return
  // }

  next()
}
