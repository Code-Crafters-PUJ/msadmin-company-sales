import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

export const validateDto = (dtoType: { new (): object }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToClass(dtoType, req.body)
    try {
      await validateOrReject(dto)
    } catch (errors) {
      res.status(400).json({ errors: errors })
      return
    }
    next()
  }
}
