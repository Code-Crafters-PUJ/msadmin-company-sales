import { Request, Response } from 'express'
import { isNumber } from 'class-validator'

import { prismaClient } from '../db/prisma'

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await prismaClient.client.findMany({
      include: { billings: true },
    })
    res.json({ clients })
  } catch (error: unknown) {
    console.error('Error al obtener todos los negocios:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!isNumber(parseInt(id)))
    return res.status(400).json({ error: 'El id debe ser un número' })
  try {
    const client = await prismaClient.client.findUnique({
      where: { id: parseInt(id) },
      include: { billings: true },
    })
    res.json({ client })
  } catch (error: unknown) {
    console.error('Error al obtener todos los negocios:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
