import { Pool } from 'pg'

import { getEnvVariable } from '../config/environment'

const pool = new Pool({
  user: getEnvVariable('POSTGRES_USER'),
  host: getEnvVariable('POSTGRES_HOST'),
  database: getEnvVariable('POSTGRES_DB'),
  password: getEnvVariable('POSTGRES_PASSWORD'),
  port: parseInt(getEnvVariable('POSTGRES_PORT')),
})

export default pool
