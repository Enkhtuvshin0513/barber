export const orderMutations = {
  createOrder: async (
    _root: undefined,
    {
      barberShopId,
      email,
      phone,
    }: { barberShopId: string; email: string; phone: number }
  ) => {
    return true;
  },
};
