import { Worker } from 'bullmq';
import { Redis } from 'ioredis';

const connection = new Redis({ maxRetriesPerRequest: null });

const orderWorker = new Worker(
  'orderQueue',
  async (job) => {
    if (job.name === 'createOrder') {
      const { barberShopId, email, phone } = job.data;

      throw new Error(
        `Failed to process order for barberShopId: ${barberShopId}, email: ${email}, phone: ${phone}`
      );
    }
  },
  {
    connection,
  }
);

orderWorker.on('completed', (job) => {
  console.log(`Job with id ${job.id} has completed!`);
});

orderWorker.on('failed', (job, err) => {
  console.error(`Job with id ${job?.id} has failed with error: ${err.message}`);
});
