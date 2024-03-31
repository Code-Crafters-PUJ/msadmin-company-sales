export const getEnvVariable = (name: string, defaultValue?: string): string => {
  const value = process.env[name]
  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${name} is not defined`)
    }
    return defaultValue
  }
  return value
}
