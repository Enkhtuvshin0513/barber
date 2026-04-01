import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getSecret } from '../../../utils/utils';

export class OwnerAuthService {
  static async register(email: string, password: string) {
    const existingShop = await prisma.barberShop.findUnique({
      where: { email },
    });

    if (existingShop) {
      throw new Error('Shop already exists');
    }

    const generatedPassword = await bcrypt.hash(password, 10);

    await prisma.barberShop.create({
      data: { email, password: generatedPassword },
    });

    //todo verification by email

    return 'done';
  }

  static async login(email: string, password: string) {
    const shop = await prisma.barberShop.findUnique({ where: { email } });

    if (!shop) {
      throw new Error('Email or password wrong');
    }

    const valid = bcrypt.compare(password, shop.password);

    if (!valid) {
      throw new Error('Email or password wrong');
    }

    const JWT_SECRET = getSecret();

    return jwt.sign({ id: shop.id }, JWT_SECRET, { expiresIn: '1d' });
  }
}
