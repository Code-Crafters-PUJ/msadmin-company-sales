import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { CreatePlanDto, UpdatePlanDto } from '../dtos'
import { prismaClient } from '../db/prisma'
import { publicarMensajeEnCola } from '../helpers/rabbitmq'
import { QUEUES_WRITE_PLAN } from 'src/config/environment'

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

    const idServices = await prismaClient.service.findMany({
      where: { name: { in: dto.services }, active: true },
      select: { id: true },
    })

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
        services: {
          createMany: {
            data: idServices.map((service) => {
              return { serviceId: service.id }
            }),
          },
        },
      },
    })

    res.status(201).json({ message: 'Plan creado' })
    await publicarMensajeEnCola(QUEUES_WRITE_PLAN.create, JSON.stringify(dto))
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
    await prismaClient.planHasService.deleteMany({
      where: {
        plan: { type },
        service: { name: { notIn: dto.services } },
      },
    })

    const plan = await prismaClient.plan.update({
      where: { type },
      data: {
        mensualPrice: dto.mensualPrice,
        semestralPrice: dto.semestralPrice,
        anualPrice: dto.anualPrice,
        numAccounts: dto.numAccounts,
        state: dto.state,
      },
      include: { services: true },
    })

    const idServices = await prismaClient.service.findMany({
      where: {
        name: { in: dto.services },
        active: true,
        id: {
          notIn: plan.services.map((service) => {
            return service.serviceId
          }),
        },
      },
      select: { id: true },
    })

    await prismaClient.planHasService.createMany({
      data: idServices.map((service) => {
        return {
          planId: plan.id,
          serviceId: service.id,
        }
      }),
    })

    res.json({ message: 'Plan modificado', plan })
    await publicarMensajeEnCola(QUEUES_WRITE_PLAN.update, JSON.stringify({ type, dto }))
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
    await publicarMensajeEnCola(QUEUES_WRITE_PLAN.delete, JSON.stringify({ type }))
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
      include: {
        services: {
          select: { service: { select: { name: true } } },
        },
      },
    }),
  })
}

export const getPlanByType = async (req: Request, res: Response) => {
  const { type } = req.params

  const plan = await prismaClient.plan.findFirst({
    where: {
      type,
      active: true,
    },
    include: {
      services: {
        select: { service: { select: { name: true } } },
      },
    },
  })

  if (!plan) {
    res.status(404).json({ error: 'Plan no encontrado' })
    return
  }

  res.json({ plan })
}
