import express, { Application } from 'express'

import { PORT } from './config/environment'
import { plansRouter, salesRouter, servicesRouter, couponRouter} from './routers'
import { prismaClient } from './db/prisma'
import cors from 'cors'

class Server {
  private app: Application

  constructor() {
    this.app = express()

    this.connectDatabase()
    this.middlewares()
    this.routes()
  }

  private connectDatabase(): void {
    prismaClient.$connect()
  }

  private middlewares(): void {
    this.app.use(cors())
    this.app.use(express.json())
  }

  private routes(): void {
    this.app.use('/sales', salesRouter)
    this.app.use('/plans', plansRouter)
    this.app.use('/services', servicesRouter)
    this.app.use('/coupon', couponRouter)
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`)
    })
  }
}

export default Server
