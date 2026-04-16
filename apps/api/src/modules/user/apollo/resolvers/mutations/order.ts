import { Redis } from 'ioredis';
import { Queue } from 'bullmq';

export const orderMutations = {
  createOrder: async (
    _root: undefined,
    {
      barberShopId,
      email,
      phone,
    }: { barberShopId: string; email: string; phone: number }
  ) => {
    const connection = new Redis();

    const myQueue = new Queue('orderQueue', {
      connection,
    });

    myQueue.add(
      'createOrder',
      {
        barberShopId,
        email,
        phone,
      },
      {
        removeOnComplete: true,
      }
    );

    return true;
  },
};
