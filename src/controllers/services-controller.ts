import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { CreateServiceDto, UpdateServiceDto } from '../dtos'
import { prismaClient } from '../db/prisma'

export const createService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const dto = plainToClass(CreateServiceDto, req.body)

  try {
    const newService = await prismaClient.service.create({
      data: {
        name: dto.name,
        users: 0,
      },
    })

    res
      .status(201)
      .json({ message: 'Servicio creado correctamente', service: newService })
  } catch (error) {
    console.error('Error al crear servicio:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const updateService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params

  const dto = plainToClass(UpdateServiceDto, req.body)

  try {
    const updatedService = await prismaClient.service.update({
      where: { id: parseInt(id) },
      data: {
        name: dto.name,
      },
    })

    res.json({
      message: 'Servicio actualizado correctamente',
      service: updatedService,
    })
  } catch (error) {
    console.error('Error al actualizar servicio:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const deleteService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params

  try {
    await prismaClient.service.update({
      where: { id: parseInt(id) },
      data: {
        status: false,
      },
    })

    res.json({ message: 'Servicio eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar servicio:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getServiceById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params

  try {
    const service = await prismaClient.service.findUnique({
      where: { id: parseInt(id) },
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
    const services = await prismaClient.service.findMany()

    res.status(200).json({ services })
  } catch (error) {
    console.error('Error al obtener servicios:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
