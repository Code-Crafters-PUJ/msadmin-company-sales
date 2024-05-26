import express, { Application } from 'express'

import { PORT } from './config/environment'
import {
  plansRouter,
  salesRouter,
  servicesRouter,
  couponRouter,
  trialsRouter,
  clientsRouter,
} from './routers'
import { prismaClient } from './db/prisma'
import cors from 'cors'
import { connect, setupClientsListener } from './helpers/rabbitmq'

class Server {
  private app: Application

  constructor() {
    this.app = express()

    this.connectDatabase()
    this.middlewares()
    this.routes()

    //this.setupRabbitMQ()
  }

  private async connectDatabase(): Promise<void> {
    await prismaClient.$connect()
  }

  private middlewares(): void {
    this.app.use(cors())
    this.app.use(express.json())
  }

  private routes(): void {
    this.app.use('/sales', salesRouter)
    this.app.use('/plans', plansRouter)
    this.app.use('/services', servicesRouter)
    this.app.use('/coupons', couponRouter)
    this.app.use('/trials', trialsRouter)
    this.app.use('/clients', clientsRouter)
  }

  private async setupRabbitMQ(): Promise<void> {
    try {
      connect()
      const message = await setupClientsListener()
      console.log(message)
    } catch (error) {
      console.error('Error setting up RabbitMQ:', error)
    }
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`)
    })
  }
}

export default Server
