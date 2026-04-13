import type { Request, Response } from 'express';
import { UploadService } from '../services/upload';

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file provided' });
      return;
    }

    const type = req.body.type === 'private' ? 'private' : 'public';
    const result = await UploadService.uploadFile(req.file, type);

    res.json({ success: true, ...result });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};
