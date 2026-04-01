import { Router } from 'express';
import { getProfile } from '../controllers/profile';

export const router = Router();

router.get('/', getProfile);
