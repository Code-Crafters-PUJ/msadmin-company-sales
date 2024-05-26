import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { CreateServiceDto, UpdateServiceDto } from '../dtos'
import { prismaClient } from '../db/prisma'
import { publicarMensajeEnCola } from '../helpers/rabbitmq'
import { QUEUES_WRITE_SERVICE } from 'src/config/environment'

export const createService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const dto = plainToClass(CreateServiceDto, req.body)

  try {
    const service = await prismaClient.service.findUnique({
      where: { name: dto.name, active: false },
    })

    if (service) {
      await prismaClient.service.update({
        where: { name: dto.name },
        data: { active: true },
      })

      res
        .status(201)
        .json({ message: 'Servicio creado correctamente', service })
      await publicarMensajeEnCola('createService', JSON.stringify(dto))
      return
    }

    const newService = await prismaClient.service.create({
      data: { name: dto.name, state: dto.state, users: 0 },
    })

    res
      .status(201)
      .json({ message: 'Servicio creado correctamente', service: newService })
    await publicarMensajeEnCola(QUEUES_WRITE_SERVICE.create, JSON.stringify(dto))
  } catch (error) {
    console.error('Error al crear servicio:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const updateService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name } = req.params
  const dto = plainToClass(UpdateServiceDto, req.body)

  try {
    const updatedService = await prismaClient.service.update({
      where: { name, active: true },
      data: { state: dto.state },
    })

    res.json({
      message: 'Servicio actualizado correctamente',
      service: updatedService,
    })
    await publicarMensajeEnCola(QUEUES_WRITE_SERVICE.update, JSON.stringify({ name, dto }))
  } catch (error) {
    console.error('Error al actualizar servicio:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const deleteService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name } = req.params

  try {
    await prismaClient.service.update({
      where: { name },
      data: { active: false },
    })

    res.json({ message: 'Servicio eliminado correctamente' })
    await publicarMensajeEnCola(QUEUES_WRITE_SERVICE.delete, JSON.stringify(name))
  } catch (error) {
    console.error('Error al eliminar servicio:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getServiceById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name } = req.params

  try {
    const service = await prismaClient.service.findUnique({
      where: { name, active: true },
    })

    if (!service) {
      res.status(404).json({ error: 'Servicio no encontrado' })
      return
    }

    res.json({ service })
  } catch (error) {
    console.error('Error al obtener servicio:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getAllServices = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const services = await prismaClient.service.findMany({
      where: { active: true },
    })

    res.status(200).json({ services })
  } catch (error) {
    console.error('Error al obtener servicios:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
