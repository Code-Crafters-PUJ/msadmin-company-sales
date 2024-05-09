import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { CreatePlanDto, UpdatePlanDto } from '../dtos'
import { prismaClient } from '../db/prisma'

export const createPlan = async (req: Request, res: Response) => {
  const dto = plainToClass(CreatePlanDto, req.body)

  const description = ''

  try {
    const deletedPlan = await prismaClient.plan.findFirst({
      where: { type: dto.type, active: false },
    })

    if (deletedPlan) {
      await prismaClient.plan.update({
        where: { type: dto.type },
        data: {
          mensualPrice: dto.mensualPrice,
          semestralPrice: dto.semestralPrice,
          anualPrice: dto.anualPrice,
          users: 0,
          description,
          state: dto.state,
          active: true,
        },
      })
      res.status(201).json({ message: 'Plan creado' })
      return
    }

    await prismaClient.plan.create({
      data: {
        type: dto.type,
        mensualPrice: dto.mensualPrice,
        semestralPrice: dto.semestralPrice,
        anualPrice: dto.anualPrice,
        users: 0,
        description,
        state: dto.state,
      },
    })
    res.status(201).json({ message: 'Plan creado' })
  } catch (error: unknown) {
    console.error('Error al registrar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const updatePlan = async (req: Request, res: Response) => {
  const dto = plainToClass(UpdatePlanDto, req.body)

  const { type } = req.params

  try {
    const plan = await prismaClient.plan.update({
      where: { type },
      data: {
        mensualPrice: dto.mensualPrice,
        semestralPrice: dto.semestralPrice,
        anualPrice: dto.anualPrice,
        numAccounts: dto.numAccounts,
        numServices: dto.numServices,
        state: dto.state,
      },
    })
    res.json({ message: 'Plan modificado', plan })
  } catch (error: unknown) {
    console.error('Error al registrar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const deletePlan = async (req: Request, res: Response) => {
  const { type } = req.params

  try {
    await prismaClient.plan.update({
      where: { type, active: true },
      data: { active: false },
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
    where: { type, active: true },
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
        active: true,
      },
    }),
  })
}
