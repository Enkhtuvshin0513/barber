import { Router } from 'express';
import { router as ordersRouter } from './orders';
import { router as reviewRouter } from './reviews';
import { router as scheduleRouter } from './schedules';
import { router as serviceRouter } from './services';
import { router as authRouter } from './auth';
import { router as profileRouter } from './profile';
import { ownerAuthMiddleware } from '../middleware';

export const ownerRouter = Router();

ownerRouter.use('/auth', authRouter);
ownerRouter.use('/profile', ownerAuthMiddleware, profileRouter);
ownerRouter.use('/order', ownerAuthMiddleware, ordersRouter);
ownerRouter.use('/review', ownerAuthMiddleware, reviewRouter);
ownerRouter.use('/schedule', ownerAuthMiddleware, scheduleRouter);
ownerRouter.use('/service', ownerAuthMiddleware, serviceRouter);
