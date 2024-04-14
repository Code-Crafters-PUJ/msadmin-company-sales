import { validateOrReject } from 'class-validator'
import { Request, Response } from 'express'

import pool from '../db/pool'
import { CreateBillingDto } from '../dtos/create-billing-dto'
import { sendEmail } from '../helpers/emails'

export const createBilling = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    clientId,
    initialDate,
    finalDate,
    planType,
    paymentMethod,
    amount,
    paymentDate,
  } = req.body

  const dto = new CreateBillingDto(req.body)

  try {
    await validateOrReject(dto)
  } catch (errors) {
    res.status(400).json({ errors: errors })
    return
  }

  try {
    const client = await pool.query('SELECT * FROM clients WHERE id = $1', [
      dto.clientId,
    ])

    if (client.rows.length === 0) {
      res
        .status(404)
        .json({ error: 'No se encontró un Negocio con ese ID asociado' })
      return
    }

    const newSale = await pool.query(
      'INSERT INTO billings (initial_date, final_date, plan_id, client_id, payment_id, usage, amount, payment_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        initialDate,
        finalDate,
        planType,
        clientId,
        paymentMethod,
        amount,
        paymentDate,
      ]
    )

    res
      .status(201)
      .json({ message: 'Compra Registrada', sale: newSale.rows[0] })
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
