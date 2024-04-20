import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

export const validateDto = (dtoType: { new (): object }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToClass(dtoType, req.body)
      await validateOrReject(dto)
    } catch (error) {
      res.status(400).json({ errors: error })
      return
    }
    next()
  }
}
