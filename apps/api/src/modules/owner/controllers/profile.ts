import type { Response } from 'express';
import { ShopProfileService } from '../services/profile';

export const getProfile = async (req: any, res: Response) => {
  try {
    const shop = await ShopProfileService.getProfle(req.shopId);

    res.json({ data: shop });
  } catch (e) {
    res.status(400).json({ message: 'error occured' });
  }
};

export const updateProfile = async (req: any, res: Response) => {
  try {
    const { data } = req.body;

    const shop = await ShopProfileService.updateProfile(req.shopId, data);
    res.json({ data: shop });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};
