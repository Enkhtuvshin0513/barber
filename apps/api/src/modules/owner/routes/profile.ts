import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profile';

export const router = Router();

router.get('/', getProfile);

router.put('/', updateProfile);
