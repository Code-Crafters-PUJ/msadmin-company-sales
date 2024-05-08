import { Request, Response } from 'express'
import { plainToClass } from 'class-transformer'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { v4 as uuidV4 } from 'uuid'

import { CreateCouponDto, UpdateCouponDto } from '../dtos'
import { prismaClient } from '../db/prisma'

export const createCoupon = async (req: Request, res: Response) => {
  const dto = plainToClass(CreateCouponDto, req.body)

  try {
    const newCoupon = await prismaClient.coupon.create({
      data: {
        code: uuidV4(),
        client: { connect: { companyName: dto.companyName } },
        discount: dto.discount,
        duration: dto.duration,
        expirationDate: dto.expirationDate,
      },
    })

    res
      .status(201)
      .json({ message: 'Cupon creado correctamente', coupon: newCoupon })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const cause = error.meta?.cause.toString()
      if (cause.includes('Client')) {
        res.status(404).json({
          error: `No se encontró un Negocio con el nombre '${dto.companyName}'`,
        })
      }
    }
    console.error('Error al crear cupon:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const updateCoupon = async (req: Request, res: Response) => {
  const { code } = req.params
  const dto = plainToClass(UpdateCouponDto, req.body)

  try {
    const updatedCoupon = await prismaClient.coupon.update({
      where: { code },
      data: {
        client: { connect: { companyName: dto.companyName } },
        discount: dto.discount,
        duration: dto.duration,
        expirationDate: dto.expirationDate,
      },
    })

    res.status(200).json({
      message: 'Cupon actualizado correctamente',
      coupon: updatedCoupon,
    })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const cause = error.meta?.cause.toString()
      if (cause.includes('Client')) {
        res.status(404).json({
          error: `No se encontró un Negocio con el nombre '${dto.companyName}'`,
        })
      }
    }
    console.error('Error al actualizar cupon:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const deleteCoupon = async (req: Request, res: Response) => {
  const { code } = req.params

  try {
    await prismaClient.coupon.update({
      where: { code },
      data: { status: false },
    })

    res.status(200).json({ message: 'Cupon eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar cupon:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getCouponByCode = async (req: Request, res: Response) => {
  const { code } = req.params

  try {
    const coupon = await prismaClient.coupon.findUnique({
      where: { code, status: true },
      include: { client: true },
    })

    if (!coupon) {
      return res.status(404).json({ error: 'Cupon no encontrado' })
    }

    res.status(200).json({ coupon })
  } catch (error) {
    console.error('Error al obtener cupon:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const getAllCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await prismaClient.coupon.findMany({
      where: {
        status: true,
      },
      include: {
        client: true,
      },
    })

    res.status(200).json({ coupons })
  } catch (error) {
    console.error('Error al obtener cupones:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
