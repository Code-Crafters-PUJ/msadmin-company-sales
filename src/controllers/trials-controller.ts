import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { CreateTrialDto, UpdateTrialDto } from '../dtos'
import { prismaClient } from '../db/prisma'
import { publicarMensajeEnCola } from '../helpers/rabbitmq'

export const createTrial = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const dto = plainToClass(CreateTrialDto, req.body)

  try {
    const trial = await prismaClient.trials.create({
      data: {
        plan: { connect: { type: dto.plan } },
        duration: dto.duration,
        state: dto.state,
      },
    })

    res.status(201).json({ message: 'Trial creado correctamente', trial })
    await publicarMensajeEnCola('createTrial', JSON.stringify(dto))
  } catch (error) {
    console.error('Error al registrar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const updateTrial = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params
  const dto = plainToClass(UpdateTrialDto, req.body)

  try {
    const updatedTrial = await prismaClient.trials.update({
      where: { id: parseInt(id) },
      data: {
        plan: { connect: { type: dto.plan } },
        duration: dto.duration,
        state: dto.state,
      },
    })

    res.json({
      message: 'Trial actualizado correctamente',
      trial: updatedTrial,
    })
    await publicarMensajeEnCola('updateTrial', JSON.stringify({ id, dto }))
  } catch (error) {
    console.error('Error al actualizar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const deleteTrial = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params

  try {
    await prismaClient.trials.update({
      where: { id: parseInt(id) },
      data: { active: false },
    })

    res.json({ message: 'Trial eliminado correctamente' })
    await publicarMensajeEnCola('deleteTrial', JSON.stringify(id))
  } catch (error) {
    console.error('Error al eliminar plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getTrialByType = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const trials = await prismaClient.trials.findUnique({
      where: { id: parseInt(id) },
    })

    if (!trials) {
      res.status(404).json({ error: 'Trial no encontrado' })
      return
    }

    res.json({ trials })
  } catch (error) {
    console.error('Error al obtener plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getAllTrials = async (req: Request, res: Response) => {
  try {
    const trials = await prismaClient.trials.findMany({
      where: { active: true },
      include: { plan: true },
    })

    res.json({ trials })
  } catch (error) {
    console.error('Error al obtener planes:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  } finally {
    await prismaClient.$disconnect()
  }
}

export const getClientsByTrial = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const billings = await prismaClient.billing.findMany({
      where: { trialId: parseInt(id) },
      include: { client: true },
    })
    const clients = billings.map((billing) => {
      return billing.client
    })

    return { clients }
  } catch (error) {
    console.error('Error al obtener clientes por plan:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
