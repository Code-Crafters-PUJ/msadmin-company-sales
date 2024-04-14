import { validateOrReject } from 'class-validator'
import { Request, Response } from 'express'

import pool from '../db/pool'
import { CreateBillingDto } from '../dtos/create-billing-dto'
import { sendEmail } from '../helpers/emails'
import { prismaClient } from '../db/prisma'
import { plainToClass } from 'class-transformer'

export const createBilling = async (
  req: Request,
  res: Response
): Promise<void> => {
  const dto = plainToClass(CreateBillingDto, req.body)

  try {
    await validateOrReject(dto)
  } catch (errors) {
    res.status(400).json({ errors: errors })
    return
  }

  try {
    const client = await prismaClient.client.findFirst({
      where: { id: dto.clientId },
    })

    if (!client) {
      res
        .status(404)
        .json({ error: 'No se encontró un Negocio con ese ID asociado' })
      return
    }

    const now = new Date()
    const [hours, minutes, seconds] = dto.usage.split(':').map(Number)
    now.setHours(hours, minutes, seconds)
    dto.usage = now.toISOString() // TODO: Check if this is the correct format

    const newSale = await prismaClient.billing.create({
      data: {
        client: { connect: { id: dto.clientId } },
        initialDate: dto.initialDate,
        finalDate: dto.finalDate,
        plan: { connect: { type: dto.planType } },
        payment: { connect: { method: dto.paymentMethod } },
        amount: dto.amount,
        paymentDate: dto.paymentDate,
        usage: dto.usage,
      },
    })

    res.status(201).json({ message: 'Compra Registrada', sale: newSale })
  } catch (error: unknown) {
    console.error('Error al registrar venta:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getAllBillings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sales = await pool.query(`
      SELECT s.*, p.plan_type, c.company_name
      FROM suscription s
      JOIN plan p ON s.plan_id = p.plan_id
      JOIN client c ON s.client_id = c.client_id
    `)
    res.json({ sales: sales.rows })
  } catch (error: unknown) {
    console.error('Error al obtener todas las ventas:', error)
  }
}

export const getAllBillingsByClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { clientId } = req.params

  try {
    const sales = await pool.query(
      `
      SELECT s.*, p.plan_type, c.company_name
      FROM suscription s
      JOIN plan p ON s.plan_id = p.plan_id
      JOIN client c ON s.client_id = c.client_id
      WHERE s.client_id = $1
    `,
      [clientId]
    )

    if (sales.rows.length === 0) {
      res
        .status(404)
        .json({ error: 'No se encontraron ventas para este Negocio' })
      return
    }

    res.json({ ventas: sales.rows })
  } catch (error: unknown) {
    console.error('Error al obtener ventas por negocio:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const pruebaEmail = async (req: Request, res: Response) => {
  const { email, subject, message } = req.body

  sendEmail(email, subject, message)

  res.json({ info: 'Email enviado', email, subject, message })
}
