import { Redis } from 'ioredis';
import { Queue } from 'bullmq';
import { EmailService } from '../../../../utils/services/email';

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

    const orderQueue = new Queue('orderQueue', {
      connection,
    });

    orderQueue.add(
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

    const url = await EmailService.sendEmail(email, 'Order success', 'order', {
      email: '3912831283901283901283908129hjsdjkahjkl',
    });

    return url;
  },
};
