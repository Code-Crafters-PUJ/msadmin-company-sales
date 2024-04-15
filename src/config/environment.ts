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
