import mongoose from 'mongoose';
import { app } from './app';
import { DatabaseConnectionError } from '@bkorg/common';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      process.env.NATS_URL!
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connected closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    try {
      await mongoose.connect(process.env.MONGO_URI!);
      console.log('Connected to MongoDb');
    } catch (error) {
      throw new DatabaseConnectionError('Failed to connect to database!');
    }
  } catch (error) {}
};

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

start();
