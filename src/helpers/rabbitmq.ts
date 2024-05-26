import amqp from 'amqplib'
import { QUEUE_READ_CLIENTS, RABBIT_HOST } from '../config/environment'

export const connect = async (): Promise<amqp.Channel> => {
  const connection = await amqp.connect(`amqp://${RABBIT_HOST}`)
  const channel = await connection.createChannel()
  return channel
}

export const setupClientsListener = async (): Promise<string> => {
  const channel = await connect()

  // Declare the queue
  await channel.assertQueue(QUEUE_READ_CLIENTS, { durable: false })

  // Consume messages from the queue
  await channel.consume(QUEUE_READ_CLIENTS, async (msg) => {
    if (msg !== null) {
      try {
        // Process the message and insert values into your database
        const messageContent = msg.content.toString()
        const data = parsePythonMessage(messageContent)
        await insertIntoDatabase(data)

        // Acknowledge the message
        channel.ack(msg)
      } catch (error) {
        console.error('Error processing message:', error)
        // Reject (requeue) the message in case of failure
        channel.reject(msg, true)
      }
    }
  })

  return `Listening for messages on queue: ${QUEUE_READ_CLIENTS}`
}

const parsePythonMessage = (message: string): any => {
  // Parse the message from Python format to an object
  const parts = message.split(',')
  const data: any = {}
  parts.forEach((part) => {
    const [key, value] = part.split(':')
    data[key] = value
  })
  return data
}

const insertIntoDatabase = async (data: any) => {
  // Your database insertion logic here
  console.log('Inserting data into database:', data)
  // Example: Insert data into MongoDB
  // await YourModel.create(data);
}

export async function publicarMensajeEnCola(
  nombreCola: string,
  mensaje: string,
): Promise<void> {
  try {
    // Conectarse al servidor RabbitMQ
    const connection = await amqp.connect(`amqp://${RABBIT_HOST}`)

    // Crear un canal
    const channel = await connection.createChannel()

    // Asegurarse de que la cola exista, si no existe, será creada
    await channel.assertQueue(nombreCola)

    // Publicar el mensaje en la cola
    console.log(channel.sendToQueue(nombreCola, Buffer.from(mensaje)));

    console.log(`Mensaje publicado en la cola ${nombreCola}: ${mensaje}`)

    // Cerrar la conexión y el canal
    await channel.close()
    await connection.close()
  } catch (error) {
    console.error('Error al publicar mensaje en la cola:', error)
  }
}
