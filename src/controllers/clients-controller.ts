import { Request, Response } from 'express'
import { isNumber } from 'class-validator'

import { prismaClient } from '../db/prisma'
import { Plan } from '@prisma/client'

const getActualPlan = async (clientId: number): Promise<Plan | null> => {
  const client = await prismaClient.client.findUnique({
    where: { id: clientId },
    include: { billings: true },
  })
  if (!client || client.billings.length == 0) return null

  const mostRecentBilling = client.billings.sort((a, b) => {
    if (a.finalDate > b.finalDate) {
      return -1
    } else {
      return 1
    }
  })[0]
  const plan = await prismaClient.plan.findUnique({
    where: { id: mostRecentBilling.planId },
  })

  return mostRecentBilling.finalDate > new Date() ? plan : null
}

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const dbClients = await prismaClient.client.findMany({
      include: { billings: true },
    })
    const clients = await Promise.all(
      dbClients.map(async (client) => {
        const plan = await getActualPlan(client.id)
        return { plan, ...client }
      }),
    )
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
    const plan = await getActualPlan(client.id)
    res.json({
      client: {
        ...client,
        plan,
      },
    })
  } catch (error: unknown) {
    console.error('Error al obtener todos los negocios:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
