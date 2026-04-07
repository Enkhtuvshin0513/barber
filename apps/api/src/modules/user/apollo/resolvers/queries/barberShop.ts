import { BarberShopWhereInput } from '../../../../../../generated/prisma/models';
import { prisma } from '../../../../../lib/prisma';
import { IBarberShopFilter, IPageFilterInfo } from '../../../types';

export const barberShopQueries = {
  barberShops: async (
    _root: undefined,
    {
      filter,
      pageInfo,
    }: { filter: IBarberShopFilter; pageInfo: IPageFilterInfo }
  ) => {
    const where = {} as BarberShopWhereInput;
    const page = pageInfo?.page || 1;

    const skip = page * 10 - 10;

    if (filter.name) {
      where.name = {
        contains: filter.name,
      };
    }
    if (filter.location) {
      where.location = filter.location;
    }

    if (filter.category) {
      where.categories = {
        has: filter.category,
      };
    }

    const [data, totalCount] = await Promise.all([
      prisma.barberShop.findMany({ where, skip, take: 10 }),

      prisma.barberShop.count({ where }),
    ]);

    return {
      data,
      pageInfo: {
        totalCount,
        page,
      },
    };
  },
};
