import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { CreatePlanDto } from '../dtos'
import { prismaClient } from '../db/prisma'

export const createPlan = async (req: Request, res: Response) => {
  const dto = plainToClass(CreatePlanDto, req.body)

  const description = ''
  const duration: number[] = [3, 6, 12]
  let i = 0
  try {
    for (const p of dto.price) {
      await prismaClient.plan.create({
        data: {
          type: dto.type,
          price: p,
          users: dto.users,
          status: dto.status,
          description: description,
          duration: duration[i],
        },
      })
      i = i + 1
    }
  } catch (error: unknown) {
    console.error('Error al registrar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
  res.json({ message: 'Plan creado' })
}

export const getAllplans = async (req: Request, res: Response) => {
  res.json({
    plans: await prismaClient.plan.findMany({
      where: {
        status: true,
        price: {
          gt: 0,
        },
      },
    }),
  })
}
