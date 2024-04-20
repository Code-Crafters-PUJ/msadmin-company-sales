import { Request, Response } from 'express'
import { CreateServiceDto } from '../dtos'
import { prismaClient } from '../db/prisma'
import { plainToClass } from 'class-transformer'

export const createService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const dto = plainToClass(CreateServiceDto, req.body)

  try {
    const newService = await prismaClient.service.create({
      data: {
        name: dto.name,
        status: dto.status,
        users: dto.users,
        updatedAt: dto.updatedAt,
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

export const getAllServices = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const services = await prismaClient.service.findMany({
      where: {
        status: true,
      },
    })

    res.status(200).json({ services })
  } catch (error) {
    console.error('Error al obtener servicios:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
