import amqp from 'amqplib'

export const connect = async (): Promise<amqp.Channel> => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  return channel
}

export const validateJWT = async (jwt: string): Promise<string> => {
  const channel = await connect()

  // Send request to the queue
  const queue = 'jwt_validation_queue'
  await channel.assertQueue(queue, { durable: false })
  channel.sendToQueue(queue, Buffer.from(jwt))

  // FIXME:
  throw new Error('Not implemented')
}
