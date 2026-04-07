import { prisma } from '../../../../../lib/prisma';

export const barberShopQueries = {
  barberShops: async () => {
    return prisma.barberShop.findMany({});
  },
};
