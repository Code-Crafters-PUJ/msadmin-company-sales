import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { CreateBillDto, SendBillingEmailDto } from '../dtos'
import { sendEmail } from '../helpers/emails'
import { prismaClient } from '../db/prisma'

export const createBill = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const dto = plainToClass(CreateBillDto, req.body)

  try {
    const client = await prismaClient.client.findFirst({
      where: { id: dto.clientId },
    })

    if (!client) {
      res.status(404).json({
        error: `No se encontró un Negocio con el ID '${dto.clientId}'`,
      })
      return
    }

    const sale = await prismaClient.billing.create({
      data: {
        client: { connect: { id: dto.clientId } },
        initialDate: dto.initialDate,
        finalDate: dto.finalDate,
        plan: {
          connect: {
            type_duration: { type: dto.planType, duration: dto.duration },
          },
        },
        payment: { connect: { method: dto.paymentMethod } },
        amount: dto.amount,
        paymentDate: dto.paymentDate,
      },
    })

    res.status(201).json({ message: 'Compra Registrada', sale })
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      const cause = error.meta?.cause.toString()
      if (cause.includes('Plan')) {
        res.status(404).json({
          error: `El tipo plan '${dto.planType}' con la duración '${dto.duration}' no existe`,
        })
      } else if (cause.includes('Payment')) {
        res.status(404).json({
          error: `El metodo de pago '${dto.paymentMethod}' no existe`,
        })
      }
      return
    }
    console.error('Error al registrar venta:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getAllBills = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const sales = await prismaClient.billing.findMany({
      where: { status: true },
      include: { client: true, plan: true, payment: true },
    })
    res.json({ sales })
  } catch (error: unknown) {
    console.error('Error al obtener todas las ventas:', error)
  }
}

export const getAllBillsByClient = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { clientId } = req.params

  if (!Number.isInteger(Number(clientId))) {
    res.status(400).json({ error: 'ID de Negocio inválido' })
    return
  }

  try {
    const sales = await prismaClient.billing.findMany({
      where: { clientId: parseInt(clientId), status: true },
      include: { client: true, plan: true, payment: true },
    })

    if (sales.length === 0) {
      res
        .status(404)
        .json({ error: 'No se encontraron ventas para este Negocio' })
      return
    }

    res.json(sales[0])
  } catch (error: unknown) {
    console.error('Error al obtener ventas por negocio:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const sendBillingEmail = async (req: Request, res: Response) => {
  const { email, clientId, nit, subject, message } = plainToClass(
    SendBillingEmailDto,
    req.body,
  )

  if (email) {
    const client = await prismaClient.client.findFirst({
      where: { email },
    })

    if (!client) {
      res.status(404).json({ error: 'No se encontró un Negocio con ese email' })
      return
    }

    sendEmail(email, subject, message)
  } else if (clientId) {
    const client = await prismaClient.client.findFirst({
      where: { id: clientId },
    })

    if (!client) {
      res.status(404).json({ error: 'No se encontró un Negocio con ese ID' })
      return
    }

    sendEmail(client.email, subject, message)
  } else if (nit) {
    const client = await prismaClient.client.findFirst({
      where: { nit },
    })

    if (!client) {
      res.status(404).json({ error: 'No se encontró un Negocio con ese NIT' })
      return
    }

    sendEmail(client.email, subject, message)
  } else {
    res.status(400).json({
      error: 'Se necesita al menos un dato entre "email", "nit" y "clientId"',
    })
    return
  }
  res.json({ info: 'Email enviado', email, subject, message })
}

export const getBillStatsByPeriod = async (req: Request, res: Response) => {
  try {
    const today = await prismaClient.billing.count({
      where: {
        finalDate: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    })

    const lastMonth = await prismaClient.billing.count({
      where: {
        finalDate: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    })

    const lastYear = await prismaClient.billing.count({
      where: {
        finalDate: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      },
    })

    res.json({ today, lastMonth, lastYear })
  } catch (error: unknown) {
    console.error('Error al obtener ventas por periodo:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
