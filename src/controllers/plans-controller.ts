import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { CreatePlanDto, UpdatePlanDto } from '../dtos'
import { prismaClient } from '../db/prisma'
import { publicarMensajeEnCola } from '../helpers/rabbitmq'

export const createPlan = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
      await publicarMensajeEnCola('createPlan', JSON.stringify(dto))
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
        numAccounts: dto.numAccounts,
        numServices: dto.numServices,
      },
    })
    res.status(201).json({ message: 'Plan creado' })
    await publicarMensajeEnCola('createPlan', JSON.stringify(dto))
  } catch (error) {
    console.error('Error al registrar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const updatePlan = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
    await publicarMensajeEnCola('updatePlan', JSON.stringify({ type, dto }))
  } catch (error) {
    console.error('Error al actualizar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const deletePlan = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { type } = req.params

  try {
    await prismaClient.plan.update({
      where: { type, active: true },
      data: { active: false },
    })
    await publicarMensajeEnCola('deletePlan', JSON.stringify({ type }))
  } catch (error) {
    console.error('Error al eliminar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
  res.json({ message: 'Plan eliminado' })
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
