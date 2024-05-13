// rabbitmq.ts

import * as amqp from 'amqplib';

export async function publicarMensajeEnCola(nombreCola: string, mensaje: string): Promise<void> {
  try {
    // Conectarse al servidor RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
  
    // Crear un canal
    const channel = await connection.createChannel();
  
    // Asegurarse de que la cola exista, si no existe, será creada
    await channel.assertQueue(nombreCola);
  
    // Publicar el mensaje en la cola
    channel.sendToQueue(nombreCola, Buffer.from(mensaje));
  
    console.log(`Mensaje publicado en la cola ${nombreCola}: ${mensaje}`);
  
    // Cerrar la conexión y el canal
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error al publicar mensaje en la cola:', error);
  }
}
