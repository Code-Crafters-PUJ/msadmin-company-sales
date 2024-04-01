import jwt from 'jsonwebtoken'

import { getEnvVariable } from '../config/environment'

export const hasSalesRole = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, getEnvVariable('JWT_SECRET')) as {
      role: string
    }

    return decoded['role'] === 'VENTAS'
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al verificar el token:', error.message)
    } else {
      console.error('Error al verificar el token:', error)
    }
    return false
  }
}