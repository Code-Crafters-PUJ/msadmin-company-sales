import express, { Application } from 'express'

import { PORT } from './config/environment'
import { salesRouter } from './routers'

class Server {
  private app: Application

  constructor() {
    this.app = express()

    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.app.use(express.json())
  }

  private routes(): void {
    this.app.use('/sales', salesRouter)
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`)
    })
  }
}

export default Server
