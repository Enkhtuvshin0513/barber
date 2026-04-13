import { Router, RequestHandler } from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/upload';
import { readFile } from '../controllers/readFile';

const upload = multer({ storage: multer.memoryStorage() });

export const utilsRouter = Router();

utilsRouter.post(
  '/upload',
  upload.single('file') as unknown as RequestHandler,
  uploadFile
);

utilsRouter.post('/read-file', readFile);
