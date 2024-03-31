import { Request, Response } from 'express'

import pool from '../db/pool'

export const registrarVenta = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { idNegocio, fechaCompra, fechaExpiracion, tipoPlan, metodoPago } =
    req.body

  try {
    const negocio = await pool.query(
      'SELECT * FROM client WHERE client_id = $1',
      [idNegocio]
    )

    if (negocio.rows.length === 0) {
      res
        .status(404)
        .json({ error: 'No se encontró un Negocio con ese ID asociado' })
      return
    }

    const nuevaVenta = await pool.query(
      'INSERT INTO suscription (initial_date, final_date, suscription_status, plan_id, client_id, payment_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [fechaCompra, fechaExpiracion, 1, tipoPlan, idNegocio, metodoPago]
    )

    res
      .status(201)
      .json({ message: 'Compra Registrada', venta: nuevaVenta.rows[0] })
  } catch (error: unknown) {
    console.error('Error al registrar venta:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const obtenerTodasLasVentas = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ventas = await pool.query(`
      SELECT s.*, p.plan_type, c.company_name
      FROM suscription s
      JOIN plan p ON s.plan_id = p.plan_id
      JOIN client c ON s.client_id = c.client_id
    `)
    res.json({ ventas: ventas.rows })
  } catch (error: unknown) {
    console.error('Error al obtener todas las ventas:', error)
  }
}

export const obtenerVentasPorNegocio = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { idNegocio } = req.params

  try {
    const ventas = await pool.query(
      `
      SELECT s.*, p.plan_type, c.company_name
      FROM suscription s
      JOIN plan p ON s.plan_id = p.plan_id
      JOIN client c ON s.client_id = c.client_id
      WHERE s.client_id = $1
    `,
      [idNegocio]
    )

    if (ventas.rows.length === 0) {
      res
        .status(404)
        .json({ error: 'No se encontraron ventas para este Negocio' })
      return
    }

    res.json({ ventas: ventas.rows })
  } catch (error: unknown) {
    console.error('Error al obtener ventas por negocio:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
