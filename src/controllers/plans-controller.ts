import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { CreatePlanDto, UpdatePlanDto } from '../dtos'
import { prismaClient } from '../db/prisma'

export const createPlan = async (req: Request, res: Response) => {
  const dto = plainToClass(CreatePlanDto, req.body)

  const description = ''
  const duration: number[] = [1, 6, 12]
  const prices: number[] = [
    dto.mensualPrice,
    dto.semestralPrice,
    dto.anualPrice,
  ]

  let i = 0
  try {
    for (const p of prices) {
      await prismaClient.plan.create({
        data: {
          type: dto.type,
          price: p,
          users: 0,
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

export const updatePlan = async (req: Request, res: Response) => {
  const dto = plainToClass(UpdatePlanDto, req.body)

  const { type } = req.params

  const prices: number[] = [
    dto.mensualPrice,
    dto.semestralPrice,
    dto.anualPrice,
  ]

  const plans = await prismaClient.plan.findMany({
    where: { type, price: { gt: 0 } },
  })

  const newPlans = []

  try {
    let i = 0
    for await (const plan of plans) {
      const newPlan = await prismaClient.plan.update({
        where: { id: plan.id },
        data: {
          type: dto.type,
          price: prices[i],
        },
      })
      newPlans.push(newPlan)
      i++
    }
  } catch (error: unknown) {
    console.error('Error al registrar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
  res.json({ message: 'Plan modificado', plans: newPlans })
}

export const deletePlan = async (req: Request, res: Response) => {
  const { type } = req.params

  try {
    await prismaClient.plan.updateMany({
      where: { type, status: true, price: { gt: 0 } },
      data: { status: false },
    })
  } catch (error: unknown) {
    console.error('Error al eliminar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
  res.json({ message: 'Plan eliminado' })
}

export const getPlanByType = async (req: Request, res: Response) => {
  const { type } = req.params

  const plans = await prismaClient.plan.findMany({
    where: { type, price: { gt: 0 } },
  })

  if (plans.length === 0) {
    return res.status(404).json({ error: 'Plan no encontrado' })
  }

  res.json({ plans })
}

export const getAllplans = async (req: Request, res: Response) => {
  res.json({
    plans: await prismaClient.plan.findMany({
      where: {
        price: {
          gt: 0,
        },
      },
    }),
  })
}
