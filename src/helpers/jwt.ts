import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/environment'

export const isValidToken = (token: string): boolean => {
  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al verificar el token:', error.message)
    } else {
      console.error('Error al verificar el token:', error)
    }
    return false
  }
}

export const hasSalesRole = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      role: string
    }

    return decoded['role'] === 'Ventas'
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al verificar el token:', error.message)
    } else {
      console.error('Error al verificar el token:', error)
    }
    return false
  }
}
export const hasAdminRole = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      role: string
    }

    return decoded['role'] === 'Admin'
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al verificar el token:', error.message)
    } else {
      console.error('Error al verificar el token:', error)
    }
    return false
  }
}
