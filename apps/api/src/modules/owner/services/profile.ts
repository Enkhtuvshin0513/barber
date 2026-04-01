import { prisma } from '../../../lib/prisma';

export class ShopProfileService {
  static getProfle = async (shopId: string) => {
    return prisma.barberShop.findUnique({
      where: { id: shopId },
      omit: { password: true },
    });
  };
}
