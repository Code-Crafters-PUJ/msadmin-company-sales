import { Request, Response } from 'express'

import { CreateCouponDto } from '../dtos'
import { prismaClient } from '../db/prisma'
import { plainToClass } from 'class-transformer'

export const createCoupon = async (req: Request, res: Response) => {
  const dto = plainToClass(CreateCouponDto, req.body)

  try {
    const newCoupon = await prismaClient.coupon.create({
      data: {
        code: dto.code,
        clientId: dto.clientId,
        discount: dto.discount,
        duration: dto.duration,
        expirationDate: dto.expirationDate,
      },
    })

    res
      .status(201)
      .json({ message: 'Cupon creado correctamente', coupon: newCoupon })
  } catch (error) {
    console.error('Error al crear cupon:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getAllCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await prismaClient.coupon.findMany({
      where: {
        status: true,
      },
    })

    res.status(200).json({ coupons })
  } catch (error) {
    console.error('Error al obtener cupones:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default { createCoupon, getAllCoupons }
