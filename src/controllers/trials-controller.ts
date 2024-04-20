import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { CreateTrialDto } from '../dtos'
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
        price: dto.price,
        users: dto.users,
        duration: dto.duration,
        status: dto.status,
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

export const getAlltrials = async (req: Request, res: Response) => {
  try {
    const plansWithClients = await prismaClient.plan.findMany({
      where: {
        status: true,
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
      const { type, duration, status, billings } = plan

      const clients = billings.map((billing) => billing.client)

      const companyNames = clients.map((client) => client.companyName)

      return {
        empresa: companyNames.join(', '),
        plan: type,
        duracion: duration,
        estado: status,
      }
    })

    res.json({ plans: formattedPlans })
  } catch (error) {
    console.error('Error al obtener planes:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  } finally {
    await prismaClient.$disconnect()
  }
}

export default { createTrial, getAlltrials }
