const getEnvVariable = (name: string, defaultValue?: string): string => {
  const value = process.env[name]
  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${name} is not defined`)
    }
    return defaultValue
  }
  return value
}

export const PORT: number = parseInt(getEnvVariable('PORT', '3000'))

export const JWT_SECRET: string = getEnvVariable('JWT_SECRET')

export const RESEND_API_KEY: string = getEnvVariable('RESEND_API_KEY')

export const POSTGRES_USER: string = getEnvVariable('POSTGRES_USER')

export const POSTGRES_HOST: string = getEnvVariable('POSTGRES_HOST')

export const POSTGRES_DB: string = getEnvVariable('POSTGRES_DB')

export const POSTGRES_PASSWORD: string = getEnvVariable('POSTGRES_PASSWORD')

export const POSTGRES_PORT: number = parseInt(getEnvVariable('POSTGRES_PORT'))

export const RABBIT_HOST: string = getEnvVariable('RABBIT_HOST')

export const QUEUE_READ_CLIENTS: string = 'company_queue'

export const QUEUES_WRITE_PLAN = {
  create: 'create_plan',
  update: 'update_plan',
  delete: 'delete_plan',
}

export const QUEUES_WRITE_SERVICE = {
  create: 'create_service',
  update: 'update_service',
  delete: 'delete_service',
}

export const QUEUES_WRITE_TRAIL = {
  create: 'create_trial',
  update: 'update_trial',
  delete: 'delete_trial',
}

export const QUEUES_WRITE_COUPON = {
  create: 'create_coupon',
  update: 'update_coupon',
  delete: 'delete_coupon',
}
