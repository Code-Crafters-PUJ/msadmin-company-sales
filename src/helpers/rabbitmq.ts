import amqp from 'amqplib'

export const connect = async (): Promise<amqp.Channel> => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  return channel
}

export const setupClientsListener = async (): Promise<string> => {
  const channel = await connect()

  // Declare the queue
  const queueName = 'your_queue_name'
  await channel.assertQueue(queueName, { durable: false }) // Adjust options as per your requirement

  // Bind the queue to an exchange
  const exchangeName = 'your_exchange_name'
  const routingKey = 'your_routing_key' // Routing key to bind the queue to the exchange
  await channel.bindQueue(queueName, exchangeName, routingKey)

  // Consume messages from the queue
  await channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      try {
        // Process the message and insert values into your database
        const messageContent = msg.content.toString()
        // Example: Parse JSON message
        const data = JSON.parse(messageContent)
        // Example: Insert data into database
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

  return `Listening for messages on queue: ${queueName}`
}

const insertIntoDatabase = async (data) => {
  // Your database insertion logic here
  console.log('Inserting data into database:', data)
  // Example: Insert data into MongoDB
  // await YourModel.create(data);
}
