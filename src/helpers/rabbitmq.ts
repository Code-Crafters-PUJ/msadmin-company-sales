import amqp from 'amqplib';

export const connect = async (): Promise<amqp.Channel> => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  return channel;
};

export const setupClientsListener = async (): Promise<string> => {
  const channel = await connect();

  // Declare the queue
  const queueName = 'company_queue';
  await channel.assertQueue(queueName, { durable: false });

  // Consume messages from the queue
  await channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      try {
        // Process the message and insert values into your database
        const messageContent = msg.content.toString();
        const data = parsePythonMessage(messageContent);
        await insertIntoDatabase(data);

        // Acknowledge the message
        channel.ack(msg);
      } catch (error) {
        console.error('Error processing message:', error);
        // Reject (requeue) the message in case of failure
        channel.reject(msg, true);
      }
    }
  });

  return `Listening for messages on queue: ${queueName}`;
};

const parsePythonMessage = (message: string): any => {
  // Parse the message from Python format to an object
  const parts = message.split(',');
  const data: any = {};
  parts.forEach(part => {
    const [key, value] = part.split(':');
    data[key] = value;
  });
  return data;
};

const insertIntoDatabase = async (data: any) => {
  // Your database insertion logic here
  console.log('Inserting data into database:', data);
  // Example: Insert data into MongoDB
  // await YourModel.create(data);
};
