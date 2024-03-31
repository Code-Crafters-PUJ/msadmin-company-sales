import 'dotenv/config'
import express from 'express'

import { getEnvVariable } from './config/environment'
import ventaRoutes from './routes/ventasRoutes'

const app = express()

app.use(express.json())

app.use('/venta', ventaRoutes)

const PORT = parseInt(getEnvVariable('PORT', '3000'))

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
