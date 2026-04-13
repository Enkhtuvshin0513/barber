import type { Request, Response } from 'express';
import { UploadService } from '../services/upload';

export const readFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { key } = req.body;

    if (!key) {
      res.status(400).json({ message: 'key is required' });
      return;
    }

    const result = await UploadService.getSignedReadUrl(key);

    res.json({ success: true, ...result });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};
