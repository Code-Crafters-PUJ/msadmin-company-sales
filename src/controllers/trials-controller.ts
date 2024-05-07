import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { CreateTrialDto, UpdateTrialDto } from '../dtos'
import { prismaClient } from '../db/prisma'

export const createTrial = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const dto = plainToClass(CreateTrialDto, req.body)

  try {
    const newTrial = await prismaClient.plan.create({
      data: {
        type: dto.type,
        price: 0,
        users: 0,
        duration: dto.duration,
        description: '',
      },
    })

    res
      .status(201)
      .json({ message: 'Trial creado correctamente', trial: newTrial })
  } catch (error) {
    console.error('Error al registrar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const updateTrial = async (req: Request, res: Response) => {
  const { type } = req.params

  const dto = plainToClass(UpdateTrialDto, req.body)

  try {
    const trial = await prismaClient.plan.findFirst({
      where: { type, status: true, price: 0 },
    })
    const updatedTrial = await prismaClient.plan.update({
      where: { id: trial.id },
      data: {
        type: dto.type,
        duration: dto.duration,
      },
    })

    res.json({
      message: 'Trial actualizado correctamente',
      trial: updatedTrial,
    })
  } catch (error) {
    console.error('Error al actualizar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const deleteTrial = async (req: Request, res: Response) => {
  const { type } = req.params

  try {
    const trial = await prismaClient.plan.findFirst({
      where: { type, price: 0 },
    })

    await prismaClient.plan.update({
      where: { id: trial.id },
      data: {
        status: false,
      },
    })

    res.json({ message: 'Trial eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getTrialByType = async (req: Request, res: Response) => {
  const { type } = req.params

  try {
    const trial = await prismaClient.plan.findFirst({
      where: { type, price: 0 },
    })

    if (!trial) {
      res.status(404).json({ error: 'Trial no encontrado' })
      return
    }

    res.json({ trial })
  } catch (error) {
    console.error('Error al obtener plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getAllTrials = async (req: Request, res: Response) => {
  try {
    const plansWithClients = await prismaClient.plan.findMany({
      where: {
        price: 0,
      },
      include: {
        billings: {
          include: {
            client: true,
          },
        },
      },
    })

    const formattedPlans = plansWithClients.map((plan) => {
      const { type, duration, billings } = plan

      const clients = billings.map((billing) => billing.client)

      const companyNames = clients.map((client) => client.companyName)

      return {
        clients: companyNames,
        type,
        duration,
      }
    })

    res.json({ trials: formattedPlans })
  } catch (error) {
    console.error('Error al obtener planes:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  } finally {
    await prismaClient.$disconnect()
  }
}
